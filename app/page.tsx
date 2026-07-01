import { Hero } from "@/components/sections/Hero";
import { Fixtures } from "@/components/sections/Fixtures";
import { Squad } from "@/components/sections/Squad";
import { Season } from "@/components/sections/Season";
import { Partners } from "@/components/sections/Partners";
import { FanVoices } from "@/components/sections/FanVoices";
import { Membership } from "@/components/sections/Membership";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Fixtures />
      <Squad />
      <Season />
      <Partners />
      <FanVoices />
      <Membership />
      <Footer />
    </>
  );
}
