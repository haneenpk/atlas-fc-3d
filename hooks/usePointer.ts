"use client";

import { useEffect, useRef } from "react";

type Pointer = { x: number; y: number };

/**
 * Tracks a normalized pointer position (-1..1 on both axes) in a ref,
 * avoiding re-renders. Ideal for driving 3D camera parallax in useFrame.
 */
export function usePointer() {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return pointer;
}
