# Wu Nen Film

"Wu nen" — Acholi for **"you will see."** A React (Vite) platform for Acholi
music videos and photography, and a booking system connecting anyone —
Acholi or not — with cameramen and producers for weddings, concerts, and
private events.

Cinematic dark UI with a warm ochre/terracotta accent and a geometric
zigzag motif drawn from Acholi beadwork, full-bleed looping hero video,
scroll-reveal animation, and a magnetic cursor — in the style of the
Christoph Nagel portfolio reference (awwwards.com/sites/christoph-nagel-portfolio).

## Structure

```
wu-nen-film/
├── src/                  → React app (deploy /dist to Cloudflare Pages)
│   ├── pages/             Home, Videos, Gallery, Events, Booking,
│   │                       About, Contact, Signup, Login, Dashboard
│   ├── components/        Nav, Footer, Layout, CursorDot, Reveal,
│   │                       ProtectedRoute
│   ├── lib/                supabaseClient.js, AuthContext.jsx
│   └── styles/global.css  Design system (colors, type, motion)
├── server/               → Deploy to Render (optional API)
│   ├── server.js
│   ├── routes/booking.js
│   └── .env.example
├── supabase/
│   └── schema.sql        → Run once in the Supabase SQL editor
├── public/_redirects     → Cloudflare Pages SPA routing rule
└── index.html / vite.config.js
```

## 1. Set up Supabase (auth + database)

1. Create a project at https://supabase.com.
2. Go to **SQL Editor**, paste `supabase/schema.sql`, and run it. This
   creates `profiles`, `bookings`, `events`, `gallery_images`,
   `music_videos`, `saved_videos`, `messages`, a public `gallery` storage
   bucket, and Row Level Security policies.
3. Go to **Project Settings → API** and copy the `Project URL` and
   `anon public` key.
4. Open `src/lib/supabaseClient.js` and replace:
   ```js
   const SUPABASE_URL = 'https://YOUR-PROJECT-REF.supabase.co';
   const SUPABASE_ANON_KEY = 'YOUR-SUPABASE-ANON-KEY';
   ```
5. Add real content by inserting rows into `music_videos`, `events`, and
   `gallery_images` via the Supabase Table Editor. Until you do, the site
   shows seed placeholder content automatically so it's never empty.
6. In **Authentication → URL Configuration**, add your Cloudflare Pages
   URL (e.g. `https://wu-nen-film.pages.dev`) as a Site/Redirect URL.

## 2. Run it locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## 3. Deploy the frontend to Cloudflare Pages

1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Set:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Deploy. Live at `https://<project>.pages.dev` (add a custom domain
   under Pages → Custom domains if you have one).
5. The included `public/_redirects` file ensures client-side routes
   (like `/dashboard` or `/booking`) work correctly on page refresh.

## 4. Deploy the API to Render (optional, for emails/admin tasks)

Skip this if you don't need server-side email — the site works fully
with just Supabase for auth, bookings, and the contact form.

1. Same GitHub repo works. In Render: **New → Web Service**, connect it.
2. Set:
   - **Root directory**: `server`
   - **Build command**: `npm install`
   - **Start command**: `npm start`
3. Add environment variables from `server/.env.example`:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` (Project Settings → API → `service_role`
     — keep secret, server-only)
   - `ALLOWED_ORIGIN` — your Cloudflare Pages URL
4. Deploy, then copy the resulting URL into `RENDER_API_URL` at the top
   of `src/pages/Booking.jsx`.
5. To send real emails, sign up for a provider like Resend, add
   `RESEND_API_KEY` to Render's env vars, and uncomment the fetch block
   in `server/routes/booking.js`.

## Replacing placeholder media

- The homepage hero uses a placeholder background video URL and an
  Unsplash poster image — swap the `<source>` in `src/pages/Home.jsx`
  with real Wu Nen Film footage (an MP4, ideally under ~10MB, muted).
- Music videos on `/videos` use YouTube embeds — replace the seed data's
  `youtube_id` values (or the `music_videos` Supabase table) with your
  real video IDs.
- Photos throughout are Unsplash placeholders — replace via the
  `gallery_images` table or the Supabase storage `gallery` bucket.

## Notes on cultural content

Acholi identity is represented through a geometric pattern motif
(inspired by beadwork) used sparingly as a structural/decorative
element — dividers, strips — rather than through stock photos of people
or costumes, per your request to include "some" cultural elements
without overdoing it. Swap in real photography from actual Wu Nen Film
shoots whenever you have it; that will do far more for authenticity
than any stock imagery.
# Wu-nen-film
