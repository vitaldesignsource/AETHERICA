import Link from "next/link";
import { siteConfig, navItems } from "@/lib/site";

export function Footer() {
  return (
    <footer className="font-cinzel-brand relative isolate overflow-hidden border-t border-gold/15 bg-obsidian px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_18%_82%,rgba(181,146,85,.16),transparent_20rem),radial-gradient(circle_at_76%_18%,rgba(122,17,26,.2),transparent_22rem),linear-gradient(180deg,rgba(8,8,8,.72),rgba(8,8,8,.96))]" />
      <div className="absolute inset-0 -z-20 opacity-45 [background-image:linear-gradient(90deg,rgba(181,146,85,.08)_1px,transparent_1px),linear-gradient(0deg,rgba(181,146,85,.06)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="absolute -bottom-40 left-1/2 -z-10 size-[34rem] -translate-x-1/2 rounded-full border border-gold/10 shadow-[0_0_90px_rgba(181,146,85,.1)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_.8fr_.8fr]">
        <div>
          <p className="text-3xl text-ivory">Ætherica</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-parchment">{siteConfig.description}</p>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-[.22em] text-gold">Navigation</h2>
          <div className="mt-4 grid gap-2">
            {navItems.slice(1, 7).map(([label, href]) => (
              <Link key={href} href={href} className="text-sm text-parchment hover:text-ivory">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-sm uppercase tracking-[.22em] text-gold">Follow</h2>
          <div className="mt-4 grid gap-2">
            {siteConfig.socialLinks.length ? (
              siteConfig.socialLinks.map(([label, url]) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-parchment hover:text-ivory">
                  {label}
                </a>
              ))
            ) : (
              <p className="text-sm text-limestone">Social links are configured through environment-backed site settings.</p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
