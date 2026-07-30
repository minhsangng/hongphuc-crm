import { useState } from "react";
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
              <p>
                Kindergarten is an early childhood educational environment{" "}
                <a href="/contact">Learn More</a>
              </p>
              <ul className="header-contact-list">
                <li>
                  <i className="fal fa-envelope" />
                  <a href="mailto:kidza@gmial.com">kidza@gmial.com</a>
                </li>
                <li>
                  <i className="far fa-phone-alt" />
                  <a href="tel:+00479394888">+00 (47) 939 4888</a>
                </li>
                <li>
                  <i className="fa-regular fa-location-dot" />
                  Graaf Floriss 22A CH NY
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <div id="header-sticky" className="header-1">
          <div className="container">
            <div className="mega-menu-wrapper">
              <div className="header-main">
                <div className="header-left">
                  <a href="/" className="header-logo">
                    <img src={images("black-logo.svg")} alt="img" />
                  </a>
                </div>

                <div className="mean__menu-wrapper">
                  <div className="main-menu">
                    <nav id="mobile-menu">
                      <ul>
                        <li>
                          <a href="/">Home</a>
                        </li>
                        <li>
                          <a href="/about">About Us</a>
                        </li>
                        <li>
                          <a href="/program">Our Programs</a>
                        </li>
                        <li>
                          <a href="/news">Blog</a>
                        </li>
                        <li>
                          <a href="/contact">Contact</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>

                <div className="header-right d-flex justify-content-end align-items-center">
                  <div className="header-right-icon">
                    <a href="#search" className="main-header__search search-toggler">
                      <i className="far fa-search" />
                    </a>
                    <button
                      id="openButton"
                      className="cart-icon"
                      onClick={() => setCartOpen(true)}
                    >
                      <i className="fas fa-shopping-cart" />
                    </button>
                  </div>
                  <a href="/contact" className="theme-btn">
                    Start Learning <i className="icon-arrow-icon" />
                  </a>
                  <div
                    className="header__hamburger my-auto d-xl-none"
                    onClick={() => setMenuOpen(true)}
                  >
                    <div className="sidebar__toggle">
                      <i className="fal fa-bars" />
                    </div>
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
              <div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
                <div className="offcanvas__logo">
                  <a href="/">
                    <img src={images("black-logo.svg")} alt="logo-img" />
                  </a>
                </div>
                <div className="offcanvas__close">
                  <button onClick={() => setMenuOpen(false)}>
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
              <h3 className="offcanvas-title">Hello There!</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                natus quasi sunt eum ducimus.
              </p>
              <div className="social-icon d-flex align-items-center">
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
                <h3>Contact Us</h3>
                <ul className="contact-list">
                  <li>
                    <div className="icon">
                      <i className="far fa-phone-alt" />
                    </div>
                    <div className="content">
                      <p>Call Us</p>
                      <h4>
                        <a href="tel:+4903983493999">+49 (03) 9834 939 99</a>
                      </h4>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <i className="fal fa-envelope" />
                    </div>
                    <div className="content">
                      <p>Send Email</p>
                      <h4>
                        <a href="mailto:yordomain@gmial.com">
                          yordomain@gmial.com
                        </a>
                      </h4>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <i className="fal fa-map-marker-alt" />
                    </div>
                    <div className="content">
                      <p>Location</p>
                      <h4>Chicago 53755 NY, USA</h4>
                    </div>
                  </li>
                </ul>
              </div>
              <a href="/contact" className="theme-btn">
                Start Learning <i className="icon-arrow-icon" />
              </a>
            </div>
          </div>
        </div>
        {menuOpen && (
          <div
            className="offcanvas__overlay active"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </div>

      {/* Cart sidebar */}
      <div
        className={`side_bar slideInRight ${
          cartOpen ? "" : "side_bar_hidden"
        }`}
      >
        <div className="side_bar_overlay" onClick={() => setCartOpen(false)} />
        <div className="cart-title mb-50">
          <h4>Shopping cart</h4>
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
                <a href="/shop-details">Baby Bib Pink</a>
              </h5>
              <div className="cartmini__price-wrapper">
                <span className="cartmini__price">$46.00</span>
                <span className="cartmini__quantity">x2</span>
              </div>
            </div>
            <button className="cartmini__del">
              <i className="fal fa-times" />
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
                <a href="/shop-details">Plastic Roller Mop</a>
              </h5>
              <div className="cartmini__price-wrapper">
                <span className="cartmini__price">$78.00</span>
                <span className="cartmini__quantity">x1</span>
              </div>
            </div>
            <button className="cartmini__del">
              <i className="fal fa-times" />
            </button>
          </div>
          <div className="cartmini__checkout">
            <div className="cartmini__checkout-title mb-4">
              <h4>Subtotal:</h4>
              <span>$113.00</span>
            </div>
            <div className="cartmini__checkout-btn">
              <a href="/shop-cart" className="theme-btn mb-2 w-100">
                view cart
              </a>
              <a href="/checkout" className="theme-btn w-100 style-2">
                checkout
              </a>
            </div>
          </div>
        </div>
        <button id="closeButton" className="x-mark-icon" onClick={() => setCartOpen(false)}>
          <i className="fas fa-times" />
        </button>
      </div>
    </>
  );
}
