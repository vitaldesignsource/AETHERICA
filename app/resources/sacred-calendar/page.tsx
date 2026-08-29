import type { Metadata } from "next";
import Link from "next/link";
import { PracticalResourceSuite } from "@/components/resources/PracticalResourceSuite";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Sacred Calendar",
  description: "Browse seasonal, liturgical, and symbolic study dates for Aetherica research."
};

export default function SacredCalendarPage() {
  return (
    <Section titleAs="h1" eyebrow="Resources / Calendar" title="Sacred Calendar">
      <div className="mb-8 max-w-4xl leading-8 text-parchment">
        <p>Browse recurring seasonal and liturgical dates as a study calendar for symbolic timing, research planning, and archive notes.</p>
      </div>
      <PracticalResourceSuite kind="sacred-calendar" />
      <div className="mt-8">
        <Link className="text-sm uppercase tracking-[.2em] text-gold" href="/resources">Back to resources</Link>
      </div>
    </Section>
  );
}
