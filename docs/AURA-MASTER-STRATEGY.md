# AURA — Master Strategy & Production Plan

> Decision-grade strategy for turning AURA from a polished prototype into a
> launchable, revenue-generating business.
>
> **Grounded in the real codebase** (Next.js 14.2.15 app in this repo) as of
> this writing. Every technical claim cites a file. Opinions are strong on
> purpose — push back where you disagree. Confidence is tagged per major call.
>
> Legend: `[ASSUMPTION]` = a belief that changes the advice if wrong ·
> `(high/med/low)` = my confidence in the recommendation.

---

# Executive Summary

AURA is a loyalty + direct-ordering + marketing product for independent cafés,
sold neighborhood-by-neighborhood in Calgary with a scarcity hook ("a few
partners per zone") and a genuinely clever lead magnet — the *Café Health
Diagnostic*. The brand and landing craft are already top-decile. The business
underneath them is not built yet.

Three things are true at once: **(1)** the front door is beautiful, **(2)** the
single best asset — the diagnostic — currently throws away 100% of the leads it
captures (`app/api/submit-diagnostic/route.ts` only `console.log`s them), and
**(3)** there is no product behind the promise: no diner-facing loyalty app, no
accounts, no payments, no database — anywhere in the repo. You are selling a
club that doesn't have a door yet.

The three biggest moves: **fix the lead leak this week** (it's a one-day job
blocking everything), **answer the "why not just use Square's free loyalty"
objection** before you pitch another café, and **decide whether v1 is software
or a concierge service** so you stop trying to build a SaaS and start closing
the first ten neighborhoods. The #1 risk: spending months polishing the pitch
for a product whose core loop (diner signs up at the counter, comes back, redeems)
has never been tested with a single real café.

---

# Top 10 Moves, Ranked

The whole strategy as an ordered action list. If you only do the top 5, you
still have a business.

1. **Stop the lead leak (P0, ~1 day).** Wire `submit-diagnostic` to Resend +
   a database/sheet so every completed diagnostic reaches you. Right now the
   funnel converts beautifully and then deletes the result. *(high)*
2. **Write the "vs Square / Toast / DoorDash" kill sheet.** One page answering
   "why pay you when my POS loyalty is free." If you can't answer this crisply,
   no amount of design closes deals. *(high)*
3. **Decide: concierge-first, not SaaS-first.** Launch v1 as a done-for-you
   service (you set up the club, you run the campaigns) wrapped in light
   software. Build the SaaS only after 10 cafés prove the loop. *(med)*
4. **Build the diner-side MVP — the actual product.** A counter QR → 5-second
   signup → wallet pass → redemption. This is the loop the entire pitch
   promises and it does not exist in code. *(high)*
5. **Close 3 lighthouse cafés in ONE Calgary neighborhood.** Named, local,
   with real before/after numbers. Density first, then replicate. *(high)*
6. **Replace anchor-link CTAs with a real booking flow.** Every "Claim free
   month" is `href="#offer"` — it scrolls, it doesn't book. Add Cal.com. *(high)*
7. **Pin down pricing and put a number on the table.** "Held for the demo" is
   fine as theater but you need an internal model: price, CAC, payback, churn.
   *(med)*
8. **Instrument everything.** Analytics on the funnel + diagnostic drop-off.
   You are flying blind on the one funnel you have. *(high)*
9. **Manufacture trust assets.** 2–3 named local café testimonials with real
   numbers beat any amount of copy. Generic social proof is worthless here. *(high)*
10. **Ship legal + compliance (CASL).** Collecting diner email/phone for
    marketing in Canada is regulated. Consent capture is a feature, not a
    footnote. *(med)*

---

# Product Vision

**The deeper purpose.** AURA sells a café owner the one thing the delivery apps
stole: *ownership of their own customer relationship.* DoorDash and Uber Eats
turned regulars into anonymous order-IDs and rented the café's own customers
back to them at 30% commission. AURA's real product is **"these are YOUR people
again."**

**The emotional job.** The owner is hiring AURA to stop a quiet grief — the
regular who just… stopped coming, and they never knew why (this is literally
encoded in your diagnostic: `regularLossDiscovery: 'usually-dont-notice'`). The
feeling to sell is *relief plus quiet pride* — "I finally have a system, and it
feels like me, not like a chain."

**The one true differentiator.** Not the features (Square has most of them). It's
**positioning + done-for-you + local exclusivity**: the anti-DoorDash club that's
already running before you've finished your coffee, with only a couple of cafés
per neighborhood. Lean all the way into that; do not try to out-feature Toast.

**The wow moment.** A returning diner taps their phone at the counter and the
barista greets them by name with their usual already suggested. That's the demo
that closes. Today it exists only as a static mockup on the landing
(`AuraLanding.tsx` loyalty-card visuals) — make it real and the sale makes itself.

**What's missing from the concept.** The diner. The entire pitch is owner-facing;
the human who actually has to download/join/return is absent from the product and
nearly absent from the strategy. **This is the central blind spot.** *(high)*

**What to cut.** The `/prototype` "One Day" scroll piece is gorgeous but it's a
brand film, not a product — keep it as a pitch asset, don't let it absorb build
time. Resist adding AI-marketing breadth until the loyalty loop works.

---

# Brand Strategy

The brand is the strongest thing you have. Protect it; don't over-build it.

- **Personality.** Warm, crafted, quietly confident. A great independent café in
  brand form — not a tech startup, not a fintech. The romantic/operator duality
  you already identified is correct and rare: **seduce the romantic (craft,
  belonging, ritual), then close the operator (margin, retention, real numbers).**
  Keep both voices; never collapse to one. *(high)*
- **Positioning.** "The anti-app club." Where DoorDash makes your customers
  someone else's, AURA makes them yours again — and only a few cafés per
  neighborhood get in.
- **What it must NEVER feel like:** a punch-card app, a QR-code spam machine, a
  generic "marketing platform," or anything cold/blue/SaaS-grey. Your `no
  blue/teal, Kodak Portra` rule is right — enforce it ruthlessly.
- **Brand story (one line):** *"You built a place people love. AURA makes sure
  they keep coming back — and that they're yours, not the app's."*
- **Tagline directions:**
  1. *Your regulars, on purpose.* (current, strong — keep)
  2. *The club that remembers them.*
  3. *Own your regulars again.* (sharpest for the anti-DoorDash angle)
- **Premium on a budget:** real photography of *actual local cafés* (not stock),
  named owners, hand-set type, restraint. The grain/warmth system already does
  most of the work. The fastest credibility unlock is **specificity** — real
  café names, real Calgary neighborhoods, real dollar figures.

---

# UI/UX Master Plan

What exists is the marketing landing (`components/aura/AuraLanding.tsx`, ~1,780
lines, 7 sections) and the diagnostic flow (`components/DiagnosticFlow.tsx`, 8
screens). What's missing is *every authenticated surface* — there is no app, no
dashboard, no diner experience.

**Top 3 UX priorities:**
1. **Make the primary CTA actually do something.** Across the landing the main
   action is `href="#offer"` / `href="#close"` — it scrolls to a section, it
   does not book a demo or capture a lead. The entire funnel dead-ends in an
   anchor jump. Highest-leverage UX fix on the site. *(high)*
2. **Close the diagnostic loop visibly.** The diagnostic ends in confetti
   (`ThankYouScreen.tsx`) but the owner gets nothing durable — no emailed report,
   no "we'll text you." Add an immediate emailed PDF/score recap. The moment of
   peak intent currently evaporates. *(high)*
3. **Design the counter moment.** The single most important screen in the whole
   product — diner signup at a busy counter in <5 seconds — does not exist yet.

**Cross-cutting:** the diagnostic already handles loading/restore/empty edge
cases well (`lib/storage.ts` localStorage persistence, viewport guard, browser-back
support in `DiagnosticFlow.tsx`) — that quality bar needs to carry into the app
surfaces you haven't built. Accessibility: pinch-zoom is correctly allowed
(`app/layout.tsx` viewport), reduced-motion is respected (`ThankYouScreen.tsx`) —
good instincts; keep them.

---

# Page-by-Page Breakdown

For each surface: its job, must-have elements, and the one thing most likely to
lose the user. **Bold = does not exist yet.**

### Marketing site (exists, polish)
| Page | Job | Must-haves | Biggest drop-off risk |
|---|---|---|---|
| `/` Landing | Book a demo | Real booking CTA, named local proof, the anti-DoorDash story, scarcity counter | CTA is an anchor link → no conversion path |
| `/diagnostic` | Capture qualified lead | Working submit, emailed recap, clear "what next" | Lead is captured then dropped server-side |
| **`/pricing`** | Pre-frame the demo | Anchor price + "tailored on demo", risk reversal | Total absence of price reads as "expensive/sketchy" to some SMBs |
| **`/cafes/[name]` case studies** | Manufacture trust | Before/after numbers, owner quote, photos | Without these the whole site feels aspirational, not proven |
| `/prototype` | Pitch film | Keep as sales asset | Don't index it (already excluded in `robots.ts`) |

### Product surfaces (build)
| Surface | Job | Must-haves | Biggest risk |
|---|---|---|---|
| **Diner signup (QR landing)** | Join in <5s at the counter | Phone/email, instant wallet pass, CASL consent | Any friction here kills the whole loop |
| **Diner wallet pass / mini-app** | Bring them back | Points balance, next reward, "your usual" | Nobody installs a heavy app — use Apple/Google Wallet passes |
| **Redemption (barista view)** | Reward in 1 tap | Lookup by phone/scan, offline tolerance | Café wifi is flaky; must degrade gracefully |
| **Owner dashboard** | Prove ROI weekly | Active members, repeat-visit lift, revenue retained, campaign sender | If it doesn't show ROI, they churn |
| **Owner onboarding** | Launch the club in days | Menu/reward setup, QR/table-tent assets, staff training | Owner is time-poor; must be near-zero effort |
| **Admin (yours)** | Run the concierge | Lead inbox, per-café campaign tools, health monitor | You'll run ops in spreadsheets without this |
| **Auth / accounts** | Gate the app | Owner + staff roles, magic-link | None of this exists yet |

---

# Feature Architecture

Sorted by priority. Format: value · complexity (S/M/L) · main risk.

### Must-have (no product without these)
- **Diner signup + wallet pass** — the core loop · L · adoption friction at counter.
- **Points / rewards engine** — the loyalty mechanic the landing already mocks
  (`Free pastry / Free shot / Free drink`, `AuraLanding.tsx`) · M · keep rules dead simple.
- **Barista redemption** — M · must work offline-ish.
- **Owner dashboard with ROI metrics** — M · the anti-churn surface.
- **Lead capture backend** (Resend + DB) — fixes the P0 leak · S · do this first.
- **Auth (owner + staff)** — S/M · use magic-link, skip passwords.
- **Booking flow** (Cal.com) — S · replaces anchor CTAs.

### High-value
- **Direct online ordering, commission-free** — the headline promise
  (`AuraLanding.tsx:1130`) · L · big build; consider phase 2 or partner integration.
- **Automated win-back campaign** ("we miss you" to lapsed regulars) — M · this
  is the emotional core of the diagnostic made real.
- **Diagnostic → CRM auto-pipeline** — S · score + answers become a sales record.

### Delight
- **"Your usual" suggestion** at the counter — M · the wow moment.
- **Birthday reward automation** — S · already hinted on the landing.
- **Owner "win of the week" digest** — S · retention through small dopamine.

### Future expansion
- AI marketing copy generation (the "marketing person I couldn't afford" line) · M.
- Multi-location / small-chain support — **decide the data model now** even if you
  build later, or you'll pay for it · L.
- Referral between diners · M.

### Cut candidates (sound good, probably not now)
- A full native mobile app — wallet passes beat it for adoption · avoid.
- Broad "AI marketing suite" before loyalty works — scope creep · defer.
- The scroll-film as product — it's a brand asset, not a feature.

---

# Go-to-Market

**This is field sales in Calgary, not inbound SaaS.** Your code knows it
(`lib/calgaryNeighborhoods.ts`); the strategy must commit to it.

- **Motion:** founder-led, walk-in / door-to-door, one neighborhood at a time.
  The diagnostic is your door-opener — "give me 5 minutes, I'll show you what's
  leaking out your door." Run it *in person, on an iPad.*
- **Land density, then expand.** Win 3 cafés in one neighborhood (e.g. Kensington
  or Inglewood) before touching the next. Local proof compounds; "the café down
  the street uses it" is your best closer. The scarcity hook (`ZONES_OPEN`) only
  works if you actually honor density. *(high)*
- **Channels that matter:** (1) in-person diagnostic, (2) local café-owner word of
  mouth, (3) local roaster/supplier partnerships (they already have every café's
  trust and contact). **Channels to ignore for now:** broad paid social, SEO,
  cold email at scale — wrong stage, wrong buyer. *(med)*
- **The kill sheet (do this before pitching):** a crisp answer to "why not Square
  Loyalty / Toast / Fivestars / a punch card." Your honest edges: done-for-you
  setup, anti-DoorDash direct ordering, local exclusivity, a brand the café is
  proud to put on the counter. Square wins on price-of-zero; you win on
  "we run it for you and it's actually good." *(high)*
- **Offer:** "First month free, we build it with you in 14 days, no commission,
  no long contract" (already on the landing) is a strong risk-reversal. Keep it.
- **Trust, fast:** named local cafés + real numbers + a face. Your founder being
  a real Calgarian who shows up in person *is* the trust strategy at this stage.
- **Retention/upsell:** the weekly ROI digest is your retention engine; direct
  ordering and AI marketing are your upsells once loyalty is sticky.

---

# Operations

Think like the company that has to deliver the "done-for-you" promise.

- **Onboarding (your core ops):** a repeatable 14-day playbook — menu/rewards
  setup, printed QR table-tents, a 20-minute barista training, go-live. Document
  it as a checklist before café #1; you'll run it dozens of times.
- **The staff problem.** Baristas turn over constantly and will silently kill the
  product if it slows the line. Design redemption for a *new hire on day one*.
  Build a 60-second "how to redeem" card for the counter. *(high)*
- **Support:** a shared inbox + a 3-page owner FAQ covers launch. Don't build a
  help center yet.
- **The 5 KPIs that actually matter:** (1) diner signups per café per week,
  (2) repeat-visit rate lift, (3) café MRR + churn, (4) diagnostic→demo→close
  rate, (5) revenue retained per café (your ROI proof). Everything else is vanity.
- **Admin tooling you'll need early:** a lead inbox (from the now-fixed
  diagnostic), a per-café campaign sender, and a simple health view (which cafés
  have low signups → at churn risk).
