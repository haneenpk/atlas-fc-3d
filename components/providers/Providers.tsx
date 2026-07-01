"use client";

import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { MouseGlow } from "@/components/animations/MouseGlow";

/**
 * Single client boundary at the root: smooth scroll, ambient glow and the
 * custom cursor mount once and wrap the (server-rendered) page content.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <MouseGlow />
      <CustomCursor />
      {children}
    </SmoothScrollProvider>
  );
}
