import type { NextConfig } from "next";

/* Post images live in Supabase Storage, so next/image has to be told the
   project host is trusted. Derived from the env var rather than hardcoded. */
function supabaseHostname(): string | null {
  const url =
    process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  try {
    return url ? new URL(url).hostname : null;
  } catch {
    return null;
  }
}

const host = supabaseHostname();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: host
      ? [{ protocol: "https", hostname: host, pathname: "/storage/v1/object/public/**" }]
      : [],
  },
  async redirects() {
    return [
      // Research became Reports.
      { source: "/research", destination: "/publications", permanent: true },
      { source: "/research/:slug", destination: "/publications/:slug", permanent: true },
      // Insights and Analysis both retired into Publications.
      { source: "/insights", destination: "/publications", permanent: true },
      { source: "/analysis", destination: "/publications", permanent: true },
      { source: "/analysis/:slug", destination: "/publications", permanent: true },
      // Platform and Tracker retired.
      { source: "/platform", destination: "/what-we-do", permanent: true },
      { source: "/tracker", destination: "/publications", permanent: true },
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
