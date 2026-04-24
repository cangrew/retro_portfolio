import type { Metadata } from "next";
import RetroWindow from "@/components/retro-window";
import BrainScene from "@/components/brain-scene";

export const metadata: Metadata = {
  title: "Brain",
  description: "Neural visualization of a digital mind",
};

export default function BrainPage() {
  return (
    <main className="relative z-10 min-h-screen pt-20 pb-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-4">
        <RetroWindow title="NEURAL.EXE :: DIGITAL MIND v1.0">
          <div className="font-mono text-xs text-retro-fg-dim -mx-4 -mt-4 mb-4 px-4 py-2 bg-retro-bg retro-inset">
            <span className="text-retro-green">$</span>{" "}
            <span className="text-retro-cyan">./neural</span>{" "}
            <span className="text-retro-fg">--render 3d --mode wireframe</span>
          </div>

          <BrainScene heightClass="h-[50vh] sm:h-[65vh]" />

          <div className="mt-3 flex flex-col sm:flex-row flex-wrap gap-x-3 sm:gap-x-6 gap-y-1 font-mono text-xs text-retro-fg-dim">
            <span><span className="text-retro-green">MODE:</span> WIREFRAME</span>
            <span><span className="text-retro-cyan">MESH:</span> BRAIN3D.GLB</span>
            <span><span className="text-retro-magenta">CORE:</span> ONLINE</span>
            <span className="animate-blink text-retro-green">█ RENDERING</span>
          </div>
        </RetroWindow>
      </div>
    </main>
  );
}
