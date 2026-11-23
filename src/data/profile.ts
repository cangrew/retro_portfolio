/**
 * Facts about Andres that the homepage summarizes. Edit here, not in the page.
 */

export interface Entry {
  title: string;
  where: string;
  date: string;
  bullets: string[];
}

export const LINKS = [
  { label: "email", display: "andresdaviddelgado@gmail.com", href: "mailto:andresdaviddelgado@gmail.com" },
  { label: "github", display: "github.com/cangrew", href: "https://github.com/cangrew" },
  { label: "linkedin", display: "linkedin.com/in/andresddelgado", href: "https://linkedin.com/in/andresddelgado" },
  { label: "resume", display: "resume.pdf", href: "/resume/resume.pdf" },
] as const;

export const PROFILE = [
  ["role", "PhD student, computer science"],
  ["school", "University of Central Florida"],
  ["focus", "computer architecture, hardware security"],
  ["location", "Orlando, FL"],
  ["speaks", "English, Spanish, French"],
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