- **Automation wins:** diagnostic → CRM record, win-back campaigns, the weekly
  digest. These are also *features*, so build once, use twice.
- **Security/privacy:** you're holding diner PII (email/phone) — see CASL below;
  this is a real obligation, not optional.
- **Breaks at 10x:** the concierge model. Doing setup + campaigns by hand for 10
  cafés is fine; for 100 it's a staffing wall. That's *when* you productize the
  manual steps — not before.

---

# Technical Readiness (Launch-Blocker Checklist)

Grounded in the actual repo. **BLOCKER** = can't launch · **SHOULD-FIX** =
launch embarrassed · **NICE** = later.

**Stack today:** Next.js 14.2.15, React 18, framer-motion, gsap, canvas-confetti
(`package.json`). No backend services, no DB, no auth, no payments. State is
client-only via `localStorage` (`lib/storage.ts`).

| Item | Status | Evidence |
|---|---|---|
| Lead capture backend | **BLOCKER** | `app/api/submit-diagnostic/route.ts` only `console.log`s and returns `{ok:true}`. `PrescriptionScreen.tsx:52` posts to it. Leads vanish. |
| Database / persistence | **BLOCKER** | None. Add Postgres/Supabase. Diagnostic answers, leads, cafés, diners, points all need to live somewhere. |
| Diner-facing app (the product) | **BLOCKER** | Does not exist. Only static loyalty-card mockups in `AuraLanding.tsx`. |
| Auth / authorization | **BLOCKER** | None. Needed for owner dashboard + staff redemption. Use magic-link. |
| Payments / subscriptions | **BLOCKER** (for revenue) | None. Stripe + "first month free" trial logic. |
| Real booking CTA | **SHOULD-FIX** | All CTAs are `href="#offer"` anchors in `AuraLanding.tsx`. Add Cal.com. |
| Emailed diagnostic recap | **SHOULD-FIX** | Flow ends at confetti (`ThankYouScreen.tsx`); nothing durable sent. |
| Analytics / funnel instrumentation | **SHOULD-FIX** | None installed. Add Plausible/PostHog + diagnostic drop-off events. |
| Error handling on submit | **SHOULD-FIX** | `PrescriptionScreen.tsx:52` posts; confirm failure UX if the (future real) endpoint errors. |
| Env vars / secrets management | **SHOULD-FIX** | Set `NEXT_PUBLIC_SITE_URL` (added in `lib/site.ts`), plus future `RESEND_API_KEY`, `DATABASE_URL`, `STRIPE_*`. |
| Legal pages + CASL consent | **SHOULD-FIX** | None. Required once you collect diner PII. |
| Monitoring / logging | **NICE** | Add Sentry once there's a backend to break. |
| Tests | **NICE** | None. Add for the score/leak engines (`lib/scoreEngine.ts`, `lib/leakCalc.ts`) — they're pure and high-value to lock down. |
| SEO / favicon / OG | **DONE** | Shipped: `icon.svg`, `opengraph-image.tsx`, `robots.ts`, `sitemap.ts`, JSON-LD. |

