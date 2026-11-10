export const mulberry = (seed) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const rgba = (hex, a) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
};

const PAL = {
  day: { shadow: "#a8b0e8", mid: "#ecebfa", light: "#ffffff" },
  dusk: { shadow: "#d49fc8", mid: "#ffdcd2", light: "#fff6ee" },
  cream: { shadow: "#efddd0", mid: "#fcf7ec", light: "#fffefa" },
  back: { shadow: "#b7a5dc", mid: "#e9ddf3", light: "#fbf4fb" },
};

function blob(ctx, x, y, r, hex, a) {
  const g = ctx.createRadialGradient(x, y, r * 0.15, x, y, r);
  g.addColorStop(0, rgba(hex, a));
  g.addColorStop(0.62, rgba(hex, a * 0.92));
  g.addColorStop(1, rgba(hex, 0));
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function drawPuffs(ctx, puffs, pal) {
  for (const p of puffs) blob(ctx, p.x, p.y + p.r * 0.24, p.r, pal.shadow, 0.9);
  for (const p of puffs) blob(ctx, p.x, p.y, p.r * 0.97, pal.mid, 1);
  for (const p of puffs) blob(ctx, p.x - p.r * 0.05, p.y - p.r * 0.22, p.r * 0.7, pal.light, 0.96);
}

const rowPuffs = (R, { x0, x1, y0, y1, r0, r1 }) => {
  const out = [];
  let x = x0;
  while (x < x1) {
    const r = r0 + R() * (r1 - r0);
    out.push({ x, y: y0 + R() * (y1 - y0), r });
    x += r * (0.5 + R() * 0.3);
  }
  return out;
};

const scatterPuffs = (R, { n, x0, x1, y0, y1, r0, r1 }) =>
  Array.from({ length: n }, () => ({ x: x0 + R() * (x1 - x0), y: y0 + R() * (y1 - y0), r: r0 + R() * (r1 - r0) }));

function fillV(ctx, W, y0, y1, stops) {
  const g = ctx.createLinearGradient(0, y0, 0, y1);
  stops.forEach(([o, c]) => g.addColorStop(o, c));
  ctx.fillStyle = g;
  ctx.fillRect(0, y0, W, y1 - y0);
}

export function paintSky(canvas, { kind, seed = 1, variant = "day" }) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;
  const R = mulberry(seed);
  ctx.clearRect(0, 0, W, H);
  const n = (per) => Math.max(4, Math.round(W / per));

  if (kind === "coverTop") {
    fillV(ctx, W, 0, H * 0.78, [[0, "#6f95ec"], [0.55, "#b9b8f1"], [1, "#f4ecf7"]]);
    drawPuffs(ctx, scatterPuffs(R, { n: n(170), x0: 0, x1: W, y0: 0.12 * H, y1: 0.7 * H, r0: 0.1 * H, r1: 0.2 * H }), PAL.day);
    drawPuffs(ctx, rowPuffs(R, { x0: -0.1 * W, x1: 1.1 * W, y0: 0.74 * H, y1: 0.86 * H, r0: 0.1 * H, r1: 0.17 * H }), PAL.day);
  } else if (kind === "coverBottom") {
    fillV(ctx, W, 0.22 * H, H, [[0, "#fff4ec"], [0.45, "#f7cfca"], [1, "#b4a6e6"]]);
    drawPuffs(ctx, scatterPuffs(R, { n: n(170), x0: 0, x1: W, y0: 0.3 * H, y1: 0.9 * H, r0: 0.1 * H, r1: 0.2 * H }), PAL.dusk);
    drawPuffs(ctx, rowPuffs(R, { x0: -0.1 * W, x1: 1.1 * W, y0: 0.14 * H, y1: 0.26 * H, r0: 0.1 * H, r1: 0.17 * H }), PAL.day);
  } else if (kind === "floor") {
    drawPuffs(ctx, rowPuffs(R, { x0: -0.1 * W, x1: 1.1 * W, y0: 0.28 * H, y1: 0.4 * H, r0: 0.1 * H, r1: 0.18 * H }), PAL.back);
    drawPuffs(ctx, rowPuffs(R, { x0: -0.1 * W, x1: 1.1 * W, y0: 0.5 * H, y1: 0.62 * H, r0: 0.14 * H, r1: 0.24 * H }), PAL.cream);
    ctx.fillStyle = "#fcf7ec";
    ctx.fillRect(0, 0.68 * H, W, H);
  } else if (kind === "band") {
    const dusk = variant === "dusk";
    fillV(ctx, W, 0.04 * H, 0.96 * H, dusk
      ? [[0, "#8aa0ee"], [0.55, "#e7b5d2"], [1, "#ffd7c2"]]
      : [[0, "#6e98ee"], [0.5, "#a9b4f2"], [1, "#f2c4d6"]]);
    drawPuffs(ctx, scatterPuffs(R, { n: n(260), x0: 0, x1: W, y0: 0.25 * H, y1: 0.75 * H, r0: 0.08 * H, r1: 0.17 * H }), dusk ? PAL.dusk : PAL.day);
    ctx.fillStyle = "#fcf7ec";
    ctx.fillRect(0, 0, W, 0.04 * H);
    ctx.fillRect(0, 0.96 * H, W, H);
    drawPuffs(ctx, rowPuffs(R, { x0: -0.1 * W, x1: 1.1 * W, y0: 0.0, y1: 0.08 * H, r0: 0.08 * H, r1: 0.14 * H }), PAL.cream);
    drawPuffs(ctx, rowPuffs(R, { x0: -0.1 * W, x1: 1.1 * W, y0: 0.94 * H, y1: 1.02 * H, r0: 0.08 * H, r1: 0.14 * H }), PAL.cream);
  }
}
