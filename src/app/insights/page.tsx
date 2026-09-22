import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import {
  Container,
  Notice,
  PageHeader,
  Section,
  SectionHead,
  SeverityTag,
} from "@/components/ui";
import { research } from "@/lib/research";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "The weekly note: what moved, what it costs, and what we are watching next.",
};

const notes = [
  {
    date: "2026-09-22",
    edition: "No. 38",
    title: "Insurance is leading freight again",
    body: "War-risk premiums on two chokepoints moved ahead of charter rates this week. The spread is the thing to watch, not the level.",
  },
  {
    date: "2026-09-15",
    edition: "No. 37",
    title: "Forward-buying as a policy indicator",
    body: "Tier-one procurement behaviour in two sectors is signalling control expansion well ahead of any consultation notice.",
  },
  {
    date: "2026-09-08",
    edition: "No. 36",
    title: "Corridors, not mine sites",
    body: "Three separate operators reported route disruption this week against zero site incidents. The pattern is consistent across the quarter.",
  },
  {
    date: "2026-09-01",
    edition: "No. 35",
    title: "What a quiet month actually tells you",
    body: "Low event volume is not low risk. Two of our watch-level theatres deteriorated on structural indicators while reported incidents fell.",
  },
];

export default function InsightsPage() {
  const latest = research[0];

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="The weekly note."
        lede="Short, on Monday. What moved, what it costs, and what we are watching next. Written for people who already have enough to read."
      />

      <Container className="pt-10">
        <Notice>Placeholder editions for design review.</Notice>
      </Container>

      <Section className="pt-10">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
            <div className="divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
              {notes.map((n, i) => (
                <Reveal key={n.edition} delay={i * 60}>
                  <article className="grid gap-4 py-8 lg:grid-cols-[auto_1fr] lg:gap-10">
                    <div className="mono text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-faint)] lg:w-28">
                      <div>{n.edition}</div>
                      <div className="mt-1">{n.date}</div>
                    </div>
                    <div>
                      <h2 className="display text-2xl sm:text-3xl">{n.title}</h2>
                      <p className="prose-measure mt-3 text-[var(--text-dim)]">
                        {n.body}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            <aside className="space-y-10 lg:sticky lg:top-28 lg:self-start">
              <div className="border border-[var(--rule)] p-7">
                <h2 className="eyebrow">Subscribe</h2>
                <p className="mt-4 text-sm leading-relaxed text-[var(--text-dim)]">
                  One email, Monday morning. No marketing, no webinar invitations.
                </p>
                <form
                  className="mt-6 flex flex-col gap-3"
                  action="/contact"
                  method="get"
                >
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Work email"
                    aria-label="Work email"
                    className="w-full border-b border-[var(--rule)] bg-transparent py-2.5 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-faint)] focus:border-signal"
                  />
                  <button
                    type="submit"
                    className="mono mt-2 border border-[var(--rule)] px-4 py-3 text-[0.625rem] tracking-[0.16em] uppercase text-[var(--text)] transition-colors hover:border-signal hover:text-signal"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              <div className="border-t border-[var(--rule)] pt-8">
                <SectionHead eyebrow="Longer form" title="Latest research" />
                <Link href={`/research/${latest.slug}`} className="group mt-6 block">
                  {latest.level ? <SeverityTag level={latest.level} /> : null}
                  <p className="display mt-3 text-xl leading-snug transition-colors group-hover:text-signal">
                    {latest.title}
                  </p>
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
