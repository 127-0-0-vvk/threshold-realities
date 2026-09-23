import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Container, PageHeader, Section } from "@/components/ui";
import { getPostsFor } from "@/lib/posts";
import { publicationTypes } from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Policy briefs, white papers and working papers on international affairs, defence, trade, energy security and the other areas we cover.",
};

export const dynamic = "force-dynamic";

export default async function PublicationsPage() {
  const posts = await getPostsFor("publications");

  return (
    <>
      <PageHeader
        eyebrow="Publications"
        title="Written to be argued with."
        lede="Three formats, each with a different purpose. All of them state their key judgements separately from their reporting, and set out what would lead us to revise them."
      />

      {/* The three formats, as prose rather than cards — they describe the
          library, they are not entries in it. */}
      <Section className="pb-0">
        <Container>
          <div className="prose-measure space-y-10">
            {publicationTypes.map((t) => (
              <section key={t.slug}>
                <h2 className="display text-2xl sm:text-3xl">{t.title}</h2>
                <p className="mt-3 text-lg leading-relaxed text-[var(--text-dim)]">
                  {t.body}
                </p>
              </section>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          {posts.length ? (
            <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post.id} delay={i * 60}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="border border-[var(--rule)] bg-[var(--surface-raised)] px-6 py-16 text-center sm:px-12 sm:py-20">
              <span className="eyebrow">Nothing published yet</span>
              <h2 className="display mx-auto mt-5 max-w-2xl text-3xl sm:text-4xl">
                The first papers are in preparation.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-[var(--text-dim)]">
                Our analysts are available to discuss the questions we are
                working on in the meantime.
              </p>
              <div className="mt-9 flex justify-center">
                <ButtonLink href="/contact">Speak to an analyst</ButtonLink>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
