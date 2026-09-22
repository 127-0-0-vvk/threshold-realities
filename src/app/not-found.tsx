import { ChartMap } from "@/components/chart-map";
import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden pt-24">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <ChartMap className="w-full max-w-[1400px] opacity-30" />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 70% at 50% 50%, transparent 5%, var(--color-abyssal) 75%)",
        }}
        aria-hidden
      />
      <Container className="relative">
        <span className="eyebrow">Error 404</span>
        <h1 className="display mt-6 text-5xl sm:text-7xl">Position unresolved.</h1>
        <p className="prose-measure mt-6 text-lg text-[var(--text-dim)]">
          No fix on this coordinate. The page has moved, or it never existed.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/">Return to chart</ButtonLink>
          <ButtonLink href="/tracker" variant="ghost">
            Open the tracker
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
