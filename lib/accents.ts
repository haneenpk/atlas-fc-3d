/** Central accent lookup so cards + glows stay colour-consistent. */
export const ACCENTS = {
  blaze: { hex: "#FF4A1C", glow: "rgba(255,74,28,0.22)", text: "text-blaze" },
  electric: { hex: "#2540FF", glow: "rgba(37,64,255,0.20)", text: "text-electric" },
  volt: { hex: "#C9F227", glow: "rgba(201,242,39,0.28)", text: "text-volt" },
} as const;

export type AccentKey = keyof typeof ACCENTS;
