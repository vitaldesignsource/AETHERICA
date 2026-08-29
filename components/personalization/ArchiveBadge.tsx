"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { UserRound } from "lucide-react";
import { archiveServerVersion, archiveVersion, readProfile, subscribeArchive } from "@/lib/archive/account";

/**
 * Header entry point to the personal archive.
 *
 * Renders the archive's name once one exists, and an invitation before that — replacing the
 * "Profile Soon" placeholder, which pointed nowhere even though the archive itself was already
 * working. Server and hydrating client both render the neutral state, so no mismatch.
 */
export function ArchiveBadge({ surface = "header" }: { surface?: "header" | "menu" }) {
  const version = useSyncExternalStore(subscribeArchive, archiveVersion, archiveServerVersion);
  const profile = version >= 0 ? readProfile() : null;

  const label = profile ? profile.displayName : "My Archive";
  const title = profile ? `Open ${profile.displayName}` : "Open your personal archive";

  if (surface === "menu") {
    return (
      <Link
        href="/library"
        className="focus-ring inline-flex items-center gap-2 rounded border border-gold/30 bg-gold/10 px-3 py-3 font-semibold text-gold"
      >
        <UserRound size={16} aria-hidden="true" />
        <span className="truncate">{label}</span>
      </Link>
    );
  }

  return (
    <Link
      href="/library"
      title={title}
      className="font-cinzel-brand focus-ring inline-flex max-w-44 items-center gap-2 rounded border border-gold/25 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-parchment/80 transition hover:border-gold/50 hover:text-ivory"
    >
      <UserRound size={14} aria-hidden="true" />
      <span className="truncate">{label}</span>
    </Link>
  );
}
