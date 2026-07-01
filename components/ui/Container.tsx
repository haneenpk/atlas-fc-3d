import { cn } from "@/lib/utils";

/** Centered max-width shell with responsive gutters. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-shell px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}
