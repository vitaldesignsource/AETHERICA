import type { Metadata } from "next";
import { Flame } from "lucide-react";
import { ResourcesHub } from "@/components/resources/ResourcesHub";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Resources",
  description: "Aetherica calculators and research instruments for planetary hours, tattvic tides, and traditional correspondences."
};

export default function ResourcesPage() {
  return (
    <Section eyebrow="Aetherica resources" title="Calculators for traditional timing">
      <ResourcesHub />
      <div className="temple-border mt-8 rounded p-6">
        <div className="flex items-center gap-3 text-gold">
          <Flame size={20} />
          <p className="text-xs uppercase tracking-[.24em]">Traditional correspondence note</p>
        </div>
        <p className="mt-3 max-w-4xl leading-7 text-parchment">
          These tools present inherited symbolic timing systems for study, contemplation, and historical practice. Their descriptions are traditional correspondences, not scientific claims of causation.
        </p>
      </div>
    </Section>
  );
}
