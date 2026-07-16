import { signLabels, zodiacGlyphs } from "@/lib/astrology/mock-adapter";
import type { CastChartResult } from "@/lib/astrology/types";

export function HermeticLotsPanel({ result }: { result?: CastChartResult }) {
  const lots = result?.lots ?? [];
  return (
    <div className="rounded border border-gold/15 bg-black/30 p-3">
      <p className="text-xs uppercase tracking-[.22em] text-gold">Hermetic lots</p>
      {lots.length ? (
        <div className="mt-3 grid gap-2">
          {lots.map((lot) => (
            <p key={lot.name} className="rounded border border-gold/10 bg-black/35 px-3 py-2 text-sm text-parchment">
              <span className="text-ivory">{lot.name}</span> • {zodiacGlyphs[lot.sign]} {lot.degree}°{String(lot.minute).padStart(2, "0")}′ {signLabels[lot.sign]}
            </p>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm leading-6 text-parchment/80">Lots require known time and local angles. Check “unknown time” to keep the chart honest without houses or lots.</p>
      )}
    </div>
  );
}
