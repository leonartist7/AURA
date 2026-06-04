# AURA — on-brand image generation prompts

Generate these in ChatGPT (DALL·E 3) or any image model, then save each with the
**exact filename** into the folder shown. Every slot is optional and degrades
gracefully, so the page never looks broken before the photos land.

## Shared brand style (paste at the END of every prompt)

> Style: editorial documentary photograph, shot on 35mm film, Kodak Portra warm
> analog grade. Soft natural light, gentle film grain, shallow depth of field.
> Color palette strictly warm and earthy: cream, beige, terracotta, saffron gold,
> dusty rose, muted plum, sage green, espresso brown. Calm, premium, intimate,
> unhurried café culture. Candid and real, not posed or corporate. No text, no
> logos, no watermarks, no on-screen UI, no phone-screen graphics. Avoid cool blue
> tones, teal, neon, heavy HDR, or oversaturation. Photoreal.

---

## 1. Hero background — `public/assets/brand/hero-scene.jpg`
**Size:** 1792×1024 (landscape). Sits on the right, feathered into cream behind the app mockup.

> A warm, sunlit specialty café interior in the morning, golden light raking across
> a wooden counter, a blurred barista pulling an espresso in the background, steam
> rising softly, plants and warm pendant lights, empty foreground space on the left
> for negative space. Shallow focus, airy and inviting.
> *(append shared brand style)*

## 2. After-hours background — `public/assets/brand/cozy-night.jpg`
**Size:** 1792×1024 (landscape). Sunk dark behind the candlelit "After Hours" section.

> A quiet independent café after closing at night, mostly dark, lit only by a single
> candle and a low warm lamp, one coffee cup on a wooden table, soft reflections,
> deep espresso shadows, moody and cinematic, intimate stillness. Lots of dark
> negative space.
> *(append shared brand style)*

## 3. Full-bleed café band — `public/assets/brand/cafe-band.jpg`
**Size:** 1792×1024 (landscape). Cropped to a wide cinematic band; a serif line sits over it, so keep the center calm.

> A bustling neighbourhood café counter in warm late-afternoon light, a regular
> customer and a friendly barista mid-conversation, pastries under glass, hands
> exchanging a takeaway cup, life and warmth without clutter. Wide cinematic
> composition, calm tonal center.
> *(append shared brand style)*

## 4–6. "Six systems" card photos (each cropped to 16:10)
**Size:** 1792×1024 (landscape) each.

- `public/assets/brand/card-ordering.jpg`
> Overhead close-up of a flat white and a cardamom bun on a ceramic plate on a café
> table, a phone resting beside them showing a blank screen, a small QR stand in
> soft focus. Warm, appetising, editorial.
> *(append shared brand style)*

- `public/assets/brand/card-regulars.jpg`
> A barista leaning on the counter chatting warmly with a regular customer, both
> relaxed and smiling naturally, café interior softly blurred behind them. Human and
> candid.
> *(append shared brand style)*

- `public/assets/brand/card-social.jpg`
> Overhead flat-lay of beautiful latte art being photographed from above by a hand
> holding a phone, on a warm wooden table with a linen napkin and coffee beans
> scattered. Crafted, tactile, social-ready.
> *(append shared brand style)*

---

## 7–9. Testimonial portraits → `public/assets/testimonials/`
**Size:** 1024×1024 (square). Real friendly café-owner headshots; they render as circular avatars. Match the names already on the page.

- `elena-moretti.jpg`
> Candid portrait of a warm Italian-American woman in her early 40s, café owner,
> wearing a linen apron, standing in her cozy café, soft window light, genuine
> relaxed smile, looking slightly off camera.
> *(append shared brand style)*

- `david-okonkwo.jpg`
> Candid portrait of a friendly Nigerian-American man in his late 30s, restaurant
> owner, apron over a henley, arms lightly crossed, standing in his warm-lit café,
> confident easy smile.
> *(append shared brand style)*

- `mei-tanaka.jpg`
> Candid portrait of a calm Japanese-American woman in her mid 30s, café owner,
> apron, holding a cup of matcha, soft daylight, gentle natural smile, café shelves
> blurred behind her.
> *(append shared brand style)*

---

### Tips
- Generate landscape slots at **1792×1024** and let the site crop them; don't pre-crop.
- Keep all nine from the **same prompt suffix** so the set feels like one shoot.
- If a model adds text/logos, regenerate with "absolutely no text or logos" emphasised.
- After saving, just reload the page; each photo appears automatically with the
  warm grade + grain already applied.
