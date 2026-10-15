import { useState, useEffect } from "react";
import { RefreshCw, Plus, Users, BookOpen } from "lucide-react";
import { getDataFromAPI } from "../utils/helpers";
import Avatar from "../components/Avatar";

function ClassCard({ cls, active }) {
  const occupancy = Math.round((cls.quantity / cls.quantity) * 100);
  const barColor = occupancy >= 90 ? "bg-green-500" : occupancy >= 70 ? "bg-yellow-500" : "bg-red-500";
  
  return (
    <div className="relative bg-white rounded-2xl p-5 border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 group animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-xl ${(cls.className.includes("Mầm") ? "bg-amber-500" : cls.className.includes("Chồi") ? "bg-sky-400" : "bg-green-500")} flex items-center justify-center shadow-lg shadow-accent-600/20 group-hover:scale-110 transition-transform duration-300`}>
            <BookOpen size={18} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Lớp {cls.className}</h3>
            <p className="text-xs text-gray-500">Giai đoạn: {cls.approximateAge}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Avatar name={cls.teacherName || "Vân An"} size="xs" />
          <span className="text-gray-600 text-xs">{cls.teacherName || "N/A"}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Users size={13} />
          <span>{cls.quantity}/{cls.quantity} học sinh</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-gray-500">Sĩ số</span>
          <span className={`badge ${occupancy >= 90 ? "badge-red" : occupancy >= 70 ? "badge-yellow" : "badge-green"}`}>{occupancy}%</span>
        </div>
        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
          <div className={`h-full rounded-full ${barColor} transition-all duration-700`} style={{ width: `${occupancy}%` }} />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
        <button className={`flex-1 btn-secondary text-xs justify-center ${active ? "cursor-pointer" : "cursor-not-allowed"}`} disabled={active}>Chi tiết</button>
        <button className={`flex-1 btn-accent text-xs justify-center ${active ? "cursor-pointer" : "cursor-not-allowed"}`} disabled={active}>Điểm danh</button>
      </div>
      
      {!active && (<div className="absolute top-0 right-0 bg-red-500/50 flex justify-center items-center px-2 py-1 rounded-bl-xl rounded-tr-xl">
          <span className="text-xs">Không phụ trách</span>
      </div>)}
    </div>
  )
};

const GROUP_ORDER = ["Mầm", "Chồi", "Thỏ"];

const getGroupIndex = (className) => {
  const index = GROUP_ORDER.findIndex((g) => className.startsWith(g));
  return index === -1 ? GROUP_ORDER.length : index;
};

const sortClasses = (list) =>
  [...list].sort((a, b) => {
    const diff = getGroupIndex(a.className) - getGroupIndex(b.className);
    if (diff !== 0) return diff;

    return a.className.localeCompare(b.className, "vi", { numeric: true });
  }
);

export default function Classes({ user }) {
  const [data, setData] = useState([]);
  
  async function getClassData() {
    try {
      if (user) {
        const response = await getDataFromAPI("get-all-classes");
        setData(sortClasses(response));
      }
    } catch (err) {
      console.error("Fetch class data failed: ", err);
    }
  }
  
  useEffect(()=> {
    getClassData();
  }, []);
  
  return (
    <div className="p-1 lg:p-2 lg:pt-0 space-y-2 animate-fade-in">
      <div className="bg-white/50 backdrop-blur-md shadow-lg p-4 pt-6 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-xl font-bold text-(--color-red)">Lớp học</h2>
            <p className="text-sm text-gray-600 mt-0.5">Quản lý {(user.classId === 0 ? "danh sách các" : "")} lớp</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={getClassData} className="btn-secondary gap-1.5 text-xs hidden sm:inline-flex">
              <RefreshCw size={13} /> Làm mới
            </button>
            <button className={`btn-primary text-xs ${!["Quản trị viên", "Quản lý"].includes(user.role) ? "cursor-not-allowed" : "cursor-pointer"}`} disabled={["Quản trị viên", "Quản lý"].includes(user.role)}>
              <Plus size={13} /> Thêm lớp học
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { label: "Tổng lớp", value: data.length > 0 ? data.length : 0, color: "text-black", bg: "bg-gray-200" },
            { label: "Tổng học sinh", value: data.length > 0 ? data.reduce((s, c) => s + c.quantity, 0) : 0, color: "text-red-600", bg: "bg-red-100" },
            { label: "Lớp Mầm", value: 2, color: "text-amber-500", bg: "bg-amber-100" },
            { label: "Lớp Chồi", value: 2, color: "text-sky-400", bg: "bg-sky-100" },
            { label: "Lớp Thỏ Ngọc", value: 2, color: "text-green-500", bg: "bg-green-100" },
          ].map(s => (
            <div key={s.label} className={`${s.bg} rounded-2xl p-4 border border-gray-100`}>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {data.length > 0 
      ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(cls => <ClassCard key={cls.id} cls={cls} active={["Quản trị viên", "Quản lý"].includes(user.role) || user.classId == cls.id} />)}
      </div> 
      : <div className="flex items-center justify-center"><p className="text-sm text-gray-500">Không có dữ liệu</p></div>}
    </div>
  )
};