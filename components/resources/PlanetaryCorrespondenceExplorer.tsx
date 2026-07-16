"use client";

import { Copy, Save, WandSparkles } from "lucide-react";
import { useState } from "react";
import { planets, type PlanetName } from "./calculations";
import { planetWithCorrespondences, planetaryCorrespondences } from "./textual-correspondences";

const planetOrder: PlanetName[] = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn"];

export function PlanetaryCorrespondenceExplorer() {
  const [planet, setPlanet] = useState<PlanetName>("Mercury");
  const [notice, setNotice] = useState("");
  const correspondence = planetWithCorrespondences(planet);

  async function copySummary() {
    await navigator.clipboard.writeText([
      `${planet} correspondences`,
      `Quality: ${correspondence.quality}`,
      `Colors: ${correspondence.colors.join(", ")}`,
      `Incense: ${correspondence.incense.join(", ")}`,
      `Materials: ${correspondence.materials.join(", ")}`,
      `Activities: ${correspondence.activities.join(", ")}`,
      `Caution: ${correspondence.cautions}`
    ].join("\n"));
    setNotice(`${planet} correspondences copied.`);
  }

  function saveSummary() {
    setNotice("Saved correspondence notes are coming soon with sign up and login.");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[22rem_1fr]">
      <aside className="temple-border rounded p-5">
        <p className="text-xs uppercase tracking-[.24em] text-gold">Planetary reference</p>
        <div className="mt-5 grid gap-2">
          {planetOrder.map((name) => {
            const item = planetWithCorrespondences(name);
            return (
              <button
                key={name}
                className={`focus-ring flex items-center justify-between rounded border px-4 py-3 text-left transition ${planet === name ? "border-gold bg-gold/15 text-ivory" : "border-gold/20 bg-black/20 text-parchment hover:border-gold/50 hover:text-ivory"}`}
                type="button"
                onClick={() => setPlanet(name)}
              >
                <span>
                  <span className="block text-xs uppercase tracking-[.16em] text-gold">{name}</span>
                  <span className="mt-1 block text-sm">{item.activities.slice(0, 2).join(" · ")}</span>
                </span>
                <span className="grid size-11 place-items-center rounded-full border border-gold/20 bg-black/40 text-2xl" style={{ color: item.color }}>
                  {planets[name].glyph}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <button className="rounded border border-gold/30 p-2 text-sm text-gold hover:bg-gold/10" type="button" onClick={copySummary}>
            <Copy className="mr-2 inline" size={15} />Copy
          </button>
          <button className="rounded border border-gold/30 p-2 text-sm text-gold hover:bg-gold/10" type="button" onClick={saveSummary}>
            <Save className="mr-2 inline" size={15} />Save Soon
          </button>
        </div>
        {notice ? <p className="mt-4 rounded border border-gold/15 bg-black/35 px-3 py-2 text-sm text-parchment">{notice}</p> : null}
      </aside>

      <section className="grid gap-5">
        <article className="relative isolate overflow-hidden rounded-lg border border-gold/30 bg-black/75 p-6 shadow-aureate">
          <div className="absolute inset-0 -z-10" style={{ background: `radial-gradient(circle at 82% 18%, ${correspondence.color}44, transparent 18rem), linear-gradient(135deg, rgba(8,8,8,.92), rgba(122,17,26,.13))` }} />
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[.24em] text-gold">Planetary correspondence</p>
              <h2 className="font-manuscript-title mt-3 font-display text-6xl leading-none text-ivory">{planet}</h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-parchment">{correspondence.quality}</p>
            </div>
            <div className="grid size-28 shrink-0 place-items-center rounded-full border border-gold/30 bg-black/40 text-7xl shadow-[0_0_42px_rgba(181,146,85,.12)]" style={{ color: correspondence.color }}>
              {planets[planet].glyph}
            </div>
          </div>
        </article>

        <div className="grid gap-4 lg:grid-cols-2">
          <ReferenceCard label="Colors" items={correspondence.colors} accent={correspondence.color} />
          <ReferenceCard label="Incense" items={correspondence.incense} accent={correspondence.color} />
          <ReferenceCard label="Materials" items={correspondence.materials} accent={correspondence.color} />
          <ReferenceCard label="Activities" items={correspondence.activities} accent={correspondence.color} />
        </div>

        <article className="rounded border border-gold/20 bg-black/35 p-5">
          <div className="flex items-start gap-3 text-gold">
            <WandSparkles className="mt-1 shrink-0" size={20} strokeWidth={1.25} />
            <div>
              <h3 className="font-display text-2xl text-ivory">Traditional Use Note</h3>
              <p className="mt-3 leading-7 text-parchment">{correspondence.cautions}</p>
              <p className="mt-3 text-sm leading-6 text-limestone">
                These are inherited symbolic correspondences for historical, contemplative, and research use. They are presented as traditional associations, not scientific claims of causation.
              </p>
            </div>
          </div>
        </article>

        <article className="rounded border border-gold/20 bg-black/35 p-5">
          <p className="text-xs uppercase tracking-[.22em] text-gold">All planetary glyphs</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {planetaryCorrespondences.map((entry) => {
              const item = planetWithCorrespondences(entry.planet);
              return (
                <button key={entry.planet} type="button" className="rounded border border-gold/15 bg-black/25 p-3 text-left hover:border-gold/45" onClick={() => setPlanet(entry.planet)}>
                  <span className="text-3xl" style={{ color: item.color }}>{planets[entry.planet].glyph}</span>
                  <span className="ml-3 font-display text-xl text-ivory">{entry.planet}</span>
                </button>
              );
            })}
          </div>
        </article>
      </section>
    </div>
  );
}

function ReferenceCard({ label, items, accent }: { label: string; items: string[]; accent: string }) {
  return (
    <article className="relative overflow-hidden rounded border border-gold/20 bg-black/35 p-5">
      <div className="absolute inset-y-0 right-0 w-32 opacity-30" style={{ background: `radial-gradient(circle at 100% 0%, ${accent}, transparent 9rem)` }} />
      <div className="relative">
        <p className="text-xs uppercase tracking-[.22em] text-gold">{label}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {items.map((item) => (
            <span key={item} className="rounded border border-gold/20 bg-black/35 px-3 py-1 text-sm text-parchment">{item}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
