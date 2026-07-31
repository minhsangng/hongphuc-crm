import { Mail, MapPin } from "lucide-react";
import { images } from "../utils/helpers";

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="bottom-shape">
        <img src={images("bg-bottom.png")} alt="shape-img" />
      </div>
      <div className="busket-shape float-bob-x">
        <img src={images("busket.png")} alt="shape-img" />
      </div>
      <div className="ball-shape float-bob-y">
        <img src={images("ball.png")} alt="shape-img" />
      </div>

      <div className="w-[90%] mx-auto">
        <div className="footer-widgets-wrapper">
          <div className="grid grid-cols-4 grid-rows-1 gap-2">
            <div className="">
              <div className="single-footer-widget">
                <div className="widget-head">
                  <a href="/">
                    <img src={images("Logo.svg")} alt="logo-image" />
                  </a>
                </div>
                <div className="widget-content">
                  <p>
                    Kidza is an early childhood education school where all
                    children, typically aged 4 to 6, begin their learning
                    journey.
                  </p>
                  <ul className="social-icon">
                    <li>
                      <a href="#!">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href="#!">
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#!">
                        <i className="fab fa-youtube" />
                      </a>
                    </li>
                    <li>
                      <a href="#!">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="">
              <div className="single-footer-widget">
                <div className="widget-head text-center font-bold underline underline-offset-4">
                  <h3>Quick Links</h3>
                </div>
                <div className="widget-content text-center mt-4">
                  <ul className="list-area">
                    <li>
                      <a href="/program">Courses</a>
                    </li>
                    <li>
                      <a href="/program">Program</a>
                    </li>
                    <li>
                      <a href="/about">About Us</a>
                    </li>
                    <li>
                      <a href="/contact">Contact Us</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="">
              <div className="single-footer-widget">
                <div className="widget-head text-center font-bold underline underline-offset-4">
                  <h3>Company info</h3>
                </div>
                <div className="widget-content text-center mt-4">
                  <ul className="list-area">
                    <li>
                      <a href="/contact">Our Support</a>
                    </li>
                    <li>
                      <a href="/contact">System Status</a>
                    </li>
                    <li>
                      <a href="/contact">Knowledge base</a>
                    </li>
                    <li>
                      <a href="/news">Blog &amp; News</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="">
              <div className="single-footer-widget">
                <div className="widget-content">
                  <div className="contact-info">
                    <div className="icon">
                      <Mail />
                    </div>
                    <div className="content">
                      <h3>Email</h3>
                      <p className="text-base">
                        <a href="mailto:mnhongphuc.info@gmail.com">mnhongphuc.info@gmail.com</a>
                      </p>
                    </div>
                  </div>
                  <div className="contact-info">
                    <div className="icon">
                      <MapPin />
                    </div>
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
            © <a href="/">Mầm non Hồng Phúc</a> 2026. All Rights Reserved, <a href="https://github.com/minhsangng">minhsangng</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
