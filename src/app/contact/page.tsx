import RetroWindow from "@/components/retro-window";
import PixelDivider from "@/components/pixel-divider";
import { SiGmail, SiGithub, SiLinkedin } from "react-icons/si";

const SOCIALS = [
  {
    icon: SiGmail,
    label: "EMAIL",
    display: "andresdaviddelgado@gmail.com",
    href: "mailto:andresdaviddelgado@gmail.com",
    color: "var(--retro-magenta)",
  },
  {
    icon: SiGithub,
    label: "GITHUB",
    display: "github.com/cangrew",
    href: "https://github.com/cangrew",
    color: "var(--retro-green)",
  },
  {
    icon: SiLinkedin,
    label: "LINKEDIN",
    display: "linkedin.com/in/andresddelgado",
    href: "https://linkedin.com/in/andresddelgado",
    color: "var(--retro-cyan)",
  },
];

export default function ContactPage() {
  return (
    <main className="relative z-10 min-h-screen pt-20 pb-8 px-4 md:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <RetroWindow title="CONTACT.FORM">
          <div className="font-mono text-sm text-retro-fg-dim mb-6">
            <span className="text-retro-green">&gt;</span>{" "}
            Feel free to reach out via any channel below.
          </div>

          <div className="space-y-3">
            {SOCIALS.map(({ icon: Icon, label, display, href, color }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="retro-raised bg-retro-panel-alt flex items-center gap-4 px-4 py-3 no-underline group transition-none"
              >
                <span className="font-pixel text-pixel-xs w-20 shrink-0" style={{ color }}>
                  {label}:
                </span>
                <Icon className="w-4 h-4 shrink-0" style={{ color }} />
                <span className="font-mono text-sm text-retro-fg group-hover:text-retro-cyan">
                  {display}
                </span>
                <span className="ml-auto font-pixel text-pixel-xs" style={{ color }}>[→]</span>
              </a>
            ))}
          </div>

          <PixelDivider variant="ascii" className="-mx-4 mt-6" />

          <p className="font-mono text-xs text-retro-fg-dim mt-4 text-center">
            Response time: <span className="text-retro-amber">1-3 business days</span>
          </p>
        </RetroWindow>
      </div>
    </main>
  );
}
