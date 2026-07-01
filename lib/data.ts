import type { AccentKey } from "./accents";

/* ------------------------------------------------------------------ */
/* Fixtures & results                                                  */
/* ------------------------------------------------------------------ */

export type Fixture = {
  id: string;
  competition: string;
  opponent: string;
  short: string; // 3-letter opponent code
  home: boolean;
  /** ISO datetime for kickoff (used for the countdown). */
  kickoff: string;
  venue: string;
};

// The next match drives the hero countdown.
export const NEXT_MATCH: Fixture = {
  id: "next",
  competition: "Premier Division · Round 27",
  opponent: "Northgate United",
  short: "NGU",
  home: true,
  kickoff: "2026-07-11T19:45:00",
  venue: "Vanguard Park",
};

export const UPCOMING: Fixture[] = [
  {
    id: "u1",
    competition: "Premier Division",
    opponent: "Cove Rangers",
    short: "COV",
    home: false,
    kickoff: "2026-07-18T15:00:00",
    venue: "Harbour Ground",
  },
  {
    id: "u2",
    competition: "National Cup · QF",
    opponent: "Redwood City",
    short: "RED",
    home: true,
    kickoff: "2026-07-23T20:00:00",
    venue: "Vanguard Park",
  },
];

export type Result = {
  id: string;
  competition: string;
  opponent: string;
  short: string;
  home: boolean;
  us: number;
  them: number;
};

export const RESULTS: Result[] = [
  { id: "r1", competition: "League", opponent: "Ashford Town", short: "ASH", home: true, us: 3, them: 0 },
  { id: "r2", competition: "League", opponent: "Port Vale FC", short: "POR", home: false, us: 2, them: 1 },
  { id: "r3", competition: "Cup", opponent: "Kingsmere", short: "KIN", home: true, us: 4, them: 2 },
  { id: "r4", competition: "League", opponent: "Fenwick City", short: "FEN", home: false, us: 1, them: 1 },
  { id: "r5", competition: "League", opponent: "Marlow Athletic", short: "MAR", home: true, us: 2, them: 0 },
];

/** Compact form guide, most recent last (W/D/L). */
export const FORM: ("W" | "D" | "L")[] = ["W", "W", "W", "D", "W", "L", "W", "W"];

/* ------------------------------------------------------------------ */
/* Squad                                                               */
/* ------------------------------------------------------------------ */

export type Player = {
  id: string;
  name: string;
  number: number;
  position: string;
  nation: string;
  apps: number;
  goals: number;
  assists: number;
  accent: AccentKey;
};

export const SQUAD: Player[] = [
  {
    id: "p1",
    name: "Marco Vittori",
    number: 10,
    position: "Attacking Mid",
    nation: "Italy",
    apps: 31,
    goals: 18,
    assists: 12,
    accent: "blaze",
  },
  {
    id: "p2",
    name: "Diallo Sané",
    number: 9,
    position: "Striker",
    nation: "Senegal",
    apps: 29,
    goals: 24,
    assists: 5,
    accent: "electric",
  },
  {
    id: "p3",
    name: "Kai Andersen",
    number: 4,
    position: "Centre Back",
    nation: "Denmark",
    apps: 33,
    goals: 3,
    assists: 2,
    accent: "volt",
  },
  {
    id: "p4",
    name: "Rui Baptista",
    number: 7,
    position: "Winger",
    nation: "Portugal",
    apps: 27,
    goals: 9,
    assists: 14,
    accent: "blaze",
  },
  {
    id: "p5",
    name: "Owen Hart",
    number: 1,
    position: "Goalkeeper",
    nation: "England",
    apps: 34,
    goals: 0,
    assists: 1,
    accent: "electric",
  },
];

/* ------------------------------------------------------------------ */
/* Season stats                                                        */
/* ------------------------------------------------------------------ */

export type Stat = { value: number; suffix: string; label: string };

export const STATS: Stat[] = [
  { value: 21, suffix: "", label: "Wins this season" },
  { value: 64, suffix: "", label: "Goals scored" },
  { value: 14, suffix: "", label: "Clean sheets" },
  { value: 41, suffix: "k", label: "Average attendance" },
];

/* ------------------------------------------------------------------ */
/* Partners & fans                                                     */
/* ------------------------------------------------------------------ */

export const PARTNERS = [
  "AERO",
  "Northwind Energy",
  "Volt Bank",
  "Harbour Airlines",
  "Kestrel Apparel",
  "Meridian",
  "IronOak",
  "Summit Telecom",
] as const;

export type FanVoice = {
  id: string;
  quote: string;
  name: string;
  since: string;
};

export const FANS: FanVoice[] = [
  {
    id: "f1",
    quote:
      "Forty years in the North Stand and this squad plays with more heart than any side I've watched. Vanguard Park is deafening again.",
    name: "Eddie Marsh",
    since: "Member since 1986",
  },
  {
    id: "f2",
    quote:
      "Took my daughter to her first match against Kingsmere. Four goals, a pitch invasion of joy — she's hooked for life now.",
    name: "Priya Nair",
    since: "Member since 2019",
  },
  {
    id: "f3",
    quote:
      "Away days with the Vanguard are unmatched. Two thousand of us in the corner at Harbour Ground, singing until full time.",
    name: "Callum Reid",
    since: "Member since 2008",
  },
  {
    id: "f4",
    quote:
      "The club finally feels like ours again. Fan-owned decisions, safe standing, and a team that fights for the crest.",
    name: "Sofia Almeida",
    since: "Member since 2015",
  },
];
