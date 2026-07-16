"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, BookOpenText, CalendarDays, CircleDot, Clock3, FlaskConical, Gem, Grid3X3, Layers3, Map, Moon, Network, Orbit, Route, Sparkles, Star, Table2, Telescope, Timer, Waves } from "lucide-react";
import { useEffect, useState } from "react";
import {
  activeBlock,
  calculateSolarTimes,
  formatDuration,
  planetaryHours,
  planets,
  tattvas,
  tattvicTides,
  type PlanetName,
  type TattvaName,
  type TimeBlock
} from "./calculations";

function currentDateInput(now: Date) {
  return now.toISOString().slice(0, 10);
}

function currentMinute(now: Date) {
  return now.getHours() * 60 + now.getMinutes();
}

function localTimezoneOffset() {
  return -new Date().getTimezoneOffset() / 60;
}

const modernSources = [
  { name: "Ike Baker", href: "/guests/ike-baker", note: "Aetherica host, author, esoteric teacher" },
  { name: "Benebell Wen", note: "Author, Taoist studies, tarot, I Ching, folk magic" },
  { name: "Jaime Paul Lamb", href: "/guests/jaime-paul-lamb", note: "Freemasonry, astrology, symbolism, initiatic history" },
  { name: "Samuel David", note: "Modern esoteric scholarship and practice" },
  { name: "David Pantano", note: "Western esotericism and initiatic traditions" },
  { name: "Gregory Shaw", note: "Theurgy, Neoplatonism, Iamblichean studies" },
  { name: "Wouter Hanegraaff", note: "Academic study of Western esotericism" },
  { name: "Peter Mark Adams", note: "Esoteric symbolism, mysticism, visual culture" },
  { name: "Daniel Wiseman", href: "/guests/daniel-wiseman", note: "Alchemy, herbalism, Secret Fire Apothecary" },
  { name: "Mark Stavish", note: "Hermeticism, alchemy, esoteric practice" },
  { name: "David Rankine", note: "Grimoires, Qabalah, magic, ritual history" },
  { name: "David Chaim Smith", note: "Kabbalah, mystical symbolism, contemplative art" },
  { name: "Marlene Seven Bremner", note: "Hermeticism, alchemy, esoteric art and philosophy" },
  { name: "John Michael Greer", note: "Occultism, Druidry, esoteric history" },
  { name: "Shannon Grimes", note: "Gnosticism, magic, ancient religion" }
];

const historicalSources = [
  { name: "Heinrich Cornelius Agrippa", note: "Renaissance magic, occult philosophy, correspondences" },
  { name: "Paracelsus", note: "Alchemy, medicine, signatures, natural philosophy" },
  { name: "Plotinus", note: "Neoplatonism, soul, intellect, the One" },
  { name: "Iamblichus", note: "Theurgy, ritual, divine ascent, late Platonism" },
  { name: "Plato", note: "Philosophy, cosmology, forms, soul, initiation myths" }
];

