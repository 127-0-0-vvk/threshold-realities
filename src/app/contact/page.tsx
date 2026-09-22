import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { Container, PageHeader, Section } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us where you operate. We will come back with an initial read on your exposure and what we would watch first.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start with your exposure, not with our capabilities."
        lede="Tell us where you operate, what you move and who you depend on. We will come back with an initial read on what we would watch first — no obligation, no deck."
      />

      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
            <ContactForm />

            <aside className="space-y-10">
              <div>
                <h2 className="eyebrow">Direct</h2>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="link-underline text-[var(--text)]"
                    >
                      {site.email}
                    </a>
                    <p className="mt-1 text-sm text-[var(--text-faint)]">
                      Client and prospective client enquiries
                    </p>
                  </li>
                  <li className="pt-3">
                    <a
                      href={`mailto:${site.press}`}
                      className="link-underline text-[var(--text)]"
                    >
                      {site.press}
                    </a>
                    <p className="mt-1 text-sm text-[var(--text-faint)]">
                      Media and speaking requests
                    </p>
                  </li>
                  <li className="pt-3">
                    <a
                      href={`mailto:${site.careers}`}
                      className="link-underline text-[var(--text)]"
                    >
                      {site.careers}
                    </a>
                    <p className="mt-1 text-sm text-[var(--text-faint)]">
                      Analyst applications
                    </p>
                  </li>
                </ul>
              </div>

              <div className="border-t border-[var(--rule)] pt-8">
                <h2 className="eyebrow">Response</h2>
                <p className="mt-4 text-sm leading-relaxed text-[var(--text-dim)]">
                  Enquiries are read by an analyst, not a sales desk. We aim to
                  respond within one working day.
                </p>
              </div>

              <div className="border-t border-[var(--rule)] pt-8">
                <h2 className="eyebrow">Confidentiality</h2>
                <p className="mt-4 text-sm leading-relaxed text-[var(--text-dim)]">
                  Do not send sensitive operational detail through this form. We
                  will agree a secure channel before any engagement begins.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
