# CLAUDE.md — Hibiscus to Airport (hibiscustoairport.co.nz)

## Business Details (DO NOT INVENT OR CHANGE)

- **Business Name:** Hibiscus to Airport
- **Website:** https://hibiscustoairport.co.nz
- **Phone:** 021 743 321 (international: +64-21-743-321)
- **Customer-facing Email:** info@bookaride.co.nz (shown on website)
- **Booking Admin Email:** bookings@bookaride.co.nz (where booking notifications go)
- **Sender Email (from):** noreply@bookaride.co.nz (outgoing emails sent from this address)
- **Service Area:** Hibiscus Coast (Orewa, Whangaparaoa, Silverdale, Red Beach, Gulf Harbour, Stanmore Bay) to Auckland Airport
- **Hours:** 24/7 including public holidays
- **Currency:** NZD

## What this repo is (OWNER-APPROVED — September 2026)

A React/Vite **frontend only**. There is **no backend here**. This site is a
storefront for the shared Book A Ride platform, exactly like bookaridenz.com:

- All `/api/*` requests are proxied by `vercel.json` to
  `https://www.bookaride.co.nz/api/*` — shared Neon database, shared Stripe
  account, shared pricing engine, shared emails/SMS.
- **There is ONE admin and ONE dashboard for all sites**: bookaride.co.nz/admin.
  `/admin` on this domain redirects there (see `vercel.json`). Drivers use the
  bookaride.co.nz driver portal. Do not rebuild an admin, driver portal,
  booking lookup or tracking page in this repo.
- The booking page and the post-payment page are copied **verbatim** from the
  bookaride.co.nz repo — never edit them here (see "Booking page mirror").

### What was removed (September 2026)
The private Vercel serverless API (`api/`: Neon, Stripe, Twilio, Mailgun,
crons), its own pricing engine, and every page that depended on it (admin
dashboard, cockpit, driver portal, customer tracking, flight tracker,
My Booking, the old `BookingPage.jsx`). Create React App + craco were
replaced by Vite. Do not reintroduce any of them.

## Booking page mirror — NO DRIFT (owner rule)

The booking system must be **identical** on bookaride.co.nz, bookaridenz.com
and this site. `frontend/scripts/sync-booking.mjs` holds the list of mirrored
files (`pages/BookNow.jsx`, `pages/PaymentSuccess.jsx`, DateTimePicker,
GoogleAddressInput, TrustBadges, LoadingSpinner, `lib/analytics.js`,
`config/api.js`, and the shadcn ui primitives the page imports) and
`frontend/scripts/booking-mirror.json` records the source commit plus a hash
per file.

- `npm run check:booking` runs automatically before every build and **fails
  the build** if any mirrored file differs from the manifest.
- To change anything on the booking page: make the change in the
  bookaride.co.nz repo (`Book-A-Ride-Gap-Digital/BookARide`), merge it there,
  then here run `cd frontend && npm run sync:booking -- <path-to-BookARide>`
  (defaults to a sibling `../BookARide` checkout, or set `BOOKARIDE_SRC`),
  commit the synced files + manifest, and ship.
- Never "fix" a drift failure by editing the mirrored files on this side.
- The mirrored page needs `src/config/siteConfig.js`, `src/components/SEO.jsx`
  and `src/i18n.js` to exist with their current exports — keep them.

## Architecture

- **Platform:** Vercel — static frontend, `/api/*` rewrite to bookaride.co.nz
- **Frontend:** React 18 + Vite + Tailwind + shadcn/ui (`frontend/`)
- **Routes:** `frontend/src/App.jsx`. Booking lives at `/book-now`
  (`/booking` and `/pricing` redirect to it). Stripe returns customers to
  `/payment-success`.
- **Analytics:** PostHog snippet in `frontend/index.html`, plus the shared
  platform's first-party `/api/track` beacon from the mirrored `analytics.js`.
- **Address autocomplete:** server-side via the shared `/api/places/autocomplete`
  — **never load Google Maps JS in the browser** and never add a Maps API key
  to this site.
- **Env vars:** none required. `VITE_BACKEND_URL` may point the booking page
  at another API origin for local dev only. **Never** use `process.env.REACT_APP_*`.

## Standing workflow rules (owner-approved)

1. **Ship green, ship current.** When work is complete and the build passes,
   push it and merge — do not leave approved work sitting unmerged.
2. **Verify before merge**: `cd frontend && npm run build` must pass with zero
   errors (this includes the mirror check).
3. **Never change business contact details.** Phone is 021 743 321 everywhere;
   any other number is a bug — fix it.
4. **No contact form.** The Contact section is a booking CTA with phone/email.
5. **Never introduce a backend, database, email/SMS provider, payment
   provider or tracker** in this repo. Everything server-side lives in the
   BookARide repo and is governed by its CLAUDE.md.
6. Don't create backup files; edit in place. Don't rename or reorganise files
   without being asked.
7. Every page component stays wrapped in the app-level Error Boundary; white
   screens are unacceptable.

## Key Files

- `vercel.json` — build command, `/api` proxy, redirects (`/admin` → shared dashboard)
- `frontend/index.html` — SEO meta tags, JSON-LD schemas, PostHog
- `frontend/src/App.jsx` — routes
- `frontend/src/pages/HomePage.jsx` — landing page
- `frontend/src/pages/BookNow.jsx` — **mirrored, do not edit**
- `frontend/src/pages/PaymentSuccess.jsx` — **mirrored, do not edit**
- `frontend/scripts/sync-booking.mjs` — mirror sync + drift check
- `frontend/src/components/SEO.jsx`, `src/config/siteConfig.js`, `src/i18n.js`
  — support files the mirrored page imports
