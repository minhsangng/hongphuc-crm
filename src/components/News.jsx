import { images } from "../utils/helpers";

const news = [
  {
    img: "news1.jpg",
    category: "Learning",
    title: "10 Fun Learning Activities for Preschoolers at Home",
    excerpt:
      "Dolor sit amet, consectetur adipiscing elit. Nibh ullamcorper as felis arcu elementum",
    author: "John Smith",
    date: "12 June, 2026",
  },
  {
    img: "news2.jpg",
    category: "Education",
    title: "How to Prepare Your Child for Their First Day",
    excerpt:
      "Dolor sit amet, consectetur adipiscing elit. Nibh ullamcorper as felis arcu elementum",
    author: "John Smith",
    date: "12 June, 2026",
  },
  {
    img: "news3.jpg",
    category: "Children",
    title: "Creative Arts & Crafts Ideas for Young Kids",
    excerpt:
      "Dolor sit amet, consectetur adipiscing elit. Nibh ullamcorper as felis arcu elementum",
    author: "John Smith",
    date: "12 June, 2026",
  },
];

export default function News() {
  return (
    <section className="news-section section-padding fix">
      <div className="hut-shape float-bob-x">
        <img src="/assets/img/hute.png" alt="shape-img" />
      </div>
      <div className="sky-shape float-bob-y">
        <img src="/assets/img/sky.png" alt="shape-img" />
      </div>

      <div className="container">
        <div className="section-title text-center">
          <span className="sub-title">Our Blog &amp; News</span>
          <h2>
            Read Our <span>Latest</span> News
          </h2>
        </div>

        <div className="row">
          {news.map((n) => (
            <div key={n.title} className="col-xl-4 col-lg-6 col-md-6">
              <div className="news-card-items">
                <div className="news-image">
                  <img src={images(n.img)} alt="news-image" />
                </div>
                <div className="news-content">
                  <a href="/news-details">
                    <span className="catagory">{n.category}</span>
                  </a>
                  <h3>
                    <a href="/news-details" className="underline">
                      {n.title}
                    </a>
                  </h3>
                  <p>{n.excerpt}</p>
                  <ul className="author-items">
                    <li>
                      <i className="far fa-user" /> {n.author}
                    </li>
                    <li className="calendar">
                      <i className="far fa-calendar-alt" /> {n.date}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
