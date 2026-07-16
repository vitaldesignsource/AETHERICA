"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BookOpenText, Clock3, GitCompare, Layers3, Library, Search, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  stratifiedModels,
  universalLayerLabels,
  universalLayers,
  type StratifiedLayer,
  type StratifiedModel,
  type UniversalLayerCategory
} from "@/lib/data/stratified-human";

const diagramModes = ["ladder", "concentric", "axis", "matrix", "wheel"] as const;
type DiagramMode = (typeof diagramModes)[number];
type ConfidenceLevel = "direct" | "functional" | "symbolic" | "speculative";
type BodyRenderStyle = "anatomical" | "etheric" | "transparent" | "sacred" | "hybrid";
type VisualLayerType = "shell" | "halo" | "field" | "channel" | "core" | "point" | "ring" | "shadow" | "inscription" | "crown" | "vehicle";

type ObservatoryVisualLayer = {
  id: string;
  label: string;
  category: UniversalLayerCategory;
  visualType: VisualLayerType;
  color: string;
  opacity: number;
  glow: number;
  radius: number;
  depth: number;
  order: number;
  y?: number;
  notes: string;
};

const confidenceLabels: Record<ConfidenceLevel, string> = {
  direct: "Direct",
  functional: "Functional",
  symbolic: "Symbolic",
  speculative: "Speculative"
};

const confidenceStyles: Record<ConfidenceLevel, string> = {
  direct: "border-emerald-300/45 bg-emerald-400/10 text-emerald-100",
  functional: "border-gold/45 bg-gold/10 text-ivory",
  symbolic: "border-indigo-300/35 bg-indigo-400/10 text-indigo-100",
  speculative: "border-red-300/35 bg-red-400/10 text-red-100"
};

const confidenceMicrocopy: Record<ConfidenceLevel, string> = {
  direct: "Named directly in this model.",
  functional: "Plays a comparable role without being identical.",
  symbolic: "Symbolically adjacent across traditions.",
  speculative: "Useful as a question, not a settled equivalence."
};

const renderStyles: Array<{ id: BodyRenderStyle; label: string }> = [
  { id: "hybrid", label: "Hybrid anatomical" },
  { id: "anatomical", label: "Anatomical silhouette" },
  { id: "etheric", label: "Luminous etheric" },
  { id: "transparent", label: "Transparent body" },
  { id: "sacred", label: "Sacred diagram" }
];

const modelVisuals: Record<string, { accent: string; aura: string; era: string; period: string; motif: string; references: string[] }> = {
  theosophy: {
    accent: "#d9b66f",
    aura: "rgba(217,182,111,.34)",
    era: "1875 onward",
    period: "Modern esotericism",
    motif: "Sevenfold constitution",
    references: ["H. P. Blavatsky, The Key to Theosophy", "Annie Besant, Man and His Bodies", "Theosophical seven-principle diagrams"]
  },
  egyptian: {
    accent: "#38bdf8",
    aura: "rgba(56,189,248,.28)",
    era: "c. 2600-300 BCE",
    period: "Ancient Egyptian funerary religion",
    motif: "Plural soul complex",
    references: ["Pyramid Texts and Coffin Texts", "The Book of Going Forth by Day", "Egyptological studies of ka, ba, akh, ren, and sheut"]
  },
  neoplatonic: {
    accent: "#a78bfa",
    aura: "rgba(167,139,250,.3)",
    era: "3rd-6th c. CE",
    period: "Late antique Platonism",
    motif: "Soul vehicle and ascent",
    references: ["Plotinus, Enneads", "Iamblichus, On the Mysteries", "Proclus on the soul vehicle"]
  },
  kabbalah: {
    accent: "#facc15",
    aura: "rgba(250,204,21,.28)",
    era: "12th c. onward",
    period: "Medieval and later Kabbalah",
    motif: "Levels of soul",
    references: ["Zoharic soul terminology", "Sefer Yetzirah reception", "Later Kabbalistic nefesh-ruach-neshamah models"]
  },
  "golden-dawn": {
    accent: "#f97316",
    aura: "rgba(249,115,22,.28)",
    era: "1888 onward",
    period: "Hermetic ritual magic",
    motif: "Sphere of sensation",
    references: ["Golden Dawn knowledge lectures", "Israel Regardie, The Golden Dawn", "Hermetic Qabalah correspondence tables"]
  },
  hermetic: {
    accent: "#fb7185",
    aura: "rgba(251,113,133,.24)",
    era: "1st-4th c. CE",
    period: "Hellenistic Hermetica",
    motif: "Nous and light-body",
    references: ["Corpus Hermeticum", "Asclepius", "Hermetic philosophical anthropology"]
  },
  gnostic: {
    accent: "#c084fc",
    aura: "rgba(192,132,252,.25)",
    era: "2nd-4th c. CE",
    period: "Late antique Gnostic systems",
    motif: "Spark and garment of light",
    references: ["Nag Hammadi writings", "Gnostic mythic anthropology", "Late antique body-soul-spirit triads"]
  },
  vedanta: {
    accent: "#fbbf24",
    aura: "rgba(251,191,36,.26)",
    era: "c. 8th c. BCE onward",
    period: "Upanishadic and Vedantic traditions",
    motif: "Five koshas",
    references: ["Taittiriya Upanishad", "Vedantic kosha commentaries", "Atman and sheath models"]
  },
  yoga: {
    accent: "#34d399",
    aura: "rgba(52,211,153,.24)",
    era: "Classical era onward",
    period: "Samkhya and Yoga",
    motif: "Purusha and subtle body",
    references: ["Samkhya Karika", "Yoga Sutras reception", "Subtle and causal body terminology"]
  },
  tantric: {
    accent: "#ef4444",
    aura: "rgba(239,68,68,.26)",
    era: "c. 6th c. CE onward",
    period: "Tantric traditions",
    motif: "Chakras, nadis, kundalini",
    references: ["Tantric subtle-body literature", "Lineage-specific chakra and nadi systems", "Scholarly studies of kundalini symbolism"]
  },
  vajrayana: {
    accent: "#60a5fa",
    aura: "rgba(96,165,250,.25)",
    era: "7th c. CE onward",
    period: "Vajrayana Buddhism",
    motif: "Winds, drops, clear light",
    references: ["Completion-stage subtle body systems", "Bardo and clear light teachings", "Rainbow body studies"]
  },
  taoist: {
    accent: "#22c55e",
    aura: "rgba(34,197,94,.24)",
    era: "Han to Song developments",
    period: "Taoist internal alchemy",
    motif: "Jing, qi, shen refinement",
    references: ["Neidan internal alchemy texts", "Three Treasures models", "Studies of yangshen and golden elixir symbolism"]
  },
  "five-spirits": {
    accent: "#2dd4bf",
    aura: "rgba(45,212,191,.23)",
    era: "Classical Chinese medicine",
    period: "Five spirits psychology",
    motif: "Shen, hun, po, yi, zhi",
    references: ["Huangdi Neijing traditions", "Five spirits medical psychology", "Daoist and medical correspondences"]
  },
  sufi: {
    accent: "#f0abfc",
    aura: "rgba(240,171,252,.22)",
    era: "9th c. onward",
    period: "Sufi subtle psychology",
    motif: "Lata'if and nafs",
    references: ["Sufi lata'if teachings", "Nafs stage literature", "Qalb, ruh, sirr models across orders"]
  },
  anthroposophy: {
    accent: "#fde68a",
    aura: "rgba(253,230,138,.24)",
    era: "Early 20th c.",
    period: "Anthroposophy",
    motif: "Etheric, astral, I",
    references: ["Rudolf Steiner lectures", "Anthroposophical body-soul-spirit model", "Developmental spiritual members"]
  },
  paracelsian: {
    accent: "#fb923c",
    aura: "rgba(251,146,60,.24)",
    era: "16th c.",
    period: "Paracelsian medicine",
    motif: "Archaeus and sidereal body",
    references: ["Paracelsian medical writings", "Ens doctrines", "Archaeus and sidereal body studies"]
  },
  bardon: {
    accent: "#e879f9",
    aura: "rgba(232,121,249,.22)",
    era: "20th c.",
    period: "Modern Hermetic training",
    motif: "Elemental equilibrium",
    references: ["Franz Bardon, Initiation Into Hermetics", "Mental, astral, physical body training model", "Electric and magnetic fluid terminology"]
  },
  rosicrucian: {
    accent: "#f43f5e",
    aura: "rgba(244,63,94,.23)",
    era: "17th c. onward",
    period: "Rosicrucian esotericism",
    motif: "Golden wedding garment",
    references: ["Rosicrucian manifestos", "Modern Rosicrucian body models", "Christian esoteric transformation literature"]
  },
  "christian-esoteric": {
    accent: "#eab308",
    aura: "rgba(234,179,8,.22)",
    era: "Patristic to modern",
    period: "Christian mystical anthropology",
    motif: "Heart, nous, glory-body",
    references: ["Patristic body-soul-spirit language", "Hesychast nous and heart teachings", "Resurrection and body of glory traditions"]
  },
  alchemical: {
    accent: "#c0a062",
    aura: "rgba(192,160,98,.26)",
    era: "Hellenistic to early modern",
    period: "Alchemy",
    motif: "Corpus, anima, spiritus",
    references: ["Alchemical corpus-anima-spiritus triads", "Paracelsian and Hermetic alchemical anthropology", "Salt, sulfur, mercury interpretations"]
  }
};

const categoryFilters: Array<UniversalLayerCategory | "all"> = [
  "all",
  "dense_body",
  "vital_body",
  "dream_image_body",
  "rational_mind",
  "heart_intellect",
  "luminous_spirit_body",
  "divine_spark",
  "postmortem_body"
];

function layerTone(index: number) {
  const tones = [
    "from-stone-500/25 to-gold/10",
    "from-emerald-500/20 to-gold/10",
    "from-indigo-500/25 to-gold/10",
    "from-red-800/28 to-gold/10",
    "from-rose-500/20 to-gold/10",
    "from-violet-500/22 to-gold/10",
    "from-sky-500/18 to-gold/10",
    "from-amber-400/20 to-gold/10",
    "from-teal-400/18 to-gold/10",
    "from-yellow-200/25 to-gold/10",
    "from-white/18 to-gold/10",
    "from-black/50 to-gold/18"
  ];
  return tones[index % tones.length];
}

