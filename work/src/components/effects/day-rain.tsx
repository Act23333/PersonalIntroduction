"use client";

import { useEffect, useRef, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────

interface RainStreak {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
  width: number;
  tilt: number;
}

interface WindowDrop {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  flowing: boolean;
  flowSpeed: number;
  flowY: number;
  flowWobble: number;
  flowWobbleAmp: number;
  hlX: number;
  hlY: number;
  trailIdx: number;
}

interface FlowTrail {
  points: { x: number; y: number }[];
  life: number;
  maxLife: number;
}

// ─── Constants ───────────────────────────────────────────

const RAIN_COUNT = 70;        // reduced from 130
const MAX_DROPS = 30;         // reduced from 50
const DROP_MIN_R = 1.2;
const DROP_MAX_R = 5.5;
const FLOW_THRESHOLD = 3.2;
const TRAIL_MAX_POINTS = 35;  // reduced from 80

// ─── Helpers ─────────────────────────────────────────────

function rand(min: number, max: number) { return min + Math.random() * (max - min); }
function dist(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}
function noise2D(x: number, y: number, t: number): number {
  return (
    Math.sin(x * 0.041 + t * 0.6) * Math.cos(y * 0.047 + t * 0.35) * 0.5 +
    Math.sin((x + y) * 0.027 + t * 0.25) * 0.3 +
    Math.cos(x * 0.055 - y * 0.033 + t * 0.45) * 0.2
  );
}

// ─── Pre-rendered glass texture ──────────────────────────

function makeGlassTex(w: number, h: number): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#e8ecf1";
  ctx.fillRect(0, 0, w, h);
  // Grain baked once
  for (let i = 0; i < 40; i++) {
    ctx.fillStyle = `rgba(255,255,255,${rand(0.02, 0.06)})`;
    ctx.fillRect(rand(0, w), rand(0, h), rand(15, 50), rand(10, 35));
  }
  return c;
}

// ─── Factories ───────────────────────────────────────────

function createStreak(w: number, h: number): RainStreak {
  return {
    x: Math.random() * w * 1.3 - w * 0.15,
    y: Math.random() * -h - 50,
    speed: rand(2, 5),
    length: rand(10, 28),
    opacity: rand(0.25, 0.5),
    width: rand(0.5, 1.2),
    tilt: rand(-0.05, 0.05),
  };
}

function createDrop(w: number, h: number, ex: WindowDrop[]): WindowDrop | null {
  const x = rand(20, w - 20), y = rand(40, h * 0.85), r = rand(DROP_MIN_R, DROP_MIN_R * 2);
  for (const d of ex) { if (dist({ x, y }, d) < r + d.radius + 5) return null; }
  return {
    x, y, radius: r, maxRadius: rand(2.5, DROP_MAX_R), flowing: false,
    flowSpeed: rand(0.2, 0.6), flowY: 0,
    flowWobble: Math.random() * Math.PI * 2, flowWobbleAmp: rand(0.5, 2.5),
    hlX: rand(-0.3, 0.3), hlY: rand(-0.35, 0.05), trailIdx: -1,
  };
}

// ─── Component ───────────────────────────────────────────

