import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { events } from "@/lib/data/demo";
import { formatDate } from "@/lib/format";

export default function EventsPage() {
  return (
    <Section eyebrow="Events" title="Appearances and gatherings">
      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="temple-border rounded p-5">
          <h2 className="font-display text-2xl text-ivory">Upcoming List</h2>
          <p className="mt-2 text-parchment">Default mobile-first view.</p>
        </div>
        <div className="temple-border rounded p-5">
          <h2 className="font-display text-2xl text-ivory">Monthly Calendar</h2>
          <p className="mt-2 text-parchment">Structured for future calendar UI.</p>
        </div>
        <div className="temple-border rounded p-5">
          <h2 className="font-display text-2xl text-ivory">Map View</h2>
          <p className="mt-2 text-parchment">Placeholder until verified venue data is supplied.</p>
        </div>
      </div>
      <div className="grid gap-5">
        {events.map((event) => (
          <article key={event.slug} className="temple-border grid gap-5 rounded p-5 md:grid-cols-[220px_1fr]">
            {event.imageUrl ? (
              <Image src={event.imageUrl} alt="" width={520} height={360} sizes="(min-width: 768px) 220px, 100vw" className="aspect-video w-full rounded bg-obsidian object-contain" />
            ) : null}
            <div>
              <p className="text-xs uppercase tracking-[.22em] text-gold">{event.status} · {event.type} · {event.timeZone}</p>
              <h2 className="mt-2 font-display text-3xl text-ivory">{event.title}</h2>
              <p className="mt-2 text-parchment">{formatDate(event.startDate)} · {event.location}</p>
              <p className="mt-4 text-parchment">{event.shortDescription}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={`/events/${event.slug}`} className="focus-ring rounded bg-gold px-4 py-2 font-semibold text-obsidian">View Details</Link>
                {event.sourceUrl ? (
                  <a href={event.sourceUrl} target="_blank" rel="noopener noreferrer" className="focus-ring rounded border border-gold/50 px-4 py-2 text-sm text-ivory">Source Page</a>
                ) : null}
                <a href={`/api/events/${event.slug}/ics`} className="focus-ring rounded border border-gold/50 px-4 py-2 text-sm text-ivory">Download ICS</a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
