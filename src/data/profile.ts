/**
 * Facts about Andres that the homepage summarizes. Edit here, not in the page.
 */

export interface Entry {
  title: string;
  where: string;
  date: string;
  bullets: string[];
}

/** The first thing a visitor reads: who, where, what, and how much experience. */
export const HERO = {
  name: "Andres Delgado",
  role: "PhD student in computer architecture",
  org: "University of Central Florida",
  location: "Orlando, FL",
  summary:
    "I find out what confidential computing really costs. I model memory encryption and trusted execution in gem5 full-system simulations run at scale on Azure, and write Linux kernel modules for persistent memory over CXL. On the industry side, I designed the commissions system Findway Solutions runs on and moved them off Excel.",
  /** One line each, newest first. Shown beside the intro. */
  highlights: [
    ["research", "Graduate Research Assistant, UCF · 2024–now"],
    ["industry", "Developer / Data Analyst, Findway Solutions · 2023–now"],
    ["published", "LOaPP, IEEE SEED 2024"],
    ["education", "PhD CS (in progress) · BS CS + Math minor, UCF 2023"],
    ["languages", "English, Spanish, French"],
  ],
} as const;

/** Social and contact links. `kind` picks the icon; the order is the order on the page. */
export const LINKS = [
  { label: "email", kind: "email", display: "andresdaviddelgado@gmail.com", href: "mailto:andresdaviddelgado@gmail.com" },
  { label: "github", kind: "github", display: "github.com/cangrew", href: "https://github.com/cangrew" },
  { label: "linkedin", kind: "linkedin", display: "linkedin.com/in/andresddelgado", href: "https://linkedin.com/in/andresddelgado" },
  { label: "resume", kind: "resume", display: "resume.pdf", href: "/resume/resume.pdf" },
] as const;

export const EXPERIENCE: Entry[] = [
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

export const EDUCATION: Entry[] = [
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

export const SKILLS = [
  ["languages", "C/C++, Python, Java, TypeScript"],
  ["tools", "gem5, LLVM, Linux, Git, Docker"],
  ["web", "Next.js, React, Node.js"],
] as const;
