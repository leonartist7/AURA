# AURA CLUB — asset slots (abstract & textural only)

The redesigned landing uses **zero literal café/people photos**. Product moments are
carried by in-code mockups; atmosphere is carried by abstract texture, light, and the
video waves. Every slot degrades gracefully — the page never looks broken before
assets land.

## Shared grade suffix (paste at the END of every image prompt)

> Shot on 35mm film, Kodak Portra 400, warm analog grade, soft natural golden
> light, gentle film grain, shallow depth of field, true-to-life color.
> Strictly warm earthy palette: cream, beige, terracotta, saffron gold, dusty
> rose, muted plum, sage, espresso brown. Premium, intimate, editorial,
> documentary realism. No text, no logos, no watermarks, no UI, no people.
> Avoid blue/teal/cyan tones, neon, heavy HDR, harsh flash, oversaturation.
> Photoreal.

---

## Image slots (drop into `public/assets/brand/`)

### ★ P1 — `hero-glow.png` — 1600×1200, transparent/black PNG
Behind the hero phone. The single biggest premium upgrade.
> Warm out-of-focus bokeh light leak on black background — soft golden,
> terracotta, and amber orbs of defocused café light, organic film halation,
> no subject, no edges. Render for screen blend. *(+ shared grade)*

### ★ P1 — `footer-espresso.jpg` — 1792×1024
Full-bleed behind the final close, sunk to ~16% opacity under the wordmark.
> Extreme macro of fresh espresso crema swirling in a dark cup,
> caramel-and-mahogany tiger-striping, tiny golden bubbles catching one warm
> light, most of the frame deep espresso-black. Abstract, tactile. *(+ grade)*

### P2 — `cafe-corner.jpg` — 1792×1024
Texture for "The corner café" welcome vignette (16:9 crop).
> Close macro of a warm wooden café counter edge at golden hour — a ceramic
> cup rim, soft window haze, defocused espresso machine glow behind. No
> people, abstract warmth. *(+ shared grade)*

### P2 — `kitchen-warm.jpg` — 1792×1024
Texture for "The neighborhood kitchen" welcome vignette (16:9 crop).
> Close macro of a warm restaurant pass at dusk — the edge of a plated dish,
> brass lamp glow, linen napkin texture, deep cozy shadows. No people,
> abstract warmth. *(+ shared grade)*

### P2 — `divider-pour.jpg` — 1792×1024
Texture card in the "Morning" drift panel.
> Extreme close-up of steamed-milk microfoam folding into espresso to begin
> latte art, swirling terracotta and cream, glossy and slow. Abstract liquid
> macro, warm, calm center. *(+ shared grade)*

### P2 — `steam-dark.png` — 1200×1600, transparent/black PNG
Rising steam in the "After close" drift panel (screen blend).
> Soft wisps of warm white steam rising on a pure black background, delicate,
> lit from one warm side, organic, isolated for screen blend. *(+ grade)*

### P3 — testimonial portraits → `public/assets/testimonials/`
`elena-moretti.jpg`, `david-okonkwo.jpg`, `mei-tanaka.jpg` — 1024×1024 square,
tight head-and-shoulders, warm light, genuine relaxed half-smile, looking
slightly off camera. (Render as 52px circles — face must fill the frame.)
These are the only people on the page; initials fallback if absent.

---

## Video slots (drop into `public/media/`)

| File | Where | Notes |
|---|---|---|
| `waves-hero.mp4` | Hero background | Warm flowing waves; sits at 50% opacity under a cream veil. Loop seamlessly, ≤8MB, no audio. |
| `waves-dream.mp4` | "A place people belong to" drift panel | Dusk-toned waves; 40% opacity under a clay veil. |
| `waves-cta.mp4` | (reserved) final close | Optional; not yet wired. |

All video slots show a warm animated gradient until the file exists, and show
the gradient permanently for visitors with reduced-motion enabled.
