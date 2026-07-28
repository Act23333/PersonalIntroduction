"use client";

import { useEffect, useRef, useCallback } from "react";

// ─── Types ───────────────────────────────────────────────

interface FlowParticle {
  x: number;
  y: number;
  trail: { x: number; y: number }[];
  life: number;
  maxLife: number;
  size: number;
  opacity: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  phase: number;
  freq: number;
}

// ─── Constants ───────────────────────────────────────────

const PARTICLE_COUNT = 50;       // 70% fewer than before
const TRAIL_LENGTH = 6;           // 30-40% of original 20-30
const STAR_COUNT = 60;
const FLOW_ANGLE = -Math.PI / 5;  // main flow direction (bottom-left → top-right)
const FLOW_SPEED = 0.6;
const MOUSE_RADIUS = 180;
const MOUSE_FORCE = 1.8;

// ─── Simplex-like 3D noise ───────────────────────────────

// Simple permutation table
const PERM: number[] = [];
for (let i = 0; i < 256; i++) PERM[i] = i;
for (let i = 255; i > 0; i--) {
  const j = (Math.random() * (i + 1)) | 0;
  [PERM[i], PERM[j]] = [PERM[j], PERM[i]];
}
const P = [...PERM, ...PERM]; // double for wrapping

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a: number, b: number, t: number): number {
  return a + t * (b - a);
}

function grad(hash: number, x: number, y: number, z: number): number {
  const h = hash & 15;
  const u = h < 8 ? x : y;
  const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
  return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

function noise3D(x: number, y: number, z: number): number {
  const X = Math.floor(x) & 255;
  const Y = Math.floor(y) & 255;
  const Z = Math.floor(z) & 255;
  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);
  const zf = z - Math.floor(z);
  const u = fade(xf);
  const v = fade(yf);
  const w = fade(zf);
  const aaa = P[P[P[X] + Y] + Z];
  const aba = P[P[P[X] + Y + 1] + Z];
  const aab = P[P[P[X] + Y] + Z + 1];
  const abb = P[P[P[X] + Y + 1] + Z + 1];
  const baa = P[P[P[X + 1] + Y] + Z];
  const bba = P[P[P[X + 1] + Y + 1] + Z];
  const bab = P[P[P[X + 1] + Y] + Z + 1];
  const bbb = P[P[P[X + 1] + Y + 1] + Z + 1];
  return lerp(
    lerp(
      lerp(grad(aaa, xf, yf, zf), grad(baa, xf - 1, yf, zf), u),
      lerp(grad(aba, xf, yf - 1, zf), grad(bba, xf - 1, yf - 1, zf), u),
      v,
    ),
    lerp(
      lerp(grad(aab, xf, yf, zf - 1), grad(bab, xf - 1, yf, zf - 1), u),
      lerp(grad(abb, xf, yf - 1, zf - 1), grad(bbb, xf - 1, yf - 1, zf - 1), u),
      v,
    ),
    w,
  );
}

// ─── Helpers ─────────────────────────────────────────────

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

// ─── Factory functions ───────────────────────────────────

function createParticle(w: number, h: number): FlowParticle {
  return {
    x: rand(0, w),
    y: rand(0, h),
    trail: [],
    life: rand(0.3, 1),
    maxLife: rand(0.6, 1),
    size: rand(1.0, 2.2),
    opacity: rand(0.3, 0.7),
  };
}

function createStar(w: number, h: number): Star {
  return {
    x: rand(0, w),
    y: rand(0, h),
    size: rand(0.4, 1.6),
    opacity: rand(0.2, 0.6),
    phase: rand(0, Math.PI * 2),
    freq: rand(0.3, 1.2),
  };
}

// ─── Main Component ──────────────────────────────────────

