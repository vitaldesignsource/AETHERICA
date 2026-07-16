import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { hosts } from "@/lib/data/demo";

export default function HostsPage() {
  return (
    <Section eyebrow="Hosts" title="Sky Mathis and Ike Baker">
      <div className="grid gap-5 md:grid-cols-2">
        {hosts.map((host) => (
          <article key={host.slug} className="temple-border grid gap-5 rounded p-6 sm:grid-cols-[144px_1fr]">
            {host.imageUrl ? (
              <Image src={host.imageUrl} alt={host.imageAlt ?? host.name} width={288} height={288} className="aspect-square rounded object-cover" />
            ) : null}
            <div>
              <h2 className="font-display text-3xl text-ivory">{host.name}</h2>
              <p className="mt-2 text-gold">{host.role}</p>
              <p className="mt-4 text-parchment">{host.shortBio}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {host.socials.map((social) => (
                  <a
                    key={social.url}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex items-center gap-2 rounded border border-gold/25 bg-black/25 px-3 py-2 text-sm text-parchment transition hover:border-gold/55 hover:text-ivory"
                  >
                    {social.label}
                    <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
              <Link className="focus-ring mt-5 inline-flex rounded border border-gold/45 px-4 py-2 text-sm uppercase tracking-[.14em] text-gold hover:bg-gold/10 hover:text-ivory" href={`/hosts/${host.slug}`}>
                View profile
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
