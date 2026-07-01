"use client";

import { motion, type Variants } from "framer-motion";
import { EASE_EXPO } from "@/lib/constants";

type Direction = "up" | "down" | "left" | "right" | "none";

const OFFSET = 36;
const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: OFFSET },
  down: { y: -OFFSET },
  left: { x: OFFSET },
  right: { x: -OFFSET },
  none: {},
};

/**
 * Generic in-view reveal with fade + blur + directional slide. Uses the
 * IntersectionObserver-backed `whileInView` so it never runs off-screen work.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
  as?: "div" | "span" | "li";
}) {
  const MotionTag = motion[as];
  // Transform + opacity only — no `filter: blur`, which would force a repaint
  // on every frame of the animation and stutter during scroll.
  const variants: Variants = {
    hidden: { opacity: 0, ...offsets[direction] },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, ease: EASE_EXPO, delay },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
    >
      {children}
    </MotionTag>
  );
}