**Recommended additions (name them):** `lib/db.ts` (Supabase client),
`app/api/leads/route.ts` (real capture), `lib/email.ts` (Resend), `lib/auth.ts`
(magic-link), `app/(app)/dashboard/` (owner), `app/join/[cafe]/` (diner signup),
`app/(app)/redeem/` (barista), `app/(admin)/` (your ops), `app/privacy/` +
`app/terms/`.

---

# Critical Risks & Blind Spots

Brutally honest, grounded.

1. **You're selling a product that doesn't exist yet.** The landing promises a
   running loyalty + ordering club; the repo has a marketing site and a quiz.
   The gap between pitch and product is the single biggest risk. *(high)*
2. **The "free Square loyalty" objection is unanswered.** If a café owner's POS
   already does points for ~free, your whole sale rests on done-for-you + brand +
   anti-DoorDash. That's defensible *only if you can say it in one breath.* *(high)*
3. **The diner is missing.** Loyalty is a two-sided network; you've designed one
   side. If diners won't sign up at the counter, nothing else matters — and
   you have zero evidence they will yet. **Validate this before building more.** *(high)*
4. **The leak model is a sales prop, not truth.** `lib/leakCalc.ts` hardcodes
   `avgTicket=8`, `visitsPerLost=1.5`, `0.15` churn factor. It's a persuasive
   estimate (and labeled "illustrative" on the landing — good), but don't start
   believing your own marketing math when modeling real unit economics. *(med)*
