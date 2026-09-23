import Link from "next/link";
import { Counter } from "@/components/counter";
import { HeroVideo } from "@/components/hero-video";
import { LineMask, Reveal } from "@/components/reveal";
import { SignalStrip } from "@/components/signal-strip";
import { ThresholdRule } from "@/components/threshold-rule";
import {
  ButtonLink,
  Container,
  Section,
  SectionHead,
  SeverityTag,
  StatusBadge,
} from "@/components/ui";
import { platformModules, practices, stats } from "@/lib/content";
import { research } from "@/lib/research";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />
      <SignalStrip />
      <Threshold />
      <WhatWeDo />
      <Coverage />
      <Platform />
      <Method />
      <SelectedResearch />
      <ClosingCta />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-28 pb-16">
      <HeroVideo />

      <Container className="relative">
        <span className="eyebrow">Geopolitical risk intelligence</span>

        <h1 className="display mt-7 text-[clamp(2.75rem,9vw,8.5rem)]">
          <LineMask lines={["Uncertain times,", "certain intelligence."]} />
        </h1>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal delay={420}>
            <p className="max-w-xl text-lg leading-relaxed text-[var(--text-dim)] sm:text-xl">
              {site.positioning} Our analysts pair regional depth with structured
              analytic method, supported by our own monitoring platform.
            </p>
          </Reveal>

          <Reveal delay={540} className="flex flex-wrap gap-3">
            <ButtonLink href="/contact">Request a briefing</ButtonLink>
            <ButtonLink href="/platform" variant="ghost">
              See the platform
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const beats = [
  {
    code: "01",
    level: "elevated" as const,
    title: "A geopolitical event",
    body: "A border closes. A control list expands. A ruling party loses a state. On its own this is news, and news is not yet a business problem.",
  },
  {
    code: "02",
    level: "watch" as const,
    title: "Becomes commercial exposure",
    body: "It meets your footprint — a plant, a corridor, a counterparty, a delivery window. Exposure is specific. It has a name and a number attached to it.",
  },
  {
    code: "03",
    level: "high" as const,
    title: "Becomes cost",
    body: "Premiums reprice. Lead times stretch. A committed investment stops clearing its hurdle rate. By this point the decision window has usually closed.",
  },
];

