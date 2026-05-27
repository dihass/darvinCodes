"use client";

import { useEffect, useRef } from "react";

interface Branch {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  lineWidth: number;
  depth: number;
  startMs: number;   // when this branch begins growing
  durationMs: number; // how long it takes to fully grow
  r: number; g: number; b: number; // color
  alpha: number;     // max opacity
}

const HOLD_MS   = 2200;
const FADE_MS   = 1800;

function buildTree(
  branches: Branch[],
  x: number,
  y: number,
  angle: number,
  len: number,
  depth: number,
  startMs: number,
  w: number,
  h: number
): void {
  if (depth > 9 || len < 3.5) return;

  // How long this branch takes to draw — shorter branches draw faster
  const durationMs = Math.max(200, 700 * Math.pow(0.80, depth));

  const endX = x + Math.cos(angle) * len;
  const endY = y + Math.sin(angle) * len;

  // Color shifts from warm coral (trunk) to soft peach (tips)
  const t = Math.min(1, depth / 8);
  const r = Math.round(188 + t * 22);
  const g = Math.round(100 + t * 62);
  const b = Math.round(68  + t * 72);
  const alpha = Math.max(0.12, 0.85 - depth * 0.085);
  const lineWidth = Math.max(0.3, 2.8 - depth * 0.28);

  branches.push({ x1: x, y1: y, x2: endX, y2: endY, lineWidth, depth, startMs, durationMs, r, g, b, alpha });

  const childStart = startMs + durationMs;

  // Organic angle spread — widens slightly deeper into the tree
  const spread   = 0.36 + depth * 0.018;
  const jitterL  = (Math.random() - 0.5) * 0.18;
  const jitterR  = (Math.random() - 0.5) * 0.18;
  const nextLen  = len * (0.64 + Math.random() * 0.08);

  buildTree(branches, endX, endY, angle - spread + jitterL, nextLen, depth + 1, childStart, w, h);
  buildTree(branches, endX, endY, angle + spread + jitterR, nextLen, depth + 1, childStart, w, h);

  // Occasional third tendril for asymmetric richness (~25% of non-deep branches)
  if (depth < 5 && Math.random() < 0.28) {
    const midAngle = angle + (Math.random() - 0.5) * 0.22;
    buildTree(branches, endX, endY, midAngle, nextLen * 0.72, depth + 2, childStart, w, h);
  }
}

function generateCycle(w: number, h: number): { branches: Branch[]; totalGrowMs: number } {
  const branches: Branch[] = [];

  // Root planted ~20% from left edge, ~10% from bottom — feels organic not centered
  const rootX = w * (0.18 + Math.random() * 0.30);
  const rootY = h * (0.92 + Math.random() * 0.06);

  // Trunk angle leans very slightly left or right
  const trunkAngle = -Math.PI / 2 + (Math.random() - 0.5) * 0.22;

  // Trunk length: ~30–38% of canvas height
  const trunkLen = h * (0.30 + Math.random() * 0.08);

  buildTree(branches, rootX, rootY, trunkAngle, trunkLen, 0, 0, w, h);

  // Calculate when the last branch finishes growing
  const totalGrowMs = branches.reduce(
    (max, b) => Math.max(max, b.startMs + b.durationMs),
    0
  );

  return { branches, totalGrowMs };
}

export default function HeroCanvas() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const frameRef   = useRef<number>(0);
  const treeRef    = useRef<Branch[]>([]);
  const cycleRef   = useRef({ startTs: 0, totalGrowMs: 0 });
  const sizeRef    = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      sizeRef.current = { w: rect.width, h: rect.height };
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    const startNewCycle = (ts: number) => {
      const { w, h } = sizeRef.current;
      const { branches, totalGrowMs } = generateCycle(w, h);
      treeRef.current = branches;
      cycleRef.current = { startTs: ts, totalGrowMs };
    };

    const draw = (ts: number) => {
      const { w, h } = sizeRef.current;
      if (!w || !h) { frameRef.current = requestAnimationFrame(draw); return; }

      // Bootstrap first cycle
      if (cycleRef.current.startTs === 0) startNewCycle(ts);

      const { startTs, totalGrowMs } = cycleRef.current;
      const elapsed = ts - startTs;
      const cycleTotal = totalGrowMs + HOLD_MS + FADE_MS;

      // Roll into next cycle
      if (elapsed >= cycleTotal) {
        startNewCycle(ts);
        frameRef.current = requestAnimationFrame(draw);
        return;
      }

      // Global fade-out alpha
      let globalAlpha = 1;
      const fadeStart = totalGrowMs + HOLD_MS;
      if (elapsed > fadeStart) {
        const fp = (elapsed - fadeStart) / FADE_MS;
        // Ease-in fade (accelerates toward end)
        globalAlpha = 1 - fp * fp;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = globalAlpha;
      ctx.lineCap = "round";

      treeRef.current.forEach((b) => {
        const age = elapsed - b.startMs;
        if (age <= 0) return;

        // Ease-out cubic growth
        const raw     = Math.min(1, age / b.durationMs);
        const eased   = 1 - Math.pow(1 - raw, 3);

        const curX = b.x1 + (b.x2 - b.x1) * eased;
        const curY = b.y1 + (b.y2 - b.y1) * eased;

        ctx.beginPath();
        ctx.moveTo(b.x1, b.y1);
        ctx.lineTo(curX, curY);
        ctx.strokeStyle = `rgba(${b.r},${b.g},${b.b},${b.alpha})`;
        ctx.lineWidth   = b.lineWidth;
        ctx.stroke();
      });

      ctx.globalAlpha = 1;
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
