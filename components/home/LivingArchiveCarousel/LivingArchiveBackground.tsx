import type { LivingArchiveTheme } from "./types";

const themeGlow: Record<LivingArchiveTheme, string> = {
  crimson: "from-crimson/55 via-gold/16 to-transparent",
  gold: "from-gold/40 via-brass/20 to-transparent",
  celestial: "from-stone/45 via-gold/12 to-transparent",
  alchemical: "from-burgundy/55 via-gold/18 to-transparent",
  stone: "from-limestone/24 via-crimson/24 to-transparent"
};

export function LivingArchiveBackground({ theme = "crimson", rotation = 0 }: { theme?: LivingArchiveTheme; rotation?: number }) {
  return (
    <div className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(181,146,85,.12),transparent_34rem),radial-gradient(circle_at_18%_68%,rgba(122,17,26,.2),transparent_24rem),linear-gradient(180deg,rgba(8,8,8,.12),rgba(8,8,8,.72))] opacity-80" />
      <div className={`absolute left-1/2 top-1/2 aspect-square w-[84rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br ${themeGlow[theme]} blur-3xl`} />
      <div
        className="absolute left-1/2 top-1/2 aspect-square w-[54rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/10 opacity-75 transition-transform duration-700 motion-reduce:transform-none"
        style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
      >
        <div className="absolute inset-8 rounded-full border border-gold/10" />
        <div className="absolute inset-20 rounded-full border border-crimson/20" />
        <div className="absolute inset-32 rounded-full border border-gold/10" />
        {Array.from({ length: 16 }).map((_, index) => (
          <span
            key={index}
            className="absolute left-1/2 top-1/2 h-[48%] w-px origin-bottom bg-gradient-to-t from-gold/18 to-transparent"
            style={{ transform: `translate(-50%, -100%) rotate(${index * 22.5}deg)` }}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-obsidian via-obsidian/70 to-transparent" />
    </div>
  );
}
