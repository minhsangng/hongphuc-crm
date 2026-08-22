import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { DollarSign, Users, Baby, GraduationCap, BookOpen, TrendingUp, Download, RefreshCw, Plus } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import Avatar from '../components/Avatar';
import { statsData, tuitionChartData, enrollmentChartData, childrenData, teachersData } from '../data/mockData';
import { formatVND, formatVNDShort, getDataFromAPI } from '../utils/helpers';
import { year } from 'drizzle-orm/mysql-core';

// Custom recharts tooltip
function CustomTooltip({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl shadow-xl border border-dark-100 dark:border-dark-700 p-3 text-xs">
      <p className="font-semibold text-dark-700 dark:text-dark-200 mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} className="flex items-center gap-2 mb-1">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
          <span className="text-dark-500 dark:text-dark-400">{p.name}:</span>
          <span className="font-semibold text-dark-800 dark:text-dark-200">{formatter ? formatter(p.value) : p.value}</span>
        </div>
      ))}
    </div>
  )
}

const childrenColumns = [
  { key: 'name', label: 'Họ tên', render: (v, row) => (
    <div className="flex items-center gap-2.5">
      <Avatar name={v} size="sm" />
      <div>
        <p className="font-medium text-dark-900 dark:text-white text-sm">{v}</p>
        <p className="text-xs text-dark-400">{row.dob}</p>
      </div>
    </div>
  )},
  { key: 'class', label: 'Lớp', render: v => <span className="badge badge-blue">{v}</span> },
  { key: 'parent', label: 'Phụ huynh' },
  { key: 'phone', label: 'Điện thoại', sortable: false },
  { key: 'tuition', label: 'Học phí', render: v => {
    const map = { 'Đã đóng': 'badge-green', 'Chưa đóng': 'badge-red', 'Trễ hạn': 'badge-yellow' }
    return <span className={`badge ${map[v] || 'badge-gray'}`}>{v}</span>
  }},
]

