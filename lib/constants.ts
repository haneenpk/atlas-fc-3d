/** Club + global constants used across the site. */
export const BRAND = {
  name: "ATLAS FC",
  nickname: "The Vanguard",
  founded: 1904,
  tagline: "Fear the crest.",
  email: "membership@atlasfc.com",
  city: "Rukkor",
} as const;

export const NAV_LINKS = [
  { label: "Fixtures", href: "#fixtures" },
  { label: "Squad", href: "#squad" },
  { label: "Season", href: "#season" },
  { label: "Fans", href: "#fans" },
] as const;

/** Shared expressive easing (mirrors the CSS `ease-expo` token). */
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;
