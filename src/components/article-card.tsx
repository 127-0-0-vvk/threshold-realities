import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/analysis";
import { formatDate } from "@/lib/analysis";

/**
 * Article card. Uses the cover image where one exists; otherwise falls back to
 * a chart-graticule panel carrying the category, so a piece published without
 * artwork still sits properly in a grid.
 */
export function ArticleCard({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/analysis/${article.slug}`}
      className="panel ticked group flex h-full flex-col overflow-hidden"
    >
      <div
        className={`relative w-full overflow-hidden border-b border-[var(--rule)] ${
          featured ? "aspect-[16/9] lg:aspect-[21/9]" : "aspect-[3/2]"
        }`}
      >
        {article.cover ? (
          <Image
            src={article.cover}
            alt=""
            fill
            sizes={featured ? "(min-width: 1024px) 100vw, 100vw" : "(min-width: 1024px) 25vw, 100vw"}
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]"
          />
        ) : (
          <CoverFallback
            category={article.category}
            region={article.region}
            featured={featured}
          />
        )}
      </div>

      <div className={`flex flex-1 flex-col ${featured ? "p-8 lg:p-10" : "p-6"}`}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="mono text-[0.625rem] tracking-[0.16em] uppercase text-signal">
            {article.category}
          </span>
          <span className="mono text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-faint)]">
            {article.region}
          </span>
        </div>

        <h3
          className={`display mt-4 leading-tight transition-colors duration-200 group-hover:text-signal ${
            featured ? "text-3xl sm:text-4xl" : "text-2xl"
          }`}
        >
          {article.title}
        </h3>

        <p
          className={`mt-3 flex-1 leading-relaxed text-[var(--text-dim)] ${
            featured ? "text-base" : "text-sm"
          }`}
        >
          {article.standfirst}
        </p>

        <div className="mono mt-6 flex items-center gap-3 text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-faint)]">
          <span>{formatDate(article.date)}</span>
          <span aria-hidden>&middot;</span>
          <span>{article.readTime} min read</span>
        </div>
      </div>
    </Link>
  );
}

/**
 * Designed fallback for articles published without artwork. Deliberately
 * typographic rather than a blank tile — a category set in the display face
 * over the chart grid, so an image-less piece still looks intentional.
 */
function CoverFallback({
  category,
  region,
  featured,
}: {
  category: string;
  region: string;
  featured: boolean;
}) {
  return (
    <div
      className="flex h-full w-full flex-col justify-between p-5 sm:p-7"
      style={{
        background:
          "linear-gradient(150deg, var(--surface-raised) 0%, var(--color-abyssal) 70%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-graticule) 1px, transparent 1px), linear-gradient(90deg, var(--color-graticule) 1px, transparent 1px)",
          backgroundSize: featured ? "72px 72px" : "44px 44px",
          maskImage: "radial-gradient(80% 75% at 72% 30%, black 5%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(80% 75% at 72% 30%, black 5%, transparent 80%)",
        }}
        aria-hidden
      />

      <span className="mono relative text-[0.625rem] tracking-[0.2em] uppercase text-[var(--text-faint)]">
        {region}
      </span>

      <div className="relative">
        <span
          className="h-px w-10 shrink-0 bg-signal"
          style={{ display: "block" }}
          aria-hidden
        />
        <p
          className={`display mt-3 leading-none text-[var(--text-faint)] ${
            featured ? "text-4xl sm:text-6xl" : "text-3xl"
          }`}
        >
          {category}
        </p>
      </div>
    </div>
  );
}
