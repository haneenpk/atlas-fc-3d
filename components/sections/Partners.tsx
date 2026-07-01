"use client";

import { Marquee } from "@/components/ui/Marquee";
import { Container } from "@/components/ui/Container";
import { PARTNERS } from "@/lib/data";

function PartnerMark({ name }: { name: string }) {
  return (
    <span className="cursor-default select-none whitespace-nowrap font-display text-2xl font-bold uppercase tracking-tight text-ink/25 transition-colors duration-300 hover:text-ink sm:text-3xl">
      {name}
    </span>
  );
}

/** Two counter-scrolling rows of club partners. Dimmed by default, lift on hover. */
export function Partners() {
  const half = Math.ceil(PARTNERS.length / 2);
  const rowA = PARTNERS.slice(0, half);
  const rowB = PARTNERS.slice(half);

  return (
    <section className="relative overflow-hidden py-20">
      <Container>
        <p className="mb-10 text-center text-xs font-medium uppercase tracking-[0.35em] text-ink/40">
          Proudly backed by our official club partners
        </p>
      </Container>

      <div className="flex flex-col gap-6">
        <Marquee durationSec={36}>
          {rowA.map((b) => (
            <PartnerMark key={b} name={b} />
          ))}
        </Marquee>
        <Marquee durationSec={44} reverse>
          {rowB.map((b) => (
            <PartnerMark key={b} name={b} />
          ))}
        </Marquee>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper to-transparent sm:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper to-transparent sm:w-40" />
    </section>
  );
}
