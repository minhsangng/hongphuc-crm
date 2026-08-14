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
                  <a href="mailto:mnhongphuc@gmail.com">mnhongphuc@gmail.com</a>
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
          <div className="container mx-auto">
            <div className="mega-menu-wrapper">
              <div className="header-main">
                <div className="header-left">
                  <a href="/" className="header-logo flex items-center">
                    <img src="/favicon_v2.svg" className="h-20" alt="Logo" />
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
                  <a href="/" className="header-logo flex items-center">
                    <img src="/favicon_v2.svg" className="!w-16" alt="Logo" />
                    <div className="flex flex-col gap-0">
                      <small className="text-gray-400 opacity-75 font-bold" style={{ filter: "drop-shadow(2px 0px 1px #FDCF8D)" }}>Mầm non</small>
                      <strong className="bg-[#FDCF8D]/50 px-2 pt-1 rounded-lg text-lg uppercase text-[#B591DD]" style={{ filter: "drop-shadow(2px 2px 0px #D3DAEB)" }}>Hồng <span className="text-[#FDA3C2]">Phúc</span></strong>
                    </div>
                  </a>
                </div>
                <div className="offcanvas__close flex justify-center items-center">
                  <button onClick={() => setMenuOpen(false)}><X color="white" /></button>
                </div>
              </div>
              <h3 className="offcanvas-title">Xin chào ba mẹ!</h3>
              <p>Trường mầm non chúng tôi luôn đồng hành cùng con yêu trong những năm tháng đầu đời, mang đến môi trường học tập an toàn, vui tươi và bổ ích.</p>
              <div className="social-icon flex items-center">
                <a href="https://facbook.com/hongphuc2025" target="_blank">
                  <img src={images("facebook.svg")} alt="Facbook" />
                </a>
                <a href="https://tiktok.com/@vannguenjkkk" target="_blank">
                  <img src={images("tiktok.svg")} alt="Tiktok" />
                </a>
                <a href="https://zalo.me/0396053054" target="_blank">
                  <img src={images("zalo.svg")} alt="Zalo" />
                </a>
                <a href="tel:0396053054" target="_blank">
                  <img src={images("phone-calling.svg")} alt="Phone" />
                </a>
              </div>
              <div className="offcanvas__contact">
                <h3>Liên hệ với chúng tôi</h3>
                <ul className="contact-list">
                  <li>
                    <div className="icon flex justify-center items-center"><PhoneCall /></div>
                    <div className="content">
                      <p>Gọi ngay</p>
                      <h4>
                        <a href="tel:0396053054">0396.053.054</a>
                      </h4>
                    </div>
                  </li>
                  <li>
                    <div className="icon flex justify-center items-center"><Mails /></div>
                    <div className="content">
                      <p>Gửi email</p>
                      <h4>
                        <a href="mailto:mnhongphuc@gmail.com">mnhongphuc@gmail.com </a>
                      </h4>
                    </div>
                  </li>
                  <li>
                    <div className="icon flex justify-center items-center"><MapPinSearch /></div>
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