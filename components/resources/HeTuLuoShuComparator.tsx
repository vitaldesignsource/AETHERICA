"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, RotateCcw, Save, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { trigramById } from "@/lib/data/bagua";
import {
  frameworks,
  heTuPairs,
  luoShuCells,
  magicLines,
  numberRecord,
  phaseLabels,
  sources,
  type DisplayMode,
  type PhaseId
} from "@/lib/data/he-tu-luo-shu";
import { prependSavedCalculation, prependToolHistory } from "./instrument-storage";

const diagrams = ["he-tu", "luo-shu"] as const;
const modes = ["side-by-side", "structural", "mathematical", "historical", "textual"] as const;
const displays = ["dots", "arabic", "chinese", "combined", "scholarly"] as const;
const orientations = ["south-up", "north-up", "source-original"] as const;
const overlays = ["none", "five-phase", "bagua", "both"] as const;
const phases = ["water", "fire", "wood", "metal", "earth"] as const;

const stateSchema = z.object({
  diagram: z.enum(diagrams).catch("he-tu"),
  mode: z.enum(modes).catch("side-by-side"),
  display: z.enum(displays).catch("combined"),
  orientation: z.enum(orientations).catch("south-up"),
  overlay: z.enum(overlays).catch("both"),
  number: z.coerce.number().int().min(1).max(10).catch(5),
  phase: z.enum(phases).catch("earth"),
  framework: z.string().catch("received-cosmological")
});

type InstrumentState = z.infer<typeof stateSchema>;

function readInitialState() {
  if (typeof window === "undefined") return stateSchema.parse({});
  const params = new URLSearchParams(window.location.search);
  return stateSchema.parse(Object.fromEntries(params.entries()));
}

function updateUrl(state: InstrumentState) {
  const params = new URLSearchParams({
    diagram: state.diagram,
    mode: state.mode,
    display: state.display,
    orientation: state.orientation,
    overlay: state.overlay,
    number: String(state.number),
    phase: state.phase,
    framework: state.framework
  });
  window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
}

