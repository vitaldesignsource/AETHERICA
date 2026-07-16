"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Clipboard, Pause, Play, RotateCcw, Save, Share2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import {
  faqs,
  interpretations,
  phaseOrder,
  phases,
  relationships,
  seasonalModels,
  sources,
  type WuXingPhase,
  type WuXingPhaseId,
  type WuXingRelationship
} from "@/lib/data/wuxing";
import { instrumentNotesKey, prependSavedCalculation, prependToolHistory, readJson, type ResearchNote, writeJson } from "./instrument-storage";

const cycleOptions = ["generating", "controlling", "overacting", "counteracting", "all", "none"] as const;
const modes = ["wheel", "seasonal", "compare", "reflection", "scholar", "textual"] as const;
const appearances = ["ink-parchment", "jade-bronze", "five-phase-lacquer", "celestial-wu-xing"] as const;
const motionSettings = ["full", "reduced", "none"] as const;

type CycleOption = (typeof cycleOptions)[number];
type Appearance = (typeof appearances)[number];

const stateSchema = z.object({
  phase: z.enum(["wood", "fire", "earth", "metal", "water"]).catch("wood"),
  cycle: z.enum(cycleOptions).catch("generating"),
  mode: z.enum(modes).catch("wheel"),
  compare: z.enum(["wood", "fire", "earth", "metal", "water"]).catch("fire"),
  framework: z.string().catch("classical-cosmology"),
  seasonal: z.string().catch("late-summer"),
  appearance: z.enum(appearances).catch("five-phase-lacquer"),
  motion: z.enum(motionSettings).catch("reduced"),
  relation: z.string().catch("")
});

type InstrumentState = z.infer<typeof stateSchema>;

const appearanceStyles: Record<Appearance, { label: string; shell: string; panel: string; accent: string }> = {
  "ink-parchment": { label: "Ink and Parchment", shell: "from-[#1d1710] via-[#0b0a08] to-[#2a2115]", panel: "bg-[#17120d]/88", accent: "#c6a45d" },
  "jade-bronze": { label: "Jade and Bronze", shell: "from-[#071713] via-[#080808] to-[#2a210f]", panel: "bg-[#071713]/84", accent: "#b59255" },
  "five-phase-lacquer": { label: "Five Phase Lacquer", shell: "from-[#070707] via-[#12090a] to-[#1d1510]", panel: "bg-[#090807]/90", accent: "#b59255" },
  "celestial-wu-xing": { label: "Celestial Wu Xing", shell: "from-[#07101d] via-[#070707] to-[#351014]", panel: "bg-[#08101b]/86", accent: "#d2b36b" }
};

