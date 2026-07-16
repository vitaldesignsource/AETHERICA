import { formatPosition, planetGlyphs, planetLabels } from "@/lib/astrology/mock-adapter";
import type { PlanetPosition } from "@/lib/astrology/types";

export function EphemerisTable({ positions }: { positions: PlanetPosition[] }) {
  return (
    <div className="overflow-x-auto rounded border border-gold/15" data-testid="ephemeris-table">
      <table className="min-w-full border-collapse text-left text-sm">
        <caption className="sr-only">Ephemeris table of planetary positions</caption>
        <thead className="bg-gold/10 text-xs uppercase tracking-[.16em] text-gold">
          <tr>
            <th className="px-3 py-3 font-medium" scope="col">Planet</th>
            <th className="px-3 py-3 font-medium" scope="col">Position</th>
            <th className="px-3 py-3 font-medium" scope="col">Motion</th>
            <th className="px-3 py-3 font-medium" scope="col">Dignity</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gold/10">
          {positions.map((position) => (
            <tr key={position.planet} className="text-parchment">
              <th className="px-3 py-3 font-normal" scope="row">
                <span className="mr-2 text-lg text-gold" aria-hidden="true">{planetGlyphs[position.planet]}</span>
                {planetLabels[position.planet]}
              </th>
              <td className="px-3 py-3 text-ivory">{formatPosition(position)}</td>
              <td className="px-3 py-3">{position.retrograde ? "Retrograde" : "Direct"} • {position.dailyMotion}° / day</td>
              <td className="px-3 py-3 capitalize">{position.dignityLabel ?? "mixed"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
