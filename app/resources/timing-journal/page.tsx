import type { Metadata } from "next";
import Link from "next/link";
import { PracticalResourceSuite } from "@/components/resources/PracticalResourceSuite";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Astrological Timing Journal",
  description: "A coming-soon private journal for timing observations, elected moments, outcomes, and research notes."
};

export default function TimingJournalPage() {
  return (
    <Section eyebrow="Resources / Research journal" title="Astrological Timing Journal">
      <div className="mb-8 max-w-4xl leading-8 text-parchment">
        <p>The private timing journal will open with the future account system, allowing saved planetary hours, lunar observations, elections, outcomes, and research notes to stay connected to each listener&apos;s archive.</p>
      </div>
      <PracticalResourceSuite kind="timing-journal" />
      <div className="mt-8">
        <Link className="text-sm uppercase tracking-[.2em] text-gold" href="/resources">Back to resources</Link>
      </div>
    </Section>
  );
}
