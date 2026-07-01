"use client";

import { Component, Suspense, type ReactNode } from "react";
import { TrophyModel } from "./TrophyModel";
import { TrophyGLB } from "./TrophyGLB";

/**
 * Renders its children, but swaps to `fallback` if they throw during render
 * (e.g. the glTF file is missing / fails to load). Keeps the hero populated.
 */
class ModelBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/**
 * The hero trophy. Tries the real glTF model first and falls back to the
 * procedural trophy if it isn't present, so the scene never renders empty.
 */
export function Trophy() {
  return (
    <ModelBoundary fallback={<TrophyModel />}>
      <Suspense fallback={null}>
        <TrophyGLB />
      </Suspense>
    </ModelBoundary>
  );
}
