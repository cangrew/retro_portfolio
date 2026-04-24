import type { NextConfig } from "next";
// import { withContentlayer } from "next-contentlayer2";
import createMDX from '@next/mdx'
// const { withContentlayer } = require('next-contentlayer2')

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  devIndicators: false,
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.(md|mdx)$/,
})

export default withMDX(nextConfig)

//  nextConfig;
