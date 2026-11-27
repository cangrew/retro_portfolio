import { PageHeader } from "@/components/content/page-header";
import { Section } from "@/components/ui/section";
import { LINK_ICONS, LINK_NAMES, externalProps, isExternal } from "@/components/content/social-links";
import { LINKS } from "@/data/profile";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <main className="space-y-10">
      <PageHeader title="Contact">Reach out on any of these. I usually reply within one to three business days.</PageHeader>

      <Section title="channels" className="max-w-3xl">
        <ul className="grid gap-3 sm:grid-cols-2">
          {LINKS.map(({ kind, display, href }) => {
            const Icon = LINK_ICONS[kind];
            const external = isExternal(href);
            return (
              <li key={kind}>
                <a
                  href={href}
                  {...externalProps(href)}
                  className="group flex min-h-[3.5rem] items-center gap-3 border border-line px-3 py-2.5 text-fg no-underline transition-colors duration-fast hover:border-accent hover:bg-chrome hover:text-fg focus-visible:border-accent"
                >
                  <Icon aria-hidden className="size-5 shrink-0 text-fg-muted group-hover:text-accent" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold">{LINK_NAMES[kind]}</span>
                    <span className="block break-all text-xs text-fg-muted">{display}</span>
                  </span>
                  <span aria-hidden className="text-fg-subtle group-hover:text-accent">
                    {external ? "↗" : "→"}
                  </span>
                  {external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </li>
            );
          })}
        </ul>
      </Section>
    </main>
  );
}
