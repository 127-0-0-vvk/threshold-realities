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
    body: "Wide-aperture collection across open sources, regional-language press, official records and our own monitoring platform. Breadth at this stage is cheap; missing a source is not.",
    detail: [
      "Regional-language press read in the original",
      "Official gazettes, filings and procurement records",
      "Platform monitoring across categories and asset proximity",
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
    body: "Every forward-looking judgment carries escalatory triggers: specific, observable conditions marked met or not met. A forecast without triggers is an opinion.",
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
    body: "Forecasts are reviewed after the fact and the record is kept. Where we were wrong, we say so and record why. That record is the only durable evidence of method.",
    detail: [
      "Trigger hit rate recorded per forecast",
      "Lead time measured against mainstream reporting",
      "Annual accuracy review published",
    ],
  },
] as const;

export const platformModules = [
  {
    code: "P/01",
    title: "Live monitoring",
    body: "Global event collection, deduplicated and clustered, on a map and a list that an analyst has already triaged.",
  },
  {
    code: "P/02",
    title: "Asset proximity & exposure",
    body: "Your sites and routes carry your own names. Every event is scored against them, with concentration risk held separately from aggregate.",
  },
  {
    code: "P/03",
    title: "Country & city risk ratings",
    body: "Ratings across security, infrastructure, environment, health, political and legal dimensions — each with a forecast direction, not just a level.",
  },
  {
    code: "P/04",
    title: "Forward events calendar",
    body: "Scheduled disruption before it happens: elections, strikes, port closures, major events, commemorations.",
  },
  {
    code: "P/05",
    title: "Analyst-verified alerting",
    body: "Bundled, deduplicated, scoped to your exposure. Severity means something because a person assigned it.",
  },
  {
    code: "P/06",
    title: "Escalatory triggers",
    body: "Live trigger state, not a static report. When a condition flips from not-met to met, you are told.",
  },
] as const;

export const principles = [
  {
    code: "01",
    title: "Judgement over volume",
    body: "More alerts is not more intelligence. We are measured on what we filter out as much as what we send.",
  },
  {
    code: "02",
    title: "Method in the open",
    body: "Our sourcing standards, confidence scale and trigger logic are published. A client should be able to audit how we reached a view.",
  },
  {
    code: "03",
    title: "Regional depth, not desk coverage",
    body: "Analysts who read the language and have worked the region. Coverage maps are easy to draw and hard to staff.",
  },
  {
    code: "04",
    title: "Scored, not asserted",
    body: "We keep the record of our forecasts, including the wrong ones. Confidence without a track record is marketing.",
  },
] as const;

export const team = [
  {
    name: "Analyst — Middle East & North Africa",
    region: "MENA",
    languages: "Arabic, French, English",
    focus: "Energy transit, maritime chokepoints, sanctions exposure",
  },
  {
    name: "Analyst — Indo-Pacific",
    region: "Indo-Pacific",
    languages: "Mandarin, English",
    focus: "Export controls, semiconductor supply chains, maritime security",
  },
  {
    name: "Analyst — South Asia",
    region: "South Asia",
    languages: "Hindi, Tamil, English",
    focus: "Industrial operations, civil unrest, climate disruption",
  },
  {
    name: "Analyst — Sub-Saharan Africa",
    region: "Africa",
    languages: "French, Portuguese, English",
    focus: "Extractives, corridor security, resource nationalism",
  },
  {
    name: "Analyst — Europe & Eurasia",
    region: "Europe",
    languages: "Russian, German, English",
    focus: "Sanctions, energy infrastructure, rail and transit corridors",
  },
  {
    name: "Analyst — Americas",
    region: "Americas",
    languages: "Spanish, Portuguese, English",
    focus: "Nearshoring, commodities, licensing and counterparty risk",
  },
] as const;

export const stats = [
  { value: 216, label: "Locations rated", suffix: "" },
  { value: 106, label: "Event categories", suffix: "" },
  { value: 24, label: "Analyst coverage", suffix: "/7" },
  { value: 6, label: "Practice areas", suffix: "" },
] as const;
