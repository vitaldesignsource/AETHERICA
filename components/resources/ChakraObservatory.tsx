"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BookOpenText,
  Bookmark,
  CircleDot,
  Eye,
  Layers3,
  Library,
  Search,
  Settings,
  Sparkles,
  Volume2,
} from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";

type Chakra = {
  id: string;
  sanskrit: string;
  englishName: string;
  meaning: string;
  location: string;
  element: string;
  bija: string;
  petals: number | string;
  symbol: string;
  themes: string[];
  shadowPattern: string;
  virtue: string;
  bodyRegion: string;
  description: string;
  comparativeNotes: string;
  color: string;
  mantraDescription: string;
  y: number;
};

type LayerState = {
  centralChannel: boolean;
  serpents: boolean;
  petals: boolean;
  mantras: boolean;
  elements: boolean;
  themes: boolean;
  nervePlexus: boolean;
  soundMode: boolean;
  comparative: boolean;
};

type FlowMode = "Still" | "Ascending" | "Descending" | "Breath Pulse" | "Mantra Pulse" | "Serpent Spiral" | "Lotus Expansion";
type SpeedMode = "Slow" | "Medium" | "Contemplative";
type ViewMode = "Body" | "Mandala" | "Inner Temple" | "Comparative";
type SystemView = "Modern Seven-Chakra View" | "Classical / Textual View" | "Psychological View" | "Elemental View" | "Mantric / Sound View" | "Comparative View";

const chakras: Chakra[] = [
  {
    id: "sahasrara",
    sanskrit: "Sahasrara",
    englishName: "Crown Chakra",
    meaning: "Thousand-petaled",
    location: "Crown of head",
    element: "Beyond the elements",
    bija: "Silence / Om",
    petals: 1000,
    symbol: "Thousand-petaled lotus, crown aperture",
    themes: ["transcendence", "liberation", "pure awareness", "divine union"],
    shadowPattern: "dissociation, spiritual bypassing, disembodiment",
    virtue: "integration, illumination, liberated awareness",
    bodyRegion: "crown, upper head, field above body",
    description: "Sahasrara represents the crown, transcendence, liberation, integration, pure awareness, and the opening beyond ordinary identity.",
    comparativeNotes: "Often compared with the thousand-petaled lotus, supernal consciousness, divine union, silence, and the field beyond the elemental order.",
    color: "#c8a6ff",
    mantraDescription: "Silence or Om may be used depending on the interpretive model.",
    y: 88
  },
  {
    id: "ajna",
    sanskrit: "Ajna",
    englishName: "Brow Chakra",
    meaning: "Command",
    location: "Between eyebrows / inner command center",
    element: "Mind / subtle light",
    bija: "Om",
    petals: 2,
    symbol: "Two-petaled lotus, luminous command seal",
    themes: ["perception", "imagination", "discernment", "inner vision", "symbolic sight"],
    shadowPattern: "illusion, fantasy, rigid perception",
    virtue: "insight, discrimination, clear seeing",
    bodyRegion: "brow, eyes, head, nervous system",
    description: "Ajna represents command, perception, symbolic sight, imagination, discrimination, and the organizing faculty of inner vision.",
    comparativeNotes: "Often compared with inner sight, command, spiritual perception, imagination, symbolic reading, and the faculty that orders subtle experience.",
    color: "#4b4fd8",
    mantraDescription: "Om is presented as the seed sound commonly associated with the brow center in many modern chakra systems.",
    y: 142
  },
  {
    id: "vishuddha",
    sanskrit: "Vishuddha",
    englishName: "Throat Chakra",
    meaning: "Purification",
    location: "Throat",
    element: "Ether / Akasha",
    bija: "Ham",
    petals: 16,
    symbol: "Circle, ether field, sound chamber",
    themes: ["voice", "vibration", "truth", "purification", "resonance", "expression"],
    shadowPattern: "silence through fear, distortion, false speech",
    virtue: "truthful expression, resonance, purified speech",
    bodyRegion: "throat, neck, vocal tract",
    description: "Vishuddha represents sound, speech, vibration, purification, resonance, and the ability to give form to truth through voice.",
    comparativeNotes: "Often compared with ether, vibration, logos, sacred speech, mantra, resonance, and the purification of expression.",
    color: "#3f8fd8",
    mantraDescription: "Ham is presented as the seed sound traditionally associated with the throat center in many modern chakra systems.",
    y: 214
  },
  {
    id: "anahata",
    sanskrit: "Anahata",
    englishName: "Heart Chakra",
    meaning: "Unstruck sound",
    location: "Heart center / chest",
    element: "Air",
    bija: "Yam",
    petals: 12,
    symbol: "Hexagram, interlaced triangles, air field",
    themes: ["love", "breath", "grief", "compassion", "beauty", "devotion"],
    shadowPattern: "emotional closure, grief fixation, relational collapse",
    virtue: "compassion, devotion, courageous openness",
    bodyRegion: "heart, lungs, chest, arms",
    description: "Anahata represents the heart field, breath, love, grief, compassion, beauty, devotion, and the subtle equilibrium between lower and higher centers.",
    comparativeNotes: "Often compared with air, breath, central balance, devotion, beauty, relational intelligence, and the meeting of ascending and descending forces.",
    color: "#3fa66b",
    mantraDescription: "Yam is presented as the seed sound traditionally associated with the heart center in many modern chakra systems.",
    y: 296
  },
  {
    id: "manipura",
    sanskrit: "Manipura",
    englishName: "Solar Plexus Chakra",
    meaning: "City of jewels",
    location: "Navel / solar plexus",
    element: "Fire",
    bija: "Ram",
    petals: 10,
    symbol: "Fiery triangle, solar disk",
    themes: ["will", "digestion", "discipline", "power", "transformation"],
    shadowPattern: "domination, weakness, anger, scattered will",
    virtue: "courage, clarity, disciplined action",
    bodyRegion: "stomach, liver, digestive fire, diaphragm",
    description: "Manipura represents inner fire, digestion, will, action, radiance, transformation, and disciplined personal power.",
    comparativeNotes: "Often compared with solar force, alchemical fire, digestion, courage, and the furnace of transformation.",
    color: "#e0aa2f",
    mantraDescription: "Ram is presented as the seed sound traditionally associated with the solar plexus center in many modern chakra systems.",
    y: 374
  },
  {
    id: "svadhisthana",
    sanskrit: "Svadhisthana",
    englishName: "Sacral Chakra",
    meaning: "One's own dwelling",
    location: "Lower abdomen / pelvic bowl",
    element: "Water",
    bija: "Vam",
    petals: 6,
    symbol: "Crescent moon, water field",
    themes: ["flow", "desire", "creativity", "sexuality", "emotion", "memory"],
    shadowPattern: "compulsion, shame, emotional flooding",
    virtue: "fluidity, creative openness, healthy desire",
    bodyRegion: "pelvis, reproductive region, lower abdomen",
    description: "Svadhisthana represents flow, generative power, emotional movement, desire, and the watery field of creativity.",
    comparativeNotes: "Often compared with lunar waters, the generative matrix, emotional tides, and the creative imagination.",
    color: "#d86a22",
    mantraDescription: "Vam is presented as the seed sound traditionally associated with the sacral center in many modern chakra systems.",
    y: 450
  },
  {
    id: "muladhara",
    sanskrit: "Muladhara",
    englishName: "Root Chakra",
    meaning: "Root support",
    location: "Base of spine / pelvic floor",
    element: "Earth",
    bija: "Lam",
    petals: 4,
    symbol: "Square, downward triangle, root field",
    themes: ["foundation", "survival", "embodiment", "gravity", "stability"],
    shadowPattern: "fear, collapse, disconnection from body",
    virtue: "groundedness, steadiness, incarnation",
    bodyRegion: "pelvic floor, legs, bones, lower spine",
    description: "Muladhara represents the base of embodiment, stability, survival, gravity, and the feeling of being rooted in life.",
    comparativeNotes: "Often compared with earth, foundation, incarnation, the body's base, and the threshold of embodied consciousness.",
    color: "#8f1d1d",
    mantraDescription: "Lam is presented as the seed sound traditionally associated with the root center in many modern chakra systems.",
    y: 528
  }
];

