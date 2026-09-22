export const site = {
  name: "Threshold Realities",
  shortName: "Threshold",
  domain: "thresholdrealities.com",
  url: "https://thresholdrealities.com",
  tagline: "Uncertain times, certain intelligence.",
  description:
    "Research, threat analysis and risk intelligence for companies and investors operating across contested markets — international relations, trade policy, supply chain exposure.",
  positioning:
    "We help clients see the point where geopolitical risk becomes commercial cost, early enough to act on it.",
  email: "intelligence@thresholdrealities.com",
  press: "press@thresholdrealities.com",
  careers: "careers@thresholdrealities.com",
} as const;

export const nav = [
  { href: "/about", label: "About" },
  { href: "/method", label: "Method" },
  { href: "/services", label: "Services" },
  { href: "/platform", label: "Platform" },
  { href: "/tracker", label: "Tracker" },
  { href: "/research", label: "Research" },
  { href: "/team", label: "Team" },
] as const;

export const footerNav = [
  {
    heading: "Firm",
    links: [
      { href: "/about", label: "About" },
      { href: "/method", label: "Method" },
      { href: "/team", label: "Team" },
      { href: "/careers", label: "Careers" },
    ],
  },
  {
    heading: "Work",
    links: [
      { href: "/services", label: "Services" },
      { href: "/platform", label: "Platform" },
      { href: "/tracker", label: "Threshold Tracker" },
    ],
  },
  {
    heading: "Published",
    links: [
      { href: "/research", label: "Research" },
      { href: "/insights", label: "Insights" },
      { href: "/contact", label: "Contact" },
    ],
  },
] as const;
