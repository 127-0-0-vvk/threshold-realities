import type { Metadata } from "next";
import { ChartMap } from "@/components/chart-map";
import { Portrait } from "@/components/portrait";
import { Reveal } from "@/components/reveal";
import { ThresholdRule } from "@/components/threshold-rule";
import {
  ButtonLink,
  Container,
  PageHeader,
  Section,
  SectionHead,
} from "@/components/ui";
import { founders, methodSteps, practices, principles } from "@/lib/content";
import { resolvePortrait } from "@/lib/portraits";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "An independent research and risk intelligence firm working where the state is contested and formal risk models break down.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="An independent firm, positioned between advisory and data."
        lede="Advisory houses produce considered analysis, though often on a timeline that sits behind the decision. Data providers deliver at speed, and leave the interpretation to the client. We set out to occupy the ground between the two."
      />

      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div className="prose-measure space-y-6 text-lg leading-relaxed text-[var(--text-dim)]">
              <p>
                {site.name} is an independent research and risk intelligence firm.
                We work with companies and investors operating across contested
                markets — environments where authority is fragmented or disputed,
                and where conventional models for pricing political risk tend to
                hold less well than they do elsewhere.
              </p>
              <p>
                Most of our clients are not short of information. What they more
                often need is judgement they can act on, arriving early enough for
                the action to remain available. Analysis delivered after the market
                has adjusted is a useful record, but it is no longer a decision aid.
              </p>
              <p>
                We have therefore organised the firm around a single question:{" "}
                <span className="text-[var(--text)]">
                  at what point does this become a commercial cost, and how much
                  notice can we reasonably provide?
                </span>{" "}
                The analyst bench, the method and the monitoring platform all exist
                to answer it more quickly.
              </p>
              <p>
                We are independent by design. We do not sell the products we
                assess, we hold no positions in the markets we cover, and we publish
                our method so that clients can examine the reasoning rather than
                rely on the name attached to it.
              </p>
            </div>

            <div>
              <div data-surface="ink" className="border border-[var(--rule)] p-4">
                <ChartMap className="w-full opacity-80" />
                <p className="eyebrow mt-4">
                  Monitored theatres &middot; illustrative
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-t border-[var(--rule)]">
        <Container>
          <SectionHead
            eyebrow="Founders"
            title="Two founders, one method, no house view to defend."
            lede="We established the firm because the work we wanted to commission did not exist in a form we could readily act on."
          />

          <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-20">
            {founders.map((f, i) => (
              <Reveal key={f.slug} delay={i * 110}>
                <article className="grid gap-8 sm:grid-cols-[minmax(0,14rem)_1fr] sm:items-start">
                  <Portrait src={resolvePortrait(f.slug)} name={f.name} />
                  <div>
                    <h3 className="display text-3xl">{f.name}</h3>
                    <p className="mono mt-3 text-[0.625rem] leading-relaxed tracking-[0.16em] uppercase text-[var(--color-watch)]">
                      {f.role}
                    </p>
                    <div className="mt-5">
                      <ThresholdRule />
                    </div>
                    <p className="mt-5 text-[var(--text-dim)]">{f.bio}</p>
                    <dl className="mt-6">
                      <dt className="eyebrow">Focus</dt>
                      <dd className="mt-1.5 text-sm text-[var(--text-dim)]">
                        {f.focus}
                      </dd>
                    </dl>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-[var(--rule)]">
        <Container>
          <SectionHead
            eyebrow="Principles"
            title="Four commitments we are willing to be held to."
          />
          <div className="mt-14 grid gap-px sm:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.code} delay={i * 80}>
                <div className="panel ticked h-full p-8 lg:p-10">
                  <span className="mono text-xs text-[var(--text-faint)]">
                    {p.code}
                  </span>
                  <h3 className="display mt-5 text-2xl">{p.title}</h3>
                  <p className="mt-4 text-[var(--text-dim)]">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="ink" className="border-t border-[var(--rule)]">
        <Container>
          <SectionHead
            eyebrow="Practice areas"
            title="Six areas. In contested markets they are never separate problems."
          />
          <div className="mt-12 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
            {practices.map((p) => (
              <div
                key={p.code}
                className="grid gap-4 py-7 lg:grid-cols-[auto_1fr_1.4fr] lg:items-baseline lg:gap-12"
              >
                <span className="mono text-xs text-[var(--text-faint)]">
                  {p.code}
                </span>
                <h3 className="display text-2xl">{p.title}</h3>
                <p className="text-[var(--text-dim)]">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="method" className="border-t border-[var(--rule)]">
        <Container>
          <SectionHead
            eyebrow="Method"
            title="How a judgement reaches you."
            lede="We publish our method rather than treating it as proprietary. An assessment a client cannot examine is one they cannot responsibly act on."
          />

          <div className="mt-16">
            {methodSteps.map((step, i) => (
              <Reveal key={step.code} delay={i * 60}>
                <div className="grid gap-6 border-t border-[var(--rule)] py-9 lg:grid-cols-[auto_1fr_1.1fr] lg:gap-14">
                  <span className="mono text-sm text-[var(--color-watch)]">{step.code}</span>
                  <div>
                    <h3 className="display text-2xl sm:text-3xl">{step.title}</h3>
                    <p className="mt-3 text-[var(--text-dim)]">{step.body}</p>
                  </div>
                  <ul className="space-y-2.5 lg:pt-2">
                    {step.detail.map((d) => (
                      <li
                        key={d}
                        className="flex gap-3 text-sm leading-relaxed text-[var(--text-dim)]"
                      >
                        <span
                          className="mono mt-0.5 text-[var(--text-faint)]"
                          aria-hidden
                        >
                          &mdash;
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

      <Section surface="ink" className="border-t border-[var(--rule)]">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHead
              eyebrow="Next"
              title="The analysts behind the work."
              lede="Every region we claim has an analyst who reads the language and has spent time on the ground."
            />
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/team">Meet the bench</ButtonLink>
              <ButtonLink href="/analysis" variant="ghost">
                Read our analysis
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
