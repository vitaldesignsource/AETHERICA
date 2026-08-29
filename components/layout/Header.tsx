"use client";

import Link from "next/link";
import { ArchiveBadge } from "@/components/personalization/ArchiveBadge";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/lib/site";
import { Button } from "@/components/ui/Button";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 min-h-20 border-b border-gold/15 bg-obsidian/92 py-3 backdrop-blur">
      {/*
        The bar widens past max-w-7xl once the full nav is revealed. Keeping it at 1280px was the
        cause of the overlap: the reveal is gated on VIEWPORT width, but the space the links get is
        governed by this container, which never grew — so the 13 links needed 1265px inside a 512px
        box and, being justify-center with visible overflow, spilled ~377px over the logo on one
        side and the buttons on the other.
      */}
      <nav
        className="mx-auto flex min-h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 min-[1900px]:max-w-[120rem]"
        aria-label="Main"
      >
        <Link href="/" className="focus-ring flex shrink-0 items-center rounded" aria-label="Aetherica Podcast home">
          <span
            className="aetherica-header-word font-cinzel-brand whitespace-nowrap text-lg leading-none text-ivory sm:text-2xl"
            data-text="Ætherica Podcast"
          >
            Ætherica Podcast
          </span>
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto min-[1900px]:flex">
          {navItems.map(([label, href]) => (
            <Link key={href} href={href} className="focus-ring font-cinzel-brand whitespace-nowrap rounded px-2 py-2 text-xs text-parchment transition hover:text-ivory">
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden shrink-0 items-center gap-2 min-[1900px]:flex">
          <Link href="/search" className="focus-ring rounded p-2 text-parchment hover:text-ivory" aria-label="Search site">
            <Search size={20} />
          </Link>
          <ArchiveBadge />
          <Button href="/episodes">Listen Now</Button>
        </div>

        <div className="hidden shrink-0 items-center gap-2 xl:flex min-[1900px]:hidden">
          <Link href="/search" className="focus-ring rounded p-2 text-parchment hover:text-ivory" aria-label="Search site">
            <Search size={20} />
          </Link>
          <ArchiveBadge />
        </div>

        <button
          type="button"
          className="focus-ring rounded p-2 text-ivory min-[1900px]:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-gold/15 bg-charcoal px-4 py-4 min-[1900px]:hidden">
          <div className="font-cinzel-brand grid gap-1">
            {navItems.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="focus-ring rounded px-3 py-3 text-parchment hover:bg-ivory/5"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="grid gap-2 border-t border-gold/15 pt-3">
              <ArchiveBadge surface="menu" />
            </div>
            <Button href="/episodes">Listen Now</Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
