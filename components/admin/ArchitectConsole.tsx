"use client";

import {
  AlertTriangle,
  ArchiveRestore,
  Bot,
  CheckCircle2,
  ClipboardList,
  FilePenLine,
  LayoutDashboard,
  LockKeyhole,
  PenTool,
  RefreshCcw,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Wand2,
  XCircle
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type CommandType =
  | "Create Page"
  | "Edit Page"
  | "Add Episode"
  | "Add Article"
  | "Add Glossary Term"
  | "Create Study Path"
  | "Create Interactive Instrument"
  | "Improve Design"
  | "Generate Codex Prompt"
  | "Fix Bug";

type DraftStatus = "Draft" | "Preview" | "Approved" | "Published";
type RiskLevel = "Low" | "Medium" | "High";

type ArchitectDraft = {
  id: string;
  command: string;
  commandType: CommandType;
  status: DraftStatus;
  title: string;
  slug: string;
  risk: RiskLevel;
  intent: string;
  affectedSurfaces: string[];
  sections: Array<{ label: string; body: string }>;
  relatedContent: string[];
  safetyNotes: string[];
  createdAt: string;
  updatedAt: string;
};

type ChangelogEntry = {
  id: string;
  draftId: string;
  action: string;
  detail: string;
  createdAt: string;
};

const commandTypes: CommandType[] = [
  "Create Page",
  "Edit Page",
  "Add Episode",
  "Add Article",
  "Add Glossary Term",
  "Create Study Path",
  "Create Interactive Instrument",
  "Improve Design",
  "Generate Codex Prompt",
  "Fix Bug"
];

const statusStyles: Record<DraftStatus, string> = {
  Draft: "border-gold/25 bg-gold/10 text-gold",
  Preview: "border-silver/30 bg-silver/10 text-ivory",
  Approved: "border-emerald-400/35 bg-emerald-400/10 text-emerald-200",
  Published: "border-crimson/35 bg-crimson/15 text-rose-100"
};

const riskStyles: Record<RiskLevel, string> = {
  Low: "border-emerald-400/30 text-emerald-200",
  Medium: "border-gold/40 text-gold",
  High: "border-crimson/40 text-rose-200"
};

const storageKey = "aetherica-architect-drafts";
const changelogKey = "aetherica-architect-changelog";
const sessionKey = "aetherica-architect-session";

const workflowAbilities = [
  "Article pages, landing sections, glossary entries, and symbol records",
  "Episode descriptions, chapters, clips, social captions, and SEO metadata",
  "Study paths, reading lists, related-content maps, and Oracle prompts",
  "Interactive instrument plans with schema, UI behavior, and mobile notes",
  "Codex implementation prompts for reviewed site changes"
];

const safetyRules = [
  "All changes begin as drafts.",
  "Publishing requires an explicit approval step.",
  "Destructive changes require separate confirmation.",
  "Credentials, environment values, billing, and deployment settings are never exposed.",
  "Every generated action is recorded in the changelog."
];

function readStoredDrafts() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(storageKey) ?? "[]") as ArchitectDraft[];
  } catch {
    return [];
  }
}

function readStoredChangelog() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(changelogKey) ?? "[]") as ChangelogEntry[];
  } catch {
    return [];
  }
}

function readArchitectSession() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(sessionKey) === "unlocked";
}

function readInitialArchitectState() {
  const initialDrafts = readStoredDrafts();
  return {
    unlocked: readArchitectSession(),
    drafts: initialDrafts,
    changelog: readStoredChangelog(),
    selectedId: initialDrafts[0]?.id ?? ""
  };
}

function titleFromCommand(command: string, commandType: CommandType) {
  const cleaned = command
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned) return commandType;
  const withoutDirective = cleaned.replace(/^(create|add|edit|improve|generate|fix|build)\s+/i, "");
  return withoutDirective
    .split(/[.?!]/)[0]
    .split(" ")
    .slice(0, 12)
    .join(" ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 64) || "architect-draft";
}

