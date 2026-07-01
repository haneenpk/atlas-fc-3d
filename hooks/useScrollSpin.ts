"use client";

import { useFrame } from "@react-three/fiber";
import { lerp } from "@/lib/utils";
import type { RefObject } from "react";
import type * as THREE from "three";

type Options = {
  /** Full turns across the first viewport of scroll. */
  turns?: number;
  /** Resting Y rotation. */
  baseY?: number;
};

/**
 * Drives an object's Y-rotation from scroll (damped) with a faint idle sway.
 * window.scrollY reflects Lenis' smoothed position, so the spin eases with the
 * page. Shared by the procedural and glTF trophies to avoid duplication.
 */
export function useScrollSpin(
  ref: RefObject<THREE.Object3D | null>,
  { turns = 1.4, baseY = 0.2 }: Options = {}
) {
  useFrame((state) => {
    const o = ref.current;
    if (!o) return;
    const t = state.clock.elapsedTime;
    const progress =
      typeof window !== "undefined" ? window.scrollY / window.innerHeight : 0;
    const targetY = baseY + progress * Math.PI * turns + Math.sin(t * 0.35) * 0.05;
    o.rotation.y = lerp(o.rotation.y, targetY, 0.09);
    o.rotation.z = Math.sin(t * 0.4) * 0.015;
  });
}
