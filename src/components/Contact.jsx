import { useState } from "react";
import { images } from "../utils/helpers";
import { Send } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", sub: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire this up to your backend / email service
    console.log("Contact form submitted:", form);
  };

  return (
    <section className="contact-section section-padding">
      <div className="perasute-shape float-bob-y"><img src={images("perasute.png")} alt="shape-img" /></div>
      <div className="star-shape"><img src={images("star.png")} alt="shape-img" /></div>
      <div className="emoji-shape float-bob-x"><img src={images("emoji.png")} alt="shape-img" /></div>

      <div className="w-[90%] mx-auto">
        <div className="contact-wrapper">
          <div className="section-title-area custom-padding-top2 grid grid-cols-2 gap-4">
            <div className="section-title">
              <span className="sub-title">Liên Hệ với chúng tôi</span>
            </div>
            <p className="text-white">
              Quý phụ huynh có thắc mắc về chương trình học, học phí hay {" "}
              <br /> lịch tham quan trường, vui lòng để lại lời nhắn, {" "}
              <br /> chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <div className="contact-info">
                <div className="icon"><img src={images("microphone.svg")} alt="icon-image" /></div>
                <div className="content">
                  <h3>Địa chỉ email:</h3>
                  <p>
                    <a href="tel:0396053054" className="text-white d-block">0396.053.054</a>
                    <a href="mailto:mnhongphuc.info@gmail.com" className="text-white">mnhongphuc.info@gmail.com</a>
                  </p>
                </div>
              </div>
              <div className="contact-info">
                <div className="icon"><img src={images("location.svg")} alt="icon-image" /></div>
                <div className="content">
                  <h3>Địa chỉ trường:</h3>
                  <p>Lộ Vàm, Chợ Gạo, <br /> Đồng Tháp</p>
                </div>
              </div>
              <div className="contact-info">
                <div className="icon"><img src={images("clock.svg")} alt="icon-image" /></div>
                <div className="content">
                  <h3>Giờ làm việc:</h3>
                  <p>Thứ 2 - Thứ 7: 6:30 - 17:00 <br /> Chủ nhật: Nghỉ</p>
                </div>
              </div>
            </div>

            <div>
              <div className="contact-from">
                <h3 className="text-white mb-3">Gửi Lời Nhắn Cho Chúng Tôi</h3>
                <form className="contFrm" onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <div className="col-sm-6">
                      <input type="text" name="name" placeholder="Họ và tên" className="inptFld" value={form.name} onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                      <input type="email" name="email" placeholder="Địa chỉ email" className="inptFld" value={form.email} onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                      <input type="tel" name="phone" placeholder="Số điện thoại" className="inptFld" value={form.phone} onChange={handleChange} />
                    </div>
                    <div className="col-sm-6">
                      <input type="text" name="sub" placeholder="Chủ đề" className="inptFld" value={form.sub} onChange={handleChange} />
                    </div>
                    <div className="col-sm-12">
                      <textarea className="inptFld mb-0" cols="1" rows="4" name="message" placeholder="Lời nhắn của bạn..." value={form.message} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="contact-button">
                    <button type="submit" className="theme-btn style-2 flex items-center gap-2">Gửi Lời Nhắn <Send /></button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}