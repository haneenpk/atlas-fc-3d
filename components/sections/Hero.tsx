"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { SplitText } from "@/components/animations/SplitText";
import { Container } from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CanvasLoader } from "@/components/three/CanvasLoader";
import { BRAND, EASE_EXPO } from "@/lib/constants";
import { NEXT_MATCH } from "@/lib/data";
import { FiArrowDownRight } from "react-icons/fi";

// The WebGL scene is client-only and code-split; it never blocks first paint.
const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
  loading: () => <CanvasLoader />,
});

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { margin: "200px 0px 200px 0px" });

  const kickoff = new Date(NEXT_MATCH.kickoff);
  const dateLabel = kickoff.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      {/* 3D trophy layer */}
      <div className="absolute inset-0">
        <HeroCanvas active={inView} />
      </div>

      {/* soft paper scrims keep text crisp over the scene */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-paper to-transparent" />

      <Container className="relative z-10 flex min-h-[100svh] flex-col justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: EASE_EXPO }}
          className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.35em] text-ink/50"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-blaze" />
          Est. {BRAND.founded} · {BRAND.nickname}
        </motion.div>

        <h1 className="font-display text-[15vw] font-bold uppercase leading-[0.82] tracking-tightest text-ink sm:text-[12vw] lg:text-[10rem]">
          <SplitText text="Fear" by="word" immediate className="block" />
          <SplitText text="the crest." by="word" immediate delay={0.12} className="block text-blaze" />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9, ease: EASE_EXPO }}
          className="mt-8 max-w-md text-pretty text-base leading-relaxed text-ink/60 sm:text-lg"
        >
          {BRAND.name} — a fan-owned football club from {BRAND.city}, chasing the
          treble with the loudest support in the division.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.9, ease: EASE_EXPO }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton asChildHref="#fixtures">Buy match tickets</MagneticButton>
          <MagneticButton variant="ghost" asChildHref="#squad">
            Meet the squad
            <FiArrowDownRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
          </MagneticButton>
        </motion.div>
      </Container>

      {/* Next-match ribbon pinned to the hero base */}
      <motion.a
        href="#fixtures"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.8, ease: EASE_EXPO }}
        className="absolute inset-x-0 bottom-0 z-10 hidden border-t border-ink/10 bg-panel/70 backdrop-blur-md md:block"
      >
        <Container className="flex items-center justify-between gap-6 py-4 text-sm">
          <span className="flex items-center gap-2 font-medium uppercase tracking-widest text-blaze">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blaze" />
            Next match
          </span>
          <span className="flex items-center gap-3 font-display font-semibold uppercase tracking-tight text-ink">
            {BRAND.name} <span className="text-ink/30">vs</span> {NEXT_MATCH.opponent}
          </span>
          <span className="text-ink/55">
            {dateLabel} · {NEXT_MATCH.venue}
          </span>
          <span className="hidden font-medium text-ink lg:inline">{NEXT_MATCH.competition}</span>
        </Container>
      </motion.a>
    </section>
  );
}
