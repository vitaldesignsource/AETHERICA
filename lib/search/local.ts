import { episodes, topics, hosts, events, guests } from "@/lib/data/demo";

export function searchArchive(query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];

  const episodeResults = episodes.flatMap((episode) => {
    const transcriptMatches = episode.transcript
      .filter((segment) => segment.text.toLowerCase().includes(needle))
      .map((segment) => ({
        type: "Transcript",
        title: episode.title,
        href: `/episodes/${episode.slug}?t=${segment.start}#${segment.id}`,
        excerpt: segment.text,
        context: `${segment.speaker} at ${segment.start}s`
      }));

    const episodeMatch = [episode.title, episode.description, episode.guest, episode.topics.join(" ")]
      .join(" ")
      .toLowerCase()
      .includes(needle)
      ? [
          {
            type: "Episode",
            title: episode.title,
            href: `/episodes/${episode.slug}`,
            excerpt: episode.description,
            context: episode.topics.join(", ")
          }
        ]
      : [];

    return [...episodeMatch, ...transcriptMatches];
  });

  const topicResults = topics
    .filter((topic) => [topic.title, topic.definition, topic.overview].join(" ").toLowerCase().includes(needle))
    .map((topic) => ({
      type: "Topic",
      title: topic.title,
      href: `/topics/${topic.slug}`,
      excerpt: topic.definition,
      context: "Editorial topic"
    }));

  const hostResults = hosts
    .filter((host) => [host.name, host.shortBio, host.studyAreas.join(" ")].join(" ").toLowerCase().includes(needle))
    .map((host) => ({
      type: "Host",
      title: host.name,
      href: `/hosts/${host.slug}`,
      excerpt: host.shortBio,
      context: host.role
    }));

  const guestResults = guests
    .filter((guest) =>
      [guest.name, guest.shortBio, guest.longBio, guest.studyAreas.join(" "), guest.books?.map((book) => book.title).join(" ") ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    )
    .map((guest) => ({
      type: "Guest",
      title: guest.name,
      href: `/guests/${guest.slug}`,
      excerpt: guest.shortBio,
      context: guest.role
    }));

  const eventResults = events
    .filter((event) => [event.title, event.shortDescription, event.speakers.join(" ")].join(" ").toLowerCase().includes(needle))
    .map((event) => ({
      type: "Event",
      title: event.title,
      href: `/events/${event.slug}`,
      excerpt: event.shortDescription,
      context: event.location
    }));

  return [...episodeResults, ...topicResults, ...guestResults, ...hostResults, ...eventResults];
}
