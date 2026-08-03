import { ArrowRight } from "lucide-react";
import { images } from "../utils/helpers";

export default function ChooseUs() {
  return (
    <section className="choose-us-section section-padding fix">
      <div className="perasute-shape float-bob-y"><img src={images("perasute(1).png")} alt="shape-img" /></div>
      <div className="butterfly-shape float-bob-y"><img src={images("butarfly.png")} alt="shape-img" /></div>
      <div className="zikzak-shape float-bob-x"><img src={images("zikzak(1).png")} alt="shape-img" /></div>
      <div className="coun-shape float-bob-y"><img src={images("coun-shape.png")} alt="shape-img" /></div>

      <div className="w-[90%] mx-auto">
        <div className="choose-us-wrapper">
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <div className="choose-img-box">
                <img className="style-2" src={images("choose2.jpg")} alt="choose-image" />
                <img src={images("choose1.png")} alt="choose-image" />
                <div className="img-3"><img src={images("choose3.png")} alt="choose-image" /></div>
              </div>
            </div>

            <div className="">
              <div className="choose-us-content">
                <div className="section-title text-left">
                  <span className="sub-title">Vì Sao Chọn Chúng Tôi</span>
                  <h2>Mỗi <span>Bước Chân Nhỏ</span> <br /> Là Một Khám Phá Lớn</h2>
                </div>
                <p className="mt-3 md:mt-0">
                  Chúng tôi kiến tạo môi trường học tập gần gũi, an toàn, nơi mỗi bé được khuyến khích khám phá và phát triển theo cách riêng của mình.
                </p>
                <div className="icon-items">
                  <div className="icon flex justify-center items-center"><img src={images("bricks-1.svg")} alt="svg-image" /></div>
                  <div className="content">
                    <h3 className="mb-2">Giáo Dục Sớm</h3>
                    <p>Mầm non là môi trường giáo dục đầu đời, nơi trẻ được xây dựng nền tảng vững chắc cho những năm tháng học tập sau này.</p>
                  </div>
                </div>
                <div className="progress-wrap">
                  <div className="pro-items">
                    <div className="pro-head">
                      <h4 className="title">Sáng Tạo</h4>
                      <span className="point">90%</span>
                    </div>
                    <div className="ber-box">
                      <div className="progress"><div className="progress-value" style={{ width: "90%" }} /></div>
                    </div>
                  </div>
                  <div className="pro-items">
                    <div className="pro-head">
                      <h4 className="title">Trải Nghiệm</h4>
                      <span className="point">70%</span>
                    </div>
                    <div className="ber-box style-2">
                      <div className="progress progress-2"><div className="progress-value style-two" style={{ width: "70%" }} /></div>
                    </div>
                  </div>
                </div>
                <div className="choose-button">
                  <a href="/contact" className="theme-btn w-fit flex items-center gap-2">Ghi danh trẻ <ArrowRight /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}