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
        <button
          onClick={() => { onNavigate(item.id); setMobileOpen(false) }}
          className={`nav-item w-full ${isActive ? 'nav-item-active' : 'nav-item-inactive'} ${collapsed ? 'justify-center px-2' : ''}`}
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
      <a href="/">
        <div className={`flex justify-center items-center px-4 mb-5 border-b border-dark-100 dark:border-dark-800 ${collapsed ? 'justify-center px-2' : ''}`}>
          <div className="flex items-center mt-2">
              <img src="/favicon_v2.svg" className="h-20" alt="Logo" />
          </div>
        </div>
      </a>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto pb-4 px-2">
        <ul className="space-y-0.5">
          {navItems.map(item => <NavLink key={item.id} item={item} />)}
        </ul>
      </nav>

      {/* Collapse toggle – desktop only */}
      <div className="hidden lg:flex items-center justify-end p-2 border-t border-dark-100 dark:border-dark-800">
        <button onClick={() => setCollapsed(c => !c)} className="p-2 rounded-lg text-dark-400 hover:text-dark-700 dark:hover:text-dark-200 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors" title={collapsed ? 'Mở rộng' : 'Thu gọn'}>
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Footer info */}
      {!collapsed && (
        <div className="px-4 pb-4">
          <div className="rounded-xl bg-gradient-to-br from-accent-600/10 to-primary-600/10 dark:from-accent-900/30 dark:to-primary-900/30 p-3 border border-accent-200/50 dark:border-accent-800/30">
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
      <aside className={`hidden lg:flex flex-col h-screen sticky top-0 bg-white dark:bg-dark-900 border-r border-dark-100 dark:border-dark-800 shadow-sidebar flex-shrink-0 transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}>
        {sidebarContent}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-dark-900/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative z-50 flex flex-col h-full w-60 bg-white dark:bg-dark-900 shadow-2xl animate-slide-in">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-800"
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
