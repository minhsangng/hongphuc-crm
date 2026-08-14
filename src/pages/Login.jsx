import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, LockKeyhole, UserKey, MessageCircleWarning, Eye, EyeClosed } from "lucide-react";
import { images, getDataFromAPI } from "../utils/helpers";
import { generateKey, encryptData, decryptData } from "../utils/webCryptoAPI";

function Bubble({ size, color, x, y, delay, duration }) {
  return (
    <div className="absolute rounded-full pointer-events-none opacity-70" style={{ width: size, height: size, background: color, left: x, top: y, filter: 'blur(1.5px)', animation: `floatBubble ${duration}s ease-in-out ${delay}s infinite alternate` }}/>
  )
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ userName: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (document.documentElement.hasAttribute("class")) document.documentElement.removeAttribute("class");
    setTimeout(() => setMounted(true), 50);
  }, []);

  const bubbles = [
    { size: "180px", color: "rgba(220,38,38,0.18)",  x: "-40px",  y: "-40px",  delay: 0,   duration: 5   },
    { size: "120px", color: "rgba(37,99,235,0.2)",   x: "75%",    y: "-20px",  delay: 1,   duration: 4   },
    { size: "80px",  color: "rgba(250,204,21,0.3)",  x: "88%",    y: "60%",    delay: 0.5, duration: 3.5 },
    { size: "100px", color: "rgba(34,197,94,0.15)",  x: "-20px",  y: "70%",    delay: 1.5, duration: 4.5 },
    { size: "60px",  color: "rgba(168,85,247,0.25)", x: "45%",    y: "85%",    delay: 0.8, duration: 3   },
    { size: "90px",  color: "rgba(251,146,60,0.2)",  x: "20%",    y: "-30px",  delay: 2,   duration: 4   },
  ]

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.userName.trim() || !form.password.trim()) {
      setError("Vui lòng nhập đầy đủ thông tin đăng nhập.");
      return;
    }

    setLoading(true);

    try {
      const response = await Promise.race([
        getDataFromAPI("auth-login", "post", form),
        new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 5000)),
      ]);

      if (response.status === 200) {
        navigate("/admin");
      } else {
        setError("Tên đăng nhập hoặc mật khẩu không đúng.");
      }
    } catch (err) {
      if (err.message === "timeout") {
        setError("Kết nối quá lâu, vui lòng kiểm tra mạng và thử lại.");
      } else {
        setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div id="login">
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
        /* Ẩn icon con mắt mặc định của Edge / Chrome / Firefox */
        input[type="password"]::-ms-reveal,
        input[type="password"]::-ms-clear {
          display: none;
        }
        input[type="password"]::-webkit-credentials-auto-fill-button,
        input[type="password"]::-webkit-textfield-decoration-container {
          visibility: hidden;
          display: none !important;
        }
        input[type="password"]::-moz-reveal {
          display: none;
        }
      `}</style>

      <div className="min-h-screen max-h-screen relative overflow-hidden flex items-center justify-center p-4">
        <div className="absolute inset-0" style={{backgroundImage: `url("${images("background_login.png")}")`, backgroundSize: "100%", backgroundPosition: "center"}}></div>
        {bubbles.map((b, i) => <Bubble key={i} {...b} />)}
        {["sky.png","tree.png","sun.png","car.png","pencil.png","tubelight.png","coun-shape.png","follwer.png"].map((em, i) => (
          <div key={i} className="absolute text-2xl pointer-events-none select-none"
            style={{ left: `${8 + i * 12}%`, top: `${15 + (i % 3) * 25}%`, opacity: 0.25, animation: `floatBubble ${3 + i * 0.4}s ease-in-out ${i * 0.3}s infinite alternate`,
          }}><img src={images(em)} alt="Icon" /></div>
        ))}
        <Link to="/" className="absolute top-5 left-5 flex items-center gap-2 text-red-500 hover:text-red-400 text-sm font-bold transition-all hover:gap-3 group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span>Về trang chủ
        </Link>

        <div className={`relative z-10 w-full max-w-md card-enter ${mounted ? "card-enter-active" : ""}`} style={{ transitionDelay: "150ms" }} >
          <div className="relative bg-white rounded-3xl shadow-2xl shadow-gray/50 overflow-hidden">
            <div className="relative bg-gradient-to-r from-blue-500 to-red-400 px-8 pt-2 pb-6 text-center overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full"></div>
              <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full"></div>
              <div className="flex justify-center items-center gap-1 flex-wrap mt-4">
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full shadow-xl mb-4 mx-auto">
                  <span className="text-4xl bg-white rounded-full"><img src="/favicon_v2.svg" alt="Logo" /></span>
                  <div className="absolute -inset-1.5 rounded-full border-2 border-dashed border-white/50" style={{ animation: "spinSlow 8s linear infinite" }}/>
                </div>
                <h1 className="text-2xl font-black text-white drop-shadow-sm">Hệ thống quản trị</h1>
              </div>
            </div>
            <div className="-mt-8 relative z-10">
              <svg viewBox="0 0 400 40" fill="white" xmlns="http://www.w3.org/2000/svg" className="dark:fill-gray-900">
                <path d="M0 40 Q100 0 200 20 Q300 40 400 10 L400 40 Z" />
              </svg>
            </div>
            <div className="px-8 pb-4">
              <div className="flex justify-between items-center gap-2 flex-wrap mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Đăng nhập</h2>
                <p className="text-gray-400 text-sm">Chào mừng trở lại!</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Tên đăng nhập</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-base"><User size={20}/></span>
                    <input type="text" autoComplete="username" placeholder="Nhập tên đăng nhập..." value={form.userName} onChange={e => setForm(v => ({ ...v, userName: e.target.value }))}
                      className="input-hp w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none focus:border-red-400 focus:bg-white dark:focus:bg-gray-700 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Mật khẩu</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-base"><LockKeyhole size={20}/></span>
                    <input type={showPass ? "text" : "password"} autoComplete="current-password" placeholder="Nhập mật khẩu..." value={form.password} onChange={e => setForm(v => ({ ...v, password: e.target.value }))}
                      className="input-hp w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm outline-none focus:border-red-400 focus:bg-white dark:focus:bg-gray-700 transition-all"
                    />
                    <button type="button" className="absolute right-3.5 top-1/2 -translate-y-1/2" onClick={()=>setShowPass(!showPass)}>{showPass ? <Eye size={20} /> : <EyeClosed size={20}/>}</button>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  {/* <label className="flex items-center gap-2 cursor-pointer group" onClick={() => setForm(v => ({ ...v, remember: !v.remember }))}>
                    <div className={`w-3 h-3 rounded-sm border-2 flex items-center justify-center transition-all ${form.remember ? 'bg-red-500 border-red-500' : 'border-gray-300 dark:border-gray-600 group-hover:border-red-300'}`}>
                      {form.remember && <span className="text-white text-xs font-bold">✓</span>}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 select-none">Ghi nhớ đăng nhập</span>
                  </label> */}
                  <button type="button" className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors hover:underline">Quên mật khẩu?</button>
                </div>

                {error && (
                  <div className="flex items-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl animate-fade-slide-up">
                    <span className="text-red-500 text-base"><MessageCircleWarning/></span>
                    <p className="text-sm text-red-700 dark:text-red-300 font-medium">{error}</p>
                  </div>
                )}

                <button type="submit" disabled={loading} className={`relative w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg overflow-hidden disabled:opacity-80 disabled:cursor-not-allowed ${loading ? 'shimmer-btn' : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-red-300/50 hover:shadow-red-400/60'}`}>
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full inline-block" style={{ animation: 'spinSlow 0.7s linear infinite' }} />Đang xác thực...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2"><UserKey/>Đăng nhập</span>
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-3">© 2026 <Link to="/">Mầm non Hồng Phúc</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}