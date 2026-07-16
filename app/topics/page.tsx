import { Section } from "@/components/ui/Section";
import { TopicPathCard } from "@/components/sections/TopicPathCard";
import { topics } from "@/lib/data/demo";

export default function TopicsPage() {
  return (
    <Section eyebrow="Topics" title="Editorial subject paths">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => (
          <TopicPathCard key={topic.slug} topic={topic} />
        ))}
      </div>
    </Section>
  );
}
