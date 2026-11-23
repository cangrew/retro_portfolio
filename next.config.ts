import type { NextConfig } from "next";
// import { withContentlayer } from "next-contentlayer2";
import createMDX from '@next/mdx'
// const { withContentlayer } = require('next-contentlayer2')

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  devIndicators: false,
  // These pages were folded into the homepage; keep old links working.
  async redirects() {
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/research", destination: "/#research", permanent: true },
      { source: "/resume", destination: "/#experience", permanent: true },
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
