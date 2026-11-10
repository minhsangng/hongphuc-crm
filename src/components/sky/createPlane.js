import * as THREE from "three";

const RED = "#d8362b";
const RED_D = "#a9241d";
const CREAM = "#f6ead2";
const GOLD = "#d9a441";
const INK = "#2a2630";

const logo = { img: null };
const redraws = [];

function canvasTex(w, h, draw) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  draw(ctx, w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  redraws.push(() => {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, w, h);
    draw(ctx, w, h);
    t.needsUpdate = true;
  });
  return t;
}

function drawLogo(c, r) {
  const im = logo.img;
  if (!im) {
    c.fillStyle = RED;
    star(c, r * 0.8, r * 0.34);
    c.fill();
    return;
  }
  const iw = im.naturalWidth || 150;
  const ih = im.naturalHeight || 150;
  const k = Math.min((2 * r) / iw, (2 * r) / ih);
  c.save();
  c.beginPath();
  c.arc(0, 0, r, 0, Math.PI * 2);
  c.clip();
  c.fillStyle = CREAM;
  c.fill();
  c.drawImage(im, (-iw * k) / 2, (-ih * k) / 2, iw * k, ih * k);
  c.restore();
}

const std = (color, o = {}) =>
  new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.05, envMapIntensity: 0.75, ...o });

const metal = (color, o = {}) => std(color, { metalness: 0.85, roughness: 0.28, envMapIntensity: 1.3, ...o });

function strut(a, b, r, mat) {
  const va = new THREE.Vector3(...a);
  const vb = new THREE.Vector3(...b);
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, va.distanceTo(vb), 10), mat);
  m.position.copy(va).add(vb).multiplyScalar(0.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), vb.clone().sub(va).normalize());
  return m;
}

function star(c, R, r, n = 5) {
  c.beginPath();
  for (let i = 0; i < n * 2; i++) {
    const rad = i % 2 ? r : R;
    const a = -Math.PI / 2 + (i * Math.PI) / n;
    c[i ? "lineTo" : "moveTo"](Math.cos(a) * rad, Math.sin(a) * rad);
  }
  c.closePath();
}

const fuselageTex = () =>
  canvasTex(512, 64, (c, w, h) => {
    c.fillStyle = RED;
    c.fillRect(0, 0, w, h);
    c.fillStyle = CREAM;
    c.fillRect(w * 0.13, 0, w * 0.24, h);
    c.fillStyle = GOLD;
    c.fillRect(w * 0.125, 0, 4, h);
    c.fillRect(w * 0.37, 0, 4, h);
  });

const roundelTex = () =>
  canvasTex(256, 256, (c) => {
    c.translate(128, 128);
    const ring = (r, col) => {
      c.fillStyle = col;
      c.beginPath();
      c.arc(0, 0, r, 0, Math.PI * 2);
      c.fill();
    };
    ring(126, GOLD);
    ring(116, CREAM);
    ring(94, RED);
    ring(72, CREAM);
    drawLogo(c, 72);
  });

