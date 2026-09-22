import type { Level, Trend } from "./severity";

/**
 * PLACEHOLDER CONTENT.
 *
 * These entries exist so the Threshold Tracker can be designed and reviewed.
 * They are illustrative structure, not published assessments. Every page that
 * renders this data must show the `SAMPLE_NOTICE` until an analyst-maintained
 * source replaces it.
 */
export const SAMPLE_NOTICE =
  "Illustrative sample data for design review. Not a published assessment.";

export type TrackerEntry = {
  id: string;
  theatre: string;
  region: string;
  lat: number;
  lon: number;
  level: Level;
  trend: Trend;
  updated: string;
  headline: string;
  exposure: string[];
};

export const tracker: TrackerEntry[] = [
  {
    id: "hormuz",
    theatre: "Strait of Hormuz",
    region: "Middle East",
    lat: 26.6,
    lon: 56.3,
    level: "high",
    trend: "deteriorating",
    updated: "2026-09-22",
    headline:
      "Transit insurance premiums repricing faster than charter rates; shipowners beginning to reroute.",
    exposure: ["Energy", "Shipping", "Insurance"],
  },
  {
    id: "taiwan-strait",
    theatre: "Taiwan Strait",
    region: "Indo-Pacific",
    lat: 24.5,
    lon: 119.5,
    level: "watch",
    trend: "deteriorating",
    updated: "2026-09-21",
    headline:
      "Export-control tightening is pulling forward semiconductor inventory decisions across tier-one buyers.",
    exposure: ["Semiconductors", "Electronics", "Logistics"],
  },
  {
    id: "red-sea",
    theatre: "Red Sea / Bab al-Mandeb",
    region: "Middle East",
    lat: 12.6,
    lon: 43.3,
    level: "high",
    trend: "stable",
    updated: "2026-09-22",
    headline:
      "Cape routing now the planning assumption for Asia–Europe container traffic; lead times structurally longer.",
    exposure: ["Shipping", "Retail", "Manufacturing"],
  },
  {
    id: "sahel",
    theatre: "Central Sahel",
    region: "Africa",
    lat: 14.5,
    lon: 0.5,
    level: "critical",
    trend: "deteriorating",
    updated: "2026-09-20",
    headline:
      "Overland supply corridors intermittently closed; mine-site rotations increasingly dependent on air charter.",
    exposure: ["Mining", "Energy", "NGO operations"],
  },
  {
    id: "eastern-europe",
    theatre: "Eastern Europe",
    region: "Europe",
    lat: 49.5,
    lon: 31.5,
    level: "high",
    trend: "stable",
    updated: "2026-09-22",
    headline:
      "Grid and logistics targeting continues to set the ceiling on industrial restart timelines.",
    exposure: ["Agriculture", "Energy", "Logistics"],
  },
  {
    id: "south-china-sea",
    theatre: "South China Sea",
    region: "Indo-Pacific",
    lat: 13.0,
    lon: 114.0,
    level: "watch",
    trend: "deteriorating",
    updated: "2026-09-19",
    headline:
      "Maritime incident frequency rising in contested fishing grounds; commercial transit unaffected so far.",
    exposure: ["Shipping", "Fisheries", "Telecoms cable"],
  },
  {
    id: "venezuela",
    theatre: "Venezuela",
    region: "Americas",
    lat: 8.0,
    lon: -66.0,
    level: "watch",
    trend: "deteriorating",
    updated: "2026-09-18",
    headline:
      "Licensing ambiguity is the binding constraint on new upstream commitments, not security.",
    exposure: ["Energy", "Commodities", "Sanctions compliance"],
  },
  {
    id: "myanmar",
    theatre: "Myanmar",
    region: "Indo-Pacific",
    lat: 21.0,
    lon: 96.0,
    level: "critical",
    trend: "stable",
    updated: "2026-09-17",
    headline:
      "Border trade corridors fragmented across competing authorities; counterparty risk now the primary exposure.",
    exposure: ["Garments", "Extractives", "Cross-border trade"],
  },
  {
    id: "horn-of-africa",
    theatre: "Horn of Africa",
    region: "Africa",
    lat: 9.0,
    lon: 41.0,
    level: "watch",
    trend: "stable",
    updated: "2026-09-16",
    headline:
      "Port access agreements remain the variable to watch for regional logistics pricing.",
    exposure: ["Ports", "Logistics", "Agriculture"],
  },
  {
    id: "korean-peninsula",
    theatre: "Korean Peninsula",
    region: "Indo-Pacific",
    lat: 38.0,
    lon: 127.5,
    level: "elevated",
    trend: "stable",
    updated: "2026-09-15",
    headline:
      "Testing cadence within expected band; no measurable effect on industrial output or shipping.",
    exposure: ["Electronics", "Shipping", "Defence supply"],
  },
  {
    id: "mexico-border",
    theatre: "Mexico — Northern States",
    region: "Americas",
    lat: 27.5,
    lon: -101.0,
    level: "watch",
    trend: "improving",
    updated: "2026-09-14",
    headline:
      "Nearshoring build-out proceeding; cargo theft on key corridors remains the principal operating cost.",
    exposure: ["Manufacturing", "Automotive", "Road freight"],
  },
  {
    id: "south-asia",
    theatre: "South Asia",
    region: "Indo-Pacific",
    lat: 22.5,
    lon: 79.0,
    level: "elevated",
    trend: "stable",
    updated: "2026-09-22",
    headline:
      "Monsoon disruption and localised unrest dominate near-term operational risk over strategic factors.",
    exposure: ["IT services", "Manufacturing", "Ports"],
  },
  {
    id: "arctic",
    theatre: "High North / Arctic",
    region: "Europe",
    lat: 71.0,
    lon: 25.0,
    level: "elevated",
    trend: "deteriorating",
    updated: "2026-09-12",
    headline:
      "Subsea infrastructure surveillance gaps are the emerging insurance question for cable and pipeline operators.",
    exposure: ["Telecoms cable", "Energy", "Shipping"],
  },
  {
    id: "andes",
    theatre: "Andean Copper Belt",
    region: "Americas",
    lat: -22.0,
    lon: -69.0,
    level: "watch",
    trend: "deteriorating",
    updated: "2026-09-11",
    headline:
      "Community blockades and water permitting are the two variables that move copper delivery schedules.",
    exposure: ["Mining", "Commodities", "Rail"],
  },
  {
    id: "gulf-of-guinea",
    theatre: "Gulf of Guinea",
    region: "Africa",
    lat: 3.0,
    lon: 5.0,
    level: "watch",
    trend: "improving",
    updated: "2026-09-10",
    headline:
      "Piracy incidents down year-on-year; crew-change logistics remain the practical constraint.",
    exposure: ["Shipping", "Energy", "Crew operations"],
  },
  {
    id: "caucasus",
    theatre: "South Caucasus",
    region: "Europe",
    lat: 41.0,
    lon: 45.0,
    level: "elevated",
    trend: "improving",
    updated: "2026-09-09",
    headline:
      "Middle Corridor volumes rising; capacity, not security, is now the limiting factor.",
    exposure: ["Rail freight", "Energy transit", "Logistics"],
  },
];

export const regions = [...new Set(tracker.map((t) => t.region))].sort();
