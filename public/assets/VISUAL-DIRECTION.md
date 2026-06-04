# AURA — Master Visual Direction

> This supersedes `IMAGE-PROMPTS.md` for art direction. It does two jobs:
> **Part One** sharpens the 9 photos you already generated so they sit *inside*
> the design instead of on top of it. **Part Two** adds a small, deliberate set
> of non-people / abstract assets that raise the premium feel without turning a
> restrained editorial site into a stock-photo collage. **Part Three** is the
> restraint list — the slots that are stronger *without* a photo.

---

## 0. The visual DNA (read this before generating anything)

AURA is a warm, editorial, "specialty-café-at-golden-hour" world. Everything
obeys one idea: **a daylight arc** — the page travels from morning cream, through
afternoon clay, into one espresso-dark night moment, and closes dark in the
footer. Images must feel like frames from *the same roll of film*, shot the same
afternoon, in the same café.

| Layer | What it is |
|---|---|
| **Palette** | Cream `#F3EAD7` · sand `#ECE0C6` · clay `#DECBA6` · terracotta `#C9986C` · espresso `#1F1612`. Accents: terra `#D67A45`, rose `#DC8B7E`, saffron `#E5B14A`, plum `#8D6B8D`, sage `#9DAA7E`, honey `#E8AC58`. **No blue, teal, cyan, magenta, or neon. Ever.** |
| **Light** | Low, raking, golden-hour or single-source warm lamp/candle. Soft shadows, never flat overhead studio light, never hard flash. |
| **Lens** | 35mm / 50mm prime feel. Shallow depth of field. Real focal falloff, not fake blur. |
| **Grade** | Kodak Portra 400 / Cinestill warm analog. Gentle grain. Slightly lifted blacks (warm, not crushed). |
| **Mood** | Calm, intimate, unhurried, premium, human. Candid, never posed-corporate, never "stock-smiling-at-camera." |
| **The site already adds** | a multiply warm-grade overlay + film grain on *every* photo via the `BrandPhoto` component. So **do not bake heavy filters or vignettes into the image** — give a clean, well-exposed warm frame and let the site finish it. Over-graded inputs go muddy. |

### The shared grade suffix — paste at the END of every prompt
> Shot on 35mm film, Kodak Portra 400, warm analog grade, soft natural golden
> light, gentle film grain, shallow depth of field, true-to-life color.
> Strictly warm earthy palette: cream, beige, terracotta, saffron gold, dusty
> rose, muted plum, sage, espresso brown. Premium, intimate, editorial,
> documentary realism. No text, no logos, no watermarks, no UI, no phone-screen
> graphics, no captions. Avoid blue/teal/cyan tones, neon, heavy HDR, harsh
> flash, oversaturation, and posed corporate stock look. Photoreal.

---

## PART ONE — Sharpening the 9 photos you already have

For each slot: **ROLE** (how the layout uses it) → **COMPOSE FOR THE CROP** →
**REJECT IF** → upgraded prompt. The composition notes matter more than the
prompt — the site crops aggressively, so the *placement of negative space* is the
whole game.

### 1. `brand/hero-scene.jpg` — 1792×1024
- **ROLE:** Sits on the **right ~58%** of the hero, then feathers into solid cream
  under the headline. Only the right third is ever fully visible; the left half is
  erased by a cream gradient.
- **COMPOSE FOR THE CROP:** Put all the subject matter (barista, espresso machine,
  warm light source) in the **right third**. Keep the **left 40% calm and bright** —
  out-of-focus warm wall, window haze, or empty counter — because text lands there.
  Horizon/counter line low. Brightest point upper-right.
- **REJECT IF:** anyone looks at camera; busy clutter on the left; cool window
  daylight; a face in sharp focus competing with the headline.
- **Prompt:** A warm sunlit specialty-café interior at morning golden hour. Golden
  light rakes across a wooden counter from the upper right. A blurred barista pulls
  an espresso in the deep-right background, soft steam rising. Warm pendant lights
  and a few plants. The left side is calm, bright, airy negative space — an
  out-of-focus warm wall and window haze. Shallow focus, inviting, unhurried.
  *(+ shared grade)*

### 2. `brand/cozy-night.jpg` — 1792×1024
- **ROLE:** Sunk to ~50% opacity behind the espresso-dark "After Hours" section,
  under candle-glow gradients and a phone in a spotlight on the **right**.
- **COMPOSE FOR THE CROP:** **Mostly darkness.** A single warm candle/lamp source,
  ideally **left-of-center**, so it doesn't fight the phone spotlight on the right.
  One cup, one surface. Deep espresso shadows fill 70% of the frame. This image is
  *atmosphere*, not subject — keep it quiet.
