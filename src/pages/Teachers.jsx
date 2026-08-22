import { useState, useEffect } from "react";
import { Plus, CalendarFold, Phone, Mail, Ban } from "lucide-react";
import DataTable from "../components/DataTable";
import Avatar from "../components/Avatar";
import { getDataFromAPI, formatVND } from "../utils/helpers";

const columns = [
  { key: "fullName", label: "Họ tên", render: (v, row) => (
    <div className="flex items-center gap-2.5">
      <Avatar name={v} size="sm" />
      <span className="font-medium text-dark-900 dark:text-white text-sm">{v} <br/><span className="text-xs text-gray-400 flex items-center gap-1"><CalendarFold size={10} />{row.dob}</span></span>
    </div>
  )},
  { key: "phoneNumber", label: "Liên hệ", sortable: false, render: (v, row) => (
    <div className="flex flex-col gap-1">
      <span className="flex items-center gap-1 text-dark-600 dark:text-dark-400"><Phone size={12} />{v}</span>
      <span className="flex items-center gap-1 text-dark-600 dark:text-dark-400 text-xs"><Mail size={10} />{row.email}</span>
    </div>
  )},
  { key: "email", label: "Email", sortable: false, render: v => (
    <span className="flex items-center gap-1 text-dark-600 dark:text-dark-400 text-xs"><Mail size={12} />{v}</span>
  )},
  { key: "role", label: "Chức danh", render: (v, row) => <div className="flex flex-col items-center gap-1"><span className="badge badge-blue">{v}</span><span className="text-xs">({row.className})</span></div> },
  { key: "gross", label: "Lương", sortable: false, render: v => (
    <span className="flex items-center gap-1 text-xs text-dark-500 dark:text-dark-400">{formatVND(v)}</span>
  )},
  { key: "status", label: "Trạng thái", render: v => {
    const map = { "Đang làm": "badge-green", "Tạm nghỉ": "badge-yellow", "Đã nghỉ": "badge-red" };
    const cls = map[v] || "badge-gray";
    return <span className={`badge ${cls}`}>{v}</span>
  }},
]

export default function Teachers({ user }) {
  const [data, setData] = useState([]);
  const show = Boolean(user && ["Quản trị viên", "Quản lý"].includes(user.role));
  
  async function fetchTeacherData() {
    try {
      const response = await getDataFromAPI("get-all-teachers");
      setData(response);
    } catch (err) {
      console.error("Fetch class data failed: ", err);
    }
  } 
  
  useEffect(() => {
    fetchTeacherData();
  }, []);
  
  if (!show) return <div className="p-4 lg:p-6 animate-fade-in flex items-center gap-2"><Ban color="#d05858" /><p>Chức năng này chỉ dành cho Quản lý.</p></div>;

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-dark-900 dark:text-white">Giáo viên</h2>
          <p className="text-sm text-dark-400 dark:text-dark-500 mt-0.5">Quản lý thông tin tất cả giáo viên</p>
        </div>
        <button className="btn-primary text-xs">
          <Plus size={13} /> Thêm giáo viên
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Tổng giáo viên", value: data.length > 0 ? data.length : 0, color: "text-accent-600 dark:text-accent-400", bg: "bg-accent-50 dark:bg-accent-900/20" },
          { label: "Đang làm", value: data.length > 0 ? data.filter(p => p.status === "Đang làm").length : 0, color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/20" },
          { label: "Tạm nghỉ", value: data.length > 0 ? data.filter(p => p.status !== "Đang làm" && p.status !== "Đã nghỉ").length : 0, color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-900/20" },
          { label: "Đã nghỉ", value: data.length > 0 ? data.filter(p => p.status === "Đã nghỉ").length : 0, color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-900/20" },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4 border border-dark-100/50 dark:border-dark-700/50`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-dark-500 dark:text-dark-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <DataTable title="Danh sách giáo viên" columns={columns} data={data} pageSize={6} />
    </div>
  )
}