const studyOrder = [...chakras].reverse();
const flowModes: FlowMode[] = ["Still", "Ascending", "Descending", "Breath Pulse", "Mantra Pulse", "Serpent Spiral", "Lotus Expansion"];
const speedDurations: Record<SpeedMode, number> = { Slow: 7, Medium: 4.8, Contemplative: 10 };
const systemViews: SystemView[] = [
  "Modern Seven-Chakra View",
  "Classical / Textual View",
  "Psychological View",
  "Elemental View",
  "Mantric / Sound View",
  "Comparative View"
];
const viewModes: ViewMode[] = ["Body", "Mandala", "Inner Temple", "Comparative"];

const layerLabels: Array<[keyof LayerState, string]> = [
  ["centralChannel", "Central Channel"],
  ["serpents", "Ida & Pingala"],
  ["petals", "Lotus Petals"],
  ["mantras", "Bija Mantras"],
  ["elements", "Elements"],
  ["themes", "Psychological Themes"],
  ["nervePlexus", "Nerve Plexus Overlay"],
  ["soundMode", "Sound / Mantra Mode"],
  ["comparative", "Comparative Esoteric Mode"]
];

const comparisonNotes: Record<string, Array<{ title: string; tag: string; note: string }>> = {
  anahata: [
    { title: "Daoist Three Dantian", tag: "Analogy", note: "Middle Dantian as heart-breath field and affective center." },
    { title: "Kabbalistic Middle Pillar", tag: "Modern comparison", note: "Tiferet is often compared as a solar-heart mediating center." },
    { title: "Alchemy", tag: "Symbolic analogy", note: "Air, circulation, balance, and the harmonizing point between fires and waters." }
  ],
  manipura: [
    { title: "Alchemy", tag: "Analogy", note: "Furnace, digestion, solar fire, and directed transformative heat." },
    { title: "Hermetic planetary centers", tag: "Speculative mapping", note: "Sometimes read through solar force, will, and radiance." }
  ],
  muladhara: [
    { title: "Alchemy", tag: "Symbolic analogy", note: "Salt, body, foundation, weight, and embodied fixity." },
    { title: "Kabbalah", tag: "Modern comparison", note: "Sometimes compared with Malkuth as embodied ground, with care." }
  ]
};

function selectedComparisons(chakra: Chakra) {
  return comparisonNotes[chakra.id] ?? [
    { title: "Comparative anthropology", tag: "Modern comparison", note: chakra.comparativeNotes },
    { title: "Subtle-body atlas", tag: "Speculative mapping", note: "Use as an interpretive bridge, not a claim of historical identity." }
  ];
}

function shortBija(chakra: Chakra) {
  return chakra.bija.includes("Silence") ? "Om" : chakra.bija.split(" ")[0];
}

function shortElement(chakra: Chakra) {
  if (chakra.id === "sahasrara") return "Beyond";
  if (chakra.id === "ajna") return "Light";
  if (chakra.id === "vishuddha") return "Ether";
  return chakra.element;
}

