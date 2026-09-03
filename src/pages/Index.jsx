import { useState } from 'react';
import { Menu, X, ChevronRight, Phone, MapPin,  FileText, HelpCircle, Bird, Crown, Clock, Baby } from 'lucide-react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

const IMG = {
  hero: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1600&q=80',
  gal1: 'https://images.unsplash.com/photo-1578349035260-9f3d4042f1f7?auto=format&fit=crop&w=500&q=80',
  gal2: 'https://images.unsplash.com/photo-1484820540004-14229fe36ca4?auto=format&fit=crop&w=500&q=80',
  gal3: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=500&q=80',
  gal4: 'https://images.unsplash.com/photo-1600880291319-1a7499c191e8?auto=format&fit=crop&w=500&q=80',
  class1: 'https://images.unsplash.com/photo-1537655780520-1e392ead81f2?auto=format&fit=crop&w=200&q=80',
  class2: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=200&q=80',
  daysMain: 'https://images.unsplash.com/photo-1587323655395-b1c77a12c89a?auto=format&fit=crop&w=900&q=80',
  daysEvents: 'https://images.unsplash.com/photo-1536825919521-ab78da56193b?auto=format&fit=crop&w=700&q=80',
  daysExtra: 'https://images.unsplash.com/photo-1501686637-b7aa9c48a882?auto=format&fit=crop&w=700&q=80',
  facility: 'https://images.unsplash.com/photo-1567746455504-cb3213f8f5b8?auto=format&fit=crop&w=900&q=80',
};

