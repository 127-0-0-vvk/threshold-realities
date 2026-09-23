import Image from "next/image";
import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { PostCard } from "@/components/post-card";
import { renderBody } from "@/lib/posts";
import { formatDate, type Post } from "@/lib/sections";

export function PostArticle({
  post,
  backHref,
  backLabel,
  related,
}: {
  post: Post;
  backHref: string;
  backLabel: string;
  related: Post[];
}) {
  return (
    <article>
      <header className="border-b border-[var(--rule)] pt-28 pb-12 sm:pt-36">
        <Container>
          <Link
            href={backHref}
            className="mono link-underline text-[0.625rem] tracking-[0.16em] uppercase text-[var(--text-dim)]"
          >
            &larr; {backLabel}
          </Link>

          <div className="mono mt-8 text-[0.625rem] tracking-[0.16em] uppercase text-[var(--color-watch)]">
            Article No. {post.id}
          </div>

          <h1 className="display mt-5 max-w-4xl text-[clamp(2.25rem,6vw,4.5rem)]">
            {post.title}
          </h1>

          {post.tagline ? (
            <p className="prose-measure mt-6 text-xl leading-relaxed text-[var(--text-dim)]">
              {post.tagline}
            </p>
          ) : null}

          <div className="mono mt-9 text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-faint)]">
            {formatDate(post.createdAt)}
          </div>
        </Container>
      </header>

      {post.image ? (
        <Container className="pt-10">
          <div className="relative aspect-[16/9] w-full overflow-hidden border border-[var(--rule)]">
            <Image
              src={post.image}
              alt=""
              fill
              priority
              sizes="(min-width: 1400px) 1400px, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      ) : null}

      <Section className="py-14">
        <Container>
          <div
            className="article-body prose-measure"
            dangerouslySetInnerHTML={{ __html: renderBody(post.body) }}
          />
        </Container>
      </Section>

      {related.length ? (
        <Section surface="ink" className="border-t border-[var(--rule)] py-14">
          <Container>
            <h2 className="display text-3xl">More from {backLabel}</h2>
            <div className="mt-10 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </article>
  );
}
