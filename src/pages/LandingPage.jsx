import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Palette, Music, Brain, Trophy, Earth, HandHeart, MapPin, PhoneCall, Clock, Mail, Share2, X, ArrowUp, Send, RefreshCcw } from 'lucide-react';
import Facebook from '../assets/facebook.svg';
import Tiktok from '../assets/tiktok.svg';
import Zalo from '../assets/zalo.svg';
import Heart from '../assets/heart.svg';
import Quality from '../assets/quality.svg';
import Book from '../assets/book.svg';
import Light from '../assets/light.svg';
import Student from '../assets/student.svg';
import Teacher from '../assets/teacher.svg';
import School from '../assets/school.svg';
import Experience from '../assets/experience.svg';
import Child1 from '../assets/child-range-1.svg';
import Child2 from '../assets/child-range-2.svg';
import Child3 from '../assets/child-range-3.svg';
import Classroom  from '../assets/classroom.jpg';

function useInView(threshold = 0.12) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, direction = 'up', className = '' }) {
  const [ref, visible] = useInView();
  const hidden = direction === 'up' ? 'translate-y-12' : direction === 'left' ? '-translate-x-12' : 'translate-x-12';
  return (
    <div ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${hidden}`} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════
   LOADING SCREEN
══════════════════════════════════════════ */
function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let p = 0;
    const id = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p >= 100) { p = 100; clearInterval(id); setTimeout(onDone, 500); }
      setProgress(Math.min(p, 100));
    }, 110);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <div className={`fixed inset-0 z-[999] flex flex-col items-center justify-center transition-opacity duration-700 overflow-hidden ${progress === 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{ background: '#fff' }}>
      {/* Soft blobs */}
      <div className="absolute top-[-120px] left-[-80px] w-96 h-96 rounded-full opacity-30 blur-3xl" style={{ background: 'radial-gradient(circle, #fca5a5, #ef4444)' }} />
      <div className="absolute bottom-[-100px] right-[-60px] w-80 h-80 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #fcd34d, #f97316)' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #dc2626, transparent)' }} />

      {/* Floating dots */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className="absolute rounded-full opacity-40"
          style={{
            width: `${16 + i * 12}px`, height: `${16 + i * 12}px`,
            background: ['#fca5a5','#fde68a','#bbf7d0','#bfdbfe','#e9d5ff','#fed7aa'][i],
            left: `${8 + i * 16}%`, top: `${15 + (i % 3) * 25}%`,
            animation: `loadFloat ${2 + i * 0.4}s ease-in-out ${i * 0.3}s infinite alternate`,
          }} />
      ))}

      <div className="relative z-10 flex flex-col items-center gap-5">
        {/* Logo card */}
        <div className="w-24 h-24 bg-white rounded-3xl shadow-2xl shadow-red-100 border border-red-100 flex items-center justify-center"
          style={{ animation: 'loadFloat 2s ease-in-out infinite alternate' }}>
          <img src="./favicon.svg" alt="Logo" className="w-14 h-14" />
        </div>
        <div className="text-center">
          <p className="text-gray-400 text-xs font-medium tracking-widest uppercase mb-1">Mầm non</p>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Hồng Phúc</h1>
        </div>
        {/* Progress */}
        <div className="w-52 bg-gray-100 rounded-full h-1.5 overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-red-400 to-red-600 transition-all duration-200"
            style={{ width: `${progress}%` }} />
        </div>
        <p className="text-gray-400 text-xs">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════ */
