import Link from "next/link";

/**
 * The Map of the Current: how the archive's subjects feed one another across twenty-two
 * centuries, drawn as a lineage chart whose nodes are doors to the other topic pages.
 *
 * The honesty is in the line styles. A solid edge is documented transmission — texts translated,
 * teachers read, charters issued. A dashed edge is CLAIMED descent or diffuse influence: the
 * Rosicrucian pedigree Freemasonry told about itself, the "gnosis" Theosophy reached back for.
 * The map's one thesis is that the single unbroken lineage is itself a Renaissance invention —
 * which is why every solid path west of antiquity runs through the synthesis node.
 */

type MapNode = {
  id: string;
  x: number;
  y: number;
  lines: string[];
  sub?: string;
  href?: string;
  wide?: boolean;
};

const NODES: MapNode[] = [
  // ---- antiquity
  { id: "herm", x: 95, y: 84, lines: ["Hermetica"], sub: "Roman Egypt", href: "/topics/hermeticism" },
  { id: "gnos", x: 95, y: 138, lines: ["Gnosis"], sub: "2nd–4th c.", href: "/topics/gnosticism" },
  { id: "neop", x: 95, y: 192, lines: ["Neoplatonism", "& theurgy"], href: "/topics/theurgy" },
  { id: "astr", x: 95, y: 252, lines: ["Hellenistic", "astrology"], href: "/topics/astrology" },
  { id: "alch", x: 95, y: 312, lines: ["Greco-Egyptian", "alchemy"], href: "/topics/alchemy" },
  // ---- medieval
  { id: "kabb", x: 255, y: 138, lines: ["Kabbalah"], sub: "Provence · Castile", href: "/topics/kabbalah" },
  { id: "arab", x: 255, y: 282, lines: ["Arabic", "transmission"], sub: "Baghdad · al-Andalus" },
  // ---- renaissance
  { id: "fic", x: 420, y: 160, lines: ["The synthesis"], sub: "Ficino · Pico, 1462–86", wide: true },
  { id: "ccab", x: 420, y: 228, lines: ["Christian Cabala"], sub: "Reuchlin, 1517" },
  { id: "agr", x: 420, y: 292, lines: ["Agrippa"], sub: "De occulta, 1533" },
  // ---- early modern
  { id: "par", x: 585, y: 92, lines: ["Paracelsism"], sub: "chemical medicine" },
  { id: "rosi", x: 585, y: 180, lines: ["Rosicrucian", "manifestos"], sub: "1614–16" },
  { id: "boeh", x: 585, y: 252, lines: ["Böhme's", "theosophy"], sub: "Aurora, 1612" },
  { id: "free", x: 585, y: 330, lines: ["Freemasonry"], sub: "Grand Lodge, 1717", href: "/topics/freemasonry" },
  // ---- nineteenth century
  { id: "mes", x: 745, y: 92, lines: ["Mesmerism &", "spiritualism"] },
  { id: "ts", x: 745, y: 180, lines: ["Theosophical", "Society"], sub: "1875" },
  { id: "gd", x: 745, y: 282, lines: ["Golden Dawn"], sub: "1888" },
  // ---- twentieth century on
  { id: "mod", x: 895, y: 180, lines: ["Modern orders", "& currents"] },
  { id: "acad", x: 895, y: 292, lines: ["The academy"], sub: "Faivre, 1979 · 1992" }
];

/** [from, to, dashed?] — dashed marks claimed or diffuse descent rather than documented transmission. */
const EDGES: Array<[string, string, boolean?]> = [
  ["herm", "fic"],
  ["neop", "fic"],
  ["astr", "arab"],
  ["alch", "arab"],
  ["arab", "fic"],
  ["arab", "par"],
  ["kabb", "ccab"],
  ["fic", "ccab"],
  ["ccab", "agr"],
  ["agr", "rosi"],
  ["rosi", "free", true],
  ["rosi", "boeh", true],
  ["boeh", "ts", true],
  ["gnos", "ts", true],
  ["mes", "ts"],
  ["free", "gd"],
  ["ts", "gd", true],
  ["gd", "mod"],
  ["ts", "mod"],
  ["mod", "acad", true]
];

const ERAS: Array<[number, string]> = [
  [95, "ANTIQUITY"],
  [255, "MEDIEVAL"],
  [420, "RENAISSANCE"],
  [585, "EARLY MODERN"],
  [745, "19TH CENTURY"],
  [895, "20TH – NOW"]
];

const HALF_W = 62;
const WIDE_HALF_W = 74;
const HALF_H = 21;

function nodeById(id: string) {
  const node = NODES.find((n) => n.id === id);
  if (!node) throw new Error(`CurrentMap: unknown node ${id}`);
  return node;
}

