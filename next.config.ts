import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    domains: ["localhost"],
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.gif$/,
      type: "asset/resource",
    });
    return config;
  },
};

module.exports = nextConfig;

export default nextConfig;
