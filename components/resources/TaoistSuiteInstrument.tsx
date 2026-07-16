"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Pause, Play, RotateCcw, Save, Search, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import {
  alchemyConcepts,
  channelEntity,
  conceptById,
  entityById,
  organClockPeriods,
  organPhaseLabels,
  orbitRegions,
  refinementStages,
  symbolById,
  taoistCorrespondences,
  taoistEntities,
  taoistFrameworks,
  taoistSources,
  taoistSymbols,
  type OrganClockPeriodId,
  type OrganPhaseId
} from "@/lib/data/taoist-suite";
import { prependSavedCalculation, prependToolHistory } from "./instrument-storage";

type ToolKind = "alchemy" | "orbit" | "correspondences" | "meridians" | "symbols";

const modeOptions = {
  alchemy: ["three-treasures", "three-dantian", "furnace-cauldron", "kan-li", "refinement", "advanced", "textual"],
  orbit: ["guided", "pathway", "points", "alchemy", "breath-study", "comparison", "textual"],
  correspondences: ["table", "radial", "graph", "compare", "sources", "textual"],
  meridians: ["explore", "pair", "five-phase", "clock-flow", "yin-yang", "compare", "textual"],
  symbols: ["grid", "list", "timeline", "relationship", "compare", "variants", "textual"]
} as const;

const toolConfig = {
  alchemy: {
    title: "Internal Alchemy Map",
    eyebrow: "Resources / Neidan study instrument",
    subtitle: "Explore symbolic models of essence, vitality, spirit, refinement, return, and the internal alchemical landscape.",
    defaultMode: "three-treasures",
    defaultSelected: "jing",
    route: "/resources/internal-alchemy",
    safety: "This instrument is intended for historical, symbolic, and comparative study. Daoist internal-alchemy practices vary by lineage and may involve methods traditionally taught under qualified guidance. The instrument does not provide medical advice or individualized practice instructions."
  },
  orbit: {
    title: "Microcosmic Orbit / Lesser Mandala",
    eyebrow: "Resources / Xiao Zhou Tian study",
    subtitle: "Study the Xiao Zhou Tian / Lesser Mandala model of the Du Mai ascent and Ren Mai descent within Daoist internal-cultivation systems.",
    defaultMode: "guided",
    defaultSelected: "lower-dantian",
    route: "/resources/microcosmic-orbit",
    safety: "This diagram is for historical and educational study. It is not medical guidance and does not provide individualized qigong or internal-alchemy instruction. Stop any physical or breathing practice that causes pain, dizziness, distress, or unusual symptoms and consult an appropriate qualified professional."
  },
  correspondences: {
    title: "Taoist Correspondence Matrix",
    eyebrow: "Resources / correspondence engine",
    subtitle: "Explore relationships among phases, seasons, directions, trigrams, organs, planets, climates, sounds, tastes, virtues, symbols, and texts.",
    defaultMode: "table",
    defaultSelected: "wood",
    route: "/resources/taoist-correspondences",
    safety: "Medical correspondences are traditional Chinese medical theory categories. They are optional study records, not diagnostic statements."
  },
  meridians: {
    title: "Meridian and Element Explorer",
    eyebrow: "Resources / channel network study",
    subtitle: "Explore the traditional channel network through yin-yang pairings, Five-Phase relationships, bodily pathways, and daily cycles.",
    defaultMode: "explore",
    defaultSelected: "lung",
    route: "/resources/meridians",
    safety: "This explorer presents traditional Chinese medical channel theory for educational and historical study. It does not diagnose conditions, locate points for treatment, or replace qualified medical care."
  },
  symbols: {
    title: "Taoist Symbol Index",
    eyebrow: "Resources / provenance library",
    subtitle: "Explore verified diagrams, characters, emblems, number structures, and symbolic forms across Chinese cosmology and Daoist traditions.",
    defaultMode: "grid",
    defaultSelected: "taijitu",
    route: "/resources/taoist-symbols",
    safety: "No AI-generated or decorative glyph is presented as historical evidence. Talismanic material remains unpublished until provenance and permissions are reviewed."
  }
} as const;

const appearances = ["archive", "temple", "diagram", "ink-parchment", "jade-bronze", "cinnabar-gold", "celestial-tao"] as const;
const levels = ["beginner", "advanced"] as const;

const stateSchema = z.object({
  mode: z.string().catch(""),
  selected: z.string().catch(""),
  compare: z.string().catch(""),
  framework: z.string().catch("neidan-general"),
  appearance: z.enum(appearances).catch("temple"),
  level: z.enum(levels).catch("beginner"),
  query: z.string().catch(""),
  hideMedical: z.coerce.boolean().catch(false)
});

type InstrumentState = z.infer<typeof stateSchema>;

const styleMap = {
  archive: "from-[#17120d] via-[#080706] to-[#21180f]",
  temple: "from-[#071713] via-[#070707] to-[#2b1a0f]",
  diagram: "from-[#060606] via-[#111] to-[#0a0a0a]",
  "ink-parchment": "from-[#1d1710] via-[#0b0a08] to-[#302418]",
  "jade-bronze": "from-[#071713] via-[#080808] to-[#2b2110]",
  "cinnabar-gold": "from-[#220709] via-[#090706] to-[#23170c]",
  "celestial-tao": "from-[#07101d] via-[#070707] to-[#331013]"
};