function titleCase(value: string) {
  return value.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

export function HeTuLuoShuComparator() {
  const [state, setState] = useState<InstrumentState>(() => readInitialState());
  const [status, setStatus] = useState("");
  const selected = numberRecord(state.number);
  const framework = frameworks.find((item) => item.id === state.framework) ?? frameworks[0];

  useEffect(() => {
    prependToolHistory({ tool: "He Tu and Luo Shu", detail: "Opened the number-diagram comparator" });
  }, []);

  useEffect(() => {
    updateUrl(state);
  }, [state]);

  function patch(next: Partial<InstrumentState>) {
    setState((current) => ({ ...current, ...next }));
  }

  async function copyLink() {
    await window.navigator.clipboard.writeText(window.location.href);
    setStatus("Copied");
    window.setTimeout(() => setStatus(""), 1600);
  }

  function saveState() {
    prependSavedCalculation({
      kind: "He Tu and Luo Shu",
      title: `${titleCase(state.diagram)} · ${selected.value}`,
      detail: `${selected.direction} · ${phaseLabels[selected.phase].name} · ${framework.title}`,
      date: new Date().toISOString().slice(0, 10)
    });
    setStatus("Saved");
    window.setTimeout(() => setStatus(""), 1600);
  }

  return (
    <div className="grid gap-10">
      <section className="relative isolate overflow-hidden rounded-lg border border-gold/30 bg-gradient-to-br from-[#071713] via-[#070707] to-[#2a170f] p-6 shadow-aureate lg:p-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_18%,rgba(231,221,204,.08),transparent_16rem),radial-gradient(circle_at_82%_34%,rgba(181,146,85,.18),transparent_18rem)]" />
        <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[.28em] text-gold">Resources / Taoist number diagrams</p>
            <h1 className="font-manuscript-title mt-4 font-display text-5xl leading-none text-ivory md:text-7xl">He Tu and Luo Shu Comparator</h1>
            <p className="mt-5 max-w-3xl text-xl leading-9 text-parchment">
              Explore two foundational Chinese cosmological number diagrams through pairing, direction, phase, spatial order, and historical interpretation.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#comparator" className="focus-ring inline-flex items-center gap-3 rounded border border-gold/45 bg-gold/15 px-5 py-3 text-sm uppercase tracking-[.18em] text-ivory hover:bg-gold/25">Open Comparator <ArrowRight size={18} /></a>
              <Link href="/resources/bagua" className="focus-ring inline-flex items-center gap-3 rounded border border-gold/25 px-5 py-3 text-sm uppercase tracking-[.18em] text-gold hover:border-gold/55 hover:text-ivory"><BookOpen size={18} /> Bagua Instrument</Link>
            </div>
          </div>
          <div className="rounded-lg border border-gold/20 bg-black/35 p-4">
            <LuoShuGrid selected={state.number} display="combined" overlay="both" onSelect={(number) => patch({ number, diagram: "luo-shu" })} />
          </div>
        </div>
      </section>

      <section id="comparator" className="grid gap-6 xl:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="rounded-lg border border-gold/25 bg-black/35 p-4 shadow-aureate">
          <p className="text-xs uppercase tracking-[.22em] text-gold">Controls</p>
          <Segmented label="Mode" options={modes} value={state.mode} onChange={(mode) => patch({ mode })} />
          <SelectBlock label="Active diagram" value={state.diagram} values={diagrams} onChange={(diagram) => patch({ diagram })} />
          <SelectBlock label="Display" value={state.display} values={displays} onChange={(display) => patch({ display })} />
          <SelectBlock label="Orientation" value={state.orientation} values={orientations} onChange={(orientation) => patch({ orientation })} />
          <SelectBlock label="Overlay" value={state.overlay} values={overlays} onChange={(overlay) => patch({ overlay })} />
          <SelectBlock label="Phase focus" value={state.phase} values={phases} onChange={(phase) => patch({ phase })} />
          <div className="mt-4 grid gap-2">
            <button className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={copyLink}><Share2 size={16} /> Copy Link</button>
            <button className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={saveState}><Save size={16} /> Save State</button>
            <button className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={() => setState(stateSchema.parse({}))}><RotateCcw size={16} /> Reset</button>
          </div>
          {status ? <p className="mt-3 text-sm text-gold">{status}</p> : null}
        </aside>

        <div className="grid gap-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Panel title="He Tu — River Diagram" eyebrow="Number pairs">
              <HeTuDiagram selected={state.number} display={state.display} overlay={state.overlay} phase={state.phase} onSelect={(number) => patch({ number, diagram: "he-tu", phase: numberRecord(number).phase })} />
            </Panel>
            <Panel title="Luo Shu — Luo River Writing" eyebrow="Nine-palace magic square">
              <LuoShuGrid selected={state.number} display={state.display} overlay={state.overlay} onSelect={(number) => patch({ number, diagram: "luo-shu", phase: numberRecord(number).phase })} />
            </Panel>
          </div>

          <Panel title={`${selected.chineseNumeral} · Number ${selected.value}`} eyebrow={`${selected.polarity} · ${selected.direction} · ${phaseLabels[selected.phase].name}`}>
            <p className="leading-7 text-parchment">{selected.note}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-4">
              <Info label="Polarity" value={titleCase(selected.polarity)} />
              <Info label="Direction" value={selected.direction} />
              <Info label="Five Phase" value={`${phaseLabels[selected.phase].name}: ${phaseLabels[selected.phase].text}`} />
              <Info label="Bagua overlay" value={selected.trigramId ? `${trigramById(selected.trigramId).pinyin} · ${trigramById(selected.trigramId).symbol}` : "Center varies by framework"} />
            </div>
          </Panel>

          {state.mode === "mathematical" ? (
            <Panel title="Luo Shu Mathematical Verification" eyebrow="Rows, columns, diagonals">
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {magicLines.map((line) => (
                  <button key={line.id} type="button" className={`focus-ring rounded border p-3 text-left ${line.values.includes(state.number) ? "border-gold bg-gold/10 text-ivory" : "border-gold/15 bg-black/25 text-parchment"}`} onClick={() => patch({ number: line.values[1], diagram: "luo-shu" })}>
                    <p className="text-xs uppercase tracking-[.16em] text-gold">{line.label}</p>
                    <p className="mt-1 font-display text-xl">{line.values.join(" + ")} = {line.values.reduce((sum, value) => sum + value, 0)}</p>
                  </button>
                ))}
              </div>
            </Panel>
          ) : null}

          {state.mode === "structural" || state.mode === "historical" || state.mode === "textual" ? (
            <Panel title={state.mode === "historical" ? "Historical and Methodological Notes" : "Structural Comparison"} eyebrow={framework.title}>
              <p className="leading-7 text-parchment">{framework.summary}</p>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <Info label="He Tu" value="Paired numbers 1-10, often read through polarity, direction, and Five Phase pairing." />
                <Info label="Luo Shu" value="A nine-palace field whose rows, columns, and diagonals sum to fifteen." />
                <Info label="Orientation" value={`${titleCase(state.orientation)} is explicit so rotation is never silent.`} />
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {sources.map((source) => (
                  <div key={source.id} className="rounded border border-gold/15 bg-black/25 p-3">
                    <p className="text-xs uppercase tracking-[.16em] text-gold">{source.type}</p>
                    <p className="mt-1 font-display text-xl text-ivory">{source.title}</p>
                    <p className="mt-2 text-sm leading-6 text-limestone">{source.note}</p>
                  </div>
                ))}
              </div>
            </Panel>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function HeTuDiagram({ selected, display, overlay, phase, onSelect }: { selected: number; display: DisplayMode; overlay: string; phase: PhaseId; onSelect: (number: number) => void }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md rounded-full border border-gold/20 bg-black/30">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="43" fill="none" stroke="rgba(181,146,85,.28)" />
        <line x1="50" y1="9" x2="50" y2="91" stroke="rgba(181,146,85,.12)" />
        <line x1="9" y1="50" x2="91" y2="50" stroke="rgba(181,146,85,.12)" />
      </svg>
      {heTuPairs.map((pair) => {
        const active = pair.values.includes(selected) || phase === pair.phase;
        const phaseStyle = phaseLabels[pair.phase];
        return (
          <button key={pair.id} type="button" className={`focus-ring absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border p-3 text-center ${active ? "border-gold bg-gold/15 text-ivory" : "border-gold/25 bg-black/75 text-parchment"}`} style={{ left: `${pair.position.x}%`, top: `${pair.position.y}%`, minWidth: "5.6rem", boxShadow: active ? `0 0 28px ${phaseStyle.color}55` : undefined }} onClick={() => onSelect(pair.values[0])}>
            <span className="text-xs uppercase tracking-[.14em] text-gold">{pair.direction}</span>
            <span className="font-display text-2xl">{displayNumbers(pair.values, display)}</span>
            {overlay !== "none" ? <span className="text-xs" style={{ color: phaseStyle.color }}>{phaseStyle.name}</span> : null}
          </button>
        );
      })}
    </div>
  );
}

function LuoShuGrid({ selected, display, overlay, onSelect }: { selected: number; display: DisplayMode; overlay: string; onSelect: (number: number) => void }) {
  return (
    <div className="mx-auto grid aspect-square w-full max-w-md grid-cols-3 gap-2 rounded border border-gold/20 bg-black/30 p-3">
      {luoShuCells.map((cell) => {
        const active = cell.value === selected;
        const record = numberRecord(cell.value);
        const phase = phaseLabels[cell.phase];
        const trigram = trigramById(cell.trigramId);
        return (
          <button key={cell.value} type="button" className={`focus-ring rounded border p-3 text-center transition hover:border-gold ${active ? "border-gold bg-gold/15 text-ivory shadow-[0_0_24px_rgba(181,146,85,.28)]" : "border-gold/15 bg-black/45 text-parchment"}`} onClick={() => onSelect(cell.value)}>
            <span className="block text-xs uppercase tracking-[.14em] text-gold">{cell.direction}</span>
            <span className="mt-2 block font-display text-4xl">{displayNumber(cell.value, display)}</span>
            {overlay === "bagua" || overlay === "both" ? <span className="mt-1 block text-lg text-gold">{trigram.symbol}</span> : null}
            {overlay === "five-phase" || overlay === "both" ? <span className="mt-1 block text-xs" style={{ color: phase.color }}>{phase.name}</span> : null}
            <span className="sr-only">{record.polarity}</span>
          </button>
        );
      })}
    </div>
  );
}

function displayNumber(value: number, display: DisplayMode) {
  const record = numberRecord(value);
  if (display === "chinese") return record.chineseNumeral;
  if (display === "combined") return `${record.value} ${record.chineseNumeral}`;
  if (display === "scholarly") return `${record.value}`;
  return record.value;
}

function displayNumbers(values: [number, number], display: DisplayMode) {
  if (display === "dots") return values.map((value) => "●".repeat(Math.min(value, 5))).join(" / ");
  return values.map((value) => displayNumber(value, display)).join(" / ");
}

function Segmented<T extends string>({ label, options, value, onChange }: { label: string; options: readonly T[]; value: T; onChange: (value: T) => void }) {
  return (
    <div className="mt-4">
      <p className="mb-2 text-xs uppercase tracking-[.18em] text-gold">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => <button key={option} type="button" className={`focus-ring rounded border px-3 py-2 text-xs capitalize ${value === option ? "border-gold bg-gold/15 text-ivory" : "border-gold/20 text-parchment hover:text-ivory"}`} onClick={() => onChange(option)}>{titleCase(option)}</button>)}
      </div>
    </div>
  );
}

function SelectBlock<T extends string>({ label, value, values, onChange }: { label: string; value: T; values: readonly T[]; onChange: (value: T) => void }) {
  return (
    <label className="mt-4 block">
      <span className="text-xs uppercase tracking-[.18em] text-gold">{label}</span>
      <select className="mt-2 w-full rounded border border-gold/20 bg-black/55 px-3 py-3 text-parchment" value={value} onChange={(event) => onChange(event.target.value as T)}>
        {values.map((item) => <option key={item} value={item}>{titleCase(item)}</option>)}
      </select>
    </label>
  );
}

function Panel({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <article className="rounded border border-gold/20 bg-black/35 p-4 shadow-aureate">
      <p className="text-xs uppercase tracking-[.2em] text-gold">{eyebrow}</p>
      <h3 className="mt-2 font-display text-2xl text-ivory">{title}</h3>
      <div className="mt-3">{children}</div>
    </article>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-gold/15 bg-black/25 p-3">
      <p className="text-xs uppercase tracking-[.16em] text-gold">{label}</p>
      <p className="mt-1 text-sm text-parchment">{value}</p>
    </div>
  );
}
