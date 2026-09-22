import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { ThresholdRule } from "@/components/threshold-rule";
import {
  ButtonLink,
  Container,
  PageHeader,
  Section,
  SectionHead,
  StatusBadge,
} from "@/components/ui";
import { platformModules } from "@/lib/content";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Our monitoring platform, in development: live event collection, asset proximity and exposure scoring, country and city risk ratings, a forward events calendar, analyst-verified alerting and live escalatory triggers.",
};

const detail: Record<string, string[]> = {
  "P/01": [
    "Global collection across news, regional-language press, official records and hazard feeds",
    "Events deduplicated and clustered, so one incident is one record",
    "Map and list views, both already triaged by an analyst",
  ],
  "P/02": [
    "Sites, routes, people and suppliers carried under your own identifiers",
    "Configurable proximity radius per asset",
    "Concentration risk held separately from aggregate exposure",
  ],
  "P/03": [
    "Security, infrastructure, environment, health, political and legal dimensions",
    "Country, province and city level",
    "Forecast direction on every dimension, not only a level",
  ],
  "P/04": [
    "Elections, strikes, port closures, major events and commemorations",
    "Multi-day and standing disruptions shown as spans, not points",
    "Filterable by category and by proximity to your assets",
  ],
  "P/05": [
    "Bundled and deduplicated — one notification per asset per window",
    "Severity assigned by a person, never by a classifier alone",
    "Delivery by app, email, SMS, Slack, Teams or webhook",
  ],
  "P/06": [
    "Triggers are live objects with a met / not-met state",
    "You are notified on the state change, not on news volume",
    "Every trigger traces back to the judgment that set it",
  ],
};

const build = [
  {
    code: "01",
    title: "Collection and clustering",
    status: "In build",
    level: "watch" as const,
    body: "Ingestion across open sources, hazard feeds and regional-language press, with deduplication into single events.",
  },
  {
    code: "02",
    title: "Exposure scoring",
    status: "In build",
    level: "watch" as const,
    body: "Asset registers, proximity scoring and concentration risk — the layer that turns an event into your number.",
  },
  {
    code: "03",
    title: "Analyst workbench",
    status: "In design",
    level: "elevated" as const,
    body: "The triage queue, publication workflow and trigger tracking our own analysts will work in every day.",
  },
  {
    code: "04",
    title: "Client access",
    status: "Planned",
    level: "elevated" as const,
    body: "Multi-tenant access, delivery channels and reporting. Early-access clients are onboarded here first.",
  },
];

export default function PlatformPage() {
  return (
    <>
      <PageHeader
        eyebrow="The platform"
        badge={<StatusBadge tone="watch">Coming soon</StatusBadge>}
        title="We are building the system our analysts will run on."
        lede="Most control rooms stitch together four separate products and still miss the thing that mattered, because nothing was ranking by exposure. We are building the one that does. It is not live yet — here is exactly what it will do."
      />

      {/* Coming soon */}
      <Section>
        <Container>
          <Reveal>
            <div className="relative overflow-hidden border border-[var(--rule)] bg-ink/40 px-6 py-20 text-center sm:px-12 sm:py-28">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.35]"
                style={{
                  backgroundImage:
                    "linear-gradient(var(--color-meridian) 1px, transparent 1px), linear-gradient(90deg, var(--color-meridian) 1px, transparent 1px)",
                  backgroundSize: "64px 64px",
                  maskImage:
                    "radial-gradient(80% 60% at 50% 50%, black 10%, transparent 75%)",
                  WebkitMaskImage:
                    "radial-gradient(80% 60% at 50% 50%, black 10%, transparent 75%)",
                }}
                aria-hidden
              />
              <div className="relative">
                <StatusBadge tone="watch">In development</StatusBadge>
                <h2 className="display mx-auto mt-8 max-w-3xl text-4xl sm:text-5xl">
                  Coming soon.
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--text-dim)]">
                  We are onboarding a small number of early-access clients as each
                  module lands. Standing engagement clients get access first, at no
                  additional cost.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  <ButtonLink href="/contact">Join the early-access list</ButtonLink>
                  <ButtonLink href="/tracker" variant="ghost">
                    Try the public tracker
                  </ButtonLink>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* The features, highlighted */}
      <Section className="border-t border-[var(--rule)]">
        <Container>
          <SectionHead
            eyebrow="What it will do"
            title="Six capabilities, specified before a line of it was written."
            lede="These are not aspirations. Each one exists because we watched a control room fail without it."
          />

          <div className="mt-16">
            {platformModules.map((m, i) => (
              <Reveal key={m.code} delay={i * 60}>
                <div className="grid gap-6 border-t border-[var(--rule)] py-10 lg:grid-cols-[auto_1fr_1.1fr] lg:gap-14">
                  <span className="mono text-sm text-signal">{m.code}</span>
                  <div>
                    <h3 className="display text-3xl sm:text-4xl">{m.title}</h3>
                    <p className="mt-4 text-[var(--text-dim)]">{m.body}</p>
                  </div>
                  <ul className="space-y-3 lg:pt-3">
                    {(detail[m.code] ?? []).map((d) => (
                      <li
                        key={d}
                        className="flex gap-3 text-sm leading-relaxed text-[var(--text-dim)]"
                      >
                        <span className="mono mt-0.5 shrink-0 text-signal" aria-hidden>
                          &#43;
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-[var(--rule)]" />
          </div>
        </Container>
      </Section>

      {/* Build status */}
      <Section surface="parchment" className="border-t border-[var(--rule)]">
        <Container>
          <SectionHead
            eyebrow="Build status"
            title="Where it actually is."
            lede="We would rather tell you what is unfinished than show you a demo that is."
          />
          <div className="mt-14 grid gap-px sm:grid-cols-2">
            {build.map((b, i) => (
              <Reveal key={b.code} delay={i * 70}>
                <div className="panel h-full p-8">
                  <div className="flex items-center justify-between gap-4">
                    <span className="mono text-xs text-[var(--text-faint)]">
                      {b.code}
                    </span>
                    <StatusBadge tone={b.level}>{b.status}</StatusBadge>
                  </div>
                  <h3 className="display mt-6 text-2xl">{b.title}</h3>
                  <p className="mt-4 text-[var(--text-dim)]">{b.body}</p>
                  <div className="mt-6">
                    <ThresholdRule level={b.level} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* What you can use today */}
      <Section className="border-t border-[var(--rule)]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <SectionHead
              eyebrow="In the meantime"
              title="The analysis does not wait for the software."
            />
            <div className="space-y-5 text-lg leading-relaxed text-[var(--text-dim)]">
              <p>
                Everything the platform will automate, we already do by hand for
                clients on a standing engagement — exposure scoring, verified
                alerting, escalatory triggers tracked and pushed when they flip.
              </p>
              <p>
                The platform makes it faster and lets you see it yourself. It does
                not change the method, and it was never the reason to work with us.
              </p>
              <div className="flex flex-wrap gap-3 pt-3">
                <ButtonLink href="/services">See our services</ButtonLink>
                <ButtonLink href="/method" variant="ghost">
                  Read the method
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
