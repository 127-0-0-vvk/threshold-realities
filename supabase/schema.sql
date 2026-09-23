-- Threshold Realities — console storage
-- Run this once in the Supabase SQL editor (Dashboard -> SQL Editor -> New query).

create table if not exists public.posts (
  id          text primary key,
  section     text not null check (section in ('publications','research-areas','regional-focus')),
  page        text not null default '',
  title       text not null,
  tagline     text not null default '',
  body        text not null,
  image       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index if not exists posts_section_page_idx on public.posts (section, page);
create index if not exists posts_created_at_idx   on public.posts (created_at desc);

-- Row Level Security is on with no public policies. The site reads and writes
-- through the service role key from server-side code only, which bypasses RLS.
-- Nothing reaches the browser with a key attached, so leaving this closed is
-- correct: it means a leaked anon key grants nothing.
alter table public.posts enable row level security;

-- Storage bucket for post images. Public read so <Image> can fetch them;
-- writes still require the service role.
insert into storage.buckets (id, name, public)
values ('post-images', 'post-images', true)
on conflict (id) do nothing;