function titleCase(value: string) {
  return value.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function readInitialState() {
  if (typeof window === "undefined") return stateSchema.parse({});
  const params = new URLSearchParams(window.location.search);
  const parsed = stateSchema.parse(Object.fromEntries(params.entries()));
  const appearance = stateSchema.shape.appearance.safeParse(window.localStorage.getItem("aetherica-wuxing-appearance"));
  const motion = stateSchema.shape.motion.safeParse(window.localStorage.getItem("aetherica-wuxing-motion"));
  return {
    ...parsed,
    appearance: appearance.success ? appearance.data : parsed.appearance,
    motion: motion.success ? motion.data : parsed.motion
  };
}

function updateUrl(state: InstrumentState) {
  const params = new URLSearchParams({
    phase: state.phase,
    cycle: state.cycle,
    mode: state.mode,
    compare: state.compare,
    framework: state.framework,
    seasonal: state.seasonal,
    appearance: state.appearance,
    motion: state.motion,
    relation: state.relation
  });
  window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
}

function phaseById(id: WuXingPhaseId) {
  return phases.find((phase) => phase.id === id) ?? phases[0];
}

function relationForPhase(phaseId: WuXingPhaseId, cycle: CycleOption) {
  const type = cycle === "all" || cycle === "none" ? "generating" : cycle;
  return relationships.find((item) => item.type === type && item.sourcePhaseId === phaseId) ?? relationships[0];
}

function activeRelationship(state: InstrumentState) {
  return relationships.find((item) => item.id === state.relation) ?? relationForPhase(state.phase, state.cycle);
}

function nodePosition(index: number, radius = 126) {
  const angle = (index / phaseOrder.length) * Math.PI * 2 - Math.PI / 2;
  return {
    x: 180 + Math.cos(angle) * radius,
    y: 180 + Math.sin(angle) * radius
  };
}

function relationshipPath(relationship: WuXingRelationship, radius = 126) {
  const sourceIndex = phaseOrder.indexOf(relationship.sourcePhaseId);
  const targetIndex = phaseOrder.indexOf(relationship.targetPhaseId);
  const source = nodePosition(sourceIndex, radius);
  const target = nodePosition(targetIndex, radius);
  return { source, target };
}

export function FivePhasesWheel() {
  const [state, setState] = useState<InstrumentState>(() => readInitialState());
  const [playing, setPlaying] = useState(false);
  const [reflection, setReflection] = useState("");
  const [status, setStatus] = useState("");

  const activePhase = phaseById(state.phase);
  const comparePhase = phaseById(state.compare);
  const activeRelation = activeRelationship(state);
  const framework = interpretations.find((item) => item.id === state.framework) ?? interpretations[0];
  const seasonalModel = seasonalModels.find((item) => item.id === state.seasonal) ?? seasonalModels[1];
  const style = appearanceStyles[state.appearance];

  const visibleRelationships = useMemo(() => {
    if (state.cycle === "none") return [];
    if (state.cycle === "all") return relationships;
    return relationships.filter((item) => item.type === state.cycle);
  }, [state.cycle]);

  useEffect(() => {
    prependToolHistory({ tool: "Five Phases Wheel", detail: "Opened the Wu Xing instrument" });
  }, []);

  useEffect(() => {
    updateUrl(state);
    window.localStorage.setItem("aetherica-wuxing-appearance", state.appearance);
    window.localStorage.setItem("aetherica-wuxing-motion", state.motion);
  }, [state]);

  useEffect(() => {
    if (!playing || state.motion === "none") return;
    const timer = window.setInterval(() => {
      setState((current) => {
        const index = phaseOrder.indexOf(current.phase);
        const nextPhase = phaseOrder[(index + 1) % phaseOrder.length];
        return { ...current, phase: nextPhase, relation: relationForPhase(nextPhase, current.cycle).id };
      });
    }, state.motion === "full" ? 2400 : 3800);
    return () => window.clearInterval(timer);
  }, [playing, state.motion]);

  function patch(next: Partial<InstrumentState>) {
    setState((current) => ({ ...current, ...next }));
  }

  function selectPhase(phaseId: WuXingPhaseId) {
    patch({ phase: phaseId, relation: relationForPhase(phaseId, state.cycle).id });
  }

  function step(direction: 1 | -1) {
    const index = phaseOrder.indexOf(state.phase);
    const nextPhase = phaseOrder[(index + direction + phaseOrder.length) % phaseOrder.length];
    selectPhase(nextPhase);
  }

  async function copyLink() {
    await window.navigator.clipboard.writeText(window.location.href);
    setStatus("Copied");
    window.setTimeout(() => setStatus(""), 1800);
  }

  function saveState() {
    prependSavedCalculation({
      kind: "Five Phases Wheel",
      title: `${activePhase.englishName} in ${titleCase(state.cycle)} cycle`,
      detail: `${activeRelation.title}. Framework: ${framework.framework}.`,
      date: new Date().toISOString().slice(0, 10)
    });
    setStatus("Saved");
    window.setTimeout(() => setStatus(""), 1800);
  }

  function saveReflection(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reflection.trim()) return;
    const notes = readJson<ResearchNote[]>(instrumentNotesKey, []);
    writeJson(instrumentNotesKey, [
      { id: crypto.randomUUID(), tool: "Five Phases Wheel", note: reflection.trim(), savedAt: new Date().toISOString() },
      ...notes
    ].slice(0, 24));
    setReflection("");
    setStatus("Reflection saved");
    window.setTimeout(() => setStatus(""), 1800);
  }

  return (
    <div className="grid gap-10">
      <section className={`relative isolate overflow-hidden rounded-lg border border-gold/30 bg-gradient-to-br ${style.shell} p-6 shadow-aureate lg:p-8`}>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_18%,rgba(231,221,204,.08),transparent_16rem),radial-gradient(circle_at_82%_28%,rgba(181,146,85,.18),transparent_18rem)]" />
        <div className="grid gap-8 lg:grid-cols-[1fr_25rem] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[.28em] text-gold">Resources / Taoist cosmological instrument</p>
            <h1 className="font-manuscript-title mt-4 font-display text-5xl leading-none text-ivory md:text-7xl">Five Phases Wheel</h1>
            <p className="mt-2 font-display text-3xl text-gold">Wu Xing Instrument</p>
            <p className="mt-5 max-w-3xl text-xl leading-9 text-parchment">
              Explore Wood, Fire, Earth, Metal, and Water as living phases of generation, regulation, transformation, and return.
            </p>
            <p className="mt-5 max-w-4xl leading-8 text-limestone">
              The Five Phases are not five inert elements. They are five recurring modes of change whose meaning emerges through movement, sequence, regulation, and relationship.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#instrument" className="focus-ring inline-flex items-center gap-3 rounded border border-gold/45 bg-gold/15 px-5 py-3 text-sm uppercase tracking-[.18em] text-ivory hover:bg-gold/25">
                Open Instrument <ArrowRight size={18} />
              </a>
              <a href="#cycles" className="focus-ring inline-flex items-center gap-3 rounded border border-gold/25 px-5 py-3 text-sm uppercase tracking-[.18em] text-gold hover:border-gold/55 hover:text-ivory">
                <BookOpen size={18} /> Learn the Cycles
              </a>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-sm rounded-full border border-gold/25 bg-black/35 p-4 shadow-[inset_0_0_50px_rgba(181,146,85,.13),0_0_70px_rgba(0,0,0,.35)]">
            <WheelSvg activePhase={activePhase} visibleRelationships={relationships.filter((item) => item.type === "generating")} selectedRelationship={activeRelation} accent={style.accent} onSelectPhase={selectPhase} onSelectRelationship={(relation) => patch({ relation: relation.id })} preview />
          </div>
        </div>
      </section>

      <section id="instrument" className="grid gap-6 min-[1900px]:grid-cols-[minmax(0,1fr)_27rem]">
        <div className={`relative overflow-hidden rounded-lg border border-gold/30 ${style.panel} p-4 shadow-aureate md:p-6`}>
          <div className="flex flex-col gap-4 border-b border-gold/15 pb-4 lg:flex-row lg:items-center lg:justify-between">
            <Segmented label="Mode" options={modes} value={state.mode} onChange={(mode) => patch({ mode })} />
            <div className="flex flex-wrap gap-2">
              <button className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={copyLink}><Share2 size={16} /> Copy Link</button>
              <button className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={saveState}><Save size={16} /> Save State</button>
              <button className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={() => setState(stateSchema.parse({}))}><RotateCcw size={16} /> Reset</button>
            </div>
          </div>

          <div className="mt-6 grid gap-6 min-[1700px]:grid-cols-[minmax(24rem,42rem)_1fr]">
            <div className="relative mx-auto aspect-square w-full max-w-[42rem] rounded-full border border-gold/20 bg-[radial-gradient(circle,rgba(181,146,85,.16),transparent_68%)] p-4">
              <WheelSvg activePhase={activePhase} visibleRelationships={visibleRelationships} selectedRelationship={activeRelation} accent={style.accent} onSelectPhase={selectPhase} onSelectRelationship={(relation) => patch({ relation: relation.id, phase: relation.sourcePhaseId })} />
            </div>
            <div className="grid gap-4 lg:grid-cols-2 min-[1700px]:grid-cols-1">
              <Panel title={`${activePhase.englishName} — ${activePhase.chineseCharacter} — ${activePhase.pinyin}`} label="Selected phase">
                <p className="leading-7 text-parchment">{activePhase.movementDescription}</p>
                <TagList items={activePhase.coreTendencies} />
                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-3 min-[1700px]:grid-cols-2">
                  <InfoRow label="Generates" value={phaseById(activePhase.generatingTargetId).englishName} />
                  <InfoRow label="Controls" value={phaseById(activePhase.controllingTargetId).englishName} />
                  <InfoRow label="Generated by" value={phaseById(activePhase.generatedById).englishName} />
                  <InfoRow label="Controlled by" value={phaseById(activePhase.controlledById).englishName} />
                  <InfoRow label="Season" value={activePhase.seasonal} />
                  <InfoRow label="Direction" value={activePhase.direction} />
                </dl>
              </Panel>
              <Panel title={activeRelation.title} label={`${titleCase(activeRelation.type)} relationship`}>
                <p className="leading-7 text-parchment">{activeRelation.summary}</p>
                <p className="mt-3 text-sm leading-6 text-limestone">Symbolic cosmology is being described here, not modern scientific causation.</p>
              </Panel>
            </div>
          </div>

          <div id="cycles" className="mt-6 grid gap-4 border-t border-gold/15 pt-5 md:grid-cols-4">
            <SelectBlock label="Cycle overlay" value={state.cycle} options={cycleOptions} onChange={(cycle) => patch({ cycle, relation: relationForPhase(state.phase, cycle).id })} />
            <SelectBlock label="Appearance" value={state.appearance} options={appearances} labelFor={(appearance) => appearanceStyles[appearance].label} onChange={(appearance) => patch({ appearance })} />
            <SelectBlock label="Motion" value={state.motion} options={["full", "reduced", "none"] as const} onChange={(motion) => patch({ motion })} />
            <SelectBlock label="Seasonal model" value={state.seasonal} options={seasonalModels.map((model) => model.id)} labelFor={(id) => seasonalModels.find((model) => model.id === id)?.title ?? id} onChange={(seasonal) => patch({ seasonal })} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="focus-ring rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={() => step(-1)}>Step Back</button>
            <button className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={() => setPlaying((value) => !value)}>
              {playing ? <Pause size={16} /> : <Play size={16} />} {playing ? "Pause" : "Play"} Sequence
            </button>
            <button className="focus-ring rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={() => step(1)}>Step Forward</button>
          </div>
          {status ? <p className="mt-4 text-sm uppercase tracking-[.16em] text-gold" aria-live="polite">{status}</p> : null}
        </div>

        <aside className="grid gap-5 md:grid-cols-2 min-[1900px]:grid-cols-1">
          <Panel title="Textual View" label="Accessible equivalent">
            <dl className="grid gap-3 text-sm">
              <InfoRow label="Selected phase" value={`${activePhase.englishName} / ${activePhase.pinyin}`} />
              <InfoRow label="Active cycle" value={titleCase(state.cycle)} />
              <InfoRow label="Generates" value={phaseById(activePhase.generatingTargetId).englishName} />
              <InfoRow label="Generated by" value={phaseById(activePhase.generatedById).englishName} />
              <InfoRow label="Controls" value={phaseById(activePhase.controllingTargetId).englishName} />
              <InfoRow label="Controlled by" value={phaseById(activePhase.controlledById).englishName} />
              <InfoRow label="Comparison" value={`${activePhase.englishName} and ${comparePhase.englishName}`} />
              <InfoRow label="Framework" value={framework.framework} />
            </dl>
          </Panel>
          <Panel title="Cycle Legend" label="Line patterns">
            <div className="grid gap-3 text-sm text-parchment">
              <LegendRow label="Generating" detail="Outer circular flow" className="border-solid" />
              <LegendRow label="Controlling" detail="Inner regulating star" className="border-dashed" />
              <LegendRow label="Overacting" detail="Excessive regulation" className="border-double" />
              <LegendRow label="Counteracting" detail="Reversed pushback" className="border-dotted" />
            </div>
          </Panel>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Panel title="Seasonal Explorer" label={seasonalModel.title}>
          <p className="leading-7 text-parchment">{seasonalModel.summary}</p>
          <div className="mt-4 grid gap-3">
            {seasonalModel.sequence.map((phaseId, index) => {
              const phase = phaseById(phaseId);
              return (
                <button key={`${phaseId}-${index}`} type="button" className={`focus-ring rounded border p-3 text-left ${activePhase.id === phaseId ? "border-gold bg-gold/15" : "border-gold/20 bg-black/20 hover:border-gold/45"}`} onClick={() => selectPhase(phaseId)}>
                  <span className="text-xs uppercase tracking-[.16em] text-gold">Seasonal station {index + 1}</span>
                  <span className="mt-1 block font-display text-2xl text-ivory">{phase.englishName} · {phase.seasonal}</span>
                </button>
              );
            })}
          </div>
        </Panel>

        <Panel title="Taijitu and Bagua Relationship" label="Integration boundary">
          <p className="leading-7 text-parchment">
            One interpretive bridge maps yang emerging to Wood, yang flourishing to Fire, yin emerging to Metal, yin flourishing to Water, and Earth to central or transitional mediation.
          </p>
          <p className="mt-3 text-sm leading-6 text-limestone">
            This is labeled as an interpretive model, not a universal Taoist doctrine. Bagua-phase relationships should be framework-labeled before deeper publication.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/resources/taijitu-polarity" className="focus-ring inline-flex items-center gap-2 rounded border border-gold/30 px-4 py-2 text-sm uppercase tracking-[.14em] text-gold hover:text-ivory">Open Taijitu <ArrowRight size={15} /></Link>
          </div>
        </Panel>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_.9fr]">
        <Panel title="Correspondence Matrix" label="Framework-labeled rows">
          <p className="mb-4 text-sm leading-6 text-limestone">Medical-system correspondences are historical-symbolic references only, not medical guidance.</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
              <thead className="text-xs uppercase tracking-[.16em] text-gold">
                <tr>
                  <th className="border-b border-gold/20 p-3">Phase</th>
                  <th className="border-b border-gold/20 p-3">Category</th>
                  <th className="border-b border-gold/20 p-3">Value</th>
                  <th className="border-b border-gold/20 p-3">Framework</th>
                  <th className="border-b border-gold/20 p-3">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {phases.flatMap((phase) => phase.correspondences.map((row) => (
                  <tr key={row.id} className="text-parchment">
                    <td className="border-b border-gold/10 p-3">{phase.englishName}</td>
                    <td className="border-b border-gold/10 p-3">{row.category}</td>
                    <td className="border-b border-gold/10 p-3">{row.value}</td>
                    <td className="border-b border-gold/10 p-3">{row.frameworkId}</td>
                    <td className="border-b border-gold/10 p-3">{row.confidence}</td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Compare Mode" label={`${activePhase.englishName} and ${comparePhase.englishName}`}>
          <SelectBlock label="Compare with" value={state.compare} options={phaseOrder} labelFor={(id) => phaseById(id).englishName} onChange={(compare) => patch({ compare, mode: "compare" })} />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <ComparisonCard phase={activePhase} />
            <ComparisonCard phase={comparePhase} />
          </div>
        </Panel>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Panel title="Balance and Reflection" label="Non-diagnostic contemplation">
          <p className="text-sm leading-6 text-limestone">This reflective tool is not a medical assessment, diagnosis, or treatment recommendation.</p>
          <ul className="mt-4 grid gap-2 text-sm leading-6 text-parchment">
            <li>Where is there too much expansion?</li>
            <li>Where has regulation become domination?</li>
            <li>What may require rest before renewal?</li>
            <li>What complementary quality is missing?</li>
          </ul>
          <form className="mt-4 grid gap-3" onSubmit={saveReflection}>
            <textarea className="focus-ring min-h-28 rounded border border-gold/25 bg-obsidian px-3 py-3 text-ivory" value={reflection} onChange={(event) => setReflection(event.target.value)} placeholder="Write a private observation..." />
            <button className="focus-ring inline-flex items-center justify-center gap-2 rounded bg-gold px-4 py-3 font-semibold text-obsidian hover:bg-ivory" type="submit"><Clipboard size={16} /> Save Reflection</button>
          </form>
        </Panel>

        <Panel title="Related Aetherica Content" label="Archive slots">
          <div className="grid gap-3">
            {[
              ["Instrument", "Taijitu Polarity Instrument", "/resources/taijitu-polarity"],
              ["Archive", "Transcript Search: transformation", "/search?q=transformation"],
              ["Topic", "Philosophy", "/topics/philosophy"],
              ["Instrument", "Tattvic Tides", "/resources/tattvic-tides"]
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
        <Panel title="Scholar Mode" label={framework.confidence}>
          <Segmented label="Framework" options={interpretations.map((item) => item.id)} value={state.framework} labelFor={(id) => interpretations.find((item) => item.id === id)?.framework ?? id} onChange={(frameworkId) => patch({ framework: frameworkId, mode: "scholar" })} />
          <h3 className="mt-5 font-display text-3xl text-ivory">{framework.framework}</h3>
          <p className="mt-3 leading-7 text-parchment">{framework.summary}</p>
          {framework.editorialNotes ? <p className="mt-4 rounded border border-gold/15 bg-black/25 p-3 text-sm leading-6 text-limestone">{framework.editorialNotes}</p> : null}
        </Panel>

        <Panel title="Sources and FAQ" label="Methodology">
          <div className="grid gap-3">
            {sources.map((source) => (
              <article key={source.id} className="rounded border border-gold/15 bg-black/25 p-3">
                <p className="text-xs uppercase tracking-[.16em] text-gold">{source.designation} · {source.verificationStatus}</p>
                <h3 className="mt-1 font-display text-xl text-ivory">{source.title}</h3>
                <p className="mt-2 text-sm leading-6 text-parchment">{source.notes}</p>
              </article>
            ))}
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

function WheelSvg({
  activePhase,
  visibleRelationships,
  selectedRelationship,
  accent,
  onSelectPhase,
  onSelectRelationship,
  preview = false
}: {
  activePhase: WuXingPhase;
  visibleRelationships: WuXingRelationship[];
  selectedRelationship: WuXingRelationship;
  accent: string;
  onSelectPhase: (phaseId: WuXingPhaseId) => void;
  onSelectRelationship: (relationship: WuXingRelationship) => void;
  preview?: boolean;
}) {
  return (
    <svg className="h-full w-full" viewBox="0 0 360 360" role="img" aria-label={`Five Phases Wheel. Selected phase: ${activePhase.englishName}. Selected relationship: ${selectedRelationship.title}.`}>
      <defs>
        <filter id="wuxing-depth" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="9" stdDeviation="8" floodColor="#000000" floodOpacity=".42" />
        </filter>
        <marker id="wuxing-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill={accent} />
        </marker>
      </defs>
      <circle cx="180" cy="180" r="166" fill="rgba(0,0,0,.42)" stroke="rgba(181,146,85,.34)" strokeWidth="2" />
      <circle cx="180" cy="180" r="100" fill="rgba(0,0,0,.24)" stroke="rgba(181,146,85,.16)" />
      {visibleRelationships.map((relationship) => {
        const { source, target } = relationshipPath(relationship, relationship.type === "generating" ? 128 : 92);
        const active = relationship.id === selectedRelationship.id;
        return (
          <g key={relationship.id} role="button" tabIndex={0} aria-label={relationship.title} onClick={() => onSelectRelationship(relationship)} onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onSelectRelationship(relationship);
            }
          }}>
            <line x1={source.x} y1={source.y} x2={target.x} y2={target.y} stroke="rgba(0,0,0,.72)" strokeWidth={active ? 8 : 6} strokeLinecap="round" />
            <line
              x1={source.x}
              y1={source.y}
              x2={target.x}
              y2={target.y}
              stroke={active ? accent : "rgba(181,146,85,.72)"}
              strokeWidth={active ? 3 : 2}
              strokeLinecap="round"
              strokeDasharray={relationship.type === "controlling" ? "7 5" : relationship.type === "overacting" ? "2 5" : relationship.type === "counteracting" ? "10 3 2 3" : undefined}
              markerEnd="url(#wuxing-arrow)"
            />
          </g>
        );
      })}
      <circle cx="180" cy="180" r="54" fill="rgba(8,8,8,.9)" stroke={accent} strokeWidth="2" filter="url(#wuxing-depth)" />
      <text x="180" y="170" textAnchor="middle" fill="#e7ddcc" fontSize="15" fontFamily="Georgia, serif">Wu Xing</text>
      <text x="180" y="194" textAnchor="middle" fill={accent} fontSize="26" fontFamily="Georgia, serif">{activePhase.chineseCharacter}</text>
      {phases.map((phase, index) => {
        const position = nodePosition(index);
        const active = phase.id === activePhase.id;
        return (
          <g key={phase.id} role="button" tabIndex={0} aria-label={`Select ${phase.englishName}, ${phase.pinyin}`} onClick={() => onSelectPhase(phase.id)} onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onSelectPhase(phase.id);
            }
          }}>
            <circle cx={position.x} cy={position.y} r={active ? 42 : 37} fill={phase.color} stroke={active ? accent : "rgba(231,221,204,.42)"} strokeWidth={active ? 4 : 2} filter="url(#wuxing-depth)" opacity={preview ? .92 : 1} />
            <circle cx={position.x - 10} cy={position.y - 12} r="12" fill="rgba(255,255,255,.16)" />
            <text x={position.x} y={position.y - 4} textAnchor="middle" fill={phase.id === "metal" || phase.id === "earth" ? "#080808" : "#fff7e8"} fontSize="26" fontFamily="Georgia, serif">{phase.chineseCharacter}</text>
            <text x={position.x} y={position.y + 19} textAnchor="middle" fill={phase.id === "metal" || phase.id === "earth" ? "#080808" : "#fff7e8"} fontSize="12" fontFamily="Georgia, serif">{phase.englishName}</text>
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

function SelectBlock<T extends string>({ label, value, options, onChange, labelFor }: { label: string; value: T; options: readonly T[] | T[]; onChange: (value: T) => void; labelFor?: (value: T) => string }) {
  return (
    <label className="grid gap-2">
      <span className="text-xs uppercase tracking-[.18em] text-gold">{label}</span>
      <select className="focus-ring rounded border border-gold/25 bg-obsidian px-3 py-3 text-ivory" value={value} onChange={(event) => onChange(event.target.value as T)}>
        {options.map((option) => <option key={option} value={option}>{labelFor ? labelFor(option) : titleCase(option)}</option>)}
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

function LegendRow({ label, detail, className }: { label: string; detail: string; className: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`h-0 w-16 border-t-2 border-gold ${className}`} />
      <span><strong className="text-ivory">{label}:</strong> {detail}</span>
    </div>
  );
}

function ComparisonCard({ phase }: { phase: WuXingPhase }) {
  return (
    <article className="rounded border border-gold/15 bg-black/25 p-3">
      <p className="text-3xl text-gold">{phase.chineseCharacter}</p>
      <h3 className="mt-1 font-display text-2xl text-ivory">{phase.englishName}</h3>
      <p className="mt-2 text-sm leading-6 text-parchment">{phase.movementDescription}</p>
    </article>
  );
}
