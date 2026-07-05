import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Palette, Music, Brain, Trophy, Earth, HandHeart, MapPin, PhoneCall, Clock, Mail, Share2, X, ArrowUp } from 'lucide-react';
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

/* ─── Loading Screen ─── */
function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let p = 0
    const id = setInterval(() => {
      p += Math.random() * 18 + 4
      if (p >= 100) { p = 100; clearInterval(id); setTimeout(onDone, 400) }
      setProgress(Math.min(p, 100))
    }, 120)
    return () => clearInterval(id)
  }, [onDone])

  return (
    <div className={`fixed inset-0 z-[999] flex flex-col items-center justify-center bg-gradient-to-br from-red-600 via-red-500 to-blue-600 transition-opacity duration-700 ${progress === 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      {/* Floating shapes */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className="absolute rounded-full opacity-20 animate-bounce"
          style={{
            width: `${40 + i * 20}px`, height: `${40 + i * 20}px`,
            background: i % 2 === 0 ? '#fff' : '#fde68a',
            left: `${10 + i * 12}%`, top: `${10 + (i % 4) * 20}%`,
            animationDelay: `${i * 0.2}s`, animationDuration: `${1.5 + i * 0.3}s`
          }} />
      ))}
      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="w-24 h-24 bg-white rounded-3xl shadow-2xl flex items-center justify-center animate-pulse">
          <img src="./favicon.svg" alt="Logo" />
        </div>
        <div className="text-center">
          <p className="text-white/80 text-sm mt-1 font-medium">Trường Mầm non</p>
          <h1 className="text-3xl font-black text-white tracking-tight drop-shadow-lg">Hồng Phúc</h1>
        </div>
        {/* Progress bar */}
        <div className="w-56 h-2.5 bg-white/30 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }} />
        </div>
        <p className="text-white/70 text-xs font-medium">{Math.round(progress)}%</p>
      </div>
    </div>
  )
}

/* ─── Parallax Hook ─── */
function useParallax() {
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    const handle = () => setOffset(window.scrollY)
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])
  return offset
}

/* ─── useInView Hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef()
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ─── Animated Section ─── */
function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, visible] = useInView()
  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

/* ─── Floating Bubble ─── */
function Bubble({ size, color, x, y, delay, duration }) {
  return (
    <div className="absolute rounded-full opacity-60 pointer-events-none"
      style={{
        width: size, height: size, background: color,
        left: x, top: y, filter: 'blur(1px)',
        animation: `float ${duration}s ease-in-out ${delay}s infinite alternate`
      }} />
  )
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, []);

  const links = [
    { label: 'Giới thiệu', href: '#about' },
    { label: 'Chương trình', href: '#programs' },
    { label: 'Cơ sở vật chất', href: '#facilities' },
    { label: 'Giáo viên', href: '#teachers' },
    { label: 'Liên hệ', href: '#contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/60 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <img src="./favicon.svg" alt="Logo" />
          </div>
          <div>
            <p className={`text-[10px] transition-colors ${scrolled ? 'text-gray-500' : 'text-white/70'}`}>Mầm non</p>
            <p className={`font-black text-base leading-tight transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>Hồng Phúc</p>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
                scrolled ? 'text-gray-600 hover:text-red-600 hover:bg-red-50' : 'text-white/90 hover:text-white hover:bg-white/15'
              }`}>
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <Link to="/login"
            className={`hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm ${scrolled ? 'btn-active shadow-blue-200' : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'}`}>
            Đăng nhập
          </Link>
          <button
            className={`px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-red-400/40 hover:shadow-red-400/60 hover:scale-105 active:scale-95 transition-all ${scrolled ? 'btn-inactive' : 'bg-gradient-to-r from-red-500 to-red-600 text-white'}`}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Đăng ký ngay
          </button>
          {/* Mobile menu */}
          <button onClick={() => setMenuOpen(v => !v)} className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-gray-700' : 'text-white'}`}>
            <div className="w-5 h-0.5 bg-current mb-1 transition-all" />
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current" />
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 px-4 py-3 space-y-1">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

/* ─── Hero Section ─── */
function HeroSection() {
  const offset = useParallax()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const h = (e) => setMousePos({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 })
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [])

  const bubbles = [
    { size: '120px', color: 'rgba(239,68,68,0.25)', x: '8%', y: '15%', delay: 0, duration: 4 },
    { size: '80px',  color: 'rgba(59,130,246,0.3)',  x: '85%', y: '10%', delay: 1, duration: 5 },
    { size: '60px',  color: 'rgba(250,204,21,0.4)',  x: '70%', y: '60%', delay: 0.5, duration: 3.5 },
    { size: '90px',  color: 'rgba(34,197,94,0.25)', x: '15%', y: '70%', delay: 1.5, duration: 4.5 },
    { size: '50px',  color: 'rgba(168,85,247,0.3)',  x: '50%', y: '80%', delay: 0.8, duration: 3 },
    { size: '70px',  color: 'rgba(251,146,60,0.35)', x: '92%', y: '45%', delay: 2, duration: 4 },
  ]

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-blue-700"
        style={{ transform: `translateY(${offset * 0.4}px)` }} />

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          transform: `translateY(${offset * 0.15}px)`
        }} />

      {/* Floating bubbles */}
      {bubbles.map((b, i) => (
        <div key={i} className="absolute pointer-events-none"
          style={{
            transform: `translate(${mousePos.x * (i % 3 === 0 ? 20 : i % 3 === 1 ? -15 : 10)}px, ${mousePos.y * (i % 2 === 0 ? 15 : -20)}px) translateY(${offset * (0.1 + i * 0.05)}px)`,
            transition: 'transform 0.1s ease-out',
            left: b.x, top: b.y
          }}>
          <div className="rounded-full" style={{ width: b.size, height: b.size, background: b.color, filter: 'blur(2px)' }} />
        </div>
      ))}

      {/* Decorative stars */}
      {[...Array(12)].map((_, i) => (
        <div key={i} className="absolute text-white/40 animate-pulse select-none pointer-events-none"
          style={{ left: `${(i * 8.7) % 95}%`, top: `${(i * 7.3) % 90}%`, fontSize: `${12 + (i % 4) * 6}px`, animationDelay: `${i * 0.3}s` }}>
          {'ABCDEFGHI'[i % 8]}
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-white/30">
              <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
              Đang tuyển sinh HK1 năm học 2026-2027
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 drop-shadow-lg">
              Nơi Ươm Mầm
              <span className="block text-yellow-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">Tương Lai</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/85 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
              Trường mầm non <strong className="text-yellow-200">Hồng Phúc</strong> — nơi con trẻ được vui chơi, học tập, trải nghiệm và phát triển toàn diện trong môi trường giáo dục an toàn.
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold rounded-2xl shadow-2xl shadow-yellow-500/40 hover:shadow-yellow-400/60 hover:scale-105 active:scale-95 transition-all text-base flex items-center gap-2">
                <span>Ghi danh trẻ</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
              <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-2xl border border-white/40 backdrop-blur-sm hover:scale-105 active:scale-95 transition-all text-base">
                Tìm hiểu thêm
              </button>
            </div>
            {/* Mini stats */}
            <div className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start">
              {[
                { value: '100+', label: 'Học sinh', icon: Student },
                { value: '10+', label: 'Giáo viên', icon: Teacher },
                { value: '5+',  label: 'Lớp học',  icon: School },
                { value: '10+', label: 'Năm kinh nghiệm', icon: Experience },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black text-yellow-300 flex items-center gap-1"><img src={s.icon} className="h-10" alt={s.label} /> {s.value}</div>
                  <div className="text-white/70 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right illustration */}
          <div className="flex-shrink-0 relative">
            <div className="w-72 h-72 sm:w-80 sm:h-80 relative"
              style={{ transform: `translateY(${-offset * 0.1}px) translate(${mousePos.x * -12}px, ${mousePos.y * -8}px)`, transition: 'transform 0.15s ease-out' }}>
              {/* Big circle bg */}
              <div className="absolute inset-0 bg-white/15 rounded-full border-4 border-white/25 backdrop-blur-sm" />
              {/* Center emoji */}
              <div className="absolute transform-center flex items-center justify-center">
                <div className="drop-shadow-2xl select-none animate-pulse"
                  style={{ animationDuration: '3s' }}><img class="h-48 xs:h-40" src="./favicon.svg" alt="Logo" /></div>
              </div>
              {/* Orbiting icons */}
              {[
                { emoji: <Palette color="white" />, deg: 0  }, { emoji: <Brain color="white" />, deg: 60  },
                { emoji: <Music color="white" />, deg: 120 }, { emoji: <Earth color="white" />, deg: 180 },
                { emoji: <HandHeart color="white" />, deg: 240 }, { emoji: <Trophy color="white" />, deg: 300 },
              ].map(({ emoji, deg }) => {
                const r = 130, rad = (deg * Math.PI) / 180;
                return (
                  <div key={deg} className="absolute w-12 h-12 bg-red-300 rounded-2xl shadow-xl flex items-center justify-center text-2xl hover:scale-125 transition-transform cursor-pointer select-none"
                    style={{ left: `calc(50% + ${Math.cos(rad) * r}px - 24px)`, top: `calc(50% + ${Math.sin(rad) * r}px - 24px)` }}>
                    {emoji}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z" fill="white" fillOpacity="0.05" />
          <path d="M0 60C240 20 480 80 720 60C960 40 1200 80 1440 60V80H0V60Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}

/* ─── About Section ─── */
function AboutSection() {
  const values = [
    { icon: Heart, title: 'Yêu thương', desc: 'Mỗi bé được chăm sóc như con của chính mình, trong vòng tay ấm áp của các cô.' },
    { icon: Quality, title: 'Chất lượng', desc: 'Đội ngũ giáo viên được đào tạo bài bản, tâm huyết với nghề, tận tình với trẻ.' },
    { icon: Book, title: 'An toàn', desc: 'Môi trường học tập sạch sẽ, an toàn tuyệt đối, camera giám sát 24/7.' },
    { icon: Light, title: 'Sáng tạo', desc: 'Khơi dậy tiềm năng sáng tạo qua nghệ thuật, âm nhạc, thể chất và vui chơi.' },
  ]

  return (
    <section id="about" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-red-100 text-red-600 text-sm font-bold rounded-full mb-4">Về chúng tôi</span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Ngôi Trường Của <span className="text-gradient-hp">Niềm Vui</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Hơn 10 năm đồng hành cùng các gia đình, Hồng Phúc tự hào là nơi các bé được phát triển toàn diện về thể chất, trí tuệ và cảm xúc.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            return (
            <FadeIn key={v.title} delay={i * 100}>
              <div className="group p-6 rounded-3xl border-2 border-transparent hover:border-red-200 bg-gray-50 hover:bg-red-50 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-red-100 cursor-pointer text-center">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block"><img src={v.icon} className="h-24" alt="Icon" /></div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </FadeIn>)
          })}
        </div>

        {/* Image-like banner */}
        <FadeIn delay={400}>
          <div className="mt-14 rounded-3xl overflow-hidden bg-gradient-to-r from-red-500 via-red-600 to-blue-600 p-0.5 shadow-2xl shadow-red-200">
            <div className="bg-white rounded-[22px] p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8">
              <div className="text-7xl sm:text-8xl flex-shrink-0 animate-bounce" style={{ animationDuration: '2.5s' }}>🏡</div>
              <div>
                <h3 className="text-2xl font-black text-gray-900 mb-3">Cơ sở hiện đại — Không gian vui chơi thoải mái</h3>
                <p className="text-gray-500 leading-relaxed mb-4">Trường được xây dựng với không gian rộng rãi, thoáng mát. Mỗi lớp học đều được trang bị đầy đủ thiết bị học tập hiện đại, khu vui chơi an toàn và vệ sinh sạch sẽ.</p>
                <div className="flex flex-wrap gap-3">
                  {['📍 Lộ Vàm, Chợ Gạo, Đồng Tháp', '🕗 6:30 - 17:00', '📞 028-1234-5678'].map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 text-sm font-medium rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── Programs Section ─── */
function ProgramsSection() {
  const offset = useParallax()
  const programs = [
    { emoji: Child1, name: 'Lớp Mầm', age: '2–3 tuổi', color: 'from-green-400 to-green-500', shadow: 'shadow-green-200', desc: 'Khám phá thế giới qua cảm giác & vận động. Phát triển ngôn ngữ và kỹ năng xã hội đầu đời.', features: ['Vận động tinh', 'Phát triển ngôn ngữ', 'Kỹ năng tự phục vụ'] },
    { emoji: Child2, name: 'Lớp Chồi', age: '3–4 tuổi', color: 'from-blue-400 to-blue-600', shadow: 'shadow-blue-200', desc: 'Học qua chơi, vui qua học. Bé khám phá màu sắc, âm nhạc và thế giới xung quanh.', features: ['Nghệ thuật sáng tạo', 'Âm nhạc vận động', 'Làm quen với chữ số'] },
    { emoji: Child3, name: 'Lớp Thỏ Ngọc', age: '4–5 tuổi', color: 'from-red-500 to-red-600', shadow: 'shadow-red-200', desc: 'Chuẩn bị nền tảng vững chắc cho lớp 1. Bé tự tin, sáng tạo và yêu thích học hỏi.', features: ['Tiền đọc viết', 'Toán tư duy', 'Kỹ năng sống'] },
  ]

  return (
    <section id="programs" className="py-20 overflow-hidden relative">
      {/* Parallax background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-blue-50"
        style={{ transform: `translateY(${offset * 0.06}px)` }} />
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle, #dc2626 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          transform: `translateY(${offset * 0.12}px)`
        }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 text-sm font-bold rounded-full mb-4">Chương trình học</span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Ba Giai Đoạn <span className="text-gradient-hp">Phát Triển</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">Chương trình được thiết kế khoa học, phù hợp với từng lứa tuổi.</p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {programs.map((p, i) => (
            <FadeIn key={p.name} delay={i * 150}>
              <div className={`group relative rounded-3xl overflow-hidden shadow-xl ${p.shadow} hover:shadow-2xl hover:-translate-y-3 transition-all duration-400 cursor-default`}>
                {/* Header */}
                <div className={`bg-gradient-to-br ${p.color} px-6 pt-8 pb-8 text-center relative overflow-hidden`}>
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full" />
                  <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full" />
                  <div className="text-7xl mb-3 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 inline-block"><img src={p.emoji} className="h-20" alt="Icon" /></div>
                  <h3 className="text-2xl font-black text-white">{p.name}</h3>
                  <span className="inline-block mt-2 px-3 py-1 bg-white/25 text-white text-sm font-semibold rounded-full">{p.age}</span>
                </div>
                {/* Body */}
                <div className="bg-white px-6 py-5 mt-2 rounded-t-3xl">
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                  <ul className="space-y-2">
                    {p.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs flex-shrink-0">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`mt-5 w-full py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${p.color} hover:opacity-90 active:scale-95 transition-all shadow-md`}>
                    Tìm hiểu thêm →
                  </button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Facilities Section ─── */
function FacilitiesSection() {
  const offset = useParallax()
  const items = [
    { emoji: '🎨', title: 'Phòng Nghệ Thuật', desc: 'Khu vực tô màu, vẽ tranh và làm thủ công sáng tạo cho bé' },
    { emoji: '🎵', title: 'Phòng Âm Nhạc', desc: 'Học đàn, hát và nhảy múa trong không gian tràn ngập âm thanh' },
    { emoji: '📚', title: 'Thư Viện Mini', desc: 'Hàng trăm đầu sách tranh, sách kỹ năng phù hợp lứa tuổi' },
    { emoji: '🌳', title: 'Sân Chơi Ngoài Trời', desc: 'Cầu trượt, xích đu, bãi cát an toàn dưới bóng cây xanh' },
    { emoji: '🍱', title: 'Nhà Bếp Dinh Dưỡng', desc: 'Thực đơn phong phú, chế biến tại chỗ đảm bảo vệ sinh an toàn' },
    { emoji: '😴', title: 'Phòng Nghỉ Trưa', desc: 'Phòng yên tĩnh, điều hòa mát mẻ để bé nghỉ ngơi thoải mái' },
  ]

  return (
    <section id="facilities" className="py-20 relative overflow-hidden bg-gradient-to-br from-red-600 to-blue-700">
      {/* Parallax BG */}
      <div className="absolute inset-0" style={{ transform: `translateY(${offset * 0.08}px)` }} />
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1'%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
          transform: `translateY(${offset * 0.2}px)`
        }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white text-sm font-bold rounded-full mb-4">Cơ sở vật chất</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Không Gian <span className="text-yellow-300">Lý Tưởng</span></h2>
          <p className="text-white/80 max-w-xl mx-auto text-lg">Mọi góc trong trường đều được thiết kế để kích thích sự tò mò và sáng tạo của bé.</p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <FadeIn key={item.title} delay={i * 100}>
              <div className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-default">
                <div className="text-5xl mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 inline-block">{item.emoji}</div>
                <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Teachers Section ─── */
function TeachersSection() {
  const teachers = [
    { name: 'Cô Nguyễn Thị Hoa', role: 'Giáo viên Lớp Lá 1', exp: '8 năm kinh nghiệm', emoji: '👩‍🏫', color: 'from-red-400 to-red-500' },
    { name: 'Cô Trần Thị Lan',   role: 'Giáo viên Lớp Lá 2',  exp: '5 năm kinh nghiệm', emoji: '👩‍🎨', color: 'from-blue-400 to-blue-500' },
    { name: 'Cô Lê Thị Mai',     role: 'Giáo viên Lớp Chồi',  exp: '6 năm kinh nghiệm', emoji: '👩‍🎵', color: 'from-green-400 to-green-500' },
    { name: 'Cô Hoàng Thị Oanh', role: 'Giáo viên Lớp Mầm',   exp: '10 năm kinh nghiệm', emoji: '🧑‍🏫', color: 'from-purple-400 to-purple-500' },
  ]

  return (
    <section id="teachers" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 text-sm font-bold rounded-full mb-4">Đội ngũ giáo viên</span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Những <span className="text-gradient-hp">Người Mẹ Thứ Hai</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">Mỗi cô giáo đều là người bạn đồng hành tâm huyết trên hành trình khám phá của bé.</p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.map((t, i) => (
            <FadeIn key={t.name} delay={i * 120}>
              <div className="group text-center cursor-default">
                {/* Avatar */}
                <div className="relative mx-auto w-32 h-32 mb-5">
                  <div className={`w-full h-full rounded-3xl bg-gradient-to-br ${t.color} flex items-center justify-center text-6xl shadow-xl group-hover:scale-105 group-hover:-rotate-3 transition-all duration-300`}>
                    {t.emoji}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-xl flex items-center justify-center text-base shadow-md">⭐</div>
                </div>
                <h3 className="font-bold text-gray-900 text-base">{t.name}</h3>
                <p className="text-blue-600 text-sm font-medium mt-1">{t.role}</p>
                <p className="text-gray-400 text-xs mt-1">{t.exp}</p>
                {/* Rating */}
                <div className="flex justify-center gap-0.5 mt-3">
                  {[...Array(5)].map((_, j) => <span key={j} className="text-yellow-400 text-sm">★</span>)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Testimonials ─── */
function TestimonialsSection() {
  const offset = useParallax()
  const reviews = [
    { name: 'Chị Nguyễn Thị Minh', child: 'Mẹ bé An (Lớp Lá 1)', text: 'Con tôi rất vui và háo hức đến trường mỗi ngày. Các cô rất tận tâm và yêu thương trẻ. Tôi hoàn toàn yên tâm khi gửi con ở đây!', stars: 5 },
    { name: 'Anh Trần Văn Hùng',   child: 'Ba bé Bảo (Lớp Chồi 2)', text: 'Trường sạch sẽ, an toàn và có camera. Thực đơn dinh dưỡng, bé ăn ngon và lên cân đều. Cảm ơn các cô Hồng Phúc rất nhiều!', stars: 5 },
    { name: 'Chị Lê Thị Hoa',      child: 'Mẹ bé Linh (Lớp Mầm 1)', text: 'Từ khi học ở đây, con nói chuyện rõ hơn, biết chia sẻ và tự lập hơn. Chương trình học rất bài bản và vui vẻ cho bé.', stars: 5 },
  ]

  return (
    <section className="py-20 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-red-50"
        style={{ transform: `translateY(${offset * 0.05}px)` }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-yellow-100 text-yellow-700 text-sm font-bold rounded-full mb-4">Phụ huynh nói gì</span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">Niềm Tin Của <span className="text-gradient-hp">Gia Đình</span></h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <FadeIn key={r.name} delay={i * 120}>
              <div className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-red-100 transition-all duration-300 hover:-translate-y-2 cursor-default">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(r.stars)].map((_, j) => <span key={j} className="text-yellow-400 text-lg">★</span>)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
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
  )
}

/* ─── Contact Section ─── */
function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', child: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1800)
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-red-100 text-red-600 text-sm font-bold rounded-full mb-4">Liên hệ & Đăng ký</span>
          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">Bắt Đầu <span className="text-gradient-hp">Hành Trình</span></h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">Điền thông tin để đặt lịch tham quan trường miễn phí — chúng tôi sẽ liên hệ trong 24h!</p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Form */}
          <FadeIn>
            <div className="bg-gradient-to-br from-red-50 to-blue-50 rounded-3xl p-8 border border-red-100">
              {sent ? (
                <div className="text-center py-10">
                  <div className="text-7xl mb-4 animate-bounce">🎉</div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Đăng ký thành công!</h3>
                  <p className="text-gray-500">Cảm ơn bạn! Chúng tôi sẽ liên hệ trong vòng 24 giờ.</p>
                  <button onClick={() => setSent(false)} className="mt-5 px-6 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors">Gửi lại</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { key: 'name', label: 'Họ tên phụ huynh', placeholder: 'Nguyễn Thị An', type: 'text' },
                    { key: 'phone', label: 'Số điện thoại', placeholder: '0901 234 567', type: 'tel' },
                    { key: 'child', label: 'Tên & tuổi của bé', placeholder: 'Bé Minh, 3 tuổi', type: 'text' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{f.label}</label>
                      <input type={f.type} required value={form[f.key]} onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none text-sm transition-all bg-white" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ghi chú thêm</label>
                    <textarea rows={3} value={form.message} onChange={e => setForm(v => ({ ...v, message: e.target.value }))}
                      placeholder="Thắc mắc hoặc yêu cầu đặc biệt..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none text-sm transition-all bg-white resize-none" />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-red-700 active:scale-95 transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2 disabled:opacity-70">
                    {loading ? (
                      <><div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Đang gửi...</>
                    ) : '🎯 Đăng ký tham quan miễn phí'}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>

          {/* Info */}
          <FadeIn delay={200}>
            <div class="cursor-pointer">
              {[
                { icon: <Clock color="white" />, title: 'Giờ hoạt động', lines: ['Thứ 2 - Thứ 7: 6:30 - 16:30'] },
                { icon: <PhoneCall color="white" />, title: 'Điện thoại', lines: ['0396-053-054 (Cô Vân)', '0843-363-639 (Cô Trang)'] },
                { icon: <Mail color="white" />, title: 'Email', lines: ['hongphuc.info@gmail.com'] },
                { icon: <MapPin color="white" />, title: 'Địa chỉ', lines: ['Lộ Vàm, Xã Chợ Gạo, Tỉnh Đồng Tháp'] },
              ].map((item) => {
                return (<div key={item.title} className="group flex items-center gap-4 px-4 py-2 rounded-2xl hover:bg-red-50 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-blue-600 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                    {item.lines.map(l => <p key={l} className="text-gray-500 text-sm">{l}</p>)}
                  </div>
                </div>)
              })}

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden border-2 border-red-100 bg-gradient-to-br from-red-100 to-blue-100 flex items-center justify-center mt-2">
                <div className="text-center">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.950473041777!2d106.40804457481173!3d10.345845389777931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310aae472ef969f1%3A0xf3f19f963e2485d5!2zTeG6pk0gTk9OIEjhu5JORyBQSMOaQw!5e0!3m2!1svi!2s!4v1783098350804!5m2!1svi!2s" width="800" height="250" style={{ border: 0 }} allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="bg-gray-900 pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center"><img src="./favicon.svg" alt="Logo" /></div>
              <div>
                <p className="text-gray-500 text-xs">Mầm non</p>
                <p className="font-black text-white">Hồng Phúc</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">Nơi ươm mầm những ước mơ, vun đắp những tâm hồn trong sáng và hạnh phúc.</p>
          </div>
          {[
            { title: 'Liên kết nhanh', items: ['Giới thiệu', 'Chương trình', 'Cơ sở vật chất', 'Đội ngũ', 'Liên hệ'] },
            { title: 'Chương trình', items: ['Lớp Mầm (2-3 tuổi)', 'Lớp Chồi (3-4 tuổi)', 'Lớp Thỏ Ngọc (4-5 tuổi)', 'Thể dục nhịp điệu'] },
            { title: 'Liên hệ', items: ['0396-053-054 (Cô Vân)', '0843-363-639 (Cô Trang)', 'Lộ Vàm, Chợ Gạo, Đồng Tháp', 'T2-T7: 6:30-17:00', ''] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="font-bold text-white text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.items.filter(Boolean).map(item => (
                  <li key={item}><a href="#" className="text-gray-400 hover:text-red-400 text-sm transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">©2026 <Link to="/" className="text-slate-200">Trường Mầm non Hồng Phúc</Link>. All rights reserved.</p>
          <p className="text-gray-500 text-xs flex items-center">Thiết kế & phát triển &nbsp;<Link to="https://github.com/minhsangng" className="text-xs text-slate-200 hover:text-blue-400 transition-colors flex items-center gap-1.5 group">minhsangng</Link></p>
        </div>
      </div>
    </footer>
  )
}

/* ─── Active link menu ─── */
function ActiveLinkMenu() {
  const [action, setAction] = useState(false);
  
  return (
    <button className="fixed bottom-6 right-6 z-50 w-12 h-12 group bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl shadow-md shadow-red-300/50 hover:scale-110 active:scale-95 transition-all flex items-center justify-center text-xl" 
      onMouseEnter={() => setAction(true)}
      onMouseLeave={() => setAction(false)}
      >
      {!action ? <Share2 /> : <X />}
      
      <ul className="group-hover:block hidden flex-col gap-2 absolute right-0 bottom-0 w-24 h-24 transition ease-linear">
        <li className="absolute right-0 top-0 p-2 bg-black/65 rounded-full size-9 border border-white shadow-md shadow-white/75"><Link to=""><img src={Facebook} alt="Facebook" /></Link></li>
        <li className="absolute left-3 top-3 p-2 bg-black/65 rounded-full size-9 border border-white shadow-md shadow-white/75"><Link to=""><img src={Tiktok} alt="Tiktok" /></Link></li>
        <li className="absolute left-0 bottom-0 p-2 bg-black/65 rounded-full size-9 border border-white shadow-md shadow-white/75"><Link to=""><img src={Zalo} alt="Zalo" /></Link></li>
      </ul>
    </button>
  )
}

/* ─── Scroll-to-top ─── */
function ScrollTop() {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    const h = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, []);
  
  return show ? (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-24 right-6 z-40 w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl shadow-md shadow-red-300/50 hover:scale-110 active:scale-95 transition-all flex items-center justify-center text-xl">
      <ArrowUp />
    </button>
  ) : null
}

/* ─── Main LandingPage ─── */
export default function LandingPage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <style>{`
        @keyframes float {
          from { transform: translateY(0px) rotate(0deg); }
          to   { transform: translateY(-20px) rotate(8deg); }
        }
        .text-gradient-hp {
          background: linear-gradient(135deg, #dc2626, #2563eb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {!loaded && <LoadingScreen onDone={() => setLoaded(true)} />}

      <div className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
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
  )
}
