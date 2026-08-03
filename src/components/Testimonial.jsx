import { useState } from "react";
import { images } from "../utils/helpers";

const testimonials = [
  { img: "client1.png", name: "Anh Nguyễn Văn Hùng", role: "Phụ huynh bé Bin" },
  { img: "client2.png", name: "Chị Lê Thị Hoa", role: "Phụ huynh bé An" },
  { img: "client3.png", name: "Anh Trần Văn Minh", role: "Phụ huynh bé Su" },
];

export default function Testimonial() {
  const [active, setActive] = useState(0);

  return (
    <section className="testimonial-section section-padding fix pb-0">
      <div className="pencil-icon"><img src={images("pencil.png")} alt="icon-image" /></div>
      <div className="flower-shape"><img src={images("follwer.png")} alt="icon-image" /></div>

      <div className="w-[90%] mx-auto">
        <div className="section-title text-center">
          <span className="sub-title">Cảm Nhận Phụ Huynh</span>
          <h2>Cảm Nhận Từ <span>Phụ Huynh</span> <br /> Học Sinh</h2>
        </div>

        <div className="testimonial-wrapper">
          <div className="swiper testimonial-slider">
            <div className="swiper-wrapper">
              {testimonials.map((t, i) => (
                <div key={t.name} className="swiper-slide" style={{ display: i === active ? "block" : "none" }}>
                  <div className="testimonial-item flex flex-col items-center">
                    <div className="client-image">
                      <img src={images(t.img)} alt="client-image" />
                      <ul className="icon">
                        {Array.from({ length: 5 }).map((_, s) => (<li key={s}><i className="fas fa-star" /></li>))}
                      </ul>
                    </div>
                    <p className="testi-text">"Con tôi rất thích đến trường mỗi ngày. Cô giáo tận tâm, môi trường học tập vui vẻ và an toàn, đúng như những gì gia đình mong muốn cho con."</p>
                    <div className="client-info">
                      <h3>{t.name}</h3>
                      <p>{t.role}</p>
                    </div>
                    <div className="koma-icon"><img src={images("koma.png")} alt="icon-image" /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="testimonial-dots text-center mt-4">
            {testimonials.map((t, i) => (
              <button key={t.name} onClick={() => setActive(i)} aria-label={`Show testimonial ${i + 1}`} style={{ width: 10, height: 10, borderRadius: "50%", margin: "0 5px", border: "none", background: i === active ? "#333" : "#ccc", cursor: "pointer" }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}