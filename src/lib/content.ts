/** Shared page content. Placeholder copy — edit freely, structure is the point. */

export const practices = [
  {
    code: "01",
    title: "International Relations",
    body: "State behaviour, alliance dynamics and escalation pathways, read for what they change about operating conditions rather than for their own sake.",
  },
  {
    code: "02",
    title: "Trade Policy",
    body: "Tariffs, export controls, sanctions and industrial policy, tracked from consultation through to the point they reach a purchase order.",
  },
  {
    code: "03",
    title: "Supply Chain Exposure",
    body: "Dependency mapped at component and corridor level, so that disruption can be traced to a specific line in a specific plan.",
  },
  {
    code: "04",
    title: "Energy & Commodities",
    body: "Production, transit and pricing risk across contested basins, with attention to the routes rather than only the reserves.",
  },
  {
    code: "05",
    title: "Sanctions & Compliance",
    body: "Counterparty and ownership risk in opaque markets, including the cost of licensing ambiguity as distinct from prohibition.",
  },
  {
    code: "06",
    title: "Contested Markets",
    body: "Entry, operation and exit where the state is weak, partisan or contested, and where formal risk models tend to break down.",
  },
] as const;

export const services = [
  {
    slug: "standing-intelligence",
    code: "S/01",
    title: "Standing Risk Intelligence",
    summary:
      "Continuous monitoring of your footprint, with direct access to the analyst covering your regions.",
    forWho: "Security, risk and operations teams carrying a live portfolio.",
    deliverables: [
      "Analyst-verified alerting scoped to your assets and routes",
      "Daily and weekly regional summaries",
      "Named analyst on call, with a defined response window",
      "Quarterly exposure review with the board pack written for you",
    ],
    cadence: "Continuous, annual retainer",
  },
  {
    slug: "commissioned-research",
    code: "S/02",
    title: "Commissioned Research",
    summary:
      "Bespoke deep-dives on a specific market, corridor, counterparty or policy question.",
    forWho: "Strategy, corporate development and investment committees.",
    deliverables: [
      "Scoped research question agreed in writing before work begins",
      "Primary and regional-language sourcing where it changes the answer",
      "Key judgments with stated confidence and the basis for it",
      "Presentation to your team, and a written record that outlives the meeting",
    ],
    cadence: "Four to eight weeks, fixed fee",
  },
  {
    slug: "exposure-assessment",
    code: "S/03",
    title: "Exposure Assessment",
    summary:
      "Your sites, routes, people and suppliers mapped against the risk picture, so exposure is a number rather than a feeling.",
    forWho: "Firms entering a market, or discovering they are already exposed to one.",
    deliverables: [
      "Asset and dependency map at component and corridor level",
      "Scenario-conditional exposure model",
      "Ranked mitigation options with cost and lead time attached",
      "Optional ongoing monitoring of the same footprint on the platform",
    ],
    cadence: "Six to ten weeks, fixed fee",
  },
  {
    slug: "advisory-briefings",
    code: "S/04",
    title: "Advisory & Briefings",
    summary:
      "Direct analyst time for boards, investment committees and travelling executives.",
    forWho: "Decision-makers who need judgement, not a dashboard.",
    deliverables: [
      "Pre-investment and pre-entry briefings",
      "Board and audit committee sessions",
      "Executive travel briefings with country-specific advice",
      "Crisis advisory retained on standby",
    ],
    cadence: "By engagement",
  },
] as const;

export const methodSteps = [
  {
    code: "M/01",
    title: "Collect",
    body: "Wide-aperture collection across open sources, regional-language press and official records. Breadth at this stage is cheap; missing a source is not.",
    detail: [
      "Regional-language press read in the original",
      "Official gazettes, filings and procurement records",
      "Continuous monitoring across our research areas and regions",
    ],
  },
  {
    code: "M/02",
    title: "Corroborate",
    body: "Nothing reaches a client on a single source. Each claim carries a corroboration count and a source-reliability grade, and both travel with it through every later stage.",
    detail: [
      "Minimum two independent sources for any reported fact",
      "Source reliability graded and tracked over time",
      "Single-source material is published as such, or not at all",
    ],
  },
  {
    code: "M/03",
    title: "Assess",
    body: "An analyst with regional depth converts corroborated fact into judgement — what it means, for whom, and what would change the view.",
    detail: [
      "Key judgments stated plainly and separately from reporting",
      "Confidence assigned on a published scale",
      "Alternative explanations recorded, not discarded silently",
    ],
  },
  {
    code: "M/04",
    title: "Set triggers",
    body: "Every forward-looking judgement carries escalatory triggers: specific, observable conditions marked met or not met. Without them, a forecast is difficult to act on or to assess.",
    detail: [
      "Triggers written to be observable by the client, not only by us",
      "Status tracked live and pushed when it changes",
      "Threshold crossings drive alerting, not news volume",
    ],
  },
  {
    code: "M/05",
    title: "Map to exposure",
    body: "Judgement is matched against your specific footprint. The output is not what happened; it is what it costs you, and how long you have.",
    detail: [
      "Assets, routes, people and suppliers scored individually",
      "Aggregate and concentration views held separately",
      "Mitigation options carry cost and lead time",
    ],
  },
  {
    code: "M/06",
    title: "Score",
    body: "Forecasts are reviewed after the fact and the record is kept. Where a judgement did not hold, we record why. Over time that record is the most durable evidence of method.",
    detail: [
      "Trigger hit rate recorded per forecast",
      "Lead time measured against mainstream reporting",
      "Annual accuracy review published",
    ],
  },
] as const;

export const principles = [
  {
    code: "01",
    title: "Judgement over volume",
    body: "A greater volume of alerts is not the same as better intelligence. We expect to be judged on what we set aside as much as on what we send.",
  },
  {
    code: "02",
    title: "Method in the open",
    body: "Our sourcing standards, confidence scale and trigger logic are published. A client should be able to examine how we arrived at a view.",
  },
  {
    code: "03",
    title: "Regional depth, not desk coverage",
    body: "Analysts who read the language and have worked in the region. Coverage is straightforward to claim and considerably harder to staff.",
  },
  {
    code: "04",
    title: "Scored, not asserted",
    body: "We keep the record of our forecasts, including those that did not hold. Confidence is more credible when there is a record behind it.",
  },
] as const;

/**
 * Founders, in display order.
 *
 * Portraits are resolved from disk by slug — drop a file at
 * `public/team/<slug>.jpg` (or .jpeg/.png/.webp) and it appears on the next
 * build. No code change needed. See `src/lib/portraits.ts`.
 */
export const founders = [
  {
    slug: "bhanu",
    name: "Bhanu Viswas",
    role: "Co-founder & Head of Research",
    bio: "Leads the research function and owns the analytic method — sourcing standards, confidence bands, escalatory triggers, and the discipline of scoring our own forecasts after the fact.",
    focus: "Analytic method, research standards, regional coverage",
  },
  {
    slug: "vivek",
    name: "Vivek Reddy",
    role: "Co-founder & Head of Business Strategy",
    bio: "Leads commercial strategy and client engagement — how the firm's analysis reaches the people making operating and investment decisions, and how it is scoped so that it changes them.",
    focus: "Commercial strategy, client engagement, platform direction",
  },
] as const;