5. **Concierge doesn't scale, and that's a feature now / trap later.** Hand-running
   campaigns wins the first 10 cafés and walls you at 100. Plan the productization
   trigger explicitly. *(med)*
6. **Scarcity is a promise you must keep.** "A few per neighborhood" builds urgency
   but caps your own revenue per zone and becomes a lie if you oversell. Decide the
   real cap. *(med)*
7. **[ASSUMPTION] Calgary-only, founder-sold.** The whole plan assumes a local,
   in-person motion. If you actually intend remote/multi-city SaaS from day one,
   most of the GTM section changes — flag this if so. *(would change advice)*

**Validate before building:** (a) will diners sign up at the counter? (b) will one
café pay real money after the free month? (c) does the diagnostic→close rate
justify the field-sales time? Get to 3 paying cafés before building the SaaS.

---

# Roadmap

Phased. Each: goal · top tasks · complexity · dependencies · success looks like.

### Phase 0 — Immediate fixes (this week)
- **Goal:** stop losing leads; make the site convert.
- **Tasks:** wire `submit-diagnostic` → Resend + Supabase/sheet; emailed score
  recap; replace anchor CTAs with Cal.com; install analytics; set
  `NEXT_PUBLIC_SITE_URL`.
- **Complexity:** S–M · **Deps:** Resend + Supabase accounts.
- **Success:** every diagnostic reaches your inbox; demos get booked online.

