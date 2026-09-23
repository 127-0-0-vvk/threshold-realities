import { regionalFocus, researchAreas } from "./taxonomy";

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
  email: "info@thresholdrealities.com",
  press: "press@thresholdrealities.com",
  careers: "careers@thresholdrealities.com",
} as const;

export type NavItem = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

export const nav: NavItem[] = [
  { href: "/about", label: "About Us" },
  { href: "/advisors", label: "Our Advisors" },
  { href: "/what-we-do", label: "What We Do" },
  { href: "/publications", label: "Publications" },
  {
    href: "/research-areas",
    label: "Research Areas",
    children: researchAreas.map((a) => ({
      href: `/research-areas/${a.slug}`,
      label: a.title,
    })),
  },
  {
    href: "/regional-focus",
    label: "Regional Focus",
    children: regionalFocus.map((r) => ({
      href: `/regional-focus/${r.slug}`,
      label: r.title,
    })),
  },
];

export const footerNav = [
  {
    heading: "Firm",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/advisors", label: "Our Advisors" },
      { href: "/what-we-do", label: "What We Do" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Published",
    links: [
      { href: "/publications", label: "Publications" },
      { href: "/research-areas", label: "Research Areas" },
      { href: "/regional-focus", label: "Regional Focus" },
    ],
  },
  {
    heading: "Research Areas",
    links: researchAreas
      .slice(0, 6)
      .map((a) => ({ href: `/research-areas/${a.slug}`, label: a.title })),
  },
  {
    heading: "Regional Focus",
    links: regionalFocus.map((r) => ({
      href: `/regional-focus/${r.slug}`,
      label: r.title,
    })),
  },
];
