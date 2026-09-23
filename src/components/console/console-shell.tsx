"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { RichEditor } from "@/components/console/rich-editor";
import { pathForPost, SECTIONS, type Post } from "@/lib/sections";

type Storage = { backend: string; writable: boolean; detail: string };

type Draft = {
  id: string;
  section: string;
  page: string;
  title: string;
  tagline: string;
  body: string;
  image: string | null;
};

const empty: Draft = {
  id: "",
  section: "research-areas",
  page: "",
  title: "",
  tagline: "",
  body: "",
  image: null,
};

export function ConsoleShell({
  posts,
  storage,
}: {
  posts: Post[];
  storage: Storage;
}) {
  const [draft, setDraft] = useState<Draft>(empty);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [list, setList] = useState<Post[]>(posts);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const section = useMemo(
    () => SECTIONS.find((s) => s.slug === draft.section),
    [draft.section],
  );

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return list.filter(
      (p) =>
        (filter === "all" || p.section === filter) &&
        (q === "" || p.title.toLowerCase().includes(q)),
    );
  }, [list, filter, search]);
  const needsPage = (section?.pages.length ?? 0) > 0;

  function set<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((d) => ({ ...d, [key]: value }));
    setStatus(null);
    setError(null);
  }

  async function upload(file: File) {
    setUploading(true);
    setError(null);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/console/upload", { method: "POST", body: form });
    const data = await res.json().catch(() => ({}));
    setUploading(false);
    if (!res.ok) {
      setError(data.error ?? "Upload failed.");
      return;
    }
    set("image", data.url);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setStatus(null);
    setError(null);

    const emptyBody =
      !draft.body || draft.body.replace(/<[^>]*>/g, "").trim() === "";
    if (emptyBody) {
      setBusy(false);
      setError("An article is required.");
      return;
    }

    const res = await fetch("/api/console/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);

    if (!res.ok) {
      setError(data.error ?? "Could not save.");
      return;
    }
    setStatus(`Published at ${data.url}`);
    setList((l) => [data.post as Post, ...l.filter((p) => p.id !== data.post.id)]);
    setDraft({ ...empty, section: draft.section, page: draft.page });
  }

  /* Two-step inline confirm rather than window.confirm. Browsers suppress
     repeat dialogs, and a suppressed confirm silently returns false — the
     delete would simply never fire, with nothing to show for it. */
  async function remove(id: string) {
    setError(null);
    const res = await fetch(`/api/console/posts?id=${id}`, { method: "DELETE" });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error ?? "Could not delete.");
      setPendingDelete(null);
      return;
    }
    setList((l) => l.filter((p) => p.id !== id));
    setPendingDelete(null);
    setStatus("Post deleted.");
    if (draft.id === id) setDraft(empty);
  }

  function edit(post: Post) {
    setDraft({
      id: post.id,
      section: post.section,
      page: post.page,
      title: post.title,
      tagline: post.tagline,
      body: post.body,
      image: post.image,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">Console</span>
          <h1 className="display mt-3 text-4xl">Post an article.</h1>
        </div>
        <form action="/api/console/logout" method="post">
          <button
            type="button"
            onClick={async () => {
              await fetch("/api/console/logout", { method: "POST" });
              window.location.reload();
            }}
            className="mono border border-[var(--rule)] px-4 py-2.5 text-[0.625rem] tracking-[0.16em] uppercase text-[var(--text-dim)] hover:border-[var(--color-watch)] hover:text-[var(--color-watch)]"
          >
            Sign out
          </button>
        </form>
      </div>

      <p
        className="mono mt-8 border px-4 py-3 text-[0.6875rem] leading-relaxed"
        style={{
          borderColor: storage.writable
            ? "var(--rule)"
            : "var(--color-critical)",
          color: storage.writable
            ? "var(--text-dim)"
            : "var(--color-critical)",
        }}
      >
        <span className="uppercase tracking-[0.16em]">{storage.backend}</span>
        {" — "}
        {storage.detail}
      </p>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <form onSubmit={submit} className="space-y-7">
          {/* Where it goes */}
          <fieldset className="border border-[var(--rule)] p-6">
            <legend className="eyebrow px-2">Destination</legend>

            <label htmlFor="section" className="eyebrow mt-2 block">
              Section
            </label>
            <select
              id="section"
              value={draft.section}
              onChange={(e) => {
                set("section", e.target.value);
                set("page", "");
              }}
              className="mono mt-3 w-full border border-[var(--rule)] bg-transparent px-3 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[var(--color-watch)]"
            >
              {SECTIONS.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.label}
                </option>
              ))}
            </select>

            {needsPage ? (
              <>
                <label htmlFor="page" className="eyebrow mt-6 block">
                  Page
                </label>
                <select
                  id="page"
                  value={draft.page}
                  onChange={(e) => set("page", e.target.value)}
                  required
                  className="mono mt-3 w-full border border-[var(--rule)] bg-transparent px-3 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[var(--color-watch)]"
                >
                  <option value="">Choose a page…</option>
                  {section?.pages.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <p className="mt-4 text-sm text-[var(--text-dim)]">
                Publications has no sub-pages — this posts to the Publications
                index.
              </p>
            )}
          </fieldset>

          {/* The post */}
          <fieldset className="space-y-6 border border-[var(--rule)] p-6">
            <legend className="eyebrow px-2">The post</legend>

            <div>
              <label htmlFor="image" className="eyebrow block">
                Main article photo
              </label>
              {draft.image ? (
                <div className="mt-3 flex items-center gap-4">
                  <div className="relative h-20 w-32 shrink-0 overflow-hidden border border-[var(--rule)]">
                    <Image
                      src={draft.image}
                      alt=""
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => set("image", null)}
                    className="mono text-[0.625rem] tracking-[0.16em] uppercase text-[var(--color-watch)] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : null}
              <input
                id="image"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void upload(f);
                }}
                className="mono mt-3 block w-full text-xs text-[var(--text-dim)] file:mr-4 file:border file:border-[var(--rule)] file:bg-transparent file:px-4 file:py-2 file:text-[0.625rem] file:uppercase file:tracking-[0.16em] file:text-[var(--text)]"
              />
              <p className="mono mt-2 text-[0.625rem] text-[var(--text-faint)]">
                {uploading
                  ? "Uploading…"
                  : "Shown on the card and at the top of the article. JPG, PNG, WebP or AVIF, up to 6 MB."}
              </p>
            </div>

            <Field
              id="title"
              label="Headline"
              value={draft.title}
              onChange={(v) => set("title", v)}
              required
            />
            <Field
              id="tagline"
              label="Tagline"
              value={draft.tagline}
              onChange={(v) => set("tagline", v)}
              hint="One or two sentences. Shown on the card and under the headline."
            />

            <div>
              <span className="eyebrow block">
                Article
                <span style={{ color: "var(--color-critical)" }}> *</span>
              </span>
              <div className="mt-3">
                <RichEditor
                  value={draft.body}
                  onChange={(html) => set("body", html)}
                />
              </div>
            </div>
          </fieldset>

          {error ? (
            <p
              className="mono text-[0.6875rem] leading-relaxed"
              style={{ color: "var(--color-critical)" }}
            >
              {error}
            </p>
          ) : null}
          {status ? (
            <p
              className="mono text-[0.6875rem] leading-relaxed"
              style={{ color: "var(--color-stable)" }}
            >
              {status}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={busy || uploading}
              className="mono bg-[var(--color-brand)] px-7 py-4 text-[0.6875rem] tracking-[0.16em] uppercase text-[var(--color-on-brand)] transition-colors hover:bg-[var(--color-brand-strong)] disabled:opacity-50"
            >
              {busy ? "Publishing…" : draft.id ? "Update post" : "Publish"}
            </button>
            {draft.id ? (
              <button
                type="button"
                onClick={() => setDraft(empty)}
                className="mono text-[0.625rem] tracking-[0.16em] uppercase text-[var(--text-dim)] hover:text-[var(--text)]"
              >
                Cancel edit
              </button>
            ) : null}
          </div>
        </form>

        {/* Existing posts */}
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="eyebrow">Published ({list.length})</h2>
            {visible.length !== list.length ? (
              <span className="mono text-[0.625rem] tracking-[0.14em] uppercase text-[var(--text-faint)]">
                {visible.length} shown
              </span>
            ) : null}
          </div>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {[{ slug: "all", label: "All" }, ...SECTIONS].map((s) => {
              const count =
                s.slug === "all"
                  ? list.length
                  : list.filter((p) => p.section === s.slug).length;
              return (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => setFilter(s.slug)}
                  aria-pressed={filter === s.slug}
                  className={`mono border px-3 py-1.5 text-[0.625rem] tracking-[0.12em] uppercase transition-colors ${
                    filter === s.slug
                      ? "border-[var(--color-watch)] text-[var(--color-watch)]"
                      : "border-[var(--rule)] text-[var(--text-dim)] hover:border-[var(--text-faint)] hover:text-[var(--text)]"
                  }`}
                >
                  {s.label} ({count})
                </button>
              );
            })}
          </div>

          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search headlines…"
            aria-label="Search published articles"
            className="mt-3 w-full border-b border-[var(--rule)] bg-transparent py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-faint)] focus:border-[var(--color-watch)]"
          />

          <div className="mt-5 divide-y divide-[var(--rule)] border-y border-[var(--rule)]">
            {visible.length === 0 ? (
              <p className="py-8 text-sm text-[var(--text-faint)]">
                {list.length === 0
                  ? "Nothing posted yet."
                  : "No articles match this filter."}
              </p>
            ) : (
              visible.map((p) => (
                <article key={p.id} className="flex items-start gap-4 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-[var(--text)]">
                      {p.title}
                    </p>
                    <p className="mono mt-1 text-[0.625rem] tracking-[0.12em] uppercase text-[var(--text-faint)]">
                      {p.id} &middot; {p.section}
                      {p.page ? ` / ${p.page}` : ""}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <a
                      href={pathForPost(p)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono text-[0.625rem] tracking-[0.16em] uppercase text-[var(--text-faint)] hover:text-[var(--text)]"
                    >
                      View
                    </a>
                    <button
                      type="button"
                      onClick={() => edit(p)}
                      className="mono text-[0.625rem] tracking-[0.16em] uppercase text-[var(--color-watch)] hover:underline"
                    >
                      Edit
                    </button>
                    {pendingDelete === p.id ? (
                      <>
                        <button
                          type="button"
                          onClick={() => void remove(p.id)}
                          className="mono text-[0.625rem] tracking-[0.16em] uppercase underline"
                          style={{ color: "var(--color-critical)" }}
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setPendingDelete(null)}
                          className="mono text-[0.625rem] tracking-[0.16em] uppercase text-[var(--text-faint)] hover:text-[var(--text)]"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setPendingDelete(p.id)}
                        className="mono text-[0.625rem] tracking-[0.16em] uppercase hover:underline"
                        style={{ color: "var(--color-critical)" }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  required = false,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow block">
        {label}
        {required ? (
          <span style={{ color: "var(--color-critical)" }}> *</span>
        ) : null}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-3 w-full border-b border-[var(--rule)] bg-transparent py-2.5 text-[var(--text)] outline-none focus:border-[var(--color-watch)]"
      />
      {hint ? (
        <p className="mono mt-2 text-[0.625rem] text-[var(--text-faint)]">{hint}</p>
      ) : null}
    </div>
  );
}