export function DayRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rainRef = useRef<RainStreak[]>([]);
  const dropsRef = useRef<WindowDrop[]>([]);
  const trailsRef = useRef<FlowTrail[]>([]);
  const glassRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  const init = useCallback((w: number, h: number) => {
    rainRef.current = Array.from({ length: RAIN_COUNT }, () => createStreak(w, h));
    dropsRef.current = [];
    let n = 0;
    while (dropsRef.current.length < 15 && n < 400) {
      const d = createDrop(w, h, dropsRef.current);
      if (d) dropsRef.current.push(d); n++;
    }
    trailsRef.current = [];
    glassRef.current = makeGlassTex(w, h);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      if (!canvas || !ctx) return;
      const w = canvas.width, h = canvas.height, t = timeRef.current;

      ctx.clearRect(0, 0, w, h);

      // ── Pre-baked glass texture ──────────────────────
      if (glassRef.current) ctx.drawImage(glassRef.current, 0, 0, w, h);

      // ── Ambient light ────────────────────────────────
      const amb = ctx.createLinearGradient(0, 0, 0, h);
      amb.addColorStop(0, "rgba(200,215,230,0.5)");
      amb.addColorStop(0.4, "rgba(220,230,240,0.2)");
      amb.addColorStop(1, "rgba(180,195,210,0.1)");
      ctx.fillStyle = amb; ctx.fillRect(0, 0, w, h);

      // ── Flow trails ─────────────────────────────────
      const trails = trailsRef.current;
      for (let i = trails.length - 1; i >= 0; i--) {
        const tr = trails[i];
        if (tr.points.length < 2) { trails.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.moveTo(tr.points[0].x, tr.points[0].y);
        for (let j = 1; j < tr.points.length; j++) {
          const p = tr.points[j - 1], c = tr.points[j];
          ctx.quadraticCurveTo(p.x, p.y, (p.x + c.x) / 2, (p.y + c.y) / 2);
        }
        const last = tr.points[tr.points.length - 1];
        ctx.lineTo(last.x, last.y);
        ctx.strokeStyle = `rgba(140,170,200,${(tr.life / tr.maxLife) * 0.45})`;
        ctx.lineWidth = 1.3; ctx.lineCap = "round"; ctx.stroke();
        tr.life -= 0.004;
        if (tr.life <= 0) trails.splice(i, 1);
      }

      // ── Rain streaks ────────────────────────────────
      for (const r of rainRef.current) {
        r.tilt += rand(-0.002, 0.002);
        r.tilt = Math.max(-0.08, Math.min(0.08, r.tilt));
        const ex = r.x + r.tilt * r.length, ey = r.y + r.length;
        ctx.beginPath();
        ctx.moveTo(r.x, r.y); ctx.lineTo(ex, ey);
        // Solid color — cheaper than per-streak gradient
        ctx.strokeStyle = `rgba(90,120,150,${r.opacity})`;
        ctx.lineWidth = r.width; ctx.stroke();
        r.y += r.speed;
        r.x += r.tilt * r.speed * 0.2;
        if (r.y > h + 40) Object.assign(r, createStreak(w, h));
      }

      // ── Window drops ────────────────────────────────
      const drops = dropsRef.current;
      if (drops.length < MAX_DROPS && Math.random() < 0.25) {
        const nd = createDrop(w, h, drops);
        if (nd) drops.push(nd);
      }

      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        if (!d.flowing && d.radius < d.maxRadius) d.radius += rand(0.005, 0.022);
        if (!d.flowing && d.radius >= FLOW_THRESHOLD) {
          d.flowing = true;
          d.trailIdx = trails.length;
          trails.push({ points: [{ x: d.x, y: d.y }], life: 1, maxLife: 1 });
        }
        if (d.flowing) {
          d.flowWobble += rand(0.03, 0.07);
          const nv = noise2D(d.x, d.y + d.flowY, t);
          d.x += (Math.sin(d.flowWobble) * d.flowWobbleAmp + nv * 2.5) * 0.03;
          d.y += d.flowSpeed; d.flowY += d.flowSpeed;
          d.radius *= 0.999;
          const at = trails[d.trailIdx];
          if (at && dist({ x: d.x, y: d.y }, at.points[at.points.length - 1]) > 3) {
            at.points.push({ x: d.x, y: d.y });
            at.life = 1;
            if (at.points.length > TRAIL_MAX_POINTS) at.points.shift();
          }
        }
        if (d.y > h + 40 || d.radius < 0.2) { drops.splice(i, 1); continue; }
        // Merge
        for (let j = drops.length - 1; j >= 0; j--) {
          if (i === j || i >= drops.length || j >= drops.length) continue;
          const o = drops[j];
          if (!o || dist(d, o) >= 10) continue;
          if (d.radius >= o.radius) {
            d.radius = Math.min(DROP_MAX_R * 1.6, Math.sqrt(d.radius ** 2 + o.radius ** 2));
            d.maxRadius = Math.max(d.maxRadius, d.radius);
            const wf = d.flowing; d.flowing = d.flowing || d.radius >= FLOW_THRESHOLD;
            if (d.flowing && !wf) d.flowSpeed = rand(0.2, 0.6);
            drops.splice(j, 1); if (j < i) i--;
          } else {
            o.radius = Math.min(DROP_MAX_R * 1.6, Math.sqrt(d.radius ** 2 + o.radius ** 2));
            o.maxRadius = Math.max(o.maxRadius, o.radius);
            o.flowing = o.flowing || o.radius >= FLOW_THRESHOLD;
            drops.splice(i, 1); break;
          }
        }
      }

      // ── Draw drops ──────────────────────────────────
      for (const d of drops) {
        const r = d.radius;
        ctx.beginPath(); ctx.arc(d.x + 1, d.y + 1.5, r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,0,0.08)"; ctx.fill();
        const bg = ctx.createRadialGradient(d.x - r * 0.25, d.y - r * 0.35, r * 0.08, d.x, d.y, r);
        bg.addColorStop(0, "rgba(210,225,245,0.65)");
        bg.addColorStop(0.4, "rgba(170,195,225,0.4)");
        bg.addColorStop(0.75, "rgba(130,160,200,0.18)");
        bg.addColorStop(1, "rgba(100,130,170,0.05)");
        ctx.beginPath(); ctx.arc(d.x, d.y, r, 0, Math.PI * 2); ctx.fillStyle = bg; ctx.fill();
        const hx = d.x + d.hlX * r, hy = d.y + d.hlY * r, hr = r * 0.35;
        const hg = ctx.createRadialGradient(hx, hy, 0, hx, hy, hr);
        hg.addColorStop(0, "rgba(255,255,255,0.8)");
        hg.addColorStop(0.3, "rgba(255,255,255,0.35)");
        hg.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath(); ctx.arc(hx, hy, hr, 0, Math.PI * 2); ctx.fillStyle = hg; ctx.fill();
        ctx.beginPath(); ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.18)"; ctx.lineWidth = 0.5; ctx.stroke();
      }

      timeRef.current += 0.016;
      animRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, [init]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />;
}
