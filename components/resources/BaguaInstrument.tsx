"use client";

import Link from "next/link";
import { ArrowRight, GitCompare, RotateCcw, Save, Share2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import {
  arrangements,
  frameworks,
  hexagrams,
  positionFor,
  sources,
  trigramById,
  trigramFromLines,
  trigrams,
  type LineType,
  type OrientationId,
  type Trigram,
  type TrigramId
} from "@/lib/data/bagua";
import { prependSavedCalculation, prependToolHistory } from "./instrument-storage";

const modes = ["explore", "construct", "earlier", "later", "compare", "transform", "family", "hexagram", "textual", "scholar"] as const;
const arrangementsList = ["earlier-heaven", "later-heaven"] as const;
const orientations = ["south-up", "north-up", "source-original"] as const;
const appearances = ["ink-parchment", "jade-bronze", "cinnabar-gold", "celestial-tao"] as const;

const stateSchema = z.object({
  mode: z.enum(modes).catch("explore"),
  arrangement: z.enum(arrangementsList).catch("later-heaven"),
  trigram: z.enum(["qian", "dui", "li", "zhen", "xun", "kan", "gen", "kun"]).catch("qian"),
  compare: z.enum(["qian", "dui", "li", "zhen", "xun", "kan", "gen", "kun"]).catch("kun"),
  upper: z.enum(["qian", "dui", "li", "zhen", "xun", "kan", "gen", "kun"]).catch("qian"),
  lower: z.enum(["qian", "dui", "li", "zhen", "xun", "kan", "gen", "kun"]).catch("kun"),
  orientation: z.enum(orientations).catch("south-up"),
  framework: z.string().catch("king-wen-received"),
  appearance: z.enum(appearances).catch("jade-bronze"),
  changedLine: z.coerce.number().int().min(0).max(2).catch(0),
  line0: z.enum(["yin", "yang"]).catch("yang"),
  line1: z.enum(["yin", "yang"]).catch("yang"),
  line2: z.enum(["yin", "yang"]).catch("yang")
});

type InstrumentState = z.infer<typeof stateSchema>;

const styles = {
  "ink-parchment": { label: "Ink and Parchment", shell: "from-[#1d1710] via-[#0b0a08] to-[#302418]", panel: "bg-[#17120d]/90", accent: "#c6a45d" },
  "jade-bronze": { label: "Jade and Bronze", shell: "from-[#071713] via-[#080808] to-[#2b2110]", panel: "bg-[#071713]/84", accent: "#b59255" },
  "cinnabar-gold": { label: "Cinnabar and Gold", shell: "from-[#220709] via-[#090706] to-[#23170c]", panel: "bg-[#150606]/88", accent: "#d0a85a" },
  "celestial-tao": { label: "Celestial Tao", shell: "from-[#07101d] via-[#070707] to-[#331013]", panel: "bg-[#08101b]/86", accent: "#d2b36b" }
};

function readInitialState() {
  if (typeof window === "undefined") return stateSchema.parse({});
  const params = new URLSearchParams(window.location.search);
  const parsed = stateSchema.parse(Object.fromEntries(params.entries()));
  const appearance = stateSchema.shape.appearance.safeParse(window.localStorage.getItem("aetherica-bagua-appearance"));
  return { ...parsed, appearance: appearance.success ? appearance.data : parsed.appearance };
}

function updateUrl(state: InstrumentState) {
  const params = new URLSearchParams({
    mode: state.mode,
    arrangement: state.arrangement,
    trigram: state.trigram,
    compare: state.compare,
    upper: state.upper,
    lower: state.lower,
    orientation: state.orientation,
    framework: state.framework,
    appearance: state.appearance,
    changedLine: String(state.changedLine),
    line0: state.line0,
    line1: state.line1,
    line2: state.line2
  });
  window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
}

function titleCase(value: string) {
  return value.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function circularPosition(index: number, total: number, orientation: OrientationId) {
  const orientationOffset = orientation === "north-up" ? Math.PI : 0;
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2 + orientationOffset;
  return { x: 180 + Math.cos(angle) * 126, y: 180 + Math.sin(angle) * 126 };
}

function lineLabel(line: LineType) {
  return line === "yang" ? "Yang unbroken" : "Yin broken";
}

function changedTrigram(trigram: Trigram, index: number) {
  const next = [...trigram.linesBottomToTop] as [LineType, LineType, LineType];
  next[index] = next[index] === "yang" ? "yin" : "yang";
  return trigramFromLines(next);
}

function transformationDistance(a: Trigram, b: Trigram) {
  return a.linesBottomToTop.filter((line, index) => line !== b.linesBottomToTop[index]).length;
}

export function BaguaInstrument() {
  const [state, setState] = useState<InstrumentState>(() => readInitialState());
  const [status, setStatus] = useState("");
  const active = trigramById(state.trigram);
  const compare = trigramById(state.compare);
  const upper = trigramById(state.upper);
  const lower = trigramById(state.lower);
  const constructed = trigramFromLines([state.line0, state.line1, state.line2]);
  const transformed = changedTrigram(active, state.changedLine);
  const arrangement = state.mode === "earlier" ? "earlier-heaven" : state.mode === "later" ? "later-heaven" : state.arrangement;
  const framework = frameworks.find((item) => item.id === state.framework) ?? frameworks[1];
  const style = styles[state.appearance];
  const activePosition = positionFor(arrangement, active.id);
  const hexagram = hexagrams.find((item) => item.upper === upper.id && item.lower === lower.id);

  const arrangementPositions = useMemo(() => arrangements[arrangement], [arrangement]);

  useEffect(() => {
    prependToolHistory({ tool: "Bagua Instrument", detail: "Opened the Eight Trigrams explorer" });
  }, []);

  useEffect(() => {
    updateUrl(state);
    window.localStorage.setItem("aetherica-bagua-appearance", state.appearance);
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
      kind: "Bagua Instrument",
      title: `${active.pinyin} · ${active.englishName}`,
      detail: `${titleCase(arrangement)} · ${activePosition.direction} · ${framework.title}`,
      date: new Date().toISOString().slice(0, 10)
    });
    setStatus("Saved");
    window.setTimeout(() => setStatus(""), 1600);
  }

  return (
    <div className="grid gap-10">
      <section className={`relative isolate overflow-hidden rounded-lg border border-gold/30 bg-gradient-to-br ${style.shell} p-6 shadow-aureate lg:p-8`}>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_18%,rgba(231,221,204,.08),transparent_16rem),radial-gradient(circle_at_82%_34%,rgba(181,146,85,.18),transparent_18rem)]" />
        <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[.28em] text-gold">Resources / Taoist cosmological instrument</p>
            <h1 className="font-manuscript-title mt-4 font-display text-5xl leading-none text-ivory md:text-7xl">The Bagua Instrument</h1>
            <p className="mt-5 max-w-3xl text-xl leading-9 text-parchment">
              Explore the Eight Trigrams as patterns of polarity, transformation, direction, relationship, and change.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#instrument" className="focus-ring inline-flex items-center gap-3 rounded border border-gold/45 bg-gold/15 px-5 py-3 text-sm uppercase tracking-[.18em] text-ivory hover:bg-gold/25">Open Instrument <ArrowRight size={18} /></a>
              <Link href="/resources/he-tu-luo-shu" className="focus-ring inline-flex items-center gap-3 rounded border border-gold/25 px-5 py-3 text-sm uppercase tracking-[.18em] text-gold hover:border-gold/55 hover:text-ivory"><GitCompare size={18} /> He Tu / Luo Shu</Link>
            </div>
          </div>
          <BaguaWheel positions={arrangementPositions} activeId={active.id} orientation={state.orientation} accent={style.accent} onSelect={(trigram) => patch({ trigram })} />
        </div>
      </section>

      <section id="instrument" className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_26rem]">
        <div className={`rounded-lg border border-gold/30 ${style.panel} p-4 shadow-aureate md:p-6`}>
          <div className="flex flex-col gap-4 border-b border-gold/15 pb-4 lg:flex-row lg:items-center lg:justify-between">
            <Segmented label="Mode" value={state.mode} options={modes} onChange={(mode) => patch({ mode })} />
            <div className="flex flex-wrap gap-2">
              <button className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={copyLink}><Share2 size={16} /> Copy Link</button>
              <button className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={saveState}><Save size={16} /> Save State</button>
              <button className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={() => setState(stateSchema.parse({}))}><RotateCcw size={16} /> Reset</button>
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <div>
              <BaguaWheel positions={arrangementPositions} activeId={active.id} orientation={state.orientation} accent={style.accent} onSelect={(trigram) => patch({ trigram })} large />
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <SelectBlock label="Arrangement" value={state.arrangement} values={arrangementsList} onChange={(arrangement) => patch({ arrangement })} />
                <SelectBlock label="Orientation" value={state.orientation} values={orientations} onChange={(orientation) => patch({ orientation })} />
                <SelectBlock label="Appearance" value={state.appearance} values={appearances} onChange={(appearance) => patch({ appearance })} />
              </div>
            </div>

            <Panel title={`${active.pinyin} · ${active.englishName}`} eyebrow={`${active.symbol} · ${active.traditionalCharacter}`}>
              <TrigramLines lines={active.linesBottomToTop} />
              <Info label="Image" value={active.naturalImage} />
              <Info label="Direction" value={activePosition.direction} />
              <Info label="Season" value={activePosition.season} />
              <Info label="Five Phase" value={activePosition.fivePhase} />
              <Info label="Family role" value={active.familyRole} />
              <p className="mt-4 text-sm leading-6 text-parchment">{activePosition.note}</p>
              {status ? <p className="mt-3 text-sm text-gold">{status}</p> : null}
            </Panel>
          </div>

          {state.mode === "construct" ? (
            <Panel className="mt-5" title="Line Construction" eyebrow="Bottom to middle to top">
              <div className="grid gap-3 md:grid-cols-3">
                {[0, 1, 2].map((lineIndex) => (
                  <div key={lineIndex} className="rounded border border-gold/15 bg-black/30 p-3">
                    <p className="text-xs uppercase tracking-[.16em] text-gold">{["Bottom", "Middle", "Top"][lineIndex]}</p>
                    <div className="mt-3 flex gap-2">
                      {(["yang", "yin"] as const).map((line) => (
                        <button key={line} className={`focus-ring rounded border px-3 py-2 text-sm ${state[`line${lineIndex}` as "line0"] === line ? "border-gold bg-gold/15 text-ivory" : "border-gold/20 text-parchment"}`} type="button" onClick={() => patch({ [`line${lineIndex}`]: line } as Partial<InstrumentState>)}>{lineLabel(line)}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded border border-gold/15 bg-black/25 p-4">
                <p className="text-xs uppercase tracking-[.16em] text-gold">Result</p>
                <p className="mt-2 font-display text-3xl text-ivory">{constructed.symbol} {constructed.pinyin} · {constructed.englishName}</p>
                <TrigramLines lines={constructed.linesBottomToTop} />
              </div>
            </Panel>
          ) : null}

          {state.mode === "compare" ? (
            <Panel className="mt-5" title="Arrangement Comparator" eyebrow="Earlier Heaven and Later Heaven">
              <div className="grid gap-4 md:grid-cols-2">
                {[active, compare].map((item) => (
                  <div key={item.id} className="rounded border border-gold/15 bg-black/25 p-4">
                    <p className="font-display text-3xl text-ivory">{item.symbol} {item.pinyin}</p>
                    <SelectBlock label="Trigram" value={item.id} values={trigrams.map((trigram) => trigram.id)} onChange={(trigram) => item.id === active.id ? patch({ trigram }) : patch({ compare: trigram })} />
                    <Info label="Earlier Heaven" value={positionFor("earlier-heaven", item.id).direction} />
                    <Info label="Later Heaven" value={positionFor("later-heaven", item.id).direction} />
                    <Info label="Transformation distance" value={`${transformationDistance(active, compare)} line difference${transformationDistance(active, compare) === 1 ? "" : "s"}`} />
                  </div>
                ))}
              </div>
            </Panel>
          ) : null}

          {state.mode === "transform" ? (
            <Panel className="mt-5" title="Transformation Mode" eyebrow="Change one line">
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2].map((index) => <button key={index} type="button" className={`focus-ring rounded border px-3 py-2 text-sm ${state.changedLine === index ? "border-gold bg-gold/15 text-ivory" : "border-gold/20 text-parchment"}`} onClick={() => patch({ changedLine: index })}>Change {["lower", "middle", "upper"][index]} line</button>)}
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <TrigramCard trigram={active} title="Original" />
                <TrigramCard trigram={transformed} title="Result" />
              </div>
            </Panel>
          ) : null}

          {state.mode === "family" ? (
            <Panel className="mt-5" title="Family System" eyebrow="Minority line study">
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {trigrams.map((trigram) => <TrigramCard key={trigram.id} trigram={trigram} title={trigram.familyRole} />)}
              </div>
              <p className="mt-4 text-sm leading-6 text-limestone">Family roles are symbolic assignments from traditional trigram study. They are not presented here as biological destiny or social prescription.</p>
            </Panel>
          ) : null}

          {state.mode === "hexagram" ? (
            <Panel className="mt-5" title="Hexagram Builder" eyebrow="Upper trigram over lower trigram">
              <div className="grid gap-4 md:grid-cols-2">
                <SelectBlock label="Upper trigram" value={state.upper} values={trigrams.map((trigram) => trigram.id)} onChange={(upper) => patch({ upper })} />
                <SelectBlock label="Lower trigram" value={state.lower} values={trigrams.map((trigram) => trigram.id)} onChange={(lower) => patch({ lower })} />
              </div>
              <div className="mt-4 rounded border border-gold/15 bg-black/25 p-4">
                <p className="font-display text-3xl text-ivory">{hexagram ? `Hexagram ${hexagram.number}: ${hexagram.name}` : "Hexagram Explorer Preview"}</p>
                <p className="mt-2 text-2xl text-gold">{hexagram ? `${hexagram.chinese} · ${hexagram.pinyin}` : `${upper.pinyin} over ${lower.pinyin}`}</p>
                <TrigramLines lines={[...lower.linesBottomToTop, ...upper.linesBottomToTop] as LineType[]} />
                <p className="mt-3 text-sm leading-6 text-parchment">{hexagram?.note ?? "This structural preview will connect to the future full Hexagram Explorer."}</p>
              </div>
            </Panel>
          ) : null}

          {state.mode === "textual" || state.mode === "scholar" ? (
            <Panel className="mt-5" title={state.mode === "textual" ? "Textual View" : "Sources and Methodology"} eyebrow={framework.title}>
              <p className="leading-7 text-parchment">
                Active arrangement: {titleCase(arrangement)}. Orientation: {titleCase(state.orientation)}. Selected trigram: {active.pinyin}, {active.englishName}, lines bottom upward: {active.linesBottomToTop.map(lineLabel).join(", ")}.
              </p>
              <p className="mt-3 text-sm leading-6 text-limestone">{framework.summary}</p>
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

        <aside className="grid gap-4 content-start">
          <Panel title="Instrument Path" eyebrow="Connected Taoist tools">
            <div className="grid gap-2">
              <Link href="/resources/taijitu-polarity" className="rounded border border-gold/15 bg-black/25 p-3 text-parchment hover:border-gold/45 hover:text-ivory">Taijitu Polarity</Link>
              <Link href="/resources/five-phases" className="rounded border border-gold/15 bg-black/25 p-3 text-parchment hover:border-gold/45 hover:text-ivory">Five Phases Wheel</Link>
              <Link href="/resources/he-tu-luo-shu" className="rounded border border-gold/15 bg-black/25 p-3 text-parchment hover:border-gold/45 hover:text-ivory">He Tu and Luo Shu</Link>
            </div>
          </Panel>
          <Panel title="Framework" eyebrow={framework.confidence}>
            <p className="text-sm leading-6 text-parchment">{framework.summary}</p>
          </Panel>
        </aside>
      </section>
    </div>
  );
}

function BaguaWheel({ positions, activeId, orientation, accent, onSelect, large = false }: { positions: typeof arrangements["earlier-heaven"]; activeId: TrigramId; orientation: OrientationId; accent: string; onSelect: (id: TrigramId) => void; large?: boolean }) {
  return (
    <div className={`relative mx-auto aspect-square w-full ${large ? "max-w-[34rem]" : "max-w-sm"} rounded-full border border-gold/25 bg-black/35 shadow-[inset_0_0_60px_rgba(181,146,85,.13)]`}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 360 360" aria-hidden="true">
        <circle cx="180" cy="180" r="150" fill="none" stroke="rgba(181,146,85,.28)" strokeWidth="2" />
        <circle cx="180" cy="180" r="112" fill="none" stroke="rgba(231,221,204,.12)" strokeWidth="1" />
        <path d="M180 73a107 107 0 1 1 0 214a53.5 53.5 0 1 0 0-107a53.5 53.5 0 1 1 0-107Z" fill="#ede0c6" opacity=".86" />
        <path d="M180 73a107 107 0 0 0 0 214a53.5 53.5 0 1 1 0-107a53.5 53.5 0 0 0 0-107Z" fill="#070707" opacity=".92" />
        <circle cx="180" cy="126.5" r="9" fill="#070707" />
        <circle cx="180" cy="233.5" r="9" fill="#ede0c6" />
        {positions.map((position, index) => {
          const point = circularPosition(index, positions.length, orientation);
          return <line key={position.trigramId} x1="180" y1="180" x2={point.x} y2={point.y} stroke="rgba(181,146,85,.16)" strokeWidth="1" />;
        })}
      </svg>
      {positions.map((position, index) => {
        const trigram = trigramById(position.trigramId);
        const point = circularPosition(index, positions.length, orientation);
        const active = activeId === trigram.id;
        return (
          <button
            key={trigram.id}
            type="button"
            aria-label={`${trigram.pinyin}, ${trigram.englishName}, ${position.direction}`}
            className={`focus-ring absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border bg-black/82 text-center transition hover:scale-[1.04] ${active ? "border-gold text-ivory shadow-[0_0_30px_rgba(181,146,85,.36)]" : "border-gold/30 text-parchment hover:border-gold"}`}
            style={{ left: `${(point.x / 360) * 100}%`, top: `${(point.y / 360) * 100}%`, width: large ? "5.5rem" : "4.7rem", height: large ? "5.5rem" : "4.7rem" }}
            onClick={() => onSelect(trigram.id)}
          >
            <span className="text-2xl" style={{ color: active ? accent : undefined }}>{trigram.symbol}</span>
            <span className="text-[0.68rem] uppercase tracking-[.12em] text-gold">{position.direction}</span>
          </button>
        );
      })}
    </div>
  );
}

function TrigramLines({ lines }: { lines: LineType[] }) {
  return (
    <div className="mt-3 grid gap-2">
      {[...lines].reverse().map((line, index) => (
        <div key={`${line}-${index}`} className="flex h-3 justify-center gap-2" aria-label={lineLabel(line)}>
          {line === "yang" ? <span className="h-3 w-28 rounded bg-gold/80" /> : <><span className="h-3 w-12 rounded bg-gold/80" /><span className="h-3 w-12 rounded bg-gold/80" /></>}
        </div>
      ))}
    </div>
  );
}

function TrigramCard({ trigram, title }: { trigram: Trigram; title: string }) {
  return (
    <div className="rounded border border-gold/15 bg-black/25 p-4">
      <p className="text-xs uppercase tracking-[.16em] text-gold">{title}</p>
      <p className="mt-1 font-display text-2xl text-ivory">{trigram.symbol} {trigram.pinyin}</p>
      <p className="text-sm text-parchment">{trigram.englishName} · {trigram.traditionalCharacter}</p>
      <TrigramLines lines={trigram.linesBottomToTop} />
    </div>
  );
}

function Segmented<T extends string>({ label, options, value, onChange }: { label: string; options: readonly T[]; value: T; onChange: (value: T) => void }) {
  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-[.18em] text-gold">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => <button key={option} type="button" className={`focus-ring rounded border px-3 py-2 text-sm capitalize ${value === option ? "border-gold bg-gold/15 text-ivory" : "border-gold/20 text-parchment hover:text-ivory"}`} onClick={() => onChange(option)}>{titleCase(option)}</button>)}
      </div>
    </div>
  );
}

function SelectBlock<T extends string>({ label, value, values, onChange }: { label: string; value: T; values: readonly T[]; onChange: (value: T) => void }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[.18em] text-gold">{label}</span>
      <select className="mt-2 w-full rounded border border-gold/20 bg-black/55 px-3 py-3 text-parchment" value={value} onChange={(event) => onChange(event.target.value as T)}>
        {values.map((item) => <option key={item} value={item}>{titleCase(item)}</option>)}
      </select>
    </label>
  );
}

function Panel({ title, eyebrow, children, className = "" }: { title: string; eyebrow: string; children: React.ReactNode; className?: string }) {
  return (
    <article className={`rounded border border-gold/20 bg-black/35 p-4 ${className}`}>
      <p className="text-xs uppercase tracking-[.2em] text-gold">{eyebrow}</p>
      <h3 className="mt-2 font-display text-2xl text-ivory">{title}</h3>
      <div className="mt-3">{children}</div>
    </article>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-3 border-t border-gold/10 pt-3">
      <p className="text-xs uppercase tracking-[.16em] text-gold">{label}</p>
      <p className="mt-1 text-sm text-parchment">{value}</p>
    </div>
  );
}
