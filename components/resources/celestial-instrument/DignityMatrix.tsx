import { planetGlyphs, planetLabels, signLabels, zodiacGlyphs } from "@/lib/astrology/mock-adapter";
import type { PlanetPosition } from "@/lib/astrology/types";

export function DignityMatrix({ positions }: { positions: PlanetPosition[] }) {
  return (
    <div className="grid gap-2 rounded border border-gold/15 bg-black/30 p-3">
      <p className="text-xs uppercase tracking-[.22em] text-gold">Essential dignity matrix</p>
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {positions.map((position) => (
          <div key={position.planet} className="rounded border border-gold/15 bg-black/30 p-3">
            <p className="text-sm text-ivory">
              <span className="mr-2 text-gold">{planetGlyphs[position.planet]}</span>
              {planetLabels[position.planet]}
            </p>
            <p className="mt-1 text-xs text-parchment">
              {zodiacGlyphs[position.sign]} {signLabels[position.sign]} — {position.dignityLabel ?? "mixed"} ({position.dignityScore ?? 0})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
