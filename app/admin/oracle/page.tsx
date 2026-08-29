import type { Metadata } from "next";
import { OracleDashboard } from "@/components/oracle/OracleDashboard";

export const metadata: Metadata = {
  title: "Aetherica Site Oracle | Admin",
  description: "Private intelligence layer for the Aetherica archive, podcast, instruments, and symbolic architecture.",
  // Private owner-facing console. robots.txt is advisory, so refuse indexing at the page too.
  robots: { index: false, follow: false }
};

export default function OraclePage() {
  return <OracleDashboard />;
}

