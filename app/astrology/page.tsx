import type { Metadata } from "next";

export { default } from "@/app/resources/celestial-instrument/page";

/**
 * /astrology is an alias for the celestial instrument. It deliberately does not re-export that
 * page's metadata: doing so would copy its title and leave two identical, self-canonical URLs
 * competing. The canonical points at the instrument's own address instead.
 */
export const metadata: Metadata = {
  title: "Astrology",
  description:
    "The Aetherica celestial instrument: chart calculation, dignities, hermetic lots, and an ephemeris for traditional astrological work.",
  alternates: { canonical: "/resources/celestial-instrument" }
};
