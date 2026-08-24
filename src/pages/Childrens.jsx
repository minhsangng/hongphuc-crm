import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import DataTable from "../components/DataTable";
import Avatar from "../components/Avatar";
import { formatVND, formatDateVN } from "../utils/helpers";
import { getDataFromAPI } from "../utils/helpers";
import Modal from "../components/Modal";
import Swal from "sweetalert2";

const columns = [
  { key: "fullName", label: "Họ tên", render: (v, row) => (
    <div className="flex items-center gap-2.5">
      <Avatar name={v} size="sm" />
      <div>
        <p className="font-medium text-dark-900 dark:text-white text-sm">{v}</p>
        <p className="text-xs text-dark-400">Ngày sinh: {formatDateVN(row.dob)}</p>
      </div>
    </div>
  )},
  { key: "className", label: "Lớp", render: v => <span className="badge badge-blue">{v}</span> },
  { key: "parentName", label: "Phụ huynh", render: (v, row) => 
    <div>
      <p>{v}</p><p className="text-xs text-dark-400">({row.phoneNumber})</p>
    </div>},
  { key: "bankNumber", label: "Ngân hàng", render: (v, row) => 
    <div>
      <p>{v}</p><p className="text-xs text-dark-400">({row.bankName})</p>
    </div> },
  { key: "fee", label: "Học phí", render: v => { return <span className="badge-red">{formatVND(Number(v))}</span> }},
  { key: "health", label: "Sức khỏe", render: v => {
    const map = { "Bình thường": "badge-green", "Cần theo dõi": "badge-red", "Yếu": "badge-yellow" };
    return <span className={`badge ${map[v] || "baddge-gray"}`}>{v}</span>
  }},
  { key: "status", label: "Trạng thái", render: v => {
    const map = { "Đang học": "badge-green", "Đã nghỉ": "badge-red", "Theo dõi": "badge-yellow" };
    return <span className={`badge ${map[v] || "baddge-gray"}`}>{v}</span>
  }},
];

export default function Childrens({ user }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState({ open: false, title: "", content: null });

  async function getChildrenData() {
    try {
      const response = await getDataFromAPI(
        "get-" + (user.classId === 0 ? "all-childrens" : "children-by-class/" + user.classId)
      );
      if (response.status === 200) setData(response.items);
    } catch (err) {
      console.log("Get children data failed: ", err);
    } finally {
      setLoading(false);
    }
  }
  
  function AddChildrenForm() {  
    const [form, setForm] = useState({name: "", dob: "", parent: "" });
    
    async function handleAddChildren(e) {
      e.preventDefault();
      try {
        
      } catch (err) {
        console.error("Form submit failed: ", err);
      }
    }
  
    return (
      <div>
        <form onSubmit={handleAddChildren} className="text-base">
          <label htmlFor="name">
            <b>Họ tên trẻ:</b> <br />
            <input className="w-full border-b border-l rounded-bl-lg px-2 py-0.5 outline-none" value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} type="text" name="name" id="name" placeholder="Họ và tên trẻ..." />
          </label>
          <label htmlFor="dob">
            <b>Ngày sinh:</b> <br />
            <input className="w-full border-b border-l rounded-bl-lg px-2 py-0.5 outline-none" value={form.dob} onChange={e => setForm(prev => ({ ...prev, dob: e.target.value }))} type="date" name="dob" id="dob" />
          </label>
          <label htmlFor="parent">
            <b>Họ tên phụ huynh:</b> <br />
            <input className="w-full border-b border-l rounded-bl-lg px-2 py-0.5 outline-none" value={form.parent} onChange={e => setForm(prev => ({ ...prev, parent: e.target.value }))} type="text" name="parent" id="parent" placeholder="Họ tên phụ huynh..." />
          </label>
          
          <div className="mt-4 mb-6 flex justify-between">
            <button type="reset" onClick={()=> setForm({name: "", dob: "", parent: "" })} className="bg-gray-200 hover:bg-gray-400 px-4 py-1 rounded-lg">Hủy</button>
            <button type="submit" className="bg-blue-200 hover:bg-blue-500 hover:text-white transition ease-linear px-4 py-1 rounded-lg">Xác nhận</button>
          </div>
        </form>
      </div>
    )
  }
  
  useEffect(() => {
    getChildrenData();
  }, []);

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      <Modal isOpen={showModal.open} onClose={() => setShowModal(prev => ({ ...prev, open: false }))} title={showModal.title}>  
        <div className='bg-white text-black rounded-md px-4 py-2'>
          {showModal.content}
        </div>
      </Modal>
    
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-dark-900 dark:text-white">Học sinh</h2>
          <p className="text-sm text-dark-400 dark:text-dark-500 mt-0.5">Quản lý danh sách học sinh {(user.classId !== 0 ? "" : "toàn trường")}</p>
        </div>
        <button onClick={() => setShowModal({ open: true, title: "Thêm học sinh mới", content: <AddChildrenForm />})} className="btn-primary text-xs">
          <Plus size={13} /> Thêm trẻ mới
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Tổng học sinh", value: data.length > 0 ? data.length : 0, color: "text-accent-600 dark:text-accent-400", bg: "bg-accent-50 dark:bg-accent-900/20" },
          { label: "Đang theo học", value: data.length > 0 ? data.filter(c => c.status === "Đang học").length : 0, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/20" },
          { label: "Đã tốt nghiệp", value: data.length > 0 ? data.filter(c => c.status === "Đã tốt nghiệp").length : 0, color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
          { label: "Đã nghỉ học", value: data.length > 0 ? data.filter(c => c.status === "Đã nghỉ").length : 0, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/20" },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4 border border-dark-100/50 dark:border-dark-700/50`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-dark-500 dark:text-dark-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
      
      <DataTable title="Danh sách học sinh" columns={columns} data={data} loading={loading} pageSize={6} />
    </div>
  )
}
