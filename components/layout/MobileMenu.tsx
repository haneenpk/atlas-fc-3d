"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import { useUIStore } from "@/store/uiStore";
import { EASE_EXPO } from "@/lib/constants";

const panel = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  show: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.7, ease: EASE_EXPO, when: "beforeChildren", staggerChildren: 0.07 },
  },
  exit: { clipPath: "inset(0 0 100% 0)", transition: { duration: 0.5, ease: EASE_EXPO } },
};

const item = {
  hidden: { y: 60, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE_EXPO } },
};

/** Full-screen animated menu overlay (mobile / tablet). */
export function MobileMenu() {
  const open = useUIStore((s) => s.menuOpen);
  const setMenu = useUIStore((s) => s.setMenu);

  // Lock scroll while open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={panel}
          initial="hidden"
          animate="show"
          exit="exit"
          className="fixed inset-0 z-[65] flex flex-col justify-between bg-paper px-6 pb-10 pt-28 md:hidden"
        >
          <nav className="flex flex-col">
            {NAV_LINKS.map((link, i) => (
              <div key={link.href} className="overflow-hidden">
                <motion.a
                  variants={item}
                  href={link.href}
                  onClick={() => setMenu(false)}
                  className="flex items-baseline gap-4 border-b border-ink/10 py-5 font-display text-4xl font-bold uppercase tracking-tightest text-ink"
                >
                  <span className="font-mono text-sm text-blaze">
                    0{i + 1}
                  </span>
                  {link.label}
                </motion.a>
              </div>
            ))}
          </nav>
          <motion.div variants={item} className="flex flex-col gap-1 text-sm text-ink/50">
            <span className="uppercase tracking-[0.3em] text-ink/40">Membership</span>
            <a href={`mailto:${BRAND.email}`} className="text-ink/80">
              {BRAND.email}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
