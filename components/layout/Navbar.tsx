"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { MenuToggle } from "./MenuToggle";
import { MobileMenu } from "./MobileMenu";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useUIStore } from "@/store/uiStore";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const setCursor = useUIStore((s) => s.setCursor);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    // Hide when scrolling down past the hero, reveal on scroll up.
    setHidden(y > prev && y > 400);
  });

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[64]"
      >
        <div
          className={cn(
            "transition-all duration-500",
            scrolled ? "border-b border-ink/10 glass" : "border-b border-transparent"
          )}
        >
          <Container className="flex h-[72px] items-center justify-between">
            <Logo />

            <nav className="hidden items-center gap-9 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setCursor("hover")}
                  onMouseLeave={() => setCursor("default")}
                  className="group relative text-sm font-medium text-ink/70 transition-colors hover:text-ink"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-blaze transition-all duration-300 ease-expo group-hover:w-full" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <MagneticButton className="hidden px-6 py-2.5 text-sm md:inline-flex">
                Buy tickets
              </MagneticButton>
              <MenuToggle />
            </div>
          </Container>
        </div>
      </motion.header>
      <MobileMenu />
    </>
  );
}
