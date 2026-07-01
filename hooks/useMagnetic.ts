"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "./useReducedMotion";

type Options = {
  /** How far the element travels toward the pointer (0–1 of the offset). */
  strength?: number;
};

/**
 * Attaches a magnetic pull toward the pointer on any element.
 * Returns a ref to spread onto the target and the pointer handlers.
 */
export function useMagnetic<T extends HTMLElement>({ strength = 0.4 }: Options = {}) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    gsap.to(ref.current, { x, y, duration: 0.6, ease: "power3.out" });
  };

  const onMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
  };

  return { ref, onMouseMove, onMouseLeave };
}