export function ChakraObservatory() {
  const [activeChakraId, setActiveChakraId] = useState("anahata");
  const [systemView, setSystemView] = useState<SystemView>("Modern Seven-Chakra View");
  const [flowMode, setFlowMode] = useState<FlowMode>("Breath Pulse");
  const [speed, setSpeed] = useState<SpeedMode>("Slow");
  const [viewMode, setViewMode] = useState<ViewMode>("Body");
  const [layers, setLayers] = useState<LayerState>({
    centralChannel: true,
    serpents: true,
    petals: true,
    mantras: true,
    elements: true,
    themes: false,
    nervePlexus: false,
    soundMode: true,
    comparative: false
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeNote, setActiveNote] = useState("Select a chakra to study its symbolism, sound, themes, and comparative notes.");
  const [studyPathActive, setStudyPathActive] = useState(false);
  const [query, setQuery] = useState("");

  const activeChakra = chakras.find((chakra) => chakra.id === activeChakraId) ?? chakras[3];
  const activeIndex = studyOrder.findIndex((chakra) => chakra.id === activeChakra.id);
  const reducedMotion = useReducedMotion();

  const filteredChakras = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return chakras;
    return chakras.filter((chakra) =>
      `${chakra.sanskrit} ${chakra.englishName} ${chakra.element} ${chakra.bija} ${chakra.themes.join(" ")}`.toLowerCase().includes(normalized)
    );
  }, [query]);

  function toggleLayer(key: keyof LayerState) {
    setLayers((current) => {
      const next = { ...current, [key]: !current[key] };
      if (key === "comparative") setDrawerOpen(!current[key]);
      return next;
    });
  }

  function beginStudyPath() {
    setStudyPathActive(true);
    setActiveChakraId("muladhara");
    setFlowMode("Ascending");
    setActiveNote("Study path opened at Muladhara. Move upward through the centers at your own pace.");
  }

  function setAction(label: string) {
    setActiveNote(`${label}: ${activeChakra.sanskrit} is being viewed through the ${systemView.toLowerCase()}.`);
    if (label.includes("Compare")) {
      setDrawerOpen(true);
      setLayers((current) => ({ ...current, comparative: true }));
      setViewMode("Comparative");
    }
  }

  return (
    <div className="relative isolate overflow-hidden rounded-lg border border-gold/25 bg-[#050607] text-parchment shadow-[0_0_80px_rgba(0,0,0,.75)]">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_50%_22%,rgba(214,168,79,.16),transparent_24rem),radial-gradient(circle_at_18%_70%,rgba(143,29,29,.22),transparent_26rem),linear-gradient(135deg,#050607,#08090a_48%,#050607)]" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(214,168,79,.035)_1px,transparent_1px),linear-gradient(180deg,rgba(214,168,79,.026)_1px,transparent_1px)] bg-[size:88px_88px] opacity-55" />
      <TopNav query={query} onQueryChange={setQuery} onOpenDrawer={() => setDrawerOpen(true)} />

      <div className="grid gap-5 p-4 lg:grid-cols-[18rem_minmax(0,1fr)_22rem] lg:p-5">
        <LeftChakraIndex
          chakras={filteredChakras}
          activeChakraId={activeChakraId}
          systemView={systemView}
          studyPathActive={studyPathActive}
          activeIndex={activeIndex}
          onSelect={(id) => {
            setActiveChakraId(id);
            setActiveNote("Active chakra panel updated. The diagram, mantra card, and comparative drawer now follow this center.");
          }}
          onSystemViewChange={(view) => {
            setSystemView(view);
            if (view === "Comparative View") {
              setDrawerOpen(true);
              setViewMode("Comparative");
            }
          }}
          onBeginStudyPath={beginStudyPath}
        />

        <main className="min-w-0">
          <SubtleBodyDiagram
            chakras={chakras}
            activeChakra={activeChakra}
            layers={layers}
            flowMode={flowMode}
            viewMode={viewMode}
            speedDuration={speedDurations[speed]}
            reducedMotion={Boolean(reducedMotion)}
            onSelect={setActiveChakraId}
          />
        </main>

        <RightChakraPanel
          chakra={activeChakra}
          layers={layers}
          activeNote={activeNote}
          onToggleLayer={toggleLayer}
          onAction={setAction}
        />
      </div>

      <BottomInstrumentBar
        chakra={activeChakra}
        flowMode={flowMode}
        speed={speed}
        viewMode={viewMode}
        onFlowModeChange={setFlowMode}
        onSpeedChange={setSpeed}
        onViewModeChange={(mode) => {
          setViewMode(mode);
          if (mode === "Comparative") setDrawerOpen(true);
        }}
        onBeginStudyPath={beginStudyPath}
      />

      <ComparativeDrawer chakra={activeChakra} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <EpistemicFooter />
    </div>
  );
}

function TopNav({
  query,
  onQueryChange,
  onOpenDrawer
}: {
  query: string;
  onQueryChange: (query: string) => void;
  onOpenDrawer: () => void;
}) {
  return (
    <header className="border-b border-gold/18 bg-black/50 px-4 py-4 backdrop-blur lg:px-5">
      <div className="grid gap-4 lg:grid-cols-[18rem_minmax(0,1fr)_22rem] lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[.3em] text-gold">Aetherica</p>
          <p className="mt-1 text-[11px] uppercase tracking-[.24em] text-parchment/58">Subtle Body Library</p>
        </div>
        <div className="text-center">
          <h2 className="font-manuscript-title font-display text-3xl leading-none text-ivory md:text-5xl">The Chakra Observatory</h2>
          <p className="mt-2 text-xs uppercase tracking-[.24em] text-gold/80">An interactive map of the subtle body</p>
        </div>
        <div className="flex flex-wrap items-center justify-start gap-2 lg:justify-end">
          <label className="relative min-w-52 grow lg:grow-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/80" size={15} />
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search chakras..."
              className="focus-ring w-full rounded border border-gold/20 bg-black/70 py-2 pl-9 pr-3 text-sm text-ivory placeholder:text-parchment/38"
            />
          </label>
          <IconButton label="Glossary" icon={BookOpenText} onClick={onOpenDrawer} />
          <IconButton label="Reading List" icon={Library} onClick={onOpenDrawer} />
          <IconButton label="Save View" icon={Bookmark} onClick={onOpenDrawer} />
          <IconButton label="Settings" icon={Settings} onClick={onOpenDrawer} />
        </div>
      </div>
    </header>
  );
}

