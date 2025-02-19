import type { NextConfig } from "next";
const withTM = require("next-transpile-modules")(["recharts"]); // Add the module you want to transpile

const nextConfig: NextConfig = withTM({
  images: {
    unoptimized: true,
    domains: ["localhost"],
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config: { module: { rules: { test: RegExp; type: string }[] } }) => {
    config.module.rules.push({
      test: /\.gif$/,
      type: "asset/resource",
    });
    return config;
  },
});

module.exports = nextConfig;

export default nextConfig;
