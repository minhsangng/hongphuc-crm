import { useState, useEffect } from 'react';
import { Plus, Phone, Mail } from 'lucide-react';
import DataTable from '../components/DataTable';
import Avatar from '../components/Avatar';
import { getDataFromAPI } from '../utils/helpers';

const columns = [
  { key: 'fullName', label: 'Họ tên', render: (v) => (
    <div className="flex items-center gap-2.5">
      <Avatar name={v} size="sm" />
      <span className="font-medium text-dark-900 dark:text-white text-sm">{v}</span>
    </div>
  )},
  { key: 'phoneNumber', label: 'Điện thoại', sortable: false, render: v => (
    <span className="flex items-center gap-1 text-dark-600 dark:text-dark-400"><Phone size={12} />{v ? v : '0000-000-000'}</span>
  )},
  { key: 'email', label: 'Email', sortable: false, render: v => (
    <span className="flex items-center gap-1 text-dark-600 dark:text-dark-400 text-xs"><Mail size={12} />{v ? v : 'N/A'}</span>
  )},
  { key: 'dob', label: 'Ngày sinh', render: v => <span className="badge badge-blue">{v ? v : '00-00-0000'}</span> },
  { key: 'gross', label: 'Lương', sortable: false, render: v => (
    <span className="flex items-center gap-1 text-xs text-dark-500 dark:text-dark-400">{v ? v : 'N/A'}</span>
  )},
  { key: 'status', label: 'Trạng thái', render: v => {
    const map = { active: ['badge-green', 'Đang làm'], warning: ['badge-yellow', 'Tạm nghỉ'], inactive: ['badge-red', 'Đã nghỉ'] }
    const [cls, label] = map[v] || ['badge-gray', v]
    return <span className={`badge ${cls}`}>{label}</span>
  }},
]

export default function Teachers() {
  const [data, setData] = useState([]);
  
  async function fetchTeacherData() {
    try {
      const response = await getDataFromAPI("get-all-teachers", "get");
      setData(response);
    } catch (err) {
      console.error("Fetch class data failed: ", err);
    }
  } 
  
  useEffect(()=> {
    fetchTeacherData();
  }, []);

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-dark-900 dark:text-white">Giáo viên</h2>
          <p className="text-sm text-dark-400 dark:text-dark-500 mt-0.5">Quản lý thông tin giáo viên toàn trường</p>
        </div>
        <button className="btn-primary text-xs">
          <Plus size={13} /> Thêm giáo viên
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Tổng giáo viên', value: data.length, color: 'text-accent-600 dark:text-accent-400', bg: 'bg-accent-50 dark:bg-accent-900/20' },
          { label: 'Hợp tác tốt', value: data.filter(p => p.status === 'Đang làm').length, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
          { label: 'Cần theo dõi', value: data.filter(p => p.status !== 'Đang làm' && p.status !== 'Đã nghỉ').length, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
          { label: 'Chưa liên hệ', value: data.filter(p => p.status === 'Đã nghỉ').length, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' },
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