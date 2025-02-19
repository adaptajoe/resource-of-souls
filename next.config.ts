const withTM = require("next-transpile-modules")(["some-module", "and-another"]);

const nextConfig = withTM({
  images: {
    unoptimized: true,
    domains: ["localhost"],
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config: { module: { rules: { test: RegExp; type: string }[] }; resolve: { extensions: string[] } }) => {
    config.module.rules.push({
      test: /\.gif$/,
      type: "asset/resource",
    });
    config.resolve.extensions.push(".js", ".jsx", ".ts", ".tsx");
    return config;
  },
});

module.exports = nextConfig;

export default nextConfig;