function riskFor(commandType: CommandType, command: string): RiskLevel {
  if (/auth|billing|database|delete|deployment|environment|api key|credential/i.test(command)) return "High";
  if (commandType === "Fix Bug" || commandType === "Edit Page" || commandType === "Create Interactive Instrument") return "Medium";
  return "Low";
}

function surfacesFor(commandType: CommandType, slug: string) {
  const map: Record<CommandType, string[]> = {
    "Create Page": [`app/${slug}/page.tsx`, "metadata", "related-content index"],
    "Edit Page": ["existing page content", "copy blocks", "design components"],
    "Add Episode": ["content/youtube-episodes.json", "episode page", "spoken archive search"],
    "Add Article": [`content/articles/${slug}.json`, "article route", "SEO metadata"],
    "Add Glossary Term": ["glossary data", "symbol index", "related archive links"],
    "Create Study Path": ["paths data", "path detail page", "progress tracking"],
    "Create Interactive Instrument": [`app/resources/${slug}/page.tsx`, "resource hub", "instrument data schema"],
    "Improve Design": ["component styling", "responsive states", "visual QA checklist"],
    "Generate Codex Prompt": ["implementation brief", "acceptance criteria", "review notes"],
    "Fix Bug": ["affected component", "regression notes", "verification steps"]
  };
  return map[commandType];
}

function generateDraft(command: string, commandType: CommandType): ArchitectDraft {
  const title = titleFromCommand(command, commandType);
  const slug = slugify(title);
  const risk = riskFor(commandType, command);
  const createdAt = new Date().toISOString();
  const commonSafety = [
    "Create a draft preview before touching public-facing content.",
    "Mark historical claims, symbolic interpretation, and Aetherica framing separately.",
    "Keep the public Oracle separate from this admin-only workflow."
  ];

  const sectionsByType: Record<CommandType, ArchitectDraft["sections"]> = {
    "Create Page": [
      { label: "Page Title", body: title },
      { label: "Hero", body: "A restrained obsidian-and-gold opening section with a concise thesis, sacred-geometry atmosphere, and a direct path into the archive." },
      { label: "Main Sections", body: "Introduction, historical context, symbolic interpretation, related episodes, related terms, and an Ask the Oracle panel." }
    ],
    "Edit Page": [
      { label: "Edit Intent", body: "Review the requested page, preserve the Aetherica tone, tighten structure, and avoid unrelated refactors." },
      { label: "Before / After", body: "Prepare a side-by-side change summary before approval." },
      { label: "Review Notes", body: "Flag copy changes, visual changes, and any data dependencies separately." }
    ],
    "Add Episode": [
      { label: "Episode Processing", body: "Generate title, short description, long description, timestamp chapters, key themes, guest highlights, and mentioned traditions." },
      { label: "Archive Links", body: "Suggest related episodes, glossary terms, books, study paths, and search keywords." },
      { label: "Social Kit", body: "Draft short captions, suggested clips, and SEO title and description." }
    ],
    "Add Article": [
      { label: "Article Structure", body: "Create a scholarly but poetic article with thesis, sections, citations placeholder, related media, and Oracle follow-up prompts." },
      { label: "SEO", body: "Generate meta title, meta description, canonical slug, and search excerpt." },
      { label: "Editorial Guardrail", body: "Separate verifiable history from symbolic interpretation." }
    ],
    "Add Glossary Term": [
      { label: "Simple Definition", body: "A clear visitor-friendly definition suitable for archive search." },
      { label: "Scholarly Definition", body: "Historical context, tradition-specific usage, and source placeholders." },
      { label: "Esoteric Interpretation", body: "Aetherica framing with related terms, episodes, articles, and readings." }
    ],
    "Create Study Path": [
      { label: "Path Arc", body: "Foundation, deepening, practice-of-study, and integration steps with progress tracking." },
      { label: "Included Materials", body: "Episodes, chapters, books, articles, glossary entries, and reflection prompts." },
      { label: "Next Current", body: "Offer a meaningful continuation engine after completion." }
    ],
    "Create Interactive Instrument": [
      { label: "Component Plan", body: "Client-side instrument shell, structured data module, explanation panel, mobile mode, and accessibility notes." },
      { label: "Interaction Behavior", body: "Clickable regions, compare mode, glossary drawer, source panel, and saved research notes." },
      { label: "Visual Style", body: "Black obsidian chamber, etched gold UI, subtle motion, and source-labeled correspondences." }
    ],
    "Improve Design": [
      { label: "Design Audit", body: "Evaluate spacing, hierarchy, responsive behavior, hover states, contrast, and Aetherica consistency." },
      { label: "Refinement Plan", body: "Make scoped visual changes with screenshots or preview checks before publishing." },
      { label: "Acceptance Criteria", body: "No overlap, no clipped text, mobile-friendly controls, and restrained atmosphere." }
    ],
    "Generate Codex Prompt": [
      { label: "Implementation Brief", body: "Convert the request into a clear Codex-ready prompt with scope, files, data shape, and acceptance checks." },
      { label: "Constraints", body: "Draft-first, no destructive edits, preserve existing patterns, run verification." },
      { label: "Output", body: "A polished prompt ready to send into a build session." }
    ],
    "Fix Bug": [
      { label: "Bug Triage", body: "Reproduce, isolate affected files, identify root cause, and propose a minimal fix." },
      { label: "Verification", body: "Run targeted checks and describe residual risk." },
      { label: "Rollback", body: "Record what changed so the patch can be reversed if needed." }
    ]
  };

  return {
    id: `architect-${Date.now()}`,
    command,
    commandType,
    status: "Draft",
    title,
    slug,
    risk,
    intent: `The Architect will prepare a ${commandType.toLowerCase()} draft for review. Nothing is published until you approve and publish it.`,
    affectedSurfaces: surfacesFor(commandType, slug),
    sections: sectionsByType[commandType],
    relatedContent: ["Related episodes", "Related glossary terms", "Related study paths", "Oracle panel", "SEO metadata"],
    safetyNotes: risk === "High" ? [...commonSafety, "High-risk request detected. Require explicit confirmation before implementation."] : commonSafety,
    createdAt,
    updatedAt: createdAt
  };
}

