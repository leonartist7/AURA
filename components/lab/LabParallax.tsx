// @ts-nocheck
'use client';

/* Variation B — "Parallax depth".
   No heavy 3D. Background color interpolates through the scroll; layered soft
   elements drift at different speeds (parallax "flying around"); surrounding
   elements light up at key beats — NOT the ring itself. Ultra-performant,
   works everywhere (transform/opacity + color only). */

import * as React from 'react';
import { usePinnedProgress, win, lerp, seg, ramp, clamp } from '@/lib/scroll';

const { useMemo } = React;

const ORBS = [
  { c: '#E5B14A', s: 340, x: -34, y: -20, sp: 0.6, blur: 40 },
  { c: '#D67A45', s: 240, x: 40, y: 24, sp: 1.4, blur: 30 },
  { c: '#8D6B8D', s: 300, x: 30, y: -30, sp: 0.9, blur: 44 },
  { c: '#DC8B7E', s: 180, x: -40, y: 28, sp: 1.8, blur: 24 },
  { c: '#E8AC58', s: 120, x: 12, y: 10, sp: 2.4, blur: 14 },
  { c: '#C9986C', s: 150, x: -14, y: -34, sp: 2.0, blur: 18 },
];

function Beat({ show, color, top, children }) {
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top, textAlign: 'center', padding: '0 24px', opacity: show, transform: `translateY(${lerp(24, 0, show)}px)`, color, pointerEvents: show > 0.9 ? 'auto' : 'none' }}>
      {children}
    </div>
  );
}

export default function LabParallax() {
  const { ref, p } = usePinnedProgress();

  const bg = ramp(p, [[0, '#F3EAD7'], [0.32, '#F0D9A8'], [0.6, '#2A1F18'], [0.8, '#1F1612'], [1, '#F3EAD7']]);
  const onDark = p > 0.52 && p < 0.86;
  const ink = onDark ? 'var(--cream)' : 'var(--ink)';

  // a few "regular" chips that LIGHT UP around the circle beat (not the ring)
  const chips = useMemo(() => ['M', 'J', 'A', 'L', 'S', 'R'].map((n, i) => ({ n, a: (i / 6) * Math.PI * 2 })), []);

  return (
    <div ref={ref} style={{ position: 'relative', height: '460vh', background: bg, transition: 'background 0.12s linear' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        {/* PARALLAX ORB LAYERS — each drifts at its own speed as you scroll */}
        {ORBS.map((o, i) => {
          // parallax: each layer drifts horizontally + vertically at its own speed
          const driftX = o.x + (p - 0.5) * o.sp * 18;   // vw
          const driftY = o.y + (0.5 - p) * o.sp * 40;   // vh
          const light = 0.3 + 0.55 * win(p, 0.08 + i * 0.05, 0.28 + i * 0.05, 0.55, 0.82);
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: o.s,
                height: o.s,
                marginLeft: -o.s / 2,
                marginTop: -o.s / 2,
                transform: `translate(calc(${driftX}vw), calc(${driftY}vh))`,
                borderRadius: '50%',
                background: `radial-gradient(circle at 40% 35%, ${o.c}, transparent 68%)`,
                filter: `blur(${o.blur}px)`,
                opacity: light,
                willChange: 'transform',
              }}
            />
          );
        })}

        {/* CENTER: the ring stays calm; the SURROUNDINGS light up */}
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
          <svg width="200" height="200" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="labBring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#D67A45" /><stop offset="50%" stopColor="#E5B14A" /><stop offset="100%" stopColor="#8D6B8D" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="none" stroke="url(#labBring)" strokeWidth="12" />
          </svg>

          {/* regular chips orbit + LIGHT UP during the circle beat */}
          {chips.map((c, i) => {
            const show = win(p, 0.52, 0.62, 0.78, 0.88);
            const rad = lerp(120, 168, seg(p, 0.52, 0.7));
            return (
              <div key={i} style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: `translate(${Math.cos(c.a) * rad - 22}px, ${Math.sin(c.a) * rad - 22}px)`,
                width: 44, height: 44, borderRadius: '50%',
                background: 'linear-gradient(145deg,#E5B14A,#D67A45)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontFamily: 'var(--display)', fontWeight: 700,
                opacity: show,
                boxShadow: `0 0 ${lerp(0, 30, show)}px rgba(229,177,74,${0.7 * show})`,
              }}>{c.n}</div>
            );
          })}
        </div>

        {/* text beats */}
        <Beat show={win(p, 0, 0.03, 0.1, 0.18)} color={ink} top="16%">
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.6 }}>Variation B · Parallax depth</div>
          <h1 style={{ marginTop: 14, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(38px,5.5vw,76px)', letterSpacing: '-0.045em', lineHeight: 1 }}>Give your café an <span className="serif-it" style={{ color: 'var(--terra)', fontWeight: 400 }}>aura.</span></h1>
        </Beat>
        <Beat show={win(p, 0.24, 0.3, 0.4, 0.48)} color={ink} top="18%">
          <h2 style={{ margin: '0 auto', maxWidth: 640, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(28px,4vw,52px)', letterSpacing: '-0.03em' }}>The warmth people feel — <span className="serif-it" style={{ color: 'var(--terra)', fontWeight: 400 }}>everywhere they go.</span></h2>
        </Beat>
        <Beat show={win(p, 0.58, 0.66, 0.76, 0.85)} color="var(--cream)" top="14%">
          <h2 style={{ margin: '0 auto', maxWidth: 680, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(30px,4.2vw,56px)', letterSpacing: '-0.03em' }}>They become a circle. <span className="serif-it" style={{ color: 'var(--saffron)', fontWeight: 400 }}>Your regulars, kept.</span></h2>
        </Beat>
        <Beat show={win(p, 0.9, 0.95, 1, 1.001)} color={ink} top="22%">
          <h2 style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(34px,5vw,72px)', letterSpacing: '-0.04em' }}>On <span className="serif-it" style={{ color: 'var(--terra)', fontWeight: 400 }}>purpose.</span></h2>
        </Beat>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(0,0,0,0.06)' }}>
          <div style={{ width: `${p * 100}%`, height: '100%', background: 'linear-gradient(90deg,var(--terra),var(--saffron),var(--plum))' }} />
        </div>
      </div>
    </div>
  );
}
