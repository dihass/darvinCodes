"use client";

import { useEffect, useRef } from "react";

interface FlowParticle {
  x: number;
  y: number;
  speed: number;
  life: number;
  maxLife: number;
  colorShift: number; // slight warm/cool variation
  weight: number;     // line width multiplier
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const particlesRef = useRef<FlowParticle[]>([]);
  const sizeRef = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);

    // Flow field angle — layered sine waves for organic, non-repeating motion
    const flowAngle = (x: number, y: number, t: number, w: number, h: number) => {
      const nx = x / w;
      const ny = y / h;
      return (
        Math.sin(nx * 2.8 + t * 0.38) * Math.cos(ny * 3.5 - t * 0.26) * Math.PI * 2.2 +
        Math.cos(nx * 1.7 - t * 0.18) * Math.sin(ny * 2.2 + t * 0.22) * Math.PI * 0.9 +
        Math.sin((nx + ny) * 2.1 - t * 0.14) * Math.PI * 0.4
      );
    };

    const spawn = (w: number, h: number): FlowParticle => ({
      x: Math.random() * w,
      y: Math.random() * h,
      speed: 0.55 + Math.random() * 0.9,
      life: 0,
      maxLife: 160 + Math.random() * 220,
      colorShift: (Math.random() - 0.5) * 30, // ±15 degree hue variation
      weight: Math.random() < 0.12 ? 2.2 : 0.85, // ~12% are thicker accent trails
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      sizeRef.current = { w, h };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      // Warm-tinted clear on resize so no flash
      ctx.fillStyle = "rgb(248, 244, 239)";
      ctx.fillRect(0, 0, w, h);
      // Respawn all particles for new dimensions
      const count = Math.min(Math.floor((w * h) / 5800), 140);
      particlesRef.current = Array.from({ length: count }, () => spawn(w, h));
      // Give them random starting life so they don't all fade in at once
      particlesRef.current.forEach((p) => {
        p.life = Math.random() * p.maxLife;
      });
    };

    const draw = () => {
      timeRef.current += 0.007; // cinematic slow pace
      const t = timeRef.current;
      const { w, h } = sizeRef.current;
      if (!w || !h) { frameRef.current = requestAnimationFrame(draw); return; }

      // Partial clear — slow fade creates persistent trails
      ctx.fillStyle = "rgba(248, 244, 239, 0.038)";
      ctx.fillRect(0, 0, w, h);

      const particles = particlesRef.current;

      particles.forEach((p, i) => {
        const angle = flowAngle(p.x, p.y, t, w, h);
        const px = p.x;
        const py = p.y;

        p.x += Math.cos(angle) * p.speed;
        p.y += Math.sin(angle) * p.speed;
        p.life++;

        // Smooth life arc: fade in and out
        const lifeRatio = p.life / p.maxLife;
        const lifeFade = Math.sin(lifeRatio * Math.PI);

        // Soft edge vignette
        const edgePad = 80;
        const ex = Math.min(p.x / edgePad, (w - p.x) / edgePad, 1);
        const ey = Math.min(p.y / edgePad, (h - p.y) / edgePad, 1);
        const edgeFade = Math.min(ex, ey);

        const opacity = lifeFade * edgeFade * (p.weight > 1 ? 0.22 : 0.28);

        // Warm coral base with slight per-particle color shift
        // Base RGB: (192, 108, 72) — deep peach/coral
        const r = Math.round(192 + p.colorShift * 0.4);
        const g = Math.round(108 - p.colorShift * 0.1);
        const b = Math.round(72 + p.colorShift * 0.3);

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = `rgba(${r},${g},${b},${opacity})`;
        ctx.lineWidth = p.weight;
        ctx.lineCap = "round";
        ctx.stroke();

        // Respawn when life ends or particle drifts out
        if (
          p.life > p.maxLife ||
          p.x < -8 || p.x > w + 8 ||
          p.y < -8 || p.y > h + 8
        ) {
          particles[i] = spawn(w, h);
        }
      });

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
