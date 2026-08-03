import { ArrowRight, Check } from "lucide-react";
import { images } from "../utils/helpers";

export default function About() {
  return (
    <section className="about-section section-padding fix">
      <div className="tubelight-shape"><img src={images("tubelight.png")} alt="shape-img" /></div>
      <div className="sun-shape float-bob-y"><img src={images("sun.png")} alt="shape-img" /></div>
      <div className="star-shape"><img src={images("star.png")} alt="shape-img" /></div>
      <div className="love-shape float-bob-x"><img src={images("love.png")} alt="shape-img" /></div>
      <div className="frame-shape"><img src={images("frame(1).png")} alt="shape-img" /></div>

      <div className="w-[90%] mx-auto">
        <div className="about-wrapper">
          <div className="flex gap-4 items-center">
            <div className="w-1/2">
              <div className="about-image-box">
                <div className="about-image">
                  <img src={images("about-1.png")} alt="about-image" />
                  <div className="shape-bg"><img src={images("about-bg-1.png")} alt="shape-image" /></div>
                </div>
                <div className="counter-image float-bob-x">
                  <img src={images("ab-counter.png")} alt="shape-img" />
                  <div className="counter-box">
                    <div className="count">
                      <h2 className="font-bold text-white" style={{fontSize: "3rem"}}>38</h2>
                      <span className="plus">+</span>
                    </div>
                    <p>Năm kinh nghiệm</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-1/2">
              <div className="about-content">
                <div className="section-title text-left">
                  <span className="sub-title text-left">Về chúng tôi</span>
                  <h2>An Toàn, Vui Vẻ &amp; <span>Giáo Dục</span> – Điều Con Bạn Cần</h2>
                </div>
                <div className="content-bottom mt-4 md:mt-0">
                  <p>Với hơn 38 năm kinh nghiệm trong lĩnh vực giáo dục mầm non, chúng tôi luôn nỗ lực mang đến môi trường học tập an toàn, thân thiện, giúp trẻ phát triển toàn diện cả về thể chất lẫn tinh thần ngay từ những năm tháng đầu đời.</p>
                  <div className="about-list">
                    <ul>
                      <li className="mb-3"><Check /> Học Mà Chơi, Chơi Mà Học</li>
                      <li><Check /> An Toàn Cho Trẻ</li>
                    </ul>
                    <ul>
                      <li className="mb-3"><Check /> Bữa Ăn Dinh Dưỡng</li>
                      <li><Check /> Không Gian Đáng Yêu</li>
                    </ul>
                  </div>
                  <div className="about-button">
                    <a href="/about" className="theme-btn w-fit flex items-center gap-2">Ghi danh trẻ <ArrowRight /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}