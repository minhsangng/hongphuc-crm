import React from 'react'
import { BarChart3, Download, TrendingUp, DollarSign, Users, BookOpen } from 'lucide-react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Sector
} from 'recharts'
import { tuitionChartData, enrollmentChartData } from '../data/mockData'
import { formatVND, formatVNDShort } from '../utils/helpers'

const COLORS = ['#2563eb', '#dc2626', '#16a34a', '#d97706', '#7c3aed']

const pieData = [
  { name: 'Lá 1', value: 15 },
  { name: 'Lá 2', value: 14 },
  { name: 'Chồi 1', value: 16 },
  { name: 'Chồi 2', value: 15 },
  { name: 'Mầm 1+2', value: 27 },
]

function SectionCard({ title, desc, children }) {
  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl p-5 border border-dark-100 dark:border-dark-700 shadow-card animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-dark-900 dark:text-white text-sm">{title}</h3>
          {desc && <p className="text-xs text-dark-400 dark:text-dark-500 mt-0.5">{desc}</p>}
        </div>
        <button className="btn-secondary text-xs gap-1.5">
          <Download size={12} /> Xuất
        </button>
      </div>
      {children}
    </div>
  )
}

export default function Reports() {
  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-dark-900 dark:text-white">Báo cáo</h2>
          <p className="text-sm text-dark-400 dark:text-dark-500 mt-0.5">Thống kê & phân tích năm học 2025–2026</p>
        </div>
        <button className="btn-primary text-xs">
          <Download size={13} /> Xuất tất cả
        </button>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: DollarSign, label: 'Doanh thu năm', value: '1.224.500.000 đ', sub: '+12.1% so với năm ngoái', color: 'from-accent-600 to-accent-700' },
          { icon: TrendingUp,  label: 'Chi phí năm',   value: '519.200.000 đ',  sub: '-3.2% so với năm ngoái', color: 'from-primary-600 to-primary-700' },
          { icon: Users,       label: 'Học sinh mới',  value: '34',             sub: 'Trong năm học này',        color: 'from-green-600 to-green-700' },
          { icon: BookOpen,    label: 'Ra trường',      value: '28',             sub: 'Hoàn thành chương trình',  color: 'from-purple-600 to-purple-700' },
        ].map(({ icon: Icon, label, value, sub, color }) => (
          <div key={label} className={`rounded-2xl p-5 bg-gradient-to-br ${color} text-white shadow-lg`}>
            <Icon size={20} className="opacity-80 mb-3" />
            <p className="text-xl font-bold leading-tight">{value}</p>
            <p className="text-xs font-medium mt-1 opacity-90">{label}</p>
            <p className="text-xs mt-0.5 opacity-70">{sub}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <SectionCard title="Doanh thu theo tháng" desc="Học phí & Chi phí 2025" className="xl:col-span-2">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={tuitionChartData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-dark-700" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={formatVNDShort} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} width={52} />
              <Tooltip formatter={v => formatVND(v)} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="tuition" name="Học phí" fill="#2563eb" radius={[4,4,0,0]} maxBarSize={20} />
              <Bar dataKey="expense" name="Chi phí" fill="#dc2626" radius={[4,4,0,0]} maxBarSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="Phân bố học sinh" desc="Theo lớp học">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v, n) => [`${v} học sinh`, n]} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      <SectionCard title="Biến động học sinh nhập học & ra trường" desc="12 tháng qua">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={enrollmentChartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-dark-700" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            <Line type="monotone" dataKey="enrolled" name="Nhập học" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="graduated" name="Ra trường" stroke="#dc2626" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </SectionCard>
    </div>
  )
}