export function ResourcesHub() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  const minute = currentMinute(now);
  const date = new Date(`${currentDateInput(now)}T12:00:00`);
  const timezoneOffset = localTimezoneOffset();
  const latitude = 39.7392;
  const longitude = -104.9903;

  const planetary = planetaryHours(date, latitude, longitude, timezoneOffset);
  const planetaryStatus = activeBlock(planetary.hours, minute);
  const solar = calculateSolarTimes(date, latitude, longitude, timezoneOffset);
  const tides = tattvicTides(solar.sunrise, minute, 24, true);
  const tideStatus = activeBlock(tides, minute);

  return (
    <div className="grid gap-7">
      <ResourcePortal
        kind="planetary"
        title="Planetary Hours"
        href="/resources/planetary-hours"
        learnHref="/resources/planetary-hours#learn"
        eyebrow="Solar hours"
        description="Calculate the unequal planetary hours for your location using local sunrise and sunset."
        currentLabel="Current Hour"
        currentValue={planetaryStatus.current.name}
        secondary={`Ends in ${formatDuration(planetaryStatus.remaining)}`}
        planet={planetaryStatus.current.name}
        blocks={planetary.hours}
        activeIndex={planetaryStatus.current.index}
      />
      <ResourcePortal
        kind="tattvic"
        title="Tattvic Tides"
        href="/resources/tattvic-tides"
        learnHref="/resources/tattvic-tides#learn"
        eyebrow="Elemental tides"
        description="Explore the succession of elemental tides and their subdivisions throughout the day."
        currentLabel="Current Tide"
        currentValue={`${tideStatus.current.name}${tideStatus.current.subName ? ` within ${tideStatus.current.subName}` : ""}`}
        secondary={`Changes in ${formatDuration(tideStatus.remaining)}`}
        tattva={tideStatus.current.name}
        blocks={tides.slice(0, 25)}
        activeIndex={tideStatus.current.index}
      />
      <TreeOfLifePortal />
      <section className="temple-border rounded p-5">
        <div className="flex flex-col gap-3 border-b border-gold/15 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[.26em] text-gold">Cosmological instruments</p>
            <h2 className="font-manuscript-title mt-2 font-display text-4xl text-ivory">Polarity, cycles, and symbolic unfolding</h2>
          </div>
          <Link href="/resources/five-phases" className="inline-flex items-center gap-2 text-sm uppercase tracking-[.18em] text-gold hover:text-ivory">
            Open Wu Xing <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <CelestialToolCard href="/resources/taijitu-polarity" icon={CircleDot} title="Taijitu Polarity Instrument" detail="Explore yin-yang polarity, mutual containment, cycles, Four Images, Five Phases, and the Eight Trigrams" />
          <CelestialToolCard href="/resources/five-phases" icon={Sparkles} title="Five Phases Wheel" detail="Explore Wood, Fire, Earth, Metal, and Water through generating and regulating cycles" />
          <CelestialToolCard href="/resources/bagua" icon={CircleDot} title="Bagua Instrument" detail="Study the Eight Trigrams, Earlier and Later Heaven arrangements, line transformations, and hexagram construction" />
          <CelestialToolCard href="/resources/he-tu-luo-shu" icon={Grid3X3} title="He Tu and Luo Shu" detail="Compare paired numbers, the nine-palace magic square, Five-Phase overlays, and Bagua associations" />
          <CelestialToolCard href="/resources/taoist-cosmology" icon={Map} title="Taoist Cosmology Map" detail="Move through Dao, Wuji, Taiji, yin-yang, Four Images, Five Phases, Eight Trigrams, and manifest form" />
          <CelestialToolCard href="/resources/organ-clock" icon={Clock3} title="Taoist Organ Clock" detail="Study the traditional twelve-period organ-meridian clock as an educational, non-diagnostic model" />
          <CelestialToolCard href="/resources/internal-alchemy" icon={FlaskConical} title="Internal Alchemy Map" detail="Study Neidan terms, Three Treasures, dantian models, Kan and Li, and symbolic refinement without practice instructions" />
          <CelestialToolCard href="/resources/microcosmic-orbit" icon={Route} title="Microcosmic Orbit" detail="Explore front-and-back circulation route diagrams as historical educational models, not medical guidance" />
          <CelestialToolCard href="/resources/taoist-correspondences" icon={Table2} title="Taoist Correspondences" detail="Search phases, organs, trigrams, seasons, directions, symbols, and framework-labeled relationships" />
          <CelestialToolCard href="/resources/meridians" icon={Network} title="Meridian Explorer" detail="Browse twelve primary channels, yin-yang pairs, Five-Phase groupings, and organ-clock links" />
          <CelestialToolCard href="/resources/taoist-symbols" icon={BookOpenText} title="Taoist Symbol Index" detail="Explore symbol records with provenance, review status, copyright notes, and disabled talismanic review rules" />
        </div>
      </section>
      <section className="temple-border rounded p-5">
        <div className="flex flex-col gap-3 border-b border-gold/15 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[.26em] text-gold">Celestial timing instruments</p>
            <h2 className="font-manuscript-title mt-2 font-display text-4xl text-ivory">Moon, mansions, decans, and planetary days</h2>
          </div>
          <Link href="/resources/celestial-timing" className="inline-flex items-center gap-2 text-sm uppercase tracking-[.18em] text-gold hover:text-ivory">
            Open suite <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <CelestialToolCard href="/resources/planetary-day" icon={CalendarDays} title="Planetary Day" detail={`Today: day of ${planetary.ruler}`} />
          <CelestialToolCard href="/resources/celestial-instrument" icon={Telescope} title="Celestial Instrument" detail="Test astrology console for live sky, chart casting, planetary hours, episode timing, and electional gates" />
          <CelestialToolCard href="/resources/moon-phase" icon={Moon} title="Moon Phase" detail="Phase, age, and illumination" />
          <CelestialToolCard href="/resources/lunar-mansions" icon={Star} title="Lunar Mansions" detail="Moon through 28 mansions" />
          <CelestialToolCard href="/resources/decan-calculator" icon={Sparkles} title="Decans" detail="Solar and lunar decan rulers" />
          <CelestialToolCard href="/resources/zodiacal-hours" icon={Timer} title="Zodiacal Hours" detail="Sunrise-based zodiacal periods" />
          <CelestialToolCard href="/resources/election-planner" icon={CalendarDays} title="Election Planner" detail="Compare symbolic timing windows" />
          <CelestialToolCard href="/resources/fixed-stars" icon={Star} title="Fixed Stars" detail="Sun and Moon star contacts" />
          <CelestialToolCard href="/resources/sacred-calendar" icon={BookOpen} title="Sacred Calendar" detail="Seasonal, liturgical, and symbolic study dates" />
          <CelestialToolCard href="/resources/timing-journal" icon={BookOpenText} title="Timing Journal" detail="Save elections, observations, outcomes, and research notes when accounts are available" status="Coming soon with profiles" disabled />
        </div>
      </section>
      <section className="temple-border rounded p-5">
        <div className="flex flex-col gap-3 border-b border-gold/15 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[.26em] text-gold">Qabalistic research instruments</p>
            <h2 className="font-manuscript-title mt-2 font-display text-4xl text-ivory">Tree, paths, names, and correspondences</h2>
          </div>
          <Link href="/resources/tree-of-life" className="inline-flex items-center gap-2 text-sm uppercase tracking-[.18em] text-gold hover:text-ivory">
            Open explorer <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <CelestialToolCard href="/resources/stratified-human" icon={Layers3} title="The Stratified Human" detail="Comparative subtle-body atlas progress is preserved for a future release" status="Coming soon" disabled />
          <CelestialToolCard href="/resources/chakra-observatory" icon={CircleDot} title="Chakra Observatory" detail="Study the seven chakra centers through a standalone subtle-body atlas, mantra panel, layers, and comparative notes" />
          <CelestialToolCard href="/resources/planetary-correspondences" icon={Sparkles} title="Planetary Correspondences" detail="Colors, incenses, metals, activities, and traditional cautions" />
          <CelestialToolCard href="/resources/golden-dawn-correspondences" icon={Sparkles} title="Golden Dawn Correspondences" detail="Planets, elements, Sephiroth, colors, symbols, and system notes" />
          <CelestialToolCard href="/resources/tarot-correspondences" icon={Table2} title="Tarot Correspondence Matrix" detail="Major keys, Hebrew letters, paths, attributions, and table notes" />
        </div>
      </section>
      <section className="temple-border rounded p-5">
        <div className="flex flex-col gap-3 border-b border-gold/15 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[.26em] text-gold">Language and number instruments</p>
            <h2 className="font-manuscript-title mt-2 font-display text-4xl text-ivory">Letters, names, values, and transliteration</h2>
          </div>
          <Link href="/resources/hebrew-letters" className="inline-flex items-center gap-2 text-sm uppercase tracking-[.18em] text-gold hover:text-ivory">
            Open letters <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <CelestialToolCard href="/resources/hebrew-letters" icon={BookOpenText} title="Hebrew Letter Explorer" detail="Curated forms, names, values, Sefer Yetzirah associations, and archive links" />
          <CelestialToolCard href="/resources/gematria" icon={Gem} title="Hebrew Gematria & Transliteration" detail="Calculate Hebrew letter values, study transliteration, and review letter data in one instrument" />
        </div>
      </section>
      <CuratedSourcesSection />
    </div>
  );
}

