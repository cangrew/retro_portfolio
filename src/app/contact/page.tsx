import { PageHeader } from "@/components/content/page-header";
import { Section } from "@/components/ui/section";
import { RowList } from "@/components/ui/row-list";
import { rowClass, rowMuted, rowSubtle } from "@/components/ui/row-styles";
import { LINKS } from "@/data/profile";

const CHANNELS = LINKS.filter((l) => l.label !== "resume");

export default function ContactPage() {
  return (
    <main className="space-y-10">
      <PageHeader title="Contact">Reach out on any of these. I usually reply within one to three business days.</PageHeader>

      <Section title="channels" className="max-w-prose">
        <RowList>
          {CHANNELS.map(({ label, display, href }) => {
            const external = !href.startsWith("mailto");
            return (
              <li key={label}>
                <a
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className={`${rowClass} min-h-[2.75rem] items-center`}
                >
                  <span className={`w-16 shrink-0 ${rowSubtle}`}>{label}</span>
                  <span className="min-w-0 break-all">{display}</span>
                  {external && (
                    <span aria-hidden className={rowMuted}>
                      ↗
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </RowList>
      </Section>
    </main>
  );
}
