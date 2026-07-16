"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Clipboard, Pause, Play, RotateCcw, Save, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import {
  cycles,
  faqs,
  fivePhases,
  fourImages,
  frameworks,
  polarityFields,
  polarityPairs,
  sources,
  trigrams,
  type CycleStage,
  type PolarityField
} from "@/lib/data/taijitu";
import { instrumentNotesKey, prependSavedCalculation, prependToolHistory, readJson, type ResearchNote, writeJson } from "./instrument-storage";

const modes = ["explore", "cycle", "compare", "transform", "reflection", "scholar"] as const;
const appearances = ["ink-parchment", "jade-bronze", "celestial-tao"] as const;
const motionSettings = ["full", "reduced", "none"] as const;

type Appearance = (typeof appearances)[number];

const stateSchema = z.object({
  mode: z.enum(modes).catch("explore"),
  cycle: z.enum(["daily", "seasonal", "breath"]).catch("daily"),
  stage: z.string().catch("midnight"),
  selected: z.enum(["yin", "yang", "yin-seed", "yang-seed"]).catch("yin"),
  pair: z.string().catch("dark-light"),
  framework: z.string().catch("yijing"),
  appearance: z.enum(appearances).catch("jade-bronze"),
  motion: z.enum(motionSettings).catch("reduced")
});

const appearanceStyles: Record<Appearance, { label: string; shell: string; panel: string; accent: string; yin: string; yang: string }> = {
  "ink-parchment": {
    label: "Ink and Parchment",
    shell: "from-[#1b1712] via-[#0c0b0a] to-[#2a2115]",
    panel: "bg-[#17120d]/88",
    accent: "#c6a45d",
    yin: "#090807",
    yang: "#efe4cf"
  },
  "jade-bronze": {
    label: "Jade and Bronze",
    shell: "from-[#071713] via-[#080808] to-[#2a210f]",
    panel: "bg-[#071713]/82",
    accent: "#b59255",
    yin: "#07110f",
    yang: "#e6dbc6"
  },
  "celestial-tao": {
    label: "Celestial Tao",
    shell: "from-[#07101d] via-[#070707] to-[#351014]",
    panel: "bg-[#08101b]/86",
    accent: "#d2b36b",
    yin: "#05070d",
    yang: "#f0e7d5"
  }
};