- **REJECT IF:** evenly lit; more than one light source; any cool moonlight blue;
  recognizable face.
- **Prompt:** A quiet independent café after closing, late night, almost entirely
  dark. Lit only by a single candle and one low warm lamp, left of center. One
  ceramic coffee cup on a worn wooden table, soft warm reflections, deep espresso
  shadows filling most of the frame, gentle rising steam. Cinematic stillness,
  vast dark negative space. *(+ shared grade)*

### 3. `brand/cafe-band.jpg` — 1792×1024
- **ROLE:** Full-bleed cinematic band; a large serif line is centered over it with
  a dark grade. The **center must stay calm and mid-toned** so white text reads.
- **COMPOSE FOR THE CROP:** Action and faces pushed to **left and right thirds**;
  keep the **horizontal center band** soft and uncluttered. Wide, panoramic energy.
- **REJECT IF:** a bright highlight or busy detail dead-center; anyone staring at
  camera; symmetrical "hero shot" composition.
- **Prompt:** A bustling neighborhood café counter in warm late-afternoon light. On
  the left, a regular and a friendly barista mid-conversation; on the right, hands
  exchanging a takeaway cup near pastries under glass. The horizontal center is a
  calm, softly-lit gap between them. Wide cinematic composition, warmth and life
  without clutter, candid. *(+ shared grade)*

### 4–6. The three "systems" cards — 1792×1024 each (cropped to 16:10)
These sit beside three **SVG product mockups** (Loyalty / AI / Gamified). The
photos must feel like *the same family* as those tinted mocks — soft, warm,
tactile, never literal screenshots.

- **`brand/card-ordering.jpg`** — Overhead 90° flat-lay: a flat white and a
  cardamom bun on a ceramic plate, a phone face-down or showing a blank warm screen
  beside them, a small wooden QR stand in soft focus. Warm wood table, appetizing,
  editorial. *(+ shared grade)*
  - *Compose:* shoot true top-down; leave breathing room — it crops to 16:10.
- **`brand/card-regulars.jpg`** — A barista leaning on the counter chatting warmly
  with a regular, both relaxed, café softly blurred behind. Human and candid, eye
  contact *between them*, not with camera. *(+ shared grade)*
- **`brand/card-social.jpg`** — Overhead flat-lay of beautiful latte art being
  photographed by a hand holding a phone, warm wooden table, linen napkin, scattered
  beans. Crafted, tactile, social-ready. *(+ shared grade)*
  - *Compose:* the phone/hand in a lower corner, latte art as the hero.

### 7–9. Testimonial portraits — 1024×1024 square → render as 52px circles
- **ROLE:** Tiny circular avatars. **Faces fill the frame** — anything below the
  collar is lost. Warm background, catchlights in the eyes, genuine relaxed
  half-smile, looking **slightly off-camera**.
- **REJECT IF:** wide shot (face too small once circle-cropped); cool light; stiff
  corporate headshot; teeth-out stock grin.
- Keep the three existing prompts (Elena / David / Mei) but **tighten to
  head-and-shoulders, face centered, eyes on the upper third.**

---

## Upscaling / Magnific settings per type

The site applies grain + grade itself, so the goal of upscaling is **clean detail,
not stylization.**

| Image type | Target | Style | Notes |
|---|---|---|---|
| Landscape `brand/*` | 4K (3584×2048) | "Photography" / realism | Creativity LOW (0.2–0.3). Resemblance HIGH. You want pores, wood grain, steam — not reinvented content. |
| Footer/cozy dark macros | 2× | "Photography" | Keep blacks clean; do **not** let the upscaler lift shadows or add blue. |
| Portraits `testimonials/*` | 2048² | "Portrait" / faces | Low creativity so identity/features stay stable. Soft, natural skin — no plastic HDR. |

After upscaling: **do not** add Magnific's default sharpening halo or saturation
boost. Export, drop in, reload — the page does the finishing.

---

## PART TWO — New non-people / abstract assets (ranked by impact)

These are where "more images" actually helps. Each is **abstract, textural, or
detail-level** — they add depth and craft without adding more faces or scenes. All
drop into graceful `BrandPhoto` slots, so they appear only once generated.

### ★ P1 — `brand/footer-espresso.jpg` — 1792×1024  *(slot already wired)*
- **WHERE:** Full-bleed behind the footer, sunk to ~16% opacity under the giant
  serif "aura" wordmark. Turns the flat espresso footer into a textured, deep
  close to the daylight arc.
- **WHY:** Right now the footer is flat brown. A near-black crema macro gives it
  grain and a sense of *material* — the last frame of the film.
