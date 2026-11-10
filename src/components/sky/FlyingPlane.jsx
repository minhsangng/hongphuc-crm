import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { createPlane, disposePlane } from "./createPlane";

const INTRO_MS = 3800;
const INTRO_DELAY = 350;
const FOV = 22;

const FLIGHT_PLAN = [
  { sel: "#top", x: 0.7, y: 0.65, s: 1, mx: 0.66, my: 0.78 },
  { sel: "#news", x: 0.86, y: 0.22, s: 0.38 },
  { sel: "#about", x: 0.84, y: 0.84, s: 0.42, mx: 0.8, my: 0.9 },
  { sel: "#gallery", x: 0.16, y: 0.22, s: 0.4 },
  { sel: "#band-1", x: 0.5, y: 0.5, s: 0.78 },
  { sel: "#class", x: 0.88, y: 0.32, s: 0.4 },
  { sel: "#days", x: 0.84, y: 0.22, s: 0.36 },
  { sel: "#band-2", x: 0.3, y: 0.5, s: 0.78 },
  { sel: "#facility", x: 0.5, y: 0.08, s: 0.4 },
  { sel: "#guide", x: 0.1, y: 0.3, s: 0.5 },
  { sel: "#contact", x: 0.5, y: 0.26, s: 0.7 },
];


const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);
const damp = (cur, target, k, dt) => cur + (target - cur) * (1 - Math.exp(-k * dt));
const wrap = (a) => Math.atan2(Math.sin(a), Math.cos(a));
const dampAngle = (cur, target, k, dt) => cur + wrap(target - cur) * (1 - Math.exp(-k * dt));