export function StratifiedHumanAtlas() {
  const [selectedLayerId, setSelectedLayerId] = useState<UniversalLayerCategory>("dense_body");
  const [selectedModelId, setSelectedModelId] = useState("theosophy");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<UniversalLayerCategory | "all">("all");
  const [diagramMode, setDiagramMode] = useState<DiagramMode>("ladder");
  const [compareIds, setCompareIds] = useState<string[]>(["theosophy", "egyptian", "kabbalah"]);
  const [scholarMode, setScholarMode] = useState(false);
  const [bodyModelId, setBodyModelId] = useState("theosophy");
  const [overlayModelId, setOverlayModelId] = useState("egyptian");
  const [compareOverlay, setCompareOverlay] = useState(false);
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [bodyStyle, setBodyStyle] = useState<BodyRenderStyle>("hybrid");
  const [isolateLayer, setIsolateLayer] = useState(false);
  const [progressiveLevel, setProgressiveLevel] = useState(10);
  const [showLabels, setShowLabels] = useState(true);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [diagramOnly, setDiagramOnly] = useState(false);

  const selectedLayer = universalLayers.find((layer) => layer.id === selectedLayerId) ?? universalLayers[0];
  const selectedModel = stratifiedModels.find((model) => model.id === selectedModelId) ?? stratifiedModels[0];
  const bodyModel = stratifiedModels.find((model) => model.id === bodyModelId) ?? stratifiedModels[0];
  const overlayModel = stratifiedModels.find((model) => model.id === overlayModelId) ?? stratifiedModels[1];

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return stratifiedModels
      .flatMap((model) =>
        model.layers.map((layer) => ({
          model,
          layer,
          haystack: `${model.name} ${model.tradition} ${layer.name} ${layer.translation ?? ""} ${layer.relatedTerms.join(" ")} ${layer.definition}`.toLowerCase()
        }))
      )
      .filter(({ layer, haystack }) => {
        const matchesQuery = normalized.length === 0 || haystack.includes(normalized);
        const matchesCategory = category === "all" || layer.universalLayer === category;
        return matchesQuery && matchesCategory;
      })
      .slice(0, 18);
  }, [category, query]);

  const comparisonModels = compareIds
    .map((id) => stratifiedModels.find((model) => model.id === id))
    .filter(Boolean) as StratifiedModel[];

  function toggleCompare(id: string) {
    setCompareIds((current) => {
      if (current.includes(id)) {
        return current.length > 2 ? current.filter((item) => item !== id) : current;
      }
      return [...current, id].slice(-4);
    });
  }

  return (
    <div className="space-y-8">
      <section className="relative isolate overflow-hidden rounded-lg border border-gold/30 bg-black/70 p-6 shadow-aureate lg:p-9">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_18%,rgba(181,146,85,.26),transparent_20rem),radial-gradient(circle_at_16%_74%,rgba(122,17,26,.28),transparent_24rem),linear-gradient(135deg,rgba(11,11,10,.96),rgba(25,15,16,.86))]" />
        <div className="absolute inset-4 -z-10 rounded border border-gold/15" />
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_25rem] lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[.34em] text-gold">Comparative esoteric anthropology</p>
            <h2 className="font-manuscript-title mt-5 font-display text-5xl leading-none text-ivory md:text-7xl">The Stratified Human</h2>
            <p className="mt-4 max-w-3xl text-xl leading-8 text-parchment">
              A Comparative Atlas of Esoteric Bodies, Souls, Vehicles, and Subtle Anatomy.
            </p>
            <p className="mt-5 max-w-3xl leading-8 text-parchment/90">
              Many wisdom traditions describe the human being as a layered reality of body, vitality, soul, mind,
              spirit, subtle vehicles, luminous forms, and divine essence. This instrument lets those models converse
              without pretending they are identical.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#models" className="focus-ring inline-flex items-center gap-2 rounded border border-gold/45 bg-gold/15 px-5 py-3 text-sm uppercase tracking-[.18em] text-ivory hover:bg-gold/25">
                Explore Models <ArrowRight size={17} />
              </a>
              <a href="#compare" className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-5 py-3 text-sm uppercase tracking-[.18em] text-gold hover:border-gold/55 hover:text-ivory">
                Compare Traditions <GitCompare size={17} />
              </a>
              <a href="#ladder" className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 px-5 py-3 text-sm uppercase tracking-[.18em] text-gold hover:border-gold/55 hover:text-ivory">
                Open Universal Ladder <Layers3 size={17} />
              </a>
            </div>
          </div>
          <AtlasSigil mode={diagramMode} />
        </div>
      </section>

      <section className="rounded border border-gold/20 bg-black/45 p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[.26em] text-gold">Visual diagram modes</p>
            <h3 className="font-display text-3xl text-ivory">Choose an atlas view</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {diagramModes.map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setDiagramMode(mode)}
                className={`focus-ring rounded border px-3 py-2 text-xs uppercase tracking-[.16em] transition ${
                  diagramMode === mode ? "border-gold bg-gold/20 text-ivory" : "border-gold/20 text-gold hover:border-gold/50"
                }`}
              >
                {mode}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setScholarMode((value) => !value)}
              className={`focus-ring rounded border px-3 py-2 text-xs uppercase tracking-[.16em] transition ${
                scholarMode ? "border-emerald-300/60 bg-emerald-300/10 text-ivory" : "border-gold/20 text-gold hover:border-gold/50"
              }`}
            >
              Scholar mode
            </button>
            <button
              type="button"
              onClick={() => setGlossaryOpen(true)}
              className="focus-ring rounded border border-gold/20 px-3 py-2 text-xs uppercase tracking-[.16em] text-gold transition hover:border-gold/50 hover:text-ivory"
            >
              Glossary drawer
            </button>
          </div>
        </div>
        <div className="mt-5">
          <DiagramModeView mode={diagramMode} selectedLayerId={selectedLayerId} onSelect={setSelectedLayerId} comparisonModels={comparisonModels} />
        </div>
      </section>

      <SubtleBodyObservatory
        selectedLayerId={selectedLayerId}
        onSelectLayer={setSelectedLayerId}
        bodyModel={bodyModel}
        overlayModel={overlayModel}
        bodyModelId={bodyModelId}
        overlayModelId={overlayModelId}
        onBodyModelChange={setBodyModelId}
        onOverlayModelChange={setOverlayModelId}
        compareOverlay={compareOverlay}
        onCompareOverlayChange={setCompareOverlay}
        bodyStyle={bodyStyle}
        onBodyStyleChange={setBodyStyle}
        isolateLayer={isolateLayer}
        onIsolateLayerChange={setIsolateLayer}
        progressiveLevel={progressiveLevel}
        onProgressiveLevelChange={setProgressiveLevel}
        showLabels={showLabels}
        onShowLabelsChange={setShowLabels}
        showAnnotations={showAnnotations}
        onShowAnnotationsChange={setShowAnnotations}
        diagramOnly={diagramOnly}
        onDiagramOnlyChange={setDiagramOnly}
      />

      <section id="ladder" className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_26rem]">
        <div className="temple-border rounded p-5">
          <div className="flex items-center justify-between gap-4 border-b border-gold/15 pb-4">
            <div>
              <p className="text-xs uppercase tracking-[.26em] text-gold">Universal layer ladder</p>
              <h3 className="font-display text-3xl text-ivory">Twelve interpretive strata</h3>
            </div>
            <Layers3 className="text-gold" size={28} strokeWidth={1.2} />
          </div>
          <div className="mt-5 grid gap-3">
            {[...universalLayers].reverse().map((layer, reversedIndex) => {
              const index = universalLayers.length - 1 - reversedIndex;
              const active = selectedLayerId === layer.id;
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setSelectedLayerId(layer.id)}
                  className={`focus-ring group grid gap-2 rounded border bg-gradient-to-r p-4 text-left transition hover:-translate-y-0.5 ${layerTone(index)} ${
                    active ? "border-gold shadow-[0_0_32px_rgba(181,146,85,.18)]" : "border-gold/18"
                  }`}
                >
                  <span className="text-xs uppercase tracking-[.22em] text-gold">{String(index + 1).padStart(2, "0")}</span>
                  <span className="font-display text-2xl text-ivory">{layer.title}</span>
                  <span className="text-sm leading-6 text-parchment/80">{layer.definition}</span>
                </button>
              );
            })}
          </div>
        </div>

        <LayerDetail layer={selectedLayer} />
      </section>

      <section id="models" className="temple-border rounded p-5">
        <div className="flex flex-col gap-4 border-b border-gold/15 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[.26em] text-gold">Tradition model cards</p>
            <h3 className="font-display text-4xl text-ivory">Bodies, souls, vehicles, and subtle anatomy</h3>
          </div>
          <div className="relative max-w-md grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" size={18} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Ka, Ochema, Nefesh, Rainbow body..."
              className="focus-ring w-full rounded border border-gold/25 bg-black/55 py-3 pl-10 pr-4 text-sm text-ivory placeholder:text-parchment/45"
            />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {categoryFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setCategory(filter)}
              className={`rounded border px-3 py-2 text-xs uppercase tracking-[.14em] ${
                category === filter ? "border-gold bg-gold/15 text-ivory" : "border-gold/15 text-gold hover:border-gold/45"
              }`}
            >
              {filter === "all" ? "All" : universalLayerLabels[filter]}
            </button>
          ))}
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {stratifiedModels.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              active={selectedModelId === model.id}
              selectedForCompare={compareIds.includes(model.id)}
              onOpen={() => setSelectedModelId(model.id)}
              onCompare={() => toggleCompare(model.id)}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_27rem]">
        <ModelDetailPanel model={selectedModel} scholarMode={scholarMode} />
        <SearchResults results={searchResults} onOpenModel={setSelectedModelId} onOpenLayer={setSelectedLayerId} />
      </section>

      <section id="compare" className="temple-border rounded p-5">
        <div className="flex flex-col gap-3 border-b border-gold/15 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[.26em] text-gold">Compare traditions</p>
            <h3 className="font-display text-4xl text-ivory">Side-by-side correspondence matrix</h3>
          </div>
          <p className="max-w-xl text-sm leading-6 text-parchment/75">
            Select two to four model cards above. These are functional comparisons, not claims of exact equivalence.
          </p>
        </div>
        <ComparisonTable models={comparisonModels} />
      </section>

      <div className="rounded border border-gold/20 bg-black/45 p-5 text-sm leading-7 text-parchment/80">
        <p className="text-xs uppercase tracking-[.24em] text-gold">Comparative note</p>
        <p className="mt-3">
          This resource is a comparative esoteric study tool. Correspondences are interpretive and should not be
          treated as exact equivalences between traditions. Terms are “roughly analogous,” “symbolically adjacent,”
          or “functionally comparable” only within the stated interpretive frame.
        </p>
      </div>
      <GlossaryDrawer open={glossaryOpen} onClose={() => setGlossaryOpen(false)} onOpenModel={setSelectedModelId} onOpenLayer={setSelectedLayerId} />
    </div>
  );
}

function modelVisual(model: StratifiedModel) {
  return modelVisuals[model.id] ?? {
    accent: "#b59255",
    aura: "rgba(181,146,85,.25)",
    era: "Mixed period",
    period: "Comparative tradition",
    motif: "Layered anthropology",
    references: ["Comparative esoteric anthropology", "Tradition-specific primary and secondary sources"]
  };
}

