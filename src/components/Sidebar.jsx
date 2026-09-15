import { LayoutDashboard, Users, Baby, GraduationCap, ChefHat, BarChart3, Settings, ChevronLeft, ChevronRight, X, MessageSquareText } from 'lucide-react';
import { useSidebar } from '../context/AppContext';
import { images } from "../utils/helpers";

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'teachers', label: 'Giáo viên', icon: Users },
  { id: 'childrens', label: 'Học sinh', icon: Baby },
  { id: 'classes', label: 'Lớp học', icon: GraduationCap },
  { id: 'kitchens', label: 'Bếp ăn', icon: ChefHat },
  { id: 'reports', label: 'Báo cáo', icon: BarChart3 },
  { id: 'feedbacks', label: 'Phản hồi', icon: MessageSquareText },
  { id: 'settings', label: 'Cài đặt', icon: Settings },
]

export default function Sidebar({ currentPage, onNavigate }) {
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = useSidebar();

  function NavLink({ item }) {
    const isActive = currentPage === item.id
    const Icon = item.icon
    return (
      <li className="relative group">
        <button onClick={() => { onNavigate(item.id); setMobileOpen(false) }}
          className={`flex items-center gap-2 px-3 py-2 cursor-pointer w-full text-white hover:bg-(--color-red) ${isActive ? 'bg-(--color-red)' : 'nav-item-inactive'} ${collapsed ? 'justify-center px-2' : ''}`}
        >
          <Icon size={18} strokeWidth={isActive ? 2.5 : 2} className="flex-shrink-0" />
          {!collapsed && <span className="truncate">{item.label}</span>}
        </button>
        {collapsed && (
          <div className="sidebar-tooltip top-1/2 -translate-y-1/2">
            {item.label}
          </div>
        )}
      </li>
    )
  }

  const sidebarContent = (
    <div className={`flex flex-col h-full ${collapsed ? 'w-16' : 'w-60'} transition-all duration-300`}>
      {/* Logo */}
      <a href="/" className="flex justify-center items-center gap-2 border-r border-black shrink-0 pt-4 pb-2 mb-4 border-b border-dark">
        <span className="w-11 h-11 rounded-full flex items-center justify-center">
          <img src="/favicon.svg" className="drop-shadow-xs drop-shadow-white" />
        </span>
        <span className="leading-tight">
          <span className="block text-[0.65rem] italic tracking-wide text-(--color-ink-light) pb-0.5 text-shadow-2xs text-shadow-white">Trường Mầm non</span>
          <span className="block font-display uppercase font-bold text-xl text-(--color-red) text-shadow-xs text-shadow-white">Hồng Phúc</span>
        </span>
      </a>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto pb-4 px-2">
        <ul className="space-y-0.5">
          {navItems.map(item => <NavLink key={item.id} item={item} />)}
        </ul>
      </nav>

      {/* Collapse toggle – desktop only */}
      <div className="hidden lg:flex items-center justify-end p-2 border-t border-white">
        <button onClick={() => setCollapsed(c => !c)} className="p-2 rounded-lg text-white hover:bg-white hover:text-black cursor-pointer transition ease-linear" title={collapsed ? 'Mở rộng' : 'Thu gọn'}>
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Footer info */}
      {!collapsed && (
        <div className="px-4 pb-4">
          <div className="rounded-xl bg-gradient-to-br from-(--color-gold) to-(--color-red) p-3 border border-white">
            <p className="text-xs font-semibold text-dark-700 dark:text-dark-300 mb-0.5">Năm học 2025–2026</p>
            <p className="text-xs text-dark-500 dark:text-dark-500">Học kỳ II • Tháng 12</p>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className={`hidden lg:flex flex-col h-screen sticky top-0 bg-gray-700 border-r border-black shadow-xl flex-shrink-0 transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}>
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-dark-900/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative z-50 flex flex-col h-full w-60 bg-white shadow-2xl animate-slide-in">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-dark-400 hover:bg-dark-100"
            >
              <X size={18} />
            </button>
            <div className="w-60">{sidebarContent}</div>
          </aside>
        </div>
      )}
    </>
  )
}
