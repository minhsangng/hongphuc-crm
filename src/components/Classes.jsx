import { images } from "../utils/helpers";

const classes = [
  {
    img: "classes1.jpg",
    date: "Jan 16, 2024",
    location: "6391 Elgin St. Celina, USA",
    title: "Last Day of School end of Year Picnic",
  },
  {
    img: "classes2.png",
    date: "Jan 16, 2024",
    location: "6391 Elgin St. Celina, USA",
    title: "Spring Garden Exploration Week for Children",
  },
  {
    img: "classes3.jpg",
    date: "Jan 16, 2024",
    location: "6391 Elgin St. Celina, USA",
    title: "Color Day Creative Festival With Creative Design",
  },
];

export default function Classes() {
  return (
    <section className="classes-section section-padding fix">
      <div className="perasute-shape float-bob-y">
        <img src={images("perasute.png")} alt="shape-img" />
      </div>
      <div className="crown-shape">
        <img src={images("crown(1).png")} alt="shape-img" />
      </div>
      <div className="star-shape">
        <img src={images("star(1).png")} alt="shape-img" />
      </div>
      <div className="zikzak-shape">
        <img src={images("zikzak.png")} alt="shape-img" />
      </div>
      <div className="border-shape">
        <img src={images("border.png")} alt="shape-img" />
      </div>

      <div className="container">
        <div className="section-title text-center custom-padding-top">
          <span className="sub-title tittle-bg-2">Our Classes</span>
          <h2 className="text-white">
            Nurturing &amp; <span>Young Minds</span> – with <br />
            Love &amp; Learning
          </h2>
        </div>

        <div className="row">
          {classes.map((c) => (
            <div key={c.title} className="col-xl-4 col-lg-6 col-md-6">
              <div className="classes-box-item">
                <div className="classes-image">
                  <img src={images(c.img)} alt="classes-image" />
                  <div className="date-box">
                    <span>
                      <i className="far fa-calendar-alt" /> {c.date}
                    </span>
                  </div>
                </div>
                <div className="classes-content">
                  <div className="location">
                    <span>
                      <i className="fa-solid fa-location-dot" /> {c.location}
                    </span>
                  </div>
                  <h3>
                    <a href="/program-details">{c.title}</a>
                  </h3>
                  <div className="classes-rate">
                    <a href="/program-details" className="theme-btn">
                      Get Ticket
                      <i className="icon-arrow-icon" />
                    </a>
                    <div className="rate">
                      <p>(10 Review)</p>
                      <ul>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <li key={i}>
                            <i className="fas fa-star" />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
