const sessions = [
  { title: "Early Drop Off", time: "8.00am – 10.00am" },
  { title: "Morning", time: "10.30am – 12.00am" },
  { title: "Lunch", time: "12pm – 1.00pm" },
  { title: "Afternoon", time: "2.00am – 4.00am" },
];

export default function Session() {
  return (
    <section className="session-section fix">
      <div className="w-[90%] mx-auto mb-8">
        <div className="session-wrapper zoom-effect-style">
          <div className="grid grid-cols-2 gap-4 items-center">
            <div className="">
              <div className="session-content">
                <div className="section-title">
                  <span className="sub-title">session Times</span>
                  <h2>
                    Our <span>session Times</span>
                  </h2>
                </div>
                <p>Dolor sit amet, consectetur adipiscing elit. Nibh <br /> ullamcorper felis arcu elementum.</p>
              </div>
              <span className="vertical-dashed" />
            </div>
            <div className="">
              {sessions.map((s) => (
                <div key={s.title} className="session-box">
                  <h3>{s.title}</h3>
                  <p>{s.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
