import { ArrowRight, Play } from "lucide-react";
import { images } from "../utils/helpers";

export default function Hero() {
  return (
    <section className="hero-section hero-1 hero-bg fix">
      <div className="perasute-shape float-bob-y"><img src={images("perashute.png")} alt="shape-img" /></div>
      <div className="car-shape float-bob-x"><img src={images("car.png")} alt="shape-img" /></div>
      <div className="tree-shape"><img src={images("tree.png")} alt="shape-img" /></div>
      <div className="crown-shape"><img src={images("crown.png")} alt="shape-img" /></div>
      <div className="frame-shape float-bob-y"><img src={images("frame.png")} alt="shape-img" /></div>
      <div className="line-shape"><img src={images("hero-line.png")} alt="Line" /></div>

      <div className="container hero-container">
        <div className="flex gap-4">
          <div className="">
            <div className="hero-content !mt-0">
              <h1 className="text-6xl font-bold">Nơi Con Yêu <br /> Vui Chơi <br /> Và Khôn Lớn <br /> <span>Mỗi Ngày</span></h1>
              <p>Mầm non là môi trường giáo dục đầu đời quan trọng, <br /> đặt nền móng cho hành trình khôn lớn của con.</p>
              <div className="hero-button">
                <a href="/contact" className="theme-btn flex items-center gap-2">Ghi danh trẻ <ArrowRight /></a>
                <div className="wave-area">
                  <div className="promo-video">
                    <div className="waves-block">
                      <div className="waves wave-1" />
                      <div className="waves wave-2" />
                      <div className="waves wave-3" />
                    </div>
                    <a className="video-popup" href="https://www.youtube.com/watch?v=Cn4G2lZ_g2I" target="_blank" rel="noreferrer"><Play color="white"/></a>
                  </div>
                  <p className="video-text text-xs">Giới thiệu trường</p>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="hero-img">
              <img src={images("hero1.png")} alt="hero-img" />
              <div className="text-shape float-bob-y"><img src={images("text.png")} alt="shape-img" /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}