function CuratedSourcesSection() {
  return (
    <section className="temple-border relative overflow-hidden rounded p-5">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_18%,rgba(181,146,85,.13),transparent_18rem),radial-gradient(circle_at_88%_42%,rgba(122,17,26,.16),transparent_20rem)]" />
      <div className="border-b border-gold/15 pb-5">
        <p className="text-xs uppercase tracking-[.26em] text-gold">Curated source shelf</p>
        <h2 className="font-manuscript-title mt-2 font-display text-4xl text-ivory">Trusted practitioners, authors, and historical sources</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-parchment">
          A living reference list for the Aetherica research library. These names are starting points for study, citation, guest research, and future bibliography pages.
        </p>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_.8fr]">
        <SourceShelf title="Modern practitioners / sources / authors" sources={modernSources} />
        <SourceShelf title="Historical sources" sources={historicalSources} compact />
      </div>
    </section>
  );
}

function SourceShelf({
  title,
  sources,
  compact = false
}: {
  title: string;
  sources: Array<{ name: string; note: string; href?: string }>;
  compact?: boolean;
}) {
  return (
    <div className="rounded border border-gold/18 bg-black/28 p-4">
      <div className="flex items-center gap-3 border-b border-gold/10 pb-3">
        <BookOpenText className="text-gold" size={20} strokeWidth={1.2} />
        <h3 className="font-display text-2xl text-ivory">{title}</h3>
      </div>
      <div className={`mt-4 grid gap-3 ${compact ? "" : "md:grid-cols-2"}`}>
        {sources.map((source) => (
          <SourceEntry key={source.name} source={source} />
        ))}
      </div>
    </div>
  );
}

