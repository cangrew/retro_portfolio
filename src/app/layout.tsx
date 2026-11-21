import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";
import { jetbrainsMono } from "@/lib/fonts";
import { ThemeProvider } from "@/lib/theme/theme-provider";
import Navigation from "@/components/navigation";
import I3StatusBar from "@/components/arch/i3-status-bar";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: {
    default: "andresddelgado.com",
    template: "%s | andresddelgado.com",
  },
  description: "Portfolio Website",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // next-themes sets data-theme on <html> before hydration.
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <body className="bg-canvas font-mono text-fg">
        <ThemeProvider>
          <TooltipProvider>
            <Navigation />
            <div className="relative z-10">{children}</div>
            <I3StatusBar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
