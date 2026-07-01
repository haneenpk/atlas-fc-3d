"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlayerStage } from "./squad/PlayerStage";
import { SQUAD } from "@/lib/data";
import { ACCENTS } from "@/lib/accents";
import { useUIStore } from "@/store/uiStore";
import { cn } from "@/lib/utils";

function StatBlock({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="font-display text-3xl font-bold tabular-nums text-ink">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-wide text-ink/45">{label}</div>
    </div>
  );
}

export function Squad() {
  const [active, setActive] = useState(0);
  const player = SQUAD[active];
  const setCursor = useUIStore((s) => s.setCursor);

  return (
    <section id="squad" className="relative border-y border-ink/10 bg-panel py-24 sm:py-32">
      <Container>
        <SectionHeading index="02" kicker="First team" title="Meet the Vanguard." />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* Stage */}
          <div className="order-2 lg:order-1">
            <PlayerStage player={player} />
          </div>

          {/* Selector + stats */}
          <div className="order-1 lg:order-2">
            <ul className="flex flex-col">
              {SQUAD.map((p, i) => {
                const isActive = i === active;
                const accent = ACCENTS[p.accent];
                return (
                  <li key={p.id}>
                    <button
                      onMouseEnter={() => {
                        setActive(i);
                        setCursor("hover");
                      }}
                      onFocus={() => setActive(i)}
                      onMouseLeave={() => setCursor("default")}
                      aria-pressed={isActive}
                      className="group flex w-full items-center justify-between gap-4 border-b border-ink/10 py-4 text-left"
                    >
                      <div className="flex items-baseline gap-4">
                        <span
                          className="w-8 font-mono text-sm tabular-nums transition-colors"
                          style={{ color: isActive ? accent.hex : "rgba(12,13,14,0.3)" }}
                        >
                          {String(p.number).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "font-display text-2xl font-bold uppercase tracking-tight transition-all duration-300 sm:text-3xl",
                            isActive ? "text-ink" : "text-ink/35 group-hover:text-ink/70"
                          )}
                        >
                          {p.name}
                        </span>
                      </div>
                      <span className="text-xs uppercase tracking-widest text-ink/40">
                        {p.position}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 grid grid-cols-3 gap-6 border-t border-ink/10 pt-8"
            >
              <StatBlock label="Appearances" value={player.apps} />
              <StatBlock label="Goals" value={player.goals} />
              <StatBlock label="Assists" value={player.assists} />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
