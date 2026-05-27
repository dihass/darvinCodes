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

    const polygon = (
      cx: number, cy: number, r: number, sides: number, rot: number
    ) => {
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const a = rot + (i / sides) * Math.PI * 2;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
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

      // ── Wave dot grid ──────────────────────────────────────────
      const gap = 34;
      for (let gx = gap / 2; gx < W; gx += gap) {
        for (let gy = gap / 2; gy < H; gy += gap) {
          const wave =
            Math.sin((gx / W) * Math.PI * 4 + t * 0.55) *
            Math.cos((gy / H) * Math.PI * 3 + t * 0.4);
          const alpha = Math.max(0, 0.045 + wave * 0.028);
          ctx.beginPath();
          ctx.arc(gx, gy, 0.75, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 158, 128, ${alpha})`;
          ctx.fill();
        }
      }

      // ── Large hexagon (right-centre) ───────────────────────────
      const h1x = W * 0.68 + Math.sin(t * 0.27) * W * 0.022;
      const h1y = H * 0.44 + Math.cos(t * 0.2) * H * 0.035;
      const h1r = Math.min(W, H) * 0.27;
      const h1rot = t * 0.07;
      const h1a = 0.07 + Math.sin(t * 0.33 + 1) * 0.022;

      polygon(h1x, h1y, h1r, 6, h1rot);
      ctx.strokeStyle = `rgba(195, 112, 76, ${h1a})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      polygon(h1x, h1y, h1r * 0.58, 6, -h1rot * 1.4);
      ctx.strokeStyle = `rgba(195, 112, 76, ${h1a * 0.5})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // ── Rotating diamond (left) ────────────────────────────────
      const d1x = W * 0.21 + Math.sin(t * 0.3 + 2) * W * 0.018;
      const d1y = H * 0.31 + Math.cos(t * 0.24 + 1) * H * 0.04;
      const d1r = Math.min(W, H) * 0.1;
      const d1a = 0.11 + Math.sin(t * 0.42 + 3) * 0.032;

      ctx.save();
      ctx.translate(d1x, d1y);
      ctx.rotate(t * 0.11 + Math.PI / 4);
      ctx.beginPath();
      ctx.moveTo(0, -d1r * 1.35);
      ctx.lineTo(d1r, 0);
      ctx.lineTo(0, d1r * 1.35);
      ctx.lineTo(-d1r, 0);
      ctx.closePath();
      ctx.strokeStyle = `rgba(210, 138, 98, ${d1a})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();

      // ── Small triangle (bottom-right) ─────────────────────────
      const t1x = W * 0.81 + Math.sin(t * 0.19 + 5) * W * 0.014;
      const t1y = H * 0.76 + Math.cos(t * 0.26 + 2) * H * 0.024;
      const t1r = Math.min(W, H) * 0.075;
      const t1a = 0.09 + Math.sin(t * 0.48 + 2) * 0.028;

      polygon(t1x, t1y, t1r, 3, -t * 0.09 - Math.PI / 2);
      ctx.strokeStyle = `rgba(195, 112, 76, ${t1a})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // ── Thin cross-hair lines ─────────────────────────────────
      [[W * 0.08, H * 0.55], [W * 0.5, H * 0.12], [W * 0.44, H * 0.88]].forEach(
        ([lx, ly], i) => {
          const la = 0.06 + Math.sin(t * 0.3 + i * 2) * 0.02;
          const sz = 10 + Math.sin(t * 0.4 + i) * 2;
          ctx.strokeStyle = `rgba(210, 150, 118, ${la})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(lx - sz, ly); ctx.lineTo(lx + sz, ly);
          ctx.moveTo(lx, ly - sz); ctx.lineTo(lx, ly + sz);
          ctx.stroke();
        }
      );

      // ── Floating orbs with glows ──────────────────────────────
      const orbs = [
        { bx: W * 0.53, by: H * 0.14, ox: W * 0.048, oy: H * 0.038, sp: 0.6,  ph: 0,   r: 2.6 },
        { bx: W * 0.11, by: H * 0.62, ox: W * 0.028, oy: H * 0.055, sp: 0.44, ph: 1.5, r: 2.1 },
        { bx: W * 0.89, by: H * 0.5,  ox: W * 0.022, oy: H * 0.04,  sp: 0.52, ph: 3,   r: 2.3 },
        { bx: W * 0.42, by: H * 0.87, ox: W * 0.038, oy: H * 0.028, sp: 0.68, ph: 2,   r: 1.9 },
        { bx: W * 0.76, by: H * 0.18, ox: W * 0.03,  oy: H * 0.045, sp: 0.5,  ph: 4.2, r: 2.0 },
      ];

      const orbPositions = orbs.map((o) => ({
        x: o.bx + Math.cos(t * o.sp + o.ph) * o.ox,
        y: o.by + Math.sin(t * o.sp + o.ph) * o.oy,
        r: o.r,
        alpha: 0.5 + Math.sin(t * 0.75 + o.ph) * 0.18,
      }));

      // Connector lines
      for (let i = 0; i < orbPositions.length; i++) {
        for (let j = i + 1; j < orbPositions.length; j++) {
          const a = orbPositions[i];
          const b = orbPositions[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          const maxD = Math.min(W, H) * 0.5;
          if (dist < maxD) {
            const la = (1 - dist / maxD) * 0.09;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(210, 140, 100, ${la})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Orb renders
      orbPositions.forEach((o) => {
        const gg = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * 5);
        gg.addColorStop(0, `rgba(215, 145, 105, ${o.alpha * 0.38})`);
        gg.addColorStop(1, "rgba(215, 145, 105, 0)");
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = gg;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(225, 162, 122, ${o.alpha})`;
        ctx.fill();
      });

      // ── Soft central ambient glow ─────────────────────────────
      const gcx = W * 0.5 + Math.sin(t * 0.28) * W * 0.018;
      const gcy = H * 0.5 + Math.cos(t * 0.22) * H * 0.028;
      const pulse = 0.5 + Math.sin(t * 0.55) * 0.5;
      const gr = Math.min(W, H) * (0.18 + pulse * 0.04);
      const grd = ctx.createRadialGradient(gcx, gcy, 0, gcx, gcy, gr);
      grd.addColorStop(0, `rgba(195, 112, 76, ${0.055 + pulse * 0.025})`);
      grd.addColorStop(0.5, `rgba(195, 112, 76, ${0.02 + pulse * 0.01})`);
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
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