function titleCase(value: string) {
  return value.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function currentUrlState() {
  if (typeof window === "undefined") return stateSchema.parse({});
  const params = new URLSearchParams(window.location.search);
  return stateSchema.parse(Object.fromEntries(params.entries()));
}

function initialInstrumentState() {
  const parsed = currentUrlState();
  if (typeof window === "undefined") return parsed;
  const appearance = stateSchema.shape.appearance.safeParse(window.localStorage.getItem("aetherica-taijitu-appearance"));
  const motion = stateSchema.shape.motion.safeParse(window.localStorage.getItem("aetherica-taijitu-motion"));
  return {
    ...parsed,
    appearance: appearance.success ? appearance.data : parsed.appearance,
    motion: motion.success ? motion.data : parsed.motion
  };
}

function updateUrl(state: InstrumentState) {
  const params = new URLSearchParams({
    mode: state.mode,
    cycle: state.cycle,
    stage: state.stage,
    selected: state.selected,
    pair: state.pair,
    framework: state.framework,
    appearance: state.appearance,
    motion: state.motion
  });
  window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
}

type InstrumentState = z.infer<typeof stateSchema>;

function fieldById(id: InstrumentState["selected"]) {
  return polarityFields.find((field) => field.id === id) ?? polarityFields[0];
}

function stageFor(cycleId: string, stageId: string) {
  const cycle = cycles.find((item) => item.id === cycleId) ?? cycles[0];
  return cycle.stages.find((stage) => stage.id === stageId) ?? cycle.stages[0];
}

function stageToSelected(stage: CycleStage): InstrumentState["selected"] {
  if (stage.polarity === "greater-yin") return "yang-seed";
  if (stage.polarity === "greater-yang") return "yin-seed";
  if (stage.polarity === "lesser-yang") return "yang";
  return "yin";
}

export function TaijituPolarityInstrument() {
  const [state, setState] = useState<InstrumentState>(() => initialInstrumentState());
  const [isPlaying, setIsPlaying] = useState(false);
  const [reflection, setReflection] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    prependToolHistory({ tool: "Taijitu Polarity", detail: "Opened the polarity instrument" });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    updateUrl(state);
    window.localStorage.setItem("aetherica-taijitu-appearance", state.appearance);
    window.localStorage.setItem("aetherica-taijitu-motion", state.motion);
  }, [state]);

  useEffect(() => {
    if (!isPlaying || state.motion === "none") return;
    const timer = window.setInterval(() => {
      setState((current) => {
        const cycle = cycles.find((item) => item.id === current.cycle) ?? cycles[0];
        const index = cycle.stages.findIndex((stage) => stage.id === current.stage);
        const nextStage = cycle.stages[(index + 1 + cycle.stages.length) % cycle.stages.length];
        return { ...current, mode: "cycle", stage: nextStage.id, selected: stageToSelected(nextStage) };
      });
    }, state.motion === "full" ? 2600 : 4200);
    return () => window.clearInterval(timer);
  }, [isPlaying, state.cycle, state.motion]);

  const activeField = fieldById(state.selected);
  const activeCycle = cycles.find((cycle) => cycle.id === state.cycle) ?? cycles[0];
  const activeStage = stageFor(state.cycle, state.stage);
  const activePair = polarityPairs.find((pair) => pair.id === state.pair) ?? polarityPairs[0];
  const activeFramework = frameworks.find((framework) => framework.id === state.framework) ?? frameworks[1];
  const style = appearanceStyles[state.appearance];

  function patch(next: Partial<InstrumentState>) {
    setState((current) => ({ ...current, ...next }));
  }

  function selectStage(stage: CycleStage) {
    patch({ mode: "cycle", stage: stage.id, selected: stageToSelected(stage) });
  }

  async function copyLink() {
    await window.navigator.clipboard.writeText(window.location.href);
    setCopyStatus("Copied");
    window.setTimeout(() => setCopyStatus(""), 1800);
  }

  function saveState() {
    prependSavedCalculation({
      kind: "Taijitu Polarity",
      title: "Taijitu Polarity State",
      detail: `${titleCase(state.mode)} mode · ${activeStage.title} · ${activeField.title}`,
      date: new Date().toISOString().slice(0, 10)
    });
    setCopyStatus("Saved");
    window.setTimeout(() => setCopyStatus(""), 1800);
  }

  function saveReflection(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reflection.trim()) return;
    const notes = readJson<ResearchNote[]>(instrumentNotesKey, []);
    writeJson(instrumentNotesKey, [
      {
        id: crypto.randomUUID(),
        tool: "Taijitu Polarity",
        note: reflection.trim(),
        savedAt: new Date().toISOString()
      },
      ...notes
    ].slice(0, 24));
    setReflection("");
    setCopyStatus("Reflection saved");
    window.setTimeout(() => setCopyStatus(""), 1800);
  }

  return (
    <div className="grid gap-10">
      <section className={`relative isolate overflow-hidden rounded-lg border border-gold/30 bg-gradient-to-br ${style.shell} p-6 shadow-aureate lg:p-8`}>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_24%_18%,rgba(231,221,204,.08),transparent_16rem),radial-gradient(circle_at_82%_34%,rgba(181,146,85,.18),transparent_18rem)]" />
        <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[.28em] text-gold">Resources / Taoist cosmological instrument</p>
            <h1 className="font-manuscript-title mt-4 font-display text-5xl leading-none text-ivory md:text-7xl">Taijitu Polarity Instrument</h1>
            <p className="mt-5 max-w-3xl text-xl leading-9 text-parchment">
              Explore the living relationship of yin and yang through cycles, correspondences, transformation, and return.
            </p>
            <p className="mt-5 max-w-4xl leading-8 text-limestone">
              Yin and yang are not static enemies. They are mutually defining, mutually containing, and continuously transforming phases of one process.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#instrument" className="focus-ring inline-flex items-center gap-3 rounded border border-gold/45 bg-gold/15 px-5 py-3 text-sm uppercase tracking-[.18em] text-ivory hover:bg-gold/25">
                Open Instrument <ArrowRight size={18} />
              </a>
              <a href="#principles" className="focus-ring inline-flex items-center gap-3 rounded border border-gold/25 px-5 py-3 text-sm uppercase tracking-[.18em] text-gold hover:border-gold/55 hover:text-ivory">
                <BookOpen size={18} /> Learn the Principles
              </a>
            </div>
          </div>
          <div className="relative mx-auto grid aspect-square w-full max-w-sm place-items-center rounded-full border border-gold/25 bg-black/35 shadow-[inset_0_0_50px_rgba(181,146,85,.13),0_0_70px_rgba(0,0,0,.35)]">
            <TaijituSvg selected={state.selected} field={activeField} style={style} onSelect={(selected) => patch({ selected })} preview />
          </div>
        </div>
      </section>

      <section id="instrument" className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_26rem]">
        <div className={`relative overflow-hidden rounded-lg border border-gold/30 ${style.panel} p-4 shadow-aureate md:p-6`}>
          <div className="flex flex-col gap-4 border-b border-gold/15 pb-4 lg:flex-row lg:items-center lg:justify-between">
            <Segmented label="Mode" options={modes} value={state.mode} onChange={(mode) => patch({ mode })} />
            <div className="flex flex-wrap gap-2">
              <button className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={copyLink}>
                <Share2 size={16} /> Copy Instrument Link
              </button>
              <button className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={saveState}>
                <Save size={16} /> Save State
              </button>
              <button className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={() => setState(stateSchema.parse({}))}>
                <RotateCcw size={16} /> Reset
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(18rem,34rem)_1fr] lg:items-start">
            <div className="relative mx-auto aspect-square w-full max-w-[34rem] rounded-full border border-gold/20 bg-[radial-gradient(circle,rgba(181,146,85,.16),transparent_68%)] p-4">
              <div className="absolute inset-7 rounded-full border border-gold/10" />
              <div className="absolute inset-12 rounded-full border border-gold/10" />
              <TaijituSvg selected={state.selected} field={activeField} style={style} onSelect={(selected) => patch({ selected, mode: state.mode === "scholar" ? "scholar" : "explore" })} />
            </div>

            <div className="grid gap-4">
              <Panel title={activeField.title} label="Current selection">
                <p className="text-lg leading-8 text-parchment">{activeField.short}</p>
                <TagList items={activeField.tendencies} />
                <p className="mt-4 rounded border border-gold/15 bg-black/25 p-3 text-sm leading-6 text-limestone">{activeField.caution}</p>
              </Panel>

              <Panel title="Polarity Pair" label={`${activePair.yin} / ${activePair.yang}`}>
                <select className="focus-ring w-full rounded border border-gold/25 bg-obsidian px-3 py-3 text-ivory" value={state.pair} onChange={(event) => patch({ pair: event.target.value })}>
                  {polarityPairs.map((pair) => <option key={pair.id} value={pair.id}>{pair.yin} / {pair.yang}</option>)}
                </select>
                <p className="mt-3 leading-7 text-parchment">{activePair.explanation}</p>
              </Panel>
            </div>
          </div>

          <div className="mt-6 grid gap-4 border-t border-gold/15 pt-5 md:grid-cols-3">
            <SelectBlock label="Appearance" value={state.appearance} options={appearances} labelFor={(appearance) => appearanceStyles[appearance].label} onChange={(appearance) => patch({ appearance })} />
            <SelectBlock label="Motion" value={state.motion} options={motionSettings} onChange={(motion) => patch({ motion })} />
            <SelectBlock label="Framework" value={state.framework} options={frameworks.map((item) => item.id)} labelFor={(id) => frameworks.find((item) => item.id === id)?.title ?? id} onChange={(framework) => patch({ framework })} />
          </div>
          {copyStatus ? <p className="mt-4 text-sm uppercase tracking-[.16em] text-gold" aria-live="polite">{copyStatus}</p> : null}
        </div>

        <aside className="grid gap-5">
          <Panel title={titleCase(state.mode)} label="Textual View">
            <dl className="grid gap-3 text-sm">
              <InfoRow label="Selected field" value={activeField.title} />
              <InfoRow label="Cycle" value={activeCycle.title} />
              <InfoRow label="Stage" value={`${activeStage.title}: ${activeStage.tendency}`} />
              <InfoRow label="Framework" value={activeFramework.title} />
              <InfoRow label="Motion" value={titleCase(state.motion)} />
            </dl>
            <p className="mt-4 text-sm leading-6 text-parchment">{activeStage.explanation}</p>
          </Panel>

          <Panel title="Cycle Controls" label={activeCycle.title}>
            <div className="flex flex-wrap gap-2">
              {cycles.map((cycle) => (
                <button key={cycle.id} className={`focus-ring rounded border px-3 py-2 text-sm ${state.cycle === cycle.id ? "border-gold bg-gold/15 text-ivory" : "border-gold/20 text-parchment hover:border-gold/45"}`} type="button" onClick={() => patch({ cycle: cycle.id as InstrumentState["cycle"], stage: cycle.stages[0].id })}>
                  {cycle.title}
                </button>
              ))}
            </div>
            <div className="mt-4 grid gap-2">
              {activeCycle.stages.map((stage) => (
                <button key={stage.id} className={`focus-ring rounded border px-3 py-2 text-left ${activeStage.id === stage.id ? "border-gold bg-gold/15 text-ivory" : "border-gold/20 text-parchment hover:border-gold/45"}`} type="button" onClick={() => selectStage(stage)}>
                  <span className="block font-display text-lg">{stage.title}</span>
                  <span className="text-sm text-limestone">{stage.tendency}</span>
                </button>
              ))}
            </div>
            <button className="focus-ring mt-4 inline-flex items-center gap-2 rounded border border-gold/30 px-3 py-2 text-sm uppercase tracking-[.14em] text-gold hover:text-ivory" type="button" onClick={() => setIsPlaying((value) => !value)}>
              {isPlaying ? <Pause size={16} /> : <Play size={16} />} {isPlaying ? "Pause" : "Play"} Cycle
            </button>
          </Panel>
        </aside>
      </section>

      <section id="principles" className="grid gap-6 lg:grid-cols-2">
        <Panel title="Four Images Explorer" label="Taiji to fourfold differentiation">
          <div className="grid gap-3 sm:grid-cols-2">
            {fourImages.map((image) => (
              <button key={image.id} type="button" className={`focus-ring rounded border p-4 text-left ${activeStage.polarity === image.id ? "border-gold bg-gold/15" : "border-gold/20 bg-black/20 hover:border-gold/45"}`} onClick={() => patch({ selected: image.id === "greater-yang" ? "yin-seed" : image.id === "greater-yin" ? "yang-seed" : image.id === "lesser-yang" ? "yang" : "yin" })}>
                <p className="text-xs uppercase tracking-[.18em] text-gold">{image.lineSymbol}</p>
                <h3 className="mt-2 font-display text-2xl text-ivory">{image.title}</h3>
                <p className="mt-2 text-sm leading-6 text-parchment">{image.explanation}</p>
                <p className="mt-3 text-xs text-limestone">{image.daily} · {image.seasonal}</p>
              </button>
            ))}
          </div>
        </Panel>

        <Panel title="Five Phases Relationship" label="Optional interpretive layer">
          <p className="text-sm leading-6 text-limestone">
            This model is clearly labeled as one interpretive mapping. Historical, medical, cosmological, and later symbolic systems may arrange Five Phase relationships differently.
          </p>
          <div className="mt-4 grid gap-3">
            {fivePhases.map((phase) => (
              <div key={phase.id} className="rounded border border-gold/15 bg-black/25 p-3">
                <div className="flex items-center gap-3">
                  <span className="size-5 rounded-full border border-gold/20" style={{ background: phase.color }} />
                  <h3 className="font-display text-xl text-ivory">{phase.name}</h3>
                  <span className="text-xs uppercase tracking-[.14em] text-gold">{phase.polarityRelation}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-parchment">{phase.note}</p>
              </div>
            ))}
          </div>
        </Panel>
      </section>

      <section className="temple-border rounded p-5">
        <div className="flex flex-col gap-3 border-b border-gold/15 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[.24em] text-gold">Taiji to Bagua unfolding</p>
            <h2 className="font-manuscript-title mt-2 font-display text-4xl text-ivory">From non-polarity to eight images</h2>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-limestone">
            In later cosmological formulations, Wuji may be described as undifferentiated non-polarity, while Taiji marks the emergence of dynamic polarity.
          </p>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-5">
          {["Wuji", "Taiji", "Yin / Yang", "Four Images", "Eight Trigrams"].map((stage, index) => (
            <div key={stage} className="rounded border border-gold/15 bg-black/25 p-4">
              <p className="text-xs uppercase tracking-[.18em] text-gold">Stage {index + 1}</p>
              <h3 className="mt-2 font-display text-2xl text-ivory">{stage}</h3>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {trigrams.map((trigram) => (
            <article key={trigram.id} className="rounded border border-gold/15 bg-black/25 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-4xl text-gold">{trigram.chinese}</p>
                  <h3 className="mt-2 font-display text-2xl text-ivory">{trigram.pinyin} · {trigram.english}</h3>
                </div>
                <TrigramLines lines={trigram.linesBottomToTop} />
              </div>
              <p className="mt-3 text-sm text-parchment">{trigram.naturalImage} · {trigram.family}</p>
              <p className="mt-2 text-xs leading-5 text-limestone">Earlier Heaven: {trigram.earlierHeaven}. Later Heaven: {trigram.laterHeaven}. Data marked {trigram.reviewStatus}.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Panel title="Comparison Workspace" label="Relationship, not opposition">
          <div className="grid gap-3 sm:grid-cols-2">
            <ComparisonCard title={activePair.yin} tendency="Dominant yin reading" detail="Consolidates, gathers, cools, or returns depending on context." />
            <ComparisonCard title={activePair.yang} tendency="Dominant yang reading" detail="Expresses, rises, warms, or unfolds depending on context." />
          </div>
          <p className="mt-4 leading-7 text-parchment">The point is not to choose a winner. The instrument asks how the two tendencies define and correct one another.</p>
        </Panel>

        <Panel title="Reflection Mode" label="Private commonplace prompt">
          <form className="grid gap-3" onSubmit={saveReflection}>
            <p className="text-sm leading-6 text-limestone">Reflective, not diagnostic or predictive. Save locally to My Instruments / Commonplace notes.</p>
            <ul className="grid gap-2 text-sm leading-6 text-parchment">
              <li>Where is movement becoming stillness?</li>
              <li>What is reaching fullness and beginning to reverse?</li>
              <li>Where are you mistaking polarity for opposition?</li>
            </ul>
            <textarea className="focus-ring min-h-28 rounded border border-gold/25 bg-obsidian px-3 py-3 text-ivory" value={reflection} onChange={(event) => setReflection(event.target.value)} placeholder="Write a private observation..." />
            <button className="focus-ring inline-flex items-center justify-center gap-2 rounded bg-gold px-4 py-3 font-semibold text-obsidian hover:bg-ivory" type="submit">
              <Clipboard size={16} /> Save Reflection
            </button>
          </form>
        </Panel>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_.9fr]">
        <Panel title="Scholar Mode" label={activeFramework.confidence ?? "review-required"}>
          <Segmented label="Framework" options={frameworks.map((framework) => framework.id)} value={state.framework} onChange={(framework) => patch({ framework })} labelFor={(id) => frameworks.find((framework) => framework.id === id)?.title ?? id} />
          <h3 className="mt-5 font-display text-3xl text-ivory">{activeFramework.title}</h3>
          <p className="mt-3 leading-7 text-parchment">{activeFramework.summary}</p>
          {activeFramework.editorialNotes ? <p className="mt-4 rounded border border-gold/15 bg-black/25 p-3 text-sm leading-6 text-limestone">{activeFramework.editorialNotes}</p> : null}
        </Panel>

        <Panel title="Related Aetherica Content" label="Archive slots">
          <div className="grid gap-3">
            {[
              ["Topic", "Polarity and transformation", "/topics/philosophy"],
              ["Instrument", "Planetary Correspondences", "/resources/planetary-correspondences"],
              ["Instrument", "Tree of Life Explorer", "/resources/tree-of-life"],
              ["Archive", "Transcript Search", "/search?q=polarity+transformation"]
            ].map(([kind, title, href]) => (
              <Link key={title} href={href} className="rounded border border-gold/15 bg-black/25 p-3 hover:border-gold/45">
                <p className="text-xs uppercase tracking-[.16em] text-gold">{kind}</p>
                <p className="mt-1 font-display text-xl text-ivory">{title}</p>
              </Link>
            ))}
          </div>
        </Panel>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Panel title="Sources and Methodology" label="Transparent status">
          <div className="grid gap-3">
            {sources.map((source) => (
              <article key={source.id} className="rounded border border-gold/15 bg-black/25 p-3">
                <p className="text-xs uppercase tracking-[.16em] text-gold">{source.designation} · {source.reviewStatus}</p>
                <h3 className="mt-1 font-display text-xl text-ivory">{source.title}</h3>
                <p className="mt-2 text-sm leading-6 text-parchment">{source.notes}</p>
              </article>
            ))}
          </div>
        </Panel>

        <Panel title="Frequently Asked Questions" label="Interpretive cautions">
          <div className="grid gap-3">
            {faqs.map((faq) => (
              <article key={faq.question} className="rounded border border-gold/15 bg-black/25 p-3">
                <h3 className="font-display text-xl text-ivory">{faq.question}</h3>
                <p className="mt-2 text-sm leading-6 text-parchment">{faq.answer}</p>
              </article>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
}

function TaijituSvg({
  selected,
  field,
  style,
  onSelect,
  preview = false
}: {
  selected: InstrumentState["selected"];
  field: PolarityField;
  style: { accent: string; yin: string; yang: string };
  onSelect: (selected: InstrumentState["selected"]) => void;
  preview?: boolean;
}) {
  const labels: Record<InstrumentState["selected"], string> = {
    yin: "Select Yin field",
    yang: "Select Yang field",
    "yin-seed": "Select Yin within Yang",
    "yang-seed": "Select Yang within Yin"
  };

  function keySelect(event: React.KeyboardEvent<SVGGElement>, value: InstrumentState["selected"]) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect(value);
    }
  }

  return (
    <svg className={`relative z-10 h-full w-full ${preview ? "opacity-90" : ""}`} viewBox="0 0 300 300" role="img" aria-label={`Taijitu polarity instrument. Current selection: ${field.title}`}>
      <defs>
        <filter id="taijitu-depth" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#000000" floodOpacity=".45" />
        </filter>
        <radialGradient id="lacquer-glow" cx="36%" cy="26%" r="75%">
          <stop offset="0%" stopColor="rgba(255,255,255,.3)" />
          <stop offset="48%" stopColor="rgba(255,255,255,.05)" />
          <stop offset="100%" stopColor="rgba(0,0,0,.24)" />
        </radialGradient>
      </defs>
      <circle cx="150" cy="150" r="138" fill="#050505" stroke={style.accent} strokeWidth="5" filter="url(#taijitu-depth)" />
      <path d="M150 12a138 138 0 0 1 0 276a69 69 0 0 1 0-138a69 69 0 0 0 0-138z" fill={style.yang} />
      <path d="M150 12a69 69 0 0 1 0 138a69 69 0 0 0 0 138a138 138 0 0 1 0-276z" fill={style.yin} />
      <circle cx="150" cy="81" r="24" fill={style.yin} stroke={style.accent} strokeOpacity=".28" />
      <circle cx="150" cy="219" r="24" fill={style.yang} stroke={style.accent} strokeOpacity=".28" />
      <circle cx="150" cy="150" r="138" fill="url(#lacquer-glow)" opacity=".45" />
      {(["yin", "yang", "yin-seed", "yang-seed"] as const).map((value) => {
        const isSeed = value.includes("seed");
        const isActive = selected === value;
        const cx = value === "yin-seed" ? 150 : value === "yang-seed" ? 150 : value === "yin" ? 92 : 208;
        const cy = value === "yin-seed" ? 81 : value === "yang-seed" ? 219 : 150;
        const radius = isSeed ? 28 : 70;
        return (
          <g
            key={value}
            role="button"
            tabIndex={0}
            aria-label={labels[value]}
            onClick={() => onSelect(value)}
            onKeyDown={(event) => keySelect(event, value)}
            className="focus:outline-none"
          >
            <circle cx={cx} cy={cy} r={radius} fill="transparent" stroke={isActive ? style.accent : "transparent"} strokeWidth={isActive ? 4 : 1} />
            {isActive ? <circle cx={cx} cy={cy} r={radius + 8} fill="none" stroke={style.accent} strokeOpacity=".35" strokeWidth="2" /> : null}
          </g>
        );
      })}
    </svg>
  );
}

function Segmented<T extends string>({ label, options, value, onChange, labelFor }: { label: string; options: readonly T[] | T[]; value: T; onChange: (value: T) => void; labelFor?: (value: T) => string }) {
  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-[.18em] text-gold">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button key={option} type="button" className={`focus-ring rounded border px-3 py-2 text-sm ${value === option ? "border-gold bg-gold/15 text-ivory" : "border-gold/20 text-parchment hover:border-gold/45"}`} onClick={() => onChange(option)}>
            {labelFor ? labelFor(option) : titleCase(option)}
          </button>
        ))}
      </div>
    </div>
  );
}

function SelectBlock<T extends string>({
  label,
  value,
  options,
  onChange,
  labels,
  labelFor
}: {
  label: string;
  value: T;
  options: readonly T[] | T[];
  onChange: (value: T) => void;
  labels?: Record<string, { label: string }>;
  labelFor?: (value: T) => string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-xs uppercase tracking-[.18em] text-gold">{label}</span>
      <select className="focus-ring rounded border border-gold/25 bg-obsidian px-3 py-3 text-ivory" value={value} onChange={(event) => onChange(event.target.value as T)}>
        {options.map((option) => (
          <option key={option} value={option}>{labelFor ? labelFor(option) : labels?.[option]?.label ?? titleCase(option)}</option>
        ))}
      </select>
    </label>
  );
}

function Panel({ title, label, children }: { title: string; label: string; children: React.ReactNode }) {
  return (
    <article className="rounded border border-gold/20 bg-black/35 p-4">
      <p className="text-xs uppercase tracking-[.18em] text-gold">{label}</p>
      <h2 className="mt-2 font-display text-3xl leading-tight text-ivory">{title}</h2>
      <div className="mt-4">{children}</div>
    </article>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {items.map((item) => <span key={item} className="rounded border border-gold/20 bg-black/35 px-3 py-1 text-sm text-parchment">{item}</span>)}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-gold/10 pt-3 first:border-t-0 first:pt-0">
      <dt className="text-xs uppercase tracking-[.16em] text-gold">{label}</dt>
      <dd className="mt-1 text-parchment">{value}</dd>
    </div>
  );
}

function TrigramLines({ lines }: { lines: Array<"yin" | "yang"> }) {
  return (
    <div className="grid w-14 gap-1.5" aria-hidden="true">
      {[...lines].reverse().map((line, index) => (
        <div key={`${line}-${index}`} className="flex h-2 gap-1">
          {line === "yang" ? <span className="block h-full flex-1 rounded bg-gold" /> : (
            <>
              <span className="block h-full flex-1 rounded bg-gold" />
              <span className="block h-full flex-1 rounded bg-gold" />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function ComparisonCard({ title, tendency, detail }: { title: string; tendency: string; detail: string }) {
  return (
    <article className="rounded border border-gold/15 bg-black/25 p-3">
      <p className="text-xs uppercase tracking-[.16em] text-gold">{tendency}</p>
      <h3 className="mt-2 font-display text-2xl text-ivory">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-parchment">{detail}</p>
    </article>
  );
}
