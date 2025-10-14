import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Allow Docker/CI builds to succeed even if ESLint finds issues.
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Force builds to run in the main process to avoid V8 crashes when
    // Next spins up worker threads inside constrained Docker builders.
    webpackBuildWorker: false,
  },
};

export default nextConfig;
