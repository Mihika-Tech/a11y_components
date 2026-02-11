import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/a11y_components",
  images: { unoptimized: true }
};

export default nextConfig;
