import { getAllPublications } from "@/util/publications";
import RetroWindow from "@/components/retro-window";
import PixelDivider from "@/components/pixel-divider";
import NeonButton from "@/components/neon-button";
import MatrixRain from "@/components/matrix-rain";

const INTERESTS = [
  "Hardware security in Trusted Execution Environments (TEEs)",
  "Memory encryption and secure processor architecture",
  "Confidential computing on cloud and server-scale systems",
  "Microarchitectural security and side-channel resilience",
  "Computer architecture simulation (gem5)",
];

const GENEALOGY = [
  {
    name: "Andres Delgado",
    year: "NOW",
    degree: "PhD Student",
    school: "U. Central Florida",
    work: "Memory encryption and Trusted Execution Environments for secure processors, evaluated in gem5.",
    impact: "Strengthening confidential computing on cloud and server-scale hardware.",
    self: true,
  },
  {
    name: "Yan Solihin",
    year: "2002",
    degree: "Ph.D.",
    school: "U. Illinois Urbana-Champaign",
    work: "Invented counter-mode memory encryption and the Bonsai Merkle Tree; pioneered cache fairness and QoS.",
    impact: "Shaped Intel SGX and Cache Allocation Technology; wrote a standard multicore-architecture textbook.",
  },
  {
    name: "Josep Torrellas",
    year: "1992",
    degree: "Ph.D.",
    school: "Stanford",
    work: "Pioneered thread-level speculation and the Bulk Multicore architecture for parallel programmability.",
    impact: "Ideas influenced IBM Blue Gene and commercial shared-memory multiprocessors.",
  },
  {
    name: "John Hennessy",
    year: "1977",
    degree: "Ph.D.",
    school: "SUNY Stony Brook",
    work: "Pioneered RISC through the MIPS processor and co-wrote Computer Architecture: A Quantitative Approach.",
    impact: "2017 Turing Award; RISC underpins billions of modern chips. Later Stanford president and Alphabet chairman.",
  },
  {
    name: "Dick Kieburtz",
    year: "1961",
    degree: "Ph.D.",
    school: "U. Washington",
    work: "Advanced functional programming and formal methods; contributed to the Haskell language report.",
    impact: "ACM Fellow who shaped purely functional language design and program-transformation research.",
  },
  {
    name: "Akira Ishimaru",
    year: "1958",
    degree: "Ph.D.",
    school: "U. Washington",
    work: "Built the foundational theory of wave propagation and scattering in random media.",
    impact: "Underpins radar, remote sensing, optics, and imaging through turbulent media.",
  },
  {
    name: "Gedaliah Held",
    year: "1954",
    degree: "Ph.D.",
    school: "U.C. Berkeley",
    work: "Applied electromagnetics and microwave research at the University of Washington.",
    impact: "Mentored the next generation of wave-propagation theorists.",
  },
  {
    name: "Samuel Silver",
    year: "1940",
    degree: "Ph.D.",
    school: "MIT",
    work: "Authored Microwave Antenna Theory and Design and founded Berkeley's Space Sciences Laboratory.",
    impact: "The standard reference for antenna engineering; advanced radar and space science.",
  },
  {
    name: "John Slater",
    year: "1923",
    degree: "Ph.D.",
    school: "Harvard",
    work: "Developed the Slater determinant and the quantum theory of atoms, molecules, and solids.",
    impact: "A cornerstone of modern quantum chemistry and solid-state physics.",
  },
  {
    name: "Percy Bridgman",
    year: "1908",
    degree: "Ph.D.",
    school: "Harvard",
    work: "Founded high-pressure physics and formulated the philosophy of operationalism.",
    impact: "1946 Nobel Prize in Physics; opened materials science under extreme conditions.",
  },
  {
    name: "Wallace Sabine",
    year: "1888",
    degree: "A.M.",
    school: "Harvard",
    work: "Founded architectural acoustics and derived the reverberation-time equation.",
    impact: "Designed Boston Symphony Hall; the 'sabin' unit still bears his name.",
  },
  {
    name: "John Trowbridge",
    year: "1873",
    degree: "S.D.",
    school: "Harvard",
    work: "Built Harvard's physics research program and its Jefferson Physical Laboratory.",
    impact: "Helped turn U.S. physics into a research discipline and trained a generation of physicists.",
  },
  {
    name: "Joseph Lovering",
    year: "1833",
    degree: "A.B.",
    school: "Harvard",
    work: "Researched terrestrial magnetism, meteorology, and electricity over a 50-year professorship.",
    impact: "Advanced experimental physics in 19th-century America.",
  },
  {
    name: "Benjamin Peirce",
    year: "1829",
    degree: "A.B.",
    school: "Harvard",
    work: "Pioneered linear associative algebra and celestial mechanics.",
    impact: "A father of American mathematics; helped establish the U.S. Coast Survey.",
  },
  {
    name: "Nathaniel Bowditch",
    year: "1802",
    degree: "M.A. (Hon.)",
    school: "Harvard",
    work: "Wrote The New American Practical Navigator and translated Laplace's celestial mechanics.",
    impact: "Founded modern maritime navigation; 'Bowditch' still sails aboard U.S. Navy ships.",
  },
];