### Phase 1 — MVP production readiness (concierge + thin software)
- **Goal:** run a real club for 3 lighthouse cafés, mostly by hand.
- **Tasks:** diner QR signup + wallet pass; barista redemption; simple points
  engine; minimal owner dashboard (signups, repeat lift); auth (magic-link);
  CASL consent; privacy/terms.
- **Complexity:** L · **Deps:** Phase 0, DB, auth.
- **Success:** 3 Calgary cafés live, diners signing up at the counter, you can
  show one real before/after number.

### Phase 2 — Launch version (sellable, repeatable)
- **Goal:** sell to a whole neighborhood without bespoke work each time.
- **Tasks:** Stripe subscriptions + free-month trial; owner self-onboarding;
  win-back + birthday automations; weekly ROI digest; admin lead/campaign tools;
  case-study pages from Phase 1 cafés.
- **Complexity:** L · **Deps:** Phase 1 proof.
- **Success:** a café onboards in days with minimal founder time; first paid MRR;
  one neighborhood at density.

### Phase 3 — Growth version
- **Goal:** repeat the neighborhood playbook; reduce CAC.
- **Tasks:** referral loops (diner + café), roaster/supplier partnerships,
  multi-location data model, funnel optimization from real analytics.
- **Complexity:** M–L · **Success:** predictable per-neighborhood economics; word
  of mouth driving inbound.

