import {
  ArrowRight,
  BookOpenCheck,
  Clock3,
  Compass,
  Cross,
  Flame,
  FlaskConical,
  Network,
  Orbit,
  ScrollText,
  Sparkles,
  WandSparkles
} from "lucide-react";
import type { ListeningPath } from "@/lib/data/types";

const pathArt = {
  "foundations-of-hermeticism": {
    Icon: ScrollText,
    SigilIcon: Sparkles,
    motif: "tablet",
    accent: "Hermetic foundation",
    frame: "from-gold/28 via-brass/16 to-black",
    aura:
      "bg-[radial-gradient(circle_at_73%_36%,rgba(181,146,85,.32),transparent_22rem),radial-gradient(circle_at_28%_80%,rgba(231,221,204,.12),transparent_20rem),repeating-linear-gradient(0deg,rgba(181,146,85,.08)_0_1px,transparent_1px_18px)]"
  },
  "the-path-of-the-theurgist": {
    Icon: Flame,
    SigilIcon: Cross,
    motif: "temple",
    accent: "Ritual ascent",
    frame: "from-crimson/36 via-gold/18 to-black",
    aura:
      "bg-[radial-gradient(circle_at_75%_42%,rgba(122,17,26,.48),transparent_20rem),radial-gradient(circle_at_73%_62%,rgba(181,146,85,.34),transparent_16rem)]"
  },
  "alchemy-and-inner-transformation": {
    Icon: FlaskConical,
    SigilIcon: Sparkles,
    motif: "vessel",
    accent: "Inner transformation",
    frame: "from-gold/26 via-crimson/22 to-black",
    aura:
      "bg-[radial-gradient(circle_at_74%_38%,rgba(181,146,85,.36),transparent_20rem),radial-gradient(circle_at_22%_76%,rgba(122,17,26,.36),transparent_22rem)]"
  },
  "martinism-and-reintegration": {
    Icon: Cross,
    SigilIcon: Orbit,
    motif: "return",
    accent: "Repair and return",
    frame: "from-limestone/22 via-gold/18 to-black",
    aura:
      "bg-[radial-gradient(circle_at_72%_40%,rgba(231,221,204,.18),transparent_18rem),radial-gradient(circle_at_74%_54%,rgba(181,146,85,.28),transparent_24rem),linear-gradient(150deg,rgba(122,17,26,.18),transparent_55%)]"
  },
  "the-mysteries-of-symbol": {
    Icon: WandSparkles,
    SigilIcon: Network,
    motif: "constellation",
    accent: "Image and rite",
    frame: "from-brass/28 via-crimson/18 to-black",
    aura:
      "bg-[radial-gradient(circle_at_74%_44%,rgba(181,146,85,.28),transparent_20rem),linear-gradient(135deg,rgba(181,146,85,.13),transparent_38%,rgba(122,17,26,.2))]"
  },
  "astrology-and-cosmic-order": {
    Icon: Orbit,
    SigilIcon: Compass,
    motif: "zodiac",
    accent: "Celestial order",
    frame: "from-stone/34 via-gold/17 to-black",
    aura:
      "bg-[radial-gradient(circle_at_73%_42%,rgba(181,146,85,.3),transparent_21rem),conic-gradient(from_34deg_at_74%_42%,rgba(181,146,85,.24),transparent,rgba(122,17,26,.18),transparent)]"
  },
  "freemasonry-and-initiation": {
    Icon: Compass,
    SigilIcon: BookOpenCheck,
    motif: "lodge",
    accent: "Initiatic architecture",
    frame: "from-limestone/24 via-gold/16 to-black",
    aura:
      "bg-[linear-gradient(90deg,rgba(181,146,85,.12)_1px,transparent_1px),linear-gradient(0deg,rgba(181,146,85,.08)_1px,transparent_1px),radial-gradient(circle_at_74%_44%,rgba(181,146,85,.25),transparent_22rem)] [background-size:34px_34px,34px_34px,auto]"
  }
} as const;