function confidenceForLayer(layer: StratifiedLayer, model: StratifiedModel): ConfidenceLevel {
  if (layer.name.toLowerCase().includes(universalLayerLabels[layer.universalLayer].split(" ")[0]?.toLowerCase() ?? "")) {
    return "direct";
  }
  if (model.tags.includes(layer.universalLayer) && ["dense_body", "vital_body", "rational_mind", "heart_intellect", "divine_spark"].includes(layer.universalLayer)) {
    return "functional";
  }
  if (["magical_vehicle", "postmortem_body", "shadow_identity", "name_identity", "luminous_spirit_body"].includes(layer.universalLayer)) {
    return "symbolic";
  }
  return "speculative";
}

function ConfidenceBadge({ level }: { level: ConfidenceLevel }) {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] uppercase tracking-[.14em] ${confidenceStyles[level]}`}>
      {confidenceLabels[level]}
    </span>
  );
}

function SubtleBodyObservatory({
  selectedLayerId,
  onSelectLayer,
  bodyModel,
  overlayModel,
  bodyModelId,
  overlayModelId,
  onBodyModelChange,
  onOverlayModelChange,
  compareOverlay,
  onCompareOverlayChange,
  bodyStyle,
  onBodyStyleChange,
  isolateLayer,
  onIsolateLayerChange,
  progressiveLevel,
  onProgressiveLevelChange,
  showLabels,
  onShowLabelsChange,
  showAnnotations,
  onShowAnnotationsChange,
  diagramOnly,
  onDiagramOnlyChange
}: {
  selectedLayerId: UniversalLayerCategory;
  onSelectLayer: (id: UniversalLayerCategory) => void;
  bodyModel: StratifiedModel;
  overlayModel: StratifiedModel;
  bodyModelId: string;
  overlayModelId: string;
  onBodyModelChange: (id: string) => void;
  onOverlayModelChange: (id: string) => void;
  compareOverlay: boolean;
  onCompareOverlayChange: (enabled: boolean) => void;
  bodyStyle: BodyRenderStyle;
  onBodyStyleChange: (style: BodyRenderStyle) => void;
  isolateLayer: boolean;
  onIsolateLayerChange: (enabled: boolean) => void;
  progressiveLevel: number;
  onProgressiveLevelChange: (value: number) => void;
  showLabels: boolean;
  onShowLabelsChange: (enabled: boolean) => void;
  showAnnotations: boolean;
  onShowAnnotationsChange: (enabled: boolean) => void;
  diagramOnly: boolean;
  onDiagramOnlyChange: (enabled: boolean) => void;
}) {
  const visual = modelVisual(bodyModel);
  const overlayVisual = modelVisual(overlayModel);
  const activeLayer = universalLayers.find((layer) => layer.id === selectedLayerId) ?? universalLayers[0];
  const activeTerms = bodyModel.layers.filter((layer) => layer.universalLayer === selectedLayerId);
  const overlayTerms = overlayModel.layers.filter((layer) => layer.universalLayer === selectedLayerId);
  const [revealPlaying, setRevealPlaying] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const activeLayerNumber = universalLayers.findIndex((layer) => layer.id === selectedLayerId) + 1;
  const primaryConfidence = activeTerms[0] ? confidenceForLayer(activeTerms[0], bodyModel) : "speculative";

  useEffect(() => {
    if (!revealPlaying) return undefined;
    const timer = window.setInterval(() => {
      onProgressiveLevelChange(progressiveLevel >= 10 ? 1 : progressiveLevel + 1);
    }, 900);
    return () => window.clearInterval(timer);
  }, [onProgressiveLevelChange, progressiveLevel, revealPlaying]);

  return (
    <section className="relative isolate overflow-hidden rounded-lg border border-gold/20 bg-black/70 p-5 shadow-[0_0_70px_rgba(0,0,0,.72),inset_0_0_80px_rgba(181,146,85,.045)] lg:p-7">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_24%,rgba(231,221,204,.055),transparent_18rem),radial-gradient(circle_at_50%_54%,rgba(181,146,85,.13),transparent_30rem),linear-gradient(135deg,rgba(4,4,4,.98),rgba(22,11,12,.8),rgba(0,0,0,.96))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(181,146,85,.035)_1px,transparent_1px),linear-gradient(180deg,rgba(181,146,85,.026)_1px,transparent_1px)] bg-[size:92px_92px] opacity-40" />
      <div className="flex flex-col gap-5 border-b border-gold/12 pb-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[.3em] text-gold/90">Aetherica / Architecture of Hidden Forces</p>
          <h3 className="font-manuscript-title mt-2 font-display text-4xl leading-tight text-ivory md:text-5xl">Subtle Body Observatory</h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-parchment/78">
            A black obsidian symbolic anatomy console for comparing esoteric bodies, souls, vehicles, centers, subtle
            fields, and luminous forms. Each layer is tradition-labeled and mapped to a universal ladder.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <label className="grid gap-2 text-xs uppercase tracking-[.18em] text-gold">
            Primary tradition
            <select
              value={bodyModelId}
              onChange={(event) => onBodyModelChange(event.target.value)}
              className="focus-ring min-w-52 rounded border border-gold/22 bg-black/85 px-3 py-2 text-sm normal-case tracking-normal text-ivory shadow-[inset_0_0_18px_rgba(181,146,85,.05)]"
            >
              {stratifiedModels.map((model) => (
                <option key={model.id} value={model.id}>{model.tradition}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-xs uppercase tracking-[.18em] text-gold">
            Overlay tradition
            <select
              value={overlayModelId}
              onChange={(event) => onOverlayModelChange(event.target.value)}
              className="focus-ring min-w-52 rounded border border-gold/22 bg-black/85 px-3 py-2 text-sm normal-case tracking-normal text-ivory shadow-[inset_0_0_18px_rgba(181,146,85,.05)]"
            >
              {stratifiedModels.filter((model) => model.id !== bodyModelId).map((model) => (
                <option key={model.id} value={model.id}>{model.tradition}</option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() => onCompareOverlayChange(!compareOverlay)}
            className={`focus-ring self-end rounded border px-4 py-2 text-xs uppercase tracking-[.16em] transition ${
              compareOverlay ? "border-emerald-300/50 bg-emerald-400/10 text-emerald-50 shadow-[0_0_18px_rgba(52,211,153,.08)]" : "border-gold/22 text-gold hover:border-gold/50 hover:bg-gold/10"
            }`}
          >
            Compare overlay
          </button>
        </div>
      </div>

      <div className="mt-5 grid gap-3 rounded border border-gold/12 bg-black/38 p-4 shadow-[inset_0_0_38px_rgba(0,0,0,.45)] lg:grid-cols-[1.2fr_.9fr_.9fr]">
        <label className="grid gap-2 text-xs uppercase tracking-[.18em] text-gold">
          Body rendering style
          <select
            value={bodyStyle}
            onChange={(event) => onBodyStyleChange(event.target.value as BodyRenderStyle)}
            className="focus-ring rounded border border-gold/22 bg-black/85 px-3 py-2 text-sm normal-case tracking-normal text-ivory"
          >
            {renderStyles.map((style) => (
              <option key={style.id} value={style.id}>{style.label}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-xs uppercase tracking-[.18em] text-gold">
          Progressive reveal
          <input
            type="range"
            min={1}
            max={10}
            value={progressiveLevel}
            onChange={(event) => onProgressiveLevelChange(Number(event.target.value))}
            className="accent-[#b59255]"
          />
        </label>
        <div className="grid grid-cols-2 gap-2">
          <TogglePill label="Isolate" enabled={isolateLayer} onChange={onIsolateLayerChange} />
          <TogglePill label="Labels" enabled={showLabels} onChange={onShowLabelsChange} />
          <TogglePill label="Annotations" enabled={showAnnotations} onChange={onShowAnnotationsChange} />
          <TogglePill label="Diagram only" enabled={diagramOnly} onChange={onDiagramOnlyChange} />
          <TogglePill label="Play reveal" enabled={revealPlaying} onChange={setRevealPlaying} />
          <TogglePill label="Read model" enabled={helpOpen} onChange={setHelpOpen} />
        </div>
      </div>
      <AnimatePresence>
        {helpOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-4 rounded border border-gold/20 bg-black/55 p-4 text-sm leading-7 text-parchment/80"
          >
            <p className="text-xs uppercase tracking-[.22em] text-gold">How to read this model</p>
            <p className="mt-2">
              Lower layers are drawn closer to the body and more bounded. Vital and astral layers breathe outward as
              translucent fields. Mental and causal layers become larger, clearer, and less dense. Spiritual layers rise
              toward the crown, point, or transfigured vehicle. Compare mode offsets the two traditions so shared
              categories can be seen without implying exact equivalence.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_23rem]">
        <div className="relative min-h-[37rem] overflow-hidden rounded border border-gold/16 bg-[#030302]/86 p-2 shadow-[inset_0_0_90px_rgba(0,0,0,.74)] sm:min-h-[42rem] sm:p-4">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(231,221,204,.055),transparent_14rem),radial-gradient(circle_at_50%_56%,rgba(181,146,85,.1),transparent_26rem),linear-gradient(180deg,rgba(181,146,85,.045),transparent_28%,rgba(122,17,26,.065))]" />
          <div className="pointer-events-none absolute inset-5 rounded border border-gold/10 shadow-[inset_0_0_40px_rgba(181,146,85,.045)]" />
          <div className="pointer-events-none absolute left-1/2 top-8 h-[36rem] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/15 to-transparent" />
          <HumanSubtleBodyDiagram
            model={bodyModel}
            overlayModel={overlayModel}
            selectedLayerId={selectedLayerId}
            onSelectLayer={onSelectLayer}
            compareOverlay={compareOverlay}
            bodyStyle={bodyStyle}
            isolateLayer={isolateLayer}
            progressiveLevel={progressiveLevel}
            showLabels={showLabels}
            showAnnotations={showAnnotations}
            diagramOnly={diagramOnly}
          />
        </div>

        <aside className="space-y-4">
          <div className="rounded border border-gold/16 bg-black/58 p-5 shadow-[inset_0_0_30px_rgba(181,146,85,.035)]">
            <p className="text-xs uppercase tracking-[.22em] text-gold">{visual.period}</p>
            <h4 className="mt-2 font-display text-3xl text-ivory">{bodyModel.tradition}</h4>
            <p className="mt-2 text-sm leading-6 text-parchment/78">{bodyModel.summary}</p>
            <p className="mt-3 border-t border-gold/10 pt-3 text-xs leading-5 text-parchment/55">
              Selected tradition map: this determines the terminology, sources, and visual logic of the central body.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded border border-gold/12 bg-black/45 p-3">
                <p className="text-xs uppercase tracking-[.18em] text-gold">Era</p>
                <p className="mt-1 text-parchment">{visual.era}</p>
              </div>
              <div className="rounded border border-gold/12 bg-black/45 p-3">
                <p className="text-xs uppercase tracking-[.18em] text-gold">Motif</p>
                <p className="mt-1 text-parchment">{visual.motif}</p>
              </div>
            </div>
          </div>

          <div className="rounded border border-gold/16 bg-black/58 p-5 shadow-[inset_0_0_30px_rgba(181,146,85,.035)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[.22em] text-gold">Selected layer</p>
              <span className="rounded-full border border-gold/18 bg-black/55 px-3 py-1 text-[10px] uppercase tracking-[.16em] text-gold/80">
                Ladder {String(activeLayerNumber).padStart(2, "0")}
              </span>
            </div>
            <h4 className="mt-2 font-display text-3xl text-ivory">{activeLayer.title}</h4>
            <p className="mt-2 text-sm leading-6 text-parchment/78">{activeLayer.definition}</p>
            <p className="mt-3 rounded border border-gold/10 bg-black/35 p-3 text-xs leading-5 text-parchment/62">
              Current reading: {confidenceMicrocopy[primaryConfidence]}
            </p>
            <div className="mt-4 space-y-3">
              <TermStack title={bodyModel.tradition} terms={activeTerms} model={bodyModel} accent={visual.accent} />
              {compareOverlay && <TermStack title={overlayModel.tradition} terms={overlayTerms} model={overlayModel} accent={overlayVisual.accent} />}
            </div>
          </div>

          <ReferencesPanel model={bodyModel} />
        </aside>
      </div>

      <HistoricalTimeline selectedModelId={bodyModel.id} />
      <div className="mt-5 rounded border border-gold/15 bg-black/40 p-4 text-sm leading-7 text-parchment/75">
        <p className="text-xs uppercase tracking-[.22em] text-gold">Educational integrity note</p>
        <p className="mt-2">
          These visualizations are interpretive digital representations of traditional esoteric models. They are intended
          as comparative educational tools, not empirical anatomical claims.
        </p>
      </div>
    </section>
  );
}

function TogglePill({ label, enabled, onChange }: { label: string; enabled: boolean; onChange: (enabled: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`focus-ring rounded border px-3 py-2 text-xs uppercase tracking-[.14em] transition ${
        enabled
          ? "border-gold/70 bg-gold/12 text-ivory shadow-[inset_0_0_20px_rgba(181,146,85,.08)]"
          : "border-gold/16 bg-black/35 text-gold/78 hover:border-gold/42 hover:bg-black/55 hover:text-gold"
      }`}
    >
      {label}
    </button>
  );
}

function TermStack({ title, terms, model, accent }: { title: string; terms: StratifiedLayer[]; model: StratifiedModel; accent: string }) {
  return (
    <div className="rounded border border-gold/12 bg-black/45 p-3 shadow-[inset_0_0_24px_rgba(0,0,0,.35)]">
      <p className="text-xs uppercase tracking-[.18em]" style={{ color: accent }}>{title}</p>
      <div className="mt-2 space-y-2">
        {terms.length > 0 ? terms.map((term) => {
          const confidence = confidenceForLayer(term, model);
          return (
          <div key={term.id} className="rounded border border-gold/10 bg-black/30 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-display text-xl text-ivory">{term.name}</span>
              <ConfidenceBadge level={confidence} />
            </div>
            <p className="mt-2 text-xs leading-5 text-parchment/55">{confidenceMicrocopy[confidence]}</p>
          </div>
        );}) : <p className="text-sm text-parchment/55">No direct term in this model.</p>}
      </div>
    </div>
  );
}

function HumanSubtleBodyDiagram({
  model,
  overlayModel,
  selectedLayerId,
  onSelectLayer,
  compareOverlay,
  bodyStyle,
  isolateLayer,
  progressiveLevel,
  showLabels,
  showAnnotations,
  diagramOnly
}: {
  model: StratifiedModel;
  overlayModel: StratifiedModel;
  selectedLayerId: UniversalLayerCategory;
  onSelectLayer: (id: UniversalLayerCategory) => void;
  compareOverlay: boolean;
  bodyStyle: BodyRenderStyle;
  isolateLayer: boolean;
  progressiveLevel: number;
  showLabels: boolean;
  showAnnotations: boolean;
  diagramOnly: boolean;
}) {
  const visual = modelVisual(model);
  const overlayVisual = modelVisual(overlayModel);
  const visualLayers = buildVisualLayers(model, visual.accent);
  const overlayLayers = buildVisualLayers(overlayModel, overlayVisual.accent);
  const visibleLayers = visualLayers.filter((layer) => layer.order <= progressiveLevel);
  const visibleOverlayLayers = overlayLayers.filter((layer) => layer.order <= progressiveLevel);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  return (
    <div
      className="relative mx-auto h-[35rem] max-w-[42rem] [perspective:1200px] sm:h-[40rem]"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setParallax({
          x: ((event.clientX - rect.left) / rect.width - 0.5) * 12,
          y: ((event.clientY - rect.top) / rect.height - 0.5) * 8
        });
      }}
      onPointerLeave={() => setParallax({ x: 0, y: 0 })}
    >
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 520 640" role="img" aria-label={`${model.tradition} subtle body diagram`}>
        <defs>
          <linearGradient id="humanBodyGlow" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor={visual.accent} stopOpacity=".24" />
            <stop offset="48%" stopColor="#e7ddcc" stopOpacity=".14" />
            <stop offset="100%" stopColor={visual.accent} stopOpacity=".08" />
          </linearGradient>
          <radialGradient id="observatoryChamber" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor={visual.accent} stopOpacity=".12" />
            <stop offset="72%" stopColor="#000000" stopOpacity=".02" />
          </radialGradient>
        </defs>
        <rect width="520" height="640" fill="url(#observatoryChamber)" />
        <ObservatoryChamberGeometry accent={visual.accent} parallax={parallax} />
        <g opacity={diagramOnly ? 0.15 : 1}>
          <BodySilhouette styleMode={bodyStyle} accent={visual.accent} />
        </g>
        <LayerRenderer
          layers={visibleLayers}
          selectedLayerId={selectedLayerId}
          isolateLayer={isolateLayer}
          onSelectLayer={onSelectLayer}
          compare={false}
          parallax={parallax}
        />
        {compareOverlay && (
          <LayerRenderer
            layers={visibleOverlayLayers}
            selectedLayerId={selectedLayerId}
            isolateLayer={false}
            onSelectLayer={onSelectLayer}
            compare
            parallax={parallax}
          />
        )}
        {compareOverlay && (
          <CompareCorrespondenceLines
            primaryLayers={visibleLayers}
            overlayLayers={visibleOverlayLayers}
            selectedLayerId={selectedLayerId}
          />
        )}
        {compareOverlay && (
          <g opacity=".55">
            <line x1="260" y1="88" x2="260" y2="548" stroke="rgba(231,221,204,.18)" strokeDasharray="3 10" />
            <text x="174" y="590" fill={visual.accent} fontSize="11" letterSpacing="2">{model.tradition.toUpperCase()}</text>
            <text x="304" y="590" fill={overlayVisual.accent} fontSize="11" letterSpacing="2">{overlayModel.tradition.toUpperCase()}</text>
          </g>
        )}
        {showAnnotations && <TraditionSpecificOverlay model={model} accent={visual.accent} />}
        {compareOverlay && showAnnotations && <TraditionSpecificOverlay model={overlayModel} accent={overlayVisual.accent} compare />}
        {showLabels && <LabelOverlay layers={visibleLayers} selectedLayerId={selectedLayerId} onSelectLayer={onSelectLayer} />}
        <g opacity=".56">
          <text x="260" y="40" textAnchor="middle" fill="rgba(181,146,85,.72)" fontSize="9" letterSpacing="4">
            AETHERICA OBSERVATORY
          </text>
          <text x="260" y="608" textAnchor="middle" fill="rgba(231,221,204,.42)" fontSize="9" letterSpacing="2.2">
            CORE  /  FIELD  /  TRANSCENDENT BODY
          </text>
        </g>
      </svg>

      <div className="absolute left-3 top-3 max-w-[10.5rem] rounded border border-gold/18 bg-black/75 p-3 backdrop-blur sm:left-4 sm:top-4 sm:max-w-[12rem]">
        <p className="text-[10px] uppercase tracking-[.18em] text-gold">Primary map</p>
        <p className="mt-1 font-display text-xl text-ivory sm:text-2xl">{model.tradition}</p>
      </div>
      {compareOverlay && (
        <div className="absolute right-3 top-3 max-w-[10.5rem] rounded border bg-black/75 p-3 backdrop-blur sm:right-4 sm:top-4 sm:max-w-[12rem]" style={{ borderColor: overlayVisual.accent }}>
          <p className="text-[10px] uppercase tracking-[.18em]" style={{ color: overlayVisual.accent }}>Overlay map</p>
          <p className="mt-1 font-display text-xl text-ivory sm:text-2xl">{overlayModel.tradition}</p>
        </div>
      )}
      <div className="absolute bottom-3 left-3 right-3 grid gap-2 sm:bottom-4 sm:left-4 sm:right-4 sm:grid-cols-2 md:grid-cols-4">
        {visibleLayers.slice(0, 4).map((layer) => {
          const active = selectedLayerId === layer.category;
          return (
            <button
              key={layer.id}
              type="button"
              onClick={() => onSelectLayer(layer.category)}
              className={`rounded border bg-black/76 p-2 text-left backdrop-blur transition ${active ? "border-gold" : "border-gold/15 hover:border-gold/45"}`}
            >
              <span className="block text-[10px] uppercase tracking-[.16em]" style={{ color: layer.color }}>{universalLayerLabels[layer.category]}</span>
              <span className="mt-1 block truncate text-xs text-parchment sm:text-sm">{layer.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function buildVisualLayers(model: StratifiedModel, accent: string): ObservatoryVisualLayer[] {
  const priority: UniversalLayerCategory[] = [
    "dense_body",
    "formative_double",
    "vital_body",
    "desire_body",
    "emotional_soul",
    "dream_image_body",
    "rational_mind",
    "heart_intellect",
    "causal_soul",
    "luminous_spirit_body",
    "divine_spark",
    "absolute_root"
  ];
  const colors: Record<UniversalLayerCategory, string> = {
    dense_body: "#d8c7a6",
    vital_body: "#48d597",
    formative_double: "#8ed8ff",
    desire_body: "#e65b53",
    emotional_soul: "#f0a4bd",
    dream_image_body: "#9b8cff",
    rational_mind: "#78b7ff",
    heart_intellect: "#f5ca66",
    causal_soul: "#c5f0d0",
    luminous_spirit_body: "#fff2ad",
    divine_spark: "#ffffff",
    absolute_root: accent,
    shadow_identity: "#5a4b5f",
    name_identity: "#d7bd7a",
    magical_vehicle: "#bda1ff",
    postmortem_body: "#e9e2d2"
  };
  const typeFor: Record<UniversalLayerCategory, VisualLayerType> = {
    dense_body: "shell",
    formative_double: "shell",
    vital_body: "field",
    desire_body: "field",
    emotional_soul: "halo",
    dream_image_body: "vehicle",
    rational_mind: "ring",
    heart_intellect: "core",
    causal_soul: "halo",
    luminous_spirit_body: "crown",
    divine_spark: "point",
    absolute_root: "halo",
    shadow_identity: "shadow",
    name_identity: "inscription",
    magical_vehicle: "vehicle",
    postmortem_body: "shell"
  };
  const orderFor: Record<UniversalLayerCategory, number> = {
    dense_body: 1,
    formative_double: 2,
    vital_body: 3,
    desire_body: 4,
    emotional_soul: 5,
    dream_image_body: 6,
    rational_mind: 7,
    heart_intellect: 8,
    causal_soul: 9,
    luminous_spirit_body: 10,
    divine_spark: 10,
    absolute_root: 10,
    shadow_identity: 3,
    name_identity: 6,
    magical_vehicle: 7,
    postmortem_body: 8
  };
  const radiusFor: Record<UniversalLayerCategory, number> = {
    dense_body: 102,
    formative_double: 118,
    vital_body: 139,
    desire_body: 158,
    emotional_soul: 174,
    dream_image_body: 196,
    rational_mind: 216,
    heart_intellect: 64,
    causal_soul: 242,
    luminous_spirit_body: 268,
    divine_spark: 30,
    absolute_root: 295,
    shadow_identity: 96,
    name_identity: 226,
    magical_vehicle: 232,
    postmortem_body: 184
  };
  const found = priority
    .map((category, index) => {
      const terms = model.layers.filter((layer) => layer.universalLayer === category);
      if (terms.length === 0) return null;
      return {
        id: `${model.id}-${category}`,
        label: terms.map((term) => term.name).join(", "),
        category,
        visualType: typeFor[category],
        color: colors[category] ?? accent,
        opacity: category === "dense_body" ? 0.26 : category === "vital_body" ? 0.24 : category === "dream_image_body" ? 0.19 : category === "luminous_spirit_body" ? 0.22 : 0.18 + index * 0.012,
        glow: category === "dense_body" ? 5 : category === "vital_body" ? 11 : category === "dream_image_body" ? 14 : category === "luminous_spirit_body" ? 19 : 8 + index * 1.3,
        radius: radiusFor[category] ?? 150 + index * 12,
        depth: (orderFor[category] ?? index + 1) * 0.9,
        order: orderFor[category] ?? Math.min(index + 1, 10),
        y: category === "heart_intellect" ? 282 : category === "divine_spark" ? 128 : category === "causal_soul" ? 190 : category === "luminous_spirit_body" ? 104 : undefined,
        notes: `${universalLayerLabels[category]} rendered as ${typeFor[category]}.`
      } satisfies ObservatoryVisualLayer;
    })
    .filter(Boolean) as ObservatoryVisualLayer[];

  return found.length > 0 ? found : [{
    id: `${model.id}-fallback`,
    label: model.tradition,
    category: "dream_image_body",
    visualType: "halo",
    color: accent,
    opacity: 0.4,
    glow: 28,
    radius: 150,
    depth: 4,
    order: 4,
    notes: "Fallback comparative layer."
  }];
}

function BodySilhouette({ styleMode, accent }: { styleMode: BodyRenderStyle; accent: string }) {
  const fill = styleMode === "anatomical"
    ? "rgba(231,221,204,.18)"
    : styleMode === "transparent"
      ? "rgba(231,221,204,.06)"
      : styleMode === "etheric"
        ? `${accent}22`
        : "url(#humanBodyGlow)";
  const stroke = styleMode === "sacred" ? accent : "rgba(231,221,204,.62)";
  return (
    <g>
      <motion.path
        d="M260 68c27 0 48 22 48 50 0 23-14 42-34 49 8 18 14 45 16 82l4 80 31 105c5 17-5 32-21 36l-33-94 2 91 16 89c4 24-9 45-29 45s-33-21-29-45l16-89 2-91-33 94c-16-4-26-19-21-36l31-105 4-80c2-37 8-64 16-82-20-7-34-26-34-49 0-28 21-50 48-50Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={styleMode === "sacred" ? 1.25 : 1.65}
        animate={{ opacity: [0.82, 0.94, 0.82] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <path d="M260 176v366" stroke={accent} strokeWidth="1.15" strokeDasharray={styleMode === "sacred" ? "4 9" : "8 12"} opacity=".5" />
      {styleMode !== "anatomical" && (
        <g opacity=".28">
          <path d="M228 250c22 13 42 13 64 0M233 336c18 11 36 11 54 0M244 444c10 7 22 7 32 0" stroke={accent} fill="none" strokeWidth=".8" />
          <path d="M239 198c14 9 28 9 42 0M238 300c15 9 29 9 44 0" stroke="rgba(231,221,204,.36)" fill="none" strokeWidth=".75" />
          <circle cx="260" cy="124" r="8" fill={accent} opacity=".24" />
          <circle cx="260" cy="280" r="9" fill={accent} opacity=".2" />
          <circle cx="260" cy="410" r="10" fill={accent} opacity=".2" />
        </g>
      )}
    </g>
  );
}

function ObservatoryChamberGeometry({ accent, parallax }: { accent: string; parallax: { x: number; y: number } }) {
  const dust = [
    [90, 122, 0.4], [146, 84, 0.28], [402, 118, 0.32], [458, 238, 0.22], [82, 408, 0.24],
    [128, 530, 0.3], [376, 522, 0.2], [430, 430, 0.26], [314, 74, 0.22], [218, 512, 0.2],
    [104, 286, 0.2], [408, 314, 0.28], [192, 164, 0.18], [336, 184, 0.22], [260, 572, 0.26]
  ];
  return (
    <g opacity=".72" transform={`translate(${parallax.x * -0.22} ${parallax.y * -0.18})`}>
      <ellipse cx="260" cy="560" rx="176" ry="36" fill="none" stroke={accent} strokeWidth=".7" opacity=".18" />
      <ellipse cx="260" cy="560" rx="118" ry="22" fill="none" stroke="rgba(181,146,85,.28)" strokeWidth=".7" />
      <path d="M88 560 C160 516 360 516 432 560" stroke="rgba(181,146,85,.2)" fill="none" />
      <path d="M118 102 C174 46 346 46 402 102" stroke="rgba(181,146,85,.18)" fill="none" />
      <path d="M94 318 H426M260 74 V566" stroke="rgba(231,221,204,.07)" strokeDasharray="2 14" />
      <path d="M150 126 C190 94 330 94 370 126M122 510 C180 478 340 478 398 510" stroke="rgba(181,146,85,.12)" fill="none" />
      {[-2, -1, 1, 2].map((offset) => (
        <path key={offset} d={`M${260 + offset * 58} 112 C${235 + offset * 34} 250 ${235 + offset * 34} 428 ${260 + offset * 58} 566`} stroke="rgba(181,146,85,.085)" fill="none" />
      ))}
      {dust.map(([cx, cy, opacity], index) => (
        <circle key={`${cx}-${cy}-${index}`} cx={cx} cy={cy} r={index % 3 === 0 ? 1.15 : 0.75} fill="#e7ddcc" opacity={opacity} />
      ))}
    </g>
  );
}

function CompareCorrespondenceLines({
  primaryLayers,
  overlayLayers,
  selectedLayerId
}: {
  primaryLayers: ObservatoryVisualLayer[];
  overlayLayers: ObservatoryVisualLayer[];
  selectedLayerId: UniversalLayerCategory;
}) {
  return (
    <g>
      {primaryLayers.map((primary) => {
        const overlay = overlayLayers.find((layer) => layer.category === primary.category);
        if (!overlay) return null;
        const active = selectedLayerId === primary.category;
        const y = primary.y ?? (primary.visualType === "crown" ? 252 : 318);
        const confidence = primary.category === overlay.category ? "functional" : "symbolic";
        return (
          <g key={`compare-${primary.id}`} opacity={active ? 0.66 : 0.16}>
            <line
              x1="232"
              y1={y}
              x2="288"
              y2={overlay.y ?? y}
              stroke={active ? "rgba(231,221,204,.78)" : primary.color}
              strokeWidth={active ? 1.05 : 0.65}
              strokeDasharray={confidence === "functional" ? "1 0" : "4 9"}
            />
            {active && <circle cx="260" cy={y} r="3.2" fill="#e7ddcc" opacity=".62" />}
          </g>
        );
      })}
    </g>
  );
}

function LayerRenderer({
  layers,
  selectedLayerId,
  isolateLayer,
  onSelectLayer,
  compare,
  parallax
}: {
  layers: ObservatoryVisualLayer[];
  selectedLayerId: UniversalLayerCategory;
  isolateLayer: boolean;
  onSelectLayer: (id: UniversalLayerCategory) => void;
  compare: boolean;
  parallax: { x: number; y: number };
}) {
  return (
    <g>
      {layers.map((layer) => {
        const active = selectedLayerId === layer.category;
        const opacity = isolateLayer && !active ? 0.035 : active ? Math.min(layer.opacity + 0.15, 0.58) : layer.opacity;
        const strokeWidth = active ? 1.9 : compare ? 1.05 : layer.visualType === "shell" ? 1.1 : 1.35;
        const xOffset = (compare ? 18 : compare === false ? -8 : 0) + parallax.x * (layer.depth * 0.075);
        const yOffset = parallax.y * (layer.depth * 0.045);
        const dash = compare ? "8 9" : layer.visualType === "ring" || layer.visualType === "inscription" ? "2 7" : undefined;
        const filter = active ? `drop-shadow(0 0 ${Math.min(layer.glow, 18)}px ${layer.color})` : `drop-shadow(0 0 ${Math.min(layer.glow, 9)}px ${layer.color})`;

        if (layer.visualType === "point" || layer.visualType === "core") {
          return (
            <g key={layer.id} onClick={() => onSelectLayer(layer.category)} className="cursor-pointer">
              <circle cx={260 + xOffset} cy={(layer.y ?? 280) + yOffset} r={active ? 15 : 10} fill={layer.color} opacity={opacity} style={{ filter }} />
              <circle cx={260 + xOffset} cy={(layer.y ?? 280) + yOffset} r={active ? 34 : 24} fill="none" stroke={layer.color} strokeWidth=".85" opacity={opacity * 0.68} />
            </g>
          );
        }

        if (layer.visualType === "shadow") {
          return (
            <ellipse key={layer.id} cx={260 + xOffset} cy={545 + yOffset} rx="116" ry="24" fill={layer.color} opacity={opacity} onClick={() => onSelectLayer(layer.category)} className="cursor-pointer" />
          );
        }

        if (layer.visualType === "channel") {
          return (
            <g key={layer.id} stroke={layer.color} opacity={opacity} fill="none" onClick={() => onSelectLayer(layer.category)} className="cursor-pointer">
              <path d={`M${260 + xOffset} 95 C245 210 245 350 ${260 + xOffset} 535`} strokeWidth="2" />
              <path d={`M${260 + xOffset} 95 C285 210 285 350 ${260 + xOffset} 535`} strokeWidth="2" />
            </g>
          );
        }

        return (
          <g key={layer.id} onClick={() => onSelectLayer(layer.category)} className="cursor-pointer">
            <motion.ellipse
              cx={260 + xOffset}
              cy={(layer.visualType === "crown" ? 252 : 318) + yOffset}
              rx={layer.visualType === "crown" ? layer.radius * 0.5 : layer.radius * 0.55}
              ry={layer.radius}
              fill={["field", "halo", "vehicle", "crown"].includes(layer.visualType) ? layer.color : "none"}
              fillOpacity={["field", "halo", "vehicle", "crown"].includes(layer.visualType) ? opacity * (active ? 0.075 : 0.035) : 0}
              stroke={layer.color}
              strokeWidth={strokeWidth}
              strokeDasharray={dash}
              opacity={opacity}
              animate={{ ry: [layer.radius, layer.radius + (active ? 2.2 : 0.7), layer.radius], rx: [layer.visualType === "crown" ? layer.radius * 0.5 : layer.radius * 0.55, (layer.visualType === "crown" ? layer.radius * 0.5 : layer.radius * 0.55) + (active ? 1.15 : 0.35), layer.visualType === "crown" ? layer.radius * 0.5 : layer.radius * 0.55] }}
              transition={{ duration: active ? 6.2 : 10, repeat: Infinity, ease: "easeInOut" }}
              style={{ filter }}
            />
            {active && (
              <ellipse
                cx={260 + xOffset}
                cy={(layer.visualType === "crown" ? 252 : 318) + yOffset}
                rx={(layer.visualType === "crown" ? layer.radius * 0.5 : layer.radius * 0.55) + 8}
                ry={layer.radius + 8}
                fill="none"
                stroke="rgba(231,221,204,.36)"
                strokeWidth=".7"
              />
            )}
          </g>
        );
      })}
    </g>
  );
}

function TraditionSpecificOverlay({ model, accent, compare = false }: { model: StratifiedModel; accent: string; compare?: boolean }) {
  const opacity = compare ? 0.35 : 0.62;
  if (model.id === "egyptian") {
    return (
      <g opacity={opacity} stroke={accent} fill="none">
        <path d="M210 118 C178 96 163 67 176 42 C211 62 227 89 220 118" strokeWidth="1.4" />
        <path d="M310 118 C342 96 357 67 344 42 C309 62 293 89 300 118" strokeWidth="1.4" />
        <path d="M226 178 C248 162 272 162 294 178" strokeDasharray="4 8" />
        <ellipse cx="260" cy="545" rx="86" ry="18" fill={accent} opacity=".14" />
        <path d="M184 176 H336M198 198 H322M210 220 H310" strokeDasharray="5 9" opacity=".75" />
        <circle cx="260" cy="105" r="56" strokeDasharray="2 8" opacity=".5" />
      </g>
    );
  }
  if (["taoist", "five-spirits"].includes(model.id)) {
    return (
      <g opacity={opacity} stroke={accent} fill="none">
        <path d="M260 102 C218 210 215 420 260 535 C305 420 302 210 260 102" strokeWidth="1.6" />
        <path d="M260 102 C302 210 305 420 260 535" strokeWidth=".8" opacity=".5" />
        <circle cx="260" cy="408" r="34" strokeDasharray="3 6" />
        <circle cx="260" cy="282" r="28" strokeDasharray="3 6" />
        <circle cx="260" cy="142" r="24" strokeDasharray="3 6" />
        <circle cx="260" cy="430" r="9" fill={accent} opacity=".45" />
        <path d="M226 408 H294M232 282 H288M238 142 H282" opacity=".55" />
      </g>
    );
  }
  if (["vajrayana", "tantric"].includes(model.id)) {
    return (
      <g opacity={opacity} stroke={accent} fill="none">
        <path d="M260 90 V545" strokeWidth="2" />
        <path d="M232 105 C284 215 212 350 260 536" strokeWidth="1.2" />
        <path d="M288 105 C236 215 308 350 260 536" strokeWidth="1.2" />
        {[132, 206, 280, 354, 430, 502].map((cy, index) => (
          <g key={cy}>
            <circle cx="260" cy={cy} r={10 + (index % 2)} fill={accent} opacity=".28" />
            <circle cx="260" cy={cy} r={24} strokeDasharray="2 7" opacity=".35" />
          </g>
        ))}
      </g>
    );
  }
  if (model.id === "kabbalah") {
    return (
      <g opacity={opacity} stroke={accent} fill="none">
        <path d="M260 82 V548" strokeWidth="1.4" />
        {[118, 188, 258, 328, 398, 468].map((cy, index) => (
          <g key={cy}>
            <circle cx="260" cy={cy} r={index === 0 ? 22 : 17} fill={accent} opacity=".11" />
            <line x1="216" y1={cy} x2="304" y2={cy} />
            <line x1="238" y1={cy - 28} x2="282" y2={cy + 28} opacity=".35" />
            <line x1="282" y1={cy - 28} x2="238" y2={cy + 28} opacity=".35" />
          </g>
        ))}
      </g>
    );
  }
  if (model.id === "golden-dawn") {
    return (
      <g opacity={opacity} stroke={accent} fill="none">
        <circle cx="260" cy="318" r="190" strokeDasharray="4 8" opacity=".7" />
        <circle cx="260" cy="318" r="150" opacity=".55" />
        <path d="M260 128 L384 410 H136 Z" />
        <path d="M136 226 H384 L260 520 Z" />
        <circle cx="260" cy="318" r="118" strokeDasharray="1 10" opacity=".55" />
      </g>
    );
  }
  if (model.id === "sufi") {
    return (
      <g opacity={opacity} stroke={accent} fill="none">
        {[238, 262, 288, 316, 346].map((cy, index) => (
          <circle key={cy} cx="260" cy={cy} r={18 + index * 9} fill={accent} opacity={0.055 + index * 0.018} />
        ))}
        <circle cx="260" cy="280" r="12" fill={accent} opacity=".45" />
        <path d="M260 222 C230 260 230 318 260 356 C290 318 290 260 260 222" opacity=".55" />
      </g>
    );
  }
  return (
    <g opacity={opacity} stroke={accent} fill="none">
      <circle cx="260" cy="318" r="178" strokeDasharray="3 9" />
      <path d="M260 96 C220 196 220 440 260 540 C300 440 300 196 260 96" />
    </g>
  );
}

function LabelOverlay({
  layers,
  selectedLayerId,
  onSelectLayer
}: {
  layers: ObservatoryVisualLayer[];
  selectedLayerId: UniversalLayerCategory;
  onSelectLayer: (id: UniversalLayerCategory) => void;
}) {
  return (
    <g>
      {layers.slice(0, 6).map((layer, index) => {
        const rightSide = index % 2 === 0;
        const y = 134 + index * 62;
        const anchorY = layer.y ?? Math.min(500, 138 + index * 52);
        const x1 = rightSide ? 326 : 194;
        const x2 = rightSide ? 382 : 138;
        const rectX = rightSide ? 378 : 28;
        const active = selectedLayerId === layer.category;
        return (
          <g key={layer.id} onClick={() => onSelectLayer(layer.category)} className="cursor-pointer">
            <line x1={x1} y1={anchorY} x2={x2} y2={y - 9} stroke={layer.color} opacity={active ? .72 : .22} />
            <rect x={rectX} y={y - 32} width="114" height="44" rx="4" fill="rgba(0,0,0,.66)" stroke={layer.color} opacity={active ? .9 : .48} />
            <line x1={rectX + 8} y1={y - 4} x2={rectX + 106} y2={y - 4} stroke={layer.color} opacity=".22" />
            <text x={rectX + 8} y={y - 16} fill={layer.color} fontSize="7.8" letterSpacing="1.55">
              {universalLayerLabels[layer.category].toUpperCase().slice(0, 17)}
            </text>
            <text x={rectX + 8} y={y + 8} fill="#e7ddcc" fontSize="9.6">
              {layer.label.slice(0, 19)}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function HistoricalTimeline({ selectedModelId }: { selectedModelId: string }) {
  return (
    <div className="mt-7 rounded border border-gold/18 bg-black/45 p-4">
      <div className="flex items-center gap-3">
        <Clock3 className="text-gold" size={19} />
        <p className="text-xs uppercase tracking-[.24em] text-gold">Rough historical emergence</p>
      </div>
      <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
        {stratifiedModels.map((model) => {
          const visual = modelVisual(model);
          const active = model.id === selectedModelId;
          return (
            <div key={model.id} className={`min-w-[15rem] rounded border bg-black/55 p-3 ${active ? "border-gold" : "border-gold/15"}`}>
              <p className="text-xs uppercase tracking-[.18em]" style={{ color: visual.accent }}>{visual.era}</p>
              <p className="mt-2 font-display text-2xl text-ivory">{model.tradition}</p>
              <p className="mt-1 text-xs leading-5 text-parchment/65">{visual.period}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReferencesPanel({ model }: { model: StratifiedModel }) {
  const visual = modelVisual(model);
  return (
    <div className="rounded border border-gold/20 bg-black/55 p-4">
      <div className="flex items-center gap-3">
        <Library className="text-gold" size={18} />
        <p className="text-xs uppercase tracking-[.22em] text-gold">Source notes</p>
      </div>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-parchment/78">
        {visual.references.map((reference) => (
          <li key={reference} className="rounded border border-gold/10 bg-black/35 p-2">{reference}</li>
        ))}
      </ul>
      <p className="mt-3 text-xs leading-5 text-parchment/55">
        These are orientation references for the interface, not exhaustive citations. Tradition-specific terms should
        be checked against primary sources and specialist scholarship before being treated as exact.
      </p>
    </div>
  );
}

function GlossaryDrawer({
  open,
  onClose,
  onOpenModel,
  onOpenLayer
}: {
  open: boolean;
  onClose: () => void;
  onOpenModel: (id: string) => void;
  onOpenLayer: (id: UniversalLayerCategory) => void;
}) {
  const [drawerQuery, setDrawerQuery] = useState("");
  const entries = useMemo(() => {
    const normalized = drawerQuery.trim().toLowerCase();
    return stratifiedModels
      .flatMap((model) => model.layers.map((layer) => ({ model, layer })))
      .sort((a, b) => a.layer.name.localeCompare(b.layer.name))
      .filter(({ model, layer }) => {
        const haystack = `${model.tradition} ${model.name} ${layer.name} ${layer.translation ?? ""} ${layer.relatedTerms.join(" ")} ${universalLayerLabels[layer.universalLayer]}`.toLowerCase();
        return normalized.length === 0 || haystack.includes(normalized);
      });
  }, [drawerQuery]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50 bg-black/72 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.aside
            className="ml-auto h-full w-full max-w-2xl overflow-auto border-l border-gold/20 bg-[#050403] p-5 shadow-[0_0_80px_rgba(0,0,0,.8),inset_0_0_70px_rgba(181,146,85,.045)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 210 }}
          >
            <div className="sticky top-0 z-10 border-b border-gold/12 bg-[#050403]/95 pb-4 backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[.26em] text-gold">Glossary cabinet</p>
                  <h3 className="font-display text-4xl leading-tight text-ivory">Terms of the stratified human</h3>
                  <p className="mt-2 max-w-lg text-xs leading-5 text-parchment/60">
                    Search a term, open its tradition, and see how confidently it maps to the universal ladder.
                  </p>
                </div>
                <button type="button" onClick={onClose} className="focus-ring rounded border border-gold/22 bg-black/55 px-3 py-2 text-xs uppercase tracking-[.16em] text-gold transition hover:border-gold/50 hover:text-ivory">
                  Close
                </button>
              </div>
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" size={18} />
                <input
                  value={drawerQuery}
                  onChange={(event) => setDrawerQuery(event.target.value)}
                  placeholder="Search by term, tradition, layer, or related word..."
                  className="focus-ring w-full rounded border border-gold/22 bg-black/72 py-3 pl-10 pr-4 text-sm text-ivory placeholder:text-parchment/40"
                />
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {entries.map(({ model, layer }) => {
                const confidence = confidenceForLayer(layer, model);
                const visual = modelVisual(model);
                return (
                  <button
                    key={`${model.id}-${layer.id}`}
                    type="button"
                    onClick={() => {
                      onOpenModel(model.id);
                      onOpenLayer(layer.universalLayer);
                      onClose();
                    }}
                    className="group rounded border border-gold/12 bg-black/45 p-4 text-left transition hover:-translate-y-0.5 hover:border-gold/40 hover:bg-black/60"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="font-display text-2xl text-ivory">{layer.name}</span>
                      <ConfidenceBadge level={confidence} />
                    </div>
                    <p className="mt-1 text-xs uppercase tracking-[.18em]" style={{ color: visual.accent }}>
                      {model.tradition} / {universalLayerLabels[layer.universalLayer]}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-parchment/75">{layer.definition}</p>
                    <p className="mt-2 border-t border-gold/10 pt-2 text-xs leading-5 text-parchment/55">{confidenceMicrocopy[confidence]}</p>
                    {layer.relatedTerms.length > 0 && (
                      <p className="mt-2 text-xs leading-5 text-parchment/50">Related: {layer.relatedTerms.join(", ")}</p>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AtlasSigil({ mode }: { mode: DiagramMode }) {
  return (
    <div className="relative mx-auto grid aspect-square w-full max-w-[24rem] place-items-center rounded-full border border-gold/25 bg-black/50 shadow-[0_0_80px_rgba(181,146,85,.15)]">
      <div className="absolute inset-8 rounded-full border border-gold/15" />
      <div className="absolute inset-16 rounded-full border border-gold/20" />
      <div className="absolute h-[78%] w-px bg-gold/25" />
      <div className="absolute h-px w-[78%] bg-gold/25" />
      {universalLayers.slice(0, 12).map((layer, index) => {
        const angle = (index / 12) * Math.PI * 2 - Math.PI / 2;
        const radius = 42;
        return (
          <div
            key={layer.id}
            className="absolute grid size-10 place-items-center rounded-full border border-gold/30 bg-black/80 text-xs text-gold"
            style={{
              left: `${50 + Math.cos(angle) * radius}%`,
              top: `${50 + Math.sin(angle) * radius}%`,
              transform: "translate(-50%, -50%)"
            }}
          >
            {index + 1}
          </div>
        );
      })}
      <div className="relative grid size-28 place-items-center rounded-full border border-gold/40 bg-[radial-gradient(circle,rgba(181,146,85,.3),rgba(0,0,0,.9))] text-center">
        <Sparkles className="text-gold" size={30} strokeWidth={1.1} />
        <span className="mt-1 text-[10px] uppercase tracking-[.18em] text-parchment">{mode}</span>
      </div>
    </div>
  );
}

function DiagramModeView({
  mode,
  selectedLayerId,
  onSelect,
  comparisonModels
}: {
  mode: DiagramMode;
  selectedLayerId: UniversalLayerCategory;
  onSelect: (id: UniversalLayerCategory) => void;
  comparisonModels: StratifiedModel[];
}) {
  if (mode === "matrix") {
    return <ComparisonTable models={comparisonModels} compact />;
  }
  if (mode === "concentric") {
    return (
      <div className="relative mx-auto grid min-h-[30rem] max-w-4xl place-items-center overflow-hidden rounded border border-gold/15 bg-black/40 p-5">
        {universalLayers.slice().reverse().map((layer, index) => (
          <button
            key={layer.id}
            type="button"
            onClick={() => onSelect(layer.id)}
            className={`absolute rounded-full border transition ${selectedLayerId === layer.id ? "border-gold" : "border-gold/18"}`}
            style={{ width: `${92 - index * 6}%`, height: `${92 - index * 6}%` }}
            aria-label={layer.title}
          />
        ))}
        <div className="z-10 max-w-xs rounded-full border border-gold/30 bg-black/75 p-8 text-center">
          <p className="text-xs uppercase tracking-[.24em] text-gold">Concentric bodies</p>
          <p className="mt-2 font-display text-3xl text-ivory">Human as layered field</p>
        </div>
      </div>
    );
  }
  if (mode === "axis") {
    return (
      <div className="relative overflow-hidden rounded border border-gold/15 bg-black/40 p-5">
        <div className="absolute left-1/2 top-8 bottom-8 w-px bg-gold/25" />
        <div className="grid gap-2">
          {universalLayers.map((layer, index) => (
            <button
              key={layer.id}
              type="button"
              onClick={() => onSelect(layer.id)}
              className={`relative z-10 mx-auto w-full max-w-3xl rounded border p-3 text-left ${
                selectedLayerId === layer.id ? "border-gold bg-gold/15" : "border-gold/15 bg-black/65"
              }`}
            >
              <span className="text-xs uppercase tracking-[.2em] text-gold">{index + 1}</span>
              <span className="ml-4 font-display text-xl text-ivory">{layer.title}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }
  if (mode === "wheel") {
    return (
      <WheelAtlasView selectedLayerId={selectedLayerId} onSelect={onSelect} comparisonModels={comparisonModels} />
    );
  }
  return (
    <div className="grid gap-2 md:grid-cols-3 xl:grid-cols-4">
      {universalLayers.map((layer, index) => (
        <button
          key={layer.id}
          type="button"
          onClick={() => onSelect(layer.id)}
          className={`rounded border bg-gradient-to-br p-4 text-left ${layerTone(index)} ${
            selectedLayerId === layer.id ? "border-gold" : "border-gold/15"
          }`}
        >
          <span className="text-xs uppercase tracking-[.2em] text-gold">{String(index + 1).padStart(2, "0")}</span>
          <span className="mt-2 block font-display text-2xl text-ivory">{layer.title}</span>
        </button>
      ))}
    </div>
  );
}

function WheelAtlasView({
  selectedLayerId,
  onSelect,
  comparisonModels
}: {
  selectedLayerId: UniversalLayerCategory;
  onSelect: (id: UniversalLayerCategory) => void;
  comparisonModels: StratifiedModel[];
}) {
  const selectedLayer = universalLayers.find((layer) => layer.id === selectedLayerId) ?? universalLayers[0];
  const orbitModels = stratifiedModels.slice(0, 20);

  return (
    <div className="relative isolate overflow-hidden rounded border border-gold/20 bg-[radial-gradient(circle_at_50%_46%,rgba(181,146,85,.15),transparent_22rem),linear-gradient(135deg,rgba(0,0,0,.78),rgba(37,14,16,.62),rgba(0,0,0,.86))] p-4 md:p-6">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="absolute left-1/2 top-1/2 size-[42rem] max-h-[92vw] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/12" />
        <div className="absolute left-1/2 top-1/2 size-[34rem] max-h-[78vw] max-w-[78vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/15" />
        <div className="absolute left-1/2 top-1/2 size-[25rem] max-h-[62vw] max-w-[62vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/18" />
        <div className="absolute left-1/2 top-8 bottom-8 w-px -translate-x-1/2 bg-gold/10" />
        <div className="absolute left-8 right-8 top-1/2 h-px -translate-y-1/2 bg-gold/10" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="relative mx-auto aspect-square w-full max-w-[43rem]">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 640 640" aria-hidden="true">
            <defs>
              <radialGradient id="stratifiedWheelGold" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(231,221,204,.34)" />
                <stop offset="42%" stopColor="rgba(181,146,85,.16)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
            </defs>
            <circle cx="320" cy="320" r="298" fill="url(#stratifiedWheelGold)" opacity=".55" />
            {Array.from({ length: 24 }).map((_, index) => {
              const angle = (index / 24) * Math.PI * 2 - Math.PI / 2;
              const x1 = 320 + Math.cos(angle) * 210;
              const y1 = 320 + Math.sin(angle) * 210;
              const x2 = 320 + Math.cos(angle) * 302;
              const y2 = 320 + Math.sin(angle) * 302;
              return <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(181,146,85,.18)" strokeWidth="1" />;
            })}
            {universalLayers.map((layer, index) => {
              const radius = 64 + index * 13.5;
              const active = selectedLayerId === layer.id;
              return (
                <circle
                  key={layer.id}
                  cx="320"
                  cy="320"
                  r={radius}
                  fill="none"
                  stroke={active ? "rgba(231,221,204,.9)" : "rgba(181,146,85,.18)"}
                  strokeWidth={active ? 3 : 1}
                  strokeDasharray={active ? "1 0" : `${2 + index} ${10 - Math.min(index, 7)}`}
                />
              );
            })}
          </svg>

          {universalLayers.map((layer, index) => {
            const angle = (index / universalLayers.length) * Math.PI * 2 - Math.PI / 2;
            const active = selectedLayerId === layer.id;
            const radius = 31;
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => onSelect(layer.id)}
                className={`focus-ring absolute grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-sm font-semibold transition hover:scale-105 ${
                  active
                    ? "border-ivory bg-gold text-black shadow-[0_0_28px_rgba(181,146,85,.65)]"
                    : "border-gold/30 bg-black/75 text-gold hover:border-gold/70"
                }`}
                style={{
                  left: `${50 + Math.cos(angle) * radius}%`,
                  top: `${50 + Math.sin(angle) * radius}%`
                }}
                aria-label={layer.title}
                title={layer.title}
              >
                {index + 1}
              </button>
            );
          })}

          {orbitModels.map((model, index) => {
            const angle = (index / orbitModels.length) * Math.PI * 2 - Math.PI / 2;
            const selectedForComparison = comparisonModels.some((comparison) => comparison.id === model.id);
            const radius = 44;
            return (
              <div
                key={model.id}
                className={`absolute max-w-[7.8rem] -translate-x-1/2 -translate-y-1/2 rounded border px-2 py-1 text-center text-[10px] uppercase leading-4 tracking-[.12em] shadow-[0_8px_30px_rgba(0,0,0,.35)] ${
                  selectedForComparison
                    ? "border-emerald-300/60 bg-emerald-950/75 text-emerald-50"
                    : "border-gold/18 bg-black/72 text-gold/85"
                }`}
                style={{
                  left: `${50 + Math.cos(angle) * radius}%`,
                  top: `${50 + Math.sin(angle) * radius}%`
                }}
                title={model.name}
              >
                {model.tradition}
              </div>
            );
          })}

          <div className="absolute left-1/2 top-1/2 grid size-44 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold/35 bg-black/88 p-5 text-center shadow-[0_0_70px_rgba(181,146,85,.18)]">
            <p className="text-[10px] uppercase tracking-[.22em] text-gold">Atlas wheel</p>
            <p className="mt-2 font-display text-3xl leading-none text-ivory">Layer {universalLayers.findIndex((layer) => layer.id === selectedLayer.id) + 1}</p>
            <p className="mt-2 text-xs leading-5 text-parchment/80">{selectedLayer.title}</p>
          </div>
        </div>

        <aside className="rounded border border-gold/20 bg-black/55 p-4">
          <p className="text-xs uppercase tracking-[.24em] text-gold">Wheel reading</p>
          <h4 className="mt-3 font-display text-3xl text-ivory">{selectedLayer.title}</h4>
          <p className="mt-3 text-sm leading-6 text-parchment/80">{selectedLayer.definition}</p>
          <div className="mt-5 border-t border-gold/15 pt-4">
            <p className="text-xs uppercase tracking-[.2em] text-gold">Compared models</p>
            <div className="mt-3 space-y-2">
              {comparisonModels.map((model) => {
                const terms = model.layers.filter((layer) => layer.universalLayer === selectedLayer.id);
                return (
                  <div key={model.id} className="rounded border border-gold/12 bg-black/45 p-3">
                    <p className="text-xs uppercase tracking-[.16em] text-gold/80">{model.tradition}</p>
                    <p className="mt-1 text-sm leading-6 text-parchment">
                      {terms.length > 0 ? terms.map((layer) => layer.name).join(", ") : "No direct term in this atlas map"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function LayerDetail({ layer }: { layer: (typeof universalLayers)[number] }) {
  return (
    <aside className="sticky top-24 h-fit rounded border border-gold/25 bg-black/65 p-5">
      <p className="text-xs uppercase tracking-[.26em] text-gold">Selected stratum</p>
      <h3 className="mt-3 font-display text-4xl text-ivory">{layer.title}</h3>
      <div className="mt-5 space-y-5 text-sm leading-7 text-parchment">
        <DetailBlock label="Definition" value={layer.definition} />
        <DetailBlock label="Function" value={layer.function} />
        <DetailBlock label="Ritual or mystical significance" value={layer.significance} />
        <DetailBlock label="Postmortem significance" value={layer.postmortem} />
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {layer.examples.map((term) => (
          <span key={term} className="rounded border border-gold/20 bg-gold/10 px-3 py-1 text-xs text-gold">
            {term}
          </span>
        ))}
      </div>
    </aside>
  );
}

function DetailBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[.2em] text-gold">{label}</p>
      <p className="mt-1">{value}</p>
    </div>
  );
}

function ModelCard({
  model,
  active,
  selectedForCompare,
  onOpen,
  onCompare
}: {
  model: StratifiedModel;
  active: boolean;
  selectedForCompare: boolean;
  onOpen: () => void;
  onCompare: () => void;
}) {
  return (
    <article className={`relative overflow-hidden rounded border bg-black/55 transition ${active ? "border-gold" : "border-gold/18 hover:border-gold/45"}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_12%,rgba(181,146,85,.13),transparent_8rem)]" />
      <button type="button" onClick={onOpen} className="relative block w-full p-4 text-left">
        <p className="text-xs uppercase tracking-[.22em] text-gold">{model.tradition}</p>
        <h4 className="mt-3 font-display text-2xl leading-7 text-ivory">{model.name}</h4>
        <p className="mt-3 line-clamp-4 text-sm leading-6 text-parchment/82">{model.summary}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {model.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="rounded border border-gold/15 px-2 py-1 text-[11px] text-gold/85">
              {universalLayerLabels[tag]}
            </span>
          ))}
        </div>
      </button>
      <div className="relative flex flex-wrap gap-2 px-4 pb-4">
        <button type="button" onClick={onOpen} className="rounded border border-gold/35 bg-gold/10 px-3 py-2 text-xs uppercase tracking-[.15em] text-ivory">
          Open model
        </button>
        <button
          type="button"
          onClick={onCompare}
          className={`rounded border px-3 py-2 text-xs uppercase tracking-[.15em] ${
            selectedForCompare ? "border-emerald-300/60 text-emerald-100" : "border-gold/20 text-gold"
          }`}
        >
          {selectedForCompare ? "In compare" : "Compare"}
        </button>
      </div>
    </article>
  );
}

