"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SplitText } from "@/components/animations/SplitText";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useUIStore } from "@/store/uiStore";
import { BRAND, EASE_EXPO } from "@/lib/constants";
import { FiArrowRight, FiCheck } from "react-icons/fi";

/**
 * A bold dark membership CTA block — deliberate contrast against the light
 * page — with an animated conic aurora backdrop instead of a flat gradient.
 */
export function Membership() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const submit = useMagnetic<HTMLButtonElement>({ strength: 0.5 });
  const setCursor = useUIStore((s) => s.setCursor);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSent(true);
  };

  return (
    <section className="relative overflow-hidden bg-ink py-32 text-paper sm:py-44">
      {/* animated aurora backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: "conic-gradient(from 0deg, #FF4A1C, #2540FF, #C9F227, #FF4A1C)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 44, ease: "linear", repeat: Infinity }}
        />
        <div className="absolute inset-0 bg-ink/50" />
      </div>

      <Container className="relative z-10 flex flex-col items-center text-center">
        <span className="mb-6 rounded-full border border-paper/15 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.3em] text-paper/60">
          {BRAND.nickname} membership
        </span>

        <SplitText
          as="h2"
          text="Join the Vanguard."
          by="char"
          className="font-display text-5xl font-bold uppercase leading-[0.9] tracking-tightest text-paper sm:text-6xl lg:text-7xl"
        />

        <p className="mt-6 max-w-md text-pretty text-paper/60">
          Priority ticket ballots, members-only away travel, a vote at the
          supporters&apos; trust and 15% off the club shop. From £3 a month.
        </p>

        <div className="mt-10 w-full max-w-md">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 rounded-full border border-volt/40 bg-volt/10 py-4 text-volt"
              >
                <FiCheck /> Welcome to the Vanguard. Check your inbox.
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE_EXPO }}
                className="group flex flex-col gap-2 rounded-3xl border border-paper/15 bg-paper/[0.04] p-2 transition-colors focus-within:border-paper/40 sm:flex-row sm:items-center sm:rounded-full sm:p-1.5 sm:pl-6"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  aria-label="Email address"
                  className="w-full bg-transparent px-4 py-2 text-sm text-paper placeholder:text-paper/35 focus:outline-none sm:px-0 sm:py-0"
                />
                <button
                  ref={submit.ref}
                  onMouseMove={submit.onMouseMove}
                  onMouseEnter={() => setCursor("hover")}
                  onMouseLeave={() => {
                    submit.onMouseLeave();
                    setCursor("default");
                  }}
                  type="submit"
                  aria-label="Become a member"
                  className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-blaze px-6 text-sm font-semibold text-paper transition-colors hover:bg-blaze/90"
                >
                  Become a member
                  <FiArrowRight className="transition-transform duration-300 group-focus-within:translate-x-0.5" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
