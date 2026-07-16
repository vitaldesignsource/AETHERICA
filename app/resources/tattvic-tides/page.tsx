import type { Metadata } from "next";
import Link from "next/link";
import { TattvicTidesCalculator } from "@/components/resources/TattvicTidesCalculator";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Tattvic Tides Calculator",
  description: "Calculate primary and sub-tattva tide cycles by date, sunrise method, fixed clock method, or custom starting point."
};

export default function TattvicTidesPage() {
  return (
    <Section eyebrow="Resources / Tattvic tides" title="Tattvic Tides Calculator">
      <div className="mb-8 max-w-4xl leading-8 text-parchment">
        <p>
          This calculator presents the five tattvas as a timing instrument with selectable methods. Use sunrise-based, fixed-clock, or custom-start cycles depending on the convention you are studying.
        </p>
        <p className="mt-3 text-sm text-parchment/80">
          Sources differ on timing conventions, so the active method is always shown with the result. Associations are traditional correspondences, not scientific claims of causation.
        </p>
      </div>
      <TattvicTidesCalculator />
      <div id="learn" className="temple-border mt-8 rounded p-6">
        <p className="text-xs uppercase tracking-[.24em] text-gold">Learn the system</p>
        <h2 className="mt-3 font-display text-3xl text-ivory">How tattvic tides are modeled</h2>
        <p className="mt-3 max-w-4xl leading-7 text-parchment">
          The five tattvas are presented as a repeating elemental sequence. Because source traditions differ, this calculator lets the user choose a sunrise-based cycle, a fixed clock cycle, or a custom starting point, and can show primary tattvas alone or primary-within-subtattva subdivisions.
        </p>
      </div>
      <div className="mt-8">
        <Link className="text-sm uppercase tracking-[.2em] text-gold" href="/resources">Back to resources</Link>
      </div>
    </Section>
  );
}