function edgePath(fromId: string, toId: string) {
  const a = nodeById(fromId);
  const b = nodeById(toId);
  const x1 = a.x + (a.wide ? WIDE_HALF_W : HALF_W);
  const x2 = b.x - (b.wide ? WIDE_HALF_W : HALF_W);
  const bend = Math.min(46, (x2 - x1) / 2);
  return `M ${x1} ${a.y} C ${x1 + bend} ${a.y}, ${x2 - bend} ${b.y}, ${x2} ${b.y}`;
}

function NodeBox({ node }: { node: MapNode }) {
  const hw = node.wide ? WIDE_HALF_W : HALF_W;
  const textYStart = node.lines.length > 1 ? node.y - 5 : node.y + (node.sub ? -2 : 1);
  const body = (
    <g>
      <rect
        x={node.x - hw}
        y={node.y - HALF_H}
        width={hw * 2}
        height={HALF_H * 2}
        rx="4"
        fill={node.href ? "rgba(181,146,85,.1)" : "rgba(8,8,8,.72)"}
        stroke={node.href ? "rgba(181,146,85,.75)" : "rgba(181,146,85,.35)"}
        strokeWidth="1.3"
      />
      {node.lines.map((line, index) => (
        <text
          key={line}
          x={node.x}
          y={textYStart + index * 11}
          textAnchor="middle"
          fontSize="10"
          fill={node.href ? "rgb(231,221,204)" : "rgb(200,184,158)"}
        >
          {line}
        </text>
      ))}
      {node.sub ? (
        <text x={node.x} y={node.y + (node.lines.length > 1 ? 16 : 12)} textAnchor="middle" fontSize="7" fill="rgb(129,118,107)">
          {node.sub}
        </text>
      ) : null}
    </g>
  );
  return node.href ? <a href={node.href}>{body}</a> : body;
}

export function CurrentMap() {
  const linked = NODES.filter((node) => node.href);
  return (
    <section id="current-map" className="relative isolate scroll-mt-24 overflow-hidden border-y border-gold/20 bg-black/55">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(8,8,8,.96),rgba(26,33,43,.42)_40%,rgba(181,146,85,.12)_78%,rgba(8,8,8,.96))]" />
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-[.28em] text-gold">The Map of the Current</p>
          <h2 className="font-manuscript-title font-display text-3xl leading-none text-ivory sm:text-5xl">
            How the subjects feed one another
          </h2>
          <p className="mt-4 leading-8 text-parchment">
            A <span className="text-ivory">solid line</span> is documented transmission — texts
            translated, teachers read, charters issued. A{" "}
            <span className="text-ivory">dashed line</span> is descent as it was{" "}
            <em>claimed</em>, or influence too diffuse to footnote. Read left to right and one
            thing becomes visible: almost every solid path runs through the Renaissance synthesis
            — because the &ldquo;single unbroken tradition&rdquo; was assembled there, not
            inherited. The gold-edged nodes are doors to this archive&rsquo;s own pages.
          </p>
        </div>

        <div className="temple-border overflow-x-auto rounded bg-black/40 p-4">
          <svg viewBox="0 0 985 372" className="block min-w-[880px]" role="img" aria-label="Lineage map of Western esoteric currents from antiquity to the present; the linked subjects are listed below the map.">
            <defs>
              <marker id="cm-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 8 4 L 0 8 z" fill="rgba(181,146,85,.7)" />
              </marker>
            </defs>
            {ERAS.map(([x, label]) => (
              <text key={label} x={x} y={30} textAnchor="middle" fontSize="8.5" letterSpacing="2.5" fill="rgb(129,118,107)">
                {label}
              </text>
            ))}
            {ERAS.slice(1).map(([x]) => (
              <line key={x} x1={x - 80} y1={44} x2={x - 80} y2={358} stroke="rgba(181,146,85,.08)" strokeWidth="1" />
            ))}
            {EDGES.map(([from, to, dashed]) => (
              <path
                key={`${from}-${to}`}
                d={edgePath(from, to)}
                fill="none"
                stroke={dashed ? "rgba(200,184,158,.42)" : "rgba(181,146,85,.6)"}
                strokeWidth="1.4"
                strokeDasharray={dashed ? "5 4" : undefined}
                markerEnd="url(#cm-arrow)"
              />
            ))}
            {NODES.map((node) => (
              <NodeBox key={node.id} node={node} />
            ))}
          </svg>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[.66rem] uppercase tracking-[.2em] text-gold">Enter the current:</span>
          {linked.map((node) => (
            <Link
              key={node.id}
              href={node.href!}
              className="focus-ring rounded-full border border-gold/30 px-3 py-1.5 text-xs text-parchment transition hover:bg-gold/10 hover:text-ivory"
            >
              {node.lines.join(" ")}
            </Link>
          ))}
        </div>
        <p className="mt-4 max-w-3xl text-xs leading-6 text-limestone">
          Simplifications, knowingly made: the Arabic transmission node stands for three centuries
          of translation in Baghdad and al-Andalus; Böhme owed the Rosicrucians nothing but arrived
          beside them; and the academy&rsquo;s dashed line means it studies the current — it does
          not continue it.
        </p>
      </div>
    </section>
  );
}
