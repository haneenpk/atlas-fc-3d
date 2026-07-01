"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Mounts a single Lenis instance and drives it from GSAP's ticker so that
 * smooth scroll and ScrollTrigger share one clock — the reliable way to avoid
 * the classic "scroll animations lag one frame behind" jank.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      // Higher lerp = tracks the wheel more tightly (less "floaty lag") while
      // still smoothing. 0.1 felt laggy on slow scroll; 0.14 is snappier.
      lerp: 0.14,
      wheelMultiplier: 1,
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // Keep ScrollTrigger in sync with Lenis' virtual scroll position.
    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Route in-page anchor clicks through Lenis so they scroll smoothly
    // instead of hard-jumping.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.2 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}
