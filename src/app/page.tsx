import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { HeroVideo } from "@/components/hero-video";
import { LineMask, Reveal } from "@/components/reveal";
import { SignalStrip } from "@/components/signal-strip";
import {
  ButtonLink,
  Container,
  Section,
  SectionHead,
  SeverityTag,
  StatusBadge,
} from "@/components/ui";
import { getArticles } from "@/lib/analysis";
import { platformModules } from "@/lib/content";
import { reports } from "@/lib/reports";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />
      <SignalStrip />
      <LatestAnalysis />
      <Platform />
      <SelectedReports />
      <ClosingCta />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section
      data-surface="ink"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-28 pb-16"
    >
      <HeroVideo />

      <Container className="relative">
        <span className="eyebrow text-[var(--text-dim)]">
          Geopolitical risk intelligence
        </span>

        <h1 className="display mt-7 text-[clamp(2.75rem,9vw,8.5rem)]">
          <LineMask lines={["Uncertain times,", "certain intelligence."]} />
        </h1>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <Reveal delay={420}>
            <p className="max-w-xl text-lg leading-relaxed text-[var(--text-dim)] sm:text-xl">
              {site.positioning} Our analysts combine regional depth with a
              structured analytic method, supported by our own monitoring
              platform.
            </p>
          </Reveal>

          <Reveal delay={540} className="flex flex-wrap gap-3">
            <ButtonLink href="/contact">Request a briefing</ButtonLink>
            <ButtonLink href="/analysis" variant="ghost">
              Read our analysis
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function LatestAnalysis() {
  const articles = getArticles().slice(0, 5);
  const [lead, ...rest] = articles;

  if (!lead) return null;

  return (
    <Section className="border-t border-[var(--rule)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="Latest analysis"
            title="What we are watching."
            lede="Regular commentary on developments across the markets we cover, written for readers who have to act on it."
          />
          <ButtonLink href="/analysis" variant="ghost">
            All analysis
          </ButtonLink>
        </div>

        <Reveal className="mt-14 block">
          <ArticleCard article={lead} featured />
        </Reveal>

        {rest.length ? (
          <div className="mt-px grid gap-px sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((article, i) => (
              <Reveal key={article.slug} delay={i * 70}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function Platform() {
  return (
    <Section surface="ink" className="border-t border-[var(--rule)]">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
          <div>
            <div className="mb-7">
              <StatusBadge tone="watch">Coming soon</StatusBadge>
            </div>
            <SectionHead
              eyebrow="The platform"
              title="A monitoring system built around exposure."
              lede="Organisations monitoring global risk often run several systems in parallel, each solving part of the problem. We are building one that begins from a client's own footprint and works outward. It is in development — the specification is published in full."
            />
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/platform">See the specification</ButtonLink>
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

function SelectedReports() {
  const selected = reports.slice(0, 3);

  return (
    <Section className="border-t border-[var(--rule)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="Reports"
            title="Longer-form research."
            lede="Where a question warrants more than commentary, we publish it as a report — with key judgments stated separately from reporting."
          />
          <ButtonLink href="/reports" variant="ghost">
            All reports
          </ButtonLink>
        </div>

        <div className="mt-14 grid gap-px lg:grid-cols-3">
          {selected.map((r, i) => (
            <Reveal key={r.slug} delay={i * 90}>
              <Link
                href={`/reports/${r.slug}`}
                className="panel ticked group flex h-full flex-col p-8"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="mono text-[0.625rem] tracking-[0.16em] uppercase text-[var(--color-watch)]">
                    {r.type}
                  </span>
                  {r.level ? <SeverityTag level={r.level} /> : null}
                </div>
                <h3 className="display mt-6 text-2xl leading-tight transition-colors group-hover:text-[var(--color-watch)]">
                  {r.title}
                </h3>
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
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
            <LineMask
              lines={["Understand your exposure", "before it prices in."]}
            />
          </h2>
          <Reveal delay={200}>
            <p className="text-[var(--text-dim)]">
              Tell us where you operate and we will come back with an initial
              read on your exposure and what we would watch first. There is no
              obligation, and no charge for the conversation.
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
