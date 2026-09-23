import type { Metadata } from "next";
import { PublicationsIndex } from "@/components/publications-index";
import { Reveal } from "@/components/reveal";
import {
  Container,
  Notice,
  PageHeader,
  Section,
  SectionHead,
} from "@/components/ui";
import { PostCard } from "@/components/post-card";
import { getPostsFor } from "@/lib/posts";
import { publicationTypes } from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Policy briefs, white papers and working papers on international affairs, defence, trade, energy security and the other areas we cover.",
};

export const dynamic = "force-dynamic";

export default function PublicationsPage() {
  const posts = getPostsFor("publications");
  return (
    <>
      <PageHeader
        eyebrow="Publications"
        title="Written to be argued with."
        lede="Three formats, each with a different purpose. All of them state their key judgements separately from their reporting, and set out what would lead us to revise them."
      />

      <Section className="pb-0">
        <Container>
          <div className="grid gap-px sm:grid-cols-3">
            {publicationTypes.map((t, i) => (
              <Reveal key={t.slug} delay={i * 70}>
                <div className="panel ticked h-full p-8">
                  <span className="mono text-xs text-[var(--color-watch)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="display mt-5 text-2xl">{t.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--text-dim)]">
                    {t.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {posts.length ? (
        <Section className="pb-0">
          <Container>
            <SectionHead eyebrow="Latest" title="Recently published." />
            <div className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post.id} delay={i * 60}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section>
        <Container>
          <SectionHead eyebrow="Library" title="Everything we have published." />
          <div className="mt-8">
            <Notice>
              Placeholder library for design review. Replace with published work
              before launch.
            </Notice>
          </div>
          <div className="mt-8">
            <PublicationsIndex />
          </div>
        </Container>
      </Section>
    </>
  );
}
