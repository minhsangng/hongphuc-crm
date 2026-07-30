import { images } from "../utils/helpers";

export default function ChooseUs() {
  return (
    <section className="choose-us-section section-padding fix">
      <div className="perasute-shape float-bob-y">
        <img src={images("perasute(1).png")} alt="shape-img" />
      </div>
      <div className="butterfly-shape float-bob-y">
        <img src={images("butarfly.png")} alt="shape-img" />
      </div>
      <div className="zikzak-shape float-bob-x">
        <img src={images("zikzak(1).png")} alt="shape-img" />
      </div>
      <div className="coun-shape float-bob-y">
        <img src={images("coun-shape.png")} alt="shape-img" />
      </div>

      <div className="container">
        <div className="choose-us-wrapper">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="choose-img-box">
                <img
                  className="style-2" src={images("choose2.jpg")} alt="choose-image"
                />
                <img src={images("choose1.png")} alt="choose-image" />
                <div className="img-3">
                  <img src={images("choose3.png")} alt="choose-image" />
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="choose-us-content">
                <div className="section-title text-left">
                  <span className="sub-title">Why Choose Us</span>
                  <h2>
                    Where Every <span>Little Step</span> <br />
                    Leads to Big Discoveries
                  </h2>
                </div>
                <p className="mt-3 mt-md-0">
                  Dolor sit amet, consectetur adipiscing elit. Nibh
                  ullamcorper felis arcu elementum. Viverra lectus nullam
                  sagittis nunc imperdiet.
                </p>
                <div className="icon-items">
                  <div className="icon">
                    <img src={images("bricks-1.svg")} alt="svg-image" />
                  </div>
                  <div className="content">
                    <h3 className="mb-2">Early Learning</h3>
                    <p>
                      Kindergarten is an early childhood educational
                      environment where most young children engage in
                      foundational.
                    </p>
                  </div>
                </div>
                <div className="progress-wrap">
                  <div className="pro-items">
                    <div className="pro-head">
                      <h4 className="title">Creativity</h4>
                      <span className="point">90%</span>
                    </div>
                    <div className="ber-box">
                      <div className="progress">
                        <div
                          className="progress-value"
                          style={{ width: "90%" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pro-items">
                    <div className="pro-head">
                      <h4 className="title">Experiences</h4>
                      <span className="point">70%</span>
                    </div>
                    <div className="ber-box style-2">
                      <div className="progress progress-2">
                        <div
                          className="progress-value style-two"
                          style={{ width: "70%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="choose-button">
                  <a href="/contact" className="theme-btn">
                    Start Your Learning <i className="icon-arrow-icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