export default function FlyingPlane({ play, hidden, onIntroDone }) {
  const host = useRef(null);
  const ctl = useRef({ start: null, onDone: null });
  ctl.current.onDone = onIntroDone;
  ctl.current.hidden = hidden;

  useEffect(() => {
    if (play && ctl.current.start == null) ctl.current.start = performance.now() + INTRO_DELAY;
  }, [play]);

  useEffect(() => {
    const el = host.current;
    const c = ctl.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      c.onDone?.();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;

    scene.add(new THREE.HemisphereLight("#bcd6ff", "#f7c9b6", 1.0));
    const sun = new THREE.DirectionalLight("#fff0d4", 2.4);
    sun.position.set(-500, 800, 900);
    const rim = new THREE.DirectionalLight("#9cc2ff", 1.1);
    rim.position.set(700, 200, -700);
    scene.add(sun, rim);

    const camera = new THREE.PerspectiveCamera(FOV, 1, 10, 30000);
    const { root, prop, blur, scarf, banner } = createPlane();
    const rig = new THREE.Group();
    rig.add(root);
    rig.visible = false;
    scene.add(rig);

    let vw = 1, vh = 1, unit = 40, camZ = 1000;
    let pts = [];

    function resize() {
      vw = window.innerWidth;
      vh = window.innerHeight;
      renderer.setSize(vw, vh);
      camZ = vh / 2 / Math.tan(THREE.MathUtils.degToRad(FOV / 2));
      camera.aspect = vw / vh;
      camera.position.set(0, 0, camZ);
      camera.updateProjectionMatrix();
      unit = (vw < 768 ? Math.min(vw * 0.5, 230) : Math.min(vw * 0.3, 460)) / 10;
      computeKeys();
    }

    function computeKeys() {
      const isM = vw < 768;
      const sy = window.scrollY;
      const arr = [];
      FLIGHT_PLAN.forEach((a, i) => {
        const n = document.querySelector(a.sel);
        if (!n) return;
        const r = n.getBoundingClientRect();
        arr.push({
          key: i === 0 ? 0 : r.top + sy + r.height * (a.at ?? 0.5) - vh / 2,
          x: isM && a.mx != null ? a.mx : a.x,
          y: isM && a.my != null ? a.my : a.y,
          s: a.s,
        });
      });
      for (let i = 1; i < arr.length; i++) arr[i].key = Math.max(arr[i].key, arr[i - 1].key + 40);
      pts = arr;
    }

    function flightAt(sy) {
      const n = pts.length;
      if (!n) return { x: 0.7, y: 0.6, s: 1 };
      if (sy <= pts[0].key) return pts[0];
      if (sy >= pts[n - 1].key) return pts[n - 1];
      let i = 0;
      while (i < n - 2 && sy >= pts[i + 1].key) i++;
      const a = pts[i], b = pts[i + 1];
      const t = (sy - a.key) / (b.key - a.key);
      const e = smooth(t);
      const bump = Math.sin(Math.PI * t);
      return {
        x: lerp(a.x, b.x, e) + bump * 0.03,
        y: lerp(a.y, b.y, e) + bump * (i % 2 ? -0.07 : 0.07),
        s: lerp(a.s, b.s, e),
      };
    }

    function buildIntro() {
      const h = pts[0] || { x: 0.7, y: 0.6 };
      const ex = h.x * vw - vw / 2;
      const ey = vh / 2 - h.y * vh;
      return new THREE.CatmullRomCurve3(
        [
          new THREE.Vector3(ex * 0.1 - vw * 0.02, vh * 0.05, -9500),
          new THREE.Vector3(-vw * 0.34, 0, -5200),
          new THREE.Vector3(-vw * 0.3, -vh * 0.12, -2300),
          new THREE.Vector3(ex - vw * 0.34, ey + vh * 0.1, -700),
          new THREE.Vector3(ex, ey, 0),
        ],
        false,
        "catmullrom",
        0.5
      );
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("load", computeKeys);
    const ro = new ResizeObserver(computeKeys);
    ro.observe(document.body);

    const X = new THREE.Vector3(1, 0, 0);
    const P = new THREE.Vector3(), T = new THREE.Vector3(), T2 = new THREE.Vector3();
    const qTan = new THREE.Quaternion(), qRoll = new THREE.Quaternion();
    const qIdle = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -0.35, 0.06, "YZX"));

    const st = { sx: 0, sy: 0, s: 1, vx: 0, vy: 0, dir: 1, yaw: -0.35, pitch: 0.06, roll: 0, spin: 30, bob: 0 };
    let curve = null, introDone = false, last = performance.now(), t = 0, n = 0, raf = 0;

    const finishIntro = () => {
      introDone = true;
      const f = flightAt(window.scrollY);
      st.sx = f.x * vw;
      st.sy = f.y * vh;
      st.s = f.s;
      st.yaw = -0.35;
      st.pitch = 0.06;
      c.onDone?.();
    };

    function frame(now) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;
      if (++n % 30 === 0) computeKeys();

      if (c.start == null) return;
      if (c.hidden) return;
      const k = (now - c.start) / INTRO_MS;
      if (k < 0) return;

      if (!introDone && (reduce || k >= 1)) finishIntro();

      if (!introDone) {
        rig.visible = true;
        curve ||= buildIntro();
        const e = 1 - Math.pow(1 - clamp(k, 0, 1), 2.3);
        curve.getPoint(e, P);
        curve.getTangent(e, T);
        curve.getTangent(Math.min(e + 0.02, 1), T2);
        const da = wrap(Math.atan2(T2.z, T2.x) - Math.atan2(T.z, T.x));
        const bank = clamp(da * 14, -0.8, 0.8) * (1 - clamp(k, 0, 1));
        qTan.setFromUnitVectors(X, T);
        qRoll.setFromAxisAngle(X, bank);
        rig.quaternion.copy(qTan).multiply(qRoll).slerp(qIdle, smooth(clamp((k - 0.72) / 0.28, 0, 1)));
        rig.position.copy(P);
        rig.scale.setScalar(unit * (pts[0]?.s ?? 1));
        prop.rotation.x += 55 * dt;
        blur.material.opacity = 0.5;
        scarf.rotation.z = Math.sin(t * 16) * 0.12 + 0.25;
        banner.update(t, 1.2, 0);
      } else {
        rig.visible = true;
        const f = flightAt(window.scrollY);
        const px = st.sx, py = st.sy;
        st.sx = reduce ? f.x * vw : damp(st.sx, f.x * vw, 5, dt);
        st.sy = reduce ? f.y * vh : damp(st.sy, f.y * vh, 5, dt);
        st.s = damp(st.s, f.s, 5, dt);
        st.vx = damp(st.vx, (st.sx - px) / Math.max(dt, 1e-3), 10, dt);
        st.vy = damp(st.vy, (st.sy - py) / Math.max(dt, 1e-3), 10, dt);

        const speed = Math.hypot(st.vx, st.vy);
        const moving = clamp(speed / 500, 0, 1);
        if (Math.abs(st.vx) > 60) st.dir = Math.sign(st.vx);

        const face = 0.35 * (1 - 0.6 * moving);
        st.yaw = dampAngle(st.yaw, st.dir > 0 ? -face : Math.PI + face, 4, dt);
        const pitchT = clamp(Math.atan2(-st.vy, Math.max(Math.abs(st.vx), 120)), -0.5, 0.5) + 0.06;
        st.pitch = damp(st.pitch, pitchT, 5, dt);
        st.roll = damp(st.roll, reduce ? 0 : Math.sin(t * 0.9) * 0.05 - pitchT * 0.3, 4, dt);
        rig.rotation.set(st.roll, st.yaw, st.pitch, "YZX");

        st.bob = damp(st.bob, reduce ? 0 : 1, 1.5, dt);
        const bob = Math.sin(t * 1.4) * 6 * st.bob;
        rig.position.set(st.sx - vw / 2, vh / 2 - st.sy - bob, 0);
        rig.scale.setScalar(unit * st.s);

        st.spin = damp(st.spin, lerp(9, 55, moving), 3, dt);
        prop.rotation.x += st.spin * dt;
        blur.material.opacity = clamp((st.spin - 14) / 40, 0, 1) * 0.5;
        scarf.rotation.z = Math.sin(t * (6 + moving * 10)) * 0.1 + 0.2 + moving * 0.15;
        banner.update(t, 0.7 + moving * 0.8, st.pitch);
      }
      renderer.render(scene, camera);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("load", computeKeys);
      ro.disconnect();
      disposePlane(root);
      envRT.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} aria-hidden="true" className="fixed inset-0 pointer-events-none" style={{ zIndex: 9000, opacity: hidden ? 0 : 1, transition: "opacity .3s" }} />;
}
