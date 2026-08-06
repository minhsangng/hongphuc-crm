import React, { useState, useEffect } from 'react';
import { Plus, Users, BookOpen } from 'lucide-react';
import Avatar from '../components/Avatar';
import { getDataFromAPI } from '../utils/helpers';

function ClassCard({ cls, active }) {
  const occupancy = Math.round((cls.quantity / cls.quantity) * 100);
  const barColor = occupancy >= 90 ? 'bg-green-500' : occupancy >= 70 ? 'bg-yellow-500' : 'bg-red-500';
  
  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl p-5 border border-dark-100 dark:border-dark-700 shadow-card hover:shadow-card-hover transition-all duration-300 group animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl gradient-accent flex items-center justify-center shadow-lg shadow-accent-600/20 group-hover:scale-110 transition-transform duration-300">
            <BookOpen size={18} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-dark-900 dark:text-white">Lớp {cls.className}</h3>
            <p className="text-xs text-dark-400 dark:text-dark-500">Giai đoạn: {cls.approximateAge}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Avatar name={cls.teacherName || "Hồng Phúc"} size="xs" />
          <span className="text-dark-600 dark:text-dark-300 text-xs">{cls.teacherName || "N/A"}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-dark-500 dark:text-dark-400">
          <Users size={13} />
          <span>{cls.quantity}/{cls.quantity} học sinh</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-dark-500 dark:text-dark-400">Sĩ số</span>
          <span className={`badge ${occupancy >= 90 ? 'badge-red' : occupancy >= 70 ? 'badge-yellow' : 'badge-green'}`}>{occupancy}%</span>
        </div>
        <div className="h-2 rounded-full bg-dark-100 dark:bg-dark-700 overflow-hidden">
          <div className={`h-full rounded-full ${barColor} transition-all duration-700`} style={{ width: `${occupancy}%` }} />
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-dark-100 dark:border-dark-700 flex gap-2">
        <button className={`flex-1 btn-secondary text-xs justify-center ${!active ? 'cursor-pointer' : 'cursor-not-allowed'}`} disabled={active}>Chi tiết</button>
        <button className={`flex-1 btn-accent text-xs justify-center ${!active ? 'cursor-pointer' : 'cursor-not-allowed'}`} disabled={active}>Điểm danh</button>
      </div>
    </div>
  )
};

export default function Classes({ user }) {
  const [data, setData] = useState([]);
  
  async function fetchClassData() {
    try {
      if (user) {
        const response = await getDataFromAPI("get-all-classes");
        setData(response);
      }
    } catch (err) {
      console.error("Fetch class data failed: ", err);
    }
  }
  
  useEffect(()=> {
    fetchClassData();
  }, []);
  
  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-dark-900 dark:text-white">Lớp học</h2>
          <p className="text-sm text-dark-400 dark:text-dark-500 mt-0.5">Quản lý <span class="text-red-100 underline">{(user.classId !== 0 ? 'lớp ' + user.className || 'default' : 'các lớp học trong trường')}</span></p>
        </div>
        <button className={`btn-primary text-xs ${user.role !== 'Quản lý' ? 'cursor-not-allowed' : 'cursor-pointer'}`} disabled={user.role !== 'Quản lý'}>
          <Plus size={13} /> Thêm lớp học
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Tổng lớp', value: data.length, color: 'text-accent-600 dark:text-accent-400', bg: 'bg-accent-50 dark:bg-accent-900/20' },
          { label: 'Lớp Mầm', value: 2, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
          { label: 'Lớp Chồi', value: 2, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
          { label: 'Lớp Thỏ Ngọc', value: 2, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
          { label: 'Tổng học sinh', value: data.reduce((s, c) => s + c.quantity, 0), color: 'text-primary-600 dark:text-primary-400', bg: 'bg-primary-50 dark:bg-primary-900/20' },
          { label: 'Chỗ trống', value: data.reduce((s, c) => s + (c.quantity - c.quantity), 0), color: 'text-dark-600 dark:text-dark-300', bg: 'bg-dark-100 dark:bg-dark-800' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4 border border-dark-100/50 dark:border-dark-700/50`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-dark-500 dark:text-dark-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map(cls => <ClassCard key={cls.id} cls={cls} active={user.classId !== cls.id} />)}
      </div>
    </div>
  )
};