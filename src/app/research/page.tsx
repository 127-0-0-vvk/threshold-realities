import type { Metadata } from "next";
import { ResearchIndex } from "@/components/research-index";
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
        title="Written to be argued with."
        lede="Briefs, assessments, forecasts and watchlists. Each one states its key judgments separately from its reporting, and says what would change our view."
      />

      <Container className="pt-10">
        <Notice>
          Placeholder library for design review. Replace with published work before
          launch.
        </Notice>
      </Container>

      <Section className="pt-10">
        <Container>
          <ResearchIndex />
        </Container>
      </Section>
    </>
  );
}
