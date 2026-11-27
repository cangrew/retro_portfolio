import { FileText, Github, Linkedin, Mail, type LucideIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { LINKS } from "@/data/profile";
import { cn } from "@/lib/utils";

/*
 * No "use client": the homepage and contact page are server components, and
 * the top bar (a client component) imports the same icons.
 */

export type LinkKind = (typeof LINKS)[number]["kind"];

export const LINK_ICONS: Record<LinkKind, LucideIcon> = {
  email: Mail,
  github: Github,
  linkedin: Linkedin,
  resume: FileText,
};

/** Names a screen reader hears; the visible label stays short. */
export const LINK_NAMES: Record<LinkKind, string> = {
  email: "Email",
  github: "GitHub",
  linkedin: "LinkedIn",
  resume: "Resume (PDF)",
};

/**
 * Opens in a new tab: outside links, and PDFs, so the resume shows in the
 * browser's viewer instead of replacing the site. mailto: stays in this tab.
 */
export function isExternal(href: string) {
  return href.startsWith("http") || href.endsWith(".pdf");
}

export function externalProps(href: string) {
  return isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

/**
 * Social and contact links as icon buttons. The first one gets the primary
 * style so the row has one clear action.
 */
export function SocialLinks({
  only,
  primary,
  className,
}: {
  /** Limit to these kinds, in LINKS order. */
  only?: readonly LinkKind[];
  /** Which link gets the primary style. */
  primary?: LinkKind;
  className?: string;
}) {
  const links = only ? LINKS.filter((l) => only.includes(l.kind)) : LINKS;
  return (
    <ul className={cn("flex flex-wrap gap-2", className)} aria-label="Links">
      {links.map((l) => {
        const Icon = LINK_ICONS[l.kind];
        const external = isExternal(l.href);
        return (
          <li key={l.kind}>
            <a
              href={l.href}
              {...externalProps(l.href)}
              className={buttonVariants({ variant: l.kind === primary ? "primary" : "secondary", size: "md" })}
            >
              <Icon aria-hidden />
              <span>{l.label}</span>
              {external && <span className="sr-only">(opens in a new tab)</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
