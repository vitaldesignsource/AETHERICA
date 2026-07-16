const planetaryGlyphs = ["☿", "♃", "☉", "☽", "♄", "♀", "♂"];

type PlanetaryHeptagramProps = {
  className?: string;
};

export function PlanetaryHeptagram({ className = "" }: PlanetaryHeptagramProps) {
  return (
    <div
      className={`relative mx-auto aspect-square w-full max-w-[22rem] ${className}`.trim()}
      aria-hidden="true"
    >
      <div className="about-aether-banner__halo absolute inset-[8%] rounded-full" />
      <div className="about-aether-banner__orbit about-aether-banner__orbit--slow absolute inset-[2%] rounded-full border border-gold/20" />
      <div className="about-aether-banner__orbit about-aether-banner__orbit--medium absolute inset-[13%] rounded-full border border-gold/25" />
      <div className="about-aether-banner__orbit about-aether-banner__orbit--fast absolute inset-[24%] rounded-full border border-crimson/35" />

      <svg className="absolute inset-0 h-full w-full text-gold/70" viewBox="0 0 400 400">
        <path d="M200 68 L328.7 229.4 L142.7 318.9 L96.8 117.7 L303.2 117.7 L257.3 318.9 L71.3 229.4 L200 68 Z" fill="none" stroke="currentColor" strokeWidth="1.15" />
        <path d="M200 68 L257.3 318.9 L96.8 117.7 L328.7 229.4 L71.3 229.4 L303.2 117.7 L142.7 318.9 L200 68 Z" fill="none" stroke="currentColor" strokeWidth=".72" opacity=".42" />
        <path d="M200 68 L303.2 117.7 L328.7 229.4 L257.3 318.9 L142.7 318.9 L71.3 229.4 L96.8 117.7 Z" fill="none" stroke="currentColor" strokeWidth=".55" opacity=".3" />
        <circle cx="200" cy="200" r="112" fill="none" stroke="currentColor" strokeWidth=".9" opacity=".58" />
        <circle cx="200" cy="200" r="154" fill="none" stroke="currentColor" strokeWidth=".65" opacity=".34" />
        <path d="M200 32v336M32 200h336" stroke="currentColor" strokeWidth=".65" opacity=".36" />
        <path d="M86 86 314 314M314 86 86 314" stroke="currentColor" strokeWidth=".5" opacity=".22" />
      </svg>

      <div className="about-aether-banner__sun absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold/55 bg-obsidian/85 text-5xl text-gold shadow-[0_0_42px_rgba(181,146,85,.42)]">
        ☥
      </div>

      {planetaryGlyphs.map((glyph, index) => {
        const angle = (index / planetaryGlyphs.length) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + Math.cos(angle) * 38;
        const y = 50 + Math.sin(angle) * 38;

        return (
          <span
            key={glyph}
            className="about-aether-banner__glyph absolute grid h-10 w-10 place-items-center rounded-full border border-gold/35 bg-obsidian/70 text-2xl text-ivory shadow-[0_0_24px_rgba(181,146,85,.22)]"
            style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
          >
            {glyph}
          </span>
        );
      })}
    </div>
  );
}
