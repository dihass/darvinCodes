"use client";

import { useEffect, useRef } from "react";

const RINGS      = 6;
const CYCLE_MS   = 5000;
const STAGGER_MS = CYCLE_MS / RINGS;

export default function ContactCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef  = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const draw = (ts: number) => {
      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      if (!W || !H) { frameRef.current = requestAnimationFrame(draw); return; }

      ctx.clearRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H / 2;
      const maxR = Math.sqrt(W * W + H * H) * 0.46;

      /* ── background dot grid ─────────────────────────────── */
      const gapX = 28;
      const gapY = 28;
      for (let gx = gapX / 2; gx < W; gx += gapX) {
        for (let gy = gapY / 2; gy < H; gy += gapY) {
          // Distance from center dims the dots
          const dr = Math.sqrt((gx - cx) ** 2 + (gy - cy) ** 2);
          const fade = Math.max(0, 1 - dr / (maxR * 1.1));
          ctx.beginPath();
          ctx.arc(gx, gy, 0.85, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(210, 155, 120, ${0.13 * fade})`;
          ctx.fill();
        }
      }

      /* ── expanding rings ─────────────────────────────────── */
      for (let i = 0; i < RINGS; i++) {
        const offset  = i * STAGGER_MS;
        const t       = ((ts + offset) % CYCLE_MS) / CYCLE_MS;

        // Ease-out cubic expansion
        const eased   = 1 - Math.pow(1 - t, 2.5);
        const r       = eased * maxR;

        // Opacity peaks early, then fades
        const opacity = t < 0.15
          ? (t / 0.15) * 0.55
          : (1 - (t - 0.15) / 0.85) * 0.55;

        const lineW   = Math.max(0.4, 1.6 - t * 1.2);

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(195, 112, 76, ${opacity})`;
        ctx.lineWidth   = lineW;
        ctx.stroke();
      }

      /* ── central pulsing beacon ──────────────────────────── */
      const pulse     = Math.sin((ts / 1400) * Math.PI) * 0.5 + 0.5; // 0→1→0
      const glowR     = 28 + pulse * 10;
      const coreR     =  5 + pulse * 1.8;

      // Outer glow
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
      grd.addColorStop(0,   "rgba(195, 112, 76, 0.35)");
      grd.addColorStop(0.4, "rgba(195, 112, 76, 0.12)");
      grd.addColorStop(1,   "rgba(195, 112, 76, 0)");
      ctx.beginPath();
      ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(195, 112, 76, ${0.7 + pulse * 0.3})`;
      ctx.fill();

      // Inner bright highlight
      ctx.beginPath();
      ctx.arc(cx - coreR * 0.28, cy - coreR * 0.28, coreR * 0.38, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 220, 195, 0.6)";
      ctx.fill();

      frameRef.current = requestAnimationFrame(draw);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
