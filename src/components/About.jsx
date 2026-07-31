import { ArrowRight, Check } from "lucide-react";
import { images } from "../utils/helpers";

export default function About() {
  return (
    <section className="about-section section-padding fix">
      <div className="tubelight-shape">
        <img src={images("tubelight.png")} alt="shape-img" />
      </div>
      <div className="sun-shape float-bob-y">
        <img src={images("sun.png")} alt="shape-img" />
      </div>
      <div className="star-shape">
        <img src={images("star.png")} alt="shape-img" />
      </div>
      <div className="love-shape float-bob-x">
        <img src={images("love.png")} alt="shape-img" />
      </div>
      <div className="frame-shape">
        <img src={images("frame(1).png")} alt="shape-img" />
      </div>

      <div className="w-[90%] mx-auto">
        <div className="about-wrapper">
          <div className="flex gap-4 items-center">
            <div className="w-1/2">
              <div className="about-image-box">
                <div className="about-image">
                  <img src={images("about-1.png")} alt="about-image" />
                  <div className="shape-bg">
                    <img src={images("about-bg-1.png")} alt="shape-image" />
                  </div>
                </div>
                <div className="counter-image float-bob-x">
                  <img src={images("ab-counter.png")} alt="shape-img" />
                  <div className="counter-box">
                    <div className="count">
                      <h2 className="font-bold text-white" style={{fontSize: "3rem"}}>38</h2>
                      <span className="plus">+</span>
                    </div>
                    <p>Experience</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-1/2">
              <div className="about-content">
                <div className="section-title text-left">
                  <span className="sub-title text-left">About Us</span>
                  <h2>Safe, Fun &amp; <span>Educational</span> – Just What Your Child Needs</h2>
                </div>
                <div className="content-bottom mt-4 md:mt-0">
                  <p>
                    Dolor sit amet, consectetur adipiscing elit. Nibh
                    ullamcorper felis arcu elementum. Viverra lectus nullam
                    sagittis nunc imperdiet leo felis. Ultrices mauris vitae
                    cum bibendum Dolor sit amet, consectetur adipiscing elit.
                    Dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="about-list">
                    <ul>
                      <li className="mb-3">
                        <Check /> Learning &amp; Fun
                      </li>
                      <li>
                        <Check /> Children Safety
                      </li>
                    </ul>
                    <ul>
                      <li className="mb-3">
                        <Check /> Healthy Meals
                      </li>
                      <li>
                        <Check /> Cute Environment
                      </li>
                    </ul>
                  </div>
                  <div className="about-button">
                    <a href="/about" className="theme-btn w-fit flex items-center gap-2">
                      Online Admission <ArrowRight />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
