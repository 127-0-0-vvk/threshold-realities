import Link from "next/link";
import { ButtonLink, Container, PageHeader, Section, SectionHead } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import type { TaxonomyEntry } from "@/lib/taxonomy";

/**
 * Shared page for a research area or a regional focus.
 *
 * Entries carry no body yet. Until `sections` is filled in on an entry, the
 * page renders an honest "in preparation" state rather than a blank shell —
 * see `src/lib/taxonomy.ts`.
 */
export function TaxonomyPage({
  eyebrow,
  entry,
  siblings,
  basePath,
  siblingsLabel,
}: {
  eyebrow: string;
  entry: TaxonomyEntry;
  siblings: TaxonomyEntry[];
  basePath: string;
  siblingsLabel: string;
}) {
  const hasBody = Boolean(entry.sections?.length);

  return (
    <>
      <PageHeader eyebrow={eyebrow} title={entry.title} lede={entry.summary} />

      <Section>
        <Container>
          {hasBody ? (
            <div className="prose-measure space-y-12">
              {entry.sections!.map((s) => (
                <section key={s.heading}>
                  <h2 className="display text-2xl sm:text-3xl">{s.heading}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-[var(--text-dim)]">
                    {s.body}
                  </p>
                </section>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="border border-[var(--rule)] bg-[var(--surface-raised)] px-6 py-16 text-center sm:px-12 sm:py-20">
                <span className="eyebrow">In preparation</span>
                <h2 className="display mx-auto mt-5 max-w-2xl text-3xl sm:text-4xl">
                  This page is being written.
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-[var(--text-dim)]">
                  We are setting out our coverage of {entry.title.toLowerCase()} —
                  what we track, how we assess it, and the work we have published.
                  In the meantime, our analysts are available to discuss it
                  directly.
                </p>
                <div className="mt-9 flex flex-wrap justify-center gap-3">
                  <ButtonLink href="/contact">Speak to an analyst</ButtonLink>
                  <ButtonLink href="/publications" variant="ghost">
                    See our publications
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          )}
        </Container>
      </Section>

      <Section surface="ink" className="border-t border-[var(--rule)]">
        <Container>
          <SectionHead eyebrow={siblingsLabel} title="Related coverage." />
          <div className="mt-10 flex flex-wrap gap-2">
            {siblings
              .filter((s) => s.slug !== entry.slug)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`${basePath}/${s.slug}`}
                  className="mono border border-[var(--rule)] px-4 py-2.5 text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-dim)] transition-colors hover:border-[var(--color-watch)] hover:text-[var(--color-watch)]"
                >
                  {s.title}
                </Link>
              ))}
          </div>
        </Container>
      </Section>
    </>
  );
}

/** Index listing for a whole taxonomy. */
export function TaxonomyIndex({
  eyebrow,
  title,
  lede,
  entries,
  basePath,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  entries: TaxonomyEntry[];
  basePath: string;
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} lede={lede} />
      <Section>
        <Container>
          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((e, i) => (
              <Reveal key={e.slug} delay={i * 45}>
                <Link
                  href={`${basePath}/${e.slug}`}
                  className="panel ticked group flex h-full flex-col justify-between gap-8 p-8"
                >
                  <span className="mono text-xs text-[var(--text-faint)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="display text-2xl leading-tight transition-colors group-hover:text-[var(--color-watch)]">
                      {e.title}
                    </h2>
                    <span className="mono mt-4 inline-flex items-center gap-2 text-[0.625rem] tracking-[0.16em] uppercase text-[var(--color-watch)]">
                      View
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
