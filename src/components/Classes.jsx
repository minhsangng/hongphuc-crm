import { ArrowRight, Calendar, MapPin, Star } from "lucide-react";
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

      <div className="w-[90%] mx-auto">
        <div className="section-title text-center custom-padding-top">
          <span className="sub-title tittle-bg-2">Our Classes</span>
          <h2 className="text-white">
            Nurturing &amp; <span>Young Minds</span> – with <br />
            Love &amp; Learning
          </h2>
        </div>

        <div className="grid grid-cols-3 grid-rows-1 gap-8">
          {classes.map((c) => (
            <div key={c.title} className="group">
              <div className="classes-box-item">
                <div className="classes-image">
                  <img src={images(c.img)} alt="classes-image" />
                  <div className="date-box">
                    <span>
                      <Calendar /> {c.date}
                    </span>
                  </div>
                </div>
                <div className="classes-content">
                  <div className="location">
                    <span className="flex items-center gap-2"><MapPin /> {c.location}</span>
                  </div>
                  <h3 className="min-h-20">
                    <a href="/program-details">{c.title}</a>
                  </h3>
                  <div className="classes-rate">
                    <a href="/program-details" className="theme-btn group">
                      Get Ticket <ArrowRight className="opacity-0 group-hover:opacity-100 transition ease-linear absolute top-1/2 right-2 transform -translate-y-1/2" />
                    </a>
                    <div className="rate">
                      <p className="!text-xs">(10 Review)</p>
                      <ul>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <li key={i}>
                            <Star color="yellow" className="group-hover:stroke-white"/>
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
