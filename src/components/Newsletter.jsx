import { useState } from "react";
import { images } from "../utils/helpers";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire this up to your newsletter provider
    console.log("Subscribed:", email);
    setEmail("");
  };

  return (
    <section className="newsletter-section section-padding pt-0 fix">
      <div className="w-[90%] mx-auto">
        <div className="section-title text-center">
          <span className="sub-title">Đăng Ký Ngay</span>
          <h2>Đăng ký nhận <span>bản tin</span> từ trường</h2>
          <p className="mt-4">Cập nhật tin tức và ưu đãi mới nhất từ trường</p>
        </div>

        <div className="signUp-box mt-4 mt-md-0">
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <input type="email" id="emailInput" placeholder="Nhập địa chỉ email của bạn" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <i className="far fa-house house-icon" />
            </div>
            <button type="submit" className="theme-btn">Đăng Ký Ngay <i className="icon-arrow-icon" /></button>
          </form>
        </div>

        <div className="newsletter-image"><img src={images("newsletter1.png")} alt="newsletter-image" /></div>
      </div>
    </section>
  );
}