function titleCase(value: string) {
  return value.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function roundCoordinate(value: number) {
  return Number(value.toFixed(4));
}

function readState(kind: ToolKind) {
  if (typeof window === "undefined") return stateSchema.parse({});
  const params = new URLSearchParams(window.location.search);
  const parsed = stateSchema.parse(Object.fromEntries(params.entries()));
  const savedAppearance = stateSchema.shape.appearance.safeParse(window.localStorage.getItem(`aetherica-${kind}-appearance`));
  return { ...parsed, appearance: savedAppearance.success ? savedAppearance.data : parsed.appearance };
}

function updateUrl(state: InstrumentState, config: (typeof toolConfig)[ToolKind]) {
  const params = new URLSearchParams({
    mode: state.mode || config.defaultMode,
    selected: state.selected || config.defaultSelected,
    compare: state.compare,
    framework: state.framework,
    appearance: state.appearance,
    level: state.level,
    query: state.query,
    hideMedical: String(state.hideMedical)
  });
  window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
}

export function TaoistSuiteInstrument({ kind }: { kind: ToolKind }) {
  const config = toolConfig[kind];
  const [state, setState] = useState<InstrumentState>(() => stateSchema.parse({}));
  const [hydrated, setHydrated] = useState(false);
  const [status, setStatus] = useState("");
  const [playing, setPlaying] = useState(false);
  const mode = state.mode || config.defaultMode;
  const selected = state.selected || config.defaultSelected;
  const framework = taoistFrameworks.find((item) => item.id === state.framework) ?? taoistFrameworks[0];
  const availableModes = modeOptions[kind] as readonly string[];

  useEffect(() => {
    prependToolHistory({ tool: config.title, detail: `Opened ${config.title}` });
  }, [config.title]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setState(readState(kind));
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [kind]);

  useEffect(() => {
    if (!hydrated) return;
    updateUrl(state, config);
    window.localStorage.setItem(`aetherica-${kind}-appearance`, state.appearance);
  }, [hydrated, state, config, kind]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setState((current) => ({ ...current, selected: nextSelection(kind, current.selected || config.defaultSelected) }));
    }, 2600);
    return () => window.clearInterval(timer);
  }, [playing, kind, config.defaultSelected]);

  function patch(next: Partial<InstrumentState>) {
    setState((current) => ({ ...current, ...next }));
  }

  async function copyLink() {
    await window.navigator.clipboard.writeText(window.location.href);
    setStatus("Copied");
    window.setTimeout(() => setStatus(""), 1500);
  }

  function saveState() {
    prependSavedCalculation({
      kind: toolStorageKind(kind),
      title: activeTitle(kind, selected),
      detail: `${titleCase(mode)} · ${framework.title}`,
      date: new Date().toISOString().slice(0, 10)
    });
    setStatus("Saved");
    window.setTimeout(() => setStatus(""), 1500);
  }

  return (
    <div className="grid gap-10">
      <section className={`relative isolate overflow-hidden rounded-lg border border-gold/30 bg-gradient-to-br ${styleMap[state.appearance]} p-6 shadow-aureate lg:p-8`}>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_18%,rgba(231,221,204,.08),transparent_16rem),radial-gradient(circle_at_82%_34%,rgba(181,146,85,.18),transparent_18rem)]" />
        <div className="grid gap-8 lg:grid-cols-[1fr_25rem] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[.28em] text-gold">{config.eyebrow}</p>
            <h1 className="font-manuscript-title mt-4 font-display text-5xl leading-none text-ivory md:text-7xl">{config.title}</h1>
            <p className="mt-5 max-w-3xl text-xl leading-9 text-parchment">{config.subtitle}</p>
            <p className="mt-4 max-w-4xl rounded border border-gold/20 bg-black/35 p-4 text-sm leading-7 text-limestone">{config.safety}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#instrument" className="focus-ring inline-flex items-center gap-3 rounded border border-gold/45 bg-gold/15 px-5 py-3 text-sm uppercase tracking-[.18em] text-ivory hover:bg-gold/25">Open Instrument <ArrowRight size={18} /></a>
              <Link href="/resources/taoist-cosmology" className="focus-ring inline-flex items-center gap-3 rounded border border-gold/25 px-5 py-3 text-sm uppercase tracking-[.18em] text-gold hover:border-gold/55 hover:text-ivory">Taoist Cabinet <BookOpen size={18} /></Link>
            </div>
          </div>
          <HeroDiagram kind={kind} selected={selected} />
        </div>
      </section>

      <section id="instrument" className="grid gap-6 min-[1900px]:grid-cols-[minmax(0,1fr)_26rem]">
        <div className="rounded-lg border border-gold/30 bg-black/55 p-4 shadow-aureate md:p-6">
          <div className="flex flex-col gap-4 border-b border-gold/15 pb-4 lg:flex-row lg:items-center lg:justify-between">
            <Segmented label="Mode" value={mode} options={availableModes} onChange={(value) => patch({ mode: value })} />
            <div className="flex flex-wrap gap-2">
              <button className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={() => setPlaying((value) => !value)}>{playing ? <Pause size={16} /> : <Play size={16} />} Sequence</button>
              <button className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={copyLink}><Share2 size={16} /> Copy Link</button>
              <button className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={saveState}><Save size={16} /> Save</button>
              <button className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={() => setState(stateSchema.parse({}))}><RotateCcw size={16} /> Reset</button>
            </div>
          </div>

          <div className="mt-5 grid gap-5 min-[1900px]:grid-cols-[minmax(0,1fr)_20rem]">
            <MainView kind={kind} mode={mode} selected={selected} compare={state.compare} query={state.query} hideMedical={state.hideMedical} onSelect={(next) => patch({ selected: next })} />
            <DetailPanel kind={kind} selected={selected} compare={state.compare} mode={mode} />
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <SelectBlock label="Framework" value={state.framework} values={taoistFrameworks.map((item) => item.id)} labels={Object.fromEntries(taoistFrameworks.map((item) => [item.id, item.title]))} onChange={(frameworkId) => patch({ framework: frameworkId })} />
            <SelectBlock label="Appearance" value={state.appearance} values={appearances} onChange={(appearance) => patch({ appearance })} />
            <SelectBlock label="Study level" value={state.level} values={levels} onChange={(level) => patch({ level })} />
            {kind === "correspondences" || kind === "symbols" ? (
              <label className="block">
                <span className="text-xs uppercase tracking-[.18em] text-gold">Search</span>
                <span className="mt-2 flex items-center gap-2 rounded border border-gold/20 bg-black/55 px-3 py-3 text-parchment">
                  <Search size={16} className="text-gold" />
                  <input className="w-full bg-transparent outline-none" value={state.query} onChange={(event) => patch({ query: event.target.value })} placeholder="Search records" />
                </span>
              </label>
            ) : null}
          </div>

          {kind === "correspondences" ? (
            <label className="mt-4 flex items-center gap-3 text-sm text-parchment">
              <input type="checkbox" checked={state.hideMedical} onChange={(event) => patch({ hideMedical: event.target.checked })} />
              Hide traditional medical correspondences
            </label>
          ) : null}

          {status ? <p className="mt-4 text-sm text-gold">{status}</p> : null}
        </div>

        <aside className="grid gap-4 content-start">
          <Panel title="Instrument Navigation" eyebrow="Taoist suite">
            <InstrumentNav />
          </Panel>
          <Panel title="Framework" eyebrow={framework.status}>
            <p className="text-sm leading-7 text-parchment">{framework.summary}</p>
            <p className="mt-3 rounded border border-gold/15 bg-black/25 p-3 text-sm leading-6 text-limestone">{framework.caution}</p>
          </Panel>
          <Panel title="Sources and Review" eyebrow="Terminology quality">
            <p className="mb-3 rounded border border-gold/20 bg-gold/10 p-3 text-sm leading-6 text-parchment">
              Reference imagery may guide atmosphere, lighting, material, composition, and visual hierarchy only. Historical terms, diagrams, pathways, talismans, trigrams, charts, and correspondences must come from verified structured data, never decorative invention.
            </p>
            <div className="grid gap-3">
              {taoistSources.map((source) => (
                <div key={source.id} className="rounded border border-gold/15 bg-black/25 p-3">
                  <p className="text-xs uppercase tracking-[.16em] text-gold">{source.type}</p>
                  <p className="mt-1 font-display text-xl text-ivory">{source.title}</p>
                  <p className="mt-2 text-sm leading-6 text-limestone">{source.note}</p>
                </div>
              ))}
            </div>
          </Panel>
        </aside>
      </section>
    </div>
  );
}

