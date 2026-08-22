import { images } from "../utils/helpers";

const team = [
  { img: "team1.png", name: "Cô Nguyễn Thị Lan" },
  { img: "team2.png", name: "Cô Trần Thị Mai" },
  { img: "team3.png", name: "Cô Phạm Thị Hương" },
];

export default function Team() {
  return (
    <section className="team-section section-padding pt-0 fix">
      <div className="w-[90%] mx-auto">
        <div className="flower-shape"><img src={images("flower.png")} alt="shape-img" /></div>
        <div className="section-title-area text-center">
          <div className="section-title">
            <span className="sub-title">Đội Ngũ Giáo Viên</span>
            <h2>Gặp Gỡ <span>Đội Ngũ Giáo Viên</span></h2>
          </div>
          <p>Đội ngũ giáo viên tận tâm, giàu kinh nghiệm, <br /> luôn đồng hành cùng con trong từng bước phát triển.</p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          {team.map((t) => (
            <div key={t.name} className="">
              <div className="team-card-item">
                <div className="team-image"><img src={images(t.img)} alt="team-image" /></div>
                <div className="team-content">
                  <h3><a href="/team-details">{t.name}</a></h3>
                  <p>Giáo Viên Mầm Non</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}