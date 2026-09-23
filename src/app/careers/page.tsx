import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import {
  ButtonLink,
  Container,
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
    title: "Open application",
    type: "Any",
    location: "Anywhere",
    body: "We are not advertising specific roles at the moment. If you read a region in its own language and can write a judgement you are willing to have assessed against the outcome, write to us anyway.",
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="We hire for depth, and we keep the record of our own work."
        lede="Analysts here are asked to commit to a judgement and then to review it against what followed. It is a particular way of working, and it suits some people considerably better than others."
      />

      <Section className="pt-10">
        <Container>
          <div className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
            {roles.map((r, i) => (
              <Reveal key={r.code} delay={i * 60}>
                <article className="grid gap-5 py-10 lg:grid-cols-[auto_1.4fr_1fr_auto] lg:items-baseline lg:gap-10">
                  <span className="mono text-sm text-[var(--color-watch)]">{r.code}</span>
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
                    className="mono link-underline text-[0.625rem] tracking-[0.16em] uppercase text-[var(--color-watch)]"
                  >
                    Apply
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="ink" className="border-t border-[var(--rule)]">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHead
              eyebrow="How to apply"
              title="We would rather read a judgement than a cover letter."
              lede="One page on something developing in your region: what you assess, on what basis, and what would change your view. It tells us more than a CV does."
            />
            <ButtonLink href={`mailto:${site.careers}`}>Write to us</ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
