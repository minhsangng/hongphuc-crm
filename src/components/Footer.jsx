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

      <div className="container">
        <div className="footer-widgets-wrapper">
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-md-8">
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

            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
              <div className="single-footer-widget">
                <div className="widget-head">
                  <h3>Quick Links</h3>
                </div>
                <div className="widget-content">
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

            <div className="col-xl-2 col-lg-3 col-md-6 col-sm-6">
              <div className="single-footer-widget">
                <div className="widget-head">
                  <h3>Company info</h3>
                </div>
                <div className="widget-content">
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

            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="single-footer-widget">
                <div className="widget-content">
                  <div className="contact-info">
                    <div className="icon">
                      <img src={images("email.svg")} alt="icon-image" />
                    </div>
                    <div className="content">
                      <h3>Email us</h3>
                      <p>
                        <a href="mailto:support@kidza.com">support@kidza.com</a>
                      </p>
                    </div>
                  </div>
                  <div className="contact-info">
                    <div className="icon">
                      <img src={images("location(1).svg")} alt="icon-image" />
                    </div>
                    <div className="content">
                      <h3>Location</h3>
                      <p>
                        Office: 2220 Plymouth R02 Road,
                        <br /> Hopkins, Minnesota(MN), UK
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="footer-bottom">
            © <a href="/">Kidza</a> {new Date().getFullYear()} . All Rights
            Reserved, Modinatheme
          </p>
        </div>
      </div>
    </footer>
  );
}
