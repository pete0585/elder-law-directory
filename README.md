# Elder Law Attorney Directory

**Domain:** elderlawyerdirectory.com  
**Stack:** Next.js 14, Tailwind CSS, Supabase, Stripe, Resend, Vercel

Consumer-facing directory of elder law attorneys specializing in Medicaid planning, guardianship, estate planning, and long-term care. Built for families in crisis and the attorneys who serve them. 21x cheaper than ElderLawAnswers.com ($99/yr vs $2,100/yr).

---

## Setup (Local Development)

```bash
npm install
cp .env.example .env.local
# Fill in your env vars (see below)
npm run dev
```

---

## Environment Variables

All vars are already set in Vercel. This is for local dev only.

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://fbuqrnzofktepkzyfmhy.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (from bootstrap output) |
| `SUPABASE_SERVICE_ROLE_KEY` | (from bootstrap output) |
| `NEXT_PUBLIC_SITE_URL` | `https://elderlawyerdirectory.com` |
| `STRIPE_SECRET_KEY` | (from bootstrap output) |
| `STRIPE_WEBHOOK_SECRET` | `whsec_UuDwFDVtrQtfH8zjB0iyDMT1VEVl783a` |
| `STRIPE_VERIFIED_PRICE_ID` | `price_1TduqsGzK9SiblueIHdMkZxF` |
| `STRIPE_FEATURED_PRICE_ID` | `price_1TduqtGzK9Siblue6eE7CIGu` |
| `RESEND_API_KEY` | (from bootstrap output) |
| `RESEND_FROM_EMAIL` | `hello@mail.elderlawyerdirectory.com` |
| `NEXT_PUBLIC_DIRECTORY_SLUG` | `elder-law` |
| `INBOUND_WEBHOOK_SECRET` | `whsec_emuPZUjWA8sBrIS+u25YvBIjVW2NQKoi` |

---

## Supabase Setup

The migration is auto-applied by the builder. To apply manually:

```bash
# Apply to live Supabase project (fbuqrnzofktepkzyfmhy)
# Use the MCP tool or Supabase CLI:
supabase db push --db-url postgresql://postgres:[SERVICE_KEY]@db.fbuqrnzofktepkzyfmhy.supabase.co:5432/postgres
```

Tables created:
- `elder_listings` — attorney profiles
- `elder_claims` — claim verification tokens
- `elder_payments` — Stripe payment records
- `elder_leads` — family lead routing (future)

---

## Vercel Deployment

The GitHub repo `pete0585/elder-law-directory` is already linked to the Vercel project (`prj_wOdVdFzmFkMavLz4DDb8WF7Oki03`). All env vars are already set. Vercel auto-deploys on every push to main.

Custom domains configured:
- `elderlawyerdirectory.com` (apex)
- `www.elderlawyerdirectory.com`

---

## Revenue Model

- **Free:** Auto-seeded listing, name/city/phone visible
- **Verified ($99/yr):** Full profile, photo, bio, contact form, NAELA/CELA badges, priority placement
- **Featured ($199/yr):** #1 position in city/state, Featured badge, category sponsorship slot

Stripe products pre-configured. Webhook endpoint: `https://www.elderlawyerdirectory.com/api/webhooks/stripe`

---

## Data Seeding

Initial seed via data-seeder agent:
- DataForSEO Google Maps: "elder law attorney" across 100 metros (~10,000+ listings)
- NELF CELA directory: ~500 certified attorneys
- State bar directories: FL, TX, CA, NY, PA, OH

Daily growth: 5 new cities/day via `data-seeder-daily` cron after registration in `directories.json`.

---

## Outreach

Email outreach via Resend from `mail.elderlawyerdirectory.com`. 3-email sequence targets unclaimed listings. Warmup: 100 → 250 → 500 → 750/day over 4 weeks.

Inbound replies route to `https://www.elderlawyerdirectory.com/api/inbound-email` (must use www — Resend does not follow 307 redirects).

---

## IndexNow

Key file: `public/1d5d7ac59e3d78e161ee71458df23e21.txt`  
Key value: `1d5d7ac59e3d78e161ee71458df23e21`

Submit sitemap after deploy:
```bash
node skills/indexnow/indexnow.js submit-sitemap elderlawyerdirectory.com
```
