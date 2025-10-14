import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    eslint: {
    // Allow Docker/CI builds to succeed even if ESLint finds issues.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
