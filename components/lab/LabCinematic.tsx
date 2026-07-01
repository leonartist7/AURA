// @ts-nocheck
'use client';

/* Variation C — "Cinematic".
   Full-bleed warm backdrop (stand-in for real café video/photo) with a
   scroll-driven color-grade that shifts warm → night → dawn; parallax
   editorial text; ONE static 3D-ring render as a floating accent that
   scales/drifts. The mixed-media / magazine feel. Medium weight. */

import * as React from 'react';
import { usePinnedProgress, win, lerp, seg, ramp } from '@/lib/scroll';

function Beat({ show, color, top, children }) {
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top, textAlign: 'center', padding: '0 24px', opacity: show, transform: `translateY(${lerp(30, 0, show)}px)`, color, pointerEvents: show > 0.9 ? 'auto' : 'none' }}>
      {children}
    </div>
  );
}

export default function LabCinematic() {
  const { ref, p } = usePinnedProgress();

  // the "footage" — a warm gradient stand-in for real café video/photo
  const grade = ramp(p, [[0, '#E9C98F'], [0.3, '#D67A45'], [0.6, '#2A1F18'], [0.82, '#160F0B'], [1, '#E9C98F']]);
  const onDark = p > 0.5 && p < 0.9;
  const ink = onDark ? '#F3EAD7' : '#1F1612';

  // ring accent parallax: drifts up, scales, slowly rotates
  const ringY = lerp(6, -10, p);          // vh
  const ringScale = lerp(0.9, 1.25, seg(p, 0, 0.7));
  const ringRot = lerp(-8, 14, p);
  const ringOpacity = 0.9;

  return (
    <div ref={ref} style={{ position: 'relative', height: '460vh' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#1F1612' }}>
        {/* backdrop "footage": layered warm gradients (swap for <video>/<img> later) */}
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(120% 90% at 30% ${lerp(20, 80, p)}%, ${grade}, #1F1612 90%)`, transition: 'background 0.12s linear' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(60% 50% at 70% 30%, rgba(229,177,74,0.25), transparent 70%)' }} />
        {/* grain */}
        <div className="grain grain-on-dark" style={{ position: 'absolute', inset: 0 }} />
        {/* soft vignette */}
        <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 240px 60px rgba(20,12,5,0.55)' }} />

        {/* the 3D ring accent (static render, parallaxes) */}
        <img
          src="/lab/ring.png"
          alt=""
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 'min(52vh, 460px)',
            transform: `translate(-50%, calc(-50% + ${ringY}vh)) scale(${ringScale}) rotate(${ringRot}deg)`,
            opacity: ringOpacity,
            filter: `drop-shadow(0 40px 80px rgba(214,122,69,0.4)) brightness(${lerp(1, 1.15, win(p, 0.5, 0.6, 0.8, 0.9))})`,
            willChange: 'transform',
          }}
        />

        {/* parallax editorial text */}
        <Beat show={win(p, 0, 0.03, 0.1, 0.18)} color={ink} top="12%">
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.7 }}>Variation C · Cinematic</div>
          <h1 style={{ marginTop: 14, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(38px,5.5vw,78px)', letterSpacing: '-0.045em', lineHeight: 1 }}>Give your café an <span className="serif-it" style={{ color: '#E5B14A', fontWeight: 400 }}>aura.</span></h1>
        </Beat>
        <Beat show={win(p, 0.24, 0.3, 0.4, 0.48)} color={ink} top="76%">
          <h2 style={{ margin: '0 auto', maxWidth: 640, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(26px,3.6vw,46px)', letterSpacing: '-0.03em' }}>The warmth people feel walking in — <span className="serif-it" style={{ color: '#E5B14A', fontWeight: 400 }}>kept glowing.</span></h2>
        </Beat>
        <Beat show={win(p, 0.56, 0.64, 0.76, 0.85)} color="#F3EAD7" top="14%">
          <h2 style={{ margin: '0 auto', maxWidth: 680, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(30px,4.2vw,56px)', letterSpacing: '-0.03em' }}>Your regulars, gathered into <span className="serif-it" style={{ color: '#E5B14A', fontWeight: 400 }}>a circle.</span></h2>
        </Beat>
        <Beat show={win(p, 0.9, 0.95, 1, 1.001)} color={ink} top="76%">
          <h2 style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(34px,5vw,72px)', letterSpacing: '-0.04em' }}>On <span className="serif-it" style={{ color: '#E5B14A', fontWeight: 400 }}>purpose.</span></h2>
        </Beat>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'rgba(255,255,255,0.1)' }}>
          <div style={{ width: `${p * 100}%`, height: '100%', background: 'linear-gradient(90deg,var(--terra),var(--saffron),var(--plum))' }} />
        </div>
      </div>
    </div>
  );
}
