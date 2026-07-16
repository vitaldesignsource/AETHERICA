"use client";

import {
  Archive,
  BookMarked,
  BrainCircuit,
  Clipboard,
  Copy,
  FileJson,
  Image as ImageIcon,
  Layers3,
  Library,
  Link2,
  Loader2,
  LockKeyhole,
  MessageSquareText,
  PenLine,
  Plus,
  Search,
  ScrollText,
  Send,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Trash2,
  Wand2
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  noteCategories,
  oracleModes,
  oracleQuickActions,
  type OracleMode,
  type OracleNoteCategory,
  type OracleQuickAction
} from "@/lib/oracle/actions";

type OracleMessage = {
  id: string;
  role: "owner" | "oracle";
  mode: OracleMode;
  text: string;
  createdAt: string;
};

type OracleNote = {
  id: string;
  title: string;
  category: OracleNoteCategory;
  body: string;
  createdAt: string;
};

const chatStorageKey = "aetherica-oracle-chat";
const notesStorageKey = "aetherica-oracle-notes";
const passwordStorageKey = "aetherica-oracle-password";
const pendingContextKey = "aetherica-oracle-pending-context";

const actionIcons: Record<string, typeof Sparkles> = {
  "Analyze Current Site": Search,
  "Improve Page Copy": PenLine,
  "Generate Article": ScrollText,
  "Create Episode Page": MessageSquareText,
  "Extract Clips from Transcript": Wand2,
  "Build SEO Metadata": FileJson,
  "Suggest Internal Links": Link2,
  "Create Image Prompts": ImageIcon,
  "Create Codex Prompt": TerminalSquare,
  "Plan Interactive Instrument": Layers3,
  "Add Glossary Entry": BookMarked,
  "Generate Reading List": Library,
  "Create Content Cluster": Archive
};

const modeDescriptions: Record<OracleMode, string> = {
  "Site Architect": "UX, structure, navigation, symbolic coherence, and implementation planning.",
  "Episode Producer": "Transcripts, show notes, clips, descriptions, guest highlights, and promotion.",
  "Esoteric Research Librarian": "Traditions, doctrines, glossary terms, comparative maps, and source discipline.",
  "SEO Strategist": "Metadata, clusters, search intent, schema, keywords, and internal linking.",
  "Brand Voice Editor": "Aetherica tone: elegant, scholarly, mystical, refined, direct, and grounded.",
  "Interactive Instrument Designer": "Symbolic tools, diagrams, calculators, correspondence engines, and UX modes.",
  "Codex Prompt Builder": "Precise development prompts with acceptance criteria and implementation details."
};

function readStoredArray<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T[]) : [];
  } catch {
    return [];
  }
}

function readStoredPassword() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(passwordStorageKey) ?? "";
}

function readPendingContext() {
  if (typeof window === "undefined") return "";
  const pendingContext = window.localStorage.getItem(pendingContextKey) ?? "";
  if (pendingContext) window.localStorage.removeItem(pendingContextKey);
  return pendingContext;
}

