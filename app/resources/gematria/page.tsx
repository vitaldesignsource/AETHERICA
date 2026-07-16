import type { Metadata } from "next";
import Link from "next/link";
import { TextualResourceSuite } from "@/components/resources/TextualResourceSuite";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Hebrew Gematria and Transliteration",
  description: "Calculate Hebrew gematria values, transliteration, and letter-by-letter study breakdowns in one instrument."
};

export default function GematriaPage() {
  return (
    <Section eyebrow="Resources / Language and number" title="Hebrew Gematria and Transliteration">
      <div className="mb-8 max-w-4xl leading-8 text-parchment">
        <p>Enter Hebrew text to calculate traditional simple gematria values, study transliteration, and see each letter’s name, sound, and number in one unified instrument.</p>
      </div>
      <TextualResourceSuite initialTab="analysis" />
      <div className="mt-8">
        <Link className="text-sm uppercase tracking-[.2em] text-gold" href="/resources">Back to resources</Link>
      </div>
    </Section>
  );
}