- **PROMPT:** Extreme macro of fresh espresso crema swirling in a dark cup,
  caramel-and-mahogany tiger-striping, tiny golden bubbles catching one warm
  light, most of the frame deep espresso-black. Abstract, tactile, almost
  monochrome warm. *(+ shared grade)*

### ★ P1 — `brand/hero-glow.png` — 1600×1200, **transparent PNG**
- **WHERE:** Behind the hero phone, replacing/augmenting the flat CSS radial glow.
- **WHY:** A real warm **bokeh light-leak** reads as analog and expensive where a
  CSS gradient reads as generated. This is the single biggest "premium" upgrade.
- **SLOT:** add an `<img>` layer behind the phone in `HeroSection` (I can wire it).
- **PROMPT:** Warm out-of-focus bokeh light leak on transparent/black background —
  soft golden, terracotta, and amber orbs of defocused café light, organic film
  halation, no subject, no edges. Render for screen blend. *(+ shared grade)*

### P2 — `brand/divider-pour.jpg` — 1792×600 (thin band)
- **WHERE:** Optional slim full-bleed band between two light sections (e.g. before
  Pricing) — a second, quieter sibling to `cafe-band`, but **abstract, no people**.
- **WHY:** Breaks a long run of cream cards with a tactile breath without
  introducing another scene to parse.
- **PROMPT:** Extreme close-up of steamed-milk microfoam folding into espresso to
  begin latte art, swirling terracotta and cream, glossy and slow. Abstract
  liquid macro, warm, calm center. *(+ shared grade)*

### P2 — `brand/paper-kraft.jpg` — 2048×2048 (tile)
- **WHERE:** Very faint (~6–8%) multiply texture inside light cards or section
  backgrounds, layered with the existing grain for real paper tactility.
- **WHY:** Editorial sites feel printed. A kraft/linen fiber texture under the cream
  gives warmth the SVG grain alone can't.
- **PROMPT:** Flat overhead scan of warm kraft / unbleached linen paper, subtle
  fiber and tooth, even soft light, cream-to-sand tone, no objects, seamless
  texture. *(+ shared grade)*

### P3 — `brand/steam-dark.png` — 1200×1600, **transparent PNG**
- **WHERE:** Layered into the cozy "After Hours" section for real rising steam
  instead of the small SVG wisp.
- **PROMPT:** Soft wisps of warm white steam rising on a pure black background,
  delicate, lit from one warm side, organic, isolated for screen blend. *(+ grade)*

### P3 — `brand/beans-texture.jpg` — 1792×800 (band)
- **WHERE:** Optional faint texture behind the dark "Founder note" pricing bar.
- **PROMPT:** Overhead macro of dark-roast coffee beans scattered on warm burlap,
  raking side light, deep shadows between beans, rich espresso-and-amber tones,
  tactile. *(+ shared grade)*

---

## PART THREE — What to leave alone (this is the taste)

A premium site is defined as much by restraint as by assets. **Do not** put photos
in these — they are stronger as-is, and a photo would cheapen or confuse them:

- **The SVG product mockups** (Loyalty tier bar, AI suggestion panel, Dashboard,
  Spin Wheel, phone screens). These *communicate the product*. A stock photo there
  says "we couldn't show the real thing." Keep them vector and crisp.
- **The Problem section margin-leak chart** and any data-dense block — clarity beats
  decoration.
- **The Gamification spin/tiles, the AI conversation panel, How-It-Works steps.**
  Their gradients + icons already carry the warmth.
- **Rule of one:** at most **one photographic moment per screenful of scroll.** If
  two photos would be visible at once, cut one. The hero photo and the first card
  photo should never share the viewport — they don't, keep it that way.

---

## Global consistency checklist

- [ ] All nine + any new assets share the **same suffix** → one film roll.
- [ ] **Zero** cool tones, text, logos, or fake UI in any frame.
- [ ] Inputs are **cleanly exposed, lightly graded** — the site adds grade + grain.
- [ ] Landscapes generated at full size; **composed for their crop** (negative space
      where text/subjects land).
- [ ] Portraits are tight head-and-shoulders, eyes upper third.
- [ ] Transparent PNGs (`hero-glow`, `steam-dark`) exported on transparent/black for
      screen blend.
- [ ] Reload after dropping each in — `BrandPhoto` reveals it automatically, already
      graded; nothing looks broken before they land.

### Wiring status
- `footer-espresso.jpg` → **slot live now** (just drop the file in).
- `hero-glow.png`, `divider-pour.jpg`, `paper-kraft.jpg`, `steam-dark.png`,
  `beans-texture.jpg` → prompts ready; say the word and I'll wire each graceful
  slot into the components and reassemble.
