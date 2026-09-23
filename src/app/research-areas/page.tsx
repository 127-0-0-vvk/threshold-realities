import type { Metadata } from "next";
import { TaxonomyIndex } from "@/components/taxonomy-page";
import { researchAreas } from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "Research Areas",
  description:
    "The eleven areas our research covers, from international affairs and defence through to critical minerals, energy security and space.",
};

export default function ResearchAreasPage() {
  return (
    <TaxonomyIndex
      eyebrow="Research Areas"
      title="Eleven areas, held together by one question."
      lede="Each area is read for what it changes about the conditions our clients operate in, rather than studied for its own sake."
      entries={researchAreas}
      basePath="/research-areas"
    />
  );
}
