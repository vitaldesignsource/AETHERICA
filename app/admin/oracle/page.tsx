import type { Metadata } from "next";
import { OracleDashboard } from "@/components/oracle/OracleDashboard";

export const metadata: Metadata = {
  title: "Aetherica Site Oracle | Admin",
  description: "Private intelligence layer for the Aetherica archive, podcast, instruments, and symbolic architecture."
};

export default function OraclePage() {
  return <OracleDashboard />;
}

