"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Marquee } from "@/components/ui/Marquee";
import { useCountdown } from "@/hooks/useCountdown";
import { BRAND, EASE_EXPO } from "@/lib/constants";
import { NEXT_MATCH, UPCOMING, RESULTS, type Fixture } from "@/lib/data";
import { cn } from "@/lib/utils";

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-3xl font-bold tabular-nums tracking-tight text-ink sm:text-4xl lg:text-5xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[9px] uppercase tracking-[0.2em] text-ink/40 sm:text-[10px] sm:tracking-[0.25em]">
        {label}
      </span>
    </div>
  );
}

function HomeAwayBadge({ home }: { home: boolean }) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest",
        home ? "bg-blaze/12 text-blaze" : "bg-electric/12 text-electric"
      )}
    >
      {home ? "Home" : "Away"}
    </span>
  );
}

function UpcomingRow({ fixture }: { fixture: Fixture }) {
  const d = new Date(fixture.kickoff);
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-ink/10 bg-panel p-4">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink font-display text-xs font-bold text-paper">
          {fixture.short}
        </span>
        <div>
          <div className="font-display text-sm font-semibold text-ink">{fixture.opponent}</div>
          <div className="text-xs text-ink/45">{fixture.competition}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium text-ink">
          {d.toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
        </div>
        <HomeAwayBadge home={fixture.home} />
      </div>
    </div>
  );
}

export function Fixtures() {
  const { days, hours, minutes, seconds } = useCountdown(NEXT_MATCH.kickoff);
  const kickoff = new Date(NEXT_MATCH.kickoff);

  return (
    <section id="fixtures" className="relative py-24 sm:py-32">
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading index="01" kicker="Fixtures" title="The road ahead." />
          <p className="max-w-sm text-pretty text-sm leading-relaxed text-ink/55">
            Nine games left, three trophies live. Every kickoff at Vanguard Park
            is a sellout — secure your seat before the ballot closes.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {/* Next match feature */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_EXPO }}
            className="lg:col-span-2"
          >
            <TiltCard intensity={5} className="h-full">
              <div className="flex h-full flex-col justify-between gap-8 p-5 sm:p-9">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-[0.25em] text-ink/45">
                    {NEXT_MATCH.competition}
                  </span>
                  <HomeAwayBadge home={NEXT_MATCH.home} />
                </div>

                <div className="flex items-center justify-center gap-6 sm:gap-10">
                  <div className="flex flex-col items-center gap-2">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blaze font-display text-sm font-bold text-paper">
                      ATL
                    </span>
                    <span className="text-sm font-semibold text-ink">{BRAND.name}</span>
                  </div>
                  <span className="font-display text-2xl font-bold text-ink/25">VS</span>
                  <div className="flex flex-col items-center gap-2">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ink font-display text-sm font-bold text-paper">
                      {NEXT_MATCH.short}
                    </span>
                    <span className="text-sm font-semibold text-ink">{NEXT_MATCH.opponent}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 sm:gap-4 lg:gap-6">
                  <CountdownUnit value={days} label="Days" />
                  <span className="pb-4 font-display text-lg text-ink/20 sm:pb-5 sm:text-2xl">:</span>
                  <CountdownUnit value={hours} label="Hrs" />
                  <span className="pb-4 font-display text-lg text-ink/20 sm:pb-5 sm:text-2xl">:</span>
                  <CountdownUnit value={minutes} label="Min" />
                  <span className="pb-4 font-display text-lg text-ink/20 sm:pb-5 sm:text-2xl">:</span>
                  <CountdownUnit value={seconds} label="Sec" />
                </div>

                <div className="flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-6 sm:flex-row">
                  <span className="text-sm text-ink/55">
                    {kickoff.toLocaleDateString("en-GB", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}{" "}
                    · {kickoff.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} ·{" "}
                    {NEXT_MATCH.venue}
                  </span>
                  <MagneticButton className="px-6 py-2.5 text-sm">Buy tickets</MagneticButton>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Upcoming list */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_EXPO, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-ink/45">
              Also coming up
            </span>
            {UPCOMING.map((f) => (
              <UpcomingRow key={f.id} fixture={f} />
            ))}
            <a
              href="#"
              className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-blaze"
            >
              Full fixture list →
            </a>
          </motion.div>
        </div>

        {/* Recent results ticker */}
        <div className="mt-12 border-y border-ink/10 py-4">
          <Marquee durationSec={30}>
            {RESULTS.map((r) => (
              <span key={r.id} className="flex items-center gap-3 whitespace-nowrap text-sm">
                <span className="text-ink/40">{r.home ? "H" : "A"}</span>
                <span className="font-medium text-ink">{BRAND.name}</span>
                <span
                  className={cn(
                    "rounded-md px-2 py-0.5 font-display font-bold tabular-nums",
                    r.us > r.them
                      ? "bg-volt/25 text-ink"
                      : r.us === r.them
                        ? "bg-ink/8 text-ink/70"
                        : "bg-ink/8 text-ink/50"
                  )}
                >
                  {r.us}–{r.them}
                </span>
                <span className="font-medium text-ink/70">{r.opponent}</span>
                <span className="text-ink/20">/</span>
              </span>
            ))}
          </Marquee>
        </div>
      </Container>
    </section>
  );
}
