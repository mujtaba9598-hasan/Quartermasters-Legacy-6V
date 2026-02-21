import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === 'true'

const nextConfig: NextConfig = {
  ...(isStaticExport && { output: "export" }),
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },
};

export default nextConfig;