const teacherColumns = [
  { key: 'name', label: 'Họ tên', render: (v, row) => (
    <div className="flex items-center gap-2.5">
      <Avatar name={v} size="sm" />
      <div>
        <p className="font-medium text-dark-900 dark:text-white text-sm">{v}</p>
        <p className="text-xs text-dark-400">{row.email}</p>
      </div>
    </div>
  )},
  { key: 'subject', label: 'Vai trò' },
  { key: 'class', label: 'Lớp', render: v => <span className="badge badge-blue">{v}</span> },
  { key: 'experience', label: 'Kinh nghiệm' },
  { key: 'status', label: 'Trạng thái', render: v => {
    const map = { active: ['badge-green', 'Đang làm'], leave: ['badge-yellow', 'Nghỉ phép'] }
    const [cls, label] = map[v] || ['badge-gray', v]
    return <span className={`badge ${cls}`}>{label}</span>
  }},
]

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeChart, setActiveChart] = useState('tuition');

  async function CheckAuth() {
    try {
      const response = await getDataFromAPI("check-auth", "get");
      if (response.status === 200 && response.authenticated) {
        setUser(response.user);
      } else navigate("/login");
    } catch (err) {
      console.log("Auth role failed: ", err);
      navigate("/login");
    }
  };
  
  useEffect(() => {
    // CheckAuth();
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const stats = [
    { icon: DollarSign, label: 'Tổng chi tháng 12', value: formatVND(statsData.totalExpense), change: statsData.expenseChange, changeLabel: 'So với tháng trước', color: 'primary' },
    { icon: TrendingUp, label: 'Học phí tháng 12', value: formatVND(statsData.totalTuition), change: statsData.tuitionChange, changeLabel: 'So với tháng trước', color: 'accent' },
    { icon: Baby, label: 'Tổng học sinh', value: statsData.totalChildren, change: statsData.childrenChange, changeLabel: 'Tháng này nhập học thêm 4', color: 'green' },
    { icon: Users, label: 'Giáo viên & NV', value: statsData.totalTeachers, change: statsData.teachersChange, changeLabel: 'Ổn định', color: 'purple' },
    { icon: BookOpen, label: 'Lớp học', value: statsData.totalClasses, change: statsData.classesChange, changeLabel: '2 lá, 2 chồi, 2 mầm', color: 'yellow' },
    { icon: TrendingUp, label: 'Tỷ lệ tăng trưởng', value: `${statsData.growthRate}%`, change: statsData.growthChange, changeLabel: 'Năm học 2025–2026', color: 'pink' },
  ]

  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      {/* Page title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-dark-900 dark:text-white">Tổng quan</h2>
          <p className="text-sm text-dark-400 dark:text-dark-500 mt-0.5">{ new Date().toLocaleDateString('vi-VN', {month: 'long'}) } năm { new Date().toLocaleDateString('vi-VN', {year: 'numeric'}) } • Cập nhật lúc {new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary gap-1.5 text-xs hidden sm:inline-flex">
            <RefreshCw size={13} /> Làm mới
          </button>
          <button className="btn-secondary gap-1.5 text-xs hidden sm:inline-flex">
            <Download size={13} /> Xuất báo cáo
          </button>
          <button className="btn-primary gap-1.5 text-xs">
            <Plus size={13} /> Thêm học sinh
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 lg:gap-4">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} loading={loading} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        {/* Main chart */}
        <div className="xl:col-span-3 bg-white dark:bg-dark-800 rounded-2xl p-5 border border-dark-100 dark:border-dark-700 shadow-card animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h3 className="font-semibold text-dark-900 dark:text-white text-sm">Thu học phí & Chi phí</h3>
              <p className="text-xs text-dark-400 dark:text-dark-500 mt-0.5">12 tháng qua</p>
            </div>
            <div className="flex bg-dark-100 dark:bg-dark-700 rounded-lg p-0.5">
              {[
                { key: 'tuition', label: 'Học phí' },
                { key: 'enrollment', label: 'Học sinh' },
              ].map(t => (
                <button key={t.key} onClick={() => setActiveChart(t.key)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    activeChart === t.key
                      ? 'bg-white dark:bg-dark-600 text-dark-900 dark:text-white shadow-sm'
                      : 'text-dark-500 dark:text-dark-400 hover:text-dark-700 dark:hover:text-dark-200'
                  }`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {activeChart === 'tuition' ? (
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={tuitionChartData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="colorTuition" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-dark-700" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={formatVNDShort} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={52} />
                <Tooltip content={<CustomTooltip formatter={formatVND} />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="tuition" name="Học phí" stroke="#2563eb" strokeWidth={2.5} fill="url(#colorTuition)" dot={false} activeDot={{ r: 4 }} />
                <Area type="monotone" dataKey="expense" name="Chi phí" stroke="#dc2626" strokeWidth={2.5} fill="url(#colorExpense)" dot={false} activeDot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={enrollmentChartData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-dark-700" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="enrolled" name="Nhập học" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={28} />
                <Bar dataKey="graduated" name="Ra trường" fill="#dc2626" radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Mini stats + quick info */}
        <div className="xl:col-span-2 space-y-4">
          {/* Tuition collection rate */}
          <div className="bg-white dark:bg-dark-800 rounded-2xl p-5 border border-dark-100 dark:border-dark-700 shadow-card animate-fade-in">
            <h3 className="font-semibold text-dark-900 dark:text-white text-sm mb-4">Thu học phí tháng 12</h3>
            <div className="space-y-3">
              {[
                { label: 'Đã đóng', count: 74, total: 87, color: 'bg-green-500' },
                { label: 'Chưa đóng', count: 8, total: 87, color: 'bg-red-500' },
                { label: 'Trễ hạn', count: 5, total: 87, color: 'bg-yellow-500' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-dark-600 dark:text-dark-400 font-medium">{item.label}</span>
                    <span className="font-semibold text-dark-800 dark:text-dark-200">{item.count}/{item.total}</span>
                  </div>
                  <div className="h-2 rounded-full bg-dark-100 dark:bg-dark-700 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color} transition-all duration-1000`}
                      style={{ width: `${(item.count / item.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-dark-100 dark:border-dark-700 flex items-center justify-between">
              <span className="text-xs text-dark-500 dark:text-dark-400">Tỷ lệ thu được</span>
              <span className="text-lg font-bold text-green-600 dark:text-green-400">85%</span>
            </div>
          </div>

          {/* Class occupancy */}
          <div className="bg-white dark:bg-dark-800 rounded-2xl p-5 border border-dark-100 dark:border-dark-700 shadow-card animate-fade-in">
            <h3 className="font-semibold text-dark-900 dark:text-white text-sm mb-4">Sĩ số lớp học</h3>
            <div className="space-y-2.5">
              {[
                { name: 'Lá 1', students: 15, cap: 20 },
                { name: 'Lá 2', students: 14, cap: 20 },
                { name: 'Chồi 1', students: 16, cap: 20 },
                { name: 'Chồi 2', students: 15, cap: 20 },
                { name: 'Mầm 1', students: 14, cap: 18 },
                { name: 'Mầm 2', students: 13, cap: 18 },
              ].map(cls => {
                const pct = Math.round((cls.students / cls.cap) * 100)
                const color = pct >= 90 ? 'bg-red-500' : pct >= 70 ? 'bg-yellow-500' : 'bg-accent-500'
                return (
                  <div key={cls.name} className="flex items-center gap-3">
                    <span className="text-xs text-dark-600 dark:text-dark-400 w-12 flex-shrink-0">{cls.name}</span>
                    <div className="flex-1 h-1.5 rounded-full bg-dark-100 dark:bg-dark-700 overflow-hidden">
                      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs font-medium text-dark-700 dark:text-dark-300 w-14 text-right">{cls.students}/{cls.cap}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <DataTable
          title="Danh sách học sinh"
          columns={childrenColumns}
          data={childrenData}
          pageSize={5}
          loading={loading}
        />
        <DataTable
          title="Danh sách giáo viên & nhân viên"
          columns={teacherColumns}
          data={teachersData}
          pageSize={5}
          loading={loading}
        />
      </div>
    </div>
  )
}
