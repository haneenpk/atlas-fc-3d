import { BRAND } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Wordmark with a small accent glyph. Kept as text for crispness + a11y. */
export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#top"
      className={cn(
        "group inline-flex items-center gap-2 font-display text-lg font-bold uppercase tracking-tightest text-ink",
        className
      )}
      aria-label={`${BRAND.name} home`}
    >
      <span className="relative flex h-3 w-3">
        <span className="absolute inset-0 rotate-45 bg-blaze transition-transform duration-500 group-hover:rotate-[225deg]" />
      </span>
      {BRAND.name}
    </a>
  );
}
