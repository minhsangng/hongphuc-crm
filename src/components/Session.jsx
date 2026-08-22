const sessions = [
  { title: "Buổi Sáng", time: "6:30 – 10:00" },
  { title: "Ăn Trưa", time: "10:00 – 11:00" },  
  { title: "Ngủ Trưa", time: "11:15 – 13:30" },
  { title: "Vệ Sinh", time: "13:45 – 14:15" },
  { title: "Hoạt Động", time: "14:15 – 16:00" },
  { title: "Đón Trẻ", time: "16:00 – 16:30" },
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
                  <p>Lịch sinh hoạt hằng ngày được sắp xếp khoa học, <br /> giúp bé phát triển toàn diện và đúng giờ giấc.</p>
                </div>
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