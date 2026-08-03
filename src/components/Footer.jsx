import { Mail, MapPin } from "lucide-react";
import { images } from "../utils/helpers";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="bottom-shape"><img src={images("bg-bottom.png")} alt="shape-img" /></div>
      <div className="busket-shape float-bob-x"><img src={images("busket.png")} alt="shape-img" /></div>
      <div className="ball-shape float-bob-y"><img src={images("ball.png")} alt="shape-img" /></div>

      <div className="w-[90%] mx-auto">
        <div className="footer-widgets-wrapper">
          <div className="grid grid-cols-4 grid-rows-1 gap-2">
            <div className="">
              <div className="single-footer-widget">
                <div className="widget-head"><a href="/"><img src={images("Logo.svg")} alt="logo-image" /></a></div>
                <div className="widget-content">
                  <p>Mầm Non Hồng Phúc là ngôi trường mầm non nơi các bé từ 4 đến 6 tuổi bắt đầu hành trình học tập đầu đời trong môi trường an toàn và yêu thương.</p>
                  <ul className="social-icon">
                    <li><a href="https://www.facebook.com/hongphuc2025"><img src={images("facebook.svg")} alt="Facebook" /></a></li>
                    <li><a href="https://www.tiktok.com/@vannguenjkkk"><img src={images("tiktok.svg")} alt="TikTok" /></a></li>
                    <li><a href="https://zalo.me/0396053054"><img src={images("zalo.svg")} alt="Zalo" /></a></li>
                    <li><a href="tel:0396-053-054"><img src={images("phone-calling.svg")} alt="Phone" /></a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="">
              <div className="single-footer-widget">
                <div className="widget-head text-center font-bold underline underline-offset-4"><h3>Liên Kết Nhanh</h3></div>
                <div className="widget-content text-center mt-4">
                  <ul className="list-area">
                    <li><a href="/program">Khóa Học</a></li>
                    <li><a href="/program">Chương Trình Học</a></li>
                    <li><a href="/about">Giới Thiệu</a></li>
                    <li><a href="/contact">Liên Hệ</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="">
              <div className="single-footer-widget">
                <div className="widget-head text-center font-bold underline underline-offset-4"><h3>Thông Tin Trường</h3></div>
                <div className="widget-content text-center mt-4">
                  <ul className="list-area">
                    <li><a href="/contact">Hỗ Trợ Phụ Huynh</a></li>
                    <li><a href="/contact">Tình Trạng Tuyển Sinh</a></li>
                    <li><a href="/contact">Câu Hỏi Thường Gặp</a></li>
                    <li><a href="/news">Tin Tức &amp; Sự Kiện</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="">
              <div className="single-footer-widget">
                <div className="widget-content">
                  <div className="contact-info">
                    <div className="icon"><Mail /></div>
                    <div className="content">
                      <h3>Email</h3>
                      <p className="text-base"><a href="mailto:mnhongphuc.info@gmail.com">mnhongphuc.info@gmail.com</a></p>
                    </div>
                  </div>
                  <div className="contact-info">
                    <div className="icon"><MapPin /></div>
                    <div className="content">
                      <h3>Địa chỉ</h3>
                      <p className="text-base">Lộ Vàm, Chợ Gạo, Đồng Tháp</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="footer-bottom">
            © <a href="/">Mầm non Hồng Phúc</a> 2026. Bảo lưu mọi quyền.
          </p>
        </div>
      </div>
    </footer>
  );
}