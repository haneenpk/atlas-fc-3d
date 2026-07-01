"use client";

import { forwardRef } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { useUIStore } from "@/store/uiStore";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "ghost";
  strength?: number;
  asChildHref?: string;
};

/**
 * Magnetic, cursor-aware button. The label rides slightly harder than the
 * shell for a layered pull, and it drives the custom cursor's hover state.
 */
export const MagneticButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, children, variant = "solid", strength = 0.4, asChildHref, ...props }, _ref) => {
    const shell = useMagnetic<HTMLButtonElement>({ strength });
    const label = useMagnetic<HTMLSpanElement>({ strength: strength * 0.5 });
    const setCursor = useUIStore((s) => s.setCursor);

    const base = cn(
      "group relative inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold tracking-tight transition-colors duration-300",
      variant === "solid"
        ? "bg-ink text-paper hover:bg-blaze"
        : "border border-ink/20 text-ink hover:border-ink/60",
      className
    );

    const content = (
      <span
        ref={label.ref}
        onMouseMove={label.onMouseMove}
        onMouseLeave={label.onMouseLeave}
        className="pointer-events-none relative z-10 inline-flex items-center gap-2"
      >
        {children}
      </span>
    );

    const handlers = {
      onMouseMove: shell.onMouseMove,
      onMouseEnter: () => setCursor("hover"),
      onMouseLeave: () => {
        shell.onMouseLeave();
        setCursor("default");
      },
    };

    if (asChildHref) {
      return (
        <a href={asChildHref} className={base} ref={shell.ref as never} {...handlers}>
          {content}
        </a>
      );
    }

    return (
      <button className={base} ref={shell.ref} {...handlers} {...props}>
        {content}
      </button>
    );
  }
);

MagneticButton.displayName = "MagneticButton";