function PathSigil({ motif, compact = false }: { motif: string; compact?: boolean }) {
  const sizeClass = compact ? "right-6 top-1/2 h-56 w-56 -translate-y-1/2 sm:right-12 sm:h-64 sm:w-64 lg:right-20 lg:h-72 lg:w-72" : "right-2 top-1/2 h-80 w-80 -translate-y-1/2";

  if (motif === "zodiac") {
    return (
      <svg className={`absolute ${sizeClass} text-gold/18`} viewBox="0 0 180 180" aria-hidden="true">
        <circle cx="90" cy="90" r="70" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="90" cy="90" r="47" fill="none" stroke="currentColor" strokeWidth=".9" />
        {Array.from({ length: 12 }).map((_, index) => {
          const angle = (index * 30 - 90) * (Math.PI / 180);
          const x1 = 90 + Math.cos(angle) * 48;
          const y1 = 90 + Math.sin(angle) * 48;
          const x2 = 90 + Math.cos(angle) * 70;
          const y2 = 90 + Math.sin(angle) * 70;
          return <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth=".75" />;
        })}
        <ellipse cx="90" cy="90" rx="74" ry="22" fill="none" stroke="currentColor" strokeWidth=".8" transform="rotate(-24 90 90)" />
        <circle cx="90" cy="90" r="7" fill="currentColor" opacity=".32" />
      </svg>
    );
  }

  if (motif === "lodge" || motif === "temple") {
    return (
      <svg className={`absolute ${sizeClass} text-gold/16`} viewBox="0 0 180 180" aria-hidden="true">
        <path d="M30 142 H150 M42 142 V68 L90 34 L138 68 V142" fill="none" stroke="currentColor" strokeWidth="1.3" />
        {[58, 82, 106, 130].map((x) => <path key={x} d={`M${x} 142 V78`} stroke="currentColor" strokeWidth=".9" />)}
        <path d="M48 68 H132 M66 52 H114" stroke="currentColor" strokeWidth=".9" />
        <circle cx="90" cy="96" r="24" fill="none" stroke="currentColor" strokeWidth=".9" />
        <path d="M90 72 V120 M66 96 H114" stroke="currentColor" strokeWidth=".75" />
      </svg>
    );
  }

  if (motif === "return") {
    return (
      <svg className={`absolute ${sizeClass} text-gold/16`} viewBox="0 0 180 180" aria-hidden="true">
        <circle cx="90" cy="90" r="60" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M90 28 V152 M58 64 C72 48 108 48 122 64 M58 116 C72 132 108 132 122 116" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M90 54 V126 M68 90 H112" stroke="currentColor" strokeWidth="1.2" />
        {[38, 58, 90, 122, 142].map((x, index) => <circle key={x} cx={x} cy={[90, 52, 32, 52, 90][index]} r="3" fill="currentColor" opacity=".55" />)}
      </svg>
    );
  }

  if (motif === "constellation") {
    return (
      <svg className={`absolute ${sizeClass} text-gold/18`} viewBox="0 0 180 180" aria-hidden="true">
        <path d="M45 118 L72 72 L106 106 L132 48 M72 72 L132 48 M106 106 L138 132 M45 118 L88 140" fill="none" stroke="currentColor" strokeWidth=".9" />
        {[
          [45, 118],
          [72, 72],
          [106, 106],
          [132, 48],
          [138, 132],
          [88, 140]
        ].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="4" fill="currentColor" opacity=".65" />)}
        <circle cx="90" cy="90" r="62" fill="none" stroke="currentColor" strokeWidth=".7" opacity=".7" />
      </svg>
    );
  }

  return (
    <svg className={`absolute ${sizeClass} text-gold/14`} viewBox="0 0 180 180" aria-hidden="true">
      <path d="M90 24 L142 116 H38 Z" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="90" cy="92" r="44" fill="none" stroke="currentColor" strokeWidth=".9" />
      <path d="M50 116 H130 M90 48 V140" stroke="currentColor" strokeWidth=".8" />
      <circle cx="90" cy="92" r="8" fill="currentColor" opacity=".32" />
    </svg>
  );
}

