import type { Level } from "./severity";

/**
 * PLACEHOLDER CONTENT — structure for design review, not published analysis.
 * Replace with MDX-backed entries before launch. See README.
 */

export type ResearchType = "Brief" | "Assessment" | "Forecast" | "Watchlist";

export type ResearchItem = {
  slug: string;
  type: ResearchType;
  category: string;
  region: string;
  title: string;
  standfirst: string;
  author: string;
  date: string;
  readTime: number;
  level?: Level;
  keyJudgments: string[];
  body: string[];
};

export const research: ResearchItem[] = [
  {
    slug: "chokepoint-premium",
    type: "Assessment",
    category: "Trade Policy",
    region: "Middle East",
    title: "The Chokepoint Premium: Pricing Maritime Risk Before the Rate Moves",
    standfirst:
      "War-risk premiums move before charter rates do. For shippers and their insurers, that gap is the earliest reliable signal that a political event has become a cost line.",
    author: "Threshold Realities",
    date: "2026-09-18",
    readTime: 9,
    level: "high",
    keyJudgments: [
      "Insurance repricing leads freight repricing by roughly two to three weeks in the current cycle, giving planners a usable window.",
      "Rerouting decisions are being made at the charterer level rather than centrally, which means exposure is uneven across a single client's own trade lanes.",
      "The binding constraint on a return to normal routing is underwriter confidence, not the security picture itself.",
    ],
    body: [
      "Maritime chokepoints concentrate a disproportionate share of world trade into a handful of narrow passages. That concentration is well understood. What is less well understood by commercial teams is the order in which the cost of a disruption actually arrives.",
      "The first movement is almost never the freight rate. It is the war-risk premium, set by underwriters who are pricing a forward view of the security environment rather than reacting to realised incidents. Because those premiums are negotiated per voyage, they respond within days.",
      "For a company with exposure across multiple lanes, the practical consequence is that the aggregate picture hides the operative one. A single client can be simultaneously insulated on one route and fully exposed on another, and a board-level risk report that averages the two will mislead.",
      "Our approach is to hold the insurance signal and the routing signal separately, and to watch the spread between them. When the spread narrows, the market has absorbed the risk. When it widens quickly, a decision window is opening.",
    ],
  },
  {
    slug: "export-controls-inventory",
    type: "Forecast",
    category: "Supply Chain",
    region: "Indo-Pacific",
    title: "Export Controls Are an Inventory Problem Before They Are a Policy Problem",
    standfirst:
      "By the time a control regime is published, the commercial decisions that matter have usually already been taken. The signal sits upstream, in procurement behaviour.",
    author: "Threshold Realities",
    date: "2026-09-12",
    readTime: 11,
    level: "watch",
    keyJudgments: [
      "Forward-buying by tier-one purchasers is a more reliable leading indicator of control expansion than official consultation notices.",
      "Second-order exposure sits with tier-two and tier-three suppliers who lack the balance sheet to pre-buy and will absorb the shock later.",
      "Firms that map dependency by component rather than by supplier consistently identify exposure earlier.",
    ],
    body: [
      "Export controls are usually analysed as a legal event: a list is published, entities are added, compliance teams respond. That framing is accurate and almost always too late to be useful commercially.",
      "The earlier signal is behavioural. Procurement teams with good political intelligence begin adjusting order books well before a regime is formalised, and that adjustment is visible in lead times, in spot pricing, and in the willingness of distributors to quote forward.",
      "The firms that handle this well share one habit: they map dependency at the component level rather than the supplier level. A supplier map tells you who you buy from. A component map tells you what you cannot substitute, which is the only question that matters when a control lands.",
      "Our forecast work on this theme is deliberately framed around triggers rather than dates. A date is a guess. A trigger is something a client can monitor and act on.",
    ],
  },
  {
    slug: "sanctions-counterparty",
    type: "Brief",
    category: "Sanctions",
    region: "Americas",
    title: "When Licensing Ambiguity Costs More Than Sanctions Themselves",
    standfirst:
      "In several contested markets the binding constraint on investment is not prohibition. It is the absence of a clear, durable answer about what is permitted.",
    author: "Threshold Realities",
    date: "2026-09-05",
    readTime: 6,
    level: "watch",
    keyJudgments: [
      "Ambiguity suppresses committed capital more effectively than an explicit prohibition, because it cannot be priced.",
      "Counterparty due diligence is the practical control, and it degrades quickly where ownership structures are opaque.",
      "Reversals of licensing policy are rarely announced cleanly; the early signal is usually procedural.",
    ],
    body: [
      "A prohibition is a known quantity. Firms can model it, price it, and route around it. Ambiguity is harder, because it cannot be put on a balance sheet.",
      "We consistently find that the cost of unclear licensing is borne not in blocked transactions but in transactions that are never proposed. That cost is invisible in most risk reporting.",
      "The practical recommendation is unglamorous: invest in counterparty mapping early, maintain it continuously, and treat ownership opacity itself as a risk indicator rather than an obstacle to diligence.",
    ],
  },
  {
    slug: "critical-minerals-watchlist",
    type: "Watchlist",
    category: "Commodities",
    region: "Africa",
    title: "Critical Minerals: Six Jurisdictions to Watch Through 2027",
    standfirst:
      "Resource nationalism, community consent and transport security are converging on the same set of corridors. A structured watchlist of where contract terms are most likely to move.",
    author: "Threshold Realities",
    date: "2026-08-28",
    readTime: 8,
    level: "elevated",
    keyJudgments: [
      "Fiscal-term renegotiation is more likely than outright expropriation in every jurisdiction reviewed.",
      "Transport corridors, not mine sites, are where operational risk is concentrated.",
      "Community consent processes are becoming the practical determinant of project timelines.",
    ],
    body: [
      "The critical-minerals conversation is dominated by reserves and by processing capacity. Both matter. Neither is where most operators actually lose money.",
      "Across the jurisdictions in this watchlist, the recurring pattern is that the asset is secure and the route is not. Blockades, road conditions, informal levies and border friction are the costs that show up quarter after quarter.",
      "This watchlist is structured around contract-term risk: where fiscal terms, permitting and consent processes are most likely to move within the forecast window, and what would have to be observed for us to change that view.",
    ],
  },
  {
    slug: "measuring-political-risk",
    type: "Assessment",
    category: "International Relations",
    region: "Global",
    title: "Measuring Political Risk Without Pretending to Predict Politics",
    standfirst:
      "Forecasting elections and coups is mostly theatre. Forecasting the commercial consequences of a range of political outcomes is tractable, and considerably more useful.",
    author: "Threshold Realities",
    date: "2026-08-20",
    readTime: 12,
    keyJudgments: [
      "Scenario-conditional exposure modelling outperforms point prediction for every commercial use case we have tested.",
      "Confidence bands are only credible where the method for assigning them is published.",
      "Scoring forecasts after the fact is the single cheapest way for a research firm to build institutional trust.",
    ],
    body: [
      "There is a durable market for confident political prediction, and it is mostly a market for reassurance. Clients rarely need to know who will win. They need to know what changes for them under each plausible outcome, and how much warning they will get.",
      "We frame our work accordingly. Rather than asserting an outcome, we define the set of outcomes that are commercially distinguishable, and we model exposure under each. Where we do assign likelihood, we publish the basis for it.",
      "The discipline that makes this credible is retrospective scoring. Every forecast we publish carries triggers, and we record whether those triggers were met. Over time that record is the product.",
    ],
  },
  {
    slug: "nearshoring-second-order",
    type: "Brief",
    category: "Supply Chain",
    region: "Americas",
    title: "Nearshoring's Second-Order Risks Are Arriving on Schedule",
    standfirst:
      "Shortening a supply chain moves risk; it does not remove it. The exposures that follow relocation are predictable, and mostly local.",
    author: "Threshold Realities",
    date: "2026-08-14",
    readTime: 7,
    level: "watch",
    keyJudgments: [
      "Cargo security and labour disputes are displacing geopolitical distance as the principal operating risk.",
      "Utility and water availability are emerging as binding constraints on new industrial capacity.",
      "Firms that relocated without re-running their risk assessment are the most exposed group.",
    ],
    body: [
      "Relocation decisions taken on geopolitical grounds are frequently not revisited on operational grounds. The assumption is that a shorter chain is a safer chain.",
      "In practice the risk profile changes shape rather than shrinking. Distance risk falls. Local risk — labour, cargo theft, permitting, utilities — rises, and it is less familiar to the teams now carrying it.",
      "The remedy is straightforward and rarely done: re-run the full exposure assessment against the new footprint rather than assuming the old one still applies.",
    ],
  },
];

export const researchTypes: ResearchType[] = [
  "Brief",
  "Assessment",
  "Forecast",
  "Watchlist",
];

export const researchRegions = [...new Set(research.map((r) => r.region))].sort();

export function getResearch(slug: string) {
  return research.find((r) => r.slug === slug);
}
