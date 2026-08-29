import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "The Stratified Human | Coming Soon",
  description:
    "The Stratified Human subtle-body atlas is being held for a future Aetherica release while development progress remains preserved.",
  alternates: {
    canonical: "/resources/stratified-human"
  }
};

export default function StratifiedHumanPage() {
  return (
    <Section titleAs="h1" eyebrow="Resources / Coming soon" title="The Stratified Human">
      <div className="temple-border max-w-4xl rounded p-6">
        <p className="text-xs uppercase tracking-[.26em] text-gold">Instrument unavailable for now</p>
        <h2 className="font-manuscript-title mt-4 font-display text-4xl text-ivory">Subtle-body atlas reserved for a future release</h2>
        <p className="mt-5 leading-8 text-parchment">
          The comparative work already developed for this instrument is being kept in the project, but the public route is paused until the surrounding account, source, and research-note systems are ready.
        </p>
        <p className="mt-4 text-sm leading-6 text-limestone">
          When it returns, the instrument will compare esoteric bodies, souls, vehicles, subtle anatomy, confidence levels, references, and tradition-labeled correspondences.
        </p>
        <Link className="focus-ring mt-6 inline-flex rounded border border-gold/40 px-4 py-3 text-sm uppercase tracking-[.18em] text-gold hover:bg-gold/10 hover:text-ivory" href="/resources">
          Back to Resources
        </Link>
      </div>
    </Section>
  );
}
