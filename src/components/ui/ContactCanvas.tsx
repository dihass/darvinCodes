"use client";

import { useEffect, useRef } from "react";

export default function ContactCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const polygon = (cx: number, cy: number, r: number, sides: number, rot: number) => {
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const a = rot + (i / sides) * Math.PI * 2;
        i === 0
          ? ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r)
          : ctx.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
      }
      ctx.closePath();
    };

    const draw = (ts: number) => {
      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      if (!W || !H) { frameRef.current = requestAnimationFrame(draw); return; }

      ctx.clearRect(0, 0, W, H);
      const t = ts / 1000;

      // ── Wave dot grid (very subtle on light bg) ───────────────
      const gap = 32;
      for (let gx = gap / 2; gx < W; gx += gap) {
        for (let gy = gap / 2; gy < H; gy += gap) {
          const wave =
            Math.sin((gx / W) * Math.PI * 4 + t * 0.5) *
            Math.cos((gy / H) * Math.PI * 3 + t * 0.38);
          const alpha = Math.max(0, 0.035 + wave * 0.022);
          ctx.beginPath();
          ctx.arc(gx, gy, 0.7, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(170, 100, 60, ${alpha})`;
          ctx.fill();
        }
      }

      // ── Large slow-rotating hexagon ───────────────────────────
      const h1x = W * 0.72 + Math.sin(t * 0.25) * W * 0.02;
      const h1y = H * 0.45 + Math.cos(t * 0.19) * H * 0.032;
      const h1r = Math.min(W, H) * 0.32;
      const h1rot = t * 0.065;
      const h1a = 0.055 + Math.sin(t * 0.3 + 1) * 0.018;

      polygon(h1x, h1y, h1r, 6, h1rot);
      ctx.strokeStyle = `rgba(165, 85, 45, ${h1a})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      polygon(h1x, h1y, h1r * 0.56, 6, -h1rot * 1.3);
      ctx.strokeStyle = `rgba(165, 85, 45, ${h1a * 0.45})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // ── Floating diamond ──────────────────────────────────────
      const d1x = W * 0.18 + Math.sin(t * 0.28 + 2) * W * 0.016;
      const d1y = H * 0.32 + Math.cos(t * 0.22 + 1) * H * 0.038;
      const d1r = Math.min(W, H) * 0.11;
      const d1a = 0.07 + Math.sin(t * 0.38 + 3) * 0.025;

      ctx.save();
      ctx.translate(d1x, d1y);
      ctx.rotate(t * 0.1 + Math.PI / 4);
      ctx.beginPath();
      ctx.moveTo(0, -d1r * 1.3);
      ctx.lineTo(d1r, 0);
      ctx.lineTo(0, d1r * 1.3);
      ctx.lineTo(-d1r, 0);
      ctx.closePath();
      ctx.strokeStyle = `rgba(175, 100, 55, ${d1a})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();

      // ── Small triangle ────────────────────────────────────────
      const t1x = W * 0.82 + Math.sin(t * 0.17 + 5) * W * 0.012;
      const t1y = H * 0.74 + Math.cos(t * 0.24 + 2) * H * 0.022;
      const t1r = Math.min(W, H) * 0.072;
      const t1a = 0.065 + Math.sin(t * 0.44 + 2) * 0.022;

      polygon(t1x, t1y, t1r, 3, -t * 0.085 - Math.PI / 2);
      ctx.strokeStyle = `rgba(165, 85, 45, ${t1a})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // ── Floating orbs with soft glows ─────────────────────────
      const orbs = [
        { bx: W * 0.55, by: H * 0.12, ox: W * 0.044, oy: H * 0.036, sp: 0.58, ph: 0,   r: 2.4 },
        { bx: W * 0.1,  by: H * 0.6,  ox: W * 0.026, oy: H * 0.052, sp: 0.42, ph: 1.5, r: 2.0 },
        { bx: W * 0.9,  by: H * 0.48, ox: W * 0.02,  oy: H * 0.038, sp: 0.5,  ph: 3,   r: 2.2 },
        { bx: W * 0.4,  by: H * 0.88, ox: W * 0.036, oy: H * 0.026, sp: 0.65, ph: 2,   r: 1.8 },
        { bx: W * 0.78, by: H * 0.16, ox: W * 0.028, oy: H * 0.042, sp: 0.48, ph: 4.2, r: 1.9 },
      ];

      const pos = orbs.map((o) => ({
        x: o.bx + Math.cos(t * o.sp + o.ph) * o.ox,
        y: o.by + Math.sin(t * o.sp + o.ph) * o.oy,
        r: o.r,
        a: 0.32 + Math.sin(t * 0.7 + o.ph) * 0.12,
      }));

      // Connector lines
      for (let i = 0; i < pos.length; i++) {
        for (let j = i + 1; j < pos.length; j++) {
          const dist = Math.hypot(pos[i].x - pos[j].x, pos[i].y - pos[j].y);
          const maxD = Math.min(W, H) * 0.52;
          if (dist < maxD) {
            ctx.beginPath();
            ctx.moveTo(pos[i].x, pos[i].y);
            ctx.lineTo(pos[j].x, pos[j].y);
            ctx.strokeStyle = `rgba(175, 100, 55, ${(1 - dist / maxD) * 0.055})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Orb renders
      pos.forEach((o) => {
        const gg = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * 5);
        gg.addColorStop(0, `rgba(190, 120, 75, ${o.a * 0.3})`);
        gg.addColorStop(1, "rgba(190, 120, 75, 0)");
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = gg;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(195, 112, 76, ${o.a})`;
        ctx.fill();
      });

      // ── Soft central ambient glow ─────────────────────────────
      const gcx = W * 0.6 + Math.sin(t * 0.26) * W * 0.016;
      const gcy = H * 0.5 + Math.cos(t * 0.2) * H * 0.026;
      const pulse = 0.5 + Math.sin(t * 0.52) * 0.5;
      const gr = Math.min(W, H) * (0.2 + pulse * 0.04);
      const grd = ctx.createRadialGradient(gcx, gcy, 0, gcx, gcy, gr);
      grd.addColorStop(0, `rgba(195, 112, 76, ${0.04 + pulse * 0.018})`);
      grd.addColorStop(0.5, `rgba(195, 112, 76, ${0.015 + pulse * 0.008})`);
      grd.addColorStop(1, "rgba(195, 112, 76, 0)");
      ctx.beginPath();
      ctx.arc(gcx, gcy, gr, 0, Math.PI * 2);
      ctx.fillStyle = grd;
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
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
