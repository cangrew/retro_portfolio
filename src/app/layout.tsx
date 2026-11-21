import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";
import { jetbrainsMono } from "@/lib/fonts";
import { ThemeProvider } from "@/lib/theme/theme-provider";
import { AppShell } from "@/components/shell/app-shell";
import type { SearchIndex } from "@/components/shell/site-map";
import { getAllProjects } from "@/util/mdx";
import { getAllBlogPosts } from "@/util/blog";
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

/** What the command palette can jump to, read from the MDX content at build time. */
function searchIndex(): SearchIndex {
  return {
    projects: getAllProjects().map((p) => ({ slug: p.slug, title: p.title, description: p.description })),
    posts: getAllBlogPosts().map((p) => ({ slug: p.slug, title: p.title, date: p.date })),
  };
}

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
            <AppShell index={searchIndex()}>{children}</AppShell>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
