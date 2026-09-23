import Image from "next/image";
import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { LineMask, Reveal } from "@/components/reveal";
import {
  ButtonLink,
  Container,
  Section,
  SectionHead,
} from "@/components/ui";
import { practices } from "@/lib/content";
import { getPostsFor } from "@/lib/posts";
import { site } from "@/lib/site";
import { regionalFocus, researchAreas } from "@/lib/taxonomy";

export default async function Home() {
  return (
    <>
      <Hero />
      <Gap />
      <Coverage />
      {await LatestPublications()}
      <ClosingCta />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--rule)] pt-24 sm:pt-28">
      <Container>
        {/* Stacked on phones so the collage is never cropped; side by side from
            lg up, where the copy has room of its own. */}
        <div className="grid items-center gap-10 pb-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-20">
          <div>
            <span className="eyebrow">Geopolitical risk intelligence</span>

            <h1 className="display mt-6 text-[clamp(2.5rem,7.5vw,5.5rem)]">
              <LineMask lines={["Uncertain times,", "certain intelligence."]} />
            </h1>

            <Reveal delay={380}>
              <p className="mt-7 max-w-xl text-[1.0625rem] leading-relaxed text-[var(--text-dim)] sm:text-lg">
                {site.positioning} Our analysts combine regional depth with a
                structured analytic method.
              </p>
            </Reveal>

          </div>

          <Reveal delay={180}>
            <figure className="relative mx-auto w-full max-w-[36rem] lg:max-w-none">
              <div className="relative overflow-hidden border border-[var(--rule)] bg-[var(--surface-raised)]">
                <Image
                  src="/hero/collage.jpg"
                  alt="Collage of world leaders, protest crowds and newsprint"
                  width={735}
                  height={919}
                  priority
                  sizes="(min-width: 1024px) 46vw, 92vw"
                  className="h-auto w-full"
                />
              </div>
              <figcaption className="mono mt-3 text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-faint)]">
                The world is watching
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const gap = [
  {
    code: "01",
    title: "Academia holds the rigour",
    body: "Careful, peer-reviewed work on how states behave and how policy transmits into markets — written for other scholars, and published on a cycle measured in years.",
  },
  {
    code: "02",
    title: "Industry holds the urgency",
    body: "Firms in contested markets decide now, with incomplete information. The analysis available to them is fast, but often thin on method and unwilling to say what would prove it wrong.",
  },
  {
    code: "03",
    title: "We work in the gap",
    body: "Research that would survive academic scrutiny, written for someone who has to act on it, and delivered while the action is still available.",
  },
];

function Gap() {
  return (
    <Section className="border-b border-[var(--rule)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="What we do"
            title="We work in the gap between academia and industry."
            lede="One side has the rigour and not the timing. The other has the urgency and not the method."
          />
          <ButtonLink href="/what-we-do" variant="ghost">
            What we do
          </ButtonLink>
        </div>

        <div className="mt-14 grid gap-px lg:grid-cols-3">
          {gap.map((g, i) => (
            <Reveal key={g.code} delay={i * 90}>
              <div className="panel ticked h-full p-8 lg:p-10">
                <span className="mono text-xs text-[var(--color-watch)]">
                  {g.code}
                </span>
                <h3 className="display mt-6 text-2xl">{g.title}</h3>
                <p className="mt-4 text-[var(--text-dim)]">{g.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function Coverage() {
  return (
    <Section surface="ink" className="border-b border-[var(--rule)]">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <SectionHead
              eyebrow="Coverage"
              title="Eleven research areas, seven regions."
              lede="Each area is read for what it changes about the conditions our clients operate in, rather than studied for its own sake."
            />
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/research-areas">Research areas</ButtonLink>
              <ButtonLink href="/regional-focus" variant="ghost">
                Regional focus
              </ButtonLink>
            </div>
          </div>

          <div>
            <h3 className="eyebrow">Research Areas</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {researchAreas.map((a) => (
                <Link
                  key={a.slug}
                  href={`/research-areas/${a.slug}`}
                  className="mono border border-[var(--rule)] px-3.5 py-2 text-[0.625rem] tracking-[0.12em] uppercase text-[var(--text-dim)] transition-colors hover:border-[var(--color-watch)] hover:text-[var(--color-watch)]"
                >
                  {a.title}
                </Link>
              ))}
            </div>

            <h3 className="eyebrow mt-10">Regional Focus</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {regionalFocus.map((r) => (
                <Link
                  key={r.slug}
                  href={`/regional-focus/${r.slug}`}
                  className="mono border border-[var(--rule)] px-3.5 py-2 text-[0.625rem] tracking-[0.12em] uppercase text-[var(--text-dim)] transition-colors hover:border-[var(--color-watch)] hover:text-[var(--color-watch)]"
                >
                  {r.title}
                </Link>
              ))}
            </div>

            <div className="mt-12 grid gap-px sm:grid-cols-2">
              {practices.slice(0, 2).map((p) => (
                <div key={p.code} className="panel h-full p-6">
                  <h4 className="text-base text-[var(--text)]">{p.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-dim)]">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

async function LatestPublications() {
  const posts = (await getPostsFor("publications")).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <Section className="border-b border-[var(--rule)]">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            eyebrow="Publications"
            title="Recent work."
            lede="Policy briefs, white papers and working papers. Each states its key judgements separately from its reporting."
          />
          <ButtonLink href="/publications" variant="ghost">
            All publications
          </ButtonLink>
        </div>

        <div className="mt-14 grid gap-px sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 90}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function ClosingCta() {
  return (
    <Section>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <h2 className="display text-4xl sm:text-5xl lg:text-6xl">
            <LineMask
              lines={["Understand your exposure", "before it prices in."]}
            />
          </h2>
          <Reveal delay={200}>
            <p className="text-[var(--text-dim)]">
              Tell us where you operate and we will come back with an initial
              read on your exposure and what we would watch first. There is no
              obligation, and no charge for the conversation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Request a briefing</ButtonLink>
              <ButtonLink href="/what-we-do" variant="ghost">
                What we do
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
