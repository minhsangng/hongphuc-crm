import { useEffect, useRef, useState } from "react";
import SkyCanvas from "./SkyCanvas";

const OPEN_MS = 3000;

export default function SkyIntro({ ready, onOpen }) {
  const [state, setState] = useState("cover");
  const open = useRef(onOpen);
  open.current = onOpen;

  useEffect(() => {
    if (!ready) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setState("opening");
    open.current?.();
    const t = setTimeout(() => setState("gone"), reduce ? 50 : OPEN_MS);
    return () => clearTimeout(t);
  }, [ready]);

  if (state === "gone") return null;
  return (
    <div className="sky-intro" data-state={state} aria-hidden="true">
      <div className="sky-intro__layer sky-intro__layer--top">
        <SkyCanvas kind="coverTop" seed={7} className="absolute inset-0 w-full h-full" />
      </div>
      <div className="sky-intro__layer sky-intro__layer--bottom">
        <SkyCanvas kind="coverBottom" seed={21} className="absolute inset-0 w-full h-full" />
      </div>
      <div className="sky-intro__mist" />
      <img className="sky-intro__logo" src="/favicon.svg" alt="" />
    </div>
  );
}
