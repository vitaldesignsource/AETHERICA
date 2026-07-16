import type { Metadata } from "next";
import Link from "next/link";
import { TextualResourceSuite } from "@/components/resources/TextualResourceSuite";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Hebrew Gematria and Transliteration",
  description: "Render Hebrew letters into a simple study transliteration alongside gematria values."
};

export default function HebrewTransliterationPage() {
  return (
    <Section eyebrow="Resources / Language and number" title="Hebrew Gematria and Transliteration">
      <div className="mb-8 max-w-4xl leading-8 text-parchment">
        <p>Convert Hebrew letters into a simple letter-by-letter study rendering, browse the alphabet table, and move back into gematria analysis without leaving the instrument.</p>
      </div>
      <TextualResourceSuite initialTab="alphabet" />
      <div className="mt-8">
        <Link className="text-sm uppercase tracking-[.2em] text-gold" href="/resources">Back to resources</Link>
      </div>
    </Section>
  );
}
