"use client";

import { motion } from "framer-motion";
import { useUIStore } from "@/store/uiStore";

/** Animated hamburger ↔ close button. Two bars morph into an X. */
export function MenuToggle() {
  const open = useUIStore((s) => s.menuOpen);
  const toggle = useUIStore((s) => s.toggleMenu);

  return (
    <button
      onClick={toggle}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="relative z-[66] flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 md:hidden"
    >
      <span className="relative block h-3 w-5">
        <motion.span
          className="absolute left-0 top-0 h-[1.5px] w-full bg-ink"
          animate={open ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.span
          className="absolute bottom-0 left-0 h-[1.5px] w-full bg-ink"
          animate={open ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        />
      </span>
    </button>
  );
}
