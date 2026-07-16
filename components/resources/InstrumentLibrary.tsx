import {
  BookOpenText,
  CalendarDays,
  CircleDot,
  FlaskConical,
  Gem,
  Grid3X3,
  Languages,
  Map,
  Moon,
  Network,
  Orbit,
  Route,
  ScrollText,
  Sparkles,
  Star,
  SunMoon,
  Table2,
  Timer,
  WandSparkles
} from "lucide-react";
import Link from "next/link";

const resourceGroups = [
  {
    title: "Cosmological Instruments",
    description: "Interactive diagrams for polarity, symbolic cycles, elemental models, and cosmological unfolding.",
    tools: [
      {
        title: "Taijitu Polarity Instrument",
        icon: CircleDot,
        status: "Available",
        href: "/resources/taijitu-polarity",
        description: "Explore yin-yang polarity, mutual containment, transformation cycles, Four Images, Five Phases, and the Eight Trigrams."
      },
      {
        title: "Wu Xing Instrument",
        icon: Sparkles,
        status: "Available",
        href: "/resources/five-phases",
        description: "Explore Five Phases relationships, generating and regulating cycles, seasonal models, correspondences, and historical frameworks."
      },
      {
        title: "Bagua Instrument",
        icon: CircleDot,
        status: "Available",
        href: "/resources/bagua",
        description: "Explore the Eight Trigrams, line construction, Earlier Heaven and Later Heaven arrangements, transformations, and hexagram structure."
      },
      {
        title: "He Tu and Luo Shu Comparator",
        icon: Grid3X3,
        status: "Available",
        href: "/resources/he-tu-luo-shu",
        description: "Compare the River Diagram and Luo River Writing through number pairs, nine-palace sums, Five-Phase overlays, and Bagua associations."
      },
      {
        title: "Taoist Cosmology Map",
        icon: Map,
        status: "Available",
        href: "/resources/taoist-cosmology",
        description: "Explore Dao, Wuji, Taiji, yin-yang, Four Images, Five Phases, Eight Trigrams, and manifested multiplicity."
      },
      {
        title: "Taoist Organ Clock",
        icon: Timer,
        status: "Available",
        href: "/resources/organ-clock",
        description: "Study the received twelve-period organ-meridian clock with Five-Phase pairings, journal notes, and medical-safety framing."
      },
      {
        title: "Internal Alchemy Map",
        icon: FlaskConical,
        status: "Available",
        href: "/resources/internal-alchemy",
        description: "Explore Neidan terminology, Three Treasures, dantian models, furnace and cauldron imagery, Kan and Li, and refinement cycles."
      },
      {
        title: "Microcosmic Orbit Diagram",
        icon: Route,
        status: "Available",
        href: "/resources/microcosmic-orbit",
        description: "Study front-and-back circulation-route diagrams, regions, and pathway models with explicit cautions."
      },
      {
        title: "Taoist Correspondence Matrix",
        icon: Table2,
        status: "Available",
        href: "/resources/taoist-correspondences",
        description: "Search and compare framework-labeled relationships among phases, seasons, organs, symbols, directions, and texts."
      },
      {
        title: "Meridian and Element Explorer",
        icon: Network,
        status: "Available",
        href: "/resources/meridians",
        description: "Browse twelve primary channels, pairings, yin-yang classifications, Five-Phase groups, and organ-clock sequence links."
      },
      {
        title: "Taoist Symbol Index",
        icon: BookOpenText,
        status: "Available",
        href: "/resources/taoist-symbols",
        description: "A provenance-focused symbol library with review status, copyright notes, variants, and talismanic publishing safeguards."
      }
    ]
  },
  {
    title: "Celestial Timing",
    description: "Calendrical and astronomical timing instruments for lunar, solar, zodiacal, and stellar work.",
    tools: [
      {
        title: "Lunar Mansion Calculator",
        icon: Moon,
        status: "Available",
        href: "/resources/lunar-mansions",
        description: "Locate the Moon within the lunar mansions and surface traditional mansion correspondences."
      },
      {
        title: "Moon Phase and Void-of-Course Tracker",
        icon: SunMoon,
        status: "Available",
        href: "/resources/moon-phase",
        description: "Track lunar phase, illumination, sign changes, and void-of-course windows."
      },
      {
        title: "Planetary Day Calculator",
        icon: Orbit,
        status: "Available",
        href: "/resources/planetary-day",
        description: "Show the traditional planetary ruler of any selected weekday."
      },
      {
        title: "Astrological Election Planner",
        icon: CalendarDays,
        status: "Available",
        href: "/resources/election-planner",
        description: "Compare candidate dates and hours for traditional electional timing."
      },
      {
        title: "Zodiacal Hour Calculator",
        icon: Timer,
        status: "Available",
        href: "/resources/zodiacal-hours",
        description: "Calculate zodiacal or sign-based hour divisions for a selected date and location."
      },
      {
        title: "Decan Calculator",
        icon: CircleDot,
        status: "Available",
        href: "/resources/decan-calculator",
        description: "Identify decans by zodiacal degree and display related planetary and image correspondences."
      },
      {
        title: "Fixed-Star Rising and Setting Tool",
        icon: Star,
        status: "Available",
        href: "/resources/fixed-stars",
        description: "Explore heliacal or local rising and setting windows for selected fixed stars."
      }
    ]
  },
  {
    title: "Language and Number",
    description: "Textual instruments for Hebrew, transliteration, gematria, and sacred-name research.",
    tools: [
      {
        title: "Gematria Calculator",
        icon: Gem,
        status: "Available",
        href: "/resources/gematria",
        description: "Calculate Hebrew, Greek, or simple value systems and save number notes to My Instruments."
      },
      {
        title: "Hebrew Transliteration Tool",
        icon: Languages,
        status: "Available",
        href: "/resources/hebrew-transliteration",
        description: "Convert between Hebrew characters and common transliteration styles for study notes."
      },
      {
        title: "Hebrew Letter Explorer",
        icon: BookOpenText,
        status: "Available",
        href: "/resources/hebrew-letters",
        description: "Explore curated Hebrew letter forms, values, pronunciation, symbolism, Sefer Yetzirah associations, and archive links."
      },
      {
        title: "Sacred Calendar",
        icon: CalendarDays,
        status: "Available",
        href: "/resources/sacred-calendar",
        description: "Track feast days, liturgical dates, lunar dates, and custom study observances."
      }
    ]
  },
  {
    title: "Esoteric Correspondence",
    description: "Research matrices for symbolic systems, pathworking, tarot, and traditional materials.",
    tools: [
      {
        title: "Golden Dawn Correspondence Explorer",
        icon: Sparkles,
        status: "Available",
        href: "/resources/golden-dawn-correspondences",
        description: "Browse planets, elements, signs, colors, paths, tarot, names, and ritual correspondences."
      },
      {
        title: "Tree of Life Correspondence Explorer",
        icon: Network,
        status: "Available",
        href: "/resources/tree-of-life",
        description: "Study the Tree of Life by sephirah, path, letter, tarot key, planet, sign, and element."
      },
      {
        title: "Tarot Correspondence Matrix",
        icon: Table2,
        status: "Available",
        href: "/resources/tarot-correspondences",
        description: "Compare tarot keys with Hebrew letters, paths, planets, signs, elements, and archive episodes."
      },
      {
        title: "Planetary Correspondence Reference",
        icon: WandSparkles,
        status: "Available",
        href: "/resources/planetary-correspondences",
        description: "A compact reference for planetary colors, incense traditions, materials, and cautions."
      }
    ]
  },
  {
    title: "Journals and Research",
    description: "Personal archive tools for keeping experiments, elections, observations, and citations together.",
    tools: [
      {
        title: "Astrological Timing Journal",
        icon: BookOpenText,
        status: "Available",
        href: "/resources/timing-journal",
        description: "Save timing experiments, elected moments, outcomes, notes, and related transcript passages."
      },
      {
        title: "Instrument Research Notes",
        icon: ScrollText,
        status: "Available in My Archive",
        description: "Use My Instruments to save notes, calculations, alerts, and recent resource history."
      }
    ]
  }
];