function writeStoredArray<T>(key: string, value: T[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit" }).format(new Date(value));
}

function firstHeading(value: string) {
  const line = value
    .split("\n")
    .map((item) => item.replace(/^#+\s*/, "").trim())
    .find(Boolean);
  return line?.slice(0, 72) || "Oracle note";
}

function createPromptFromResponse(response: string) {
  return [
    "Turn the following Oracle output into a complete Codex implementation prompt.",
    "",
    "Preserve the Aetherica visual language, identify likely files, define acceptance criteria, include verification steps, and avoid unsafe automatic changes.",
    "",
    response
  ].join("\n");
}

function markdownishBlocks(value: string) {
  return value.split(/\n{2,}/).map((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    if (/^#{1,3}\s/.test(trimmed)) {
      return (
        <h3 key={index} className="font-display text-2xl text-ivory">
          {trimmed.replace(/^#{1,3}\s*/, "")}
        </h3>
      );
    }
    if (/^[-*]\s/m.test(trimmed)) {
      return (
        <ul key={index} className="space-y-2 pl-5 text-parchment">
          {trimmed.split("\n").map((line, lineIndex) => (
            <li key={lineIndex} className="list-disc leading-relaxed">
              {line.replace(/^[-*]\s*/, "")}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={index} className="whitespace-pre-wrap leading-relaxed text-parchment">
        {trimmed}
      </p>
    );
  });
}

export function OracleDashboard() {
  const [initialMessages] = useState(() => readStoredArray<OracleMessage>(chatStorageKey));
  const [initialNotes] = useState(() => readStoredArray<OracleNote>(notesStorageKey));
  const [initialPendingContext] = useState(readPendingContext);
  const [messages, setMessages] = useState<OracleMessage[]>(initialMessages);
  const [notes, setNotes] = useState<OracleNote[]>(initialNotes);
  const [mode, setMode] = useState<OracleMode>(() => initialPendingContext ? "Interactive Instrument Designer" : "Site Architect");
  const [message, setMessage] = useState(() => initialPendingContext ? "Analyze this structured Celestial Instrument context and produce practical, Aetherica-ready interpretation, content, or implementation guidance." : "");
  const [context, setContext] = useState(initialPendingContext);
  const [adminPassword, setAdminPassword] = useState(readStoredPassword);
  const [noteCategory, setNoteCategory] = useState<OracleNoteCategory>("Site Ideas");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedAction, setSelectedAction] = useState<OracleQuickAction | null>(oracleQuickActions[0]);

  const lastOracleResponse = useMemo(() => [...messages].reverse().find((item) => item.role === "oracle")?.text ?? "", [messages]);

  function persistMessages(nextMessages: OracleMessage[]) {
    setMessages(nextMessages);
    writeStoredArray(chatStorageKey, nextMessages);
  }

  function persistNotes(nextNotes: OracleNote[]) {
    setNotes(nextNotes);
    writeStoredArray(notesStorageKey, nextNotes);
  }

  function applyAction(action: OracleQuickAction) {
    setSelectedAction(action);
    setMessage(action.prompt);
  }

  async function copyText(value: string) {
    if (!value) return;
    await navigator.clipboard.writeText(value);
  }

  function savePassword(value: string) {
    setAdminPassword(value);
    window.localStorage.setItem(passwordStorageKey, value);
  }

  function saveCurrentResponseAsNote() {
    if (!lastOracleResponse) return;
    const nextNote: OracleNote = {
      id: `oracle-note-${Date.now()}`,
      title: firstHeading(lastOracleResponse),
      category: noteCategory,
      body: lastOracleResponse,
      createdAt: new Date().toISOString()
    };
    persistNotes([nextNote, ...notes]);
  }

  async function submitOracleRequest(nextMessage = message) {
    const trimmed = nextMessage.trim();
    if (!trimmed || loading) return;
    setError("");
    setLoading(true);

    const createdAt = new Date().toISOString();
    const ownerMessage: OracleMessage = {
      id: `owner-${Date.now()}`,
      role: "owner",
      mode,
      text: trimmed,
      createdAt
    };
    const optimisticMessages = [...messages, ownerMessage];
    persistMessages(optimisticMessages);

    try {
      const response = await fetch("/api/oracle/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(adminPassword ? { "x-oracle-admin-password": adminPassword } : {})
        },
        body: JSON.stringify({ message: trimmed, context, mode })
      });
      const payload = (await response.json()) as { text?: string; error?: string; detail?: string; model?: string };
      if (!response.ok) {
        throw new Error(payload.error || "The Oracle could not complete the request.");
      }
      const oracleMessage: OracleMessage = {
        id: `oracle-${Date.now()}`,
        role: "oracle",
        mode,
        text: payload.text || "The Oracle returned an empty response.",
        createdAt: new Date().toISOString()
      };
      persistMessages([...optimisticMessages, oracleMessage]);
      setMessage("");
    } catch (caught) {
      const nextError = caught instanceof Error ? caught.message : "The Oracle could not complete the request.";
      setError(nextError);
      persistMessages(optimisticMessages);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    persistMessages([]);
    setError("");
  }

  function convertToCodexPrompt() {
    if (!lastOracleResponse) return;
    setMode("Codex Prompt Builder");
    setMessage(createPromptFromResponse(lastOracleResponse));
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-obsidian text-ivory">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(122,17,26,.32),transparent_32rem),radial-gradient(circle_at_78%_12%,rgba(181,146,85,.16),transparent_28rem),linear-gradient(180deg,#080808,#11100f_48%,#080808)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(181,146,85,.045)_1px,transparent_1px),linear-gradient(0deg,rgba(181,146,85,.035)_1px,transparent_1px)] bg-[size:88px_88px]" />
        <div className="absolute left-1/2 top-24 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full border border-gold/10 shadow-[0_0_120px_rgba(181,146,85,.08)]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1720px] flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <header className="temple-border relative overflow-hidden rounded-lg p-6 shadow-aureate">
          <div className="absolute right-8 top-6 hidden h-28 w-28 rounded-full border border-gold/20 bg-[radial-gradient(circle,rgba(181,146,85,.22),transparent_62%)] lg:block" />
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[.22em] text-gold">
                <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1">
                  <LockKeyhole size={14} /> Private Admin Tool
                </span>
                <span>Obsidian Console</span>
              </div>
              <h1 className="font-display text-5xl leading-none text-ivory sm:text-6xl lg:text-7xl">Aetherica Site Oracle</h1>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-parchment">
                Private intelligence layer for the Aetherica archive, podcast, instruments, and symbolic architecture.
              </p>
            </div>
            <div className="grid gap-3 text-sm text-parchment sm:grid-cols-3 lg:w-[34rem]">
              {["Site memory", "Structured output", "Codex-ready"].map((item) => (
                <div key={item} className="rounded border border-gold/20 bg-black/30 p-3">
                  <ShieldCheck className="mb-2 text-gold" size={18} />
                  <p className="font-semibold text-ivory">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[20rem_minmax(0,1fr)_24rem]">
          <aside className="temple-border rounded-lg p-4">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-black/45 text-gold">
                <BrainCircuit size={22} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[.22em] text-gold">Operating Mode</p>
                <p className="text-sm text-parchment">{modeDescriptions[mode]}</p>
              </div>
            </div>

            <div className="space-y-2">
              {oracleModes.map((oracleMode) => (
                <button
                  key={oracleMode}
                  type="button"
                  onClick={() => setMode(oracleMode)}
                  className={`focus-ring w-full rounded border px-3 py-3 text-left text-sm font-semibold transition ${
                    mode === oracleMode
                      ? "border-gold bg-gold/15 text-ivory shadow-[0_0_28px_rgba(181,146,85,.12)]"
                      : "border-gold/15 bg-black/25 text-parchment hover:border-gold/40 hover:bg-gold/10"
                  }`}
                >
                  {oracleMode}
                </button>
              ))}
            </div>

            <div className="my-6 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

            <p className="mb-3 text-xs font-semibold uppercase tracking-[.24em] text-gold">Quick Actions</p>
            <div className="grid gap-2">
              {oracleQuickActions.map((action) => {
                const Icon = actionIcons[action.label] ?? Sparkles;
                return (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() => applyAction(action)}
                    className={`focus-ring group flex items-start gap-3 rounded border p-3 text-left transition ${
                      selectedAction?.label === action.label
                        ? "border-gold/60 bg-gold/15"
                        : "border-gold/15 bg-black/25 hover:border-gold/40 hover:bg-gold/10"
                    }`}
                  >
                    <Icon className="mt-0.5 shrink-0 text-gold" size={17} />
                    <span>
                      <span className="block text-sm font-semibold text-ivory">{action.label}</span>
                      <span className="block text-xs text-limestone">{action.outputType}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <main className="grid min-h-[48rem] gap-6 lg:grid-rows-[auto_minmax(28rem,1fr)]">
            <div className="temple-border rounded-lg p-4">
              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_17rem]">
                <label className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[.24em] text-gold">Command</span>
                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Ask the Oracle to plan a page, improve copy, create SEO metadata, extract clips, or generate a Codex prompt..."
                    className="focus-ring min-h-36 w-full resize-y rounded border border-gold/20 bg-black/45 px-4 py-3 text-base leading-relaxed text-ivory placeholder:text-limestone"
                  />
                </label>
                <div className="grid gap-3">
                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[.24em] text-gold">Admin Password</span>
                    <input
                      value={adminPassword}
                      onChange={(event) => savePassword(event.target.value)}
                      type="password"
                      placeholder="Optional local lock"
                      className="focus-ring w-full rounded border border-gold/20 bg-black/45 px-3 py-3 text-ivory placeholder:text-limestone"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => submitOracleRequest()}
                    disabled={loading || !message.trim()}
                    className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded bg-gold px-5 py-3 text-sm font-bold uppercase tracking-[.18em] text-obsidian transition hover:bg-ivory disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                    Consult Oracle
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => copyText(lastOracleResponse)}
                      className="focus-ring inline-flex items-center justify-center gap-2 rounded border border-gold/25 bg-black/30 px-3 py-2 text-xs font-semibold uppercase tracking-[.14em] text-parchment hover:bg-gold/10"
                    >
                      <Copy size={15} /> Copy
                    </button>
                    <button
                      type="button"
                      onClick={clearChat}
                      className="focus-ring inline-flex items-center justify-center gap-2 rounded border border-crimson/30 bg-black/30 px-3 py-2 text-xs font-semibold uppercase tracking-[.14em] text-parchment hover:bg-crimson/15"
                    >
                      <Trash2 size={15} /> Clear
                    </button>
                  </div>
                </div>
              </div>
              {error ? (
                <p className="mt-4 rounded border border-crimson/40 bg-crimson/10 px-4 py-3 text-sm text-rose-100">{error}</p>
              ) : null}
            </div>

            <div className="temple-border relative overflow-hidden rounded-lg">
              <div className="flex items-center justify-between border-b border-gold/15 px-5 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[.24em] text-gold">Oracle Output</p>
                  <p className="text-sm text-limestone">Structured results, implementation plans, prompts, and website-ready material.</p>
                </div>
                <Sparkles className="text-gold" size={20} />
              </div>
              <div className="max-h-[48rem] space-y-5 overflow-y-auto p-5">
                {messages.length === 0 ? (
                  <div className="flex min-h-96 flex-col items-center justify-center rounded border border-gold/15 bg-black/25 p-8 text-center">
                    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 bg-[radial-gradient(circle,rgba(181,146,85,.2),transparent_68%)] text-gold">
                      <BrainCircuit size={34} />
                    </div>
                    <h2 className="font-display text-3xl text-ivory">The Oracle is waiting.</h2>
                    <p className="mt-3 max-w-xl text-parchment">
                      Choose a mode, select a quick action, paste context, and ask for a structured artifact: a page plan,
                      episode package, SEO map, image prompt set, or Codex-ready implementation brief.
                    </p>
                  </div>
                ) : (
                  messages.map((item) => (
                    <article
                      key={item.id}
                      className={`rounded-lg border p-5 ${
                        item.role === "oracle"
                          ? "border-gold/25 bg-black/35 shadow-[inset_0_0_46px_rgba(181,146,85,.045)]"
                          : "border-ivory/10 bg-stone/20"
                      }`}
                    >
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="rounded-full border border-gold/25 bg-black/35 px-3 py-1 text-xs font-semibold uppercase tracking-[.18em] text-gold">
                            {item.role === "oracle" ? "Oracle" : "Owner"}
                          </span>
                          <span className="text-xs text-limestone">{item.mode}</span>
                        </div>
                        <span className="text-xs text-limestone">{formatTime(item.createdAt)}</span>
                      </div>
                      <div className="space-y-4">{item.role === "oracle" ? markdownishBlocks(item.text) : <p className="whitespace-pre-wrap text-parchment">{item.text}</p>}</div>
                    </article>
                  ))
                )}
                {loading ? (
                  <div className="rounded-lg border border-gold/25 bg-black/35 p-5 text-parchment">
                    <Loader2 className="mb-3 animate-spin text-gold" size={22} />
                    Consulting the private archive intelligence layer...
                  </div>
                ) : null}
              </div>
            </div>
          </main>

          <aside className="grid gap-6">
            <section className="temple-border rounded-lg p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[.24em] text-gold">Context Chamber</p>
              <textarea
                value={context}
                onChange={(event) => setContext(event.target.value)}
                placeholder="Paste page copy, transcript text, code, article notes, feature ideas, SEO keywords, or design instructions..."
                className="focus-ring min-h-64 w-full resize-y rounded border border-gold/20 bg-black/45 px-4 py-3 text-sm leading-relaxed text-ivory placeholder:text-limestone"
              />
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setContext("")}
                  className="focus-ring rounded border border-gold/20 bg-black/30 px-3 py-2 text-xs font-semibold uppercase tracking-[.14em] text-parchment hover:bg-gold/10"
                >
                  Clear Context
                </button>
                <button
                  type="button"
                  onClick={() => copyText(context)}
                  className="focus-ring rounded border border-gold/20 bg-black/30 px-3 py-2 text-xs font-semibold uppercase tracking-[.14em] text-parchment hover:bg-gold/10"
                >
                  Copy Context
                </button>
              </div>
            </section>

            <section className="temple-border rounded-lg p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[.24em] text-gold">Output Tools</p>
              <div className="grid gap-2">
                <button
                  type="button"
                  onClick={saveCurrentResponseAsNote}
                  className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 bg-black/30 px-3 py-3 text-sm font-semibold text-parchment hover:bg-gold/10"
                >
                  <Plus size={16} /> Save as Note
                </button>
                <button
                  type="button"
                  onClick={convertToCodexPrompt}
                  className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 bg-black/30 px-3 py-3 text-sm font-semibold text-parchment hover:bg-gold/10"
                >
                  <TerminalSquare size={16} /> Convert to Codex Prompt
                </button>
                <button
                  type="button"
                  onClick={() => setMessage(oracleQuickActions.find((item) => item.label === "Build SEO Metadata")?.prompt ?? "")}
                  className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 bg-black/30 px-3 py-3 text-sm font-semibold text-parchment hover:bg-gold/10"
                >
                  <FileJson size={16} /> Generate SEO Metadata
                </button>
                <button
                  type="button"
                  onClick={() => setMessage(oracleQuickActions.find((item) => item.label === "Create Image Prompts")?.prompt ?? "")}
                  className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 bg-black/30 px-3 py-3 text-sm font-semibold text-parchment hover:bg-gold/10"
                >
                  <ImageIcon size={16} /> Generate Image Prompts
                </button>
              </div>
              <label className="mt-4 block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[.2em] text-gold">Save Category</span>
                <select
                  value={noteCategory}
                  onChange={(event) => setNoteCategory(event.target.value as OracleNoteCategory)}
                  className="focus-ring w-full rounded border border-gold/20 bg-black/45 px-3 py-3 text-ivory"
                >
                  {noteCategories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </label>
            </section>

            <section className="temple-border rounded-lg p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[.24em] text-gold">Project Notes</p>
                <Clipboard size={16} className="text-gold" />
              </div>
              <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
                {notes.length === 0 ? (
                  <p className="rounded border border-gold/15 bg-black/25 p-4 text-sm text-limestone">
                    Saved Oracle outputs will appear here as local private notes for future pages, instruments, episodes, and Codex prompts.
                  </p>
                ) : (
                  notes.map((note) => (
                    <article key={note.id} className="rounded border border-gold/15 bg-black/30 p-3">
                      <div className="mb-2 flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-ivory">{note.title}</p>
                          <p className="text-xs uppercase tracking-[.16em] text-gold">{note.category}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyText(note.body)}
                          className="focus-ring rounded p-1 text-limestone hover:bg-gold/10 hover:text-gold"
                          aria-label="Copy note"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                      <p className="line-clamp-3 text-xs leading-relaxed text-limestone">{note.body}</p>
                    </article>
                  ))
                )}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}
