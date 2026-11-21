import { getAllPublications } from "@/util/publications";
import { PageHeader } from "@/components/content/page-header";
import { Section } from "@/components/ui/section";

const INTERESTS = [
  "Hardware security in Trusted Execution Environments (TEEs)",
  "Memory encryption and secure processor architecture",
  "Confidential computing on cloud and server-scale systems",
  "Microarchitectural security and side-channel resilience",
  "Computer architecture simulation (gem5)",
];

export default function ResearchPage() {
  const publications = getAllPublications();

  return (
    <main className="space-y-10">
      <PageHeader title="Research">
        Memory encryption and the secure processor stack: how Trusted Execution Environments protect confidential
        workloads on cloud hardware, and where current designs fall short.
      </PageHeader>

      <div className="grid gap-10 lg:grid-cols-2">
        <Section title="interests">
          <ul className="list-['-_'] space-y-1 pl-5 marker:text-fg-subtle">
            {INTERESTS.map((item) => (
              <li key={item} className="pl-1">
                {item}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="now">
          <p className="max-w-prose leading-relaxed">
            Memory encryption schemes for secure processors: analyzing threat models, designing defenses, and
            measuring real-world performance with gem5 on Azure across standard benchmark suites. The work targets
            server-scale TEE hardware.
          </p>
        </Section>
      </div>

      <Section title="publications" meta={`${publications.length} total`}>
        {publications.length === 0 ? (
          <p className="text-sm text-fg-muted">No publications listed yet.</p>
        ) : (
          <ol className="space-y-6">
            {publications.map((pub) => (
              <li key={pub.title} className="space-y-1">
                <p className="font-medium">
                  {pub.url ? (
                    <a href={pub.url} target="_blank" rel="noopener noreferrer">
                      {pub.title}
                    </a>
                  ) : (
                    pub.title
                  )}
                </p>
                <p className="text-sm text-fg-muted">{pub.authors.join(", ")}</p>
                <p className="text-sm text-fg-subtle">
                  {pub.venue} · {pub.year} · <span className="text-ansi-yellow">{pub.type}</span>
                </p>
                {pub.abstract && <p className="max-w-prose pt-1 text-sm leading-relaxed text-fg-muted">{pub.abstract}</p>}
              </li>
            ))}
          </ol>
        )}
      </Section>
    </main>
  );
}
