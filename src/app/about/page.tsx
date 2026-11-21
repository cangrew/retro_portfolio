import Link from "next/link";
import { PageHeader } from "@/components/content/page-header";
import { Section } from "@/components/ui/section";
import { KeyValue } from "@/components/ui/key-value";
import { Meter } from "@/components/ui/meter";

const SKILLS = [
  { label: "C / C++", pct: 90 },
  { label: "Python", pct: 85 },
  { label: "Linux / Sys", pct: 85 },
  { label: "HW Security", pct: 80 },
  { label: "TypeScript", pct: 70 },
];

const FACTS = [
  ["name", "Andres Delgado"],
  ["role", "PhD student"],
  ["school", "UCF"],
  ["city", "Orlando, FL"],
  ["focus", "comp. arch, hw security"],
  ["speaks", "English, Spanish, French"],
  ["plays", "classical and electric guitar"],
  ["ΦΜΑ", "Mu Eta, spring 2021"],
] as const;

const accent = "text-accent";

export default function AboutPage() {
  return (
    <main className="space-y-10">
      <PageHeader title="About">Researcher in computer architecture and hardware security.</PageHeader>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
        <Section title="bio">
          <div className="max-w-prose space-y-4 leading-relaxed">
            <p>
              I&apos;m a computer architecture researcher focused on <span className={accent}>hardware security</span>,
              specifically how modern processors protect confidential workloads through Trusted Execution Environments
              and memory encryption. I study where these defenses succeed and where they break down.
            </p>
            <p>
              I use the gem5 full-system simulator, running large-scale experiments on Azure, to evaluate the
              microarchitectural cost of security mechanisms across real workloads. I came to the PhD directly from my
              bachelor&apos;s degree.
            </p>
            <p>
              Outside research I play classical and electric guitar. Metal and Hardcore are my genres of choice.
              I&apos;m a proud alumnus of Phi Mu Alpha Sinfonia (Mu Eta chapter), where I served as chapter president
              (2022–2023) and Assistant Collegiate Province Representative. I read a lot of science fiction and maintain
              a running interest in philosophy and religion. Fluent in English, Spanish, and French.
            </p>
          </div>
        </Section>

        <div className="min-w-0 space-y-10">
          <Section title="facts">
            <KeyValue items={FACTS} />
          </Section>
          <Section title="skills">
            <div className="space-y-1">
              {SKILLS.map((s) => (
                <Meter key={s.label} label={s.label} value={s.pct} cells={16} />
              ))}
            </div>
          </Section>
        </div>
      </div>

      <p className="text-sm text-fg-subtle">
        see also: <Link href="/research">research</Link>, <Link href="/resume">resume</Link>,{" "}
        <Link href="/projects">projects</Link>
      </p>
    </main>
  );
}