function Threshold() {
  return (
    <Section id="threshold" className="border-t border-[var(--rule)]">
      <Container>
        <SectionHead
          eyebrow="The threshold"
          title="Most risk reporting tells you what happened. We tell you what it costs, and when."
          lede="There is a point on every timeline where a political event turns into a line on a budget. Finding that point early is the entire discipline."
        />

        <div className="mt-20 space-y-0">
          {beats.map((beat, i) => (
            <Reveal key={beat.code} delay={i * 120}>
              <div className="grid gap-6 py-10 lg:grid-cols-[auto_1fr_1.2fr] lg:items-start lg:gap-14">
                <span className="mono text-sm text-[var(--text-faint)]">
                  {beat.code}
                </span>
                <h3 className="display text-3xl sm:text-4xl">{beat.title}</h3>
                <div>
                  <p className="text-[var(--text-dim)]">{beat.body}</p>
                  <div className="mt-5">
                    <SeverityTag level={beat.level} />
                  </div>
                </div>
              </div>
              <ThresholdRule level={beat.level} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="prose-measure mt-14 text-lg text-[var(--text)]">
            We work backwards from step three so our clients can act at step one.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

const pillars = [
  {
    code: "01",
    title: "Research",
    body: "Commissioned, structured, and sourced in the region. Written to answer a question you actually asked, with the basis for every judgment shown.",
    href: "/research",
    cta: "Read our research",
  },
  {
    code: "02",
    title: "Threat Analysis",
    body: "Escalation pathways with observable triggers, marked met or not met. Analysis you can monitor against rather than simply agree with.",
    href: "/method",
    cta: "See the method",
  },
  {
    code: "03",
    title: "Risk Intelligence",
    body: "Continuous monitoring scoped to your assets, routes and people, delivered by an analyst who knows your footprint by name.",
    href: "/services",
    cta: "See our services",
  },
];

function WhatWeDo() {
  return (
    <Section className="border-t border-[var(--rule)]">
      <Container>
        <SectionHead eyebrow="What we do" title="Three disciplines, one method." />

        <div className="mt-16 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.code} delay={i * 90}>
              <Link
                href={p.href}
                className="panel ticked group flex h-full flex-col p-8 lg:p-10"
              >
                <span className="mono text-xs text-[var(--text-faint)]">
                  {p.code}
                </span>
                <h3 className="display mt-6 text-3xl">{p.title}</h3>
                <p className="mt-5 flex-1 text-[var(--text-dim)]">{p.body}</p>
                <span className="mono mt-8 inline-flex items-center gap-2 text-[0.6875rem] tracking-[0.16em] uppercase text-signal">
                  {p.cta}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-px grid gap-px sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <div className="panel p-8">
                <p className="display text-5xl text-signal">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="eyebrow mt-3">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function Coverage() {
  return (
    <Section className="border-t border-[var(--rule)]">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHead
              eyebrow="Coverage"
              title="Where we work, and what we watch."
              lede="Six practice areas, held together because in contested markets they are never separate problems."
            />
            <div className="mt-10">
              <ButtonLink href="/tracker" variant="ghost">
                Open the Threshold Tracker
              </ButtonLink>
            </div>
          </div>

          <div className="grid gap-px sm:grid-cols-2">
            {practices.map((p, i) => (
              <Reveal key={p.code} delay={i * 60}>
                <div className="panel ticked h-full p-6">
                  <span className="mono text-xs text-[var(--text-faint)]">
                    {p.code}
                  </span>
                  <h3 className="mt-4 text-lg text-[var(--text)]">{p.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-dim)]">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function Platform() {
  return (
    <Section className="border-t border-[var(--rule)] bg-ink/25">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <div>
            <div className="mb-7">
              <StatusBadge tone="watch">Coming soon</StatusBadge>
            </div>
            <SectionHead
              eyebrow="The platform"
              title="We are building the system our analysts will run on."
              lede="Most control rooms stitch together four separate products and still miss the thing that mattered, because nothing was ranking by exposure. Ours will. It is in development — here is what it will do."
            />
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/platform">See the full spec</ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                Join the early-access list
              </ButtonLink>
            </div>
          </div>

          <div className="grid gap-px sm:grid-cols-2">
            {platformModules.map((m, i) => (
              <Reveal key={m.code} delay={i * 60}>
                <div className="panel h-full p-6">
                  <span className="mono text-xs text-[var(--text-faint)]">
                    {m.code}
                  </span>
                  <h3 className="mt-4 text-base text-[var(--text)]">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-dim)]">
                    {m.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function Method() {
  return (
    <Section surface="parchment" className="border-t border-[var(--rule)]">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <SectionHead
            eyebrow="Method"
            title="A forecast without triggers is an opinion."
          />
          <div>
            <p className="text-lg leading-relaxed text-[var(--text-dim)]">
              Every forward-looking judgment we publish carries escalatory
              triggers: specific, observable conditions marked met or not met. You
              can monitor them yourself. When one flips, you hear from us — and
              afterwards, we keep the score.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-[var(--text-dim)]">
              Our sourcing standards, confidence scale and trigger logic are
              published in full. A client should be able to audit how we reached a
              view, not just read the conclusion.
            </p>
            <div className="mt-10">
              <ButtonLink href="/method" variant="ghost">
                Read the method
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function SelectedResearch() {
  const selected = research.slice(0, 3);

  return (
    <Section className="border-t border-[var(--rule)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead eyebrow="Selected research" title="Recent work." />
          <ButtonLink href="/research" variant="ghost">
            All research
          </ButtonLink>
        </div>

        <div className="mt-14 grid gap-px lg:grid-cols-3">
          {selected.map((r, i) => (
            <Reveal key={r.slug} delay={i * 90}>
              <Link
                href={`/research/${r.slug}`}
                className="panel ticked group flex h-full flex-col p-8"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="mono text-[0.625rem] tracking-[0.16em] uppercase text-signal">
                    {r.type}
                  </span>
                  {r.level ? <SeverityTag level={r.level} /> : null}
                </div>
                <h3 className="display mt-6 text-2xl leading-tight">{r.title}</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--text-dim)]">
                  {r.standfirst}
                </p>
                <div className="mono mt-8 flex items-center gap-3 text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-faint)]">
                  <span>{r.region}</span>
                  <span aria-hidden>&middot;</span>
                  <span>{r.readTime} min</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function ClosingCta() {
  return (
    <Section className="border-t border-[var(--rule)]">
      <Container>
        <ThresholdRule level="critical" label="Threshold crossed" />
        <div className="grid gap-10 pt-14 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
            <LineMask
              lines={["Know where your exposure", "sits before it prices in."]}
            />
          </h2>
          <Reveal delay={200}>
            <p className="text-[var(--text-dim)]">
              Tell us where you operate. We will come back with an initial read on
              your exposure and what we would watch first — no obligation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Request a briefing</ButtonLink>
              <ButtonLink href="/services" variant="ghost">
                See our services
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
