import { useEffect, useRef } from "react";
import { paintSky } from "./paintSky";

export default function SkyCanvas({ kind, seed = 1, variant = "day", className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    let timer = 0;
    let lastW = 0;
    const draw = () => {
      const r = c.getBoundingClientRect();
      if (!r.width || !r.height || Math.abs(r.width - lastW) < 8) return;
      lastW = r.width;
      const k = Math.min(window.devicePixelRatio || 1, 1.5, 2400 / r.width);
      c.width = Math.round(r.width * k);
      c.height = Math.round(r.height * k);
      paintSky(c, { kind, seed, variant });
    };
    draw();
    const ro = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(draw, 180);
    });
    ro.observe(c);
    return () => {
      clearTimeout(timer);
      ro.disconnect();
    };
  }, [kind, seed, variant]);

  return <canvas ref={ref} aria-hidden="true" className={`sky-canvas ${className}`} />;
}
