"use client";

import { useRef, createElement } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  /** Stagger unit: words (default) or characters. */
  by?: "word" | "char";
  as?: React.ElementType;
  delay?: number;
  /** When true, plays on mount instead of on scroll (e.g. hero headline). */
  immediate?: boolean;
};

/**
 * Splits text into masked rows of words/chars and reveals them with an
 * overlapping upward stagger. Pure DOM splitting (no paid SplitText plugin)
 * keeps it dependency-light and SSR-friendly — the text is real text.
 */
export function SplitText({
  text,
  className,
  by = "word",
  as = "span",
  delay = 0,
  immediate = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const units = by === "char" ? Array.from(text) : text.split(" ");

  useIsomorphicLayoutEffect(() => {
    if (reduced || !ref.current) return;
    const targets = ref.current.querySelectorAll("[data-split-inner]");

    const ctx = gsap.context(() => {
      gsap.set(targets, { yPercent: 120 });
      gsap.to(targets, {
        yPercent: 0,
        duration: 1,
        ease: "power4.out",
        stagger: 0.045,
        delay,
        scrollTrigger: immediate
          ? undefined
          : { trigger: ref.current, start: "top 85%", once: true },
      });
    }, ref);

    return () => ctx.revert();
  }, [reduced, immediate, delay]);

  return createElement(
    as,
    { ref, className: cn("inline-block", className), "aria-label": text },
    <span aria-hidden className="inline">
      {units.map((unit, i) => (
        <span
          key={i}
          className="inline-flex overflow-hidden align-bottom clip-reveal"
          style={{ paddingRight: by === "word" ? "0.25em" : undefined }}
        >
          <span data-split-inner className="inline-block will-change-transform">
            {unit === " " ? " " : unit}
          </span>
        </span>
      ))}
    </span>
  );
}
