import type { Metadata } from "next";
import { ArchitectConsole } from "@/components/admin/ArchitectConsole";

export const metadata: Metadata = {
  title: "The Architect | Admin",
  description: "Private Aetherica admin console for drafting, reviewing, and organizing site changes.",
  // Private owner-facing console. robots.txt is advisory, so refuse indexing at the page too.
  robots: { index: false, follow: false }
};

export default function ArchitectPage() {
  return <ArchitectConsole />;
}
