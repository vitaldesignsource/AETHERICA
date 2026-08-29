"use client";

import { useMemo, useState } from "react";
import { BookOpen, CircleDot, Library, Network, ScrollText, Users } from "lucide-react";
import { ArchiveWorkbench } from "@/components/topics/dossier/ArchiveWorkbench";
import { TopicChronology } from "@/components/topics/dossier/TopicChronology";
import type { TopicDossier as TopicDossierData } from "@/lib/data/topicDossiers";

export function TopicDossier({ dossier }: { dossier: TopicDossierData }) {
  const [activeTradition, setActiveTradition] = useState(dossier.traditions[0]?.name ?? "");
  const selectedTradition = useMemo(
    () => dossier.traditions.find((tradition) => tradition.name === activeTradition) ?? dossier.traditions[0],
    [activeTradition, dossier.traditions]
  );
  const architectureLabel = dossier.slug === "alchemy" ? "Process Architecture" : "Aeonology / Cosmological Architecture";

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

      <section className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <div className="temple-border rounded bg-black/46 p-5">
          <div className="flex items-center gap-3">
            <Network className="text-gold" size={20} />
            <h2 className="font-display text-3xl text-ivory">Systems and Types</h2>
          </div>
          <div className="mt-5 grid gap-2" role="tablist" aria-label={`${dossier.slug} systems`}>
            {dossier.traditions.map((tradition) => (
              <button
                key={tradition.name}
                type="button"
                onClick={() => setActiveTradition(tradition.name)}
                className={`focus-ring rounded border px-4 py-3 text-left transition ${
                  selectedTradition?.name === tradition.name
                    ? "border-gold bg-gold/14 text-ivory shadow-[inset_0_0_28px_rgba(181,146,85,.08)]"
                    : "border-gold/18 bg-black/30 text-parchment hover:border-gold/45 hover:text-ivory"
                }`}
                role="tab"
                aria-selected={selectedTradition?.name === tradition.name}
              >
                <span className="block font-display text-xl">{tradition.name}</span>
                <span className="mt-1 block text-xs uppercase tracking-[.18em] text-gold/80">{tradition.period}</span>
              </button>
            ))}
          </div>
        </div>

        {selectedTradition ? (
          <article className="relative isolate overflow-hidden rounded border border-gold/25 bg-black/70 p-6 shadow-aureate">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_86%_18%,rgba(181,146,85,.16),transparent_18rem),linear-gradient(135deg,rgba(122,17,26,.14),transparent_46%)]" />
            <p className="text-xs uppercase tracking-[.28em] text-gold">Cosmology / Metaphysics</p>
            <h3 className="mt-3 font-display text-4xl leading-tight text-ivory">{selectedTradition.name}</h3>
            <p className="mt-3 max-w-3xl leading-7 text-parchment">{selectedTradition.summary}</p>
            <div className="mt-6 rounded border border-gold/18 bg-black/40 p-4">
              <p className="text-xs uppercase tracking-[.24em] text-gold">{architectureLabel}</p>
              <div className="mt-4 grid gap-3">
                {selectedTradition.metaphysics.map((item, index) => (
                  <div key={item} className="relative rounded border border-gold/14 bg-black/38 p-3">
                    {index < selectedTradition.metaphysics.length - 1 ? (
                      <span
                        className="absolute left-[1.65rem] top-12 h-5 w-px bg-gradient-to-b from-gold/40 to-transparent"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="flex gap-3">
                      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold/30 bg-gold/10 text-xs font-semibold text-gold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="pt-1 text-sm leading-6 text-parchment">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[.24em] text-gold">Representative Texts</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedTradition.sourceTexts.map((text) => (
                  <span key={text} className="rounded border border-gold/20 px-3 py-1 text-sm text-ivory">
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ) : null}
      </section>

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