function HeroDiagram({ kind, selected }: { kind: ToolKind; selected: string }) {
  return (
    <div className="relative mx-auto grid aspect-square w-full max-w-sm place-items-center rounded-full border border-gold/25 bg-black/35 shadow-[inset_0_0_70px_rgba(181,146,85,.13)]">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 360 360" aria-hidden="true">
        <circle cx="180" cy="180" r="156" fill="none" stroke="rgba(181,146,85,.32)" strokeWidth="2" />
        <circle cx="180" cy="180" r="116" fill="none" stroke="rgba(181,146,85,.18)" />
        <circle cx="180" cy="180" r="72" fill="rgba(181,146,85,.08)" stroke="rgba(231,221,204,.16)" />
        {Array.from({ length: 12 }).map((_, index) => {
          const angle = (index / 12) * Math.PI * 2 - Math.PI / 2;
          return (
            <line
              key={index}
              x1={roundCoordinate(180 + Math.cos(angle) * 78)}
              y1={roundCoordinate(180 + Math.sin(angle) * 78)}
              x2={roundCoordinate(180 + Math.cos(angle) * 156)}
              y2={roundCoordinate(180 + Math.sin(angle) * 156)}
              stroke="rgba(181,146,85,.14)"
            />
          );
        })}
      </svg>
      <div className="relative text-center">
        <p className="text-xs uppercase tracking-[.2em] text-gold">{titleCase(kind)}</p>
        <p className="mt-2 font-display text-3xl text-ivory">{activeTitle(kind, selected)}</p>
      </div>
    </div>
  );
}

function MainView({ kind, mode, selected, compare, query, hideMedical, onSelect }: { kind: ToolKind; mode: string; selected: string; compare: string; query: string; hideMedical: boolean; onSelect: (id: string) => void }) {
  if (kind === "alchemy") return <AlchemyView mode={mode} selected={selected} onSelect={onSelect} />;
  if (kind === "orbit") return <OrbitView mode={mode} selected={selected} onSelect={onSelect} />;
  if (kind === "correspondences") return <CorrespondenceView mode={mode} selected={selected} compare={compare} query={query} hideMedical={hideMedical} onSelect={onSelect} />;
  if (kind === "meridians") return <MeridianView mode={mode} selected={selected} onSelect={onSelect} />;
  return <SymbolView mode={mode} selected={selected} query={query} onSelect={onSelect} />;
}

function AlchemyView({ mode, selected, onSelect }: { mode: string; selected: string; onSelect: (id: string) => void }) {
  const visible = mode === "three-dantian" ? alchemyConcepts.filter((item) => item.category === "center") : mode === "kan-li" ? alchemyConcepts.filter((item) => item.category === "kan-li") : alchemyConcepts;
  return (
    <Panel title={titleCase(mode)} eyebrow="Neidan study map">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((concept) => <RecordButton key={concept.id} active={selected === concept.id} title={concept.englishName} subtitle={`${concept.chineseTraditional} · ${concept.pinyin}`} onClick={() => onSelect(concept.id)} />)}
      </div>
      {mode === "refinement" ? <Sequence stages={refinementStages} /> : null}
      {mode === "furnace-cauldron" ? <p className="mt-4 text-sm leading-6 text-limestone">Furnace and cauldron are symbolic structures. This view does not provide heat-generation, pressure, breath-retention, or physiological manipulation instructions.</p> : null}
    </Panel>
  );
}

