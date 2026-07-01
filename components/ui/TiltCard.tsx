"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
  /** Max tilt in degrees. */
  intensity?: number;
  /** Accent color for the pointer-tracked glow. */
  glow?: string;
};

/**
 * Pointer-reactive 3D tilt with a glow that tracks the cursor across the
 * surface. Rotation is spring-smoothed and disabled under reduced-motion.
 */
export function TiltCard({ className, children, intensity = 8, glow = "rgba(255,74,28,0.20)" }: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [intensity, -intensity]), {
    stiffness: 200,
    damping: 20,
  });
  const ry = useSpring(useTransform(mx, [0, 1], [-intensity, intensity]), {
    stiffness: 200,
    damping: 20,
  });

  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const glowBg = useMotionTemplate`radial-gradient(340px circle at ${glowX} ${glowY}, ${glow}, transparent 70%)`;

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={reduced ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-ink/10 bg-panel shadow-[0_1px_0_rgba(12,13,14,0.04)] [transform-style:preserve-3d]",
        className
      )}
    >
      {/* Cursor-tracked glow */}
      {!reduced && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glowBg }}
        />
      )}
      <div style={{ transform: "translateZ(40px)" }} className="relative h-full">
        {children}
      </div>
    </motion.div>
  );
}
