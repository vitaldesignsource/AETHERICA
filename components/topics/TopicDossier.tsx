/**
 * Server component. The only interactive piece — the tradition selector — lives in its own
 * client child so that this file, ArchiveWorkbench and TopicChronology stay off the client.
 */
import { BookOpen, CircleDot, Library, ScrollText, Users } from "lucide-react";
import { ArchiveWorkbench } from "@/components/topics/dossier/ArchiveWorkbench";
import { TraditionSelector } from "@/components/topics/dossier/TraditionSelector";
import { TopicChronology } from "@/components/topics/dossier/TopicChronology";
import type { TopicDossier as TopicDossierData } from "@/lib/data/topicDossiers";

export function TopicDossier({ dossier }: { dossier: TopicDossierData }) {
  // Named per subject: an alchemical tradition has a process, a gnostic one an aeonology, a
  // theurgic one a rite. The old two-way ternary stamped "Aeonology" on everything non-alchemical.
  const architectureLabels: Record<string, string> = {
    alchemy: "Process Architecture",
    gnosticism: "Aeonology / Cosmological Architecture",
    hermeticism: "Cosmological Architecture",
    theurgy: "Ritual Architecture",
    freemasonry: "Degree Architecture",
    mysticism: "Stations of the Way",
    astrology: "System Architecture"
  };
  const architectureLabel = architectureLabels[dossier.slug] ?? "Cosmological Architecture";

  return (
    <div className="mt-10 space-y-10">
      <section className="grid gap-4 md:grid-cols-3">
        {dossier.lenses.map((lens) => (
          <article key={lens.title} className="temple-border rounded bg-black/42 p-5">
            <p className="text-xs uppercase tracking-[.24em] text-gold">{lens.title}</p>
            <p className="mt-3 text-lg leading-7 text-ivory">{lens.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {lens.points.map((point) => (
                <span key={point} className="rounded border border-gold/20 bg-black/36 px-2 py-1 text-xs text-parchment">
                  {point}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <TraditionSelector
        traditions={dossier.traditions}
        architectureLabel={architectureLabel}
        slug={dossier.slug}
      />

      <section className="temple-border rounded bg-black/46 p-5">
        <div className="flex items-center gap-3">
          <CircleDot className="text-gold" size={20} />
          <h2 className="font-display text-3xl text-ivory">Comparative Architecture</h2>
        </div>
        <p className="mt-3 max-w-4xl leading-7 text-parchment">
          A scanning view of the page&apos;s major systems, with each tradition kept distinct before deeper archive links,
          diagrams, and source notes are added.
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left">
            <thead>
              <tr className="text-xs uppercase tracking-[.2em] text-gold">
                <th className="border-b border-gold/18 px-3 py-3 font-normal">System</th>
                <th className="border-b border-gold/18 px-3 py-3 font-normal">Period</th>
                <th className="border-b border-gold/18 px-3 py-3 font-normal">Architecture</th>
                <th className="border-b border-gold/18 px-3 py-3 font-normal">Texts</th>
              </tr>
            </thead>
            <tbody>
              {dossier.traditions.map((tradition) => (
                <tr key={tradition.name} className="align-top text-sm text-parchment">
                  <td className="border-b border-gold/10 px-3 py-4 font-display text-xl text-ivory">{tradition.name}</td>
                  <td className="border-b border-gold/10 px-3 py-4 text-gold/85">{tradition.period}</td>
                  <td className="border-b border-gold/10 px-3 py-4 leading-6">
                    {tradition.metaphysics.slice(0, 4).join(" -> ")}
                  </td>
                  <td className="border-b border-gold/10 px-3 py-4 leading-6">
                    {tradition.sourceTexts.slice(0, 3).join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <ArchiveWorkbench workbench={dossier.researchWorkbench} />

      <TopicChronology timeline={dossier.timeline} />

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="temple-border rounded bg-black/44 p-5">
          <div className="flex items-center gap-3">
            <Users className="text-gold" size={20} />
            <h2 className="font-display text-3xl text-ivory">Prominent Figures</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {dossier.figures.map((figure) => (
              <article key={figure.name} className="rounded border border-gold/15 bg-black/28 p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-2xl text-ivory">{figure.name}</h3>
                  <p className="text-xs uppercase tracking-[.18em] text-gold">{figure.period}</p>
                </div>
                <p className="mt-2 leading-7 text-parchment">{figure.importance}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="temple-border rounded bg-black/44 p-5">
          <div className="flex items-center gap-3">
            <Library className="text-gold" size={20} />
            <h2 className="font-display text-3xl text-ivory">Source Texts</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {dossier.sourceTexts.map((text) => (
              <article key={text.title} className="rounded border border-gold/15 bg-black/28 p-4">
                <div className="flex gap-3">
                  <BookOpen className="mt-1 shrink-0 text-gold" size={18} />
                  <div>
                    <h3 className="font-display text-2xl text-ivory">{text.title}</h3>
                    <p className="mt-1 text-xs uppercase tracking-[.18em] text-gold">{text.tradition}</p>
                    <p className="mt-2 leading-7 text-parchment">{text.note}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded border border-gold/20 bg-black/36 p-5">
        <div className="flex items-start gap-3">
          <ScrollText className="mt-1 shrink-0 text-gold" size={20} />
          <div>
            <h2 className="font-display text-2xl text-ivory">Editorial Note</h2>
            <p className="mt-2 leading-7 text-parchment">
              This dossier is an Aetherica editorial research layer. It is designed to support deeper pages, archive search,
              future bibliographies, and interactive diagrams. Historical claims, symbolic readings, and modern esoteric
              interpretations should remain clearly labeled as the library expands.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
