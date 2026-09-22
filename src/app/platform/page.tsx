import type { Metadata } from "next";
import { ChartMap } from "@/components/chart-map";
import { Reveal } from "@/components/reveal";
import {
  ButtonLink,
  Container,
  Notice,
  PageHeader,
  Section,
  SectionHead,
  SeverityTag,
} from "@/components/ui";
import { platformModules } from "@/lib/content";
import { tracker } from "@/lib/tracker";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Our monitoring platform: live event collection, asset proximity and exposure scoring, country and city risk ratings, a forward events calendar, analyst-verified alerting and live escalatory triggers.",
};

const differences = [
  {
    code: "01",
    title: "Triage, not volume",
    body: "Most control rooms run four products at once and still drown. Events are deduplicated across sources and ranked by your exposure, not by how many outlets covered them.",
  },
  {
    code: "02",
    title: "Your names, not ours",
    body: "Sites carry the identifiers your facilities team already uses. An alert says the name of the building, not a coordinate pair.",
  },
  {
    code: "03",
    title: "A person assigned the severity",
    body: "Every alert that reaches you has been through an analyst. Automated classification proposes; it does not publish.",
  },
  {
    code: "04",
    title: "Triggers that flip",
    body: "Escalatory conditions are live objects, not lines in a PDF. When one moves from not-met to met, that is the notification.",
  },
];

export default function PlatformPage() {
  const sample = [...tracker]
    .sort((a, b) => (a.updated < b.updated ? 1 : -1))
    .slice(0, 5);

  return (
    <>
      <PageHeader
        eyebrow="The platform"
        title="Built because the four products most firms stitch together each solve a quarter of the problem."
        lede="Our analysts work on it every day. Clients on a standing engagement work on the same system, scoped to the assets they actually own."
      />

      <Section>
        <Container>
          <Reveal>
            <div className="border border-[var(--rule)] bg-ink/40">
              {/* Window chrome */}
              <div className="flex items-center justify-between border-b border-[var(--rule)] px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <span className="mono text-[0.625rem] tracking-[0.16em] uppercase text-[var(--text-faint)]">
                    Live monitoring
                  </span>
                </div>
                <span className="mono text-[0.625rem] tracking-[0.16em] uppercase text-[var(--text-faint)]">
                  16 theatres &middot; 6 regions
                </span>
              </div>

              <div className="grid lg:grid-cols-[1.6fr_1fr]">
                <div className="border-b border-[var(--rule)] p-4 lg:border-b-0 lg:border-r">
                  <ChartMap className="w-full" />
                </div>
                <div className="divide-y divide-[var(--rule)]">
                  {sample.map((e) => (
                    <div key={e.id} className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="mono text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-faint)]">
                          {e.region}
                        </span>
                        <SeverityTag level={e.level} />
                      </div>
                      <p className="mt-2.5 text-sm text-[var(--text)]">
                        {e.theatre}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-[var(--text-dim)]">
                        {e.headline}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-6">
            <Notice>
              Interface shown with illustrative sample data for design review.
            </Notice>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-[var(--rule)]">
        <Container>
          <SectionHead
            eyebrow="Capabilities"
            title="Six things it does, properly."
          />
          <div className="mt-14 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {platformModules.map((m, i) => (
              <Reveal key={m.code} delay={i * 70}>
                <div className="panel ticked h-full p-8">
                  <span className="mono text-xs text-signal">{m.code}</span>
                  <h3 className="display mt-6 text-2xl">{m.title}</h3>
                  <p className="mt-4 text-[var(--text-dim)]">{m.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="parchment" className="border-t border-[var(--rule)]">
        <Container>
          <SectionHead
            eyebrow="Why it is different"
            title="The problem is not collection. It is triage."
            lede="We built this after watching control rooms run four subscriptions in parallel and still miss the thing that mattered, because nobody was ranking by exposure."
          />
          <div className="mt-14 grid gap-px sm:grid-cols-2">
            {differences.map((d, i) => (
              <Reveal key={d.code} delay={i * 70}>
                <div className="panel h-full p-8">
                  <span className="mono text-xs text-[var(--text-faint)]">
                    {d.code}
                  </span>
                  <h3 className="display mt-5 text-2xl">{d.title}</h3>
                  <p className="mt-4 text-[var(--text-dim)]">{d.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-[var(--rule)]">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHead
              eyebrow="Access"
              title="Available to clients on a standing engagement."
              lede="Platform access is included with Standing Risk Intelligence, and can be added to an Exposure Assessment so monitoring continues after delivery."
            />
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact">Request access</ButtonLink>
              <ButtonLink href="/tracker" variant="ghost">
                Try the public tracker
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
