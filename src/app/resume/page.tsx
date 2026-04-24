import RetroWindow from "@/components/retro-window";
import PixelDivider from "@/components/pixel-divider";
import NeonButton from "@/components/neon-button";

export default function ResumePage() {
  return (
    <main className="relative z-10 min-h-screen pt-20 pb-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <RetroWindow title="RESUME.TXT">

          {/* Header */}
          <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
            <div>
              <div
                className="font-vt text-vt-2xl text-retro-green"
                style={{ textShadow: "0 0 10px #39ff14" }}
              >
                ANDRES DELGADO
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-retro-fg-dim mt-1">
                <a href="mailto:andresdaviddelgado@gmail.com" className="hover:text-retro-cyan">
                  andresdaviddelgado@gmail.com
                </a>
                <span>(954) 774-4820</span>
                <a href="https://andresddelgado.com" target="_blank" rel="noopener noreferrer" className="hover:text-retro-cyan">
                  andresddelgado.com
                </a>
                <a href="https://linkedin.com/in/andresddelgado" target="_blank" rel="noopener noreferrer" className="hover:text-retro-cyan">
                  linkedin/andresddelgado
                </a>
              </div>
            </div>
            <NeonButton href="/resume/resume.pdf" color="amber" external>[↓ PDF]</NeonButton>
          </div>

          <PixelDivider variant="pixel-line" className="-mx-4" />

          <div className="space-y-6 mt-4 font-mono text-sm">

            {/* Education */}
            <section>
              <h2 className="font-pixel text-pixel-xs text-retro-cyan mb-3">EDUCATION</h2>
              <div className="space-y-3">
                <div className="retro-raised bg-retro-panel-alt p-3">
                  <div className="flex flex-wrap justify-between gap-1">
                    <span className="text-retro-green">UCF — PhD, Computer Science</span>
                    <span className="text-retro-fg-dim text-xs">Aug 2024 – present</span>
                  </div>
                  <ul className="mt-1 text-xs text-retro-fg-dim space-y-0.5 pl-2">
                    <li>▶ GPA: 3.9/4.0</li>
                    <li>▶ Parallel Arch · Resilient Systems · Adv. Security · Complexity</li>
                  </ul>
                </div>
                <div className="retro-raised bg-retro-panel-alt p-3">
                  <div className="flex flex-wrap justify-between gap-1">
                    <span className="text-retro-green">UCF — BS, Computer Science + Math Minor</span>
                    <span className="text-retro-fg-dim text-xs">Aug 2019 – Dec 2023</span>
                  </div>
                  <ul className="mt-1 text-xs text-retro-fg-dim pl-2">
                    <li>▶ GPA: 3.5/4.0</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Experience */}
            <section>
              <h2 className="font-pixel text-pixel-xs text-retro-cyan mb-3">EXPERIENCE</h2>
              <div className="space-y-3">
                {[
                  {
                    title: "Graduate Research Assistant — UCF, Orlando FL",
                    date: "May 2024 – present",
                    bullets: [
                      "Mastered gem5 architecture simulator for full-system simulation.",
                      "Contributed to Linux-based simulation frameworks for CXL interconnect.",
                      "Developed Linux modules for persistent memory management in CXL systems.",
                    ],
                  },
                  {
                    title: "Developer / Data Analyst — Findway Solutions, Orlando FL",
                    date: "May 2023 – present",
                    bullets: [
                      "Designed commissions system improving data accessibility and efficiency.",
                      "Led migration from Excel to robust database infrastructure.",
                      "Maintained IT operations across the organization.",
                    ],
                  },
                ].map((job) => (
                  <div key={job.title} className="retro-raised bg-retro-panel-alt p-3">
                    <div className="flex flex-wrap justify-between gap-1">
                      <span className="text-retro-green">{job.title}</span>
                      <span className="text-retro-fg-dim text-xs">{job.date}</span>
                    </div>
                    <ul className="mt-1 text-xs text-retro-fg-dim space-y-0.5 pl-2">
                      {job.bullets.map((b) => <li key={b}>▶ {b}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section>
              <h2 className="font-pixel text-pixel-xs text-retro-cyan mb-3">SKILLS</h2>
              <div className="retro-raised bg-retro-panel-alt p-3 space-y-1 text-xs">
                {[
                  ["Programming",    "C/C++ (Advanced), Python (Advanced), Java, TypeScript"],
                  ["Web/Frameworks", "Next.js, React, Node.js"],
                  ["Tools",         "gem5, LLVM, Git, Linux, Docker"],
                  ["Languages",     "English (Native), Spanish (Native), French (Conversational)"],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-2">
                    <span className="text-retro-green w-28 shrink-0">{k}:</span>
                    <span className="text-retro-fg-dim">{v}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Publications */}
            <section>
              <h2 className="font-pixel text-pixel-xs text-retro-cyan mb-3">PUBLICATIONS</h2>
              <div className="retro-raised bg-retro-panel-alt p-3 space-y-2 text-xs">
                <p className="text-retro-green leading-relaxed">
                  LOaPP: Improving the Performance of Persistent Memory Objects via Low-Overhead
                  at-Rest PMO Protection
                </p>
                <p className="text-retro-fg-dim">
                  Greenspan, Mustafa, Delgado, Bramham, Prats, Wallace, Heinrich, Solihin
                </p>
                <a
                  href="https://doi.org/10.1109/SEED61283.2024.00023"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-retro-cyan hover:text-retro-green"
                >
                  10.1109/SEED61283.2024.00023 · SEED 2024
                </a>
              </div>
            </section>

          </div>
        </RetroWindow>
      </div>
    </main>
  );
}
