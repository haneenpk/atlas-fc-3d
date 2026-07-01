"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FANS } from "@/lib/data";
import { EASE_EXPO } from "@/lib/constants";
import { useUIStore } from "@/store/uiStore";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60, filter: "blur(8px)" }),
  center: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60, filter: "blur(8px)" }),
};

export function FanVoices() {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const setCursor = useUIStore((s) => s.setCursor);
  const fan = FANS[index];

  const paginate = useCallback((step: number) => {
    setState(([i]) => [(i + step + FANS.length) % FANS.length, step]);
  }, []);

  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => paginate(1), 6000);
    return () => clearInterval(id);
  }, [paused, paginate]);

  return (
    <section
      id="fans"
      className="relative border-y border-ink/10 bg-panel py-24 sm:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Container>
        <SectionHeading index="04" kicker="The faithful" title="Voices from the stand." />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="relative min-h-[240px]">
            <span className="pointer-events-none absolute -left-2 -top-12 font-display text-[8rem] leading-none text-blaze/15">
              &ldquo;
            </span>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote
                key={fan.id}
                custom={dir}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: EASE_EXPO }}
                className="relative"
              >
                <p className="max-w-3xl text-pretty font-display text-2xl font-semibold leading-snug tracking-tight text-ink sm:text-3xl lg:text-4xl">
                  {fan.quote}
                </p>
                <footer className="mt-8 flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blaze font-display text-sm font-bold text-paper">
                    {fan.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{fan.name}</span>
                    <span className="block text-sm text-ink/45">{fan.since}</span>
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {[["prev", -1, FiArrowLeft] as const, ["next", 1, FiArrowRight] as const].map(
                ([label, step, Icon]) => (
                  <button
                    key={label}
                    onClick={() => paginate(step)}
                    onMouseEnter={() => setCursor("hover")}
                    onMouseLeave={() => setCursor("default")}
                    aria-label={`${label} supporter quote`}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-ink/50 hover:text-ink"
                  >
                    <Icon size={18} />
                  </button>
                )
              )}
            </div>
            <span className="font-mono text-sm text-ink/40">
              {String(index + 1).padStart(2, "0")} / {String(FANS.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
