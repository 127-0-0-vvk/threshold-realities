import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { ButtonLink, Container, Section } from "@/components/ui";
import { formatDate, getArticle, getArticles } from "@/lib/analysis";

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Not found" };
  return {
    title: article.title,
    description: article.standfirst,
    openGraph: {
      title: article.title,
      description: article.standfirst,
      type: "article",
      publishedTime: article.date,
      images: article.cover ? [article.cover] : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = getArticles()
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  return (
    <article>
      <header className="border-b border-[var(--rule)] pt-32 pb-12 sm:pt-40">
        <Container>
          <Link
            href="/analysis"
            className="mono link-underline text-[0.625rem] tracking-[0.16em] uppercase text-[var(--text-dim)]"
          >
            &larr; All analysis
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="mono text-[0.625rem] tracking-[0.16em] uppercase text-[var(--text)]">
              {article.category}
            </span>
            <span className="mono text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-faint)]">
              {article.region}
            </span>
          </div>

          <h1 className="display mt-6 max-w-4xl text-4xl sm:text-5xl lg:text-6xl">
            {article.title}
          </h1>

          {article.standfirst ? (
            <p className="prose-measure mt-7 text-xl leading-relaxed text-[var(--text-dim)]">
              {article.standfirst}
            </p>
          ) : null}

          <div className="mono mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-faint)]">
            <span>{article.author}</span>
            <span aria-hidden>&middot;</span>
            <span>{formatDate(article.date)}</span>
            <span aria-hidden>&middot;</span>
            <span>{article.readTime} min read</span>
          </div>
        </Container>
      </header>

      {article.cover ? (
        <Container className="pt-12">
          <figure>
            <div className="relative aspect-[16/9] w-full overflow-hidden border border-[var(--rule)]">
              <Image
                src={article.cover}
                alt=""
                fill
                priority
                sizes="(min-width: 1400px) 1400px, 100vw"
                className="object-cover"
              />
            </div>
            {article.coverCaption ? (
              <figcaption className="mono mt-3 text-[0.625rem] tracking-[0.12em] uppercase text-[var(--text-faint)]">
                {article.coverCaption}
              </figcaption>
            ) : null}
          </figure>
        </Container>
      ) : null}

      <Section className="py-16">
        <Container>
          <div
            className="article-body prose-measure"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />
        </Container>
      </Section>

      {related.length ? (
        <Section className="border-t border-[var(--rule)] py-16">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="display text-3xl sm:text-4xl">Related analysis</h2>
              <ButtonLink href="/analysis" variant="ghost">
                All analysis
              </ButtonLink>
            </div>
            <div className="mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </article>
  );
}
