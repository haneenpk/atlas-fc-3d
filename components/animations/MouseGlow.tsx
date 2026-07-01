"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SIZE = 620;

/**
 * A soft glow that trails the pointer. It moves a single pre-painted blurred
 * orb via `transform` only (x/y) — the browser composites it on the GPU with
 * no per-frame repaint, so it never competes with scrolling for main-thread
 * time. (Animating a full-screen `background` gradient here would repaint the
 * viewport every frame — the opposite of smooth.)
 */
export function MouseGlow() {
  const reduced = useReducedMotion();
  const x = useMotionValue(-SIZE);
  const y = useMotionValue(-SIZE);
  const sx = useSpring(x, { stiffness: 55, damping: 18, mass: 0.8 });
  const sy = useSpring(y, { stiffness: 55, damping: 18, mass: 0.8 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX - SIZE / 2);
      y.set(e.clientY - SIZE / 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, x, y]);

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 rounded-full"
      style={{
        x: sx,
        y: sy,
        width: SIZE,
        height: SIZE,
        background: "radial-gradient(circle, rgba(255,74,28,0.12), transparent 60%)",
        willChange: "transform",
      }}
    />
  );
}
