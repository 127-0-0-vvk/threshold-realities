/**
 * Research areas and regional focus.
 *
 * Both sets drive their nav dropdowns and their `[slug]` pages. Page bodies are
 * intentionally empty for now — add a `summary` and `sections` to an entry and
 * the page fills in. Nothing else needs changing.
 */

export type TaxonomyEntry = {
  slug: string;
  title: string;
  /** One line under the page title. Optional while the page is a stub. */
  summary?: string;
  /** Body sections. While empty, the page renders its "in preparation" state. */
  sections?: { heading: string; body: string }[];
};

export const researchAreas: TaxonomyEntry[] = [
  { slug: "international-affairs-and-foreign-policy", title: "International Affairs & Foreign Policy" },
  { slug: "defence-and-strategic-studies", title: "Defence & Strategic Studies" },
  { slug: "security-studies", title: "Security Studies" },
  { slug: "critical-minerals", title: "Critical Minerals" },
  { slug: "war-studies", title: "War Studies" },
  { slug: "climate-and-natural-studies", title: "Climate & Natural Studies" },
  { slug: "technology-and-artificial-intelligence", title: "Technology & Artificial Intelligence" },
  { slug: "energy-security", title: "Energy Security" },
  { slug: "global-trade", title: "Global Trade" },
  { slug: "infrastructure", title: "Infrastructure" },
  { slug: "space", title: "Space" },
];

export const regionalFocus: TaxonomyEntry[] = [
  { slug: "asia-pacific", title: "Asia Pacific" },
  { slug: "indo-pacific", title: "Indo-Pacific" },
  { slug: "americas", title: "Americas" },
  { slug: "west-asia", title: "West Asia" },
  { slug: "europe", title: "Europe" },
  { slug: "africa", title: "Africa" },
  { slug: "south-asia", title: "South Asia" },
];

export function getResearchArea(slug: string) {
  return researchAreas.find((a) => a.slug === slug);
}

export function getRegion(slug: string) {
  return regionalFocus.find((r) => r.slug === slug);
}

/** Publication types, in the order they appear on the Publications index. */
export const publicationTypes = [
  {
    slug: "policy-brief",
    title: "Policy Briefs",
    singular: "Policy Brief",
    body: "Short, decision-oriented pieces on a live policy question — what is changing, who it affects, and the options in front of the reader.",
  },
  {
    slug: "white-paper",
    title: "White Papers",
    singular: "White Paper",
    body: "Extended treatments that set out a position and the evidence behind it, usually on a question where we think the prevailing framing is incomplete.",
  },
  {
    slug: "working-paper",
    title: "Working Papers",
    singular: "Working Paper",
    body: "Research in progress, published to invite scrutiny before conclusions harden. Circulated for comment rather than presented as settled.",
  },
] as const;

export type PublicationType = (typeof publicationTypes)[number]["singular"];
