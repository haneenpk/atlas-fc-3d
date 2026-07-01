"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins exactly once. Importing this module anywhere guarantees
// ScrollTrigger is available without each component re-registering it.
// gsap.registerPlugin is idempotent, so a single guarded call is enough.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
