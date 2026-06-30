// @ts-nocheck
'use client';

/* RingStory — the scroll-driven storytelling experience.
   ONE protagonist (the ring) transforms continuously as you scroll through a
   pinned stage: faces front → tilts → a pass travels through it → it LAYS
   DOWN and expands into the circle of regulars → rises back into the logo.
   Scroll position drives everything (scroll-scrub), not autoplay. This is the
   code rig that pre-rendered 3D frames will later slot into.
   Performant: rAF-throttled, transform/opacity only. Reduced-motion safe. */

import * as React from 'react';

const { useState, useEffect, useRef, useMemo } = React;

/* ───────── math ───────── */
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const seg = (p, a, b) => clamp((p - a) / (b - a)); // 0→1 across a..b
// fade in a→b, hold b→c, fade out c→d
const win = (p, a, b, c, d) => {
  if (p <= a || p >= d) return 0;
  if (p < b) return (p - a) / (b - a);
  if (p <= c) return 1;
  return 1 - (p - c) / (d - c);
};
const hx = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (c1, c2, t) => {
  const a = hx(c1), b = hx(c2);
  return `rgb(${a.map((v, i) => Math.round(lerp(v, b[i], t)).toString()).join(',')})`;
};

const TINTS = [
  ['#D67A45', '#E8A06B'], ['#DC8B7E', '#E9A99E'], ['#8D6B8D', '#B091B0'],
  ['#E5B14A', '#F0C879'], ['#C9986C', '#DCB48E'], ['#A8895F', '#C6A87F'],
  ['#B5705A', '#CE9482'], ['#9A7B9A', '#B79AB7'],
];
const NAMES = ['M', 'J', 'A', 'L', 'S', 'R', 'K', 'T'];

/* the brand ring as a crisp SVG annulus */
function RingMark({ size, hole = 'transparent' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="storyRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D67A45" />
          <stop offset="50%" stopColor="#E5B14A" />
          <stop offset="100%" stopColor="#8D6B8D" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="44" fill="url(#storyRing)" />
      <circle cx="50" cy="50" r="20" fill={hole} />
    </svg>
  );
}