const badgeTex = () =>
  canvasTex(256, 256, (c) => {
    c.translate(128, 128);
    c.fillStyle = CREAM;
    c.beginPath();
    c.arc(0, 0, 124, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = RED_D;
    c.beginPath();
    c.arc(0, 0, 106, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = CREAM;
    c.font = "800 118px 'Trebuchet MS', Arial, sans-serif";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("HP", 0, 8);
  });

const wingTex = () =>
  canvasTex(256, 1024, (c, w, h) => {
    c.fillStyle = CREAM;
    c.fillRect(0, 0, w, h);
    c.fillStyle = RED;
    c.fillRect(0, 0, w, h * 0.09);
    c.fillRect(0, h * 0.91, w, h * 0.09);
    c.fillRect(w * 0.88, 0, w * 0.12, h);
    c.fillStyle = GOLD;
    c.fillRect(0, h * 0.09, w, 5);
    c.fillRect(0, h * 0.91 - 5, w, 5);
    c.fillRect(w * 0.87, 0, 4, h);
    for (const y of [0.24, 0.76]) {
      c.save();
      c.translate(w * 0.46, h * y);
      c.fillStyle = GOLD;
      c.beginPath();
      c.arc(0, 0, 62, 0, 7);
      c.fill();
      c.fillStyle = RED;
      c.beginPath();
      c.arc(0, 0, 55, 0, 7);
      c.fill();
      drawLogo(c, 46);
      c.restore();
    }
  });

const discTex = () =>
  canvasTex(128, 128, (c, w) => {
    const g = c.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
    g.addColorStop(0, "rgba(255,247,225,0)");
    g.addColorStop(0.55, "rgba(255,247,225,0.05)");
    g.addColorStop(0.86, "rgba(255,247,225,0.7)");
    g.addColorStop(1, "rgba(255,247,225,0)");
    c.fillStyle = g;
    c.fillRect(0, 0, w, w);
  });

function wingMesh({ chord, span, thick, mat, uv = true }) {
  const c = chord / 2;
  const s = span / 2;
  const t = Math.min(1, s * 0.22);
  const sh = new THREE.Shape();
  sh.moveTo(c, -(s - t));
  sh.lineTo(c, s - t);
  sh.quadraticCurveTo(c, s, c - t * 0.9, s);
  sh.quadraticCurveTo(-c, s, -c, s - t * 0.9);
  sh.lineTo(-c, -(s - t * 0.9));
  sh.quadraticCurveTo(-c, -s, c - t * 0.9, -s);
  sh.quadraticCurveTo(c, -s, c, -(s - t));
  const geo = new THREE.ExtrudeGeometry(sh, {
    depth: thick,
    bevelEnabled: true,
    bevelThickness: thick * 0.55,
    bevelSize: thick * 0.55,
    bevelSegments: 3,
    curveSegments: 14,
  });
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, -thick / 2, 0);
  if (uv) {
    const p = geo.attributes.position;
    const uvs = new Float32Array(p.count * 2);
    for (let i = 0; i < p.count; i++) {
      uvs[i * 2] = THREE.MathUtils.clamp((p.getX(i) + c) / (2 * c), 0, 1);
      uvs[i * 2 + 1] = THREE.MathUtils.clamp((p.getZ(i) + s) / (2 * s), 0, 1);
    }
    geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  }
  return new THREE.Mesh(geo, mat);
}

function fuselage(mats) {
  const prof = new THREE.SplineCurve(
    [
      [0.04, -5.3],
      [0.16, -4.9],
      [0.34, -4.1],
      [0.62, -3.0],
      [0.92, -1.8],
      [1.1, -0.6],
      [1.14, 0.6],
      [1.08, 1.8],
      [0.98, 2.5],
    ].map(([r, y]) => new THREE.Vector2(r, y))
  ).getPoints(56);
  const geo = new THREE.LatheGeometry(prof, 56);
  geo.rotateZ(-Math.PI / 2);
  geo.scale(1, 1, 0.86);
  return new THREE.Mesh(geo, mats.body);
}

function cowling(mats) {
  const prof = new THREE.SplineCurve(
    [
      [0.99, 2.35],
      [1.04, 2.6],
      [1.03, 3.0],
      [0.95, 3.3],
      [0.78, 3.42],
      [0.6, 3.36],
      [0.52, 3.2],
    ].map(([r, y]) => new THREE.Vector2(r, y))
  ).getPoints(32);
  const geo = new THREE.LatheGeometry(prof, 48);
  geo.rotateZ(-Math.PI / 2);
  geo.scale(1, 1, 0.9);
  return new THREE.Mesh(geo, mats.silver);
}

function spinner(mats) {
  const prof = new THREE.SplineCurve(
    [
      [0.52, 0],
      [0.5, 0.22],
      [0.4, 0.52],
      [0.22, 0.82],
      [0.0, 0.98],
    ].map(([r, y]) => new THREE.Vector2(r, y))
  ).getPoints(24);
  const geo = new THREE.LatheGeometry(prof, 40);
  geo.rotateZ(-Math.PI / 2);
  const m = new THREE.Mesh(geo, mats.gold);
  m.position.x = 3.38;
  return m;
}

function propeller(mats) {
  const prop = new THREE.Group();
  prop.position.x = 3.55;
  const bs = new THREE.Shape();
  bs.moveTo(-0.14, 0.35);
  bs.bezierCurveTo(-0.26, 1.0, -0.3, 1.9, -0.17, 2.55);
  bs.lineTo(0.17, 2.55);
  bs.bezierCurveTo(0.2, 1.9, 0.15, 1.0, 0.12, 0.35);
  bs.closePath();
  const bg = new THREE.ExtrudeGeometry(bs, { depth: 0.07, bevelEnabled: false, curveSegments: 10 });
  bg.translate(0, 0, -0.035);
  bg.rotateY(Math.PI / 2 + 0.3);
  for (const k of [0, 1]) {
    const blade = new THREE.Mesh(bg, mats.wood);
    const tip = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.3, 0.36), mats.gold);
    tip.position.y = 2.42;
    blade.add(tip);
    blade.rotation.x = k * Math.PI;
    prop.add(blade);
  }
  return prop;
}