function OrbitView({ mode, selected, onSelect }: { mode: string; selected: string; onSelect: (id: string) => void }) {
  const selectedRegion = orbitRegions.find((region) => region.id === selected) ?? orbitRegions[0];
  const dantianConcepts = alchemyConcepts.filter((concept) => concept.category === "center");
  const cyclePhases = ["Collect", "Descend", "Turn", "Rise", "Cross", "Descend", "Return", "Seal"];

  return (
    <Panel title={titleCase(mode)} eyebrow="Diagrammatic circulation model">
      <div className="relative mx-auto w-full overflow-hidden rounded border border-gold/20 bg-[radial-gradient(circle_at_50%_18%,rgba(181,146,85,.18),transparent_24rem),radial-gradient(circle_at_52%_58%,rgba(57,119,153,.16),transparent_20rem),linear-gradient(140deg,rgba(5,12,14,.96),rgba(4,5,5,.98)_48%,rgba(30,18,10,.94))] p-3 shadow-aureate sm:p-4">
        <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(181,146,85,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(181,146,85,.07)_1px,transparent_1px)] [background-size:34px_34px]" />
        <div className="relative mb-3 flex flex-wrap gap-2">
          {["simple view", "adept view"].map((label) => (
            <span key={label} className={`rounded border px-4 py-2 text-xs uppercase tracking-[.16em] ${label.startsWith("adept") ? "border-gold/45 bg-gold/15 text-ivory" : "border-gold/20 bg-black/35 text-limestone"}`}>{label}</span>
          ))}
        </div>

        <div className="relative grid gap-4 xl:grid-cols-[15rem_minmax(30rem,1fr)_18rem]">
          <aside className="grid gap-3 content-start">
            <div className="rounded border border-gold/20 bg-black/45 p-4">
              <p className="text-xs uppercase tracking-[.18em] text-gold">The Three Dantian</p>
              <div className="mt-4 grid gap-3">
                {dantianConcepts.map((concept) => (
                  <button key={concept.id} type="button" className="focus-ring rounded border border-gold/15 bg-black/25 p-3 text-left hover:border-gold/45">
                    <span className="flex items-center gap-3">
                      <span className="grid size-12 shrink-0 place-items-center rounded-full border border-gold/30 bg-[radial-gradient(circle,rgba(181,146,85,.24),transparent_66%)] text-xl text-gold">{concept.chineseTraditional}</span>
                      <span>
                        <span className="block font-display text-xl leading-tight text-ivory">{concept.englishName}</span>
                        <span className="mt-1 block text-xs leading-5 text-limestone">{concept.pinyin} · {concept.summary.split(".")[0]}.</span>
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded border border-gold/20 bg-black/45 p-4">
              <p className="text-xs uppercase tracking-[.18em] text-gold">Cycle Phases</p>
              <div className="mt-4 grid gap-2">
                {cyclePhases.map((phase, index) => (
                  <div key={`${phase}-${index}`} className={`flex items-center gap-3 rounded border px-3 py-2 text-sm ${index === 3 ? "border-gold bg-gold/15 text-ivory" : "border-gold/10 bg-black/20 text-parchment"}`}>
                    <span className="grid size-7 place-items-center rounded-full border border-gold/30 text-xs text-gold">{index + 1}</span>
                    {phase}
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="relative min-h-[48rem] overflow-hidden rounded border border-gold/20 bg-[radial-gradient(circle_at_50%_34%,rgba(231,221,204,.09),transparent_18rem),radial-gradient(circle_at_44%_66%,rgba(181,146,85,.14),transparent_17rem),rgba(0,0,0,.3)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0,transparent_42%,rgba(181,146,85,.08)_43%,transparent_44%)]" />
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 120" aria-hidden="true">
              <defs>
                <filter id="orbit-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="orbit-body" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="rgba(231,221,204,.2)" />
                  <stop offset="55%" stopColor="rgba(181,146,85,.09)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,.12)" />
                </linearGradient>
                <filter id="orbit-blue-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="2.4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                d="M51 8c-5 1-9 5-10 11-.6 4 .7 7 3 10-4 5-6 13-6 23v16c0 12-4 22-7 30-2 7 1 14 8 17 6 3 13 1 18-4 5-6 6-14 3-23-3-9-4-18-3-29l2-18c1-7-1-12-5-16 4-4 5-9 3-13-1-3-3-4-6-4Z"
                fill="url(#orbit-body)"
                stroke="rgba(231,221,204,.26)"
                strokeWidth=".5"
              />
              <path d="M45 19c-4 0-10 2-14 5 4 2 9 3 14 2" fill="none" stroke="rgba(231,221,204,.36)" strokeWidth=".6" />
              <path d="M44 29c-5 7-7 15-6 27 1 14-3 28-6 40" fill="none" stroke="rgba(231,221,204,.18)" strokeDasharray="2 2" strokeWidth=".55" />
              <circle cx="52" cy="20" r="8" fill="rgba(57,119,153,.15)" stroke="rgba(129,196,232,.48)" />
              <circle cx="52" cy="54" r="9" fill="rgba(122,17,26,.18)" stroke="rgba(196,48,55,.5)" />
              <circle cx="48" cy="88" r="10" fill="rgba(181,146,85,.18)" stroke="rgba(255,224,154,.56)" />
              <text x="52" y="19" textAnchor="middle" fill="#e7ddcc" fontSize="4.6" fontFamily="Georgia, serif">UPPER</text>
              <text x="52" y="55" textAnchor="middle" fill="#e7ddcc" fontSize="4.6" fontFamily="Georgia, serif">MIDDLE</text>
              <text x="48" y="89" textAnchor="middle" fill="#e7ddcc" fontSize="4.6" fontFamily="Georgia, serif">LOWER</text>

              <path
                d="M42 105 C18 78 23 36 48 12"
                fill="none"
                stroke={selectedRegion.route === "du-mai" || selectedRegion.route === "transition" ? "rgba(255,183,62,.98)" : "rgba(255,183,62,.74)"}
                strokeLinecap="round"
                strokeWidth={selectedRegion.route === "du-mai" || selectedRegion.route === "transition" ? "2.6" : "1.5"}
                filter={selectedRegion.route === "du-mai" || selectedRegion.route === "transition" ? "url(#orbit-glow)" : undefined}
              />
              <path
                d="M48 12 C76 40 70 80 42 105"
                fill="none"
                stroke={selectedRegion.route === "ren-mai" || selectedRegion.route === "transition" ? "rgba(95,203,255,.96)" : "rgba(95,203,255,.65)"}
                strokeLinecap="round"
                strokeWidth={selectedRegion.route === "ren-mai" || selectedRegion.route === "transition" ? "2.4" : "1.4"}
                filter={selectedRegion.route === "ren-mai" || selectedRegion.route === "transition" ? "url(#orbit-blue-glow)" : undefined}
              />

              <path d="M48 12v93" stroke="rgba(231,221,204,.16)" strokeWidth=".45" />
              <path d="M31 45h35M34 68h29M36 91h21" stroke="rgba(181,146,85,.16)" strokeWidth=".45" />

              <path d="M42 105 C38 109 38 113 42 116" fill="none" stroke="rgba(181,146,85,.22)" strokeWidth=".6" />
              <path d="M56 103 C60 107 62 111 61 116" fill="none" stroke="rgba(181,146,85,.16)" strokeWidth=".6" />
            </svg>

            {orbitRegions.map((region) => (
              <button
                key={region.id}
                type="button"
                aria-label={region.englishName}
                title={region.englishName}
                className={`focus-ring absolute grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-xs font-bold shadow-lg backdrop-blur ${selected === region.id ? "border-gold bg-gold/25 text-ivory shadow-[0_0_28px_rgba(181,146,85,.45)]" : "border-gold/30 bg-black/75 text-parchment hover:border-gold/70 hover:text-ivory"}`}
                style={{ left: `${region.x}%`, top: `${Math.max(10, Math.min(88, region.y))}%` }}
                onClick={() => onSelect(region.id)}
              >
                {orbitRegions.findIndex((item) => item.id === region.id) + 1}
              </button>
            ))}

            <div className="absolute left-4 top-8 hidden w-56 space-y-4 lg:block">
              {orbitRegions.filter((region) => region.route === "du-mai" || region.route === "transition").map((region, index) => (
                <button key={region.id} type="button" className={`focus-ring w-full rounded border bg-black/50 p-3 text-left backdrop-blur ${selected === region.id ? "border-gold text-ivory" : "border-gold/15 text-parchment hover:border-gold/45"}`} onClick={() => onSelect(region.id)}>
                  <span className="text-xs uppercase tracking-[.14em] text-gold">{index + 1} · Du Mai side</span>
                  <span className="mt-1 block font-display text-xl">{region.englishName}</span>
                  <span className="mt-1 block text-xs text-limestone">{region.chineseTraditional ? `${region.chineseTraditional} · ` : ""}{region.pinyin ?? region.approximateRegion}</span>
                </button>
              ))}
            </div>

            <div className="absolute right-4 top-8 hidden w-56 space-y-4 lg:block">
              {orbitRegions.filter((region) => region.route === "ren-mai" || region.route === "dantian").map((region, index) => (
                <button key={region.id} type="button" className={`focus-ring w-full rounded border bg-black/50 p-3 text-left backdrop-blur ${selected === region.id ? "border-gold text-ivory" : "border-gold/15 text-parchment hover:border-gold/45"}`} onClick={() => onSelect(region.id)}>
                  <span className="text-xs uppercase tracking-[.14em] text-gold">{index + 1} · Ren Mai side</span>
                  <span className="mt-1 block font-display text-xl">{region.englishName}</span>
                  <span className="mt-1 block text-xs text-limestone">{region.chineseTraditional ? `${region.chineseTraditional} · ` : ""}{region.pinyin ?? region.approximateRegion}</span>
                </button>
              ))}
            </div>

            <p className="absolute bottom-5 left-6 right-6 rounded border border-gold/15 bg-black/50 px-4 py-3 text-center text-sm leading-6 text-parchment backdrop-blur">The orbit is presented as a diagrammatic teaching model. Pathways are symbolic study routes, not clinical point location.</p>
          </div>

          <div className="grid gap-3 content-start">
            <div className="rounded border border-gold/15 bg-black/45 p-4">
              <p className="text-xs uppercase tracking-[.18em] text-gold">Active Point</p>
              <p className="mt-2 font-display text-3xl text-ivory">{selectedRegion.englishName}</p>
              <p className="mt-1 text-sm text-gold">{selectedRegion.chineseTraditional ? `${selectedRegion.chineseTraditional} · ` : ""}{selectedRegion.pinyin ?? selectedRegion.route}</p>
              <p className="mt-4 text-sm leading-6 text-parchment">{selectedRegion.role}</p>
              <p className="mt-4 rounded border border-gold/15 bg-black/35 p-3 text-xs leading-5 text-limestone">{selectedRegion.caution}</p>
              <div className="mt-4 grid gap-2 text-xs uppercase tracking-[.14em] text-limestone">
                <span><span className="text-gold">Route:</span> {titleCase(selectedRegion.route)}</span>
                <span><span className="text-gold">Region:</span> {selectedRegion.approximateRegion}</span>
              </div>
            </div>

            <div className="rounded border border-gold/15 bg-black/45 p-4">
              <p className="text-xs uppercase tracking-[.18em] text-gold">Layer Controls</p>
              {["Orbit Pathway", "Major Regions", "Three Dantian", "Study Labels"].map((label, index) => (
                <div key={label} className="mt-3 flex items-center justify-between gap-3 border-t border-gold/10 pt-3 text-sm text-parchment first:border-t-0 first:pt-0">
                  <span>{label}</span>
                  <span className={`h-5 w-9 rounded-full border ${index < 3 ? "border-gold/50 bg-gold/25" : "border-gold/20 bg-black/50"}`}>
                    <span className={`block size-4 rounded-full bg-ivory transition ${index < 3 ? "translate-x-4" : "translate-x-0"}`} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-4 grid gap-3 border-t border-gold/15 pt-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
          <div className="rounded border border-gold/15 bg-black/35 p-4">
            <p className="text-xs uppercase tracking-[.18em] text-gold">Breath Mode</p>
            <p className="mt-2 font-display text-2xl text-ivory">Natural Breath</p>
            <p className="mt-1 text-sm text-limestone">Inhale and exhale naturally. No forced practice instruction is provided.</p>
          </div>
          <div className="mx-auto grid size-36 place-items-center rounded-full border border-gold/35 bg-[radial-gradient(circle,rgba(181,146,85,.34),rgba(0,0,0,.8)_68%)] shadow-[0_0_42px_rgba(181,146,85,.22)]">
            <button type="button" className="focus-ring grid size-20 place-items-center rounded-full border border-gold/50 bg-gold text-obsidian shadow-aureate" aria-label="Preview orbit sequence">
              <Play size={34} fill="currentColor" />
            </button>
          </div>
          <div className="rounded border border-gold/15 bg-black/35 p-4">
            <p className="text-xs uppercase tracking-[.18em] text-gold">Cycle Phase</p>
            <p className="mt-2 font-display text-2xl text-ivory">4 · Rise</p>
            <p className="mt-1 text-sm text-limestone">A study label for the highlighted ascending side of the diagram.</p>
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-limestone">This side-profile layout borrows only the instructional composition of reference material. The labels and pathway records shown here come from the structured Microcosmic Orbit review dataset and remain provisional until source review is complete.</p>
    </Panel>
  );
}

function CorrespondenceView({ mode, selected, compare, query, hideMedical, onSelect }: { mode: string; selected: string; compare: string; query: string; hideMedical: boolean; onSelect: (id: string) => void }) {
  const q = query.trim().toLowerCase();
  const relations = taoistCorrespondences.filter((item) => (item.sourceEntityId === selected || item.targetEntityId === selected) && (!hideMedical || !item.medical));
  const records = taoistEntities.filter((entity) => !q || [entity.englishName, entity.type, entity.pinyin ?? "", entity.chineseTraditional ?? ""].join(" ").toLowerCase().includes(q));
  return (
    <Panel title={titleCase(mode)} eyebrow="Correspondence graph">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="grid max-h-[28rem] gap-2 overflow-y-auto pr-1">
          {records.map((entity) => <RecordButton key={entity.id} active={selected === entity.id} title={entity.englishName} subtitle={`${entity.type}${entity.chineseTraditional ? ` · ${entity.chineseTraditional}` : ""}`} onClick={() => onSelect(entity.id)} />)}
        </div>
        <div className="rounded border border-gold/15 bg-black/25 p-4">
          <p className="font-display text-2xl text-ivory">{entityById(selected).englishName}</p>
          <div className="mt-3 grid gap-2">
            {relations.map((relation) => {
              const other = entityById(relation.sourceEntityId === selected ? relation.targetEntityId : relation.sourceEntityId);
              return <div key={relation.id} className="rounded border border-gold/10 bg-black/25 p-3 text-sm text-parchment"><span className="text-gold">{relation.category}</span>: {other.englishName} <span className="text-limestone">({relation.confidence})</span></div>;
            })}
          </div>
          {mode === "compare" ? <p className="mt-4 text-sm text-limestone">Compare target: {compare ? entityById(compare).englishName : "choose another entity from the URL or list."}</p> : null}
        </div>
      </div>
    </Panel>
  );
}

function MeridianView({ mode, selected, onSelect }: { mode: string; selected: string; onSelect: (id: string) => void }) {
  const current = channelEntity(selected as OrganClockPeriodId);
  const filtered = mode === "five-phase" ? organClockPeriods.filter((period) => period.phaseId === current.phaseId) : organClockPeriods;
  const phases = ["wood", "fire", "earth", "metal", "water"] as const;
  const phasePositions: Record<OrganPhaseId, { x: number; y: number }> = {
    wood: { x: 21, y: 35 },
    fire: { x: 50, y: 18 },
    earth: { x: 79, y: 35 },
    metal: { x: 68, y: 74 },
    water: { x: 32, y: 74 }
  };
  const selectedPhase = organPhaseLabels[current.phaseId];

  return (
    <Panel title={titleCase(mode)} eyebrow="Simplified channel network">
      <div className="grid gap-5">
        <div className="relative min-h-[34rem] overflow-hidden rounded border border-gold/20 bg-[radial-gradient(circle_at_50%_38%,rgba(181,146,85,.14),transparent_18rem),linear-gradient(135deg,rgba(231,221,204,.04),rgba(0,0,0,.18))] p-4">
          <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(181,146,85,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(181,146,85,.07)_1px,transparent_1px)] [background-size:32px_32px]" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
            <defs>
              <filter id="meridian-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <circle cx="50" cy="50" r="35" fill="none" stroke="rgba(181,146,85,.2)" />
            <circle cx="50" cy="50" r="22" fill="rgba(181,146,85,.05)" stroke="rgba(181,146,85,.14)" />
            <path d="M21 35 C35 21, 64 21, 79 35 C88 48, 82 66, 68 74 C54 84, 42 84, 32 74 C18 64, 12 48, 21 35Z" fill="none" stroke="rgba(181,146,85,.28)" strokeWidth=".8" />
            {phases.map((phase, index) => {
              const from = phasePositions[phase];
              const to = phasePositions[phases[(index + 1) % phases.length]];
              const active = phase === current.phaseId || phases[(index + 1) % phases.length] === current.phaseId;
              return <path key={phase} d={`M ${from.x} ${from.y} C 50 50, 50 50, ${to.x} ${to.y}`} fill="none" stroke={active ? "rgba(255,224,154,.9)" : "rgba(181,146,85,.22)"} strokeWidth={active ? "1.35" : ".75"} strokeLinecap="round" filter={active ? "url(#meridian-glow)" : undefined} />;
            })}
            <path d="M50 18 L68 74 L21 35 L79 35 L32 74 Z" fill="none" stroke="rgba(122,17,26,.32)" strokeDasharray="1.6 2.4" strokeWidth=".8" />
          </svg>

          {phases.map((phase) => {
            const position = phasePositions[phase];
            const phaseLabel = organPhaseLabels[phase];
            const active = current.phaseId === phase;
            const phaseChannels = organClockPeriods.filter((period) => period.phaseId === phase);
            return (
              <button
                key={phase}
                type="button"
                className={`focus-ring absolute w-36 -translate-x-1/2 -translate-y-1/2 rounded border p-3 text-center backdrop-blur transition ${active ? "border-gold bg-gold/15 text-ivory shadow-[0_0_28px_rgba(181,146,85,.28)]" : "border-gold/20 bg-black/65 text-parchment hover:border-gold/50 hover:text-ivory"}`}
                style={{ left: `${position.x}%`, top: `${position.y}%` }}
                onClick={() => onSelect(phaseChannels[0].id)}
                aria-label={`${phaseLabel.name} phase channels`}
              >
                <span className="mx-auto block size-3 rounded-full" style={{ backgroundColor: phaseLabel.color }} />
                <span className="mt-2 block text-xs uppercase tracking-[.16em] text-gold">{phaseLabel.name}</span>
                <span className="mt-1 block text-sm leading-5 text-limestone">{phaseChannels.map((period) => period.englishName.replace(" / Triple Burner", "")).join(" / ")}</span>
              </button>
            );
          })}

          <div className="absolute bottom-4 left-4 right-4 rounded border border-gold/15 bg-black/55 p-4 backdrop-blur">
            <p className="text-xs uppercase tracking-[.18em] text-gold">Selected channel</p>
            <div className="mt-2 flex flex-wrap items-end gap-3">
              <h4 className="font-display text-4xl leading-none text-ivory">{current.englishName}</h4>
              <p className="text-sm text-gold">{current.chineseName} · {current.pinyin} · {current.yinYang} {selectedPhase.name}</p>
            </div>
            <p className="mt-3 max-w-4xl text-sm leading-6 text-parchment">{current.meridianName}. Paired with {channelEntity(current.pairedPeriodId).englishName}. {current.caution}</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((period) => {
            const phase = organPhaseLabels[period.phaseId];
            return (
              <button
                key={period.id}
                type="button"
                className={`focus-ring min-h-32 rounded border p-4 text-left transition ${period.id === selected ? "border-gold bg-gold/15 text-ivory" : "border-gold/15 bg-black/25 text-parchment hover:border-gold/45 hover:text-ivory"}`}
                onClick={() => onSelect(period.id)}
              >
                <span className="flex items-start justify-between gap-3">
                  <span>
                    <span className="block font-display text-2xl leading-tight">{period.englishName}</span>
                    <span className="mt-1 block text-sm text-gold">{period.chineseName} · {period.pinyin}</span>
                  </span>
                  <span className="size-3 shrink-0 rounded-full" style={{ backgroundColor: phase.color }} />
                </span>
                <span className="mt-4 block text-xs uppercase tracking-[.16em] text-limestone">{period.yinYang} · {phase.name} · {period.startHour}:00-{period.endHour}:00</span>
                <span className="mt-2 block text-sm leading-6 text-limestone">Paired with {channelEntity(period.pairedPeriodId).englishName}</span>
              </button>
            );
          })}
        </div>
      </div>
      <Link href="/resources/organ-clock" className="focus-ring mt-4 inline-flex items-center gap-2 rounded border border-gold/30 px-3 py-2 text-sm text-gold hover:text-ivory">Open Organ Clock <ArrowRight size={15} /></Link>
    </Panel>
  );
}

function SymbolView({ mode, selected, query, onSelect }: { mode: string; selected: string; query: string; onSelect: (id: string) => void }) {
  const q = query.trim().toLowerCase();
  const records = taoistSymbols.filter((symbol) => !q || [symbol.title, symbol.pinyin ?? "", symbol.chineseTraditional ?? "", symbol.categoryIds.join(" ")].join(" ").toLowerCase().includes(q));
  return (
    <Panel title={titleCase(mode)} eyebrow="Symbol provenance index">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {records.map((symbol) => (
          <button key={symbol.id} type="button" className={`focus-ring rounded border p-4 text-left ${selected === symbol.id ? "border-gold bg-gold/15 text-ivory" : "border-gold/15 bg-black/25 text-parchment"}`} onClick={() => onSelect(symbol.id)}>
            <span className="block text-5xl text-gold">{symbol.symbol}</span>
            <span className="mt-3 block font-display text-2xl">{symbol.title}</span>
            <span className="mt-1 block text-sm text-limestone">{symbol.chineseTraditional ?? "No Chinese term"} · {symbol.reviewStatus} · {symbol.copyrightStatus}</span>
          </button>
        ))}
      </div>
    </Panel>
  );
}

function DetailPanel({ kind, selected, compare, mode }: { kind: ToolKind; selected: string; compare: string; mode: string }) {
  let title = activeTitle(kind, selected);
  let subtitle = "";
  let body = "";
  if (kind === "alchemy") {
    const item = conceptById(selected);
    subtitle = `${item.chineseTraditional} · ${item.pinyin}`;
    body = item.summary;
  } else if (kind === "orbit") {
    const item = orbitRegions.find((region) => region.id === selected) ?? orbitRegions[0];
    subtitle = `${item.pinyin ?? item.route} · ${item.approximateRegion}`;
    body = `${item.role} ${item.caution}`;
  } else if (kind === "correspondences") {
    const item = entityById(selected);
    subtitle = `${item.type}${item.chineseTraditional ? ` · ${item.chineseTraditional}` : ""}`;
    body = item.summary;
  } else if (kind === "meridians") {
    const item = channelEntity(selected as OrganClockPeriodId);
    subtitle = `${item.chineseName} · ${item.pinyin}`;
    body = `${item.meridianName}. ${item.yinYang} ${organPhaseLabels[item.phaseId].name}. Paired with ${channelEntity(item.pairedPeriodId).englishName}. ${item.caution}`;
  } else {
    const item = symbolById(selected);
    title = item.title;
    subtitle = `${item.chineseTraditional ?? "No Chinese term"} · ${item.reviewStatus}`;
    body = `${item.description} Copyright status: ${item.copyrightStatus}.`;
  }

  return (
    <Panel title={title} eyebrow={subtitle}>
      <p className="text-sm leading-7 text-parchment">{body}</p>
      <p className="mt-4 text-xs uppercase tracking-[.16em] text-gold">Active mode</p>
      <p className="mt-1 text-sm text-limestone">{titleCase(mode)}{compare ? ` · comparison: ${compare}` : ""}</p>
    </Panel>
  );
}

function Sequence({ stages }: { stages: Array<{ id: string; title: string; summary: string }> }) {
  return <div className="mt-4 grid gap-2 md:grid-cols-5">{stages.map((stage) => <div key={stage.id} className="rounded border border-gold/15 bg-black/25 p-3"><p className="font-display text-lg text-ivory">{stage.title}</p><p className="mt-1 text-xs leading-5 text-limestone">{stage.summary}</p></div>)}</div>;
}

function RecordButton({ active, title, subtitle, onClick }: { active: boolean; title: string; subtitle: string; onClick: () => void }) {
  return <button type="button" className={`focus-ring rounded border p-3 text-left transition hover:border-gold ${active ? "border-gold bg-gold/15 text-ivory" : "border-gold/15 bg-black/25 text-parchment"}`} onClick={onClick}><span className="block font-display text-xl">{title}</span><span className="mt-1 block text-xs leading-5 text-limestone">{subtitle}</span></button>;
}

function Segmented<T extends string>({ label, options, value, onChange }: { label: string; options: readonly T[]; value: T; onChange: (value: T) => void }) {
  return <div><p className="mb-2 text-xs uppercase tracking-[.18em] text-gold">{label}</p><div className="flex flex-wrap gap-2">{options.map((option) => <button key={option} type="button" className={`focus-ring rounded border px-3 py-2 text-sm capitalize ${value === option ? "border-gold bg-gold/15 text-ivory" : "border-gold/20 text-parchment hover:text-ivory"}`} onClick={() => onChange(option)}>{titleCase(option)}</button>)}</div></div>;
}

function SelectBlock<T extends string>({ label, value, values, labels, onChange }: { label: string; value: T; values: readonly T[]; labels?: Partial<Record<T, string>>; onChange: (value: T) => void }) {
  return <label className="block"><span className="text-xs uppercase tracking-[.18em] text-gold">{label}</span><select className="mt-2 w-full rounded border border-gold/20 bg-black/55 px-3 py-3 text-parchment" value={value} onChange={(event) => onChange(event.target.value as T)}>{values.map((item) => <option key={item} value={item}>{labels?.[item] ?? titleCase(item)}</option>)}</select></label>;
}

function Panel({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  return <article className="rounded border border-gold/20 bg-black/35 p-4"><p className="text-xs uppercase tracking-[.2em] text-gold">{eyebrow}</p><h3 className="mt-2 font-display text-2xl text-ivory">{title}</h3><div className="mt-3">{children}</div></article>;
}

function InstrumentNav() {
  const links = [
    ["/resources/taijitu-polarity", "Taijitu"],
    ["/resources/five-phases", "Five Phases"],
    ["/resources/bagua", "Bagua"],
    ["/resources/he-tu-luo-shu", "He Tu / Luo Shu"],
    ["/resources/taoist-cosmology", "Cosmology"],
    ["/resources/organ-clock", "Organ Clock"],
    ["/resources/internal-alchemy", "Internal Alchemy"],
    ["/resources/microcosmic-orbit", "Microcosmic Orbit"],
    ["/resources/taoist-correspondences", "Correspondences"],
    ["/resources/meridians", "Meridians"],
    ["/resources/taoist-symbols", "Symbols"]
  ];
  return <div className="grid gap-2">{links.map(([href, label]) => <Link key={href} href={href} className="rounded border border-gold/15 bg-black/25 p-3 text-sm text-parchment hover:border-gold/45 hover:text-ivory">{label}</Link>)}</div>;
}

function activeTitle(kind: ToolKind, selected: string) {
  if (kind === "alchemy") return conceptById(selected).englishName;
  if (kind === "orbit") return (orbitRegions.find((region) => region.id === selected) ?? orbitRegions[0]).englishName;
  if (kind === "correspondences") return entityById(selected).englishName;
  if (kind === "meridians") return channelEntity(selected as OrganClockPeriodId).englishName;
  return symbolById(selected).title;
}

function nextSelection(kind: ToolKind, selected: string) {
  const list = kind === "alchemy" ? alchemyConcepts.map((item) => item.id) : kind === "orbit" ? orbitRegions.map((item) => item.id) : kind === "correspondences" ? taoistEntities.map((item) => item.id) : kind === "meridians" ? organClockPeriods.map((item) => item.id) : taoistSymbols.map((item) => item.id);
  const index = list.indexOf(selected);
  return list[(index + 1 + list.length) % list.length];
}

function toolStorageKind(kind: ToolKind) {
  const map = {
    alchemy: "Internal Alchemy Map",
    orbit: "Microcosmic Orbit",
    correspondences: "Taoist Correspondence Matrix",
    meridians: "Meridian Explorer",
    symbols: "Taoist Symbol Index"
  } as const;
  return map[kind];
}
