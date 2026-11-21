import { PageHeader } from "@/components/content/page-header";
import { Section } from "@/components/ui/section";
import { RowList } from "@/components/ui/row-list";
import { rowClass, rowMuted, rowSubtle } from "@/components/ui/row-styles";

const CHANNELS = [
  { label: "email", display: "andresdaviddelgado@gmail.com", href: "mailto:andresdaviddelgado@gmail.com" },
  { label: "github", display: "github.com/cangrew", href: "https://github.com/cangrew" },
  { label: "linkedin", display: "linkedin.com/in/andresddelgado", href: "https://linkedin.com/in/andresddelgado" },
];

export default function ContactPage() {
  return (
    <main className="space-y-10">
      <PageHeader title="Contact">Reach out on any of these. I usually reply within one to three business days.</PageHeader>

      <Section title="channels" className="max-w-2xl">
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
                  <span className={`w-20 shrink-0 ${rowSubtle}`}>{label}</span>
                  <span className="min-w-0 flex-1 truncate">{display}</span>
                  <span aria-hidden className={rowMuted}>
                    {external ? "↗" : "→"}
                  </span>
                </a>
              </li>
            );
          })}
        </RowList>
      </Section>
    </main>
  );
}
