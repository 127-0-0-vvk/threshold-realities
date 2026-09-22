import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import {
  ButtonLink,
  Container,
  Notice,
  PageHeader,
  Section,
  SectionHead,
} from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "We hire analysts with regional depth, and engineers who want to build intelligence tooling that people actually use.",
};

const roles = [
  {
    code: "R/01",
    title: "Regional Analyst — MENA",
    type: "Full time",
    location: "Remote / hybrid",
    body: "Arabic reading fluency and time on the ground. Energy transit, maritime chokepoints and sanctions exposure.",
  },
  {
    code: "R/02",
    title: "Regional Analyst — Indo-Pacific",
    type: "Full time",
    location: "Remote / hybrid",
    body: "Mandarin reading fluency. Export controls, semiconductor supply chains, maritime security.",
  },
  {
    code: "R/03",
    title: "Senior Engineer — Intelligence Platform",
    type: "Full time",
    location: "Remote",
    body: "Python and TypeScript. Event collection, clustering and exposure scoring at scale. You will work next to the analysts who use it.",
  },
  {
    code: "R/04",
    title: "Open application",
    type: "Any",
    location: "Anywhere",
    body: "If you read a region in its own language and can write a judgment you are willing to be scored on, write to us regardless of what is listed.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="We hire for depth, and we score our own work."
        lede="This is a firm where analysts are asked to commit to a judgment and then live with the record of it. That suits some people very well and others not at all."
      />

      <Container className="pt-10">
        <Notice>Placeholder roles for design review.</Notice>
      </Container>

      <Section className="pt-10">
        <Container>
          <div className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
            {roles.map((r, i) => (
              <Reveal key={r.code} delay={i * 60}>
                <article className="grid gap-5 py-10 lg:grid-cols-[auto_1.4fr_1fr_auto] lg:items-baseline lg:gap-10">
                  <span className="mono text-sm text-signal">{r.code}</span>
                  <div>
                    <h2 className="display text-2xl sm:text-3xl">{r.title}</h2>
                    <p className="mt-3 text-[var(--text-dim)]">{r.body}</p>
                  </div>
                  <div className="mono flex gap-4 text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-faint)]">
                    <span>{r.type}</span>
                    <span>{r.location}</span>
                  </div>
                  <a
                    href={`mailto:${site.careers}?subject=${encodeURIComponent(r.title)}`}
                    className="mono link-underline text-[0.625rem] tracking-[0.16em] uppercase text-signal"
                  >
                    Apply
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="parchment" className="border-t border-[var(--rule)]">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHead
              eyebrow="How to apply"
              title="Send us a judgment, not a cover letter."
              lede="One page on something happening in your region right now: what you think, why, and what would change your mind. That tells us more than a CV."
            />
            <ButtonLink href={`mailto:${site.careers}`}>Write to us</ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
