import type { Metadata } from "next";
import { ArchitectConsole } from "@/components/admin/ArchitectConsole";

export const metadata: Metadata = {
  title: "The Architect | Admin",
  description: "Private Aetherica admin console for drafting, reviewing, and organizing site changes."
};

export default function ArchitectPage() {
  return <ArchitectConsole />;
}
