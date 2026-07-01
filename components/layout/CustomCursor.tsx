"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useUIStore } from "@/store/uiStore";

/**
 * Dual-layer cursor: a small solid dot that tracks the pointer 1:1 and a
 * larger springy ring that lags behind. On fine pointers only; it swaps to
 * a labelled "view" state over interactive 3D targets.
 */
export function CustomCursor() {
  const cursorVariant = useUIStore((s) => s.cursorVariant);
  const cursorLabel = useUIStore((s) => s.cursorLabel);
  const enabled = useRef(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    enabled.current = true;
    document.body.classList.add("custom-cursor");

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      document.body.classList.remove("custom-cursor");
    };
  }, [x, y]);

  const isHover = cursorVariant === "hover";
  const isView = cursorVariant === "view";

  return (
    <>
      {/* Lagging ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden md:block"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/60"
          animate={{
            width: isView ? 84 : isHover ? 56 : 34,
            height: isView ? 84 : isHover ? 56 : 34,
            opacity: cursorVariant === "hidden" ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          <AnimatePresence>
            {isView && cursorLabel && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="flex h-full w-full items-center justify-center text-[10px] font-medium uppercase tracking-widest text-ink"
              >
                {cursorLabel}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Precise dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[71] hidden md:block"
        style={{ x, y }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-blaze"
          animate={{
            width: isView ? 0 : 6,
            height: isView ? 0 : 6,
            opacity: cursorVariant === "hidden" ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        />
      </motion.div>
    </>
  );
}