### Phase 4 — Premium / expansion
- **Goal:** higher ARPU + new segments.
- **Tasks:** commission-free direct online ordering, AI marketing assistant,
  small-chain/franchise support, second city.
- **Complexity:** L · **Success:** upsell revenue exceeds base loyalty MRR;
  playbook proven outside Calgary.

---

# What Changed in Review

The most important corrections my own critique forced on the first draft:

- **Reframed v1 from SaaS to concierge.** First draft assumed "build the
  platform." For a thin-margin, field-sold SMB segment, building software before
  proving the loop by hand is the classic way to die. Concierge-first is the
  bigger strategic call.
- **Promoted "the diner is missing" from a UX note to the #1 product risk.** It's
  the two-sided-network failure mode and it was under-weighted.
- **Made the lead leak P0 and concrete.** Cited the exact file; it's a one-day fix
  blocking everything, so it leads the roadmap.
- **Killed generic "add testimonials."** Replaced with "named local cafés + real
  numbers or it's worthless" — the only kind of proof that works on burned SMB buyers.
- **Demanded the Square/Toast kill sheet before more building.** Strategy is moot
  if the first objection isn't answered.
- **Flagged the leak-math as a sales prop, not truth,** so it doesn't poison the
  real unit-economics model.
- **Surfaced the Calgary-only assumption explicitly** — if false, the GTM section
  is wrong, so it's labeled rather than buried.

---

# Open Questions (only the ones that actually change the plan)

1. **Calgary-only and founder-sold, or remote multi-city SaaS?** This forks the
   entire GTM and ops strategy. The codebase says local; confirm the intent.
2. **Does AURA replace the POS or sit beside it?** Determines whether you need POS
   integrations (hard) or run standalone (faster, but double-entry for staff).
3. **What's the real price and target MRR per café?** Needed to model whether
   field-sales CAC is even viable.

Everything else I've made a reasonable call on and labeled. Start with Phase 0 —
it's a week of work and it unblocks the entire funnel.
