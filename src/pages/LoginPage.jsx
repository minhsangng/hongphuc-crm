import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

/* ─── Floating decorative bubbles ─── */
function Bubble({ size, color, x, y, delay, duration }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none opacity-70"
      style={{
        width: size, height: size,
        background: color,
        left: x, top: y,
        filter: 'blur(1.5px)',
        animation: `floatBubble ${duration}s ease-in-out ${delay}s infinite alternate`,
      }}
    />
  )
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '', remember: false })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTimeout(() => setMounted(true), 50)
  }, [])

  const bubbles = [
    { size: '180px', color: 'rgba(220,38,38,0.18)',  x: '-40px',  y: '-40px',  delay: 0,   duration: 5   },
    { size: '120px', color: 'rgba(37,99,235,0.2)',   x: '75%',    y: '-20px',  delay: 1,   duration: 4   },
    { size: '80px',  color: 'rgba(250,204,21,0.3)',  x: '88%',    y: '60%',    delay: 0.5, duration: 3.5 },
    { size: '100px', color: 'rgba(34,197,94,0.15)',  x: '-20px',  y: '70%',    delay: 1.5, duration: 4.5 },
    { size: '60px',  color: 'rgba(168,85,247,0.25)', x: '45%',    y: '85%',    delay: 0.8, duration: 3   },
    { size: '90px',  color: 'rgba(251,146,60,0.2)',  x: '20%',    y: '-30px',  delay: 2,   duration: 4   },
  ]

  function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!form.username.trim() || !form.password.trim()) {
      setError('Vui lòng nhập đầy đủ thông tin đăng nhập.')
      return
    }

    setLoading(true)
    // Simulate auth
    setTimeout(() => {
      if (form.username === 'admin' && form.password === 'admin123') {
        navigate('/admin')
      } else {
        setLoading(false)
        setError('Tên đăng nhập hoặc mật khẩu không đúng.')
      }
    }, 1500)
  }

  return (
    <>
      <style>{`
        @keyframes floatBubble {
          from { transform: translateY(0px) rotate(0deg) scale(1); }
          to   { transform: translateY(-24px) rotate(10deg) scale(1.05); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-fade-slide-up {
          animation: fadeSlideUp 0.5s ease-out forwards;
        }
        .card-enter {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        .card-enter-active {
          opacity: 1;
          transform: translateY(0);
        }
        .shimmer-btn {
          background: linear-gradient(90deg, #dc2626 0%, #ef4444 40%, #fca5a5 50%, #ef4444 60%, #dc2626 100%);
          background-size: 200% auto;
          animation: shimmer 2s linear infinite;
        }
        .input-hp:focus {
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
        }
      `}</style>

      <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-blue-700" />

        {/* Pattern */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Bubbles */}
        {bubbles.map((b, i) => <Bubble key={i} {...b} />)}

        {/* Floating emojis */}
        {['🌸','⭐','🎨','📚','🎵','🌈','🌟','🎠'].map((em, i) => (
          <div
            key={i}
            className="absolute text-2xl pointer-events-none select-none"
            style={{
              left: `${8 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`,
              opacity: 0.25,
              animation: `floatBubble ${3 + i * 0.4}s ease-in-out ${i * 0.3}s infinite alternate`,
            }}
          >
            {em}
          </div>
        ))}

        {/* Back to home */}
        <Link
          to="/"
          className="absolute top-5 left-5 flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-all hover:gap-3 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          Về trang chủ
        </Link>

        {/* Card */}
        <div
          className={`relative z-10 w-full max-w-md card-enter ${mounted ? 'card-enter-active' : ''}`}
          style={{ transitionDelay: '50ms' }}
        >
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-blue-500 rounded-3xl blur-lg opacity-40" />

          <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">
            {/* Header strip */}
            <div className="relative bg-gradient-to-r from-red-600 to-blue-700 px-8 pt-10 pb-16 text-center overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full" />
              <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full" />

              {/* Logo */}
              <div className="relative inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-xl mb-4 mx-auto">
                <span className="text-4xl">🌸</span>
                {/* Spinning ring */}
                <div
                  className="absolute -inset-1.5 rounded-2xl border-2 border-dashed border-white/50"
                  style={{ animation: 'spinSlow 8s linear infinite' }}
                />
              </div>

              <h1 className="text-2xl font-black text-white drop-shadow-sm">Hồng Phúc</h1>
              <p className="text-white/75 text-sm mt-1">Lớp Trẻ Tư Thục · Hệ thống quản lý</p>
            </div>

            {/* Wave separator */}
            <div className="-mt-8 relative z-10">
              <svg viewBox="0 0 400 40" fill="white" xmlns="http://www.w3.org/2000/svg" className="dark:fill-gray-900">
                <path d="M0 40 Q100 0 200 20 Q300 40 400 10 L400 40 Z" />
              </svg>
            </div>

            {/* Form */}
            <div className="px-8 pb-8 -mt-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Đăng nhập</h2>
              <p className="text-gray-400 text-sm mb-6">Chào mừng trở lại! Nhập thông tin để tiếp tục.</p>

              {/* Demo hint */}
              <div className="flex items-start gap-2 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl mb-5">
                <span className="text-blue-500 text-base mt-0.5">💡</span>
                <div className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                  <span className="font-bold">Demo:</span> tài khoản <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded font-mono">admin</code> · mật khẩu <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded font-mono">admin123</code>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Tên đăng nhập
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-base">👤</span>
                    <input
                      type="text"
                      autoComplete="username"
                      placeholder="Nhập tên đăng nhập..."
                      value={form.username}
                      onChange={e => setForm(v => ({ ...v, username: e.target.value }))}
                      className="input-hp w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none focus:border-red-400 focus:bg-white dark:focus:bg-gray-700 transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-base">🔒</span>
                    <input
                      type={showPass ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="Nhập mật khẩu..."
                      value={form.password}
                      onChange={e => setForm(v => ({ ...v, password: e.target.value }))}
                      className="input-hp w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none focus:border-red-400 focus:bg-white dark:focus:bg-gray-700 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(v => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors text-base"
                    >
                      {showPass ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                {/* Remember + forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <div
                      onClick={() => setForm(v => ({ ...v, remember: !v.remember }))}
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${form.remember ? 'bg-red-500 border-red-500' : 'border-gray-300 dark:border-gray-600 group-hover:border-red-300'}`}
                    >
                      {form.remember && <span className="text-white text-xs font-bold">✓</span>}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 select-none">Ghi nhớ đăng nhập</span>
                  </label>
                  <button type="button" className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors hover:underline">
                    Quên mật khẩu?
                  </button>
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl animate-fade-slide-up">
                    <span className="text-red-500 text-base">⚠️</span>
                    <p className="text-sm text-red-700 dark:text-red-300 font-medium">{error}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`relative w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg overflow-hidden disabled:opacity-80 disabled:cursor-not-allowed ${loading ? 'shimmer-btn' : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-red-300/50 hover:shadow-red-400/60'}`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full inline-block" style={{ animation: 'spinSlow 0.7s linear infinite' }} />
                      Đang xác thực...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      🔐 Đăng nhập
                    </span>
                  )}
                </button>
              </form>

              {/* Footer */}
              <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-6">
                © 2025 Lớp Trẻ Tư Thục Hồng Phúc &nbsp;·&nbsp;
                <Link to="/" className="text-red-400 hover:text-red-500 hover:underline transition-colors">Về trang chủ</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
