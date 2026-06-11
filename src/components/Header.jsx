import React, { useState, useRef, useEffect } from 'react'
import { Bell, Search, Menu, X, Sun, Moon, ChevronDown, LogOut, User, Settings } from 'lucide-react'
import { useTheme, useSidebar } from '../context/AppContext'
import { notifications } from '../data/mockData'
import Avatar from './Avatar'

export default function Header({ currentPage }) {
  const { dark, toggle } = useTheme()
  const { setMobileOpen, mobileOpen } = useSidebar()
  const [showNotif, setShowNotif] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [search, setSearch] = useState('')
  const notifRef = useRef()
  const profileRef = useRef()

  const unread = notifications.filter(n => !n.read).length

  useEffect(() => {
    function handle(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false)
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false)
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const pageNames = {
    dashboard: 'Dashboard',
    parents: 'Phụ huynh',
    childrens: 'Học sinh',
    classes: 'Lớp học',
    reports: 'Báo cáo',
    settings: 'Cài đặt',
  }

  const notifTypeColor = {
    warning: 'bg-yellow-400',
    info:    'bg-accent-500',
    success: 'bg-green-500',
    error:   'bg-red-500',
  }

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-dark-900/90 backdrop-blur-md border-b border-dark-100 dark:border-dark-800">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6 gap-4">
        {/* Left: hamburger + breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 text-dark-500 dark:text-dark-400 transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="hidden sm:flex items-center gap-1 text-sm">
            <span className="text-dark-400 dark:text-dark-500">Hồng Phúc</span>
            <span className="text-dark-300 dark:text-dark-600 mx-1">/</span>
            <span className="font-semibold text-dark-800 dark:text-dark-100">{pageNames[currentPage] || currentPage}</span>
          </div>
          <h1 className="sm:hidden font-bold text-dark-900 dark:text-white text-base">{pageNames[currentPage]}</h1>
        </div>

        {/* Center: search */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
            <input
              type="text"
              placeholder="Tìm học sinh, lớp học, phụ huynh..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-9 h-9 text-xs"
            />
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-1.5">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            title={dark ? 'Chế độ sáng' : 'Chế độ tối'}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-dark-500 dark:text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => { setShowNotif(v => !v); setShowProfile(false) }}
              className="relative w-9 h-9 rounded-lg flex items-center justify-center text-dark-500 dark:text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
            >
              <Bell size={18} />
              {unread > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unread}
                </span>
              )}
            </button>

            {showNotif && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-dark-800 rounded-2xl shadow-xl border border-dark-100 dark:border-dark-700 overflow-hidden animate-fade-in z-50">
                <div className="flex items-center justify-between px-4 py-3 border-b border-dark-100 dark:border-dark-700">
                  <h3 className="font-semibold text-dark-900 dark:text-white text-sm">Thông báo</h3>
                  <span className="badge badge-red">{unread} mới</span>
                </div>
                <div className="divide-y divide-dark-50 dark:divide-dark-700/50 max-h-72 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className={`flex gap-3 px-4 py-3 hover:bg-dark-50 dark:hover:bg-dark-700/50 transition-colors cursor-pointer ${!n.read ? 'bg-accent-50/50 dark:bg-accent-900/10' : ''}`}>
                      <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${notifTypeColor[n.type]}`} />
                      <div className="min-w-0">
                        <p className={`text-sm font-medium truncate ${!n.read ? 'text-dark-900 dark:text-white' : 'text-dark-600 dark:text-dark-400'}`}>{n.title}</p>
                        <p className="text-xs text-dark-500 dark:text-dark-500 truncate">{n.desc}</p>
                        <p className="text-xs text-dark-400 dark:text-dark-600 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-dark-100 dark:border-dark-700">
                  <button className="text-xs text-accent-600 dark:text-accent-400 font-medium hover:underline">Xem tất cả thông báo</button>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => { setShowProfile(v => !v); setShowNotif(false) }}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
            >
              <Avatar name="Nguyễn Hồng Phúc" size="sm" />
              <span className="hidden sm:block text-sm font-medium text-dark-700 dark:text-dark-200">Hồng Phúc</span>
              <ChevronDown size={14} className="hidden sm:block text-dark-400" />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-800 rounded-2xl shadow-xl border border-dark-100 dark:border-dark-700 overflow-hidden animate-fade-in z-50">
                <div className="px-4 py-3 border-b border-dark-100 dark:border-dark-700">
                  <p className="font-semibold text-sm text-dark-900 dark:text-white">Nguyễn Hồng Phúc</p>
                  <p className="text-xs text-dark-500 dark:text-dark-400">Quản trị viên</p>
                </div>
                <div className="py-1">
                  {[
                    { icon: User, label: 'Hồ sơ cá nhân' },
                    { icon: Settings, label: 'Cài đặt' },
                  ].map(({ icon: Icon, label }) => (
                    <button key={label} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-dark-700 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-700 transition-colors">
                      <Icon size={15} />
                      {label}
                    </button>
                  ))}
                </div>
                <div className="py-1 border-t border-dark-100 dark:border-dark-700">
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <LogOut size={15} />
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
