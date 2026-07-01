"use client";

import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { BRAND } from "@/lib/constants";
import { useUIStore } from "@/store/uiStore";

const GROUPS = [
  {
    title: "Club",
    links: ["Fixtures & results", "First team", "Academy", "The stadium", "History"],
  },
  {
    title: "Tickets",
    links: ["Match tickets", "Season tickets", "Hospitality", "Away travel"],
  },
  {
    title: "Fans",
    links: ["Membership", "Supporters' trust", "Community", "Contact"],
  },
];

/** Minimal club footer with underline-tracing hover links + a drifting crest. */
export function Footer() {
  const setCursor = useUIStore((s) => s.setCursor);

  return (
    <footer className="relative overflow-hidden border-t border-ink/10 bg-ink pt-20 text-paper">
      <Container>
        <div className="grid gap-12 pb-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-5">
            <span className="font-display text-lg font-bold uppercase tracking-tightest text-paper">
              {BRAND.name}
            </span>
            <p className="max-w-xs text-sm leading-relaxed text-paper/55">
              {BRAND.nickname} · Est. {BRAND.founded}. {BRAND.tagline} A fan-owned
              football club from {BRAND.city}.
            </p>
            <a
              href={`mailto:${BRAND.email}`}
              className="text-sm text-paper/80 hover:text-paper"
            >
              {BRAND.email}
            </a>
          </div>

          {GROUPS.map((group) => (
            <div key={group.title} className="flex flex-col gap-4">
              <h3 className="text-xs uppercase tracking-[0.25em] text-paper/40">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {group.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      onMouseEnter={() => setCursor("hover")}
                      onMouseLeave={() => setCursor("default")}
                      className="group relative inline-block w-fit text-sm text-paper/55 transition-colors hover:text-paper"
                    >
                      {l}
                      <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-paper transition-all duration-300 ease-expo group-hover:w-full" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-paper/10 py-8 text-xs text-paper/40 sm:flex-row">
          <span>© 2026 {BRAND.name}. All rights reserved.</span>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Accessibility"].map((l) => (
              <a key={l} href="#" className="transition-colors hover:text-paper">
                {l}
              </a>
            ))}
          </div>
        </div>
      </Container>

      {/* Oversized crest wordmark that gently anchors the base */}
      <div
        aria-hidden
        className="pointer-events-none select-none text-center font-display text-[24vw] font-bold uppercase leading-none tracking-tightest text-paper/[0.05]"
      >
        {BRAND.name}
      </div>
    </footer>
  );
}