function SourceEntry({ source }: { source: { name: string; note: string; href?: string } }) {
  const content = (
    <>
      <span className="font-display text-xl leading-tight text-ivory">{source.name}</span>
      <span className="mt-1 block text-sm leading-5 text-parchment">{source.note}</span>
    </>
  );

  if (source.href) {
    return (
      <Link href={source.href} className="group rounded border border-gold/14 bg-black/35 p-3 transition hover:-translate-y-0.5 hover:border-gold/45 hover:bg-gold/10">
        {content}
        <span className="mt-3 inline-flex items-center gap-2 text-[.68rem] uppercase tracking-[.16em] text-gold group-hover:text-ivory">Open profile <ArrowRight size={13} /></span>
      </Link>
    );
  }

  return (
    <div className="rounded border border-gold/14 bg-black/24 p-3">
      {content}
    </div>
  );
}

function CelestialToolCard({
  href,
  icon: Icon,
  title,
  detail,
  status,
  disabled = false
}: {
  href: string;
  icon: typeof Moon;
  title: string;
  detail: string;
  status?: string;
  disabled?: boolean;
}) {
  const content = (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(181,146,85,.16),transparent_9rem)]" />
      <div className="relative">
        <Icon className="text-gold" size={24} strokeWidth={1.25} />
        {status ? <span className="mt-3 inline-flex rounded border border-gold/25 bg-black/40 px-2 py-1 text-[10px] uppercase tracking-[.16em] text-gold">{status}</span> : null}
        <h3 className="mt-4 font-display text-2xl text-ivory">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-parchment">{detail}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[.16em] text-gold group-hover:text-ivory">{disabled ? "Unavailable" : "Open"} <ArrowRight size={14} /></span>
      </div>
    </>
  );

  if (disabled) {
    return (
      <div className="relative overflow-hidden rounded border border-gold/15 bg-black/25 p-4 opacity-85">
        {content}
      </div>
    );
  }

  return (
    <Link href={href} className="group relative overflow-hidden rounded border border-gold/15 bg-black/30 p-4 transition hover:-translate-y-1 hover:border-gold/45 hover:bg-gold/10">
      {content}
    </Link>
  );
}

