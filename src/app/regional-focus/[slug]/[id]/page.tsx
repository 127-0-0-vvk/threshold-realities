import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostArticle } from "@/components/post-article";
import { getPost, getPostsFor } from "@/lib/posts";
import { getRegion } from "@/lib/taxonomy";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) return { title: "Not found" };
  return { title: post.title, description: post.tagline };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const area = getRegion(slug);
  const post = await getPost(id);
  if (!area || !post || post.section !== "regional-focus" || post.page !== slug) {
    notFound();
  }

  return (
    <PostArticle
      post={post}
      backHref={`/regional-focus/${slug}`}
      backLabel={area.title}
      related={(await getPostsFor("regional-focus", slug))
        .filter((p) => p.id !== post.id)
        .slice(0, 3)}
    />
  );
}
