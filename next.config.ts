import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['img.clerk.com', 'assets.aceternity.com', 'stablediffusionweb.com'], // Add other domains here if needed
  },
};

export default nextConfig;
