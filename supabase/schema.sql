-- ============================================================
-- WU NEN FILM — Supabase schema
-- Run this in Supabase → SQL Editor (paste and Run).
-- Safe to re-run: uses IF NOT EXISTS / DROP POLICY guards.
-- ============================================================

-- ---------- profiles (extends auth.users) ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Profiles are viewable by owner" on public.profiles;
create policy "Profiles are viewable by owner"
  on public.profiles for select using (auth.uid() = id);

drop policy if exists "Profiles are editable by owner" on public.profiles;
create policy "Profiles are editable by owner"
  on public.profiles for update using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------- bookings ----------
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  service_type text not null,
  event_date date not null,
  location text not null,
  guest_count int,
  details text,
  status text not null default 'pending', -- pending | confirmed | completed | cancelled
  created_at timestamptz default now()
);

alter table public.bookings enable row level security;

drop policy if exists "Anyone can create a booking" on public.bookings;
create policy "Anyone can create a booking"
  on public.bookings for insert with check (true);

drop policy if exists "Users can view their own bookings" on public.bookings;
create policy "Users can view their own bookings"
  on public.bookings for select using (auth.uid() = user_id);

-- ---------- events (past work, publicly viewable) ----------
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  location text not null,
  event_date date not null,
  rating numeric(2,1) check (rating >= 0 and rating <= 5),
  cover_url text not null,
  summary text,
  created_at timestamptz default now()
);

alter table public.events enable row level security;

drop policy if exists "Events are publicly viewable" on public.events;
create policy "Events are publicly viewable"
  on public.events for select using (true);

-- ---------- gallery_images ----------
create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete set null,
  url text not null,
  category text not null, -- wedding | concert | culture | portrait
  caption text,
  created_at timestamptz default now()
);

alter table public.gallery_images enable row level security;

drop policy if exists "Gallery images are publicly viewable" on public.gallery_images;
create policy "Gallery images are publicly viewable"
  on public.gallery_images for select using (true);

-- ---------- music_videos ----------
create table if not exists public.music_videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  artist text not null,
  thumb text not null,
  youtube_id text not null,
  category text not null, -- Official Video | Live Session | Studio Session | Documentary
  created_at timestamptz default now()
);

alter table public.music_videos enable row level security;

drop policy if exists "Music videos are publicly viewable" on public.music_videos;
create policy "Music videos are publicly viewable"
  on public.music_videos for select using (true);

-- ---------- saved_videos (per-user favourites) ----------
create table if not exists public.saved_videos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  video_id uuid references public.music_videos(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(user_id, video_id)
);

alter table public.saved_videos enable row level security;

drop policy if exists "Users manage their own saved videos" on public.saved_videos;
create policy "Users manage their own saved videos"
  on public.saved_videos for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ---------- messages (contact form) ----------
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz default now()
);

alter table public.messages enable row level security;

drop policy if exists "Anyone can send a message" on public.messages;
create policy "Anyone can send a message"
  on public.messages for insert with check (true);

-- ============================================================
-- Storage buckets for uploaded photos/video thumbnails
-- ============================================================
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

drop policy if exists "Public read access to gallery bucket" on storage.objects;
create policy "Public read access to gallery bucket"
  on storage.objects for select using (bucket_id = 'gallery');

drop policy if exists "Authenticated users can upload to gallery bucket" on storage.objects;
create policy "Authenticated users can upload to gallery bucket"
  on storage.objects for insert
  with check (bucket_id = 'gallery' and auth.role() = 'authenticated');
