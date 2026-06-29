import React, { useState } from 'react'
import { Plus, Phone, Mail, MapPin, UserCheck } from 'lucide-react'
import DataTable from '../components/DataTable'
import Avatar from '../components/Avatar'
import { parentsData } from '../data/mockData'

const columns = [
  { key: 'name', label: 'Họ tên', render: (v) => (
    <div className="flex items-center gap-2.5">
      <Avatar name={v} size="sm" />
      <span className="font-medium text-dark-900 dark:text-white text-sm">{v}</span>
    </div>
  )},
  { key: 'phone', label: 'Điện thoại', sortable: false, render: v => (
    <span className="flex items-center gap-1 text-dark-600 dark:text-dark-400"><Phone size={12} />{v}</span>
  )},
  { key: 'email', label: 'Email', sortable: false, render: v => (
    <span className="flex items-center gap-1 text-dark-600 dark:text-dark-400 text-xs"><Mail size={12} />{v}</span>
  )},
  { key: 'children', label: 'Con em', render: v => <span className="badge badge-blue">{v}</span> },
  { key: 'address', label: 'Địa chỉ', sortable: false, render: v => (
    <span className="flex items-center gap-1 text-xs text-dark-500 dark:text-dark-400"><MapPin size={12} className="flex-shrink-0" />{v}</span>
  )},
  { key: 'status', label: 'Trạng thái', render: v => {
    const map = { active: ['badge-green', 'Hợp tác tốt'], warning: ['badge-yellow', 'Cần theo dõi'], inactive: ['badge-red', 'Chưa liên hệ'] }
    const [cls, label] = map[v] || ['badge-gray', v]
    return <span className={`badge ${cls}`}>{label}</span>
  }},
]

export default function Teachers() {
  return (
    <div className="p-4 lg:p-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-dark-900 dark:text-white">Phụ huynh</h2>
          <p className="text-sm text-dark-400 dark:text-dark-500 mt-0.5">Quản lý thông tin phụ huynh học sinh</p>
        </div>
        <button className="btn-primary text-xs">
          <Plus size={13} /> Thêm phụ huynh
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Tổng phụ huynh', value: parentsData.length, color: 'text-accent-600 dark:text-accent-400', bg: 'bg-accent-50 dark:bg-accent-900/20' },
          { label: 'Hợp tác tốt', value: parentsData.filter(p => p.status === 'active').length, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
          { label: 'Cần theo dõi', value: parentsData.filter(p => p.status === 'warning').length, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
          { label: 'Chưa liên hệ', value: parentsData.filter(p => p.status === 'inactive').length, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4 border border-dark-100/50 dark:border-dark-700/50`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-dark-500 dark:text-dark-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <DataTable
        title="Danh sách phụ huynh"
        columns={columns}
        data={parentsData}
        pageSize={6}
      />
    </div>
  )
}
