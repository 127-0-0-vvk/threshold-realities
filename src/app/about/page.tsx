import type { Metadata } from "next";
import { ChartMap } from "@/components/chart-map";
import { Reveal } from "@/components/reveal";
import {
  ButtonLink,
  Container,
  PageHeader,
  Section,
  SectionHead,
} from "@/components/ui";
import { practices, principles } from "@/lib/content";
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
        title="Between the consultancies and the data vendors, there was nothing useful."
        lede="The strategy houses write beautifully and arrive late. The data vendors arrive instantly and leave you to work out what it means. We built the firm we kept wishing existed."
      />

      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div className="prose-measure space-y-6 text-lg leading-relaxed text-[var(--text-dim)]">
              <p>
                {site.name} is an independent research and risk intelligence firm.
                We work for companies and investors operating across contested
                markets — places where the state is weak, partisan or disputed, and
                where the standard models for pricing political risk quietly stop
                working.
              </p>
              <p>
                Our clients are not short of information. They are short of
                judgement they can act on, delivered early enough for the action to
                still be available. A market report that arrives after premiums have
                repriced is a historical document.
              </p>
              <p>
                So we organised the firm around a single question:{" "}
                <span className="text-[var(--text)]">
                  where is the point at which this becomes a cost, and how much
                  warning can we give?
                </span>{" "}
                Everything else — the analyst bench, the method, the monitoring
                platform — exists to answer it faster.
              </p>
              <p>
                We are independent by design. We do not sell the products we assess,
                we do not take positions in the markets we cover, and we publish our
                method so clients can audit the reasoning rather than trust the
                brand.
              </p>
            </div>

            <div>
              <div className="border border-[var(--rule)] bg-ink/30 p-4">
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

      <Section surface="parchment" className="border-t border-[var(--rule)]">
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

      <Section className="border-t border-[var(--rule)]">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHead
              eyebrow="Next"
              title="The method is the argument."
              lede="If you read one page on this site, read that one."
            />
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/method">Read the method</ButtonLink>
              <ButtonLink href="/team" variant="ghost">
                Meet the bench
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