function Beat({ show, color, children, style = {} }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',
        opacity: show,
        transform: `translateY(${lerp(18, 0, show)}px)`,
        pointerEvents: show > 0.9 ? 'auto' : 'none',
        color,
        padding: '0 24px',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function RingStory() {
  const wrapRef = useRef(null);
  const [p, setP] = useState(0);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let last = -1;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const next = clamp(-rect.top / Math.max(1, total));
        if (Math.abs(next - last) > 0.0005) {
          last = next;
          setP(next);
        }
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* ── derive the whole scene from p ── */

  // ring lay-down: faces front (small tilt) → lays flat → rises for the close
  const rx =
    p < 0.35 ? lerp(6, 12, seg(p, 0, 0.35))
    : p < 0.55 ? lerp(12, 30, seg(p, 0.35, 0.55))
    : p < 0.74 ? lerp(30, 72, seg(p, 0.55, 0.74))
    : p < 0.84 ? 72
    : p < 0.96 ? lerp(72, 0, seg(p, 0.84, 0.96))
    : 0;
  const rz = lerp(0, 150, p); // turns as you scroll
  const sc =
    p < 0.55 ? 1
    : p < 0.74 ? lerp(1, 1.32, seg(p, 0.55, 0.74))
    : p < 0.96 ? lerp(1.32, 1.05, seg(p, 0.74, 0.96))
    : 1.05;

  // background warms into an intimate "night" for the circle, then back to dawn
  const dark = win(p, 0.42, 0.56, 0.84, 0.95);
  const bg = mix('#F3EAD7', '#1F1612', dark);
  const onDark = dark > 0.5;
  const inkBeat = onDark ? 'var(--cream)' : 'var(--ink)';

  // the regulars settle onto the ring-plane during the lay-down
  const circleShow = win(p, 0.5, 0.64, 0.82, 0.92);
  // the travelling pass
  const passShow = win(p, 0.32, 0.4, 0.5, 0.58);
  const passX = lerp(-150, 150, seg(p, 0.32, 0.58));

  const R = 150; // orbit radius on the plane
  const nodes = useMemo(
    () =>
      NAMES.map((n, i) => {
        const a = (i / NAMES.length) * Math.PI * 2 - Math.PI / 2;
        return { n, x: Math.cos(a) * R, y: Math.sin(a) * R, tint: TINTS[i % TINTS.length] };
      }),
    [],
  );

  const ringGlow = lerp(0.18, 0.5, Math.max(dark, circleShow));

  return (
    <div ref={wrapRef} style={{ position: 'relative', height: '620vh', background: bg, transition: 'background 0.2s linear' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* warm focal glow */}
        <div
          style={{
            position: 'absolute',
            width: 720,
            height: 720,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(229,177,74,${ringGlow}), rgba(214,122,69,${ringGlow * 0.4}) 40%, transparent 66%)`,
            filter: 'blur(20px)',
          }}
        />

        {/* THE PROTAGONIST — the ring stage (shares a 3D plane with the regulars) */}
        <div style={{ position: 'absolute', perspective: 1500 }}>
          <div
            style={{
              position: 'relative',
              width: 360,
              height: 360,
              transformStyle: 'preserve-3d',
              transform: `rotateX(${rx}deg) rotateZ(${rz}deg) scale(${sc})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* the ring itself */}
            <div style={{ filter: `drop-shadow(0 30px 60px rgba(141,107,141,${0.3 + ringGlow * 0.4}))` }}>
              <RingMark size={360} hole={onDark ? '#1F1612' : '#F3EAD7'} />
            </div>

            {/* regulars settle onto the plane during the lay-down */}
            {nodes.map((nd, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: 52,
                  height: 52,
                  marginLeft: -26,
                  marginTop: -26,
                  left: '50%',
                  top: '50%',
                  transform: `translate(${nd.x}px, ${nd.y}px) rotateZ(${-rz}deg)`,
                  opacity: circleShow,
                  borderRadius: '50%',
                  background: `linear-gradient(145deg, ${nd.tint[0]}, ${nd.tint[1]})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.95)',
                  fontFamily: 'var(--display)',
                  fontWeight: 700,
                  fontSize: 18,
                  boxShadow: '0 10px 22px -10px rgba(20,12,5,0.5)',
                }}
              >
                {nd.n}
              </div>
            ))}

            {/* café node blooms in the centre of the laid-down ring */}
            <div
              style={{
                position: 'absolute',
                width: 96,
                height: 96,
                borderRadius: '50%',
                background: 'var(--cream-warm)',
                boxShadow: '0 20px 50px -18px rgba(214,122,69,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: circleShow,
                transform: `rotateZ(${-rz}deg)`,
              }}
            >
              <RingMark size={46} hole="var(--cream-warm)" />
            </div>
          </div>
        </div>

        {/* the travelling pass (beat 3) */}
        <div
          style={{
            position: 'absolute',
            transform: `translate(${passX}px, -8px) rotate(-7deg)`,
            opacity: passShow,
            width: 184,
            padding: 16,
            borderRadius: 18,
            background: 'linear-gradient(145deg, #D67A45, #DC8B7E 48%, #8D6B8D)',
            color: 'white',
            boxShadow: '0 30px 50px -20px rgba(141,107,141,0.6)',
            pointerEvents: 'none',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.9 }}>
            <span style={{ fontWeight: 700 }}>aro</span><span>Silver</span>
          </div>
          <div style={{ marginTop: 14, fontFamily: 'var(--display)', fontSize: 17, fontWeight: 700 }}>Maya Rivera</div>
          <div style={{ fontSize: 10.5, opacity: 0.85 }}>The Roastery · Kensington</div>
          <div style={{ marginTop: 12, fontSize: 19, fontWeight: 800, letterSpacing: '-0.03em' }}>1,284<span style={{ fontSize: 10, fontWeight: 500, opacity: 0.8 }}> pts</span></div>
        </div>

        {/* ── TEXT BEATS, driven by scroll ── */}

        {/* 1 — open */}
        <Beat show={win(p, 0.0, 0.03, 0.09, 0.15)} color="var(--ink)" style={{ top: '14%' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>The regulars club</div>
          <h1 style={{ marginTop: 16, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(40px,6vw,84px)', letterSpacing: '-0.045em', lineHeight: 0.98 }}>
            Give your café an <span className="serif-it" style={{ color: 'var(--terra)', fontWeight: 400 }}>aura.</span>
          </h1>
        </Beat>

        {/* 2 — what it is */}
        <Beat show={win(p, 0.17, 0.22, 0.29, 0.35)} color="var(--ink)" style={{ top: '16%' }}>
          <h2 style={{ margin: '0 auto', maxWidth: 720, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(28px,4vw,52px)', letterSpacing: '-0.03em', lineHeight: 1.06 }}>
            The warmth people feel when they walk in — <span className="serif-it" style={{ color: 'var(--terra)', fontWeight: 400 }}>kept glowing.</span>
          </h2>
        </Beat>

        {/* 3 — moving where they are */}
        <Beat show={win(p, 0.37, 0.42, 0.49, 0.56)} color="var(--ink)" style={{ bottom: '16%' }}>
          <h2 style={{ margin: '0 auto', maxWidth: 720, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(28px,4vw,52px)', letterSpacing: '-0.03em', lineHeight: 1.06 }}>
            Your café travels with them. <span className="serif-it" style={{ color: 'var(--terra)', fontWeight: 400 }}>Everywhere they go.</span>
          </h2>
        </Beat>

        {/* 4 — the circle (on dark) */}
        <Beat show={win(p, 0.6, 0.66, 0.76, 0.84)} color="var(--cream)" style={{ top: '13%' }}>
          <h2 style={{ margin: '0 auto', maxWidth: 760, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(30px,4.2vw,56px)', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            And they become a circle. <span className="serif-it" style={{ color: 'var(--saffron)', fontWeight: 400 }}>Your regulars — gathered, kept.</span>
          </h2>
        </Beat>

        {/* 5 — close */}
        <Beat show={win(p, 0.9, 0.95, 1.0, 1.001)} color="var(--ink)" style={{ top: '20%' }}>
          <h2 style={{ margin: '0 auto', maxWidth: 820, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(36px,5vw,76px)', letterSpacing: '-0.04em', lineHeight: 0.98 }}>
            Your neighbourhood&apos;s favourite. <span className="serif-it" style={{ color: 'var(--terra)', fontWeight: 400 }}>On purpose.</span>
          </h2>
          <div style={{ marginTop: 30 }}>
            <a href="#" className="btn-primary" style={{ padding: '16px 28px', fontSize: 15 }}>
              Claim your free month <span className="arrow-circle">→</span>
            </a>
          </div>
        </Beat>

        {/* scroll hint */}
        <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', opacity: win(p, 0, 0.01, 0.04, 0.09), fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          Scroll ↓
        </div>

        {/* progress bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(0,0,0,0.06)' }}>
          <div style={{ width: `${p * 100}%`, height: '100%', background: 'linear-gradient(90deg, var(--terra), var(--saffron), var(--plum))' }} />
        </div>
      </div>
    </div>
  );
}
