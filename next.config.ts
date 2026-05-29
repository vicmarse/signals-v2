import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPages ? "/signals-v2" : "",
  assetPrefix: isGitHubPages ? "/signals-v2/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
