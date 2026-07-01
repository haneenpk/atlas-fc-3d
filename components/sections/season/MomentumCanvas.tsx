"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * A live "momentum" readout on a 2D canvas: a scrolling wave with a glowing
 * trace, standing in for a season form curve. Cheap (single rAF, no React
 * re-renders) and pauses when scrolled off-screen.
 */
export function MomentumCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const io = new IntersectionObserver(([e]) => (running = e.isIntersecting), { threshold: 0 });
    io.observe(canvas);

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      // faint grid
      ctx.strokeStyle = "rgba(12,13,14,0.06)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // filled area under the trace
      const grad = ctx.createLinearGradient(0, 0, width, 0);
      grad.addColorStop(0, "#FF4A1C");
      grad.addColorStop(1, "#2540FF");

      const pointY = (x: number) =>
        height / 2 -
        (Math.sin(x * 0.02 + t) * 0.5 +
          Math.sin(x * 0.05 + t * 1.6) * 0.3 +
          Math.sin(x * 0.11 + t * 0.6) * 0.2) *
          height *
          0.26;

      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 4) ctx.lineTo(x, pointY(x));
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = "rgba(255,74,28,0.06)";
      ctx.fill();

      // trace line
      ctx.beginPath();
      for (let x = 0; x <= width; x += 4) {
        const y = pointY(x);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "rgba(255,74,28,0.4)";
      ctx.shadowBlur = 14;
      ctx.stroke();
      ctx.shadowBlur = 0;

      if (running && !reduced) t += 0.03;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, [reduced]);

  return <canvas ref={ref} aria-hidden className="h-full w-full" />;
}
