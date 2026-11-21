import { PageHeader } from "@/components/content/page-header";
import { Section } from "@/components/ui/section";
import { KeyValue } from "@/components/ui/key-value";
import { buttonVariants } from "@/components/ui/button-variants";

interface Entry {
  title: string;
  where: string;
  date: string;
  bullets: string[];
}

const EDUCATION: Entry[] = [
  {
    title: "PhD, Computer Science",
    where: "University of Central Florida",
    date: "Aug 2024 – present",
    bullets: ["GPA 3.9/4.0", "Parallel architecture, resilient systems, advanced security, complexity"],
  },
  {
    title: "BS, Computer Science, minor in Mathematics",
    where: "University of Central Florida",
    date: "Aug 2019 – Dec 2023",
    bullets: ["GPA 3.5/4.0"],
  },
];

const EXPERIENCE: Entry[] = [
  {
    title: "Graduate Research Assistant",
    where: "UCF, Orlando FL",
    date: "May 2024 – present",
    bullets: [
      "Mastered the gem5 architecture simulator for full-system simulation.",
      "Contributed to Linux-based simulation frameworks for the CXL interconnect.",
      "Developed Linux modules for persistent memory management in CXL systems.",
    ],
  },
  {
    title: "Developer / Data Analyst",
    where: "Findway Solutions, Orlando FL",
    date: "May 2023 – present",
    bullets: [
      "Designed a commissions system that improved data accessibility and efficiency.",
      "Led the migration from Excel to a database.",
      "Maintained IT operations across the organization.",
    ],
  },
];

const SKILLS = [
  ["programming", "C/C++ (advanced), Python (advanced), Java, TypeScript"],
  ["web", "Next.js, React, Node.js"],
  ["tools", "gem5, LLVM, Git, Linux, Docker"],
  ["languages", "English (native), Spanish (native), French (conversational)"],
] as const;

function Entries({ entries }: { entries: Entry[] }) {
  return (
    <ul className="space-y-5">
      {entries.map((e) => (
        <li key={e.title + e.date}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <p>
              <span className="font-medium text-fg">{e.title}</span>
              <span className="text-fg-muted"> · {e.where}</span>
            </p>
            <span className="text-sm text-fg-subtle">{e.date}</span>
          </div>
          <ul className="mt-1 list-['-_'] space-y-0.5 pl-5 text-sm text-fg-muted marker:text-fg-subtle">
            {e.bullets.map((b) => (
              <li key={b} className="pl-1">
                {b}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default function ResumePage() {
  return (
    <main className="space-y-10">
      <PageHeader
        title="Resume"
        actions={
          <a href="/resume/resume.pdf" className={buttonVariants({ variant: "secondary", size: "sm" })}>
            resume.pdf ↓
          </a>
        }
      >
        Andres Delgado, PhD student in computer architecture.
      </PageHeader>

      <Section title="experience">
        <Entries entries={EXPERIENCE} />
      </Section>

      <Section title="education">
        <Entries entries={EDUCATION} />
      </Section>

      <Section title="skills">
        <KeyValue items={SKILLS} />
      </Section>

      <Section title="publications">
        <div className="space-y-1">
          <p className="font-medium">
            LOaPP: Improving the Performance of Persistent Memory Objects via Low-Overhead at-Rest PMO Protection
          </p>
          <p className="text-sm text-fg-muted">Greenspan, Mustafa, Delgado, Bramham, Prats, Wallace, Heinrich, Solihin</p>
          <p className="text-sm text-fg-subtle">
            SEED 2024 ·{" "}
            <a href="https://doi.org/10.1109/SEED61283.2024.00023" target="_blank" rel="noopener noreferrer">
              10.1109/SEED61283.2024.00023
            </a>
          </p>
        </div>
      </Section>
    </main>
  );
}