function IconButton({ label, icon: Icon, onClick }: { label: string; icon: typeof Search; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="focus-ring grid size-9 place-items-center rounded border border-gold/18 bg-black/48 text-gold transition hover:border-gold/45 hover:bg-gold/10 hover:text-ivory"
      title={label}
    >
      <Icon size={16} strokeWidth={1.5} />
    </button>
  );
}

function LeftChakraIndex({
  chakras,
  activeChakraId,
  systemView,
  studyPathActive,
  activeIndex,
  onSelect,
  onSystemViewChange,
  onBeginStudyPath
}: {
  chakras: Chakra[];
  activeChakraId: string;
  systemView: SystemView;
  studyPathActive: boolean;
  activeIndex: number;
  onSelect: (id: string) => void;
  onSystemViewChange: (view: SystemView) => void;
  onBeginStudyPath: () => void;
}) {
  return (
    <aside className="grid gap-4 lg:max-h-[calc(100vh-10rem)] lg:overflow-auto lg:pr-1">
      <Panel title="The Seven Chakras" icon={CircleDot}>
        <div className="space-y-2">
          {chakras.map((chakra) => {
            const active = activeChakraId === chakra.id;
            return (
              <button
                key={chakra.id}
                type="button"
                onClick={() => onSelect(chakra.id)}
                className={`focus-ring group w-full rounded border p-3 text-left transition hover:-translate-y-0.5 ${
                  active ? "border-gold bg-gold/10 shadow-[0_0_22px_rgba(214,168,79,.12)]" : "border-gold/12 bg-black/42 hover:border-gold/38"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full border bg-black/70" style={{ borderColor: chakra.color, color: chakra.color }}>
                    <Sparkles size={15} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-xl leading-none text-ivory">{chakra.sanskrit}</span>
                    <span className="mt-1 block text-xs uppercase tracking-[.16em] text-gold/75">{chakra.englishName.replace(" Chakra", "")}</span>
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] text-parchment/62">
                  <span>{chakra.element}</span>
                  <span>{chakra.bija}</span>
                  <span>{chakra.petals} petals</span>
                </div>
              </button>
            );
          })}
        </div>
      </Panel>

      <Panel title="System View" icon={Layers3}>
        <div className="grid gap-2">
          {systemViews.map((view) => (
            <button
              key={view}
              type="button"
              onClick={() => onSystemViewChange(view)}
              className={`focus-ring rounded border px-3 py-2 text-left text-xs uppercase tracking-[.14em] transition ${
                systemView === view ? "border-gold bg-gold/12 text-ivory" : "border-gold/12 bg-black/35 text-gold hover:border-gold/40"
              }`}
            >
              {view}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs leading-5 text-parchment/58">
          {systemView} changes the interpretive emphasis without claiming that all chakra systems are historically identical.
        </p>
      </Panel>

      <Panel title="Study Path" icon={BookOpenText}>
        <div className="grid gap-2">
          {studyOrder.map((chakra, index) => (
            <div key={chakra.id} className="flex items-center gap-3 text-sm">
              <span className={`grid size-6 place-items-center rounded-full border text-[10px] ${studyPathActive && index <= activeIndex ? "border-gold bg-gold/15 text-ivory" : "border-gold/15 text-gold/60"}`}>
                {index + 1}
              </span>
              <span className={chakra.id === activeChakraId ? "text-ivory" : "text-parchment/62"}>{chakra.englishName.replace(" Chakra", "")}</span>
            </div>
          ))}
        </div>
        <button type="button" onClick={onBeginStudyPath} className="focus-ring mt-4 w-full rounded border border-gold/35 bg-gold/12 px-4 py-3 text-xs uppercase tracking-[.16em] text-ivory hover:bg-gold/18">
          Begin Study Path
        </button>
      </Panel>
    </aside>
  );
}

function SubtleBodyDiagram({
  chakras,
  activeChakra,
  layers,
  flowMode,
  viewMode,
  speedDuration,
  reducedMotion,
  onSelect
}: {
  chakras: Chakra[];
  activeChakra: Chakra;
  layers: LayerState;
  flowMode: FlowMode;
  viewMode: ViewMode;
  speedDuration: number;
  reducedMotion: boolean;
  onSelect: (id: string) => void;
}) {
  const activeScale = viewMode === "Mandala" ? 1.05 : viewMode === "Inner Temple" ? 1.02 : 1;
  return (
    <section className="relative min-h-[44rem] overflow-hidden rounded border border-gold/18 bg-black/58 shadow-[inset_0_0_80px_rgba(0,0,0,.7)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(214,168,79,.13),transparent_19rem),radial-gradient(circle_at_50%_70%,rgba(63,166,107,.08),transparent_22rem)]" />
      {viewMode === "Inner Temple" ? <div className="absolute inset-x-12 top-12 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" /> : null}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 620 720" role="img" aria-label={`Interactive diagram for ${activeChakra.sanskrit}`}>
        <defs>
          <radialGradient id="chakraBodyGlow" cx="50%" cy="34%" r="62%">
            <stop offset="0%" stopColor={activeChakra.color} stopOpacity=".18" />
            <stop offset="70%" stopColor="#000" stopOpacity=".02" />
          </radialGradient>
        </defs>
        <rect width="620" height="720" fill="url(#chakraBodyGlow)" />
        <SacredField activeColor={activeChakra.color} mode={viewMode} />
        <g transform={`translate(0 ${viewMode === "Mandala" ? -4 : 0}) scale(${activeScale}) translate(${(1 - activeScale) * 310} ${(1 - activeScale) * 350})`}>
          <MeditativeBody activeColor={activeChakra.color} />
          {layers.nervePlexus && <NervePlexus />}
          {layers.centralChannel && <CentralChannel color={activeChakra.color} flowMode={flowMode} duration={speedDuration} reducedMotion={reducedMotion} />}
          {layers.serpents && <SerpentChannels duration={speedDuration + 1.5} reducedMotion={reducedMotion} />}
          {layers.soundMode && <Particles color={activeChakra.color} duration={speedDuration} reducedMotion={reducedMotion} />}
          {chakras.map((chakra) => (
            <ChakraNode
              key={chakra.id}
              chakra={chakra}
              active={chakra.id === activeChakra.id}
              showPetals={layers.petals}
              showMantra={layers.mantras}
              showElement={layers.elements}
              showThemes={layers.themes}
              duration={speedDuration}
              reducedMotion={reducedMotion}
              onSelect={onSelect}
            />
          ))}
        </g>
      </svg>
      <div className="absolute left-4 top-4 rounded border border-gold/16 bg-black/68 p-3 backdrop-blur">
        <p className="text-[10px] uppercase tracking-[.2em] text-gold">Active center</p>
        <p className="mt-1 font-display text-2xl text-ivory">{activeChakra.sanskrit}</p>
        <p className="mt-1 text-xs text-parchment/60">{flowMode} / {viewMode}</p>
      </div>
      <div className="absolute bottom-4 left-4 right-4 rounded border border-gold/12 bg-black/58 p-3 text-center text-xs uppercase tracking-[.18em] text-gold/78 backdrop-blur">
        This is an educational symbolic diagram, not medical instruction.
      </div>
    </section>
  );
}

function SacredField({ activeColor, mode }: { activeColor: string; mode: ViewMode }) {
  return (
    <g opacity={mode === "Body" ? 0.48 : 0.72}>
      {[96, 154, 216, 278].map((r) => (
        <circle key={r} cx="310" cy="360" r={r} fill="none" stroke={r === 216 ? activeColor : "rgba(214,168,79,.22)"} strokeWidth=".8" strokeDasharray={r % 2 === 0 ? "4 12" : undefined} opacity=".62" />
      ))}
      <path d="M310 72 V646M94 360 H526M162 132 L458 588M458 132 L162 588" stroke="rgba(214,168,79,.12)" strokeWidth=".8" />
      {mode === "Inner Temple" && (
        <g opacity=".42">
          <path d="M128 632 H492M164 632 V172M456 632 V172M164 172 C218 118 402 118 456 172" stroke="rgba(214,168,79,.32)" fill="none" />
          <path d="M204 632 V226M416 632 V226" stroke="rgba(214,168,79,.14)" />
        </g>
      )}
    </g>
  );
}

function MeditativeBody({ activeColor }: { activeColor: string }) {
  return (
    <g opacity=".9">
      <path
        d="M310 78c34 0 61 27 61 67 0 33-17 59-43 72 32 8 61 16 83 33 21 17 32 40 39 70l25 103c5 22-5 42-25 48-18 5-34-6-40-28l-24-86c-2 44-10 83-24 116 42 7 82 30 121 72 23 25 12 63-22 69-58 11-105-4-151-44-46 40-93 55-151 44-34-6-45-44-22-69 39-42 79-65 121-72-14-33-22-72-24-116l-24 86c-6 22-22 33-40 28-20-6-30-26-25-48l25-103c7-30 18-53 39-70 22-17 51-25 83-33-26-13-43-39-43-72 0-40 27-67 61-67Z"
        fill="rgba(243,231,196,.045)"
        stroke="rgba(243,231,196,.18)"
        strokeWidth="1"
      />

      <g fill="rgba(243,231,196,.115)" stroke="rgba(243,231,196,.68)" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M310 92c29 0 51 23 51 56 0 31-19 56-45 62h-12c-26-6-45-31-45-62 0-33 22-56 51-56Z"
          strokeWidth="1.7"
        />
        <path d="M260 143c-9 2-14 11-11 22 2 8 8 15 16 18M360 143c9 2 14 11 11 22-2 8-8 15-16 18" fill="none" strokeWidth="1.35" />
        <path d="M291 206v24c0 10 8 18 19 18s19-8 19-18v-24" fill="rgba(243,231,196,.065)" strokeWidth="1.45" />

        <path
          d="M274 231c-18 7-38 10-60 17-26 8-43 28-51 58l-35 128c-5 19 5 36 23 41 17 4 31-7 36-25l31-104c4-13 9-24 17-34"
          fill="none"
          strokeWidth="2"
        />
        <path
          d="M346 231c18 7 38 10 60 17 26 8 43 28 51 58l35 128c5 19-5 36-23 41-17 4-31-7-36-25l-31-104c-4-13-9-24-17-34"
          fill="none"
          strokeWidth="2"
        />
        <path
          d="M275 232c14 14 24 20 35 20s21-6 35-20c24 25 36 64 36 118 0 63-19 119-44 143-13 12-41 12-54 0-25-24-44-80-44-143 0-54 12-93 36-118Z"
          strokeWidth="1.8"
        />
        <path d="M244 291c26 16 47 22 66 22s40-6 66-22M250 363c18 10 38 15 60 15s42-5 60-15M266 445c12 8 27 12 44 12s32-4 44-12" fill="none" stroke="rgba(243,231,196,.42)" strokeWidth="1" />
        <path d="M282 263c17 12 39 12 56 0M284 305c14 9 24 12 26 12s12-3 26-12M292 392c12 6 24 6 36 0" fill="none" stroke="rgba(243,231,196,.28)" strokeWidth=".85" />

        <path
          d="M254 474c-46 2-88 25-127 70-20 23-8 55 24 59 55 8 106-11 159-57 53 46 104 65 159 57 32-4 44-36 24-59-39-45-81-68-127-70-17 24-36 39-56 47-20-8-39-23-56-47Z"
          fill="rgba(243,231,196,.07)"
          strokeWidth="1.9"
        />
        <path d="M134 557c53 3 103-5 151-25M486 557c-53 3-103-5-151-25M217 520c31 0 62 8 93 26M403 520c-31 0-62 8-93 26" fill="none" stroke="rgba(243,231,196,.38)" strokeWidth="1.25" />
        <path d="M154 475c-9 8-12 18-8 29 11 0 22-5 31-14M466 475c9 8 12 18 8 29-11 0-22-5-31-14" fill="none" strokeWidth="1.35" />
        <path d="M150 489c8 2 16 1 25-4M470 489c-8 2-16 1-25-4M151 497c7 1 14 0 22-4M469 497c-7 1-14 0-22-4" fill="none" stroke="rgba(243,231,196,.44)" strokeWidth=".8" />
      </g>

      <path d="M310 204 V590" stroke={activeColor} strokeWidth="1" strokeDasharray="6 10" opacity=".48" />
      <circle cx="310" cy="146" r="10" fill={activeColor} opacity=".16" />
      <path d="M275 134c8-7 16-10 35-10s27 3 35 10M286 150c6-3 12-3 18 0M316 150c6-3 12-3 18 0M310 151c-2 9-4 16-7 21M281 170c18 13 40 13 58 0" stroke="rgba(243,231,196,.32)" fill="none" strokeWidth="1" />
    </g>
  );
}

function CentralChannel({ color, flowMode, duration, reducedMotion }: { color: string; flowMode: FlowMode; duration: number; reducedMotion: boolean }) {
  const y1 = flowMode === "Descending" ? 86 : 588;
  const y2 = flowMode === "Descending" ? 588 : 86;
  return (
    <g>
      <path d="M310 84 V594" stroke={color} strokeWidth="5" opacity=".1" />
      <path d="M310 84 V594" stroke="#ffd77a" strokeWidth="1.4" opacity=".76" />
      {!reducedMotion && flowMode !== "Still" && (
        <motion.circle
          cx="310"
          r="4"
          fill="#ffd77a"
          animate={{ cy: [y1, y2], opacity: [0, 0.9, 0] }}
          transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <text x="326" y="196" fill="rgba(214,168,79,.72)" fontSize="10" letterSpacing="3">SUSHUMNA</text>
    </g>
  );
}

function SerpentChannels({ duration, reducedMotion }: { duration: number; reducedMotion: boolean }) {
  const animate = reducedMotion ? undefined : { pathLength: [0.82, 1, 0.82], opacity: [0.42, 0.72, 0.42] };
  return (
    <g fill="none">
      <motion.path
        d="M310 586 C230 510 392 452 310 374 C228 296 392 222 310 142"
        stroke="#8ecaff"
        strokeWidth="1.35"
        opacity=".55"
        animate={animate}
        transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M310 586 C390 510 228 452 310 374 C392 296 228 222 310 142"
        stroke="#f0a65c"
        strokeWidth="1.35"
        opacity=".55"
        animate={animate}
        transition={{ duration: duration + 0.9, repeat: Infinity, ease: "easeInOut" }}
      />
      <text x="214" y="222" fill="rgba(142,202,255,.72)" fontSize="10" letterSpacing="2.5">IDA</text>
      <text x="374" y="222" fill="rgba(240,166,92,.72)" fontSize="10" letterSpacing="2.5">PINGALA</text>
    </g>
  );
}

function ChakraNode({
  chakra,
  active,
  showPetals,
  showMantra,
  showElement,
  showThemes,
  duration,
  reducedMotion,
  onSelect
}: {
  chakra: Chakra;
  active: boolean;
  showPetals: boolean;
  showMantra: boolean;
  showElement: boolean;
  showThemes: boolean;
  duration: number;
  reducedMotion: boolean;
  onSelect: (id: string) => void;
}) {
  const r = active ? 26 : 19;
  return (
    <g>
      <motion.g
        role="button"
        tabIndex={0}
        aria-label={`Select ${chakra.sanskrit}, ${chakra.englishName}`}
        className="cursor-pointer outline-none"
        onClick={() => onSelect(chakra.id)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") onSelect(chakra.id);
        }}
        whileHover={{ scale: 1.08 }}
        animate={active && !reducedMotion ? { scale: [1, 1.06, 1] } : { scale: 1 }}
        transition={{ duration, repeat: active && !reducedMotion ? Infinity : 0, ease: "easeInOut" }}
        style={{ transformOrigin: `310px ${chakra.y}px` }}
      >
        {showPetals && (
          <g opacity={active ? ".82" : ".42"}>
            {Array.from({ length: Math.min(Number(chakra.petals) || 18, 18) }).map((_, index, petals) => {
              const angle = (index / petals.length) * Math.PI * 2;
              return (
                <ellipse
                  key={index}
                  cx={310 + Math.cos(angle) * (r + 10)}
                  cy={chakra.y + Math.sin(angle) * (r + 10)}
                  rx="3.5"
                  ry="9"
                  fill={chakra.color}
                  opacity=".35"
                  transform={`rotate(${(angle * 180) / Math.PI} ${310 + Math.cos(angle) * (r + 10)} ${chakra.y + Math.sin(angle) * (r + 10)})`}
                />
              );
            })}
          </g>
        )}
        <circle cx="310" cy={chakra.y} r={r + 14} fill={chakra.color} opacity={active ? ".13" : ".055"} />
        <circle cx="310" cy={chakra.y} r={r} fill="rgba(0,0,0,.72)" stroke={chakra.color} strokeWidth={active ? 2.2 : 1.2} />
        <circle cx="310" cy={chakra.y} r={r - 7} fill={chakra.color} opacity={active ? ".55" : ".28"} />
        {showMantra && (
          <text x="310" y={chakra.y + 4} textAnchor="middle" fill="#f3e7c4" fontSize={active ? 13 : 10} fontWeight="700">
            {shortBija(chakra)}
          </text>
        )}
        {showElement && active && (
          <text x="362" y={chakra.y + 4} fill={chakra.color} fontSize="9" letterSpacing="1.6">
            {shortElement(chakra).toUpperCase()}
          </text>
        )}
      </motion.g>
      {showThemes && active && (
        <text x="310" y={chakra.y + 52} textAnchor="middle" fill="rgba(243,231,196,.76)" fontSize="10">
          {chakra.themes.slice(0, 3).join(" / ")}
        </text>
      )}
    </g>
  );
}

function NervePlexus() {
  return (
    <g opacity=".26" stroke="rgba(243,231,196,.36)" fill="none">
      {[168, 230, 302, 378, 454].map((y) => (
        <path key={y} d={`M310 ${y} C270 ${y + 12} 250 ${y + 38} 222 ${y + 54}M310 ${y} C350 ${y + 12} 370 ${y + 38} 398 ${y + 54}`} strokeDasharray="3 8" />
      ))}
      <text x="118" y="654" fill="rgba(243,231,196,.55)" fontSize="10">Anatomical approximation layer</text>
    </g>
  );
}

function Particles({ color, duration, reducedMotion }: { color: string; duration: number; reducedMotion: boolean }) {
  if (reducedMotion) return null;
  return (
    <g>
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.circle
          key={index}
          cx={300 + index * 5}
          r="1.6"
          fill={index % 2 ? "#ffd77a" : color}
          animate={{ cy: [590, 92], opacity: [0, 0.78, 0] }}
          transition={{ duration: duration + index * 0.35, delay: index * 0.45, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </g>
  );
}

function RightChakraPanel({
  chakra,
  layers,
  activeNote,
  onToggleLayer,
  onAction
}: {
  chakra: Chakra;
  layers: LayerState;
  activeNote: string;
  onToggleLayer: (key: keyof LayerState) => void;
  onAction: (label: string) => void;
}) {
  return (
    <aside className="grid gap-4 lg:max-h-[calc(100vh-10rem)] lg:overflow-auto lg:pl-1">
      <Panel title="Active Chakra" icon={Eye}>
        <p className="text-xs uppercase tracking-[.2em]" style={{ color: chakra.color }}>{chakra.meaning}</p>
        <h3 className="mt-2 font-display text-4xl leading-none text-ivory">{chakra.sanskrit}</h3>
        <p className="mt-1 text-lg text-parchment">{chakra.englishName}</p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <Info label="Location" value={chakra.location} />
          <Info label="Element" value={chakra.element} />
          <Info label="Bija" value={chakra.bija} />
          <Info label="Petals" value={String(chakra.petals)} />
        </div>
        <p className="mt-4 text-sm leading-6 text-parchment/76">{chakra.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {chakra.themes.map((theme) => (
            <span key={theme} className="rounded border border-gold/12 bg-black/35 px-2 py-1 text-[11px] text-gold/85">{theme}</span>
          ))}
        </div>
        <div className="mt-4 grid gap-2 text-sm leading-6">
          <Info label="Shadow Pattern" value={chakra.shadowPattern} />
          <Info label="Virtue" value={chakra.virtue} />
          <Info label="Body Region" value={chakra.bodyRegion} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {["View Symbol", "Hear Mantra", "Show Petals", "Compare Traditions", "Open Reading List", "Podcast References"].map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => onAction(label)}
              className="focus-ring rounded border border-gold/16 bg-black/42 px-3 py-2 text-xs uppercase tracking-[.13em] text-gold transition hover:border-gold/42 hover:text-ivory"
            >
              {label}
            </button>
          ))}
        </div>
        <p className="mt-4 rounded border border-gold/10 bg-black/35 p-3 text-xs leading-5 text-parchment/62">{activeNote}</p>
      </Panel>

      <Panel title="Layer Controls" icon={Settings}>
        <div className="grid gap-2">
          {layerLabels.map(([key, label]) => (
            <button
              key={key}
              type="button"
              aria-pressed={layers[key]}
              onClick={() => onToggleLayer(key)}
              className={`focus-ring flex items-center justify-between gap-3 rounded border px-3 py-2 text-left text-sm transition ${
                layers[key] ? "border-gold/45 bg-gold/10 text-ivory" : "border-gold/12 bg-black/35 text-parchment/70 hover:border-gold/38"
              }`}
            >
              <span>{label}</span>
              <span className="text-xs uppercase tracking-[.14em] text-gold">{layers[key] ? "On" : "Off"}</span>
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs leading-5 text-parchment/55">
          Approximation layers are clearly marked. Unimplemented scholarly overlays are presented as study notes rather than hidden claims.
        </p>
      </Panel>
    </aside>
  );
}

function BottomInstrumentBar({
  chakra,
  flowMode,
  speed,
  viewMode,
  onFlowModeChange,
  onSpeedChange,
  onViewModeChange,
  onBeginStudyPath
}: {
  chakra: Chakra;
  flowMode: FlowMode;
  speed: SpeedMode;
  viewMode: ViewMode;
  onFlowModeChange: (mode: FlowMode) => void;
  onSpeedChange: (speed: SpeedMode) => void;
  onViewModeChange: (mode: ViewMode) => void;
  onBeginStudyPath: () => void;
}) {
  return (
    <footer className="border-t border-gold/18 bg-black/58 p-4">
      <div className="grid gap-4 xl:grid-cols-[1.4fr_.7fr_.8fr_1fr_auto]">
        <ControlGroup label="Energy Flow Mode" options={flowModes} active={flowMode} onSelect={onFlowModeChange} />
        <ControlGroup label="Speed" options={["Slow", "Medium", "Contemplative"]} active={speed} onSelect={(value) => onSpeedChange(value as SpeedMode)} />
        <ControlGroup label="View" options={viewModes} active={viewMode} onSelect={(value) => onViewModeChange(value as ViewMode)} />
        <MantraWaveform chakra={chakra} />
        <button type="button" onClick={onBeginStudyPath} className="focus-ring self-end rounded border border-gold/35 bg-gold/12 px-4 py-3 text-xs uppercase tracking-[.16em] text-ivory hover:bg-gold/18">
          Begin Chakra Study Path
        </button>
      </div>
    </footer>
  );
}

function ControlGroup<T extends string>({ label, options, active, onSelect }: { label: string; options: readonly T[]; active: T; onSelect: (value: T) => void }) {
  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-[.18em] text-gold">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={`focus-ring rounded border px-3 py-2 text-xs uppercase tracking-[.12em] transition ${
              active === option ? "border-gold bg-gold/12 text-ivory" : "border-gold/14 bg-black/35 text-gold hover:border-gold/40"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function MantraWaveform({ chakra }: { chakra: Chakra }) {
  return (
    <div className="rounded border border-gold/14 bg-black/35 p-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[.18em] text-gold">Mantra</p>
          <p className="font-display text-3xl text-ivory">{chakra.bija}</p>
          <p className="text-xs text-parchment/58">{chakra.englishName.replace(" Chakra", "")} resonance</p>
        </div>
        <Volume2 className="text-gold" size={22} />
      </div>
      <div className="mt-3 flex h-8 items-end gap-1">
        {Array.from({ length: 18 }).map((_, index) => (
          <motion.span
            key={index}
            className="w-1 rounded-t bg-gold/75"
            animate={{ height: [6, 10 + ((index * 7) % 20), 6] }}
            transition={{ duration: 1.6 + index * 0.03, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}

function ComparativeDrawer({ chakra, open, onClose }: { chakra: Chakra; open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.aside
            className="ml-auto h-full w-full max-w-xl overflow-auto border-l border-gold/20 bg-[#050607] p-5 shadow-[0_0_80px_rgba(0,0,0,.82)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 210 }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-gold/14 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[.24em] text-gold">Comparative esoteric mappings</p>
                <h3 className="mt-2 font-display text-4xl leading-none text-ivory">{chakra.sanskrit}</h3>
              </div>
              <button type="button" onClick={onClose} className="focus-ring rounded border border-gold/20 px-3 py-2 text-xs uppercase tracking-[.16em] text-gold hover:text-ivory">
                Close
              </button>
            </div>
            <p className="mt-4 text-sm leading-7 text-parchment/72">
              These are interpretive comparisons, analogies, and research prompts. They do not claim that separate systems
              are historically or doctrinally identical.
            </p>
            <div className="mt-5 grid gap-3">
              {selectedComparisons(chakra).map((item) => (
                <div key={item.title} className="rounded border border-gold/14 bg-black/42 p-4">
                  <p className="text-xs uppercase tracking-[.18em] text-gold">{item.tag}</p>
                  <h4 className="mt-2 font-display text-2xl text-ivory">{item.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-parchment/72">{item.note}</p>
                </div>
              ))}
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function EpistemicFooter() {
  const labels = [
    ["T", "Traditional Text"],
    ["M", "Modern Yoga"],
    ["S", "Tantric Symbolism"],
    ["P", "Psychological Interpretation"],
    ["C", "Comparative Esotericism"],
    ["A", "Anatomical Approximation"],
    ["H", "Historical Context"]
  ];
  return (
    <div className="border-t border-gold/14 bg-black/68 px-4 py-4">
      <div className="flex flex-wrap gap-3 text-xs text-parchment/62">
        {labels.map(([badge, label]) => (
          <span key={badge} className="inline-flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-full border border-gold/25 bg-gold/10 text-gold">{badge}</span>
            {label}
          </span>
        ))}
      </div>
      <p className="mt-4 text-xs leading-6 text-parchment/55">
        This interactive diagram is an educational and symbolic model of chakra and subtle-body concepts. It is not medical
        advice and is not a substitute for qualified instruction. Do not force breath, pressure, visualization, or bodily sensations.
      </p>
    </div>
  );
}

function Panel({ title, icon: Icon, children }: { title: string; icon: typeof Search; children: ReactNode }) {
  return (
    <section className="rounded border border-gold/16 bg-black/50 p-4 shadow-[inset_0_0_32px_rgba(214,168,79,.035)]">
      <div className="mb-4 flex items-center gap-3 border-b border-gold/12 pb-3">
        <Icon className="text-gold" size={18} strokeWidth={1.35} />
        <h3 className="text-xs uppercase tracking-[.24em] text-gold">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-gold/10 bg-black/35 p-3">
      <p className="text-[10px] uppercase tracking-[.16em] text-gold/74">{label}</p>
      <p className="mt-1 text-parchment/82">{value}</p>
    </div>
  );
}
