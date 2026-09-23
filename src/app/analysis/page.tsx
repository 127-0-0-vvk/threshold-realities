import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { Reveal } from "@/components/reveal";
import { Container, Notice, PageHeader, Section } from "@/components/ui";
import { getArticles } from "@/lib/analysis";

export const metadata: Metadata = {
  title: "Analysis",
  description:
    "Regular analysis on international relations, trade policy and supply chain exposure — written for people who have to act on it.",
};

export default function AnalysisPage() {
  const articles = getArticles();
  const [lead, ...rest] = articles;

  return (
    <>
      <PageHeader
        eyebrow="Analysis"
        title="Regular commentary, written to be argued with."
        lede="Shorter pieces on developments we are watching, published as they warrant it. Each one separates what is reported from what we assess, and says what would change our view."
      />

      <Container className="pt-10">
        <Notice>
          Opening set of articles, published for review. New pieces are added
          regularly.
        </Notice>
      </Container>

      <Section className="pt-10">
        <Container>
          {articles.length === 0 ? (
            <p className="py-16 text-center text-[var(--text-faint)]">
              Nothing published yet.
            </p>
          ) : (
            <>
              {lead ? (
                <Reveal className="mb-px block">
                  <ArticleCard article={lead} featured />
                </Reveal>
              ) : null}

              <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((article, i) => (
                  <Reveal key={article.slug} delay={i * 70}>
                    <ArticleCard article={article} />
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </Container>
      </Section>
    </>
  );
}
