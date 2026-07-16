import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { guestConstellations } from "@/lib/data/research";

export const metadata: Metadata = {
  title: "Guest Constellations",
  description: "Visual guest networks by shared topics, books, traditions, and overlaps."
};

export default function ConstellationsPage() {
  return (
    <Section eyebrow="Guest constellations" title="Follow people, books, and traditions">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
        <div className="temple-border relative min-h-[620px] overflow-hidden rounded p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(181,146,85,.18),transparent_34%)]" />
          <svg className="absolute inset-0 size-full opacity-55" viewBox="0 0 100 100" aria-hidden="true">
            {[
              [50, 50, 24, 26],
              [50, 50, 75, 28],
              [50, 50, 22, 75],
              [50, 50, 78, 72],
              [24, 26, 75, 28],
              [22, 75, 78, 72],
              [75, 28, 78, 72]
            ].map(([x1, y1, x2, y2], index) => (
              <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(181,146,85,.5)" strokeWidth=".25" />
            ))}
          </svg>
          {guestConstellations.map((guest, index) => {
            const positions = [
              [50, 50],
              [24, 26],
              [75, 28],
              [22, 75],
              [78, 72]
            ];
            const [left, top] = positions[index] ?? [50, 50];
            return (
              <div
                key={guest.name}
                className="absolute grid size-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold/40 bg-obsidian/90 p-3 text-center shadow-aureate"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <span className="font-display text-lg text-ivory">{guest.name}</span>
                <span className="text-[11px] uppercase tracking-[.12em] text-gold">{guest.traditions[0]}</span>
              </div>
            );
          })}
        </div>
        <div className="grid gap-4">
          {guestConstellations.map((guest) => (
            <article key={guest.name} className="temple-border rounded p-5">
              <h2 className="font-display text-2xl text-ivory">{guest.name}</h2>
              <p className="mt-3 text-sm uppercase tracking-[.16em] text-gold">Traditions</p>
              <p className="mt-2 text-parchment">{guest.traditions.join(", ")}</p>
              <p className="mt-4 text-sm uppercase tracking-[.16em] text-gold">Overlaps</p>
              <p className="mt-2 text-parchment">{guest.overlaps.join(", ")}</p>
              <p className="mt-4 text-sm uppercase tracking-[.16em] text-gold">Book currents</p>
              <p className="mt-2 text-parchment">{guest.books.join(", ")}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
