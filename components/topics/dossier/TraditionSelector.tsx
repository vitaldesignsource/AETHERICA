"use client";

import { useMemo, useState } from "react";
import { Network } from "lucide-react";
import type { TopicDossier } from "@/lib/data/topicDossiers";

type Tradition = TopicDossier["traditions"][number];

/**
 * The one interactive piece of the dossier, split out so the rest of it can stay on the server.
 * While this state lived in TopicDossier, the "use client" boundary pulled ArchiveWorkbench and
 * TopicChronology into the browser bundle even though both are static markup.
 *
 * The buttons deliberately do NOT use role="tab". That pattern promises a tabpanel relationship
 * and Left/Right/Home/End keys; these are plain toggles, and aria-pressed describes them honestly.
 */
export function TraditionSelector({
  traditions,
  architectureLabel,
  slug
}: {
  traditions: Tradition[];
  architectureLabel: string;
  slug: string;
}) {
  const [activeTradition, setActiveTradition] = useState(traditions[0]?.name ?? "");
  const selectedTradition = useMemo(
    () => traditions.find((tradition) => tradition.name === activeTradition) ?? traditions[0],
    [activeTradition, traditions]
  );

  return (
      <section className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <div className="temple-border rounded bg-black/46 p-5">
          <div className="flex items-center gap-3">
            <Network className="text-gold" size={20} />
            <h2 className="font-display text-3xl text-ivory">Systems and Types</h2>
          </div>
          <div className="mt-5 grid gap-2" role="group" aria-label={`${slug} systems`}>
            {traditions.map((tradition) => (
              <button
                key={tradition.name}
                type="button"
                onClick={() => setActiveTradition(tradition.name)}
                className={`focus-ring rounded border px-4 py-3 text-left transition ${
                  selectedTradition?.name === tradition.name
                    ? "border-gold bg-gold/14 text-ivory shadow-[inset_0_0_28px_rgba(181,146,85,.08)]"
                    : "border-gold/18 bg-black/30 text-parchment hover:border-gold/45 hover:text-ivory"
                }`}
                aria-pressed={selectedTradition?.name === tradition.name}
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
  );
}
