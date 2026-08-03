const sessions = [
  { title: "Giờ Đón Sớm", time: "8:00 – 10:00" },
  { title: "Buổi Sáng", time: "10:30 – 12:00" },
  { title: "Giờ Ăn Trưa", time: "12:00 – 13:00" },
  { title: "Buổi Chiều", time: "14:00 – 16:00" },
];

export default function Session() {
  return (
    <section className="session-section fix">
      <div className="w-[90%] mx-auto mb-8">
        <div className="session-wrapper zoom-effect-style">
          <div className="grid grid-cols-2 gap-4 items-center">
            <div>
              <div className="session-content">
                <div className="section-title">
                  <span className="sub-title">Lịch Trình Trong Ngày</span>
                  <h2>Lịch Trình <span>Trong Ngày</span></h2>
                </div>
                <p>Lịch sinh hoạt hằng ngày được sắp xếp khoa học, <br /> giúp bé phát triển toàn diện và đúng giờ giấc.</p>
              </div>
              <span className="vertical-dashed" />
            </div>
            <div>
              {sessions.map((s) => (<div key={s.title} className="session-box"><h3>{s.title}</h3><p>{s.time}</p></div>))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}