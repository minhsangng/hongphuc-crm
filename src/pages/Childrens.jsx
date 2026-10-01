import { useEffect, useState } from "react";
import { Plus, PhoneCall, Cake } from "lucide-react";
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
        <p className="font-medium text-sm">{v}</p>
        <div className="flex items-center gap-1 text-gray-400"><Cake size={10} /><p className="text-xs">{formatDateVN(row.dob)}</p></div>
      </div>
    </div>
  )},
  { key: "className", label: "Lớp", render: v => <span className="badge badge-blue">{v}</span> },
  { key: "parentName", label: "Phụ huynh", sortable: false, render: (v, row) => 
    <div>
      <p>{v}</p>
      <div className="flex items-center gap-1 text-gray-400"><PhoneCall size={10} /><p className="text-xs">({row.phoneNumber})</p></div>
    </div>},
  { key: "bankNumber", label: "Ngân hàng", sortable: false, render: (v, row) => 
    <div>
      <p>{v}</p><p className="text-xs text-gray-400">({row.bankName})</p>
    </div> },
  { key: "fee", label: "Học phí", render: v => { return <span className="badge badge-red">{formatVND(Number(v))}</span> }},
  { key: "statusHealth", label: "Sức khỏe (BMI)", render: (v, row) => {
    const map = { "Bình thường": "badge-green", "Cần theo dõi": "badge-red", "Yếu": "badge-yellow" };
    if (!v) return <span className="badge badge-gray">N/A</span>;
    return (
      <div>
        <p className={`badge ${map[v] || "baddge-gray"}`}>{v}</p><p className="px-2 text-xs text-gray-400">({row.weight} / {row.height})</p>
      </div>
    );
  }},
  { key: "status", label: "Trạng thái", render: (v, row) => {
    const map = { "Đang học": "badge-green", "Đã nghỉ": "badge-red", "Theo dõi": "badge-yellow" };
    return (
      <div>
        <p className={`badge ${map[v] || "baddge-gray"}`}>{v}</p>
        <p className="px-2 px-2 text-xs text-gray-400">(Diện {row.subsidyType})</p>
      </div>
    );
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
          <div className="border-b border-(--color-red-light)/50 py-0.5 mb-2 rounded-md">
            <label htmlFor="name">
              <b>Họ tên trẻ:</b> <br />
              <input className="w-full outline-none text-gray-500" value={form.name} onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))} type="text" name="name" id="name" placeholder="Họ và tên trẻ..." />
            </label>
          </div>
          <div className="border-b border-(--color-red-light)/50 py-0.5 mb-2 rounded-md">
            <label htmlFor="dob">
              <b>Ngày sinh:</b> <br />
              <input className="w-full outline-none text-gray-500" value={form.dob} onChange={e => setForm(prev => ({ ...prev, dob: e.target.value }))} type="date" name="dob" id="dob" />
            </label>
          </div>
          <div className="border-b border-(--color-red-light)/50 py-0.5 mb-2 rounded-md">
            <label htmlFor="parent">
              <b>Họ tên phụ huynh:</b> <br />
              <input className="w-full outline-none text-gray-500" value={form.parent} onChange={e => setForm(prev => ({ ...prev, parent: e.target.value }))} type="text" name="parent" id="parent" placeholder="Họ tên phụ huynh..." />
            </label>
          </div>
          
          <div className="mt-4 mb-6 flex justify-between gap-4">
            <button type="reset" onClick={()=> setForm({name: "", dob: "", parent: "" })} className="w-full justify-center btn-secondary">Hủy</button>
            <button type="submit" className="w-full justify-center btn-primary">Xác nhận</button>
          </div>
        </form>
      </div>
    )
  }
  
  useEffect(() => {
    getChildrenData();
  }, []);

  return (
    <div className="p-1 lg:p-2 lg:pt-0 space-y-2 animate-fade-in">
      <Modal isOpen={showModal.open} onClose={() => setShowModal(prev => ({ ...prev, open: false }))} title={showModal.title}>  
        {showModal.content}
      </Modal>
    
      <div className="bg-white/50 backdrop-blur-md shadow-lg p-4 pt-6 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-xl font-bold text-(--color-red)">Học sinh</h2>
            <p className="text-sm text-gray-700 mt-0.5">Quản lý danh sách học sinh {(user.classId !== 0 ? "" : "toàn trường")}</p>
          </div>
          <button onClick={() => setShowModal({ open: true, title: "Thêm học sinh mới", content: <AddChildrenForm />})} className="btn-primary text-xs">
            <Plus size={13} /> Thêm trẻ mới
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Tổng học sinh", value: data.length > 0 ? data.length : 0, color: "text-black", bg: "bg-gray-200" },
            { label: "Đang theo học", value: data.length > 0 ? data.filter(c => c.status === "Đang học").length : 0, color: "text-green-600", bg: "bg-green-100" },
            { label: "Đã tốt nghiệp", value: data.length > 0 ? data.filter(c => c.status === "Đã tốt nghiệp").length : 0, color: "text-amber-600", bg: "bg-amber-100" },
            { label: "Đã nghỉ học", value: data.length > 0 ? data.filter(c => c.status === "Đã nghỉ").length : 0, color: "text-red-600", bg: "bg-red-100" },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-2xl p-4 backdrop-blur-md shadow-md border border-gray-200/50`}>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-black mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
      
      <DataTable title="Danh sách học sinh" columns={columns} data={data} loading={loading} pageSize={6} />
    </div>
  )
}
