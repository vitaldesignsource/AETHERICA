import type { Metadata } from "next";
import { ChakraObservatory } from "@/components/resources/ChakraObservatory";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "The Chakra Observatory | Aetherica",
  description:
    "A standalone interactive chakra and subtle-body research instrument for studying the seven centers, symbolic anatomy, mantra, layers, and comparative mappings.",
  alternates: {
    canonical: "/resources/chakra-observatory"
  }
};

export default function ChakraObservatoryPage() {
  return (
    <Section eyebrow="Resources / Subtle body library" title="The Chakra Observatory">
      <div className="mb-8 max-w-4xl leading-8 text-parchment">
        <p>
          A standalone Aetherica instrument for studying the seven chakras as a symbolic, educational, and comparative
          subtle-body atlas. It is intentionally separate from the Microcosmic Orbit and can later be folded into a larger
          subtle-body library.
        </p>
        <p className="mt-3 text-sm text-parchment/80">
          These correspondences are tradition-labeled and interpretive. The interface avoids treating separate systems as
          exact equivalents.
        </p>
      </div>
      <ChakraObservatory />
    </Section>
  );
}
