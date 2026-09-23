import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TaxonomyPage } from "@/components/taxonomy-page";
import { getResearchArea, researchAreas } from "@/lib/taxonomy";

export function generateStaticParams() {
  return researchAreas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const area = getResearchArea(slug);
  if (!area) return { title: "Not found" };
  return {
    title: area.title,
    description:
      area.summary ?? `Our research coverage of ${area.title.toLowerCase()}.`,
  };
}

export default async function ResearchAreaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = getResearchArea(slug);
  if (!area) notFound();

  return (
    <TaxonomyPage
      eyebrow="Research Area"
      entry={area}
      siblings={researchAreas}
      basePath="/research-areas"
      siblingsLabel="Research Areas"
    />
  );
}
