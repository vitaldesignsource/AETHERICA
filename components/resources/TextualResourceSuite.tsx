"use client";

import { Copy, Gem, Languages, Save } from "lucide-react";
import { useMemo, useState } from "react";
import { analyzeGematria, hebrewLetters, transliterateHebrew } from "./textual-correspondences";

type TextualTab = "analysis" | "alphabet";
type LegacyTextualTab = TextualTab | "gematria" | "transliteration";

function normalizeTab(tab: LegacyTextualTab): TextualTab {
  return tab === "alphabet" || tab === "transliteration" ? "alphabet" : "analysis";
}

export function TextualResourceSuite({ initialTab = "analysis" }: { initialTab?: LegacyTextualTab }) {
  const [tab, setTab] = useState<TextualTab>(() => normalizeTab(initialTab));
  const [text, setText] = useState("שלום");
  const [notice, setNotice] = useState("");

  const gematria = useMemo(() => analyzeGematria(text), [text]);
  const transliteration = useMemo(() => transliterateHebrew(text), [text]);

  async function copyResult() {
    const result = `${text}\nGematria: ${gematria.total}\nTransliteration: ${transliteration}`;
    await navigator.clipboard.writeText(result);
    setNotice("Copied.");
  }

  function saveResult() {
    setNotice("Saved language notes are coming soon with sign up and login.");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[23rem_1fr]">
      <aside className="temple-border rounded p-5">
        <p className="text-xs uppercase tracking-[.24em] text-gold">Unified language controls</p>
        <div className="mt-5 grid gap-4">
          <div className="grid gap-2">
            {([
              ["analysis", "Gematria + transliteration"],
              ["alphabet", "Alphabet reference"]
            ] as Array<[TextualTab, string]>).map(([value, label]) => (
              <button key={value} className={`rounded border px-3 py-2 text-left text-sm uppercase tracking-[.14em] ${tab === value ? "border-gold bg-gold/15 text-ivory" : "border-gold/20 text-gold hover:bg-gold/10"}`} type="button" onClick={() => setTab(value)}>
                {label}
              </button>
            ))}
          </div>
          <label className="grid gap-2 text-sm text-parchment">
            Hebrew text
            <textarea className="min-h-32 rounded border border-gold/25 bg-black/45 px-3 py-3 text-2xl leading-10 text-ivory" dir="rtl" value={text} onChange={(event) => setText(event.target.value)} />
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button className="rounded border border-gold/30 p-2 text-sm text-gold hover:bg-gold/10" type="button" onClick={copyResult}>
              <Copy className="mr-2 inline" size={15} />Copy
            </button>
            <button className="rounded border border-gold/30 p-2 text-sm text-gold hover:bg-gold/10" type="button" onClick={saveResult}>
              <Save className="mr-2 inline" size={15} />Save Soon
            </button>
          </div>
          {notice ? <p className="rounded border border-gold/15 bg-black/35 px-3 py-2 text-sm text-parchment">{notice}</p> : null}
        </div>
      </aside>

      <section className="grid gap-6">
        {tab === "analysis" ? (
          <>
            <GematriaPanel text={text} total={gematria.total} ignored={gematria.ignored} letters={gematria.letters} transliteration={transliteration} />
            <TransliterationPanel text={text} transliteration={transliteration} compact />
          </>
        ) : null}
        {tab === "alphabet" ? <TransliterationPanel text={text} transliteration={transliteration} /> : null}
      </section>
    </div>
  );
}

function GematriaPanel({ text, total, ignored, letters, transliteration }: { text: string; total: number; ignored: string; letters: ReturnType<typeof analyzeGematria>["letters"]; transliteration: string }) {
  return (
    <InstrumentPanel eyebrow="Gematria and transliteration" title={`Value ${total}`} glyph="◆" icon={Gem}>
      <p className="text-4xl leading-relaxed text-ivory" dir="rtl">{text}</p>
      <p>Transliteration: {transliteration}</p>
      {ignored ? <p className="text-sm text-parchment/80">Ignored non-Hebrew characters: {ignored}</p> : null}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-left">
          <thead className="text-xs uppercase tracking-[.18em] text-gold">
            <tr className="border-b border-gold/20"><th className="py-3">Letter</th><th>Name</th><th>Sound</th><th>Value</th></tr>
          </thead>
          <tbody>
            {letters.map((letter, index) => (
              <tr key={`${letter.letter}-${index}`} className="border-b border-gold/10">
                <td className="py-3 text-2xl text-ivory">{letter.letter}</td>
                <td className="text-parchment">{letter.name}</td>
                <td className="text-parchment">{letter.transliteration}</td>
                <td className="font-display text-xl text-gold">{letter.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </InstrumentPanel>
  );
}

function TransliterationPanel({ text, transliteration, compact = false }: { text: string; transliteration: string; compact?: boolean }) {
  return (
    <InstrumentPanel eyebrow={compact ? "Study rendering" : "Hebrew alphabet reference"} title={compact ? "Transliteration" : "Letter-by-letter rendering"} glyph="א" icon={Languages}>
      <p className="text-4xl leading-relaxed text-ivory" dir="rtl">{text}</p>
      <p className="rounded border border-gold/20 bg-black/35 p-4 text-2xl text-ivory">{transliteration}</p>
      <p className="text-sm leading-7 text-parchment/80">
        This is a study helper rather than a full scholarly transliteration engine. Several Hebrew letters have multiple possible sounds depending on pointing, grammar, and tradition.
      </p>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {hebrewLetters.filter((letter) => !letter.name.includes("final")).map((letter) => (
          <div key={letter.letter} className="rounded border border-gold/15 bg-black/30 p-3">
            <span className="text-2xl text-ivory">{letter.letter}</span>
            <span className="ml-3 text-sm text-parchment">{letter.name} · {letter.transliteration}</span>
          </div>
        ))}
      </div>
    </InstrumentPanel>
  );
}

function InstrumentPanel({ eyebrow, title, glyph, icon: Icon, color = "#b59255", children }: { eyebrow: string; title: string; glyph: string; icon: typeof Gem; color?: string; children: React.ReactNode }) {
  return (
    <article className="relative isolate overflow-hidden rounded-lg border border-gold/30 bg-black/75 p-6 shadow-aureate">
      <div className="absolute inset-0 -z-10" style={{ background: `radial-gradient(circle at 82% 18%, ${color}44, transparent 18rem), linear-gradient(135deg, rgba(8,8,8,.92), rgba(122,17,26,.13))` }} />
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-xs uppercase tracking-[.24em] text-gold">{eyebrow}</p>
          <h2 className="font-manuscript-title mt-3 font-display text-5xl leading-none text-ivory">{title}</h2>
        </div>
        <span className="grid size-20 place-items-center rounded-full border border-gold/30 bg-black/40 text-4xl text-gold">
          <Icon aria-hidden="true" size={30} strokeWidth={1.25} />
          <span className="sr-only">{glyph}</span>
        </span>
      </div>
      <div className="mt-6 grid gap-4 text-parchment">{children}</div>
    </article>
  );
}
