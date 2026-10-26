-- =====================================================================
-- Ideal English School: CMS database setup
-- Paste this WHOLE file into Supabase > SQL Editor > New query > Run.
-- It is safe to run more than once (it only adds what is missing).
-- =====================================================================

-- 1. Who is allowed to use the admin panel -----------------------------
create table if not exists public.cms_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.cms_admins enable row level security;

create or replace function public.is_cms_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$ select exists (select 1 from public.cms_admins where user_id = auth.uid()) $$;
grant execute on function public.is_cms_admin() to anon, authenticated;

drop policy if exists "Admins can read their own admin row" on public.cms_admins;
create policy "Admins can read their own admin row"
  on public.cms_admins for select to authenticated
  using (user_id = auth.uid());

-- 2. Website text and settings (one row per setting) -------------------
create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  content_key text not null,
  content_value text not null default '',
  updated_at timestamptz not null default now()
);
alter table public.site_content add column if not exists updated_at timestamptz not null default now();
do $$ begin
  create unique index if not exists site_content_key_uq on public.site_content (content_key);
exception when others then
  raise notice 'Could not make content_key unique (duplicate keys exist). Delete duplicates when convenient.';
end $$;

-- 3. Notices -----------------------------------------------------------
create table if not exists public.school_notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null default '',
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.school_notices add column if not exists summary text not null default '';
alter table public.school_notices add column if not exists category text not null default 'Circular';
alter table public.school_notices add column if not exists notice_date date;
alter table public.school_notices add column if not exists file_url text;
alter table public.school_notices alter column body set default '';

-- 4. Gallery photos ----------------------------------------------------
create table if not exists public.school_gallery (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text not null default '',
  display_order integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.school_gallery add column if not exists alt_text text not null default '';
alter table public.school_gallery add column if not exists category text not null default 'Events';

-- 5. Row Level Security: visitors read published rows, admins do all ---
alter table public.site_content   enable row level security;
alter table public.school_notices enable row level security;
alter table public.school_gallery enable row level security;

grant select on public.site_content, public.school_notices, public.school_gallery to anon;
grant select, insert, update, delete on public.site_content, public.school_notices, public.school_gallery to authenticated;
grant select on public.cms_admins to authenticated;

-- site_content
drop policy if exists "Anyone can read site content" on public.site_content;
create policy "Anyone can read site content" on public.site_content for select to anon, authenticated using (true);
drop policy if exists "Admins manage site content" on public.site_content;
create policy "Admins manage site content" on public.site_content for all to authenticated
  using ((select public.is_cms_admin())) with check ((select public.is_cms_admin()));

-- notices
drop policy if exists "Anyone can read published notices" on public.school_notices;
create policy "Anyone can read published notices" on public.school_notices for select to anon, authenticated using (published = true);
drop policy if exists "Admins manage notices" on public.school_notices;
create policy "Admins manage notices" on public.school_notices for all to authenticated
  using ((select public.is_cms_admin())) with check ((select public.is_cms_admin()));

-- gallery
drop policy if exists "Anyone can read published gallery photos" on public.school_gallery;
create policy "Anyone can read published gallery photos" on public.school_gallery for select to anon, authenticated using (published = true);
drop policy if exists "Admins manage gallery" on public.school_gallery;
create policy "Admins manage gallery" on public.school_gallery for all to authenticated
  using ((select public.is_cms_admin())) with check ((select public.is_cms_admin()));

-- 6. Storage bucket for photos and notice attachments ------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('school-gallery', 'school-gallery', true, 10485760,
        array['image/jpeg','image/png','image/webp','image/gif','application/pdf'])
on conflict (id) do update set public = true, file_size_limit = 10485760,
  allowed_mime_types = array['image/jpeg','image/png','image/webp','image/gif','application/pdf'];

drop policy if exists "CMS admins can upload school gallery images" on storage.objects;
create policy "CMS admins can upload school gallery images" on storage.objects for insert to authenticated
  with check (bucket_id = 'school-gallery' and (select public.is_cms_admin()));
drop policy if exists "CMS admins can update school gallery images" on storage.objects;
create policy "CMS admins can update school gallery images" on storage.objects for update to authenticated
  using (bucket_id = 'school-gallery' and (select public.is_cms_admin()))
  with check (bucket_id = 'school-gallery' and (select public.is_cms_admin()));
drop policy if exists "CMS admins can delete school gallery images" on storage.objects;
create policy "CMS admins can delete school gallery images" on storage.objects for delete to authenticated
  using (bucket_id = 'school-gallery' and (select public.is_cms_admin()));

-- 7. Make yourself an admin --------------------------------------------
-- First create your login in Supabase > Authentication > Users > Add user
-- (tick "Auto Confirm User"). Then replace the email below with yours,
-- remove the two leading dashes, and run just that statement:
--
-- insert into public.cms_admins (user_id)
-- select id from auth.users where email = 'YOUR-EMAIL@EXAMPLE.COM'
-- on conflict do nothing;
