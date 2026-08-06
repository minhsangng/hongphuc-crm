import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import DataTable from '../components/DataTable';
import Avatar from '../components/Avatar';
import { formatVND, formatDateVN } from '../utils/helpers';
import { getDataFromAPI } from '../utils/helpers';

const columns = [
  { key: 'id', label: 'ID', sortable: false, render: v => <span className="text-dark-400 text-xs">#{String(v).padStart(3,'0')}</span> },
  { key: 'fullName', label: 'Họ tên', render: (v, row) => (
    <div className="flex items-center gap-2.5">
      <Avatar name={v} size="sm" />
      <div>
        <p className="font-medium text-dark-900 dark:text-white text-sm">{v}</p>
        <p className="text-xs text-dark-400">Ngày sinh: {formatDateVN(row.dob)}</p>
      </div>
    </div>
  )},
  { key: 'className', label: 'Lớp', render: v => <span className="badge badge-blue">{v}</span> },
  { key: 'parentName', label: 'Phụ huynh' },
  { key: 'phoneNumber', label: 'Điện thoại', sortable: false },
  { key: 'fee', label: 'Học phí', render: v => { return <span className='badge-red'>{formatVND(Number(v))}</span> }},
  { key: 'status', label: 'Trạng thái', render: v => {
    const map = {
      'Đang học': 'badge-green',
      'Đã nghỉ': 'badge-red',
      'Theo dõi': 'badge-yellow'
    }
    return <span className={`badge ${map[v] || 'baddge-gray'}`}>{v}</span>
  }},
];

export default function Childrens({ user }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  async function getChildrenData() {
    try {
      const response = await getDataFromAPI("get-" + (user.classId === 0 ? "all-childrens" : "children-by-class/" + user.classId));
      setData(response);
      setLoading(false);
    } catch (err) {
      console.log("Get children data failed: ", err);
    }
  };
  
  useEffect(() => {
    getChildrenData();
  }, [user]);

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-dark-900 dark:text-white">Học sinh</h2>
          <p className="text-sm text-dark-400 dark:text-dark-500 mt-0.5">Quản lý danh sách học sinh <span class="text-red-100 underline">{(user.classId !== 0 ? 'lớp ' + user.className || 'default' : 'toàn trường')}</span></p>
        </div>
        <button className="btn-primary text-xs">
          <Plus size={13} /> Nhập học mới
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Tổng học sinh', value: data.length, color: 'text-accent-600 dark:text-accent-400', bg: 'bg-accent-50 dark:bg-accent-900/20' },
          { label: 'Đang theo học', value: data.filter(c => c.status === 'Đang học').length, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
          { label: 'Học phí trễ hạn', value: data.filter(c => c.fee === 'Trễ hạn').length, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
          { label: 'Chưa đóng HP', value: data.filter(c => c.fee === 'Chưa đóng').length, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' },
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
