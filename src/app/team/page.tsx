import type { Metadata } from "next";
import { Portrait } from "@/components/portrait";
import { Reveal } from "@/components/reveal";
import {
  ButtonLink,
  Container,
  Notice,
  PageHeader,
  Section,
  SectionHead,
} from "@/components/ui";
import { founders, team } from "@/lib/content";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Analysts with regional depth — the language, the time on the ground, and the sector knowledge to tell a signal from a headline.",
};

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Team"
        title="Coverage maps are easy to draw. They are hard to staff."
        lede="Every region we claim has an analyst who reads the language and has worked the ground. Where we do not have that, we say we do not cover it."
      />

      <Section className="pt-16">
        <Container>
          <SectionHead eyebrow="Founders" title="Who runs the firm." />
          <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20">
            {founders.map((f, i) => (
              <Reveal key={f.slug} delay={i * 100}>
                <article className="grid gap-8 sm:grid-cols-[minmax(0,13rem)_1fr] sm:items-start">
                  <Portrait src={f.photo} name={f.name} />
                  <div>
                    <h3 className="display text-3xl">{f.name}</h3>
                    <p className="mono mt-3 text-[0.625rem] leading-relaxed tracking-[0.16em] uppercase text-signal">
                      {f.role}
                    </p>
                    <p className="mt-5 text-[var(--text-dim)]">{f.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-[var(--rule)]">
        <Container>
          <SectionHead eyebrow="The bench" title="Regional analysts." />
          <div className="mt-6">
            <Notice>
              Placeholder bench for design review. Replace with named analysts,
              photographs and biographies before launch.
            </Notice>
          </div>
          <div className="mt-14 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 60}>
                <div className="panel ticked flex h-full flex-col p-8">
                  <div
                    className="flex aspect-[4/5] w-full items-end p-4"
                    style={{
                      background:
                        "linear-gradient(160deg, var(--color-ink), var(--color-abyssal))",
                      border: "1px solid var(--rule)",
                    }}
                  >
                    <span className="mono text-[0.625rem] tracking-[0.16em] uppercase text-[var(--text-faint)]">
                      {member.region}
                    </span>
                  </div>
                  <h2 className="display mt-6 text-2xl leading-tight">
                    {member.name}
                  </h2>
                  <dl className="mt-5 space-y-3 text-sm">
                    <div>
                      <dt className="eyebrow">Languages</dt>
                      <dd className="mt-1 text-[var(--text-dim)]">
                        {member.languages}
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow">Focus</dt>
                      <dd className="mt-1 text-[var(--text-dim)]">{member.focus}</dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section surface="parchment" className="border-t border-[var(--rule)]">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHead
              eyebrow="Join us"
              title="We hire for regional depth, not for polish."
              lede="If you read a region in its own language and can write a judgment you are willing to be scored on, we want to hear from you."
            />
            <ButtonLink href="/careers">See open roles</ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
