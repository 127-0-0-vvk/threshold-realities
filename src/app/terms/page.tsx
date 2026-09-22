import type { Metadata } from "next";
import { Container, Notice, PageHeader, Section } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms governing use of this website and the material published on it.",
};

const sections = [
  {
    h: "Nature of the material",
    p: [
      `Material published on ${site.domain} is general research and commentary. It is not advice, and it is not tailored to the circumstances of any particular person or organisation.`,
      "Assessments reflect our judgment at the time of publication. Conditions in contested markets change quickly, and we do not undertake to update published material.",
    ],
  },
  {
    h: "No reliance",
    p: [
      "You should not take, or refrain from taking, any operational, commercial or investment decision solely on the basis of material published here.",
      "Client-specific advice is provided only under a written engagement.",
    ],
  },
  {
    h: "Not investment advice",
    p: [
      "Nothing on this site is an offer or solicitation to buy or sell any security or financial instrument, nor a recommendation regarding any investment.",
    ],
  },
  {
    h: "Intellectual property",
    p: [
      `All material on this site is © ${site.name} unless otherwise stated. You may quote briefly with attribution and a link. You may not republish material in full, or use it to train models, without written permission.`,
    ],
  },
  {
    h: "Third-party sources",
    p: [
      "Our research draws on third-party sources. While we corroborate before publication, we do not warrant the accuracy of material originating with others.",
    ],
  },
  {
    h: "Limitation of liability",
    p: [
      "To the fullest extent permitted by law, we accept no liability for loss arising from use of, or reliance on, material published on this site.",
    ],
  },
  {
    h: "Contact",
    p: [`Questions about these terms should be directed to ${site.email}.`],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms"
        lede="Terms governing use of this website and the material published on it."
      />
      <Section>
        <Container>
          <Notice>
            Placeholder terms for design review. Have these reviewed by counsel
            before launch — publishing risk assessments carries specific liability
            considerations.
          </Notice>
          <div className="prose-measure mt-12 space-y-12">
            {sections.map((s) => (
              <section key={s.h}>
                <h2 className="display text-2xl">{s.h}</h2>
                <div className="mt-4 space-y-4 text-[var(--text-dim)]">
                  {s.p.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
