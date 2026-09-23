import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Research became Reports.
      { source: "/research", destination: "/publications", permanent: true },
      { source: "/research/:slug", destination: "/publications/:slug", permanent: true },
      // Insights folded into Analysis.
      { source: "/insights", destination: "/analysis", permanent: true },
      // Method retired; its substance now sits inside About.
      { source: "/method", destination: "/about", permanent: true },
      // Reports became Publications, under the new information architecture.
      { source: "/reports", destination: "/publications", permanent: true },
      { source: "/reports/:slug", destination: "/publications/:slug", permanent: true },
      // Services folded into What We Do; Team folded into Our Advisors.
      { source: "/services", destination: "/what-we-do", permanent: true },
      { source: "/team", destination: "/advisors", permanent: true },
    ];
  },
};

export default nextConfig;
