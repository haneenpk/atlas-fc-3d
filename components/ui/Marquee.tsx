"use client";

import { cn } from "@/lib/utils";

/**
 * Seamless infinite marquee. A single track holds the children twice and
 * translates by -50%, so the seam is invisible. CSS-driven (GPU-friendly),
 * pauses on hover, and respects reduced motion.
 */
export function Marquee({
  children,
  className,
  reverse = false,
  durationSec = 40,
}: {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  durationSec?: number;
}) {
  return (
    <div className={cn("group overflow-hidden", className)}>
      <div
        className="flex w-max will-change-transform group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{
          animation: `marquee-x ${durationSec}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        <div className="flex shrink-0 items-center gap-16 pr-16">{children}</div>
        <div className="flex shrink-0 items-center gap-16 pr-16" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
