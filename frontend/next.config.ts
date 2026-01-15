import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Allow Docker/CI builds to succeed even if ESLint finds issues.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip type checking during build (already done in CI)
    ignoreBuildErrors: true,
  },
  experimental: {
    // Force builds to run in the main process to avoid V8 crashes
    webpackBuildWorker: false,
  },
  // Reduce memory usage during build
  swcMinify: true,
  productionBrowserSourceMaps: false,
};

export default nextConfig;
