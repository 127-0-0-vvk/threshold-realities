import type { Metadata } from "next";
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
import { founders } from "@/lib/content";
import { resolvePortrait } from "@/lib/portraits";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "A research-driven intelligence platform advancing India's national interest through rigorous geopolitical analysis, bridging academia and industry.",
};

const pillars = [
  {
    code: "01",
    title: "Who We Are",
    body: "We are a research-driven intelligence platform advancing India's national interest through rigorous geopolitical analysis. Founded on the belief that India's strategic narrative needs centralized, expert-led research, we bridge academia and industry to provide real-time intelligence on the strategic and tactical challenges shaping India's future.",
  },
  {
    code: "02",
    title: "Our Mission",
    body: "To support India's strategic autonomy and nation-building agenda by conducting rigorous, integrated research across defense, geopolitics, economics, and technology—translating complex global dynamics into actionable intelligence for strategic decision-makers.",
  },
  {
    code: "03",
    title: "Our Vision",
    body: "An India that pursues strategic autonomy and nation-building through evidence-based research, unified expert opinion, and informed decision-making across government, business, and civil society.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Bridging the gap between academia and industry."
        lede="Academic research carries the rigour but rarely the timing. Industry carries the urgency but rarely the method. We work in the space between the two — scholarly standards, applied to questions that have a decision attached and a deadline against them."
      />

      <Section>
        <Container>
          <div className="prose-measure space-y-6 text-lg leading-relaxed text-[var(--text-dim)]">
            <p className="text-[var(--text)]">
              India&rsquo;s strategic conversation is dispersed. Serious work
              exists, but it sits in separate institutions, is written for
              separate audiences, and arrives on timelines set by publication
              cycles rather than by events.
            </p>
            <p>
              We set out to centralise that work and give it a usable form:
              research conducted to a published method, integrated across
              defence, geopolitics, economics and technology, and delivered
              while there is still a decision to be made.
            </p>
            <p>
              We are independent by design. We do not sell the products we
              assess, we hold no positions in the markets we cover, and we
              publish our method so readers can examine the reasoning rather
              than rely on the name attached to it.
            </p>
          </div>
        </Container>
      </Section>

      <Section surface="ink" className="border-y border-[var(--rule)]">
        <Container>
          <div className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
            {pillars.map((p, i) => (
              <Reveal key={p.code} delay={i * 80}>
                <div className="grid gap-5 py-12 lg:grid-cols-[auto_1fr_1.6fr] lg:gap-14">
                  <span className="mono text-sm text-[var(--color-watch)]">
                    {p.code}
                  </span>
                  <h2 className="display text-3xl sm:text-4xl">{p.title}</h2>
                  <p className="text-lg leading-relaxed text-[var(--text-dim)]">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <span className="eyebrow">Founders</span>

          <div className="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-20">
            {founders.map((f, i) => (
              <Reveal key={f.slug} delay={i * 110}>
                <article className="grid gap-8 sm:grid-cols-[minmax(0,14rem)_1fr] sm:items-start">
                  <Portrait src={resolvePortrait(f.slug)} name={f.name} />
                  <div>
                    <h2 className="display text-3xl">{f.name}</h2>
                    <p className="mono mt-3 text-[0.625rem] leading-relaxed tracking-[0.16em] uppercase text-[var(--color-watch)]">
                      {f.role}
                    </p>
                    <div className="mt-5">
                      <ThresholdRule />
                    </div>
                    <p className="mt-5 text-[var(--text-dim)]">{f.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Our Team — held empty until the bench is named. */}
      <Section className="border-t border-[var(--rule)]">
        <Container>
          <span className="eyebrow">Our Team</span>
          <div className="mt-8 border border-[var(--rule)] bg-[var(--surface-raised)] px-6 py-16 text-center sm:px-12">
            <h2 className="display mx-auto max-w-2xl text-3xl sm:text-4xl">
              Being assembled.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[var(--text-dim)]">
              Our analysts will be introduced here as appointments are confirmed.
            </p>
          </div>
        </Container>
      </Section>

      <Section surface="ink" className="border-t border-[var(--rule)]">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHead
              eyebrow="Next"
              title="The people who test our judgements."
              lede="An independent board reviews what we publish before it reaches a reader."
            />
            <ButtonLink href="/advisors">Our board of advisors</ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
