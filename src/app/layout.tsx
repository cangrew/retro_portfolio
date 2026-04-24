import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";
import { pressStart2P, vt323, ibmPlexMono } from "@/lib/fonts";
import { ThemeProvider } from "@/lib/theme/theme-provider";
import CrtOverlay from "@/components/crt-overlay";
import Starfield from "@/components/starfield";
import Navigation from "@/components/navigation";
import I3StatusBar from "@/components/arch/i3-status-bar";

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

const ANTI_FLASH = `(function(){try{var t=localStorage.getItem('theme');if(t==='arch'||t==='win95')document.documentElement.dataset.theme=t;}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="win95"
      className={`${pressStart2P.variable} ${vt323.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: ANTI_FLASH }} />
      </head>
      <body
        className={`bg-retro-bg font-mono text-retro-fg${
          process.env.NODE_ENV === "development" ? " debug-screens" : ""
        }`}
      >
        <ThemeProvider>
          <Starfield />
          <Navigation />
          <div className="relative z-10">{children}</div>
          <CrtOverlay />
          <I3StatusBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
