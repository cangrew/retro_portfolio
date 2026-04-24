import { getAllPublications } from "@/util/publications";
import RetroWindow from "@/components/retro-window";
import PixelDivider from "@/components/pixel-divider";
import NeonButton from "@/components/neon-button";
import MatrixRain from "@/components/matrix-rain";

const INTERESTS = [
  "CXL interconnect simulation and performance characterization",
  "Persistent memory systems and protection mechanisms",
  "Memory hierarchy design and optimization",
  "Computer architecture simulation (gem5)",
];

export default function ResearchPage() {
  const publications = getAllPublications();

  return (
    <main className="relative z-10 min-h-screen pt-20 pb-8 px-4 md:px-8">
      <MatrixRain />
      <div className="max-w-4xl mx-auto space-y-6">

        <RetroWindow title="RESEARCH_INTERESTS.TXT">
          <p className="font-mono text-sm text-retro-fg leading-relaxed mb-4">
            My research focuses on simulation frameworks for the emerging{" "}
            <span className="text-neon-green">CXL (Compute Express Link)</span> interconnect
            standard, with an emphasis on memory-centric computing and heterogeneous memory
            hierarchies. I work with <span className="text-neon-cyan">gem5</span> to model and
            evaluate CXL-based memory systems at scale.
          </p>
          <ul className="space-y-2">
            {INTERESTS.map((item) => (
              <li key={item} className="flex gap-2 font-mono text-sm text-retro-fg-dim">
                <span className="text-retro-green shrink-0">▶</span>
                {item}
              </li>
            ))}
          </ul>
        </RetroWindow>

        <RetroWindow title="PUBLICATIONS.BIB" showControls={false}>
          <PixelDivider variant="pixel-line" className="-mx-4 -mt-4 mb-4" />
          {publications.length === 0 ? (
            <p className="font-mono text-sm text-retro-fg-dim">No publications listed yet.</p>
          ) : (
            <div className="space-y-4">
              {publications.map((pub, idx) => (
                <div key={idx} className="retro-raised bg-retro-panel-alt p-4 space-y-2">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <h3 className="font-pixel text-pixel-xs text-retro-green leading-relaxed flex-1">
                      {pub.url ? (
                        <a href={pub.url} target="_blank" rel="noopener noreferrer" className="hover:text-retro-cyan">
                          {pub.title}
                        </a>
                      ) : pub.title}
                    </h3>
                    <span className="shrink-0 font-pixel text-pixel-xs text-retro-amber border border-retro-amber px-2 py-0.5 uppercase">
                      {pub.type}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-retro-fg-dim">{pub.authors.join(", ")}</p>
                  <p className="font-mono text-xs text-retro-cyan">{pub.venue} · {pub.year}</p>
                  {pub.abstract && (
                    <p className="font-mono text-xs text-retro-fg leading-relaxed">{pub.abstract}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </RetroWindow>

        <RetroWindow title="ONGOING_WORK.LOG" showControls={false}>
          <p className="font-mono text-sm text-retro-fg leading-relaxed">
            Currently developing and extending simulation infrastructure for CXL memory expanders
            and disaggregated memory systems in gem5. Research goals include characterizing
            performance tradeoffs of CXL-attached memory versus local DRAM across diverse
            workload classes.
          </p>
        </RetroWindow>

        <PixelDivider variant="stars" />

        <div className="flex flex-wrap gap-3 justify-center">
          <NeonButton href="/about"    color="green">[ABOUT →]</NeonButton>
          <NeonButton href="/projects" color="cyan">[PROJECTS →]</NeonButton>
          <NeonButton href="/resume"   color="magenta">[RESUME →]</NeonButton>
        </div>

      </div>
    </main>
  );
}
