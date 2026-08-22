import { Calendar, User } from "lucide-react";
import { images } from "../utils/helpers";

const news = [
  {
    img: "news1.jpg",
    category: "Học Tập",
    title: "10 Hoạt Động Học Mà Chơi Cho Bé Tại Nhà",
    excerpt: "Gợi ý những trò chơi đơn giản giúp bé vừa vui vừa phát triển tư duy ngay tại nhà.",
    author: "Cô Thu Hà",
    date: "12/06/2026",
  },
  {
    img: "news2.jpg",
    category: "Giáo Dục",
    title: "Chuẩn Bị Tâm Lý Cho Con Trong Ngày Đầu Đến Trường",
    excerpt: "Những cách đơn giản giúp bé tự tin, bớt lo lắng trong ngày đầu tiên đến lớp.",
    author: "Cô Thu Hà",
    date: "12/06/2026",
  },
  {
    img: "news3.jpg",
    category: "Trẻ Em",
    title: "Ý Tưởng Thủ Công Sáng Tạo Cho Bé",
    excerpt: "Những hoạt động thủ công dễ làm, giúp bé rèn luyện sự khéo léo và óc sáng tạo.",
    author: "Cô Thu Hà",
    date: "12/06/2026",
  },
];

export default function News() {
  return (
    <section className="news-section section-padding fix">
      <div className="hut-shape float-bob-x"><img src={images("hute.png")} alt="shape-img" /></div>
      <div className="sky-shape float-bob-y"><img src={images("sky.png")} alt="shape-img" /></div>

      <div className="w-[90%] mx-auto">
        <div className="section-title text-center">
          <span className="sub-title">Tin Tức &amp; Sự Kiện</span>
          <h2>Tin Tức <span>Mới Nhất</span> Từ Trường</h2>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {news.map((n) => (
            <div key={n.title} className="">
              <div className="news-card-items">
                <div className="news-image"><img src={images(n.img)} alt="news-image" /></div>
                <div className="news-content">
                  <a href="/news-details"><span className="catagory">{n.category}</span></a>
                  <h3><a href="/news-details" className="underline line-clamp-1">{n.title}</a></h3>
                  <p className="line-clamp-2">{n.excerpt}</p>
                  <ul className="author-items">
                    <li className="flex items-center gap-1"><User /> {n.author}</li>
                    <li className="calendar flex items-center gap-1"><Calendar /> {n.date}</li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}