export default function ResearchPage() {
  const publications = getAllPublications();

  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none">
        <MatrixRain />
      </div>
      <main className="relative z-10 min-h-screen pt-20 pb-8 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-6">

        <RetroWindow title="RESEARCH_INTERESTS.TXT">
          <p className="font-mono text-sm text-retro-fg leading-relaxed mb-4">
            My research sits at the intersection of{" "}
            <span className="text-neon-green">computer architecture</span> and{" "}
            <span className="text-neon-magenta">hardware security</span>. I work on memory
            encryption and the secure processor stack, studying how{" "}
            <span className="text-neon-cyan">Trusted Execution Environments</span> protect
            confidential workloads on modern cloud hardware, and where current designs
            fall short. I use <span className="text-neon-cyan">gem5</span> for
            microarchitectural evaluation.
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
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
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
            Currently focused on memory encryption schemes for secure processors, analyzing
            threat models, designing defenses, and evaluating real-world performance impact
            using <span className="text-neon-cyan">gem5</span> on{" "}
            <span className="text-neon-amber">Azure</span> across standard benchmark suites.
            Work targets deployment on server-scale TEE hardware.
          </p>
        </RetroWindow>

        <RetroWindow title="ACADEMIC_GENEALOGY.TXT" showControls={false}>
          <p className="font-mono text-sm text-retro-fg leading-relaxed mb-6">
            My academic lineage &mdash; advisor to advisor &mdash; traced from today back
            through <span className="text-neon-cyan">Yan Solihin</span> and{" "}
            <span className="text-neon-magenta">Josep Torrellas</span>, then{" "}
            <span className="text-neon-green">John Hennessy</span>, all the way to the
            19th-century Harvard mathematicians. Each node lists the person&apos;s major
            contribution and its impact.
          </p>
          <ol className="relative">
            {GENEALOGY.map((person, i) => {
              const isLast = i === GENEALOGY.length - 1;
              return (
                <li key={person.name} className="relative flex gap-3 sm:gap-4">
                  {/* Year + spine rail */}
                  <div className="flex flex-col items-center shrink-0 w-12 sm:w-16">
                    <span className="font-pixel text-pixel-xs text-retro-amber leading-none text-center w-full">
                      {person.year}
                    </span>
                    <span
                      className="mt-2 w-3 h-3 rotate-45 border-2 border-retro-green bg-retro-panel shrink-0"
                      style={{ boxShadow: "0 0 6px var(--retro-green)" }}
                    />
                    {!isLast && <span className="flex-1 w-0.5 bg-retro-green/30 mt-1" />}
                  </div>
                  {/* Content */}
                  <div className={`min-w-0 ${isLast ? "" : "pb-6"}`}>
                    <p className="font-mono text-sm">
                      <span
                        className={
                          person.self
                            ? "text-neon-green font-bold"
                            : "text-retro-fg font-bold"
                        }
                      >
                        {person.name}
                      </span>
                      <span className="text-retro-fg-dim">
                        {" · "}
                        {person.degree}, {person.school}
                      </span>
                    </p>
                    <p className="font-mono text-xs sm:text-sm text-retro-fg mt-1 leading-relaxed">
                      {person.work}
                    </p>
                    <p className="font-mono text-xs text-retro-fg-dim mt-1 leading-relaxed">
                      <span className="text-retro-cyan">IMPACT ▸ </span>
                      {person.impact}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </RetroWindow>

        <PixelDivider variant="stars" />

        <div className="flex flex-wrap gap-3 justify-center">
          <NeonButton href="/about"    color="green">[ABOUT →]</NeonButton>
          <NeonButton href="/projects" color="cyan">[PROJECTS →]</NeonButton>
          <NeonButton href="/resume"   color="magenta">[RESUME →]</NeonButton>
        </div>

      </div>
      </main>
    </>
  );
}
