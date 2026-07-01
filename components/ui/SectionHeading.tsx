import { SplitText } from "@/components/animations/SplitText";
import { Reveal } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

/**
 * Shared section header: a numbered kicker + split-reveal title. Kept generic
 * so each section stays visually consistent without copy-pasting markup.
 */
export function SectionHeading({
  index,
  kicker,
  title,
  align = "left",
  className,
}: {
  index: string;
  kicker: string;
  title: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <Reveal>
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-ink/45">
          <span className="font-mono text-blaze">{index}</span>
          <span className="h-px w-8 bg-ink/20" />
          <span>{kicker}</span>
        </div>
      </Reveal>
      <SplitText
        as="h2"
        text={title}
        className="max-w-3xl font-display text-4xl font-bold uppercase leading-[0.98] tracking-tightest text-ink sm:text-5xl lg:text-6xl"
      />
    </div>
  );
}