function canopy(mats) {
  const g = new THREE.Group();
  const glass = new THREE.Mesh(new THREE.SphereGeometry(1, 40, 24), mats.glass);
  glass.scale.set(1.0, 0.72, 0.64);
  glass.position.set(-0.1, 1.0, 0);
  g.add(glass);
  for (const x of [-0.75, 0.55]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.035, 8, 40), mats.body);
    ring.scale.set(1, 1.15, 1);
    ring.position.set(x, 0.98, 0);
    ring.rotation.y = Math.PI / 2;
    ring.scale.set(1, 1, 1.05);
    g.add(ring);
  }
  return g;
}

function pilot(mats) {
  const g = new THREE.Group();
  g.position.set(-0.1, 1.32, 0);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.32, 28, 20), mats.skin);
  g.add(head);
  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.35, 28, 16, 0, Math.PI * 2, 0, Math.PI * 0.56), mats.leather);
  cap.position.y = 0.02;
  g.add(cap);
  for (const z of [-0.13, 0.13]) {
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.095, 0.028, 8, 20), mats.gold);
    rim.position.set(0.28, 0.06, z);
    rim.rotation.y = Math.PI / 2;
    g.add(rim);
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.085, 20), mats.lens);
    lens.position.set(0.285, 0.06, z);
    lens.rotation.y = Math.PI / 2;
    g.add(lens);
  }
  const strap = new THREE.Mesh(new THREE.TorusGeometry(0.325, 0.022, 6, 28), mats.leather);
  strap.position.y = 0.06;
  strap.rotation.x = Math.PI / 2;
  g.add(strap);
  // khăn quàng bay phía sau
  const scarf = new THREE.Group();
  scarf.position.set(-0.12, -0.28, 0);
  const neck = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.07, 8, 20), mats.scarf);
  neck.rotation.x = Math.PI / 2;
  g.add(neck);
  const tail = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.04, 0.17), mats.scarf);
  tail.position.set(-0.5, 0, 0.1);
  scarf.add(tail);
  g.add(scarf);
  return { group: g, scarf };
}

const BN_FONT_FAMILY = "Be Vietnam Pro";
const BN_FONT_WEIGHT = 700;
const BN_FONT = `'${BN_FONT_FAMILY}', 'Segoe UI', 'Noto Sans', Arial, sans-serif`;

const BN = { L: 6.5, H: 1.35, NX: 48, NY: 8, rope: 1.6, hook: [-5.35, 0.05, 0] };

