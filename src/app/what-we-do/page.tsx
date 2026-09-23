import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import {
  ButtonLink,
  Container,
  PageHeader,
  Section,
  SectionHead,
} from "@/components/ui";
import { practices, services } from "@/lib/content";

export const metadata: Metadata = {
  title: "What We Do",
  description:
    "We work in the gap between academic research and industry practice — bringing scholarly rigour to questions that carry commercial consequences.",
};

const gap = [
  {
    code: "01",
    title: "Academia holds the rigour",
    body: "Universities and research institutes produce the most careful work on how states behave, how conflicts escalate and how policy transmits into markets. It is methodologically serious, peer-reviewed and slow. It is also written for other scholars, published on a cycle measured in years, and rarely framed around a decision anyone has to take.",
  },
  {
    code: "02",
    title: "Industry holds the urgency",
    body: "Firms operating in contested markets have to decide now, with incomplete information and real money at stake. The analysis available to them is fast and commercially framed, but it is often thin on method, light on sourcing, and unwilling to state what would prove it wrong.",
  },
  {
    code: "03",
    title: "We work in the gap",
    body: "Our purpose is to carry the standards of the first into the timeframe of the second. Research that would survive academic scrutiny, written for someone who has to act on it, and delivered while the action is still available.",
  },
];

const how = [
  {
    code: "01",
    title: "Scholarly method, stated openly",
    body: "Source tiering, corroboration thresholds and confidence bands are published rather than held as proprietary. A reader should be able to interrogate how we reached a view.",
  },
  {
    code: "02",
    title: "Judgements that can be scored",
    body: "Forward-looking work carries observable triggers, marked met or not met. We review them afterwards and keep the record, including where a judgement did not hold.",
  },
  {
    code: "03",
    title: "Framed around a decision",
    body: "We begin from what changes for the reader under each plausible outcome, rather than from what is interesting about the question itself.",
  },
  {
    code: "04",
    title: "Published, not just delivered",
    body: "Policy briefs, white papers and working papers sit in the open alongside client work, so the standard we hold ourselves to is visible to anyone.",
  },
];

export default function WhatWeDoPage() {
  return (
    <>
      <PageHeader
        eyebrow="What We Do"
        title="We work in the gap between academia and industry."
        lede="One side has the rigour and not the timing. The other has the urgency and not the method. We set out to bring the two together."
      />

      <Section>
        <Container>
          <div className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
            {gap.map((g, i) => (
              <Reveal key={g.code} delay={i * 80}>
                <div className="grid gap-6 py-12 lg:grid-cols-[auto_1fr_1.4fr] lg:gap-14">
                  <span className="mono text-sm text-[var(--color-watch)]">
                    {g.code}
                  </span>
                  <h2 className="display text-3xl sm:text-4xl">{g.title}</h2>
                  <p className="text-lg leading-relaxed text-[var(--text-dim)]">
                    {g.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="ink" className="border-t border-[var(--rule)]">
        <Container>
          <SectionHead
            eyebrow="How that shows up"
            title="Four commitments that follow from it."
          />
          <div className="mt-14 grid gap-px sm:grid-cols-2">
            {how.map((h, i) => (
              <Reveal key={h.code} delay={i * 70}>
                <div className="panel ticked h-full p-8 lg:p-10">
                  <span className="mono text-xs text-[var(--text-faint)]">
                    {h.code}
                  </span>
                  <h3 className="display mt-5 text-2xl">{h.title}</h3>
                  <p className="mt-4 text-[var(--text-dim)]">{h.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-[var(--rule)]">
        <Container>
          <SectionHead
            eyebrow="Coverage"
            title="What we cover."
            lede="Six practice areas, held together because in contested markets they are never separate problems. Our research areas set them out in more detail."
          />
          <div className="mt-14 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {practices.map((p, i) => (
              <Reveal key={p.code} delay={i * 50}>
                <div className="panel ticked h-full p-7">
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
          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink href="/research-areas">All research areas</ButtonLink>
            <ButtonLink href="/regional-focus" variant="ghost">
              Regional focus
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-[var(--rule)]">
        <Container>
          <SectionHead
            eyebrow="Engagements"
            title="How clients work with us."
            lede="Scope, deliverable and cadence are stated up front. If an engagement is the wrong shape for your question, we will say so before anything is signed."
          />
          <div className="mt-14 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 60}>
                <article
                  id={s.slug}
                  className="grid gap-6 py-10 lg:grid-cols-[auto_1fr_1.2fr_auto] lg:items-baseline lg:gap-12"
                >
                  <span className="mono text-sm text-[var(--color-watch)]">
                    {s.code}
                  </span>
                  <h3 className="display text-2xl sm:text-3xl">{s.title}</h3>
                  <p className="text-[var(--text-dim)]">{s.summary}</p>
                  <span className="mono text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-faint)]">
                    {s.cadence}
                  </span>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-12">
            <ButtonLink href="/contact">Start with a conversation</ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
