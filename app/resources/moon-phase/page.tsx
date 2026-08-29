import type { Metadata } from "next";
import Link from "next/link";
import { CelestialTimingSuite } from "@/components/resources/CelestialTimingSuite";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { resolveSiteImage } from "@/lib/images";

export const metadata: Metadata = {
  title: "Moon Phase Tracker",
  description: "View approximate lunar phase, illumination, lunar age, and upcoming full and new moons.",
  alternates: { canonical: "/resources/moon-phase" }
};

export default function MoonPhasePage() {
  const hero = resolveSiteImage("/images/resources/moon-flask");

  return (
    <>
      <PageHero
        eyebrow="Resources / Celestial timing"
        title="Moon Phase Tracker"
        lede="Phase, illumination, lunar age, and the next full and new moon for any moment you choose."
        imageSrc={hero}
        imageAlt="A full moon sealed inside a caged glass flask bound in tarnished brass"
        focus="62% 46%"
      />
    <Section eyebrow="Reading the lunation" title="Phase, age, and illumination">
      <div className="mb-8 max-w-4xl leading-8 text-parchment">
        <p>Track the approximate lunar phase, illumination, lunar age, and the next full and new moon for a selected date and time.</p>
      </div>
      <CelestialTimingSuite initialTab="moon-phase" />
      <div className="mt-8">
        <Link className="text-sm uppercase tracking-[.2em] text-gold" href="/resources">Back to resources</Link>
      </div>
    </Section>
    </>
  );
}
