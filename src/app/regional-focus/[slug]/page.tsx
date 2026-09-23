import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TaxonomyPage } from "@/components/taxonomy-page";
import { getPostsFor } from "@/lib/posts";
import { getRegion, regionalFocus } from "@/lib/taxonomy";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return regionalFocus.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegion(slug);
  if (!region) return { title: "Not found" };
  return {
    title: region.title,
    description: region.summary ?? `Our coverage of ${region.title}.`,
  };
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const region = getRegion(slug);
  if (!region) notFound();

  return (
    <TaxonomyPage
      eyebrow="Regional Focus"
      entry={region}
      siblings={regionalFocus}
      basePath="/regional-focus"
      posts={await getPostsFor("regional-focus", slug)}
      siblingsLabel="Regional Focus"
    />
  );
}
