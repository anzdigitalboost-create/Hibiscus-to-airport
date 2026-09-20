# CLAUDE.md - Source of Truth for Hibiscus to Airport

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

## Architecture (OWNER-APPROVED — March 2026)

**Single-platform deployment on Vercel. No separate backend service.**

- **Platform:** Vercel (frontend + serverless API routes — ONE deployment)
- **Frontend:** React app (Create React App + Craco + Tailwind)
- **API:** Vercel Serverless Functions (Node.js) in `/api/` directory
- **Database:** Neon (PostgreSQL) via `@neondatabase/serverless` — DO NOT use MongoDB
- **Payments:** Stripe (Node.js SDK)
- **SMS:** Twilio (Node.js SDK)
- **Email:** Resend HTTP API (owner-approved switch from Mailgun, September 2026) — DO NOT use Gmail API, Mailgun, SendGrid or raw SMTP
- **Analytics:** PostHog
- **Geocoding / Autocomplete:** Google Maps API (`@react-google-maps/api`) — API key set in Vercel as `REACT_APP_GOOGLE_MAPS_API_KEY`. Falls back to plain text inputs when key is missing.
- **Scheduled Jobs:** Vercel Cron Jobs (vercel.json) — replaces APScheduler

### Why Single-Platform (No Separate Backend)
- **Zero cold starts** — Vercel serverless functions are always warm
- **One system to monitor** — no Render, no Docker, no second deploy pipeline
- **Faster deployments** — push to main, everything deploys together
- **Reduced errors** — no CORS cross-origin issues, no backend/frontend version mismatches
- **Lower cost** — one platform instead of two

### What Was Removed
- FastAPI (Python) backend on Render — **RETIRED**
- Docker/Dockerfile — **RETIRED**
- render.yaml — **RETIRED**
- APScheduler — replaced by Vercel Cron Jobs
- Mailgun — replaced by Resend (September 2026); env vars `MAILGUN_API_KEY`/`MAILGUN_DOMAIN` are no longer read
- asyncpg — replaced by `@neondatabase/serverless` (designed for serverless)

## The 10 Rules (MANDATORY — Every AI Session)

> **These are the foundation of how this system is built and maintained. Non-negotiable.**

| # | Rule | What It Means |
|---|------|---------------|
| 1 | **Scan Before You Build** | Every session starts by checking for security issues, broken code, and problems — BEFORE doing anything new. |
| 2 | **Auto-Repair** | If you find a bug while working on anything, fix it immediately. No "that's out of scope" excuses. |
| 3 | **Proactive Research** | Before building anything significant, check if there's a better library, technique, or approach. No guessing. |
| 4 | **Engineering Gap Detection** | Systematically check for features that promise something the code can't deliver, missing error handling, security gaps. |
| 5 | **Technology Currency** | Check if our tools are up to date. If there's a newer, faster, safer version — upgrade (within approved stack). |
| 6 | **Explain Like You're Not A Developer** | All communication in plain English. "Your users were seeing X, now they see Y" — not tech jargon. |
| 7 | **Never Leave It Worse** | Every file you touch gets cleaned up. No leaving messes behind. |
| 8 | **Autonomous Testing** | After changes, verify everything still works. No "it should be fine". |
| 9 | **Mandatory Documentation** | Every change gets documented so the next session knows what happened. |
| 10 | **No Guessing** | If you don't know, research it. If you can't find the answer, ask the owner. Never assume. |

## Engineering Quality Rules (MANDATORY)

> **These rules enforce The 10 Rules at the code level.**

### Proactive Bug Detection (Rules 1, 2, 4)
1. **Before writing new code, scan for existing bugs** in files you're touching. Fix them.
2. **Every function must have error handling.** No bare `try/catch` that silently swallows errors.
3. **All user input must be validated and sanitized** before use in database queries, emails, or SMS.
4. **HTML-escape all user-provided data** before inserting into email templates (prevent XSS/injection).

