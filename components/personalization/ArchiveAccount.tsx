"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { Check, Download, HardDrive, Trash2, Upload, UserRound } from "lucide-react";
import {
  archiveServerVersion,
  archiveStats,
  archiveVersion,
  clearKeys,
  exportArchive,
  importArchive,
  readProfile,
  subscribeArchive,
  writeProfile
} from "@/lib/archive/account";

/**
 * The Personal Archive Account surface.
 *
 * Reads nothing until mounted, because every figure it shows lives in localStorage and rendering
 * it on the server would guarantee a hydration mismatch.
 */
export function ArchiveAccount() {
  const [nameDraft, setNameDraft] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // localStorage is external state. Reading it through useSyncExternalStore keeps the server pass
  // and the hydrating client pass identical (both see -1), then swaps in real values afterwards —
  // which copying it into state inside an effect would not do safely.
  const version = useSyncExternalStore(subscribeArchive, archiveVersion, archiveServerVersion);
  const ready = version >= 0;
  const profile = ready ? readProfile() : null;
  const stats = ready ? archiveStats() : [];

  const flash = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice((current) => (current === message ? null : current)), 4000);
  };

  const createProfile = (event: React.FormEvent) => {
    event.preventDefault();
    const displayName = nameDraft.trim();
    if (!displayName) return;
    writeProfile({ displayName, createdAt: profile?.createdAt ?? new Date().toISOString() });
    setNameDraft("");
    flash(profile ? "Name updated." : "Archive opened.");
  };

  const download = () => {
    const snapshot = exportArchive();
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `aetherica-archive-${snapshot.exportedAt.slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    flash("Archive file saved.");
  };

  const onFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const result = importArchive(await file.text(), "merge");
    flash(result.message);
  };

  // Single records (profile, preferences) are settings, not things kept; only collections count.
  const totalEntries = stats.filter((stat) => !stat.single).reduce((total, stat) => total + stat.count, 0);

  if (!ready) {
    return (
      <section className="temple-border rounded p-6">
        <p className="text-sm text-parchment">Reading your archive…</p>
      </section>
    );
  }

  return (
    <section id="profile-editor" className="temple-border rounded p-6">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-gold/15 pb-5">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-[.22em] text-gold">Personal archive account</p>
          <h2 className="mt-2 font-display text-3xl text-ivory">
            {profile ? profile.displayName : "Open your archive"}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-parchment">
            {profile ? (
              <>
                Keeping {totalEntries} {totalEntries === 1 ? "entry" : "entries"} since{" "}
                {new Date(profile.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}.
              </>
            ) : (
              "Name your archive to begin. Everything you save is already being kept — this gives it an owner and somewhere to be managed from."
            )}
          </p>
        </div>
        <span className="grid size-14 shrink-0 place-items-center rounded-full border border-gold/35 bg-black/40 text-gold">
          <UserRound size={24} aria-hidden="true" />
        </span>
      </div>

      {/* Stated plainly rather than implied: this is a browser-local archive, not a synced login. */}
      <p className="mt-5 rounded border border-gold/20 bg-black/30 p-4 text-sm leading-6 text-parchment">
        <HardDrive size={15} className="mr-2 inline text-gold" aria-hidden="true" />
        This archive is stored in this browser on this device. There is no sign-in and nothing is
        sent to a server, so clearing site data will erase it. To carry it to another device — or to
        keep a backup — export the file below and import it there.
      </p>

      <form onSubmit={createProfile} className="mt-6 flex flex-wrap items-end gap-3">
        <label className="min-w-0 flex-1 text-sm text-parchment">
          <span className="mb-2 block text-xs uppercase tracking-[.18em] text-gold">
            {profile ? "Rename this archive" : "What should this archive be called?"}
          </span>
          <input
            className="focus-ring w-full rounded border border-gold/25 bg-obsidian px-3 py-2.5 text-ivory"
            value={nameDraft}
            onChange={(event) => setNameDraft(event.target.value)}
            placeholder={profile?.displayName ?? "A name for your own use"}
            maxLength={60}
          />
        </label>
        <button
          type="submit"
          disabled={!nameDraft.trim()}
          className="focus-ring min-h-11 rounded bg-gold px-5 py-2.5 text-sm font-semibold uppercase tracking-[.12em] text-obsidian transition hover:bg-ivory disabled:opacity-40"
        >
          {profile ? "Save" : "Open archive"}
        </button>
      </form>

      {notice ? (
        <p className="mt-4 inline-flex items-center gap-2 rounded border border-gold/40 bg-gold/10 px-3 py-2 text-sm text-ivory" role="status">
          <Check size={15} className="text-gold" aria-hidden="true" />
          {notice}
        </p>
      ) : null}

      <div className="mt-8">
        <h3 className="font-display text-2xl text-ivory">What the archive holds</h3>
        {stats.length ? (
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-start justify-between gap-4 rounded border border-gold/15 bg-black/30 p-4">
                <div className="min-w-0">
                  <dt className="font-display text-lg text-ivory">{stat.label}</dt>
                  <dd className="mt-1 text-xs leading-5 text-limestone">{stat.description}</dd>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="font-cinzel-brand text-2xl text-gold tabular-nums" aria-hidden={stat.single}>
                    {stat.single ? "·" : stat.count}
                  </span>
                  <button
                    type="button"
                    aria-label={`Clear ${stat.label.toLowerCase()}`}
                    title={`Clear ${stat.label.toLowerCase()}`}
                    onClick={() => {
                      if (!window.confirm(`Clear ${stat.label.toLowerCase()}? This cannot be undone.`)) return;
                      clearKeys(stat.keys);
                      flash(`${stat.label} cleared.`);
                    }}
                    className="focus-ring rounded p-2 text-parchment transition hover:bg-crimson/20 hover:text-ivory"
                  >
                    <Trash2 size={15} aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </dl>
        ) : (
          <p className="mt-3 text-sm leading-6 text-parchment">
            Nothing kept yet. Save an episode, mark a passage, or begin a listening path and it will
            be counted here.
          </p>
        )}
      </div>

      <div className="mt-8 border-t border-gold/15 pt-6">
        <h3 className="font-display text-2xl text-ivory">Move or back up this archive</h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-parchment">
          The export is a single file holding everything above. Importing merges it into whatever is
          already here, so the same file can be carried between devices without losing either side.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={download}
            className="focus-ring inline-flex min-h-11 items-center gap-2 rounded border border-gold/40 px-4 py-2.5 text-sm text-parchment transition hover:bg-gold/10 hover:text-ivory"
          >
            <Download size={16} aria-hidden="true" />
            Export archive
          </button>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="focus-ring inline-flex min-h-11 items-center gap-2 rounded border border-gold/40 px-4 py-2.5 text-sm text-parchment transition hover:bg-gold/10 hover:text-ivory"
          >
            <Upload size={16} aria-hidden="true" />
            Import archive
          </button>
          <input ref={fileRef} type="file" accept="application/json,.json" className="sr-only" onChange={onFile} />
        </div>
      </div>
    </section>
  );
}
