"use client";

/** Minimal shimmer shown while the WebGL bundle + scene initialise. */
export function CanvasLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-24 w-24 animate-spin-slow rounded-full border border-ink/10 border-t-blaze" />
    </div>
  );
}
