import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostArticle } from "@/components/post-article";
import { getPost, getPostsFor } from "@/lib/posts";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Not found" };
  return { title: post.title, description: post.tagline };
}

export default async function PublicationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post || post.section !== "publications") notFound();

  return (
    <PostArticle
      post={post}
      backHref="/publications"
      backLabel="Publications"
      related={(await getPostsFor("publications"))
        .filter((p) => p.id !== post.id)
        .slice(0, 3)}
    />
  );
}
