import { useEffect, useRef, useState } from "react";
import { images } from "../utils/helpers";

const stats = [
  { icon: "icon1.svg", value: 38, label: "Experts Instructors" },
  { icon: "icon2.svg", value: 6539, label: "Class Completed" },
  { icon: "icon3.svg", value: 34, label: "Year of Experience" },
  { icon: "icon4.svg", value: 6632, label: "Students Enroll" },
];

function useCountUp(target, start) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let frame;
    const duration = 1500;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target]);

  return value;
}

function CounterItem({ icon, value, label, border }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(value, inView);

  return (
    <div ref={ref}>
      <div className={`counter-items flex flex-col items-center ${border ? "border-none" : ""}`}>
        <div className="icon">
          <img src={images(icon)} alt="icon-image" />
        </div>
        <div className="counter-box">
          <div className="count">
            <h3 className="text-white font-bold" style={{fontSize: "1.75rem"}}>{count.toLocaleString()}</h3>
            <span className="plus">+</span>
          </div>
          <p>{label}</p>
        </div>
      </div>
    </div>
  );
}

export default function Counter() {
  return (
    <section className="counter-section section-padding">
      <div className="w-[90%] mx-auto">
        <div className="grid grid-cols-4 gap-2">
          {stats.map((s, i) => (
            <CounterItem key={s.label} {...s} border={i === stats.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
