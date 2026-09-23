import type { Metadata } from "next";
import { ReportsIndex } from "@/components/reports-index";
import { Container, Notice, PageHeader, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Briefs, assessments, forecasts and watchlists on international relations, trade policy and supply chain exposure.",
};

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Longer-form research."
        lede="Briefs, assessments, forecasts and watchlists. Each states its key judgements separately from its reporting, and sets out what would lead us to revise them."
      />

      <Container className="pt-10">
        <Notice>
          Placeholder library for design review. Replace with published work before
          launch.
        </Notice>
      </Container>

      <Section className="pt-10">
        <Container>
          <ReportsIndex />
        </Container>
      </Section>
    </>
  );
}