export function FlowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<FlowParticle[]>([]);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: -999, y: -999, tx: -999, ty: -999 });
  const animRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  const initState = useCallback((w: number, h: number) => {
    // Flow particles
    particlesRef.current = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particlesRef.current.push(createParticle(w, h));
    }
    // Stars
    starsRef.current = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      starsRef.current.push(createStar(w, h));
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initState(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse tracking with smooth follow
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.tx = e.clientX;
      mouseRef.current.ty = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const animate = () => {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      const t = timeRef.current;

      // Smooth mouse follow
      const m = mouseRef.current;
      m.x += (m.tx - m.x) * 0.08;
      m.y += (m.ty - m.y) * 0.08;

      ctx.clearRect(0, 0, w, h);

      // ── Dark background ────────────────────────────────
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, w, h);

      // ── Ambient glow blobs ─────────────────────────────
      const glow1 = ctx.createRadialGradient(w * 0.25, h * 0.3, 0, w * 0.25, h * 0.3, w * 0.45);
      glow1.addColorStop(0, "rgba(59,130,246,0.06)");
      glow1.addColorStop(1, "rgba(59,130,246,0)");
      ctx.fillStyle = glow1;
      ctx.fillRect(0, 0, w, h);

      const glow2 = ctx.createRadialGradient(w * 0.75, h * 0.6, 0, w * 0.75, h * 0.6, w * 0.4);
      glow2.addColorStop(0, "rgba(139,92,246,0.05)");
      glow2.addColorStop(1, "rgba(139,92,246,0)");
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, w, h);

      // ── Stars (twinkling) ───────────────────────────────
      for (const s of starsRef.current) {
        const twinkle = 0.5 + 0.5 * Math.sin(t * s.freq + s.phase);
        const alpha = s.opacity * (0.4 + twinkle * 0.6);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${alpha})`;
        ctx.fill();

        // Glow halo for brighter stars
        if (s.size > 0.8 && twinkle > 0.7) {
          const halo = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 4);
          halo.addColorStop(0, `rgba(180,210,255,${alpha * 0.5})`);
          halo.addColorStop(1, "rgba(180,210,255,0)");
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = halo;
          ctx.fill();
        }
      }

      // ── Mouse glow ──────────────────────────────────────
      if (m.x > 0 && m.y > 0) {
        const mGlow = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, MOUSE_RADIUS);
        mGlow.addColorStop(0, "rgba(100,150,220,0.04)");
        mGlow.addColorStop(0.5, "rgba(80,130,200,0.02)");
        mGlow.addColorStop(1, "rgba(60,100,180,0)");
        ctx.fillStyle = mGlow;
        ctx.fillRect(m.x - MOUSE_RADIUS, m.y - MOUSE_RADIUS, MOUSE_RADIUS * 2, MOUSE_RADIUS * 2);
      }

      // ── Flow particles ──────────────────────────────────
      const particles = particlesRef.current;
      for (const p of particles) {
        // ── Sample flow field ─────────────────────────────
        const noiseScale = 0.0025;
        const noiseZ = t * 0.0004;
        const n = noise3D(p.x * noiseScale, p.y * noiseScale, noiseZ);

        // Base flow direction + noise perturbation
        const perturbAngle = n * Math.PI * 0.6; // ±54° perturbation
        const angle = FLOW_ANGLE + perturbAngle;

        const speed = FLOW_SPEED * (0.7 + Math.abs(n) * 0.6);

        let vx = Math.cos(angle) * speed;
        let vy = Math.sin(angle) * speed;

        // ── Mouse interaction ─────────────────────────────
        const dx = p.x - m.x;
        const dy = p.y - m.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MOUSE_RADIUS && d > 0.1) {
          const force = (1 - d / MOUSE_RADIUS) * MOUSE_FORCE;
          vx += (dx / d) * force;
          vy += (dy / d) * force;
        }

        // ── Update position ───────────────────────────────
        p.x += vx;
        p.y += vy;

        // ── Record trail ──────────────────────────────────
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > TRAIL_LENGTH) p.trail.shift();

        // ── Fade life ─────────────────────────────────────
        p.life -= 0.0008;
        if (p.life <= 0) {
          // Respawn from edge
          const edge = Math.random();
          if (edge < 0.5) {
            // Spawn from bottom-left edge
            p.x = rand(-w * 0.1, w * 0.3);
            p.y = h + rand(10, 80);
          } else {
            // Spawn from left edge
            p.x = rand(-80, -10);
            p.y = rand(h * 0.3, h * 1.1);
          }
          p.trail = [];
          p.life = rand(0.6, 1.2);
          p.maxLife = rand(0.8, 1.2);
          p.size = rand(1.0, 2.2);
          p.opacity = rand(0.3, 0.7);
        }

        // ── Wrap around edges ─────────────────────────────
        if (p.x > w + 30 || p.y < -30) {
          p.x = rand(-80, -10);
          p.y = rand(h * 0.3, h * 1.1);
          p.trail = [];
          p.life = rand(0.6, 1.2);
        }

        // ── Draw trail ────────────────────────────────────
        if (p.trail.length >= 2) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let k = 1; k < p.trail.length; k++) {
            const pk = p.trail[k - 1];
            const ck = p.trail[k];
            ctx.quadraticCurveTo(pk.x, pk.y, (pk.x + ck.x) / 2, (pk.y + ck.y) / 2);
          }

          // Fade trail: newer = brighter
          const alpha = p.opacity * (p.life / p.maxLife);
          ctx.strokeStyle = `rgba(180,210,245,${alpha})`;
          ctx.lineWidth = p.size * 0.7;
          ctx.lineCap = "round";
          ctx.stroke();

          // Subtle outer glow on trail
          ctx.strokeStyle = `rgba(160,200,240,${alpha * 0.25})`;
          ctx.lineWidth = p.size * 2;
          ctx.stroke();
        }

        // ── Draw particle head ────────────────────────────
        if (p.trail.length > 0) {
          const head = p.trail[p.trail.length - 1];
          const alpha = p.opacity * (p.life / p.maxLife);

          // Bright core
          ctx.beginPath();
          ctx.arc(head.x, head.y, p.size * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(220,240,255,${alpha})`;
          ctx.fill();

          // Glow halo
          const halo = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, p.size * 3);
          halo.addColorStop(0, `rgba(200,225,255,${alpha * 0.5})`);
          halo.addColorStop(1, "rgba(200,225,255,0)");
          ctx.beginPath();
          ctx.arc(head.x, head.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = halo;
          ctx.fill();
        }
      }

      timeRef.current += 0.016;
      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [initState]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