function bannerTex(text, mirror) {
  return canvasTex(1536, 320, (c, w, h) => {
    if (mirror) {
      c.translate(w, 0);
      c.scale(-1, 1);
    }
    const notch = 120;
    c.beginPath();
    c.moveTo(0, 0); c.lineTo(w, 0); c.lineTo(w, h); c.lineTo(0, h); c.lineTo(notch, h / 2);
    c.closePath();
    c.fillStyle = CREAM;
    c.fill();
    c.save();
    c.clip();
    c.fillStyle = RED;
    c.fillRect(0, 0, w, 26);
    c.fillRect(0, h - 26, w, 26);
    c.fillStyle = GOLD;
    c.fillRect(0, 26, w, 6);
    c.fillRect(0, h - 32, w, 6);
    c.restore();
    c.save();
    c.translate(w - 150, h / 2);
    c.fillStyle = GOLD;
    c.beginPath();
    c.arc(0, 0, 98, 0, 7);
    c.fill();
    drawLogo(c, 90);
    c.restore();
    const x0 = notch + 50, x1 = w - 280;
    let size = 150;
    c.font = `${BN_FONT_WEIGHT} ${size}px ${BN_FONT}`;
    const mw = c.measureText(text).width;
    if (mw > x1 - x0) {
      size = Math.floor((size * (x1 - x0)) / mw);
      c.font = `${BN_FONT_WEIGHT} ${size}px ${BN_FONT}`;
    }
    c.fillStyle = RED_D;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(text, (x0 + x1) / 2, h / 2 + 6);
  });
}

function createBanner(text, mats) {
  const group = new THREE.Group();
  group.position.set(BN.hook[0] - BN.rope - BN.L / 2, 0, 0);
  const geo = new THREE.PlaneGeometry(BN.L, BN.H, BN.NX, BN.NY);
  const pos = geo.attributes.position;
  const base = Float32Array.from(pos.array);
  const mk = (mirror, side) =>
    new THREE.MeshStandardMaterial({ map: bannerTex(text, mirror), transparent: true, alphaTest: 0.5, side, roughness: 0.75, envMapIntensity: 0.5 });
  const front = new THREE.Mesh(geo, mk(false, THREE.FrontSide));
  const back = new THREE.Mesh(geo, mk(true, THREE.BackSide));
  front.frustumCulled = back.frustumCulled = false;
  group.add(front, back);

  const ropes = [0, 1].map(() => {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 1, 6), mats.dark);
    return m;
  });
  const up = new THREE.Vector3(0, 1, 0);
  const A = new THREE.Vector3(), B = new THREE.Vector3(), D = new THREE.Vector3();
  const place = (m, a, b) => {
    D.copy(b).sub(a);
    m.scale.y = D.length();
    m.position.copy(a).add(b).multiplyScalar(0.5);
    m.quaternion.setFromUnitVectors(up, D.normalize());
  };

  function update(t, k, pitch = 0) {
    for (let i = 0; i < pos.count; i++) {
      const bx = base[i * 3], by = base[i * 3 + 1];
      const d = (BN.L / 2 - bx) / BN.L;
      const a = k * Math.pow(d, 1.25);
      const ph = t * 6.2 - d * 7;
      const y = by + Math.sin(ph) * 0.42 * a - d * d * 0.35 - pitch * d * BN.L * 0.5;
      const z = Math.sin(ph * 0.8 + 1.1 + by * 0.9) * 0.5 * a + Math.sin(t * 3.1 - d * 4) * 0.12 * a;
      const x = bx + Math.abs(z) * 0.18 * d;
      pos.setXYZ(i, x, y, z);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
    const H = new THREE.Vector3(...BN.hook);
    for (const [r, row] of [[ropes[0], 0], [ropes[1], BN.NY]]) {
      const i = row * (BN.NX + 1) + BN.NX;
      A.set(pos.getX(i), pos.getY(i), pos.getZ(i)).add(group.position);
      place(r, H, A);
    }
  }
  update(0, 1, 0);
  return { group, ropes, update };
}