### Security — Non-Negotiable (Rules 1, 4)
5. **Never expose API keys, secrets, or tokens** in client-side code or git history.
6. **JWT_SECRET_KEY must be a real environment variable** — never generate random secrets at runtime.
7. **All admin endpoints must require authentication.** No exceptions.
8. **Password reset tokens must have expiry validation** — check `expires_at` before allowing reset.
9. **Rate limit sensitive endpoints** — booking creation, login attempts, SMS/email resend.

### Performance (Rules 3, 5)
10. **Add database indexes** on frequently queried columns (booking_ref, email, created_at, date).
11. **Never SELECT * in list queries** — only select columns you need.
12. **Use connection pooling** appropriate for the runtime (serverless = @neondatabase/serverless).

### Frontend Reliability (Rules 2, 7, 8)
13. **Every page component must be wrapped in an Error Boundary.** White screens are unacceptable.
14. **All API calls must have loading states, error states, and retry logic.**
15. **Phone number on every page must be 021 743 321.** Any other number is a bug — fix it immediately.

### Code Quality (Rules 7, 9)
16. **No dead code.** Remove unused imports, variables, and commented-out blocks.
17. **No console.log in production.** Use proper error tracking or remove.
18. **Consistent API response format:** `{ ok: true/false, data: ..., error: "..." }`
19. **All dates stored in ISO 8601 UTC.** Display in NZ timezone on frontend only.

### Build Verification (MANDATORY — No Exceptions)
20. **Run `cd frontend && yarn build` after EVERY set of changes.** If it doesn't build, it doesn't get committed.
21. **After build passes, run a full import/route crawl** — verify every page component loads, every import resolves, no undefined references.
22. **No broken features on the live site.** If a feature doesn't work end-to-end, remove it or fix it. Never ship half-working code.
23. **Test what you changed.** Don't just read the code — verify it compiles, verify the logic executes, verify the API endpoints respond.

### Autonomous Operation (Rules 2, 3, 4, 10)
24. **If you find a bug while working on something else, fix it.** Don't leave it for later.
25. **If a dependency is outdated and has known vulnerabilities, flag it.**
26. **If an engineering gap exists (missing validation, missing error handling, missing indexes), fix it on the spot.**
27. **Never introduce a new technology or provider without explicit owner approval.** The stack is locked.

## Important Rules for AI Sessions

1. **Never invent contact details.** Use only the emails and phone numbers listed above. If you don't know a detail, ask — don't guess.
2. **No contact form.** The site drives users to book directly. The Contact section is a booking CTA with phone/email, not a message form.
3. **Don't create backup files.** Edit files in place.
4. **Don't rename or reorganise files** without being asked.
5. **Test changes** against existing patterns in the codebase before introducing new ones.
6. **Never swap out the database or email provider.** The stack is Neon (PostgreSQL) + Resend. Do not introduce MongoDB, Firebase, Gmail API, Mailgun, SendGrid, or any other provider.
7. **Never change business contact details** (phone, emails, website URL). These are listed above and must not be altered.
8. **Phone number is 021 743 321.** Any other phone number (e.g., 021 123 4567) is wrong. Fix it if you see it.

## Key Files

- `frontend/public/index.html` - SEO meta tags, JSON-LD schemas
- `frontend/src/pages/HomePage.jsx` - Main landing page
- `frontend/src/pages/BookingPage.jsx` - Booking form
- `api/` - Vercel Serverless Functions (all API endpoints)
- `api/lib/db.js` - Neon PostgreSQL connection (serverless)
- `api/lib/email.js` - Resend email utilities
- `api/lib/sms.js` - Twilio SMS utilities
- `api/lib/pricing.js` - Pricing engine
- `api/lib/auth.js` - JWT authentication
- `api/bookings.js` - Booking CRUD endpoints
- `api/admin/` - Admin dashboard API endpoints

## Legacy Files (DELETED — March 2026)

- `backend/` - Former FastAPI backend — **DELETED** (code lives in `api/_shared/`)
- `Dockerfile` - Former Docker config — **DELETED**
- `render.yaml` - Former Render config — **DELETED**
