import type { Metadata } from "next";
import BrainScene from "@/components/brain-scene";
import { PageHeader } from "@/components/content/page-header";

export const metadata: Metadata = {
  title: "Brain",
  description: "A wireframe render of a brain mesh",
};

export default function BrainPage() {
  return (
    <main className="space-y-6">
      <PageHeader title="Brain">A wireframe brain mesh, rendered live.</PageHeader>
      <BrainScene heightClass="h-[50vh] sm:h-[65vh]" />
    </main>
  );
}