function TreeOfLifePortal() {
  return (
    <article className="group relative isolate overflow-hidden rounded-lg border border-gold/35 bg-black/78 p-6 shadow-aureate transition duration-300 hover:-translate-y-1 hover:border-gold/70 lg:p-8">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_70%_44%,rgba(181,146,85,.24),transparent_22rem),linear-gradient(120deg,rgba(8,8,8,.95),rgba(122,17,26,.18),rgba(181,146,85,.1))]" />
      <div className="absolute inset-3 -z-20 rounded-md border border-gold/24 shadow-[inset_0_0_0_1px_rgba(231,221,204,.12),inset_0_0_46px_rgba(181,146,85,.08)]" />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="flex min-h-[24rem] flex-col">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs uppercase tracking-[.28em] text-gold">Qabalistic explorer</p>
              <h2 className="font-manuscript-title mt-4 font-display text-5xl leading-none text-ivory sm:text-6xl">Tree of Life Explorer</h2>
            </div>
            <div className="grid size-16 shrink-0 place-items-center rounded-full border border-gold/25 bg-black/35 text-gold">
              <Network size={34} strokeWidth={1.1} />
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-parchment">
            Study Sephiroth, path letters, Tarot keys, planetary attributions, Hebrew names, color scales, and tradition-labeled correspondences in an interactive Tree.
          </p>
          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            <Link href="/resources/tree-of-life" className="focus-ring inline-flex items-center gap-3 rounded border border-gold/45 bg-gold/10 px-5 py-3 text-sm uppercase tracking-[.18em] text-ivory transition hover:bg-gold/20">
              Open Explorer <ArrowRight size={18} />
            </Link>
            <Link href="/resources/tarot-correspondences" className="focus-ring inline-flex items-center gap-3 rounded border border-gold/25 px-5 py-3 text-sm uppercase tracking-[.18em] text-gold transition hover:border-gold/55 hover:text-ivory">
              <Table2 size={18} /> Major-Key Matrix
            </Link>
          </div>
        </div>
        <div className="relative grid aspect-square w-full max-w-[24rem] place-items-center justify-self-center overflow-hidden rounded border border-gold/20 bg-black lg:min-h-[24rem]">
          <Image
            src="/images/resources/tree-of-life-sacred-geometry.jpg"
            alt="Tree of Life set within an overlapping-circle sacred geometry lattice"
            fill
            sizes="(max-width: 1023px) calc(100vw - 4rem), 384px"
            className="object-contain opacity-60 transition duration-700 ease-out group-hover:scale-[1.025] group-hover:opacity-75"
            style={{
              filter: "invert(1) sepia(.55) saturate(.82) hue-rotate(350deg) brightness(.62) contrast(1.4)",
              maskImage: "radial-gradient(circle at center, black 44%, rgba(0,0,0,.86) 70%, transparent 97%)",
              WebkitMaskImage: "radial-gradient(circle at center, black 44%, rgba(0,0,0,.86) 70%, transparent 97%)"
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_40%,rgba(6,5,4,.18)_66%,rgba(6,5,4,.88)_100%),linear-gradient(135deg,rgba(122,17,26,.14),transparent_45%,rgba(181,146,85,.11))]" />
          <div className="pointer-events-none absolute inset-[7%] rounded-full border border-gold/20 shadow-[0_0_42px_rgba(181,146,85,.10),inset_0_0_34px_rgba(181,146,85,.08)] transition duration-700 group-hover:border-gold/35 group-hover:shadow-[0_0_54px_rgba(181,146,85,.18),inset_0_0_42px_rgba(181,146,85,.10)]" />
        </div>
      </div>
    </article>
  );
}

