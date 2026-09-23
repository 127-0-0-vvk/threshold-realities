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
