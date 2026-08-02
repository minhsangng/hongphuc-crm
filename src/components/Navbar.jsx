import { useState } from "react";
import { Mails, PhoneCall, MapPinSearch, ArrowRight, Menu, X, Timer } from "lucide-react";
import { images } from "../utils/helpers";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <header className="header-section">
        {/* Top bar */}
        <div className="header-top-section">
          <div className="header-shape">
            <img src={images("header1.png")} alt="img" />
          </div>
          <div className="container">
            <div className="header-top-wrapper">
              <div></div>
              <ul className="header-contact-list">
                <li>
                  <Mails />
                  <a href="mailto:mnhongphuc.info@gmail.com">mnhongphuc.info@gmail.com</a>
                </li>
                <li>
                  <PhoneCall />
                  <a href="tel:0396-053-054">0396.053.054</a>
                </li>
                <li>
                  <MapPinSearch />
                  <a href="https://maps.app.goo.gl/xKfybraM1K1Ldof38">Lộ Vàm, Chợ Gạo, Đồng Tháp</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div id="header-sticky" className="header-1">
          <div className="w-[90%] mx-auto">
            <div className="mega-menu-wrapper">
              <div className="header-main">
                <div className="header-left">
                  <a href="/" className="header-logo">
                    <img src={images("black-logo.svg")} alt="img" />
                  </a>
                </div>

                <div className="mean__menu-wrapper hidden lg:flex">
                  <div className="main-menu">
                    <nav id="mobile-menu">
                      <ul>
                        <li>
                          <a href="/">Trang chủ</a>
                        </li>
                        <li>
                          <a href="/about">Giới thiệu</a>
                        </li>
                        <li>
                          <a href="/program">Chương trình học</a>
                        </li>
                        <li>
                          <a href="/news">Tin tức</a>
                        </li>
                        <li>
                          <a href="/contact">Liên hệ</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>

                <div className="header-right flex justify-end items-center">
                  <a href="/contact" className="theme-btn items-center gap-2 hidden lg:flex">Ghi danh trẻ <ArrowRight /></a>
                  <div className="header__hamburger my-auto flex lg:hidden" onClick={() => setMenuOpen(true)}>
                    <div className="sidebar__toggle"><Menu /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile sidebar menu */}
      <div className={`fix-area ${menuOpen ? "active" : ""}`}>
        <div className={`offcanvas__info ${menuOpen ? "info-open" : ""}`}>
          <div className="offcanvas__wrapper">
            <div className="offcanvas__content">
              <div className="offcanvas__top mb-5 flex justify-between items-center">
                <div className="offcanvas__logo">
                  <a href="/">
                    <img src={images("black-logo.svg")} alt="logo-img" />
                  </a>
                </div>
                <div className="offcanvas__close">
                  <button onClick={() => setMenuOpen(false)}><X /></button>
                </div>
              </div>
              <h3 className="offcanvas-title">Xin chào ba mẹ!</h3>
              <p>Trường mầm non chúng tôi luôn đồng hành cùng con yêu trong những năm tháng đầu đời, mang đến môi trường học tập an toàn, vui tươi và bổ ích.</p>
              <div className="social-icon flex items-center">
                <a href="#!">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#!">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#!">
                  <i className="fab fa-youtube" />
                </a>
                <a href="#!">
                  <i className="fab fa-linkedin-in" />
                </a>
              </div>
              <div className="offcanvas__contact">
                <h3>Liên hệ với chúng tôi</h3>
                <ul className="contact-list">
                  <li>
                    <div className="icon">
                      <PhoneCall />
                    </div>
                    <div className="content">
                      <p>Gọi ngay</p>
                      <h4>
                        <a href="tel:0396053054">0396.053.054</a>
                      </h4>
                    </div>
                  </li>
                  <li>
                    <div className="icon"><Mails /></div>
                    <div className="content">
                      <p>Gửi email</p>
                      <h4>
                        <a href="mailto:mnhongphuc.info@gmail.com">mnhongphuc.info@gmail.com </a>
                      </h4>
                    </div>
                  </li>
                  <li>
                    <div className="icon"><MapPinSearch /></div>
                    <div className="content">
                      <p>Địa chỉ</p>
                      <h4>Lộ Vàm, Chợ Gạo, Đồng Tháp</h4>
                    </div>
                  </li>
                </ul>
              </div>
              <a href="/contact" className="theme-btn flex items-center gap-2">Ghi danh trẻ <ArrowRight /></a>
            </div>
          </div>
        </div>
        {menuOpen && (<div className="offcanvas__overlay active" onClick={() => setMenuOpen(false)}/>)}
      </div>

      {/* Cart sidebar */}
      <div className={`side_bar slideInRight ${ cartOpen ? "" : "side_bar_hidden" }`}>
        <div className="side_bar_overlay" onClick={() => setCartOpen(false)} />
        <div className="cart-title mb-50">
          <h4>Giỏ hàng</h4>
        </div>
        <div className="cartmini__widget">
          <div className="cartmini__widget-item">
            <div className="cartmini__thumb">
              <a href="/shop-details">
                <img src={images("shop-cart1.png")} alt="img" />
              </a>
            </div>
            <div className="cartmini__content">
              <h5>
                <a href="/shop-details">Yếm ăn dặm cho bé</a>
              </h5>
              <div className="cartmini__price-wrapper">
                <span className="cartmini__price">1.100.000đ</span>
                <span className="cartmini__quantity">x2</span>
              </div>
            </div>
            <button className="cartmini__del">
              <Timer />
            </button>
          </div>
          <div className="cartmini__widget-item">
            <div className="cartmini__thumb">
              <a href="/shop-details">
                <img src={images("shop-cart2.png")} alt="img" />
              </a>
            </div>
            <div className="cartmini__content">
              <h5>
                <a href="/shop-details">Bộ đồ chơi lắp ráp</a>
              </h5>
              <div className="cartmini__price-wrapper">
                <span className="cartmini__price">1.850.000đ</span>
                <span className="cartmini__quantity">x1</span>
              </div>
            </div>
            <button className="cartmini__del">
              <Timer />
            </button>
          </div>
          <div className="cartmini__checkout">
            <div className="cartmini__checkout-title mb-4">
              <h4>Tạm tính:</h4>
              <span>2.950.000đ</span>
            </div>
            <div className="cartmini__checkout-btn">
              <a href="/shop-cart" className="theme-btn mb-2 w-100">Xem giỏ hàng</a>
              <a href="/checkout" className="theme-btn w-100 style-2">Thanh toán</a>
            </div>
          </div>
        </div>
        <button id="closeButton" className="x-mark-icon" onClick={() => setCartOpen(false)}><X /></button>
      </div>
    </>
  );
}