function Navbar() {
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

/* ══════════════════════════════════════════
   HERO SECTION
══════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Large blurred blobs — parallax */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, #fca5a5 0%, #ef4444 60%, transparent 100%)' }} />
        <div className="absolute bottom-[-15%] left-[-5%] w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #fde68a 0%, #f97316 60%, transparent 100%)' }} />
        <div className="absolute top-[30%] left-[10%] w-72 h-72 rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, #bbf7d0, #22c55e)' }} />
        <div className="absolute top-[20%] right-[25%] w-48 h-48 rounded-full blur-2xl opacity-20"
          style={{ background: 'radial-gradient(circle, #c7d2fe, #6366f1)' }} />
      </div>

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.035]" style={{
        backgroundImage: 'radial-gradient(circle, #dc2626 1.5px, transparent 1.5px)',
        backgroundSize: '32px 32px'
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-14">

          {/* Left */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200/60 rounded-full text-red-600 text-xs font-semibold mb-7 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Đang tuyển sinh HK1 năm học 2026–2027
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[68px] font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
              Nơi Ươm<br />
              <span className="relative inline-block">
                <span className="relative z-10 text-red-600">Mầm Tương Lai</span>
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 8 Q75 2 150 8 Q225 14 298 8" stroke="#fca5a5" strokeWidth="4" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-9">
              Trường mầm non <strong className="text-gray-800 font-semibold">Hồng Phúc</strong> — nơi con trẻ được vui chơi, học tập, trải nghiệm và phát triển toàn diện trong môi trường giáo dục an toàn.
            </p>

            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-12">
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-xl shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105 active:scale-95 transition-all text-sm flex items-center gap-2">
                Ghi danh trẻ
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-2xl border border-gray-200 hover:border-gray-300 hover:scale-105 active:scale-95 transition-all text-sm shadow-sm">
                Tìm hiểu thêm
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-5 justify-center lg:justify-start">
              {[
                { value: '100+', label: 'Học sinh', icon: Student },
                { value: '10+',  label: 'Giáo viên', icon: Teacher },
                { value: '5+',   label: 'Lớp học', icon: School },
                { value: '10+',  label: 'Năm kinh nghiệm', icon: Experience },
              ].map(s => (
                <div key={s.label} className="flex items-center gap-2.5 px-4 py-2.5 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm">
                  <img src={s.icon} className="h-8 w-8" alt={s.label} />
                  <div>
                    <p className="text-lg font-black text-gray-900 leading-none">{s.value}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — orbiting illustration */}
          <div className="flex-shrink-0 relative w-72 h-72 sm:w-80 sm:h-80">
            {/* Big frosted circle */}
            <div className="absolute inset-0 bg-red-50/60 backdrop-blur-sm rounded-full border border-red-100/80 shadow-2xl shadow-red-100" />
            {/* Inner ring */}
            <div className="absolute inset-6 bg-white/70 backdrop-blur-md rounded-full border border-white/90 shadow-lg" />
            {/* Center logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img src="./favicon.svg" alt="Logo" className="w-28 h-28 drop-shadow-xl" style={{ animation: 'gentlePulse 4s ease-in-out infinite' }} />
            </div>
            {/* Orbiting icons */}
            {[
              { Icon: Palette, deg: 0,   bg: 'bg-rose-100',   color: '#e11d48' },
              { Icon: Brain,   deg: 60,  bg: 'bg-violet-100', color: '#7c3aed' },
              { Icon: Music,   deg: 120, bg: 'bg-blue-100',   color: '#2563eb' },
              { Icon: Earth,   deg: 180, bg: 'bg-green-100',  color: '#16a34a' },
              { Icon: HandHeart, deg: 240, bg: 'bg-orange-100', color: '#ea580c' },
              { Icon: Trophy, deg: 300,  bg: 'bg-yellow-100', color: '#ca8a04' },
            ].map(({ Icon, deg, bg, color }) => {
              const r = 135, rad = (deg * Math.PI) / 180;
              return (
                <div key={deg}
                  className={`absolute w-12 h-12 ${bg} rounded-2xl shadow-lg flex items-center justify-center hover:scale-125 cursor-default transition-transform duration-300`}
                  style={{ left: `calc(50% + ${Math.cos(rad) * r}px - 24px)`, top: `calc(50% + ${Math.sin(rad) * r}px - 24px)` }}>
                  <Icon size={20} color={color} strokeWidth={2} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom wave into next section */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        {/* <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 32 Q360 64 720 32 Q1080 0 1440 32 L1440 64 H0 Z" fill="#fef2f2" fillOpacity="0.8" />
        </svg> */}
        
        <svg viewBox="0 0 1440 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path fill="#fef2f2" d="M0 36 Q45 0 90 60 T180 52 T290 66 T420 56 T530 43 T640 52 T690 42 T720 42 T810 42 T900 42 T990 53 T1110 42 T1170 47 T1230 66 T1300 44 T1380 38 L1440 0 L0 0 Z"/>
        </svg>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ABOUT SECTION
══════════════════════════════════════════ */
function AboutSection() {
  const values = [
    { icon: Heart,   title: 'Yêu thương', desc: 'Mỗi bé được chăm sóc như con của chính mình, trong vòng tay ấm áp của các cô.', accent: 'red' },
    { icon: Quality, title: 'Chất lượng',  desc: 'Đội ngũ giáo viên được đào tạo bài bản, tâm huyết với nghề, tận tình với trẻ.', accent: 'orange' },
    { icon: Book,    title: 'An toàn',     desc: 'Môi trường học tập sạch sẽ, an toàn tuyệt đối, camera giám sát 24/7.', accent: 'green' },
    { icon: Light,   title: 'Sáng tạo',   desc: 'Khơi dậy tiềm năng sáng tạo qua nghệ thuật, âm nhạc, thể chất và vui chơi.', accent: 'yellow' },
  ];

  const accentMap = {
    red:    { pill: 'bg-red-100 text-red-600',    hover: 'hover:border-red-200 hover:bg-red-50/60',    glow: 'shadow-red-100' },
    orange: { pill: 'bg-orange-100 text-orange-600', hover: 'hover:border-orange-200 hover:bg-orange-50/60', glow: 'shadow-orange-100' },
    green:  { pill: 'bg-green-100 text-green-600', hover: 'hover:border-green-200 hover:bg-green-50/60',  glow: 'shadow-green-100' },
    yellow: { pill: 'bg-yellow-100 text-yellow-700', hover: 'hover:border-yellow-200 hover:bg-yellow-50/60', glow: 'shadow-yellow-100' },
  };

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-red-50/40 to-white relative overflow-hidden">
      {/* Soft blob */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #fca5a5, transparent)' }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-red-100 text-red-600 text-xs font-bold rounded-full mb-4 tracking-wide uppercase">Về chúng tôi</span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 leading-tight">
            Ngôi Trường Của <span className="text-red-600">Niềm Vui</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Hơn 10 năm đồng hành cùng các gia đình, Hồng Phúc tự hào là nơi các bé được phát triển toàn diện về thể chất, trí tuệ và cảm xúc.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, i) => {
            const a = accentMap[v.accent];
            return (
              <FadeIn key={v.title} delay={i * 100}>
                <div className={`group p-7 rounded-3xl border-2 border-gray-100 bg-white/70 backdrop-blur-sm ${a.hover} hover:-translate-y-2 hover:shadow-xl ${a.glow} transition-all duration-300 cursor-default text-center`}>
                  <div className="flex justify-center mb-5">
                    <div className="w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <img src={v.icon} className="h-14" alt={v.title} />
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Info banner */}
        <FadeIn delay={300}>
          <div className="mt-14 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-100 flex flex-col sm:flex-row items-center gap-0">
            {/* Left accent strip */}
            <div className="w-full sm:w-2 sm:h-full h-2 bg-red-500 flex-shrink-0" style={{ borderRadius: 0 }} />
            <div className="flex flex-col sm:flex-row items-center gap-8 p-8 sm:p-10 w-full">
              <div className="flex-shrink-0 animate-bounce" style={{ animationDuration: '3s' }}><img src={Classroom} className="h-44 w-44 rounded-lg shadow-md shadow-red-200" alt="Classroom" /></div>
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-2">Cơ sở hiện đại — Không gian vui chơi thoải mái</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">Trường được xây dựng với không gian rộng rãi, thoáng mát. Mỗi lớp học đều được trang bị đầy đủ thiết bị học tập hiện đại, khu vui chơi an toàn và vệ sinh sạch sẽ.</p>
                <div className="flex flex-wrap gap-2">
                  {['📍 Lộ Vàm, Chợ Gạo, Đồng Tháp', '🕗 6:30 – 17:00', '📞 0396-053-054'].map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 text-xs font-semibold rounded-full border border-red-100">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   PROGRAMS SECTION
══════════════════════════════════════════ */
function ProgramsSection() {
  const programs = [
    {
      emoji: Child1, name: 'Lớp Mầm', age: '2–3 tuổi',
      gradient: 'from-emerald-400 to-teal-500', lightBg: 'bg-emerald-50', textColor: 'text-emerald-700', borderColor: 'border-emerald-200',
      desc: 'Khám phá thế giới qua cảm giác & vận động. Phát triển ngôn ngữ và kỹ năng xã hội đầu đời.',
      features: ['Vận động tinh', 'Phát triển ngôn ngữ', 'Kỹ năng tự phục vụ'],
    },
    {
      emoji: Child2, name: 'Lớp Chồi', age: '3–4 tuổi',
      gradient: 'from-blue-400 to-indigo-500', lightBg: 'bg-blue-50', textColor: 'text-blue-700', borderColor: 'border-blue-200',
      desc: 'Học qua chơi, vui qua học. Bé khám phá màu sắc, âm nhạc và thế giới xung quanh.',
      features: ['Nghệ thuật sáng tạo', 'Âm nhạc vận động', 'Làm quen với chữ số'],
    },
    {
      emoji: Child3, name: 'Lớp Thỏ Ngọc', age: '4–5 tuổi',
      gradient: 'from-red-500 to-rose-600', lightBg: 'bg-red-50', textColor: 'text-red-700', borderColor: 'border-red-200',
      desc: 'Chuẩn bị nền tảng vững chắc cho lớp 1. Bé tự tin, sáng tạo và yêu thích học hỏi.',
      features: ['Tiền đọc viết', 'Toán tư duy', 'Kỹ năng sống'],
    },
  ];

  return (
    <section id="programs" className="py-24 bg-white relative overflow-hidden">
      {/* Blobs */}
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #bfdbfe, transparent)' }} />
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #fca5a5, transparent)' }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 text-xs font-bold rounded-full mb-4 tracking-wide uppercase">Chương trình học</span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Ba Giai Đoạn <span className="text-red-600">Phát Triển</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-lg">Chương trình được thiết kế khoa học, phù hợp với từng lứa tuổi.</p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((p, i) => (
            <FadeIn key={p.name} delay={i * 130}>
              <div className="group bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl hover:shadow-gray-200/60 hover:-translate-y-3 transition-all duration-400 overflow-hidden cursor-default">
                {/* Colored header */}
                <div className={`bg-gradient-to-br ${p.gradient} px-6 pt-10 pb-12 text-center relative overflow-hidden`}>
                  <div className="absolute -right-6 -top-6 w-28 h-28 bg-white/10 rounded-full" />
                  <div className="absolute -left-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full" />
                  <div className="relative z-10">
                    <div className="group-hover:scale-110 group-hover:-rotate-3 transition-all duration-400 inline-block mb-3">
                      <img src={p.emoji} className="h-24 mx-auto drop-shadow-xl" alt={p.name} />
                    </div>
                    <h3 className="text-xl font-black text-white">{p.name}</h3>
                    <span className="inline-block mt-2 px-3 py-1 bg-white/25 backdrop-blur-sm text-white text-xs font-semibold rounded-full">{p.age}</span>
                  </div>
                </div>

                {/* White body */}
                <div className="px-6 py-6 -mt-5 bg-white rounded-t-3xl relative z-10">
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                  <ul className="space-y-2 mb-5">
                    {p.features.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-sm">
                        <span className={`w-5 h-5 rounded-full ${p.lightBg} ${p.textColor} border ${p.borderColor} flex items-center justify-center text-[10px] font-bold flex-shrink-0`}>✓</span>
                        <span className="text-gray-700 font-medium">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${p.gradient} hover:opacity-90 active:scale-95 transition-all shadow-md`}>
                    Tìm hiểu thêm →
                  </button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   FACILITIES SECTION
══════════════════════════════════════════ */
function FacilitiesSection() {
  const items = [
    { emoji: '🎨', title: 'Phòng Nghệ Thuật',    desc: 'Khu vực tô màu, vẽ tranh và làm thủ công sáng tạo cho bé', color: 'from-rose-400 to-pink-500' },
    { emoji: '🎵', title: 'Phòng Âm Nhạc',       desc: 'Học đàn, hát và nhảy múa trong không gian tràn ngập âm thanh', color: 'from-violet-400 to-purple-500' },
    { emoji: '📚', title: 'Thư Viện Mini',        desc: 'Hàng trăm đầu sách tranh, sách kỹ năng phù hợp lứa tuổi', color: 'from-amber-400 to-orange-500' },
    { emoji: '🌳', title: 'Sân Chơi Ngoài Trời', desc: 'Cầu trượt, xích đu, bãi cát an toàn dưới bóng cây xanh', color: 'from-emerald-400 to-teal-500' },
    { emoji: '🍱', title: 'Nhà Bếp Dinh Dưỡng', desc: 'Thực đơn phong phú, chế biến tại chỗ đảm bảo vệ sinh an toàn', color: 'from-blue-400 to-cyan-500' },
    { emoji: '😴', title: 'Phòng Nghỉ Trưa',     desc: 'Phòng yên tĩnh, điều hòa mát mẻ để bé nghỉ ngơi thoải mái', color: 'from-indigo-400 to-blue-500' },
  ];

  return (
    <section id="facilities" className="py-24 relative overflow-hidden">
      {/* Frosted gradient background with parallax */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #dc2626 0%, #c2410c 40%, #b91c1c 70%, #1d4ed8 100%)' }} />
      {/* Noise/texture overlay */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
      }} />
      {/* White blobs */}
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none bg-white" />
      <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full blur-3xl opacity-10 pointer-events-none bg-yellow-200" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full mb-4 border border-white/25 tracking-wide uppercase">Cơ sở vật chất</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 drop-shadow-sm">
            Không Gian <span className="text-yellow-300">Lý Tưởng</span>
          </h2>
          <p className="text-white/75 max-w-lg mx-auto text-lg">Mọi góc trong trường đều được thiết kế để kích thích sự tò mò và sáng tạo của bé.</p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 90}>
              <div className="group bg-white/10 hover:bg-white/18 backdrop-blur-md border border-white/20 hover:border-white/40 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/10 cursor-default">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  {item.emoji}
                </div>
                <h3 className="font-bold text-white text-base mb-2">{item.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   TEACHERS SECTION
══════════════════════════════════════════ */
function TeachersSection() {
  const teachers = [
    { name: 'Cô Nguyễn Thị Hoa', role: 'Giáo viên Lớp Lá 1',  exp: '8 năm kinh nghiệm',  emoji: '👩‍🏫', gradient: 'from-red-400 to-rose-500', glow: 'shadow-red-200' },
    { name: 'Cô Trần Thị Lan',   role: 'Giáo viên Lớp Lá 2',   exp: '5 năm kinh nghiệm',  emoji: '👩‍🎨', gradient: 'from-blue-400 to-indigo-500', glow: 'shadow-blue-200' },
    { name: 'Cô Lê Thị Mai',     role: 'Giáo viên Lớp Chồi',   exp: '6 năm kinh nghiệm',  emoji: '👩‍🎵', gradient: 'from-emerald-400 to-teal-500', glow: 'shadow-emerald-200' },
    { name: 'Cô Hoàng Thị Oanh', role: 'Giáo viên Lớp Mầm',    exp: '10 năm kinh nghiệm', emoji: '🧑‍🏫', gradient: 'from-violet-400 to-purple-500', glow: 'shadow-violet-200' },
  ];

  return (
    <section id="teachers" className="py-24 bg-gray-50/50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, #dc2626 1px, transparent 1px)',
        backgroundSize: '28px 28px'
      }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-red-100 text-red-600 text-xs font-bold rounded-full mb-4 tracking-wide uppercase">Đội ngũ giáo viên</span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Những <span className="text-red-600">Người Mẹ Thứ Hai</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-lg">Mỗi cô giáo đều là người bạn đồng hành tâm huyết trên hành trình khám phá của bé.</p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map((t, i) => (
            <FadeIn key={t.name} delay={i * 110}>
              <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-default text-center">
                <div className="relative mx-auto w-28 h-28 mb-5">
                  {/* Avatar bg */}
                  <div className={`w-full h-full rounded-3xl bg-gradient-to-br ${t.gradient} flex items-center justify-center text-5xl shadow-xl ${t.glow} group-hover:scale-105 group-hover:-rotate-2 transition-all duration-300`}>
                    {t.emoji}
                  </div>
                  {/* Star badge */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-xl flex items-center justify-center text-sm shadow-md">⭐</div>
                </div>
                <h3 className="font-bold text-gray-900 text-sm leading-tight">{t.name}</h3>
                <p className="text-red-500 text-xs font-semibold mt-1.5">{t.role}</p>
                <p className="text-gray-400 text-xs mt-1">{t.exp}</p>
                <div className="flex justify-center gap-0.5 mt-3">
                  {[...Array(5)].map((_, j) => <span key={j} className="text-yellow-400 text-xs">★</span>)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIALS
══════════════════════════════════════════ */
function TestimonialsSection() {
  const reviews = [
    { name: 'Chị Nguyễn Thị Minh', child: 'Mẹ bé An (Lớp Thỏ Ngọc)', text: 'Con tôi rất vui và háo hức đến trường mỗi ngày. Các cô rất tận tâm và yêu thương trẻ. Tôi hoàn toàn yên tâm khi gửi con ở đây!', stars: 5, color: 'from-red-400 to-rose-500' },
    { name: 'Anh Trần Văn Hùng',   child: 'Ba bé Bảo (Lớp Chồi)',     text: 'Trường sạch sẽ, an toàn và có camera. Thực đơn dinh dưỡng, bé ăn ngon và lên cân đều. Cảm ơn các cô Hồng Phúc rất nhiều!', stars: 5, color: 'from-blue-400 to-indigo-500' },
    { name: 'Chị Lê Thị Hoa',      child: 'Mẹ bé Linh (Lớp Mầm)',     text: 'Từ khi học ở đây, con nói chuyện rõ hơn, biết chia sẻ và tự lập hơn. Chương trình học rất bài bản và vui vẻ cho bé.', stars: 5, color: 'from-emerald-400 to-teal-500' },
  ];

  return (
    <section className="py-24 bg-gradient-to-r from-red-400 via-orange-300 to-red-400 relative overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6" style={{ background: 'radial-gradient(circle, #fca5a5, transparent)' }}>
        <FadeIn className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full mb-4 tracking-wide uppercase">Phụ huynh nói gì</span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Niềm Tin Của <span className="text-red-600">Gia Đình</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <FadeIn key={r.name} delay={i * 120}>
              <div className="group bg-white rounded-3xl p-7 border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-default relative overflow-hidden">
                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-16 h-16 rounded-bl-3xl bg-gradient-to-br ${r.color} opacity-10`} />
                <div className="flex gap-0.5 mb-4">
                  {[...Array(r.stars)].map((_, j) => <span key={j} className="text-yellow-400 text-base">★</span>)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${r.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {r.name.split(' ').pop()[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
                    <p className="text-gray-400 text-xs">{r.child}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   CONTACT SECTION
══════════════════════════════════════════ */
function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', child: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1800);
  }

  return (
    <section id="contact" className="py-24 bg-gray-50/60 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full blur-3xl opacity-15" style={{ background: 'radial-gradient(circle, #fca5a5, transparent)' }} />
        <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full blur-3xl opacity-10" style={{ background: 'radial-gradient(circle, #bfdbfe, transparent)' }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-red-100 text-red-600 text-xs font-bold rounded-full mb-4 tracking-wide uppercase">Liên hệ & Đăng ký</span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Bắt Đầu <span className="text-red-600">Hành Trình</span>
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-lg">Điền thông tin để đặt lịch tham quan trường miễn phí — chúng tôi sẽ liên hệ trong 24h!</p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Form */}
          <FadeIn direction="left">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-100/60">
              {sent ? (
                <div className="text-center py-10">
                  <div className="text-7xl mb-4 animate-bounce">🎉</div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Đăng ký thành công!</h3>
                  <p className="text-gray-500 mb-5">Cảm ơn bạn! Chúng tôi sẽ liên hệ trong vòng 24 giờ.</p>
                  <button onClick={() => setSent(false)} className="px-6 py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors active:scale-95">Gửi lại</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-bold text-gray-900 text-lg mb-5">Thông tin đăng ký</h3>
                  {[
                    { key: 'name',  label: 'Họ tên phụ huynh',   placeholder: 'Nguyễn Thị An',   type: 'text' },
                    { key: 'phone', label: 'Số điện thoại',       placeholder: '0901 234 567',     type: 'tel'  },
                    { key: 'child', label: 'Độ tuổi của bé',   placeholder: '3 tuổi', type: 'text' },
                    { key: 'date', label: 'Ngày có thể nhập học',   placeholder: '', type: 'date' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">{f.label} <span className="text-red-600">*</span></label>
                      <input type={f.type} required value={form[f.key]} onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none text-sm transition-all" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">Ghi chú thêm (nếu có)</label>
                    <textarea rows={3} value={form.message} onChange={e => setForm(v => ({ ...v, message: e.target.value }))}
                      placeholder="Thắc mắc hoặc yêu cầu đặc biệt..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none text-sm transition-all resize-none" />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl active:scale-95 transition-all shadow-lg shadow-red-500/25 flex items-center justify-center gap-2 disabled:opacity-70 text-sm">
                    {loading ? (<><RefreshCcw className="animate-spin" /> Đang gửi...</>) : (<><Send /> Đăng ký tư vấn</>)}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>

          {/* Info + Map */}
          <FadeIn direction="right" delay={150}>
            <div className="space-y-3">
              {[
                { icon: <Clock size={18} color="#dc2626" />,    title: 'Giờ hoạt động', lines: ['Thứ 2 – Thứ 7: 6:30 – 17:00'] },
                { icon: <PhoneCall size={18} color="#dc2626" />, title: 'Điện thoại',    lines: ['0396-053-054 (Cô Vân)', '0843-363-639 (Cô Trang)'] },
                { icon: <Mail size={18} color="#dc2626" />,      title: 'Email',         lines: ['hongphuc.info@gmail.com'] },
                { icon: <MapPin size={18} color="#dc2626" />,    title: 'Địa chỉ',       lines: ['Lộ Vàm, Xã Chợ Gạo, Tỉnh Đồng Tháp'] },
              ].map(item => (
                <div key={item.title} className="group flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 hover:border-red-100 hover:shadow-md transition-all cursor-default">
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{item.title}</p>
                    {item.lines.map(l => <p key={l} className="text-gray-500 text-sm">{l}</p>)}
                  </div>
                </div>
              ))}
              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-md mt-2">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.950473041777!2d106.40804457481173!3d10.345845389777931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310aae472ef969f1%3A0xf3f19f963e2485d5!2zTeG6pk0gTk9OIEjhu5JORyBQSMOaQw!5e0!3m2!1svi!2s!4v1783098350804!5m2!1svi!2s"
                  width="100%" height="240" style={{ border: 0, display: 'block' }}
                  allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="bg-gray-950 pt-14 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-5 bg-red-500 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
                <img src="./favicon.svg" alt="Logo" className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-500 text-[10px] uppercase tracking-wider">Mầm non</p>
                <p className="font-black text-white text-sm">Hồng Phúc</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">Nơi ươm mầm những ước mơ, vun đắp những tâm hồn trong sáng và hạnh phúc.</p>
          </div>

          {[
            { title: 'Liên kết nhanh', items: ['Giới thiệu', 'Chương trình', 'Cơ sở vật chất', 'Đội ngũ', 'Liên hệ'] },
            { title: 'Chương trình',   items: ['Lớp Mầm (2–3 tuổi)', 'Lớp Chồi (3–4 tuổi)', 'Lớp Thỏ Ngọc (4–5 tuổi)', 'Thể dục nhịp điệu'] },
            { title: 'Liên hệ',        items: ['0396-053-054 (Cô Vân)', '0843-363-639 (Cô Trang)', 'Lộ Vàm, Chợ Gạo, Đồng Tháp', 'T2–T7: 6:30–17:00'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.items.map(item => (
                  <li key={item}>
                    <a href="#" className="text-gray-500 hover:text-red-400 text-sm transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs">© 2026 <Link to="/" className="text-gray-400 hover:text-white transition-colors">Trường Mầm non Hồng Phúc</Link>. All rights reserved.</p>
          <p className="text-gray-600 text-xs">Thiết kế & phát triển bởi&nbsp;
            <Link to="https://github.com/minhsangng" className="text-gray-400 hover:text-red-400 transition-colors">minhsangng</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════
   FLOATING SOCIAL MENU
══════════════════════════════════════════ */
function ActiveLinkMenu() {
  const [show, setShow] = useState(false);
  return (
    <button
      className="fixed bottom-6 right-6 z-50 w-12 h-12 group bg-red-600 hover:bg-red-700 text-white rounded-2xl shadow-lg shadow-red-400/40 hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {!show ? <Share2 size={20} /> : <X size={20} />}
      <ul className="group-hover:flex hidden flex-col gap-2 absolute right-0 bottom-0 w-24 h-24 transition ease-linear">
        <li className="absolute right-0 top-0 p-2 bg-white/90 backdrop-blur-sm rounded-full size-9 border border-gray-100 hover:border-red-300 shadow-md hover:scale-110 transition-transform"><Link to=""><img src={Facebook} alt="Facebook" /></Link></li>
        <li className="absolute left-3 top-3 p-2 bg-white/90 backdrop-blur-sm rounded-full size-9 border border-gray-100 hover:border-red-300 shadow-md hover:scale-110 transition-transform"><Link to=""><img src={Tiktok} alt="Tiktok" /></Link></li>
        <li className="absolute left-0 bottom-0 p-2 bg-white/90 backdrop-blur-sm rounded-full size-9 border border-gray-100 hover:border-red-300 shadow-md hover:scale-110 transition-transform"><Link to=""><img src={Zalo} alt="Zalo" /></Link></li>
      </ul>
    </button>
  );
}

/* ══════════════════════════════════════════
   SCROLL TO TOP
══════════════════════════════════════════ */
function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return show ? (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-24 right-6 z-40 w-12 h-12 bg-white border border-gray-200 text-gray-600 hover:text-red-600 hover:border-red-200 rounded-2xl shadow-lg hover:shadow-red-100 hover:scale-110 active:scale-95 transition-all flex items-center justify-center">
      <ArrowUp size={20} />
    </button>
  ) : null;
}

/* ══════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════ */
export default function LandingPage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <style>{`
        @keyframes loadFloat {
          from { transform: translateY(0px) rotate(0deg); }
          to   { transform: translateY(-16px) rotate(6deg); }
        }
        @keyframes gentlePulse {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50%       { transform: scale(1.04) rotate(-2deg); }
        }
        * { scroll-behavior: smooth; }
      `}</style>

      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}

      <div className={`transition-opacity duration-600 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ProgramsSection />
        <FacilitiesSection />
        <TeachersSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
        <ScrollTop />
        <ActiveLinkMenu />
      </div>
    </>
  );
}
