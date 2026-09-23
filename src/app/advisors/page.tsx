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
import { founders } from "@/lib/content";
import { resolvePortrait } from "@/lib/portraits";

export const metadata: Metadata = {
  title: "Our Advisors",
  description:
    "Our board of advisors — practitioners and scholars who test our judgements before they reach a client.",
};

const roles = [
  {
    code: "01",
    title: "They test the judgement",
    body: "Advisors review our forward-looking work before publication, and they are asked specifically where they disagree. A judgement no one has argued with is a judgement we have not finished.",
  },
  {
    code: "02",
    title: "They keep the method honest",
    body: "Sourcing standards, confidence bands and the annual accuracy review are all reviewed by people who do not work for us and have no stake in the answer being flattering.",
  },
  {
    code: "03",
    title: "They bring the ground truth",
    body: "Regional and sectoral practitioners who have operated in the markets we write about, and who can tell us when an assessment reads well but does not match how things actually work.",
  },
];

export default function AdvisorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Advisors"
        title="The people who tell us when we are wrong."
        lede="An independent board of practitioners and scholars who review our work, challenge our assumptions, and hold the method to the standard we have published."
      />

      <Section>
        <Container>
          <SectionHead
            eyebrow="The role"
            title="What an advisory board is for."
            lede="Not a letterhead. A working relationship with people whose disagreement is the point."
          />
          <div className="mt-14 grid gap-px lg:grid-cols-3">
            {roles.map((r, i) => (
              <Reveal key={r.code} delay={i * 80}>
                <div className="panel ticked h-full p-8 lg:p-10">
                  <span className="mono text-xs text-[var(--text-faint)]">
                    {r.code}
                  </span>
                  <h3 className="display mt-5 text-2xl">{r.title}</h3>
                  <p className="mt-4 text-[var(--text-dim)]">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-[var(--rule)]">
        <Container>
          <SectionHead eyebrow="The board" title="Our advisors." />
          <div className="mt-8">
            <Notice>
              Board members are being confirmed. Names, photographs and
              biographies will be published here once appointments are complete.
            </Notice>
          </div>

        </Container>
      </Section>

      <Section surface="ink" className="border-t border-[var(--rule)]">
        <Container>
          <SectionHead eyebrow="Founders" title="Who runs the firm." />
          <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20">
            {founders.map((f, i) => (
              <Reveal key={f.slug} delay={i * 100}>
                <article className="grid gap-8 sm:grid-cols-[minmax(0,13rem)_1fr] sm:items-start">
                  <Portrait src={resolvePortrait(f.slug)} name={f.name} />
                  <div>
                    <h3 className="display text-3xl">{f.name}</h3>
                    <p className="mono mt-3 text-[0.625rem] leading-relaxed tracking-[0.16em] uppercase text-[var(--color-watch)]">
                      {f.role}
                    </p>
                    <p className="mt-5 text-[var(--text-dim)]">{f.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-14">
            <ButtonLink href="/about">More about the firm</ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