export function createPlane({ logoUrl = "/favicon.svg", bannerText = "Mầm non Hồng Phúc" } = {}) {
  if (typeof document !== "undefined" && document.fonts?.load) {
    document.fonts
      .load(`${BN_FONT_WEIGHT} 120px "${BN_FONT_FAMILY}"`, bannerText)
      .then(() => redraws.forEach((f) => f()))
      .catch(() => { });
  }
  if (logoUrl && !logo.img) {
    const im = new Image();
    im.onload = () => {
      logo.img = im;
      redraws.forEach((f) => f());
    };
    im.src = logoUrl;
  }
  const wingT = wingTex();
  const mats = {
    body: std(RED, { map: fuselageTex(), roughness: 0.32, envMapIntensity: 1 }),
    red: std(RED, { roughness: 0.34, envMapIntensity: 0.95 }),
    redD: std(RED_D),
    wing: std(CREAM, { map: wingT, roughness: 0.55 }),
    cream: std(CREAM, { roughness: 0.5 }),
    silver: metal("#cfd3dc", { side: THREE.DoubleSide }),
    gold: metal(GOLD, { roughness: 0.3 }),
    wood: std("#4a3226", { roughness: 0.6 }),
    tire: std("#25232b", { roughness: 0.85 }),
    dark: metal("#3b3944", { roughness: 0.5 }),
    glass: new THREE.MeshPhysicalMaterial({
      color: "#9fe3f2",
      transparent: true,
      opacity: 0.42,
      roughness: 0.04,
      metalness: 0,
      clearcoat: 1,
      envMapIntensity: 1.8,
      depthWrite: false,
    }),
    skin: std("#f3c6a0", { roughness: 0.7 }),
    leather: std("#8a5a36", { roughness: 0.6 }),
    scarf: std("#ffd166", { roughness: 0.8, side: THREE.DoubleSide }),
    lens: new THREE.MeshStandardMaterial({ color: "#8fe9ff", roughness: 0.1, metalness: 0.2, emissive: "#3fb8d6", emissiveIntensity: 0.35 }),
  };

  const body = new THREE.Group();
  body.position.x = 0.45;
  body.add(fuselage(mats), cowling(mats), spinner(mats), canopy(mats));

  // cánh trên & dưới (lệch tầng kiểu Staggerwing)
  const upper = wingMesh({ chord: 2.4, span: 9.4, thick: 0.16, mat: mats.wing });
  upper.position.set(-0.5, 1.95, 0);
  const lower = wingMesh({ chord: 2.1, span: 8.2, thick: 0.15, mat: mats.wing });
  lower.position.set(0.6, -0.5, 0);
  body.add(upper, lower);

  const pil = pilot(mats);
  body.add(pil.group);

  // trụ giữa hai tầng cánh + dây chằng
  for (const s of [-1, 1]) {
    body.add(strut([1.0, -0.42, s * 2.6], [0.1, 1.86, s * 2.95], 0.06, mats.silver));
    body.add(strut([0.2, -0.42, s * 2.6], [-0.9, 1.86, s * 2.95], 0.06, mats.silver));
    body.add(strut([1.0, -0.42, s * 2.6], [-0.9, 1.86, s * 2.95], 0.014, mats.dark));
    body.add(strut([0.2, -0.42, s * 2.6], [0.1, 1.86, s * 2.95], 0.014, mats.dark));
    body.add(strut([0.3, 0.95, s * 0.35], [-0.2, 1.86, s * 1.1], 0.07, mats.red));
    body.add(strut([-0.9, 0.9, s * 0.35], [-1.2, 1.86, s * 1.1], 0.07, mats.red));
    body.add(strut([0.6, -0.5, s * 1.2], [-0.5, 1.86, s * 3.8], 0.012, mats.dark));
  }

  // đuôi
  const stab = wingMesh({ chord: 1.5, span: 3.9, thick: 0.1, mat: mats.red, uv: false });
  stab.position.set(-4.4, 0.3, 0);
  body.add(stab);
  const fs = new THREE.Shape();
  fs.moveTo(0.9, 0);
  fs.lineTo(0.3, 1.85);
  fs.quadraticCurveTo(0.15, 2.25, -0.3, 2.1);
  fs.lineTo(-0.8, 0.1);
  fs.closePath();
  const fg = new THREE.ExtrudeGeometry(fs, { depth: 0.1, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 2 });
  fg.translate(0, 0, -0.05);
  const fin = new THREE.Mesh(fg, mats.red);
  fin.position.set(-4.45, 0.1, 0);
  body.add(fin);

  const decal = (tex, r, pos, side) => {
    const m = new THREE.Mesh(
      new THREE.CircleGeometry(r, 48),
      new THREE.MeshStandardMaterial({ map: tex, transparent: true, roughness: 0.5, polygonOffset: true, polygonOffsetFactor: -2, envMapIntensity: 0.5 })
    );
    m.position.set(...pos);
    if (side < 0) m.rotation.y = Math.PI;
    return m;
  };
  const rt = roundelTex();
  const bt = badgeTex();
  for (const s of [-1, 1]) {
    body.add(decal(rt, 0.42, [-1.2, 0.1, s * 0.93], s));
    body.add(decal(bt, 0.34, [-4.3, 1.05, s * 0.075], s));
  }

  // bánh xe, chân càng: lốp, mâm và chắn bùn dùng chung MỘT tâm (WHEEL) nên luôn đồng tâm
  const WHEEL = [1.35, -2.55];
  for (const s of [-1, 1]) {
    const zc = s * 1.2; // tâm lốp
    const zs = s * 1.38; // tâm chắn bùn (nằm sát mặt ngoài lốp)
    body.add(strut([0.9, -0.8, s * 0.55], [WHEEL[0], WHEEL[1] + 0.05, zs], 0.1, mats.dark));
    body.add(strut([0.3, -0.7, s * 0.55], [WHEEL[0] - 0.05, WHEEL[1] + 0.05, zs], 0.06, mats.dark));
    const wheel = new THREE.Group();
    wheel.position.set(WHEEL[0], WHEEL[1], zc);
    wheel.add(new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.17, 14, 32), mats.tire));
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.2, 20), mats.cream);
    hub.rotation.x = Math.PI / 2;
    wheel.add(hub);
    body.add(wheel);
    const spat = new THREE.Mesh(new THREE.SphereGeometry(0.62, 32, 20), mats.red);
    spat.scale.set(1, 1, 0.3);
    spat.position.set(WHEEL[0], WHEEL[1], zs);
    body.add(spat);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.05, 20), mats.gold);
    cap.rotation.x = Math.PI / 2;
    cap.position.set(WHEEL[0], WHEEL[1], zs + s * 0.2);
    body.add(cap);
  }
  const axle = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.0, 8), mats.dark);
  axle.rotation.x = Math.PI / 2;
  axle.position.set(WHEEL[0], WHEEL[1], 0);
  body.add(axle);
  const tw = new THREE.Mesh(new THREE.SphereGeometry(0.15, 14, 10), mats.tire);
  tw.position.set(-4.75, -0.55, 0);
  body.add(tw, strut([-4.0, -0.1, 0], [-4.75, -0.5, 0], 0.05, mats.dark));

  // ống xả + đèn hiệu cánh
  for (const s of [-1, 1]) {
    body.add(strut([2.4, -0.55, s * 0.9], [2.95, -0.75, s * 0.95], 0.07, mats.dark));
    const nav = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 12, 8),
      new THREE.MeshBasicMaterial({ color: s > 0 ? "#5dff9a" : "#ff5d5d" })
    );
    nav.position.set(-0.4, 1.95, s * 4.78);
    body.add(nav);
  }

  const prop = propeller(mats);
  body.add(prop);
  const blur = new THREE.Mesh(
    new THREE.CircleGeometry(2.65, 48),
    new THREE.MeshBasicMaterial({ map: discTex(), transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide })
  );
  blur.geometry.rotateY(Math.PI / 2);
  blur.position.x = 3.5;
  body.add(blur);

  const banner = createBanner(bannerText, mats);
  body.add(banner.group, ...banner.ropes);

  const root = new THREE.Group();
  root.add(body);
  return { root, prop, blur, scarf: pil.scarf, banner };
}

export function disposePlane(root) {
  root.traverse((o) => {
    if (o.geometry) o.geometry.dispose();
    const m = o.material;
    if (m) (Array.isArray(m) ? m : [m]).forEach((x) => { x.map?.dispose(); x.dispose(); });
  });
}