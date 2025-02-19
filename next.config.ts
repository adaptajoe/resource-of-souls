import type { NextConfig } from "next";
import { Configuration } from "webpack";
const withTM = require("next-transpile-modules")(["recharts"]); // Add the module you want to transpile

const nextConfig: NextConfig = withTM({
  images: {
    unoptimized: true,
    domains: ["localhost"],
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config: Configuration) => {
    if (config.module) {
      config.module.rules?.push(
        {
          test: /\.gif$/,
          type: "asset/resource",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        }
      );
    }
    return config;
  },
});

module.exports = nextConfig;

export default nextConfig;
