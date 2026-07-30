import { images } from "../utils/helpers";

const team = [
  { img: "team1.png", name: "John Smith" },
  { img: "team2.png", name: "David William" },
  { img: "team3.png", name: "Sarah William" },
];

export default function Team() {
  return (
    <section className="team-section section-padding pt-0 fix">
      <div className="w-[80%] mx-auto">
        <div className="flower-shape">
          <img src={images("flower.png")} alt="shape-img" />
        </div>
        <div className="section-title-area text-center">
          <div className="section-title">
            <span className="sub-title">Our Teacher</span>
            <h2>
              Meet With <span>Our Teacher</span>
            </h2>
          </div>
          <p>
            Dolor sit amet, consectetur adipiscing elit. Nibh ullamcorper as{" "}
            <br /> felis arcu elementum viverra lectus nullam.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          {team.map((t) => (
            <div key={t.name} className="">
              <div className="team-card-item">
                <div className="team-image">
                  <img src={images(t.img)} alt="team-image" />
                </div>
                <div className="team-content">
                  <h3>
                    <a href="/team-details">{t.name}</a>
                  </h3>
                  <p>Online Teacher</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
