import type { Metadata } from "next";
import { TaxonomyIndex } from "@/components/taxonomy-page";
import { regionalFocus } from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "Regional Focus",
  description:
    "The regions we cover: Asia Pacific, Indo-Pacific, Americas, West Asia, Europe, Africa and South Asia.",
};

export default function RegionalFocusPage() {
  return (
    <TaxonomyIndex
      eyebrow="Regional Focus"
      title="Where we work."
      lede="Every region we list has an analyst who reads the language and has spent time on the ground. Where that is not the case, we say the region is outside our coverage."
      entries={regionalFocus}
      basePath="/regional-focus"
    />
  );
}
