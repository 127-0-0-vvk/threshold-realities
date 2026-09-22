import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { ThresholdRule } from "@/components/threshold-rule";
import {
  ButtonLink,
  Container,
  PageHeader,
  Section,
  SectionHead,
} from "@/components/ui";
import { methodSteps } from "@/lib/content";
import { LEVELS, levelMeta } from "@/lib/severity";

export const metadata: Metadata = {
  title: "Method",
  description:
    "How we collect, corroborate, assess, set triggers, map to exposure and score our own forecasts. Published in full so clients can audit the reasoning.",
};

const confidence = [
  {
    band: "High confidence",
    body: "Multiple independent, reliable sources agree, and the causal mechanism is well understood. We would be surprised to be wrong.",
  },
  {
    band: "Moderate confidence",
    body: "Sourcing is credible but incomplete, or the mechanism admits more than one reading. The judgment holds, but alternatives remain live.",
  },
  {
    band: "Low confidence",
    body: "Reporting is thin, contested or single-source. We publish it as a judgment we are actively trying to disconfirm, and say so.",
  },
];

const sourceTiers = [
  {
    tier: "A",
    label: "Direct and verifiable",
    body: "Official records, filings, gazettes, primary documents, our own collection.",
  },
  {
    tier: "B",
    label: "Reliable reporting",
    body: "Established outlets and regional press with a tracked accuracy record.",
  },
  {
    tier: "C",
    label: "Indicative",
    body: "Social and local reporting, useful for speed, never sufficient alone.",
  },
  {
    tier: "D",
    label: "Interested",
    body: "Sources with a stake in the outcome. Read for what they reveal about intent.",
  },
];

export default function MethodPage() {
  return (
    <>
      <PageHeader
        eyebrow="Method"
        title="Published in full, so you can audit the reasoning rather than trust the brand."
        lede="Most risk firms treat method as proprietary. We think that is backwards. A judgment you cannot interrogate is a judgment you cannot responsibly act on."
      />

      <Section>
        <Container>
          <SectionHead
            eyebrow="The pipeline"
            title="Six stages. Nothing skips one."
          />

          <div className="mt-16">
            {methodSteps.map((step, i) => (
              <Reveal key={step.code} delay={i * 70}>
                <div className="grid gap-6 border-t border-[var(--rule)] py-10 lg:grid-cols-[auto_1fr_1.1fr] lg:gap-14">
                  <span className="mono text-sm text-signal">{step.code}</span>
                  <div>
                    <h3 className="display text-3xl sm:text-4xl">{step.title}</h3>
                    <p className="mt-4 text-[var(--text-dim)]">{step.body}</p>
                  </div>
                  <ul className="space-y-3 lg:pt-3">
                    {step.detail.map((d) => (
                      <li
                        key={d}
                        className="flex gap-3 text-sm leading-relaxed text-[var(--text-dim)]"
                      >
                        <span className="mono mt-0.5 text-[var(--text-faint)]" aria-hidden>
                          &mdash;
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="parchment" className="border-t border-[var(--rule)]">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHead
                eyebrow="Source tiering"
                title="Every claim carries where it came from."
                lede="Tier is recorded against the claim, not the document, and it travels with the claim into every later product."
              />
              <div className="mt-10 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
                {sourceTiers.map((s) => (
                  <div key={s.tier} className="flex gap-6 py-5">
                    <span className="mono w-6 shrink-0 text-lg text-[var(--text)]">
                      {s.tier}
                    </span>
                    <div>
                      <p className="text-[var(--text)]">{s.label}</p>
                      <p className="mt-1 text-sm text-[var(--text-dim)]">{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mono mt-6 text-xs leading-relaxed text-[var(--text-faint)]">
                Minimum standard: two independent sources of tier B or above before
                a fact is reported as established.
              </p>
            </div>

            <div>
              <SectionHead
                eyebrow="Confidence"
                title="Three bands, defined before they are used."
              />
              <div className="mt-10 space-y-px">
                {confidence.map((c) => (
                  <div key={c.band} className="panel p-6">
                    <h3 className="mono text-[0.6875rem] tracking-[0.16em] uppercase text-[var(--text)]">
                      {c.band}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-dim)]">
                      {c.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-[var(--rule)]">
        <Container>
          <SectionHead
            eyebrow="The scale"
            title="Five levels. Red only ever means escalation."
            lede="The same scale governs our alerting, our tracker and the colour of this website. It is not a design choice we make per page."
          />

          <div className="mt-14 space-y-8">
            {LEVELS.map((l, i) => (
              <Reveal key={l} delay={i * 70}>
                <div className="grid gap-4 lg:grid-cols-[auto_1fr] lg:gap-12">
                  <span
                    className="mono w-32 shrink-0 text-[0.6875rem] tracking-[0.16em] uppercase"
                    style={{ color: levelMeta[l].hex }}
                  >
                    {levelMeta[l].label}
                  </span>
                  <div>
                    <ThresholdRule level={l} />
                    <p className="mt-4 text-[var(--text-dim)]">
                      {levelMeta[l].definition}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-[var(--rule)] bg-ink/25">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <SectionHead
              eyebrow="Scoring"
              title="We keep the record, including the wrong ones."
            />
            <div className="space-y-6 text-lg leading-relaxed text-[var(--text-dim)]">
              <p>
                Every forward-looking judgment we publish carries escalatory
                triggers — specific, observable conditions, each marked met or not
                met. Clients can monitor them independently. That is the point.
              </p>
              <p>
                After the forecast window closes we review what actually happened
                and record the trigger hit rate against the original publication.
                Where we were wrong, we record why: bad sourcing, a mechanism we
                misread, or an outcome that was genuinely unforecastable.
              </p>
              <p className="text-[var(--text)]">
                An annual accuracy review is published. Confidence without a track
                record is marketing.
              </p>
              <div className="pt-4">
                <ButtonLink href="/contact" variant="ghost">
                  Ask us about our record
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
