"use client";

import { useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ACCENTS } from "@/lib/accents";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import type { Player } from "@/lib/data";
import { EASE_EXPO } from "@/lib/constants";

/**
 * Hero display for the selected player: a floating, pointer-tilted "shirt"
 * panel dominated by the squad number, with a light sweep and accent bloom.
 * Swaps with a 3D crossfade. No image assets required.
 */
export function PlayerStage({ player }: { player: Player }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const accent = ACCENTS[player.accent];

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [9, -9]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 150, damping: 18 });

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
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="relative flex aspect-[4/5] w-full items-center justify-center [perspective:1200px]"
    >
      <div
        className="absolute inset-0 rounded-[2rem] opacity-70 blur-3xl transition-colors duration-700"
        style={{ background: `radial-gradient(circle at 50% 35%, ${accent.glow}, transparent 65%)` }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={player.id}
          initial={{ opacity: 0, rotateY: -28, scale: 0.92 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          exit={{ opacity: 0, rotateY: 22, scale: 0.92 }}
          transition={{ duration: 0.55, ease: EASE_EXPO }}
          style={reduced ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
          className="relative flex h-[86%] w-[78%] flex-col justify-between overflow-hidden rounded-[1.75rem] border border-ink/10 bg-panel p-7 shadow-xl"
        >
          {/* light sweep */}
          <motion.div
            aria-hidden
            className="absolute -inset-y-10 -left-1/3 w-1/3 rotate-12"
            style={{ background: "linear-gradient(90deg, transparent, rgba(12,13,14,0.05), transparent)" }}
            animate={reduced ? undefined : { x: ["0%", "420%"] }}
            transition={{ duration: 3.6, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.4 }}
          />

          <div className="relative flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-ink/45">
              {player.position}
            </span>
            <span className="text-xs font-medium text-ink/45">{player.nation}</span>
          </div>

          {/* giant squad number */}
          <div className="relative flex flex-1 items-center justify-center">
            <span
              className="font-display text-[7rem] font-bold leading-none tracking-tightest sm:text-[10rem] lg:text-[12rem]"
              style={{ color: accent.hex }}
            >
              {player.number}
            </span>
          </div>

          <div className="relative">
            <div className="font-display text-2xl font-bold uppercase tracking-tight text-ink">
              {player.name}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
