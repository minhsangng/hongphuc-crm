import { useState } from "react";
import { images } from "../utils/helpers";
import { Send } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    sub: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire this up to your backend / email service
    console.log("Contact form submitted:", form);
  };

  return (
    <section className="contact-section section-padding">
      <div className="perasute-shape float-bob-y">
        <img src={images("perasute(2).png")} alt="shape-img" />
      </div>
      <div className="star-shape">
        <img src={images("star(2).png")} alt="shape-img" />
      </div>
      <div className="emoji-shape float-bob-x">
        <img src={images("emoji.png")} alt="shape-img" />
      </div>

      <div className="w-[80%] mx-auto">
        <div className="section-title-area custom-padding-top2">
          <div className="section-title">
            <span className="sub-title">Quick Contact</span>
            <h2 className="text-white">Quick Contact With Us</h2>
          </div>
          <p className="text-white">
            Dolor sit amet, consectetur adipiscing elit. Nibh ullamcorper as{" "}
            <br /> felis arcu elementum viverra lectus nullam. Dolor sit amet,{" "}
            <br /> consectetur adipiscing elit. Nibh ullamcorper.
          </p>
        </div>

        <div className="contact-wrapper">
          <div className="grid grid-cols-2 gap-4">
            <div className="">
              <div className="contact-info">
                <div className="icon">
                  <img src={images("microphone.svg")} alt="icon-image" />
                </div>
                <div className="content">
                  <h3>Contact us:</h3>
                  <p>
                    <a href="tel:+483939993900" className="text-white d-block">
                      +483 9399 939 00
                    </a>
                    <a href="mailto:helloflybed@gmail.com" className="text-white">
                      helloflybed@gmail.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="contact-info">
                <div className="icon">
                  <img src={images("location.svg")} alt="icon-image" />
                </div>
                <div className="content">
                  <h3>Our Location:</h3>
                  <p>
                    2220 Plymouth Rd #302, <br /> Hopkins, New York, USA
                  </p>
                </div>
              </div>
              <div className="contact-info">
                <div className="icon">
                  <img src={images("clock.svg")} alt="icon-image" />
                </div>
                <div className="content">
                  <h3>Working Time:</h3>
                  <p>
                    Mon - Fri: 8:00am - 6.00pm <br /> Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="">
              <div className="contact-from">
                <h3 className="text-white mb-3">Send Your Message</h3>
                <form className="contFrm" onSubmit={handleSubmit}>
                  <div className="flex flex-col">
                    <div className="col-sm-6">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="inptFld"
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="inptFld"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        className="inptFld"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        name="sub"
                        placeholder="Subject"
                        className="inptFld"
                        value={form.sub}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-sm-12">
                      <textarea
                        className="inptFld mb-0"
                        name="message"
                        placeholder="Your Message..."
                        value={form.message}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="contact-button">
                    <button type="submit" className="theme-btn style-2 flex items-center gap-2">
                      Send Your Message
                      <Send />
                    </button>
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
