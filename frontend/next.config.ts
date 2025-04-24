import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    domains: [],
  }
};

export default nextConfig;
