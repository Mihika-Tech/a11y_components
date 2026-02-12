import type { NextConfig } from "next";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubActions && repoName ? `/${repoName}` : "",
  images: { unoptimized: true }
};

export default nextConfig;
