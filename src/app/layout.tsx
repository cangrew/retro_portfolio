import type { Metadata } from "next";
import "./globals.css";
import { pressStart2P, vt323, ibmPlexMono } from "@/lib/fonts";
import CrtOverlay from "@/components/crt-overlay";
import Starfield from "@/components/starfield";
import Navigation from "@/components/navigation";

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
    <html
      lang="en"
      className={`${pressStart2P.variable} ${vt323.variable} ${ibmPlexMono.variable}`}
    >
      <body
        className={`bg-retro-bg font-mono text-retro-fg${
          process.env.NODE_ENV === "development" ? " debug-screens" : ""
        }`}
      >
        <Starfield />
        <Navigation />
        <div className="relative z-10">{children}</div>
        <CrtOverlay />
      </body>
    </html>
  );
}
