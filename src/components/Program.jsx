import { images } from "../utils/helpers";

const programs = [
  {
    top: "top-1.png",
    bottom: "bottom-1.png",
    bg: "",
    icon: "book.png",
    style: "style-2",
    title: "Toddler",
    age: "(1,5 – 3 years)",
  },
  {
    top: "top-2.png",
    bottom: "bottom-2.png",
    bg: "bg-2",
    icon: "phone.png",
    style: "",
    title: "Preschool",
    age: "(2 – 3 years)",
  },
  {
    top: "top-3.png",
    bottom: "bottom-3.png",
    bg: "bg-3",
    icon: "boy.png",
    style: "style-2",
    title: "Kindergarten",
    age: "(3 – 4 years)",
  },
  {
    top: "top-4.png",
    bottom: "bottom-4.png",
    bg: "bg-4",
    icon: "camical-book.png",
    style: "",
    title: "Pre-K Program",
    age: "(4 – 5 years)",
  },
];

export default function Program() {
  return (
    <section className="program-section section-padding pt-0 fix">
      <div className="container">
        <div className="row g-4">
          {programs.map((p) => (
            <div
              key={p.title}
              className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
            >
              <div className={`program-box-item ${p.style}`}>
                <div className="top-bar">
                  <img src={images(p.top)} alt="icon-image" />
                </div>
                <div className="bottom-bar">
                  <img src={images(p.bottom)} alt="icon-image" />
                </div>
                <div className={`program-bg ${p.bg}`} />
                <div className="program-icon">
                  <img src={images(p.icon)} alt="icon-image" />
                </div>
                <div className="program-content">
                  <h3>{p.title}</h3>
                  <span>{p.age}</span>
                  <p>
                    Dolor sit amet, adipiscing elit. Nibh ullamcorper felis
                    arcu elementum.
                  </p>
                  <a href="/program-details" className="link-btn">
                    Learn More <i className="icon-arrow-icon" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
