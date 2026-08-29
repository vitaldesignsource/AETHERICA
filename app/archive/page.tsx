import type { Metadata } from "next";

export { default } from "@/app/episodes/page";

/**
 * /archive renders the very same component as /episodes. Both URLs were also being submitted in
 * the sitemap, which asks search engines to rank two identical pages against each other. The
 * canonical names /episodes as the one to index; /archive stays fully usable for readers and in
 * the header nav.
 */
export const metadata: Metadata = {
  title: "Explore the Archive",
  description:
    "Browse every Aetherica episode — transcripts, chapters, guests, and the subjects each conversation opens.",
  alternates: { canonical: "/episodes" }
};