function ResourcePortal({
  kind,
  title,
  href,
  learnHref,
  eyebrow,
  description,
  currentLabel,
  currentValue,
  secondary,
  planet,
  tattva,
  blocks,
  activeIndex
}: {
  kind: "planetary" | "tattvic";
  title: string;
  href: string;
  learnHref: string;
  eyebrow: string;
  description: string;
  currentLabel: string;
  currentValue: string;
  secondary: string;
  planet?: PlanetName;
  tattva?: TattvaName;
  blocks: Array<TimeBlock<PlanetName> | TimeBlock<TattvaName>>;
  activeIndex: number;
}) {
  const Icon = kind === "planetary" ? Orbit : Waves;
  const accent = planet ? planets[planet].color : tattva ? tattvas[tattva].color : "#b59255";
  const glyph = planet ? planets[planet].glyph : tattva ? tattvas[tattva].symbol : "◯";

  return (
    <article className="group relative isolate overflow-hidden rounded-lg border border-gold/35 bg-black/78 p-6 shadow-aureate transition duration-300 hover:-translate-y-1 hover:border-gold/70 lg:p-8">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_74%_44%,rgba(181,146,85,.22),transparent_20rem),linear-gradient(120deg,rgba(122,17,26,.24),transparent_48%,rgba(181,146,85,.12))]" />
      <div className="absolute inset-3 -z-20 rounded-md border border-gold/24 shadow-[inset_0_0_0_1px_rgba(231,221,204,.12),inset_0_0_46px_rgba(181,146,85,.08)]" />
      <div className="absolute inset-6 -z-10 rounded border border-gold/10" />
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="flex min-h-[27rem] flex-col">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs uppercase tracking-[.28em] text-gold">{eyebrow}</p>
              <h2 className="font-manuscript-title mt-4 font-display text-5xl leading-none text-ivory sm:text-6xl">{title}</h2>
            </div>
            <div className="grid size-16 shrink-0 place-items-center rounded-full border border-gold/25 bg-black/35 text-gold">
              <Icon size={34} strokeWidth={1.1} />
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-parchment">{description}</p>

          <div className="mt-8 grid max-w-xl gap-3 rounded border border-gold/20 bg-black/30 p-5 sm:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs uppercase tracking-[.24em] text-gold">{currentLabel}</p>
              <p className="mt-2 font-display text-3xl text-ivory">{currentValue}</p>
              <p className="mt-1 text-sm text-parchment">{secondary}</p>
            </div>
            <div className="grid size-20 place-items-center rounded-full border border-gold/30 text-5xl" style={{ color: accent }}>
              {glyph}
            </div>
          </div>

          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            <Link href={href} className="focus-ring inline-flex items-center gap-3 rounded border border-gold/45 bg-gold/10 px-5 py-3 text-sm uppercase tracking-[.18em] text-ivory transition hover:bg-gold/20">
              Open Calculator <ArrowRight size={18} />
            </Link>
            <Link href={learnHref} className="focus-ring inline-flex items-center gap-3 rounded border border-gold/25 px-5 py-3 text-sm uppercase tracking-[.18em] text-gold transition hover:border-gold/55 hover:text-ivory">
              <BookOpen size={18} /> Learn the System
            </Link>
          </div>
        </div>
        <InstrumentPreview kind={kind} blocks={blocks} activeIndex={activeIndex} accent={accent} glyph={glyph} />
      </div>
    </article>
  );
}

function InstrumentPreview({
  kind,
  blocks,
  activeIndex,
  accent,
  glyph
}: {
  kind: "planetary" | "tattvic";
  blocks: Array<TimeBlock<PlanetName> | TimeBlock<TattvaName>>;
  activeIndex: number;
  accent: string;
  glyph: string;
}) {
  return (
    <div className="relative hidden min-h-[27rem] place-items-center overflow-hidden rounded border border-gold/20 bg-black/30 lg:grid" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(181,146,85,.18),transparent_16rem),linear-gradient(180deg,rgba(231,221,204,.05),transparent)]" />
      <div className="relative grid size-80 place-items-center rounded-full border border-gold/20 bg-black/45 shadow-[0_0_80px_rgba(181,146,85,.12)]">
        <div className="absolute inset-8 rounded-full border border-gold/10" />
        <div className="absolute inset-16 rounded-full border border-gold/10" />
        {blocks.map((block, index) => {
          const angle = (index / blocks.length) * 360 - 90;
          const active = block.index === activeIndex;
          const blockGlyph = kind === "planetary" ? planets[block.name as PlanetName].glyph : tattvas[block.name as TattvaName].symbol;
          const color = active ? accent : "#b59255";
          return (
            <span
              key={`${block.index}-${index}`}
              className="absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border bg-black/80 text-lg"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-134px) rotate(${-angle}deg)`,
                borderColor: active ? accent : "rgba(181,146,85,.2)",
                color,
                boxShadow: active ? `0 0 24px ${accent}` : undefined
              }}
            >
              {blockGlyph}
            </span>
          );
        })}
        <div className="relative grid size-32 place-items-center rounded-full border border-gold/35 bg-black text-center shadow-[0_0_40px_rgba(0,0,0,.55)]">
          <span className="text-6xl" style={{ color: accent }}>{glyph}</span>
        </div>
        <div className="absolute left-1/2 top-1/2 h-[9.5rem] w-px origin-bottom -translate-x-1/2 -translate-y-full bg-gold/60 shadow-[0_0_14px_rgba(181,146,85,.8)] motion-safe:animate-[spin_16s_linear_infinite]" />
      </div>
      <div className="absolute bottom-8 left-8 right-8 flex items-center gap-3 text-xs uppercase tracking-[.22em] text-gold/80">
        <Clock3 size={16} />
        <span>Live preview</span>
      </div>
    </div>
  );
}
