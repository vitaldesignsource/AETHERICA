"use client";

import { UserPlus } from "lucide-react";

type AccountAccessProps = {
  surface?: "header" | "panel";
};

export function AccountAccess({ surface = "panel" }: AccountAccessProps) {
  if (surface === "header") {
    return (
      <div className="hidden shrink-0 items-center gap-2 xl:flex">
        <span className="font-cinzel-brand inline-flex items-center gap-2 rounded border border-gold/30 px-3 py-2 text-sm text-parchment/80" title="Profiles and sign in are coming soon">
          <UserPlus className="h-4 w-4" aria-hidden="true" />
          Profile Soon
        </span>
      </div>
    );
  }

  return (
    <section id="profile-editor" className="temple-border rounded p-5">
      <div className="flex flex-col gap-4 border-b border-gold/15 pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Profiles coming soon</p>
          <h2 className="mt-2 font-display text-3xl text-ivory">Personal Archive Accounts</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-parchment">
            Sign up, sign in, profile editing, saved notes, instrument history, and cross-device archive sync are not available yet. This area is being reserved for the future Aetherica account system.
          </p>
        </div>
      </div>
      <div className="mt-5 rounded border border-gold/15 bg-black/25 p-4 text-sm leading-6 text-parchment">
        When accounts are enabled, listeners will be able to save episodes, bookmark timestamps, keep research notes, upload profile photos, and build a private Commonplace Book.
      </div>
    </section>
  );
}
