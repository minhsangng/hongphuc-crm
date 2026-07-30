import { images } from "../utils/helpers";

export default function Hero() {
  return (
    <section className="hero-section hero-1 hero-bg fix">
      <div className="perasute-shape float-bob-y">
        <img src={images("perashute.png")} alt="shape-img" />
      </div>
      <div className="car-shape float-bob-x">
        <img src={images("car.png")} alt="shape-img" />
      </div>
      <div className="tree-shape">
        <img src={images("tree.png")} alt="shape-img" />
      </div>
      <div className="crown-shape">
        <img src={images("crown.png")} alt="shape-img" />
      </div>
      <div className="frame-shape float-bob-y">
        <img src={images("frame.png")} alt="shape-img" />
      </div>
      <div className="line-shape">
        <img src={images("hero-line.png")} alt="" />
      </div>

      <div className="container hero-container">
        <div className="row g-4 align-items-center">
          <div className="col-lg-5">
            <div className="hero-content">
              <h1>A Happy Place to Grow, Play And Learn</h1>
              <p>
                Kindergarten is an early childhood educational environment
                where <br /> most young for your children life.
              </p>
              <div className="hero-button">
                <a href="/contact" className="theme-btn">
                  Online Admission <i className="icon-arrow-icon" />
                </a>
                <div className="wave-area">
                  <div className="promo-video">
                    <div className="waves-block">
                      <div className="waves wave-1" />
                      <div className="waves wave-2" />
                      <div className="waves wave-3" />
                    </div>
                    <a
                      className="video-popup"
                      href="https://www.youtube.com/watch?v=Cn4G2lZ_g2I"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fas fa-play" />
                    </a>
                  </div>
                  <p className="video-text">Paly Video</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="hero-img">
              <img src={images("hero1.png")} alt="hero-img" />
              <div className="text-shape float-bob-y">
                <img src={images("text.png")} alt="shape-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
