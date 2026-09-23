import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center pt-24">
      <Container>
        <span className="eyebrow">Error 404</span>
        <h1 className="display mt-6 text-[clamp(2.5rem,8vw,5rem)]">
          Position unresolved.
        </h1>
        <p className="prose-measure mt-6 text-lg text-[var(--text-dim)]">
          No fix on this coordinate. The page has moved, or it never existed.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/">Return home</ButtonLink>
          <ButtonLink href="/publications" variant="ghost">
            See our publications
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