function statusStep(status: DraftStatus) {
  return ["Draft", "Preview", "Approved", "Published"].indexOf(status);
}

export function ArchitectConsole() {
  const [initialState] = useState(readInitialArchitectState);
  const [unlocked, setUnlocked] = useState(initialState.unlocked);
  const [accessPhrase, setAccessPhrase] = useState("");
  const [commandType, setCommandType] = useState<CommandType>("Create Page");
  const [command, setCommand] = useState("");
  const [drafts, setDrafts] = useState<ArchitectDraft[]>(initialState.drafts);
  const [changelog, setChangelog] = useState<ChangelogEntry[]>(initialState.changelog);
  const [selectedId, setSelectedId] = useState(initialState.selectedId);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(storageKey, JSON.stringify(drafts));
  }, [drafts]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(changelogKey, JSON.stringify(changelog));
  }, [changelog]);

  const selectedDraft = useMemo(
    () => drafts.find((draft) => draft.id === selectedId) ?? drafts[0],
    [drafts, selectedId]
  );

  function addChange(draftId: string, action: string, detail: string) {
    setChangelog((current) => [
      {
        id: `architect-log-${Date.now()}`,
        draftId,
        action,
        detail,
        createdAt: new Date().toISOString()
      },
      ...current
    ].slice(0, 24));
  }

  function unlock(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accessPhrase.trim()) {
      setNotice("Enter the owner access phrase to open The Architect.");
      return;
    }
    window.localStorage.setItem(sessionKey, "unlocked");
    setUnlocked(true);
    setNotice("The Architect is open on this device. Connect real admin authentication before production use.");
  }

  function lock() {
    window.localStorage.removeItem(sessionKey);
    setUnlocked(false);
    setAccessPhrase("");
    setNotice("The Architect has been locked on this device.");
  }

  function createDraft(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!command.trim()) {
      setNotice("Describe what you want The Architect to create or change.");
      return;
    }
    const draft = generateDraft(command, commandType);
    setDrafts((current) => [draft, ...current]);
    setSelectedId(draft.id);
    addChange(draft.id, "Draft created", `${draft.commandType}: ${draft.title}`);
    setNotice("Draft created. Review the preview, risk level, and affected surfaces before approval.");
  }

  function setStatus(draft: ArchitectDraft, status: DraftStatus) {
    const updatedAt = new Date().toISOString();
    setDrafts((current) =>
      current.map((item) => (item.id === draft.id ? { ...item, status, updatedAt } : item))
    );
    addChange(draft.id, status, `${draft.title} marked ${status}.`);
  }

  function regenerate(draft: ArchitectDraft) {
    const next = { ...generateDraft(draft.command, draft.commandType), id: draft.id, status: "Draft" as DraftStatus };
    setDrafts((current) => current.map((item) => (item.id === draft.id ? next : item)));
    addChange(draft.id, "Regenerated", `${draft.title} regenerated as a fresh draft.`);
  }

  function cancelDraft(draft: ArchitectDraft) {
    setDrafts((current) => current.filter((item) => item.id !== draft.id));
    setSelectedId("");
    addChange(draft.id, "Cancelled", `${draft.title} removed from active drafts.`);
  }

  if (!unlocked) {
    return (
      <main className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden px-4 py-16 sm:px-6 lg:px-8">
        <ArchitectAtmosphere />
        <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_.85fr]">
          <div className="flex min-h-[32rem] flex-col justify-end rounded-lg border border-gold/20 bg-black/40 p-8 shadow-aureate">
            <p className="text-xs uppercase tracking-[.34em] text-gold">Private admin intelligence</p>
            <h1 className="font-manuscript-title mt-5 font-display text-5xl leading-none text-ivory sm:text-7xl">The Architect</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-parchment">
              A draft-first command chamber for shaping Aetherica content, archive structure, instruments, and implementation prompts without publishing unreviewed changes.
            </p>
          </div>
          <form onSubmit={unlock} className="temple-border rounded-lg p-6">
            <div className="flex items-center gap-3 text-gold">
              <LockKeyhole size={22} />
              <p className="text-xs uppercase tracking-[.28em]">Admin access</p>
            </div>
            <h2 className="mt-4 font-display text-3xl text-ivory">Owner Gate</h2>
            <p className="mt-3 text-sm leading-6 text-parchment">
              This local gate keeps the admin console separate from public-facing pages while the full authentication layer is added.
            </p>
            <label className="mt-6 block text-sm text-gold" htmlFor="architect-phrase">Access phrase</label>
            <input
              id="architect-phrase"
              value={accessPhrase}
              onChange={(event) => setAccessPhrase(event.target.value)}
              className="focus-ring mt-2 min-h-12 w-full rounded border border-gold/25 bg-obsidian px-3 text-ivory"
              placeholder="Owner phrase"
              type="password"
            />
            <button className="focus-ring mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded bg-gold px-5 font-semibold uppercase tracking-[.16em] text-obsidian hover:bg-ivory">
              <ShieldCheck size={18} />
              Open The Architect
            </button>
            <p className="mt-5 rounded border border-crimson/25 bg-crimson/10 p-3 text-xs leading-5 text-parchment">
              Production note: connect this route to real admin authentication before deploying it as a private owner tool.
            </p>
            {notice ? <p className="mt-4 text-sm text-gold">{notice}</p> : null}
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="relative isolate overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <ArchitectAtmosphere />
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 border-b border-gold/15 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[.34em] text-gold">Private admin system</p>
            <h1 className="font-manuscript-title mt-3 font-display text-5xl leading-none text-ivory sm:text-7xl">The Architect</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-parchment">
              Create, organize, and refine Aetherica through reviewed drafts. The Oracle guides visitors. The Architect shapes the temple.
            </p>
          </div>
          <button onClick={lock} className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded border border-gold/35 px-4 text-sm uppercase tracking-[.16em] text-ivory hover:bg-gold/10">
            <LockKeyhole size={16} />
            Lock
          </button>
        </div>

        {notice ? <p className="mt-5 rounded border border-gold/20 bg-gold/10 p-3 text-sm text-parchment">{notice}</p> : null}

        <div className="mt-8 grid gap-7 xl:grid-cols-[24rem_minmax(0,1fr)]">
          <aside className="space-y-5">
            <form onSubmit={createDraft} className="temple-border rounded-lg p-5">
              <div className="flex items-center gap-3 text-gold">
                <Bot size={20} />
                <p className="text-xs uppercase tracking-[.24em]">Command interface</p>
              </div>
              <label className="mt-5 block text-sm text-gold" htmlFor="architect-command-type">Command type</label>
              <select
                id="architect-command-type"
                value={commandType}
                onChange={(event) => setCommandType(event.target.value as CommandType)}
                className="focus-ring mt-2 min-h-12 w-full rounded border border-gold/25 bg-obsidian px-3 text-ivory"
              >
                {commandTypes.map((type) => <option key={type}>{type}</option>)}
              </select>
              <label className="mt-5 block text-sm text-gold" htmlFor="architect-command">Natural-language command</label>
              <textarea
                id="architect-command"
                value={command}
                onChange={(event) => setCommand(event.target.value)}
                className="focus-ring mt-2 min-h-44 w-full rounded border border-gold/25 bg-obsidian px-3 py-3 text-ivory"
                placeholder="Create a research page on gnosis with related episodes, glossary links, and an Ask the Oracle panel..."
              />
              <button className="focus-ring mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded bg-gold px-4 font-semibold uppercase tracking-[.16em] text-obsidian hover:bg-ivory">
                <Wand2 size={18} />
                Generate Draft
              </button>
            </form>

            <section className="temple-border rounded-lg p-5">
              <div className="flex items-center gap-3 text-gold">
                <ShieldCheck size={19} />
                <p className="text-xs uppercase tracking-[.24em]">Safety rules</p>
              </div>
              <div className="mt-4 grid gap-3">
                {safetyRules.map((rule) => (
                  <p key={rule} className="flex gap-3 text-sm leading-6 text-parchment">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-gold" />
                    {rule}
                  </p>
                ))}
              </div>
            </section>
          </aside>

          <div className="grid gap-7">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {workflowAbilities.map((ability) => (
                <div key={ability} className="rounded border border-gold/15 bg-black/35 p-4">
                  <Sparkles className="h-5 w-5 text-gold" />
                  <p className="mt-3 text-sm leading-6 text-parchment">{ability}</p>
                </div>
              ))}
            </section>

            <section className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_22rem]">
              <div className="temple-border rounded-lg p-5">
                <div className="flex flex-col gap-3 border-b border-gold/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[.26em] text-gold">Draft queue</p>
                    <h2 className="mt-2 font-display text-3xl text-ivory">Review before publishing</h2>
                  </div>
                  <p className="text-sm text-limestone">{drafts.length} active draft{drafts.length === 1 ? "" : "s"}</p>
                </div>

                <div className="mt-5 grid gap-4">
                  {drafts.length ? drafts.map((draft) => (
                    <button
                      key={draft.id}
                      onClick={() => setSelectedId(draft.id)}
                      className={`focus-ring rounded border p-4 text-left transition hover:border-gold/45 hover:bg-gold/10 ${selectedDraft?.id === draft.id ? "border-gold/55 bg-gold/10" : "border-gold/15 bg-black/25"}`}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded border px-2 py-1 text-[0.65rem] uppercase tracking-[.16em] ${statusStyles[draft.status]}`}>{draft.status}</span>
                        <span className={`rounded border px-2 py-1 text-[0.65rem] uppercase tracking-[.16em] ${riskStyles[draft.risk]}`}>{draft.risk} risk</span>
                        <span className="text-xs uppercase tracking-[.18em] text-gold">{draft.commandType}</span>
                      </div>
                      <h3 className="mt-3 font-display text-2xl text-ivory">{draft.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-parchment">{draft.intent}</p>
                    </button>
                  )) : (
                    <div className="rounded border border-gold/15 bg-black/25 p-6 text-parchment">
                      No drafts yet. Give The Architect a command to create the first private draft.
                    </div>
                  )}
                </div>
              </div>

              <section className="temple-border rounded-lg p-5">
                <div className="flex items-center gap-3 text-gold">
                  <ClipboardList size={19} />
                  <p className="text-xs uppercase tracking-[.24em]">Changelog</p>
                </div>
                <div className="mt-4 grid gap-3">
                  {changelog.length ? changelog.map((entry) => (
                    <div key={entry.id} className="rounded border border-gold/12 bg-black/25 p-3">
                      <p className="text-sm text-ivory">{entry.action}</p>
                      <p className="mt-1 text-xs leading-5 text-limestone">{entry.detail}</p>
                    </div>
                  )) : <p className="text-sm leading-6 text-parchment">Generated drafts, approvals, publishing events, and cancellations will appear here.</p>}
                </div>
              </section>
            </section>

            {selectedDraft ? (
              <DraftPreview
                draft={selectedDraft}
                onPreview={() => setStatus(selectedDraft, "Preview")}
                onApprove={() => setStatus(selectedDraft, "Approved")}
                onPublish={() => setStatus(selectedDraft, "Published")}
                onRegenerate={() => regenerate(selectedDraft)}
                onCancel={() => cancelDraft(selectedDraft)}
              />
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}

function DraftPreview({
  draft,
  onPreview,
  onApprove,
  onPublish,
  onRegenerate,
  onCancel
}: {
  draft: ArchitectDraft;
  onPreview: () => void;
  onApprove: () => void;
  onPublish: () => void;
  onRegenerate: () => void;
  onCancel: () => void;
}) {
  return (
    <section className="temple-border rounded-lg p-5">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded border px-2 py-1 text-[0.65rem] uppercase tracking-[.16em] ${statusStyles[draft.status]}`}>{draft.status}</span>
            <span className={`rounded border px-2 py-1 text-[0.65rem] uppercase tracking-[.16em] ${riskStyles[draft.risk]}`}>{draft.risk} risk</span>
            <span className="text-xs uppercase tracking-[.2em] text-gold">{draft.commandType}</span>
          </div>
          <h2 className="font-manuscript-title mt-3 font-display text-4xl text-ivory">{draft.title}</h2>
          <p className="mt-2 text-sm uppercase tracking-[.18em] text-gold">/{draft.slug}</p>
          <p className="mt-4 max-w-3xl leading-7 text-parchment">{draft.intent}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {["Draft", "Preview", "Approved", "Published"].map((status, index) => (
              <div key={status} className={`rounded border p-3 ${index <= statusStep(draft.status) ? "border-gold/40 bg-gold/10" : "border-gold/12 bg-black/25"}`}>
                <p className="text-xs uppercase tracking-[.18em] text-gold">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-2 font-display text-xl text-ivory">{status}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 grid gap-4">
            {draft.sections.map((section) => (
              <article key={section.label} className="rounded border border-gold/12 bg-black/25 p-4">
                <p className="text-xs uppercase tracking-[.22em] text-gold">{section.label}</p>
                <p className="mt-3 leading-7 text-parchment">{section.body}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded border border-gold/15 bg-black/30 p-4">
            <div className="flex items-center gap-2 text-gold">
              <LayoutDashboard size={17} />
              <p className="text-xs uppercase tracking-[.2em]">Affected surfaces</p>
            </div>
            <div className="mt-3 grid gap-2">
              {draft.affectedSurfaces.map((surface) => <p key={surface} className="text-sm text-parchment">{surface}</p>)}
            </div>
          </div>
          <div className="rounded border border-gold/15 bg-black/30 p-4">
            <div className="flex items-center gap-2 text-gold">
              <ScrollText size={17} />
              <p className="text-xs uppercase tracking-[.2em]">Related output</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {draft.relatedContent.map((item) => <span key={item} className="rounded border border-gold/20 px-2 py-1 text-xs text-parchment">{item}</span>)}
            </div>
          </div>
          <div className="rounded border border-crimson/25 bg-crimson/10 p-4">
            <div className="flex items-center gap-2 text-rose-100">
              <AlertTriangle size={17} />
              <p className="text-xs uppercase tracking-[.2em]">Guardrails</p>
            </div>
            <div className="mt-3 grid gap-2">
              {draft.safetyNotes.map((note) => <p key={note} className="text-sm leading-6 text-parchment">{note}</p>)}
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-6 flex flex-wrap gap-3 border-t border-gold/15 pt-5">
        <button onClick={onPreview} disabled={draft.status === "Published"} className="focus-ring inline-flex min-h-11 items-center gap-2 rounded border border-gold/35 px-4 text-sm uppercase tracking-[.14em] text-ivory hover:bg-gold/10 disabled:opacity-45">
          <FilePenLine size={16} />
          Preview
        </button>
        <button onClick={onApprove} disabled={draft.status === "Published"} className="focus-ring inline-flex min-h-11 items-center gap-2 rounded border border-emerald-400/35 px-4 text-sm uppercase tracking-[.14em] text-emerald-100 hover:bg-emerald-400/10 disabled:opacity-45">
          <CheckCircle2 size={16} />
          Approve
        </button>
        <button onClick={onPublish} disabled={draft.status !== "Approved"} className="focus-ring inline-flex min-h-11 items-center gap-2 rounded bg-gold px-4 text-sm font-semibold uppercase tracking-[.14em] text-obsidian hover:bg-ivory disabled:opacity-45">
          <PenTool size={16} />
          Publish
        </button>
        <button onClick={onRegenerate} disabled={draft.status === "Published"} className="focus-ring inline-flex min-h-11 items-center gap-2 rounded border border-gold/35 px-4 text-sm uppercase tracking-[.14em] text-ivory hover:bg-gold/10 disabled:opacity-45">
          <RefreshCcw size={16} />
          Regenerate
        </button>
        <button onClick={onCancel} className="focus-ring inline-flex min-h-11 items-center gap-2 rounded border border-crimson/35 px-4 text-sm uppercase tracking-[.14em] text-rose-100 hover:bg-crimson/10">
          <XCircle size={16} />
          Cancel
        </button>
        <span className="inline-flex min-h-11 items-center gap-2 rounded border border-gold/15 px-4 text-sm text-limestone">
          <ArchiveRestore size={16} />
          Rollback note recorded in changelog
        </span>
      </div>
    </section>
  );
}

function ArchitectAtmosphere() {
  return (
    <>
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_16%_12%,rgba(122,17,26,.24),transparent_28rem),radial-gradient(circle_at_76%_22%,rgba(181,146,85,.14),transparent_28rem),linear-gradient(180deg,rgba(8,8,8,.96),rgba(12,10,10,.98))]" />
      <div className="absolute inset-0 -z-20 opacity-35 [background-image:linear-gradient(90deg,rgba(181,146,85,.08)_1px,transparent_1px),linear-gradient(0deg,rgba(181,146,85,.06)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="absolute left-1/2 top-20 -z-10 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full border border-gold/10 shadow-[0_0_120px_rgba(181,146,85,.12)]" />
    </>
  );
}
