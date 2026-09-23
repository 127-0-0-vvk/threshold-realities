import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostArticle } from "@/components/post-article";
import { ButtonLink, Container, Notice, Section } from "@/components/ui";
import { ThresholdRule } from "@/components/threshold-rule";
import { getPost, getPostsFor } from "@/lib/posts";
import { getReport, reports } from "@/lib/reports";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (post) return { title: post.title, description: post.tagline };
  const item = getReport(slug);
  if (!item) return { title: "Not found" };
  return { title: item.title, description: item.standfirst };
}

export default async function PublicationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Console posts use a numeric id; seeded publications use a text slug.
  const post = await getPost(slug);
  if (post && post.section === "publications") {
    return (
      <PostArticle
        post={post}
        backHref="/publications"
        backLabel="Publications"
        related={(await getPostsFor("publications"))
          .filter((p) => p.id !== post.id)
          .slice(0, 3)}
      />
    );
  }

  const item = getReport(slug);
  if (!item) notFound();

  const related = reports.filter((r) => r.slug !== item.slug).slice(0, 2);

  return (
    <article>
      <header className="border-b border-[var(--rule)] pt-28 pb-12 sm:pt-36">
        <Container>
          <Link
            href="/publications"
            className="mono link-underline text-[0.625rem] tracking-[0.16em] uppercase text-[var(--text-dim)]"
          >
            &larr; All publications
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <span className="mono text-[0.625rem] tracking-[0.16em] uppercase text-[var(--color-watch)]">
              {item.type}
            </span>
            <span className="mono text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-faint)]">
              {item.category}
            </span>
          </div>

          <h1 className="display mt-5 max-w-4xl text-[clamp(2.25rem,6vw,4.5rem)]">
            {item.title}
          </h1>
          <p className="prose-measure mt-6 text-xl leading-relaxed text-[var(--text-dim)]">
            {item.standfirst}
          </p>

          <div className="mono mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-faint)]">
            <span>{item.author}</span>
            <span aria-hidden>&middot;</span>
            <span>{item.date}</span>
            <span aria-hidden>&middot;</span>
            <span>{item.region}</span>
            <span aria-hidden>&middot;</span>
            <span>{item.readTime} min read</span>
          </div>
        </Container>
      </header>

      <Section className="py-14">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_20rem] lg:gap-20">
            <div>
              <Notice>
                Placeholder text for design review. Not a published assessment.
              </Notice>

              <div className="prose-measure mt-10 space-y-6 text-lg leading-relaxed text-[var(--text-dim)]">
                {item.body.map((p, i) => (
                  <p key={i} className={i === 0 ? "text-[var(--text)]" : undefined}>
                    {p}
                  </p>
                ))}
              </div>

              <div className="prose-measure mt-14">
                <ThresholdRule level="watch" label="Key judgements" />
                <ol className="mt-8 space-y-6">
                  {item.keyJudgments.map((kj, i) => (
                    <li key={i} className="flex gap-6">
                      <span className="mono shrink-0 text-sm text-[var(--text-faint)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-lg leading-relaxed text-[var(--text)]">
                        {kj}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="border border-[var(--rule)] p-6">
                <h2 className="eyebrow">Work with us on this</h2>
                <p className="mt-4 text-sm leading-relaxed text-[var(--text-dim)]">
                  We scope this kind of question to a specific footprint under
                  commissioned research or a standing engagement.
                </p>
                <div className="mt-6">
                  <ButtonLink
                    href="/contact"
                    variant="ghost"
                    className="w-full justify-center"
                  >
                    Request a briefing
                  </ButtonLink>
                </div>
              </div>

              <div className="mt-8 border-t border-[var(--rule)] pt-6">
                <h2 className="eyebrow">Related</h2>
                <ul className="mt-4 space-y-5">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/publications/${r.slug}`} className="group block">
                        <span className="mono text-[0.625rem] tracking-[0.16em] uppercase text-[var(--text-faint)]">
                          {r.type}
                        </span>
                        <p className="mt-1.5 leading-snug text-[var(--text)] transition-colors group-hover:text-[var(--color-watch)]">
                          {r.title}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </article>
  );
}
