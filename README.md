# Aura — Café Health Diagnostic

In-person, 8-screen sales tool for closing café owners on Aura's loyalty + retention platform. Built mobile-first, designed to be held up to an owner across a table and walked through in 5–8 minutes.

---

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** w/ custom Aura tokens
- **Framer Motion** for every transition and counter
- **canvas-confetti** for the thank-you celebration
- **next/font/google** Fraunces (display) + Inter (body)

No backend required for V1 — submissions POST to `/api/submit-diagnostic`, which currently logs the payload and returns `200`.

---

## Quick start

```bash
npm install
npm run dev
# → http://localhost:3000
```

Open in Chrome DevTools at iPhone 14 Pro viewport (393×852) for the intended in-café experience.

### Build for production

```bash
npm run build
npm start
```

---

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import on [vercel.com/new](https://vercel.com/new) — no env vars needed for the placeholder backend.
3. Once deployed, swap the placeholder `/api/submit-diagnostic` endpoint with one of the options below.

---

## Wire up a real backend

The route at `app/api/submit-diagnostic/route.ts` ships as a placeholder. Pick one:

### Option A — Resend (recommended)

```bash
npm i resend
```

Set `RESEND_API_KEY` in Vercel env. Replace the `console.log` block with a `resend.emails.send(...)` call that sends:
- a notification to **you** with the full payload
- an optional confirmation to the **owner** (`payload.answers.email`)

### Option B — Zapier / Make / n8n webhook

Add `DIAGNOSTIC_WEBHOOK_URL` to env. Forward `payload` via `fetch(url, { method: 'POST', body: ... })`.

### Option C — Database

Write to Supabase / Airtable / Postgres. Schema:
- `cafe_name`, `neighborhood`, `years_open`, `customers_per_day`
- `recognition_pct`, `regular_loss_discovery`, `return_rate_prediction`
- `ordering_channels[]`, `delivery_app_pct`, `last_marketing_attempt`
- `google_url`, `instagram_handle`
- `email`, `phone`
- `score_total`, `score_retention`, `score_marketing`, `score_direct_ordering`, `score_online_presence`
- `submitted_at`

---

## Media slots — where to drop your assets

The app renders beautiful gradient fallbacks when these are missing. Add them as you build:

| Slot | Path | Spec |
|---|---|---|
| Screen 1 hero loop | `public/media/hero-loop.mp4` | 8s loop, 9:16 mobile, MP4 h.264, < 2MB. Cinematic gradient/coffee atmosphere (e.g. Seedance / Runway). |
| Card 1 illustration | `public/media/cards/card-1.png` | 600×600, editorial illustration. Optional. |
| Card 2 illustration | `public/media/cards/card-2.png` | Same. Optional. |
| Card 3 illustration | `public/media/cards/card-3.png` | Same. Optional. |

To use a `CardIllustration` with a real image, edit `components/ui/CardIllustration.tsx` to render `<Image>` when the file exists.

---

## Score tweaking

Open `lib/scoreEngine.ts` — every weight is a single line. Don't touch the UI:

```ts
// retention (0-25)
recognitionPct * 0.15 + (noticesAndReaches ? 5 : 0) + returnRatePred * 0.1

// marketing (0-25)
(triedMarketing ? 10 : 0) + (deliveryPct > 40 ? -5 : 0) + (hasDirectOrdering ? 15 : 0)

// directOrdering (0-25)
25 - deliveryPct * 0.2

// onlinePresence (0-25)
(hasGoogle ? 10 : 0) + (hasInstagram ? 10 : 0) + 5
```

Badge thresholds + percentile curve also live in the same file.

The leak calc is in `lib/leakCalc.ts` — default ticket is **$8 CAD**. Bump if your ICP runs higher.

---

## Project layout

```
app/
  layout.tsx                 fonts, viewport, atmosphere
  page.tsx                   renders <DiagnosticFlow />
  globals.css                Tailwind base + Aura CSS vars + reduced-motion
  api/submit-diagnostic/
    route.ts                 placeholder submission endpoint
components/
  DiagnosticFlow.tsx         orchestrator (state, routing, persistence)
  screens/                   one file per screen (1–9)
  ui/                        primitives (Button, Slider, ChoiceCard, ...)
lib/
  scoreEngine.ts             pure score math
  leakCalc.ts                leak math + CAD formatter
  prescriptions.ts           personalised Screen 8 cards
  storage.ts                 localStorage hook (mid-session restore)
  validateEmail.ts           friendly email validator
  calgaryNeighborhoods.ts    curated dropdown list
  motion.ts                  shared Framer variants
  types.ts                   DiagnosticAnswers, ScoreResult, ...
public/media/                drop hero loop + card illustrations here
design-system/aura-cafe-diagnostic/
  MASTER.md                  ui-ux-pro-max generated design guidance
```

---

## Pre-demo checklist

Before walking into your first café with this:

- [ ] `npm run build` passes with zero errors
- [ ] Tested at 393×852 (iPhone 14 Pro) in DevTools
- [ ] Walked the full 8-screen flow once on the actual device you'll use
- [ ] Refreshed mid-flow — state restores correctly
- [ ] Submitted a test email — confirmed it lands wherever it needs to
- [ ] Phone is charged and on Do Not Disturb
- [ ] Browser bookmark to `your-deploy.vercel.app` on home screen

Good luck. Close them.