export function InstrumentLibrary() {
  return (
    <section className="mt-10">
      <div className="mb-6 max-w-3xl">
        <p className="text-xs uppercase tracking-[.28em] text-gold">Instrument library</p>
        <h2 className="font-manuscript-title mt-3 font-display text-4xl leading-none text-ivory">Available practical instruments</h2>
        <p className="mt-4 leading-7 text-parchment">
          A growing cabinet of live calculators, correspondence explorers, textual tools, and research journals for practical study.
        </p>
      </div>

      <div className="grid gap-6">
        {resourceGroups.map((group) => (
          <article key={group.title} className="temple-border rounded p-5">
            <div className="flex flex-col gap-2 border-b border-gold/15 pb-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[.22em] text-gold">{group.title}</p>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-parchment">{group.description}</p>
              </div>
              <span className="text-xs uppercase tracking-[.18em] text-gold/75">{group.tools.length} tools</span>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {group.tools.map((tool) => {
                const { title, icon: Icon, status, description } = tool;
                const href = "href" in tool ? tool.href : undefined;
                const content = (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_88%_12%,rgba(181,146,85,.14),transparent_10rem)]" />
                    <div className="relative">
                      <div className="flex items-start justify-between gap-3">
                        <Icon className="mt-1 text-gold" size={22} strokeWidth={1.25} />
                        <span className="rounded border border-gold/20 bg-black/30 px-2 py-1 text-[0.65rem] uppercase tracking-[.16em] text-gold">{status}</span>
                      </div>
                      <h3 className="mt-4 font-display text-2xl leading-tight text-ivory">{title}</h3>
                      <p className="mt-3 text-sm leading-6 text-parchment">{description}</p>
                    </div>
                  </>
                );
                return href ? (
                  <Link key={title} href={href} className="relative overflow-hidden rounded border border-gold/15 bg-black/28 p-4 transition hover:-translate-y-1 hover:border-gold/45 hover:bg-gold/10">
                    {content}
                  </Link>
                ) : (
                  <div key={title} className="relative overflow-hidden rounded border border-gold/15 bg-black/28 p-4">
                    {content}
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