function ModelDetailPanel({ model, scholarMode }: { model: StratifiedModel; scholarMode: boolean }) {
  const [openLayer, setOpenLayer] = useState(model.layers[0]?.id ?? "");
  const visual = modelVisual(model);

  return (
    <section className="temple-border rounded p-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={model.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22 }}
        >
          <p className="text-xs uppercase tracking-[.26em] text-gold">{model.tradition}</p>
          <h3 className="mt-3 font-display text-4xl text-ivory">{model.name}</h3>
          <p className="mt-4 leading-8 text-parchment">{model.summary}</p>
          <p className="mt-3 text-sm leading-7 text-parchment/75">{model.historicalContext}</p>
          <div className="mt-5 grid gap-3 rounded border border-gold/15 bg-black/35 p-4 md:grid-cols-[minmax(0,1fr)_15rem]">
            <div>
              <p className="text-xs uppercase tracking-[.22em]" style={{ color: visual.accent }}>Source / reference field</p>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-parchment/78">
                {visual.references.map((reference) => (
                  <li key={reference} className="rounded border border-gold/10 bg-black/35 p-2">{reference}</li>
                ))}
              </ul>
            </div>
            <div className="rounded border border-gold/10 bg-black/35 p-3">
              <p className="text-xs uppercase tracking-[.18em] text-gold">Historical field</p>
              <p className="mt-2 font-display text-2xl text-ivory">{visual.era}</p>
              <p className="mt-1 text-sm leading-6 text-parchment/70">{visual.period}</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3">
            {model.layers.map((layer) => {
              const open = openLayer === layer.id;
              return (
                <div key={layer.id} className="rounded border border-gold/15 bg-black/35">
                  <button
                    type="button"
                    onClick={() => setOpenLayer(open ? "" : layer.id)}
                    className="flex w-full items-center justify-between gap-4 p-4 text-left"
                  >
                    <span>
                      <span className="flex flex-wrap items-center gap-3">
                        <span className="block font-display text-2xl text-ivory">{layer.name}</span>
                        <ConfidenceBadge level={confidenceForLayer(layer, model)} />
                      </span>
                      <span className="mt-1 block text-xs uppercase tracking-[.18em] text-gold">{universalLayerLabels[layer.universalLayer]}</span>
                    </span>
                    <BookOpenText className="shrink-0 text-gold" size={18} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-3 border-t border-gold/10 p-4 text-sm leading-7 text-parchment">
                          <p>{layer.definition}</p>
                          <p><span className="text-gold">Function:</span> {layer.function}</p>
                          <p><span className="text-gold">Ritual significance:</span> {layer.ritualSignificance}</p>
                          {scholarMode && <p><span className="text-gold">Postmortem:</span> {layer.postmortemSignificance}</p>}
                          <div className="flex flex-wrap gap-2">
                            {layer.relatedTerms.map((term) => (
                              <span key={term} className="rounded border border-gold/15 px-2 py-1 text-[11px] text-gold/85">
                                {term}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function SearchResults({
  results,
  onOpenModel,
  onOpenLayer
}: {
  results: Array<{ model: StratifiedModel; layer: StratifiedLayer }>;
  onOpenModel: (id: string) => void;
  onOpenLayer: (id: UniversalLayerCategory) => void;
}) {
  return (
    <aside className="rounded border border-gold/20 bg-black/55 p-5">
      <div className="flex items-center justify-between gap-3 border-b border-gold/15 pb-4">
        <div>
          <p className="text-xs uppercase tracking-[.24em] text-gold">Glossary search</p>
          <h3 className="font-display text-3xl text-ivory">Term index</h3>
        </div>
        <Search className="text-gold" />
      </div>
      <div className="mt-4 max-h-[48rem] space-y-3 overflow-auto pr-2">
        {results.map(({ model, layer }) => (
          <button
            key={`${model.id}-${layer.id}`}
            type="button"
            onClick={() => {
              onOpenModel(model.id);
              onOpenLayer(layer.universalLayer);
            }}
            className="w-full rounded border border-gold/15 bg-black/45 p-3 text-left hover:border-gold/45"
          >
            <span className="block font-display text-2xl text-ivory">{layer.name}</span>
            <span className="mt-1 block text-xs uppercase tracking-[.18em] text-gold">{model.tradition} / {universalLayerLabels[layer.universalLayer]}</span>
            <span className="mt-2 line-clamp-2 text-sm leading-6 text-parchment/75">{layer.definition}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}

function ComparisonTable({ models, compact = false }: { models: StratifiedModel[]; compact?: boolean }) {
  return (
    <div className="mt-5 overflow-auto rounded border border-gold/15">
      <table className="min-w-[58rem] w-full border-collapse bg-black/45 text-left">
        <thead>
          <tr className="border-b border-gold/15">
            <th className="p-3 text-xs uppercase tracking-[.18em] text-gold">Universal layer</th>
            {models.map((model) => (
              <th key={model.id} className="p-3 text-xs uppercase tracking-[.18em] text-gold">{model.tradition}</th>
            ))}
            {!compact && <th className="p-3 text-xs uppercase tracking-[.18em] text-gold">Notes</th>}
          </tr>
        </thead>
        <tbody>
          {universalLayers.map((universalLayer) => (
            <tr key={universalLayer.id} className="border-b border-gold/10 align-top">
              <td className="w-56 p-3 font-display text-xl text-ivory">{universalLayer.title}</td>
              {models.map((model) => {
                const layers = model.layers.filter((layer) => layer.universalLayer === universalLayer.id);
                return (
                  <td key={model.id} className="p-3 text-sm leading-6 text-parchment">
                    {layers.length > 0 ? (
                      <div className="grid gap-2">
                        {layers.map((layer) => (
                          <div key={layer.id} className="rounded border border-gold/10 bg-black/35 p-2">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span>{layer.name}</span>
                              {!compact && <ConfidenceBadge level={confidenceForLayer(layer, model)} />}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : <span className="text-parchment/35">No direct term</span>}
                  </td>
                );
              })}
              {!compact && (
                <td className="max-w-sm p-3 text-sm leading-6 text-parchment/70">
                  Functionally comparable, not a direct equivalence. Interpret within each model&apos;s own vocabulary.
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
