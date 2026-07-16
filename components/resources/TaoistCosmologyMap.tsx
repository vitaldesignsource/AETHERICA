"use client";

import Link from "next/link";
import { ArrowRight, Pause, Play, RotateCcw, Save, Share2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import {
  cosmologyFaqs,
  cosmologyFrameworks,
  cosmologyLayerById,
  cosmologyLayers,
  cosmologySequence,
  cosmologySources,
  type CosmologyLayerId,
} from "@/lib/data/taoist-cosmology";
import { prependSavedCalculation, prependToolHistory } from "./instrument-storage";

const modes = ["unfolding", "return", "layers", "frameworks", "microcosm", "archive", "textual"] as const;
const appearances = ["ink-parchment", "jade-bronze", "cinnabar-gold", "celestial-tao"] as const;
const motionSettings = ["full", "reduced", "none"] as const;

const stateSchema = z.object({
  mode: z.enum(modes).catch("unfolding"),
  layer: z.enum(["dao", "wuji", "taiji", "yin-yang", "four-images", "five-phases", "eight-trigrams", "heaven-earth-humanity", "ten-thousand-things"]).catch("wuji"),
  framework: z.string().catch("aetherica-study-model"),
  appearance: z.enum(appearances).catch("jade-bronze"),
  motion: z.enum(motionSettings).catch("reduced")
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
  const appearance = stateSchema.shape.appearance.safeParse(window.localStorage.getItem("aetherica-taoist-cosmology-appearance"));
  return { ...parsed, appearance: appearance.success ? appearance.data : parsed.appearance };
}

function updateUrl(state: InstrumentState) {
  const params = new URLSearchParams({
    mode: state.mode,
    layer: state.layer,
    framework: state.framework,
    appearance: state.appearance,
    motion: state.motion
  });
  window.history.replaceState(null, "", `${window.location.pathname}?${params.toString()}`);
}

function titleCase(value: string) {
  return value.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}

function layerIndex(id: CosmologyLayerId) {
  return cosmologySequence.indexOf(id);
}

export function TaoistCosmologyMap() {
  const [state, setState] = useState<InstrumentState>(() => readInitialState());
  const [playing, setPlaying] = useState(false);
  const [status, setStatus] = useState("");
  const activeLayer = cosmologyLayerById(state.layer);
  const activeIndex = layerIndex(activeLayer.id);
  const previous = cosmologyLayerById(cosmologySequence[(activeIndex - 1 + cosmologySequence.length) % cosmologySequence.length]);
  const next = cosmologyLayerById(cosmologySequence[(activeIndex + 1) % cosmologySequence.length]);
  const framework = cosmologyFrameworks.find((item) => item.id === state.framework) ?? cosmologyFrameworks[0];
  const style = styles[state.appearance];

  const orderedLayers = useMemo(() => state.mode === "return" ? [...cosmologyLayers].reverse() : cosmologyLayers, [state.mode]);

  useEffect(() => {
    prependToolHistory({ tool: "Taoist Cosmology Map", detail: "Opened the cosmology map" });
  }, []);

  useEffect(() => {
    updateUrl(state);
    window.localStorage.setItem("aetherica-taoist-cosmology-appearance", state.appearance);
  }, [state]);

  useEffect(() => {
    if (!playing || state.motion === "none") return;
    const timer = window.setInterval(() => step(1), state.motion === "full" ? 2600 : 4200);
    return () => window.clearInterval(timer);
  });

  function patch(nextState: Partial<InstrumentState>) {
    setState((current) => ({ ...current, ...nextState }));
  }

  function step(direction: 1 | -1) {
    setState((current) => {
      const order = current.mode === "return" ? [...cosmologySequence].reverse() : cosmologySequence;
      const index = order.indexOf(current.layer);
      const nextLayer = order[(index + direction + order.length) % order.length];
      return { ...current, layer: nextLayer };
    });
  }

  async function copyLink() {
    await window.navigator.clipboard.writeText(window.location.href);
    setStatus("Copied");
    window.setTimeout(() => setStatus(""), 1600);
  }

  function saveState() {
    prependSavedCalculation({
      kind: "Taoist Cosmology Map",
      title: activeLayer.englishName,
      detail: `${titleCase(state.mode)} mode · ${framework.title}`,
      date: new Date().toISOString().slice(0, 10)
    });
    setStatus("Saved");
    window.setTimeout(() => setStatus(""), 1600);
  }

  return (
    <div className="grid gap-10">
      <section className={`relative isolate overflow-hidden rounded-lg border border-gold/30 bg-gradient-to-br ${style.shell} p-6 shadow-aureate lg:p-8`}>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_18%,rgba(231,221,204,.08),transparent_16rem),radial-gradient(circle_at_82%_34%,rgba(181,146,85,.18),transparent_18rem)]" />
        <div className="grid gap-8 lg:grid-cols-[1fr_25rem] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[.28em] text-gold">Resources / Taoist cosmological instrument</p>
            <h1 className="font-manuscript-title mt-4 font-display text-5xl leading-none text-ivory md:text-7xl">Taoist Cosmology Map</h1>
            <p className="mt-5 max-w-3xl text-xl leading-9 text-parchment">
              Explore the unfolding of non-differentiation, polarity, phase, pattern, and manifested form.
            </p>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-limestone">
              This is a framework-labeled educational model. Chinese philosophical, Daoist, Yijing, medical, and Neo-Confucian traditions organize these relationships differently.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#map" className="focus-ring inline-flex items-center gap-3 rounded border border-gold/45 bg-gold/15 px-5 py-3 text-sm uppercase tracking-[.18em] text-ivory hover:bg-gold/25">Open Map <ArrowRight size={18} /></a>
              <Link href="/resources/organ-clock" className="focus-ring inline-flex items-center gap-3 rounded border border-gold/25 px-5 py-3 text-sm uppercase tracking-[.18em] text-gold hover:border-gold/55 hover:text-ivory">Organ Clock <ArrowRight size={18} /></Link>
            </div>
          </div>
          <ConcentricMap activeId={state.layer} layers={cosmologyLayers} accent={style.accent} onSelect={(layer) => patch({ layer })} preview />
        </div>
      </section>

      <section id="map" className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_26rem]">
        <div className={`rounded-lg border border-gold/30 ${style.panel} p-4 shadow-aureate md:p-6`}>
          <div className="flex flex-col gap-4 border-b border-gold/15 pb-4 lg:flex-row lg:items-center lg:justify-between">
            <Segmented label="Mode" value={state.mode} options={modes} onChange={(mode) => patch({ mode })} />
            <div className="flex flex-wrap gap-2">
              <button className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={() => setPlaying((value) => !value)}>{playing ? <Pause size={16} /> : <Play size={16} />} {playing ? "Pause" : "Play"}</button>
              <button className="focus-ring rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={() => step(-1)}>Previous</button>
              <button className="focus-ring rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={() => step(1)}>Next</button>
              <button className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={copyLink}><Share2 size={16} /> Copy Link</button>
              <button className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={saveState}><Save size={16} /> Save</button>
              <button className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-3 py-2 text-sm text-gold hover:text-ivory" type="button" onClick={() => setState(stateSchema.parse({}))}><RotateCcw size={16} /> Reset</button>
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
            <ConcentricMap activeId={state.layer} layers={orderedLayers} accent={style.accent} onSelect={(layer) => patch({ layer })} />
            <Panel title={activeLayer.englishName} eyebrow={`${activeLayer.chinese ?? "Framework"} ${activeLayer.pinyin ? `· ${activeLayer.pinyin}` : ""}`}>
              <p className="text-sm leading-7 text-parchment">{activeLayer.summary}</p>
              <Info label="Visual layer" value={activeLayer.visualNote} />
              <Info label="Previous" value={previous.shortName} />
              <Info label="Next" value={next.shortName} />
              {activeLayer.relatedHref ? <Link href={activeLayer.relatedHref} className="focus-ring mt-4 inline-flex items-center gap-2 rounded border border-gold/30 px-3 py-2 text-sm text-gold hover:text-ivory">Open related instrument <ArrowRight size={15} /></Link> : null}
              {status ? <p className="mt-3 text-sm text-gold">{status}</p> : null}
            </Panel>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <SelectBlock label="Framework" value={state.framework} values={cosmologyFrameworks.map((item) => item.id)} onChange={(frameworkId) => patch({ framework: frameworkId })} />
            <SelectBlock label="Appearance" value={state.appearance} values={appearances} onChange={(appearance) => patch({ appearance })} />
            <SelectBlock label="Motion" value={state.motion} values={motionSettings} onChange={(motion) => patch({ motion })} />
          </div>

          {state.mode === "frameworks" || state.mode === "microcosm" || state.mode === "archive" || state.mode === "textual" ? (
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Panel title={state.mode === "microcosm" ? "Microcosm and Macrocosm" : "Framework Notes"} eyebrow={framework.period}>
                <p className="text-sm leading-7 text-parchment">{framework.summary}</p>
                <p className="mt-3 rounded border border-gold/15 bg-black/25 p-3 text-sm leading-6 text-limestone">{framework.caution}</p>
              </Panel>
              <Panel title="Textual View" eyebrow="Accessible equivalent">
                <p className="text-sm leading-7 text-parchment">
                  Active layer: {activeLayer.englishName}. Chinese term: {activeLayer.chinese ?? "not applicable"}. Pinyin: {activeLayer.pinyin ?? "not applicable"}. Related systems: {activeLayer.relatedSystems.join(", ")}.
                </p>
              </Panel>
            </div>
          ) : null}
        </div>

        <aside className="grid gap-4 content-start">
          <Panel title="Instrument Path" eyebrow="Taoist cabinet">
            <div className="grid gap-2">
              <Link href="/resources/taijitu-polarity" className="rounded border border-gold/15 bg-black/25 p-3 text-parchment hover:border-gold/45 hover:text-ivory">Taijitu</Link>
              <Link href="/resources/five-phases" className="rounded border border-gold/15 bg-black/25 p-3 text-parchment hover:border-gold/45 hover:text-ivory">Five Phases</Link>
              <Link href="/resources/bagua" className="rounded border border-gold/15 bg-black/25 p-3 text-parchment hover:border-gold/45 hover:text-ivory">Bagua</Link>
              <Link href="/resources/he-tu-luo-shu" className="rounded border border-gold/15 bg-black/25 p-3 text-parchment hover:border-gold/45 hover:text-ivory">He Tu / Luo Shu</Link>
              <Link href="/resources/organ-clock" className="rounded border border-gold/15 bg-black/25 p-3 text-parchment hover:border-gold/45 hover:text-ivory">Organ Clock</Link>
            </div>
          </Panel>
          <Panel title="Sources and Methodology" eyebrow="Review visible">
            <div className="grid gap-3">
              {cosmologySources.map((source) => (
                <div key={source.id} className="rounded border border-gold/15 bg-black/25 p-3">
                  <p className="text-xs uppercase tracking-[.16em] text-gold">{source.type}</p>
                  <p className="mt-1 font-display text-xl text-ivory">{source.title}</p>
                  <p className="mt-2 text-sm leading-6 text-limestone">{source.note}</p>
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="FAQ" eyebrow="Important qualifications">
            <div className="grid gap-3">
              {cosmologyFaqs.map((faq) => (
                <div key={faq.question} className="border-b border-gold/10 pb-3">
                  <p className="font-display text-lg text-ivory">{faq.question}</p>
                  <p className="mt-1 text-sm leading-6 text-parchment">{faq.answer}</p>
                </div>
              ))}
            </div>
          </Panel>
        </aside>
      </section>
    </div>
  );
}

function ConcentricMap({ activeId, layers, accent, onSelect, preview = false }: { activeId: CosmologyLayerId; layers: typeof cosmologyLayers; accent: string; onSelect: (layer: CosmologyLayerId) => void; preview?: boolean }) {
  return (
    <div className={`relative mx-auto aspect-square w-full ${preview ? "max-w-sm" : "max-w-[36rem]"} rounded-full border border-gold/25 bg-black/35 shadow-[inset_0_0_70px_rgba(181,146,85,.13)]`}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 360 360" aria-hidden="true">
        <defs>
          <radialGradient id="cosmologyGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity=".24" />
            <stop offset="68%" stopColor={accent} stopOpacity=".05" />
            <stop offset="100%" stopColor="#000" stopOpacity=".12" />
          </radialGradient>
        </defs>
        <circle cx="180" cy="180" r="168" fill="url(#cosmologyGlow)" />
        {layers.map((layer, index) => {
          const radius = 28 + index * 16;
          const active = layer.id === activeId;
          return <circle key={layer.id} cx="180" cy="180" r={radius} fill="none" stroke={active ? "rgba(255,224,154,.95)" : "rgba(181,146,85,.28)"} strokeWidth={active ? "3" : "1.2"} />;
        })}
        <path d="M180 104a76 76 0 1 1 0 152a38 38 0 1 0 0-76a38 38 0 1 1 0-76Z" fill="#ede0c6" opacity=".45" />
        <path d="M180 104a76 76 0 0 0 0 152a38 38 0 1 1 0-76a38 38 0 0 0 0-76Z" fill="#050505" opacity=".58" />
      </svg>
      {layers.map((layer, index) => {
        const angle = (index / layers.length) * Math.PI * 2 - Math.PI / 2;
        const radius = preview ? 118 : 150;
        const x = 50 + Math.cos(angle) * (radius / 3.6);
        const y = 50 + Math.sin(angle) * (radius / 3.6);
        const active = layer.id === activeId;
        return (
          <button key={layer.id} type="button" className={`focus-ring absolute min-h-11 min-w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-2 text-xs text-center transition hover:border-gold ${active ? "border-gold bg-gold/15 text-ivory" : "border-gold/25 bg-black/75 text-parchment"}`} style={{ left: `${x}%`, top: `${y}%` }} onClick={() => onSelect(layer.id)}>
            <span className="block font-display text-sm">{layer.shortName}</span>
            {layer.chinese ? <span className="block text-gold">{layer.chinese}</span> : null}
          </button>
        );
      })}
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

function Panel({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <article className="rounded border border-gold/20 bg-black/35 p-4">
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
