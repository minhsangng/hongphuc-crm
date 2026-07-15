import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const links = [
    { label: 'Giới thiệu', href: '#about' },
    { label: 'Chương trình', href: '#programs' },
    { label: 'Cơ sở vật chất', href: '#facilities' },
    { label: 'Giáo viên', href: '#teachers' },
    { label: 'Liên hệ', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-sm shadow-red-100/50 border-b border-red-50' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover:scale-110 ${scrolled ? 'bg-red-50 shadow-sm' : 'bg-white/20 backdrop-blur-sm'}`}>
            <img src="./favicon.svg" alt="Logo" className="w-6 h-6" />
          </div>
          <div>
            <p className={`text-[10px] font-medium transition-colors leading-none ${scrolled ? 'text-red-400' : 'text-red-400'}`}>Mầm non</p>
            <p className={`font-black text-sm leading-tight transition-colors ${scrolled ? 'text-gray-900' : 'text-gray-900'}`}>Hồng Phúc</p>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105 active:scale-95 ${scrolled ? 'text-gray-600 hover:text-red-600 hover:bg-red-50' : 'text-red-600 hover:text-gray-600 hover:bg-gray-50'}`}>
              {l.label}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-2">
          <Link to="/login"
            className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95 ${scrolled ? 'text-gray-600 hover:text-red-600 hover:bg-red-50 border border-gray-200' : 'text-red-500 bg-white/10 hover:bg-white/20 border border-red-400/25 backdrop-blur-sm'}`}>
            Đăng nhập
          </Link>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-4 py-2 rounded-xl text-sm font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105 active:scale-95 transition-all">
            Đăng ký ngay
          </button>
          <button onClick={() => setMenuOpen(v => !v)} className={`md:hidden p-2 rounded-xl transition-colors ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/15'}`}>
            <div className="w-5 space-y-1">
              <div className="h-0.5 bg-current rounded-full transition-all" style={{ transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }} />
              <div className="h-0.5 bg-current rounded-full transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
              <div className="h-0.5 bg-current rounded-full transition-all" style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-xl border-t border-red-50 px-4 py-3 space-y-1">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
              {l.label}
            </a>
          ))}
          <Link to="/login" onClick={() => setMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 bg-red-50 mt-2">
            Đăng nhập
          </Link>
        </div>
      )}
    </nav>
  );
}