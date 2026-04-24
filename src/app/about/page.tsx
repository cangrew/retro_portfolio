import RetroWindow from "@/components/retro-window";
import PixelDivider from "@/components/pixel-divider";
import NeonButton from "@/components/neon-button";

const SKILLS = [
  { label: "C / C++",     pct: 90, color: "var(--retro-green)" },
  { label: "Python",      pct: 85, color: "var(--retro-cyan)" },
  { label: "gem5 / Sim",  pct: 80, color: "var(--retro-magenta)" },
  { label: "TypeScript",  pct: 70, color: "var(--retro-amber)" },
  { label: "Linux / Sys", pct: 85, color: "var(--retro-green)" },
];

export default function AboutPage() {
  return (
    <main className="relative z-10 min-h-screen pt-20 pb-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-6">

        <RetroWindow title="ABOUT.EXE">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Stats panel */}
            <div className="retro-raised bg-retro-panel-alt p-4 space-y-3">
              <div className="retro-titlebar -mx-4 -mt-4 mb-4">
                <span>■ STATS.TXT</span>
              </div>
              {[
                ["NAME",   "Andres Delgado"],
                ["CLASS",  "PhD Student"],
                ["SCHOOL", "UCF"],
                ["CITY",   "Orlando, FL"],
                ["FOCUS",  "CXL / Arch."],
                ["LANG",   "EN / ES / FR"],
                ["MUSIC",  "Frat. President"],
              ].map(([k, v]) => (
                <div key={k} className="font-mono text-xs">
                  <span className="text-retro-green">{k}:</span>{" "}
                  <span className="text-retro-fg">{v}</span>
                </div>
              ))}
            </div>

            {/* Bio */}
            <div className="md:col-span-2 space-y-4 font-mono text-sm text-retro-fg leading-relaxed">
              <p>
                I&apos;m a computer architecture researcher interested in how memory systems
                evolve as computing becomes more heterogeneous. My focus is on{" "}
                <span className="text-neon-green">CXL (Compute Express Link)</span> — an open
                interconnect standard that enables processors to share memory with accelerators
                over a PCIe-based fabric.
              </p>
              <p>
                I work with the <span className="text-neon-cyan">gem5</span> full-system
                simulator to model CXL-based memory systems. Before the PhD I built software
                tools in industry — a CRM system for an insurance firm and data infrastructure
                projects.
              </p>
              <p>
                Outside research I play music (president of a music fraternity chapter).
                Fluent in English, Spanish, and French.
              </p>
            </div>
          </div>
        </RetroWindow>

        {/* Skills */}
        <RetroWindow title="SKILLS.DAT" showControls={false}>
          <div className="space-y-3">
            {SKILLS.map(({ label, pct, color }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="font-mono text-xs text-retro-fg w-28 shrink-0">{label}</span>
                <div className="flex-1 retro-inset bg-retro-bg h-4">
                  <div
                    className="h-full transition-none"
                    style={{ width: `${pct}%`, background: color, boxShadow: `0 0 6px ${color}` }}
                  />
                </div>
                <span className="font-vt text-vt-md w-10 text-right" style={{ color }}>
                  {pct}%
                </span>
              </div>
            ))}
          </div>
        </RetroWindow>

        <PixelDivider variant="stars" />

        <div className="flex flex-wrap gap-3 justify-center">
          <NeonButton href="/research" color="cyan">[RESEARCH &amp; PUBS →]</NeonButton>
          <NeonButton href="/resume"   color="green">[FULL RESUME →]</NeonButton>
          <NeonButton href="/projects" color="magenta">[PROJECTS →]</NeonButton>
        </div>

      </div>
    </main>
  );
}
