"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/animations/Reveal";
import { SplitText } from "@/components/animations/SplitText";
import { Counter } from "@/components/animations/Counter";
import { MomentumCanvas } from "./season/MomentumCanvas";
import { STATS, FORM } from "@/lib/data";
import { EASE_EXPO } from "@/lib/constants";
import { cn } from "@/lib/utils";

const FORM_STYLE: Record<string, string> = {
  W: "bg-volt text-ink",
  D: "bg-ink/10 text-ink/70",
  L: "bg-ink/10 text-ink/40",
};

export function Season() {
  return (
    <section id="season" className="relative py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — statement + stats */}
          <div className="flex flex-col justify-center">
            <Reveal>
              <div className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-ink/45">
                <span className="font-mono text-blaze">03</span>
                <span className="h-px w-8 bg-ink/20" />
                The season
              </div>
            </Reveal>

            <SplitText
              as="h2"
              text="Chasing the treble."
              className="max-w-xl font-display text-4xl font-bold uppercase leading-[0.98] tracking-tightest text-ink sm:text-5xl lg:text-[3.75rem]"
            />

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-pretty leading-relaxed text-ink/60">
                Top of the table, into the cup quarters, and unbeaten at home
                since October. This is the best return in a generation — and
                the North Stand knows it.
              </p>
            </Reveal>

            {/* Form guide */}
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <span className="mr-2 text-xs uppercase tracking-widest text-ink/40">Form</span>
                {FORM.map((f, i) => (
                  <span
                    key={i}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-md font-display text-sm font-bold",
                      FORM_STYLE[f]
                    )}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE_EXPO, delay: i * 0.08 }}
                >
                  <div className="font-display text-5xl font-bold tracking-tightest text-ink">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-2 text-sm text-ink/50">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right — live momentum panel */}
          <Reveal direction="left" className="flex">
            <div className="relative w-full overflow-hidden rounded-2xl border border-ink/10 bg-panel shadow-sm">
              <div className="flex items-center justify-between border-b border-ink/10 px-5 py-3">
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-ink/45">
                  Season momentum
                </span>
                <span className="flex items-center gap-2 text-xs font-medium text-blaze">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blaze" />
                  +9 pts
                </span>
              </div>
              <div className="h-[340px] w-full sm:h-[420px]">
                <MomentumCanvas />
              </div>
              <div className="grid grid-cols-3 divide-x divide-ink/10 border-t border-ink/10 text-center">
                {[
                  ["1st", "League position"],
                  ["2.4", "Goals per game"],
                  ["11", "Home unbeaten"],
                ].map(([v, l]) => (
                  <div key={l} className="px-3 py-4">
                    <div className="font-display text-lg font-bold text-ink">{v}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-wide text-ink/45">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
