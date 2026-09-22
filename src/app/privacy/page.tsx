import type { Metadata } from "next";
import { Container, Notice, PageHeader, Section } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How we handle personal data collected through this website.",
};

const sections = [
  {
    h: "What we collect",
    p: [
      "If you submit an enquiry form, we collect the name, work email, organisation, role and message you provide.",
      "We collect basic, aggregated analytics about how this site is used. We do not build advertising profiles and we do not sell data.",
    ],
  },
  {
    h: "Why we collect it",
    p: [
      "To respond to your enquiry, and to maintain a record of client and prospective client correspondence.",
      "To understand which research is being read, so we commission more of what is useful.",
    ],
  },
  {
    h: "How long we keep it",
    p: [
      "Enquiry correspondence is retained for as long as there is an active or prospective client relationship, and then for the period required by our professional and legal obligations.",
      "Analytics data is retained in aggregated form only.",
    ],
  },
  {
    h: "Who we share it with",
    p: [
      "Service providers who host this site, deliver our email, and process enquiries on our behalf, each under contract.",
      "We do not share client correspondence with third parties for marketing purposes under any circumstances.",
    ],
  },
  {
    h: "Your rights",
    p: [
      "You may request access to, correction of, or deletion of the personal data we hold about you.",
      `Write to ${site.email} and we will respond within the statutory period.`,
    ],
  },
  {
    h: "Client engagement data",
    p: [
      "Data supplied to us under a client engagement — including asset registers and travel data — is governed by that engagement's contract and data-processing terms, not by this policy.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy"
        lede="How we handle personal data collected through this website."
      />
      <Section>
        <Container>
          <Notice>
            Placeholder policy for design review. Have this reviewed by counsel in
            your operating jurisdictions before launch.
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
