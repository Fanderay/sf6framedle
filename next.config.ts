import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://wiki.supercombo.gg/images/**')],
  },
};

export default nextConfig;
