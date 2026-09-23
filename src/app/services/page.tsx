import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import {
  ButtonLink,
  Container,
  PageHeader,
  Section,
  SectionHead,
} from "@/components/ui";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Standing risk intelligence, commissioned research, exposure assessment and advisory briefings for companies and investors in contested markets.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Four ways to work with us."
        lede="Scope, deliverable and cadence are stated up front. If an engagement is the wrong shape for your question, we will say so before you sign anything."
      />

      <Section>
        <Container>
          <div className="divide-y divide-[var(--rule)] border-b border-[var(--rule)]">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 70}>
                <article
                  id={s.slug}
                  className="grid gap-8 py-14 lg:grid-cols-[auto_1fr_1.1fr] lg:gap-14"
                >
                  <span className="mono text-sm text-[var(--color-watch)]">{s.code}</span>

                  <div>
                    <h2 className="display text-3xl sm:text-4xl">{s.title}</h2>
                    <p className="mt-5 text-lg text-[var(--text-dim)]">
                      {s.summary}
                    </p>
                    <dl className="mt-8 space-y-4">
                      <div>
                        <dt className="eyebrow">For</dt>
                        <dd className="mt-1.5 text-sm text-[var(--text-dim)]">
                          {s.forWho}
                        </dd>
                      </div>
                      <div>
                        <dt className="eyebrow">Cadence</dt>
                        <dd className="mono mt-1.5 text-sm text-[var(--text)]">
                          {s.cadence}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="panel ticked p-7">
                    <h3 className="eyebrow">What you get</h3>
                    <ul className="mt-5 space-y-3.5">
                      {s.deliverables.map((d) => (
                        <li
                          key={d}
                          className="flex gap-3 text-sm leading-relaxed text-[var(--text-dim)]"
                        >
                          <span className="mono mt-0.5 shrink-0 text-[var(--color-watch)]" aria-hidden>
                            &#43;
                          </span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="ink" className="border-t border-[var(--rule)]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <SectionHead
              eyebrow="How engagements start"
              title="A conversation, then a written scope."
            />
            <ol className="space-y-8">
              {[
                {
                  n: "01",
                  t: "Exposure conversation",
                  b: "Thirty minutes. Where you operate, what you move, who you depend on. No deck.",
                },
                {
                  n: "02",
                  t: "Initial read",
                  b: "We come back with what we would watch first and why. This is free and it is not a pitch document.",
                },
                {
                  n: "03",
                  t: "Written scope",
                  b: "If it is worth doing, we agree the question, the deliverable, the fee and the date in writing before work begins.",
                },
              ].map((step) => (
                <li key={step.n} className="flex gap-7">
                  <span className="mono text-sm text-[var(--text-faint)]">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="display text-2xl">{step.t}</h3>
                    <p className="mt-2 text-[var(--text-dim)]">{step.b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-14">
            <ButtonLink href="/contact">Start with a conversation</ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
