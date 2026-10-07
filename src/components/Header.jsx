import { useState, useRef, useEffect } from "react";
import { Bell, Search, Menu, X, ChevronDown, LogOut, User, Settings, Home } from "lucide-react";
import { useSidebar } from "../context/AppContext";
import { notifications } from "../data/mockData";
import Avatar from "./Avatar";

export default function Header({ user, currentPage, onExitAdmin }) {
  const { setMobileOpen, mobileOpen } = useSidebar();
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [search, setSearch] = useState("");
  const notifRef = useRef();
  const profileRef = useRef();

  const unread = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handle(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const pageNames = {
    dashboard: "Tổng quan",
    teachers: "Giáo viên",
    childrens: "Học sinh",
    classes: "Lớp học",
    kitchens: "Bếp ăn",
    reports: "Báo cáo",
    feedbacks: "Phản hồi",
    settings: "Cài đặt",
  }

  const notifTypeColor = {
    warning: "bg-yellow-400",
    info:    "bg-blue-500",
    success: "bg-green-500",
    error:   "bg-red-500",
  }
  
  useEffect(() => {
    document.title = "Mầm non Hồng Phúc | " + pageNames[currentPage];
  }, [currentPage]);

  return (
    <header className="sticky top-0 z-30 ml-2 mb-2 rounded-xl bg-white/50 backdrop-blur-md shadow-md">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6 gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-black transition-colors"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="hidden sm:flex items-center gap-1 text-sm">
            <span className="text-gray-400">Quản trị</span>
            <span className="text-gray-300 mx-1">/</span>
            <span className="font-semibold text-gray-800">{pageNames[currentPage] || currentPage}</span>
          </div>
          <h1 className="sm:hidden font-bold text-gray-900 text-base">{pageNames[currentPage]}</h1>
        </div>

        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-black-400" />
            <input type="text" placeholder="Tìm học sinh, lớp học, phụ huynh..." value={search}
              onChange={e => setSearch(e.target.value)} className="input-field pl-9 h-9 text-xs"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="relative" ref={notifRef}>
            <button onClick={() => { setShowNotif(v => !v); setShowProfile(false) }}
              className="relative w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"
            >
              <Bell size={18} />
              {unread > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-(--color-red) text-white text-[0.5rem] font-bold rounded-full flex items-center justify-center">
                  {unread}
                </span>
              )}
            </button>

            {showNotif && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in z-50">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900 text-sm">Thông báo</h3>
                  <span className="badge badge-red">{unread} mới</span>
                </div>
                <div className="divide-y divide-gray-50 max-h-72 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className={`flex gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer ${!n.read ? 'bg-blue-50/50' : ''}`}>
                      <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${notifTypeColor[n.type]}`} />
                      <div className="min-w-0">
                        <p className={`text-sm font-medium truncate ${!n.read ? 'text-gray-900' : 'text-gray-600'}`}>{n.title}</p>
                        <p className="text-xs text-gray-500 truncate">{n.desc}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 border-t border-gray-100">
                  <button className="text-xs text-blue-600 font-medium hover:underline">Xem tất cả thông báo</button>
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={profileRef}>
            <button
              onClick={() => { setShowProfile(v => !v); setShowNotif(false) }}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Avatar name={user?.fullName || "Vân An"} size="sm" />
              <span className="hidden sm:block text-sm font-medium text-gray-700">{user?.userName || "Vân An"}</span>
              <ChevronDown size={14} className="hidden sm:block text-gray-400" />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="font-semibold text-sm text-gray-900">Hi, {user?.fullName || 'Vân An'}!</p>
                  <p className="text-xs text-gray-500">{user?.role || 'Quản trị viên'}</p>
                </div>
                <div className="py-1">
                  {[
                    { icon: User, label: 'Hồ sơ cá nhân' },
                    { icon: Settings, label: 'Cài đặt' },
                  ].map(({ icon: Icon, label }) => (
                    <button key={label} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition">
                      <Icon size={15} />
                      {label}
                    </button>
                  ))}
                </div>
                <div className="py-1 border-t border-gray-100">
                  {onExitAdmin && (
                    <button onClick={onExitAdmin} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-blue-600 hover:bg-blue-50 transition">
                      <Home size={15} />
                      Về trang chủ
                    </button>
                  )}
                  <button onClick={onExitAdmin} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition">
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
};