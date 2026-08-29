import type { Metadata } from "next";
import { CelestialInstrument } from "@/components/resources/CelestialInstrument";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Celestial Instrument",
  description: "Aetherica test astrology instrument for live sky, chart casting, planetary hours, episode timing, and electional gates.",
  // Stated explicitly because /astrology canonicalises to this URL.
  alternates: { canonical: "/resources/celestial-instrument" }
};

export default function CelestialInstrumentPage() {
  return (
    <Section eyebrow="Resources / Celestial instrument" title="Celestial Instrument">
      <div className="mb-8 max-w-4xl leading-8 text-parchment">
        <p>
          A private test module for building a serious astrology instrument connected to the Aetherica archive. The current version uses a mock calculation adapter so the interface, data flow, and Oracle handoff can be tested before a validated ephemeris layer is installed.
        </p>
      </div>
      <CelestialInstrument standalone />
    </Section>
  );
}