export function PathCoverArt({ path, compact = false }: { path: ListeningPath; compact?: boolean }) {
  const art = pathArt[path.slug as keyof typeof pathArt] ?? pathArt["foundations-of-hermeticism"];
  const Icon = art.Icon;
  const SigilIcon = art.SigilIcon;
  const lessonLabel = `${path.steps.length} ${path.steps.length === 1 ? "lesson" : "lessons"}`;
  const estimatedMinutes = path.steps.length * 15;

  return (
    <article className={`group relative isolate h-full overflow-hidden rounded-lg border border-gold/35 bg-black/78 shadow-aureate transition duration-300 ${compact ? "min-h-[34rem] p-5 hover:-translate-y-1 hover:border-gold/70 sm:p-7 lg:p-9" : "p-6 sm:p-8 lg:p-10"}`}>
      <div className={`absolute inset-0 -z-30 bg-gradient-to-br ${art.frame}`} />
      <div className={`absolute inset-0 -z-20 ${art.aura} opacity-85 transition duration-500 group-hover:opacity-100`} />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,8,8,.98),rgba(8,8,8,.9)_44%,rgba(8,8,8,.54)_68%,rgba(8,8,8,.22)),radial-gradient(circle_at_70%_46%,rgba(181,146,85,.16),transparent_24rem),radial-gradient(circle_at_18%_18%,rgba(231,221,204,.08),transparent_22rem)]" />
      <div className="pointer-events-none absolute bottom-10 right-12 hidden h-28 w-28 rounded-full border border-gold/12 opacity-45 shadow-[inset_0_0_30px_rgba(181,146,85,.18)] lg:block" />
      <div className="pointer-events-none absolute inset-y-10 right-[43%] hidden w-px bg-gradient-to-b from-transparent via-gold/15 to-transparent lg:block" />
      <PathSigil motif={art.motif} compact={compact} />
      <div className={`absolute hidden place-items-center rounded-full border border-gold/28 bg-black/38 text-gold/60 shadow-[0_0_70px_rgba(181,146,85,.16)] sm:grid ${compact ? "right-8 top-8 size-16 lg:right-12 lg:top-12" : "right-8 top-8 size-28"}`} aria-hidden="true">
        <Icon size={compact ? 31 : 56} strokeWidth={1.1} />
      </div>

      <div className={`relative flex h-full flex-col ${compact ? "min-h-[29rem] max-w-xl lg:max-w-[39rem]" : "min-h-[25rem] max-w-3xl"}`}>
        <div className={`flex flex-wrap items-center gap-3 text-xs uppercase tracking-[.26em] text-gold ${compact ? "" : ""}`}>
          <span>Listening path</span>
          <span className="text-gold/50">+</span>
          <span>{lessonLabel}</span>
        </div>
        <h2 className={`font-cinzel-brand mt-7 text-ivory drop-shadow-[0_2px_18px_rgba(0,0,0,.7)] ${compact ? "text-4xl leading-[.98] sm:text-5xl lg:text-6xl" : "text-5xl leading-none sm:text-7xl"}`}>{path.title}</h2>
        <p className={`mt-7 text-parchment ${compact ? "max-w-md text-lg leading-8 sm:text-xl sm:leading-9" : "text-lg leading-8 sm:text-xl"}`}>{path.summary}</p>

        <div className="mt-auto pt-8">
          <div className="mb-6 flex items-center gap-4 text-gold/75" aria-hidden="true">
            <span className="h-px w-24 bg-gold/40" />
            <SigilIcon size={compact ? 18 : 22} strokeWidth={1.15} />
            <span className="h-px w-36 bg-gradient-to-r from-gold/40 to-transparent" />
          </div>
          {compact ? (
            <div className="mb-6 grid max-w-md grid-cols-3 divide-x divide-gold/15 border-y border-gold/12 py-4 text-gold">
              <div className="flex flex-col gap-2 pr-4">
                <BookOpenCheck size={22} strokeWidth={1.2} />
                <span className="text-xs uppercase tracking-[.18em]">{lessonLabel}</span>
              </div>
              <div className="flex flex-col gap-2 px-4">
                <Clock3 size={22} strokeWidth={1.2} />
                <span className="text-xs uppercase tracking-[.18em]">{estimatedMinutes} min</span>
              </div>
              <div className="flex flex-col gap-2 pl-4">
                <Icon size={22} strokeWidth={1.2} />
                <span className="text-xs uppercase tracking-[.18em]">Archive route</span>
              </div>
            </div>
          ) : null}
          <p className="text-xs uppercase tracking-[.28em] text-gold/80">{art.accent}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {path.topics.map((topic) => (
              <span key={topic} className="rounded border border-gold/30 bg-black/24 px-4 py-2 text-xs uppercase tracking-[.16em] text-parchment">
                {topic}
              </span>
            ))}
          </div>
          {compact ? (
            <div className="mt-7 flex max-w-md items-center justify-between rounded border border-gold/40 bg-black/28 px-6 py-4 text-sm uppercase tracking-[.24em] text-gold shadow-[inset_0_0_24px_rgba(181,146,85,.08)] transition duration-300 group-hover:border-gold/70 group-hover:bg-gold/10 group-hover:text-ivory">
              <span>Enter path</span>
              <ArrowRight size={22} strokeWidth={1.3} />
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
