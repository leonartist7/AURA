# AURA — Creative Concepts & Motion Direction

> Strategy, creative directions, and paste-ready AI prompts for all scroll / video experiences.

---

## Brand Foundation

**What AURA actually sells:** owned, lasting customer relationships for independent cafés — not a loyalty app, not a stamp card. The café *knows* you, misses you when you're gone, and stays in your pocket when the doors close.

**The dual audience:** café owners are simultaneously a **romantic** (they opened a café because of craft, community, ritual) and an **operator** (they're stressed about margin, no-shows, churn). The brand wins by seducing the romantic first, then proving to the operator.

**Visual DNA (non-negotiable):**
- Palette: cream `#F3EAD7` · terracotta `#D67A45` · saffron `#E5B14A` · dusty rose `#DC8B7E` · plum `#8D6B8D` · espresso `#1F1612`
- Grade: Kodak Portra 400 / Cinestill warm analog
- Light: golden-hour or single-source warm lamp. Never overhead studio, never flash.
- No blue, teal, cyan, magenta, or neon. Ever.

---

## The Five Concepts

### Concept A — "One Day" (Daylight Arc Spine)
**Core idea:** The entire landing page *is* one café day. Scroll = time. Dawn cream sky at the top, golden afternoon at the fold, one espresso-dark night moment, close with the new morning. The AURA orb is the sun.

**Best for:** `/` homepage hero sequence
**Scroll mechanic:** CSS sticky + rAF scroll listener. Sky gradient interpolates across 9 color stops. Orb travels a gentle arc (8% → 88% horizontal). Time-of-day clock runs in corner.
**Why it wins:** The daylight arc is already the brand's metaphor — this makes it *literal* and cinematic without needing any footage.

---

### Concept B — "After the Lights Go Off" (Night Chapter)
**Core idea:** At the darkest scroll point, the café physically closes — lights dim, chairs go up — but the phone glows warm in someone's pocket. AURA = the relationship that outlasts closing time.
**Best for:** Paired with Concept A, occupying the 60–85% scroll band of the homepage
**Key image:** Single warm rectangle of phone screen light against espresso dark.

---

### Concept C — "The Ritual" (Coffee Macro)
**Core idea:** Extreme close-ups of coffee ritual in slow motion — pour, surface tension, steam. No branding visible. Just sensory immersion. Then AURA text fades in over cream.
**Best for:** `/experience` hero video loop, hero image fallback
**Video prompt:**
```
Ultra slow-motion 120fps close-up of espresso crema surface, warm amber light raking from left, 
tiny bubbles forming and dissolving, Cinestill 800T warm grade, no text, no people visible, 
tight focal plane with gentle lens falloff, 4 seconds loop
```

---

### Concept D — "Stranger to Regular" (Character Arc)
**Core idea:** One person's journey from anonymous first visit to known regular — told as a horizontal scroll or vertical chapter sequence. Each chapter = a visit. The café owner's face changes from polite stranger to warm recognition.
**Best for:** `/experience` or `/the-story` narrative page
**Image prompt (visit 1 — the stranger):**
```
35mm street photography style, young professional entering a warm independent café for the 
first time, seen from barista's POV behind counter, soft morning light, customer slightly 
anonymous, warm earthy interior tones, cream walls terracotta accents, Kodak Portra 400 grade, 
candid, unhurried, film grain
```
**Image prompt (visit 6 — the regular):**
```
Same café interior, same framing, barista already reaching for the customer's usual order 
before they speak, both smiling in genuine recognition, golden afternoon light, Kodak Portra 
400, warm, intimate, human
```

---

### Concept E — "The Invisible System" (Dual Layer)
**Core idea:** Split composition — left side shows the beautiful visible café experience, right side reveals the invisible AURA data layer (customer timeline, visit frequency, preferences). Both beautiful. The system is the gift, not the surveillance.
**Best for:** `/the-system` or features section
**Layout:** 50/50 split with a thin warm-light divider line. Left = analog warmth. Right = dark espresso background with cream typography and soft data viz.

---

## Page Map

| Route | Concept | Mechanic |
|---|---|---|
| `/` | A + B | Scroll-driven daylight arc → night chapter |
| `/experience` | D | Horizontal or vertical chapter sequence |
| `/the-system` | E | 50/50 split layout |
| `/prototype` | A + B | **Working code prototype (live now)** |

---

## AI Generation Suffixes

Paste at the END of every image prompt:
```
Shot on 35mm film, Kodak Portra 400, warm analog grade, soft natural golden-hour light, 
film grain, slightly lifted blacks, no blue or teal tones, no studio lighting, no flash.
```

Paste at the END of every video prompt:
```
Warm Cinestill analog grade, low raking golden-hour light, gentle film grain, 
no camera shake, 24fps cinematic, no text overlays, no color grading with blue/teal.
```

---

## Implementation Status

- [x] VISUAL-DIRECTION.md — complete art direction for all photo slots
- [x] `/prototype` — working scroll-driven "One Day" concept (Concepts A+B, pure code)
- [ ] Real footage for hero video loop (Concept C)
- [ ] Character arc photography (Concept D)
- [ ] Dual-layer system spread (Concept E)