function Wave({ fill = '#FCF7EC', flip = false }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`} aria-hidden="true">
      <svg className="wave-svg h-10 md:h-16" viewBox="0 0 1440 90" preserveAspectRatio="none">
        <path
          d="M0,40 C220,90 420,0 700,28 C980,56 1180,92 1440,36 L1440,90 L0,90 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

/* ---------------------------------------------------------
   Header
--------------------------------------------------------- */
function Header() {
  const [open, setOpen] = useState(false);
  const navLinks = [
    { label: 'Giới thiệu', href: '#about' },
    { label: 'Lớp học & Nuôi dạy', href: '#class' },
    { label: 'Sinh hoạt tại trường', href: '#days' },
    { label: 'Ngoại khóa', href: '#extra' },
    { label: 'Hỏi đáp', href: '#guide' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-teal-100">
      <div className="hidden md:flex justify-end gap-6 px-8 py-1.5 text-xs text-inkLight border-b border-teal-50 bg-teal-50/50">
        <a href="#news" className="hover:text-teal-600 transition-colors">Thông báo từ trường</a>
        <a href="#" className="hover:text-teal-600 transition-colors">Tuyển dụng</a>
        <a href="#" className="hover:text-teal-600 transition-colors">Đường đi</a>
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-5 md:px-8 py-3">
        <a href="#top" className="flex items-center gap-2.5 shrink-0">
          <span className="w-11 h-11 rounded-full flex items-center justify-center text-white">
            <img src="/favicon.svg" />
          </span>
          <span className="leading-tight">
            <span className="block text-xs italic tracking-wide text-inkLight pb-1">Trường Mầm Non</span>
            <span className="block font-display uppercase font-bold text-xl text-teal-700">Hồng Phúc</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-7 font-display text-[15px] text-ink">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="hover:text-teal-600 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#guide"
            className="text-sm font-display px-4 py-2 rounded-full border-2 border-teal-500 text-teal-600 hover:bg-teal-50 transition-colors"
          >
            Hướng dẫn nhập học
          </a>
          <a
            href="#contact"
            className="text-sm font-display px-4 py-2 rounded-full bg-teal-500 text-white hover:bg-teal-600 transition-colors"
          >
            Liên hệ
          </a>
        </div>

        <button
          aria-label="Mở menu"
          className="lg:hidden text-ink"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden px-5 pb-5 flex flex-col gap-3 font-display text-ink bg-white border-t border-teal-100">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="py-1">
              {l.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <a href="#guide" onClick={() => setOpen(false)} className="flex-1 text-center text-sm px-4 py-2 rounded-full border-2 border-teal-500 text-teal-600">
              Nhập học
            </a>
            <a href="#contact" onClick={() => setOpen(false)} className="flex-1 text-center text-sm px-4 py-2 rounded-full bg-teal-500 text-white">
              Liên hệ
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------------------------------------------------
   Thanh mạng xã hội cố định bên trái
--------------------------------------------------------- */
function SocialRail() {
  return (
    <div className="hidden md:flex flex-col gap-3 fixed left-4 top-1/2 -translate-y-1/2 z-40">
      <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-teal-600 hover:bg-teal-500 hover:text-white transition-colors">
        <FaInstagram size={17} />
      </a>
      <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-teal-600 hover:bg-teal-500 hover:text-white transition-colors">
        <FaFacebookF size={17} />
      </a>
    </div>
  );
}

/* ---------------------------------------------------------
   Hero
--------------------------------------------------------- */
function Hero() {
  return (
    <section id="top" className="relative">
      <div className="relative h-[78vh] min-h-130 max-h-190 w-full overflow-hidden">
        <img
          src={IMG.hero}
          alt="Trẻ em vui chơi sáng tạo tại Hồng Phúc"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/15 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-16 md:pb-24">
          <p className="font-display text-white/90 text-base md:text-xl mb-2">Dành cho trẻ thơ</p>
          <h1 className="font-display font-bold text-white text-4xl md:text-6xl leading-[1.15] mb-4 max-w-2xl">
            Ước mơ, thiên nhiên,<br />và nghị lực sống.
          </h1>
          <p className="text-white/90 max-w-md text-sm md:text-base leading-relaxed">
            Trong không gian tự do rộng mở, Hồng Phúc nuôi dưỡng sức mạnh tự vươn lên của mỗi em nhỏ.
          </p>
        </div>
        <div className="hidden md:flex absolute left-10 bottom-10 items-center gap-3 text-white/85">
          <span className="[writing-mode:vertical-rl] text-xs tracking-[0.3em] font-display rotate-180">SCROLL</span>
          <span className="w-px h-14 bg-white/60" />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Thông báo (News)
--------------------------------------------------------- */
function NewsSection() {
  const items = [
    { tag: 'Cập nhật', date: '28.08.2026', title: 'Website của trường vừa được làm mới hoàn toàn!' },
    { tag: 'Bản tin', date: '04.08.2026', title: 'Bắt đầu nhận hồ sơ lớp Gấu Con (2 tuổi) năm học 2027 – 2028' },
    { tag: 'Bản tin', date: '04.07.2026', title: 'Lớp Chồi Non (3 tuổi) năm học 2026 vẫn đang nhận hồ sơ nhập học' },
  ];
  return (
    <section id="news" className="scroll-mt-28 max-w-5xl mx-auto px-5 md:px-8 py-16 md:py-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="font-display text-teal-500 text-xs tracking-[0.25em] mb-1">NEWS</p>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-ink">Thông báo</h2>
        </div>
        <a href="#" className="hidden sm:flex items-center gap-1 text-sm text-teal-600 font-display hover:gap-2 transition-all">
          Xem tất cả thông báo <ChevronRight size={16} />
        </a>
      </div>

      <div className="divide-y divide-teal-100 border-y border-teal-100">
        {items.map((it, i) => (
          <a key={i} href="#" className="flex items-center gap-3 md:gap-6 py-4 group">
            <span className="shrink-0 text-[11px] font-display px-2.5 py-1 rounded-full bg-teal-50 text-teal-600">{it.tag}</span>
            <span className="shrink-0 text-sm text-inkLight w-24">{it.date}</span>
            <span className="flex-1 text-sm md:text-base text-ink group-hover:text-teal-600 transition-colors">{it.title}</span>
            <ChevronRight size={18} className="text-teal-400 group-hover:translate-x-1 transition-transform shrink-0" />
          </a>
        ))}
      </div>

      <a href="#" className="sm:hidden mt-5 flex items-center gap-1 text-sm text-teal-600 font-display">
        Xem tất cả thông báo <ChevronRight size={16} />
      </a>
    </section>
  );
}

/* ---------------------------------------------------------
   Tâm huyết (Thoughts)
--------------------------------------------------------- */
function ThoughtsSection() {
  return (
    <section id="about" className="scroll-mt-28 relative max-w-6xl mx-auto px-5 md:px-8 pt-6 pb-14 md:pb-20">
      <div className="absolute left-4 md:left-2 top-0 w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-500">
        <Bird size={22} />
      </div>
      <div className="grid md:grid-cols-[1fr_1.1fr] gap-8 md:gap-16 items-start pt-12">
        <div>
          <p className="font-display text-teal-500 text-xs tracking-[0.25em] mb-2">THOUGHTS</p>
          <h2 className="font-display font-bold text-2xl md:text-[32px] leading-snug text-ink">
            Bồi dưỡng tâm hồn và thể chất phong phú cho những đứa trẻ của tương lai
          </h2>
        </div>
        <div className="relative">
          <p className="text-sm md:text-base leading-loose text-inkLight mb-3">
            Hồng Phúc là nơi nuôi dưỡng "ước mơ", "tự do" và "nghị lực sống" cho trẻ. Chúng tôi coi trọng việc tạo ra một môi trường để mỗi em có thể tự do phát huy hết khả năng của mình, cùng bạn bè vui chơi và trải nghiệm nhiều điều mới lạ.
          </p>
          <p className="text-sm md:text-base leading-loose text-inkLight mb-5">
            Nhà trường mong muốn cùng phụ huynh xây dựng mối quan hệ tin cậy, gắn kết, để cùng nhau đồng hành và hỗ trợ các em khôn lớn mỗi ngày.
          </p>
          <a href="#" className="inline-flex items-center gap-1 text-sm text-teal-600 font-display hover:gap-2 transition-all">
            Xem chi tiết <ChevronRight size={16} />
          </a>
          <div className="hidden md:flex absolute -right-2 -bottom-16 w-14 h-14 rounded-full bg-sun-200 items-center justify-center text-sun-500">
            <Crown size={24} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Thư viện ảnh
--------------------------------------------------------- */
function GallerySection() {
  const photos = [IMG.gal1, IMG.gal2, IMG.gal3, IMG.gal4];
  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 pb-16 md:pb-24">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {photos.map((src, i) => (
          <div key={i} className={`rounded-[28px] overflow-hidden aspect-3/4 shadow-sm ${i % 2 === 1 ? 'md:mt-8' : ''}`}>
            <img src={src} alt="Khoảnh khắc tại Hồng Phúc" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Phân lớp theo độ tuổi (Class)
--------------------------------------------------------- */
function ClassSection() {
  const ages = ['0 tuổi', '1 tuổi', '2 tuổi', '3 tuổi', '4–5 tuổi'];
  const [active, setActive] = useState(3);

  const steps = [
    {
      title: 'Phòng chơi Hồng Phúc',
      desc: 'Chương trình hỗ trợ nuôi dạy con dành cho phụ huynh có bé chưa đến tuổi vào lớp.',
      type: 'support',
    },
    {
      title: 'Lớp Dâu Tây',
      sub: '1 tuổi · Có phụ huynh cùng tham gia',
      desc: 'Cha mẹ và bé cùng vui chơi, làm quen dần với môi trường trường lớp.',
      type: 'photo',
      photo: IMG.class1,
    },
    {
      title: 'Lớp Gấu Con',
      sub: '2 tuổi · Có phụ huynh cùng tham gia',
      desc: 'Bé bắt đầu khám phá, giao lưu cùng các bạn nhỏ khác.',
      type: 'photo',
      photo: IMG.class2,
    },
    {
      title: 'Lớp Chồi Non',
      sub: '3 tuổi',
      desc: 'Điểm khởi đầu của hành trình 4 năm học tại Hồng Phúc.',
      type: 'badge',
      badge: '4 năm',
    },
  ];

  const branch = [
    { name: 'Lớp Mầm', sub: 'Năm thứ 1' },
    { name: 'Lớp Chồi', sub: 'Năm thứ 2' },
    { name: 'Lớp Lá', sub: 'Năm thứ 3' },
  ];

  return (
    <section id="class" className="scroll-mt-28 bg-sun-50">
      <Wave fill="#FCF7EC" />
      <div className="max-w-5xl mx-auto px-5 md:px-8 pb-16 md:pb-20 pt-2">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="font-display text-sun-500 text-xs tracking-[0.25em] mb-2">CLASS</p>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-ink mb-4">
            Phân lớp theo độ tuổi &amp; Hỗ trợ nuôi dạy con
          </h2>
          <p className="text-sm md:text-base text-inkLight leading-relaxed">
            Hồng Phúc đồng hành cùng con từ những năm tháng đầu đời, giúp trẻ dần biết yêu thương và gắn kết với bạn bè. Nhà trường cũng mong muốn trở thành cầu nối để phụ huynh giao lưu, chia sẻ cùng nhau.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {ages.map((a, i) => (
            <button
              key={a}
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-full text-sm font-display border-2 transition-colors ${active === i ? 'bg-teal-500 border-teal-500 text-white' : 'border-teal-200 text-teal-600 hover:border-teal-400'
                }`}
            >
              {a}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-3" style={{ marginLeft: `${i * 6}%` }}>
              {i > 0 && <span className="hidden sm:block w-8 border-t-2 border-dashed border-teal-300 shrink-0" />}
              <div
                className={`flex-1 max-w-md rounded-2xl border-2 p-4 flex items-center gap-4 bg-white transition-shadow ${active === i ? 'border-teal-400 shadow-md' : s.type === 'support' ? 'border-dashed border-teal-200' : 'border-teal-100'
                  }`}
              >
                {s.type === 'photo' && (
                  <img src={s.photo} alt={s.title} className="w-14 h-14 rounded-full object-cover shrink-0 border-2 border-pink-200" />
                )}
                {s.type === 'support' && (
                  <span className="w-14 h-14 rounded-full bg-teal-50 flex items-center justify-center text-teal-500 shrink-0">
                    <Baby size={24} />
                  </span>
                )}
                {s.type === 'badge' && (
                  <span className="w-14 h-14 rounded-full bg-sun-100 flex items-center justify-center text-sun-500 font-display font-bold text-xs shrink-0 text-center">
                    {s.badge}
                  </span>
                )}
                <div>
                  <p className="font-display font-bold text-ink">{s.title}</p>
                  {s.sub && <p className="text-xs text-inkLight mb-1">{s.sub}</p>}
                  <p className="text-xs text-inkLight leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-start gap-3" style={{ marginLeft: '24%' }}>
            <span className="hidden sm:block w-8 border-t-2 border-dashed border-teal-300 shrink-0 mt-8" />
            <div className="flex-1">
              <p className="text-xs text-inkLight font-display mb-2">4–5 tuổi · Chương trình 3 năm</p>
              <div className="flex flex-wrap gap-3">
                {branch.map((b) => (
                  <div
                    key={b.name}
                    className={`rounded-2xl border-2 bg-white px-5 py-3 text-center min-w-27.5 transition-shadow ${active === 4 ? 'border-teal-400 shadow-md' : 'border-teal-100'
                      }`}
                  >
                    <p className="font-display font-bold text-ink">{b.name}</p>
                    <p className="text-xs text-inkLight">{b.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="rounded-2xl border-2 border-dashed border-teal-300 bg-teal-50/70 px-5 py-3 flex items-center gap-3 text-sm text-ink text-center">
            <Clock size={18} className="text-teal-500 shrink-0" />
            <span>Chương trình hỗ trợ nuôi dạy con — Giữ trẻ ngoài giờ (trước &amp; sau giờ học)</span>
          </div>
        </div>
      </div>
      <Wave fill="#FCF7EC" flip />
    </section>
  );
}

/* ---------------------------------------------------------
   Sinh hoạt tại trường (Days)
--------------------------------------------------------- */
function DaysSection() {
  return (
    <section id="days" className="scroll-mt-28 max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-16">
        <div className="relative">
          <img src={IMG.daysMain} alt="Một ngày ở trường Hồng Phúc" className="rounded-4xl w-full aspect-4/3 object-cover" />
          <div className="absolute -top-5 -left-5 w-24 h-24 rounded-full bg-sun-300 flex flex-col items-center justify-center text-center text-ink font-display text-xs leading-tight shadow-lg">
            <span>Một ngày</span>
            <span>ở trường</span>
          </div>
        </div>
        <div>
          <p className="font-display text-teal-500 text-xs tracking-[0.25em] mb-2">DAYS</p>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-ink mb-4">Sinh hoạt tại trường</h2>
          <p className="text-sm md:text-base text-inkLight leading-relaxed mb-4">
            Chúng tôi lên kế hoạch cho từng ngày, từng mùa theo đúng nhịp phát triển của các em. Qua việc chơi cùng bạn bè, trẻ học cách chia sẻ niềm vui, biết quan tâm và cảm thông — đó là những bài học quý giá mỗi ngày.
          </p>
          <p className="text-sm text-inkLight leading-relaxed mb-5">
            Hồng Phúc chú trọng nuôi dưỡng thể chất và tâm hồn khỏe mạnh, phong phú cho các em ngay từ những năm tháng đầu đời.
          </p>
          <a href="#" className="inline-flex items-center gap-1 text-sm text-teal-600 font-display hover:gap-2 transition-all">
            Xem chi tiết <ChevronRight size={16} />
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <img src={IMG.daysEvents} alt="Sự kiện trong năm" className="rounded-[28px] w-full aspect-16/10 object-cover mb-4" />
          <p className="font-display text-teal-500 text-xs tracking-[0.2em] mb-1">SỰ KIỆN</p>
          <h3 className="font-display font-bold text-lg text-ink mb-2">Sự kiện trong năm</h3>
          <p className="text-sm text-inkLight leading-relaxed mb-3">
            Xuân, hạ, thu, đông — mỗi mùa Hồng Phúc đều tổ chức những hoạt động thú vị để các em cùng trải nghiệm và ghi nhớ.
          </p>
          <a href="#" className="inline-flex items-center gap-1 text-sm text-teal-600 font-display">
            Xem chi tiết <ChevronRight size={16} />
          </a>
        </div>
        <div id="extra" className="scroll-mt-28">
          <img src={IMG.daysExtra} alt="Lớp học ngoại khóa" className="rounded-[28px] w-full aspect-16/10 object-cover mb-4" />
          <p className="font-display text-teal-500 text-xs tracking-[0.2em] mb-1">NGOẠI KHÓA</p>
          <h3 className="font-display font-bold text-lg text-ink mb-2">Lớp học ngoại khóa</h3>
          <p className="text-sm text-inkLight leading-relaxed mb-3">
            Nhà trường đưa vào chương trình các môn năng khiếu: múa, thể dục dụng cụ, bóng đá, tiếng Anh, âm nhạc — giúp trẻ phát triển toàn diện qua vui chơi và thể thao.
          </p>
          <a href="#" className="inline-flex items-center gap-1 text-sm text-teal-600 font-display">
            Xem chi tiết <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Cơ sở vật chất (Facility)
--------------------------------------------------------- */
function FacilitySection() {
  return (
    <section className="max-w-6xl mx-auto px-5 md:px-8 pb-16 md:pb-24">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <img src={IMG.facility} alt="Không gian trường Hồng Phúc" className="rounded-4xl w-full aspect-4/3 object-cover order-2 md:order-1" />
        <div className="order-1 md:order-2">
          <p className="font-display text-teal-500 text-xs tracking-[0.25em] mb-2">FACILITY</p>
          <h2 className="font-display font-bold text-2xl md:text-[30px] leading-snug text-ink mb-4">
            Không gian để các em chạy nhảy, vui chơi thỏa thích mỗi ngày
          </h2>
          <p className="text-sm md:text-base text-inkLight leading-relaxed mb-5">
            Ngôi trường được thiết kế theo kiến trúc hiện đại, thoáng đãng và tràn ngập ánh sáng tự nhiên. Không gian rộng rãi giúp các em thỏa sức vận động, đồng thời là bệ phóng cho sự phát triển khỏe mạnh của mỗi trẻ. An toàn luôn là ưu tiên hàng đầu trong mọi hoạt động tại trường.
          </p>
          <a href="#" className="inline-flex items-center gap-1 text-sm text-teal-600 font-display hover:gap-2 transition-all">
            Xem chi tiết <ChevronRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Hướng dẫn nhập học (Guide)
--------------------------------------------------------- */
function GuideSection() {
  return (
    <section id="guide" className="scroll-mt-28 relative bg-teal-500">
      <Wave fill="#FCF7EC" flip />
      <div className="max-w-4xl mx-auto px-5 md:px-8 pb-16 md:pb-20 pt-2 text-center text-white">
        <p className="font-display text-white/80 text-xs tracking-[0.25em] mb-2">GUIDE</p>
        <h2 className="font-display font-bold text-2xl md:text-3xl mb-4">
          Dành cho phụ huynh đang cân nhắc cho con nhập học
        </h2>
        <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-xl mx-auto mb-10">
          Hồng Phúc luôn chào đón phụ huynh đến tham quan trường để yên tâm gửi gắm con em mình, và thường xuyên tổ chức các buổi giao lưu giữa phụ huynh và giáo viên. Nếu có bất kỳ thắc mắc nào, xin đừng ngần ngại liên hệ với chúng tôi.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
          <a href="#" className="bg-white rounded-2xl p-6 flex flex-col items-center gap-2 text-ink hover:-translate-y-1 transition-transform">
            <span className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
              <FileText size={22} />
            </span>
            <span className="font-display font-bold text-teal-600">Hướng dẫn nhập học</span>
            <span className="text-[11px] tracking-[0.2em] text-[#8A7C6E]">ADMISSION</span>
          </a>
          <a href="#" className="bg-white rounded-2xl p-6 flex flex-col items-center gap-2 text-ink hover:-translate-y-1 transition-transform">
            <span className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-pink-500">
              <HelpCircle size={22} />
            </span>
            <span className="font-display font-bold text-pink-500">Câu hỏi thường gặp</span>
            <span className="text-[11px] tracking-[0.2em] text-[#8A7C6E]">FAQ</span>
          </a>
        </div>
      </div>
      <Wave fill="#FCF7EC" />
    </section>
  );
}

/* ---------------------------------------------------------
   Liên hệ (Contact)
--------------------------------------------------------- */
function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-28 max-w-4xl mx-auto px-5 md:px-8 py-16 md:py-20 text-center">
      <p className="font-display text-teal-500 text-xs tracking-[0.25em] mb-2">CONTACT</p>
      <h2 className="font-display font-bold text-2xl md:text-3xl text-ink mb-3 leading-snug">
        Mọi thắc mắc hoặc muốn tham quan trường,
        <br className="hidden md:block" /> xin đừng ngần ngại liên hệ với chúng tôi.
      </h2>
      <p className="text-sm text-inkLight mb-8">
        Nhà trường luôn sẵn sàng đón tiếp phụ huynh đến tham quan, tìm hiểu môi trường học tập của các em.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
        <a href="tel:02812345678" className="flex items-center gap-3 bg-teal-50 rounded-2xl px-6 py-4">
          <span className="w-11 h-11 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0">
            <Phone size={18} />
          </span>
          <span className="text-left">
            <span className="block text-xs text-inkLight">Gọi điện tư vấn</span>
            <span className="block font-display font-bold text-xl text-ink">028 1234 5678</span>
            <span className="block text-[11px] text-inkLight">T2–T6: 8:00–17:00 · T7: 8:00–12:00</span>
          </span>
        </a>
        <a href="#" className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-pink-500 text-white font-display hover:bg-pink-600 transition-colors">
          Liên hệ qua mẫu đăng ký <ChevronRight size={16} />
        </a>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Footer
--------------------------------------------------------- */
function Footer() {
  const cols = [
    { title: 'Trang chủ', links: ['Giới thiệu về trường', 'Đội ngũ giáo viên'] },
    { title: 'Lớp học & Nuôi dạy', links: ['Phòng chơi Hồng Phúc', 'Lớp Dâu Tây', 'Lớp Gấu Con', 'Lớp Chồi Non', 'Giữ trẻ ngoài giờ'] },
    { title: 'Sinh hoạt tại trường', links: ['Một ngày ở trường', 'Sự kiện trong năm', 'Lớp học ngoại khóa'] },
    { title: 'Thông tin khác', links: ['Thông báo từ trường', 'Câu hỏi thường gặp', 'Hướng dẫn nhập học', 'Chính sách bảo mật', 'Tuyển dụng'] },
  ];
  return (
    <footer className="bg-white border-t border-teal-100 pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-[1.3fr_repeat(4,1fr)] gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-11 h-11 rounded-full flex items-center justify-center text-white">
                <img src="/favicon.svg" />
              </span>
              <span className="leading-tight">
                <span className="block text-xs italic tracking-wide text-inkLight pb-1">Trường Mầm Non</span>
                <span className="block font-display uppercase font-bold text-xl text-teal-700">Hồng Phúc</span>
              </span>
            </div>
            <p className="text-sm text-inkLight flex items-start gap-2 mb-1.5">
              <MapPin size={15} className="mt-0.5 shrink-0" /> 123 Đường Hoa Sữa, Quận 7, TP. Hồ Chí Minh
            </p>
            <p className="text-sm text-inkLight flex items-center gap-2">
              <Phone size={15} className="shrink-0" /> 028 1234 5678
            </p>
            <div className="flex gap-2 mt-4">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 hover:bg-teal-500 hover:text-white transition-colors">
                <FaInstagram size={16} />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 hover:bg-teal-500 hover:text-white transition-colors">
                <FaFacebookF size={16} />
              </a>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <p className="font-display font-bold text-sm text-ink mb-3">{c.title}</p>
              <ul className="space-y-2">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-inkLight hover:text-teal-600 transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-teal-100 pt-6 text-center text-xs text-inkLight">
          © 2026 Trường Mầm Non Hồng Phúc. Mọi quyền được bảo lưu.
        </div>
      </div>
    </footer>
  );
}

export default function Index() {
  return (
    <div className="bg-cream text-ink font-body overflow-x-hidden">
      <Header />
      <SocialRail />
      <Hero />
      <NewsSection />
      <ThoughtsSection />
      <GallerySection />
      <ClassSection />
      <DaysSection />
      <FacilitySection />
      <GuideSection />
      <ContactSection />
      <Footer />
    </div>
  );
}