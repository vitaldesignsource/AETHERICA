import { notFound } from "next/navigation";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { events } from "@/lib/data/demo";
import { formatDate } from "@/lib/format";
import { eventJsonLd } from "@/lib/seo/structured-data";

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = events.find((item) => item.slug === slug);
  if (!event) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd(event)) }} />
      <Section eyebrow={event.type} title={event.title}>
        <article className="temple-border rounded p-6">
          {event.imageUrl ? (
            <Image src={event.imageUrl} alt="" width={1100} height={650} className="mb-6 aspect-video w-full rounded bg-obsidian object-contain" />
          ) : null}
          <p className="text-gold">{formatDate(event.startDate)} · {event.timeZone}</p>
          <p className="mt-2 text-parchment">{event.location}</p>
          <p className="mt-6 leading-8 text-parchment">{event.longDescription}</p>
          <h2 className="mt-8 font-display text-2xl text-ivory">Speakers</h2>
          <ul className="mt-3 grid gap-2 text-parchment">
            {event.speakers.map((speaker) => <li key={speaker}>{speaker}</li>)}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            {event.ticketUrl ? <a href={event.ticketUrl} className="focus-ring rounded bg-gold px-4 py-2 font-semibold text-obsidian">Get Tickets</a> : null}
            {event.sourceUrl ? <a href={event.sourceUrl} target="_blank" rel="noopener noreferrer" className="focus-ring rounded bg-gold px-4 py-2 font-semibold text-obsidian">View Source Page</a> : null}
            <a href={`/api/events/${event.slug}/ics`} className="focus-ring rounded border border-gold/50 px-4 py-2 text-sm text-ivory">Download ICS</a>
          </div>
        </article>
      </Section>
    </>
  );
}
