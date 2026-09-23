export const LEVELS = ["stable", "elevated", "watch", "high", "critical"] as const;

export type Level = (typeof LEVELS)[number];

export const levelMeta: Record<
  Level,
  { label: string; hex: string; rank: number; definition: string }
> = {
  stable: {
    label: "Stable",
    hex: "#3f7d5c",
    rank: 1,
    definition:
      "Conditions are within normal range for the market. No change to operating posture indicated.",
  },
  elevated: {
    label: "Elevated",
    hex: "#ffdd9c",
    rank: 2,
    definition:
      "Indicators are moving. Worth monitoring; no commercial impact yet established.",
  },
  watch: {
    label: "Watch",
    hex: "#f9b637",
    rank: 3,
    definition:
      "A credible pathway to disruption exists. Contingency planning should begin.",
  },
  high: {
    label: "High",
    hex: "#fb6c00",
    rank: 4,
    definition:
      "The threshold. Geopolitical risk has become measurable commercial cost. Act now.",
  },
  critical: {
    label: "Critical",
    hex: "#e73f1e",
    rank: 5,
    definition:
      "Severe, active disruption to people, assets or trade. Crisis response applies.",
  },
};

export const trendMeta = {
  improving: { label: "Improving", glyph: "↓" },
  stable: { label: "Stable", glyph: "→" },
  deteriorating: { label: "Deteriorating", glyph: "↑" },
} as const;

export type Trend = keyof typeof trendMeta;
