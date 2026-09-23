import type { Metadata } from "next";
import { Container, PageHeader, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Board of Advisors",
  description:
    "The independent board of practitioners and scholars who review our research.",
};

export default function AdvisorsPage() {
  return (
    <>
      <PageHeader eyebrow="Advisors" title="Our Board of Advisors" />

      {/* Members are added through the console once appointments are confirmed.
          Each becomes a card: photograph, role, and a short biography. */}
      <Section>
        <Container>
          <div className="border border-[var(--rule)] bg-[var(--surface-raised)] px-6 py-20 text-center sm:px-12 sm:py-24">
            <span className="eyebrow">Being confirmed</span>
            <h2 className="display mx-auto mt-5 max-w-2xl text-3xl sm:text-4xl">
              Appointments are in progress.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[var(--text-dim)]">
              Board members will be introduced here as they are confirmed.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
