import type { NextConfig } from "next";
// import { withContentlayer } from "next-contentlayer2";
import createMDX from '@next/mdx'
// const { withContentlayer } = require('next-contentlayer2')

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  devIndicators: false,
  // Show the resume in the browser instead of downloading it.
  async headers() {
    return [
      {
        source: "/resume/resume.pdf",
        headers: [{ key: "Content-Disposition", value: 'inline; filename="Andres-Delgado-resume.pdf"' }],
      },
    ];
  },
  // These pages were folded into the homepage; keep old links working.
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/research", destination: "/#research", permanent: true },
      // A shareable address for the resume; it opens in the browser's PDF viewer.
      { source: "/resume", destination: "/resume/resume.pdf", permanent: false },
      { source: "/brain", destination: "/", permanent: true },
    ];
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.(md|mdx)$/,
})

export default withMDX(nextConfig)

//  nextConfig;
