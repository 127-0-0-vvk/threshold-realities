import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Research became Reports.
      { source: "/research", destination: "/reports", permanent: true },
      { source: "/research/:slug", destination: "/reports/:slug", permanent: true },
      // Insights folded into Analysis.
      { source: "/insights", destination: "/analysis", permanent: true },
      // Method retired; its substance now sits inside About and Reports.
      { source: "/method", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
