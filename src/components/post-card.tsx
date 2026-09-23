import Image from "next/image";
import Link from "next/link";
import { formatDate, pathForPost, type Post } from "@/lib/sections";

/** Card for an article posted through the console. */
export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={pathForPost(post)}
      className="panel ticked group flex h-full flex-col overflow-hidden"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden border-b border-[var(--rule)]">
        {post.image ? (
          <Image
            src={post.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, 100vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className="flex h-full w-full items-end p-5"
            style={{
              background:
                "linear-gradient(150deg, var(--surface-raised) 0%, color-mix(in srgb, var(--color-graticule) 28%, var(--surface)) 100%)",
            }}
          >
            <span className="mono text-[0.625rem] tracking-[0.2em] uppercase text-[var(--text-faint)]">
              No. {post.id}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="mono text-[0.625rem] tracking-[0.16em] uppercase text-[var(--color-watch)]">
          No. {post.id}
        </span>
        <h3 className="display mt-3 text-2xl leading-tight transition-colors group-hover:text-[var(--color-watch)]">
          {post.title}
        </h3>
        {post.tagline ? (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-dim)]">
            {post.tagline}
          </p>
        ) : (
          <div className="flex-1" />
        )}
        <span className="mono mt-6 text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-faint)]">
          {formatDate(post.createdAt)}
        </span>
      </div>
    </Link>
  );
}
