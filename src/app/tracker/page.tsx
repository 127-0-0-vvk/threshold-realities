import type { Metadata } from "next";
import { TrackerView } from "@/components/tracker-view";
import {
  ButtonLink,
  Container,
  Notice,
  PageHeader,
  Section,
  SectionHead,
} from "@/components/ui";
import { SAMPLE_NOTICE } from "@/lib/tracker";

export const metadata: Metadata = {
  title: "Threshold Tracker",
  description:
    "A live read of the theatres we monitor, scored on our five-level scale with a forecast direction on each.",
};

export default function TrackerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Threshold Tracker"
        title="Where the line is being crossed."
        lede="A standing read of the theatres we monitor most closely — scored on the same five-level scale that governs our alerting, with a direction of travel on each."
      />

      <Container className="pt-10">
        <Notice>{SAMPLE_NOTICE}</Notice>
      </Container>

      <Section className="pt-10">
        <Container>
          <TrackerView />
        </Container>
      </Section>

      <Section surface="ink" className="border-t border-[var(--rule)]">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <SectionHead
              eyebrow="Reading the tracker"
              title="Level is where it is. Direction is where it is going."
            />
            <div className="space-y-5 text-[var(--text-dim)]">
              <p>
                A theatre at <span className="text-[var(--text)]">Watch</span> and
                deteriorating usually deserves more of your attention than one at{" "}
                <span className="text-[var(--text)]">High</span> and stable. The
                second has already priced in; the first has not.
              </p>
              <p>
                Levels here are assessed at theatre scale. They are not a
                substitute for exposure scoring against your own sites, routes and
                people — that work is specific to a footprint and we do it under
                engagement.
              </p>
              <p>
                The full definitions of each level are published in the footer of
                every page, and in our method.
              </p>
              <div className="flex flex-wrap gap-3 pt-3">
                <ButtonLink href="/contact">Get this scoped to your footprint</ButtonLink>
                <ButtonLink href="/about#method" variant="ghost">
                  How we score
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
