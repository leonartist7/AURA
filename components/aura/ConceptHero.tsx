// @ts-nocheck
'use client';

/* ConceptHero — Direction B: "Keep your circle close."
   The emotional reframe: stop selling an app, show the owner their own
   living circle of regulars. A calm, intentional hero — mostly cream and
   negative space, ONE warm focal glow, the café at the centre with its
   regulars gently orbiting it. The "aura" made literal. */

import * as React from 'react';

const { useMemo } = React;

/* warm tints for the regulars — all on-brand, no blue/teal */
const TINTS = [
  ['#D67A45', '#E8A06B'],
  ['#DC8B7E', '#E9A99E'],
  ['#8D6B8D', '#B091B0'],
  ['#E5B14A', '#F0C879'],
  ['#C9986C', '#DCB48E'],
  ['#A8895F', '#C6A87F'],
  ['#B5705A', '#CE9482'],
  ['#9A7B9A', '#B79AB7'],
];

const REGULARS = [
  { i: 'M', live: true },
  { i: 'J' },
  { i: 'A' },
  { i: 'L', live: true },
  { i: 'S' },
  { i: 'R' },
  { i: 'K' },
  { i: 'T' },
];

function AuraCircle() {
  const R = 184; // orbit radius
  const size = 480;
  const c = size / 2;

  const nodes = useMemo(
    () =>
      REGULARS.map((r, idx) => {
        const a = (idx / REGULARS.length) * Math.PI * 2 - Math.PI / 2;
        return {
          ...r,
          x: c + R * Math.cos(a),
          y: c + R * Math.sin(a),
          tint: TINTS[idx % TINTS.length],
          delay: (idx % 4) * 1.1,
        };
      }),
    [c],
  );

  return (
    <div
      className="aura-circle"
      style={{ position: 'relative', width: size, height: size, margin: '0 auto', maxWidth: '100%' }}
    >
      {/* single warm focal glow — the aura */}
      <div
        style={{
          position: 'absolute',
          inset: '8%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 50% 45%, rgba(229,177,74,0.32), rgba(214,122,69,0.16) 38%, rgba(141,107,141,0.06) 62%, transparent 72%)',
          filter: 'blur(8px)',
        }}
      />

      {/* faint orbit rings */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: 'absolute', inset: 0 }}
      >
        <circle cx={c} cy={c} r={R} fill="none" stroke="rgba(42,31,24,0.10)" strokeWidth="1" strokeDasharray="2 7" />
        <circle cx={c} cy={c} r={R - 52} fill="none" stroke="rgba(42,31,24,0.06)" strokeWidth="1" />
      </svg>

      {/* rotating ring of regulars */}
      <div className="aura-orbit" style={{ position: 'absolute', inset: 0 }}>
        {nodes.map((n, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              left: n.x,
              top: n.y,
              width: 56,
              height: 56,
              marginLeft: -28,
              marginTop: -28,
            }}
          >
            <div className="aura-orbit-rev" style={{ width: '100%', height: '100%' }}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: `linear-gradient(145deg, ${n.tint[0]}, ${n.tint[1]})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.95)',
                  fontFamily: 'var(--display)',
                  fontWeight: 700,
                  fontSize: 19,
                  boxShadow:
                    '0 10px 22px -10px rgba(20,12,5,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
                  position: 'relative',
                }}
              >
                {n.i}
                {n.live && (
                  <span
                    className="aura-pulse"
                    style={{
                      position: 'absolute',
                      inset: -4,
                      borderRadius: '50%',
                      border: '1.5px solid rgba(214,122,69,0.55)',
                      animationDelay: `${n.delay}s`,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* the café at the centre */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 112,
            height: 112,
            borderRadius: '50%',
            background: 'var(--cream-warm)',
            boxShadow:
              '0 20px 50px -18px rgba(214,122,69,0.5), inset 0 1px 0 rgba(255,255,255,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* the aura ring — your logo, enlarged */}
          <svg width="52" height="52" viewBox="0 0 32 32">
            <defs>
              <linearGradient id="auraRingG" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D67A45" />
                <stop offset="50%" stopColor="#E5B14A" />
                <stop offset="100%" stopColor="#8D6B8D" />
              </linearGradient>
            </defs>
            <circle cx="16" cy="16" r="14" fill="url(#auraRingG)" />
            <circle cx="16" cy="16" r="6.5" fill="var(--cream-warm)" />
          </svg>
        </div>
        <div
          style={{
            marginTop: 14,
            fontFamily: 'var(--mono)',
            fontSize: 10.5,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}
        >
          Your café
        </div>
      </div>

      {/* one quiet sign of life — not a wall of notifications */}
      <div
        className="aura-tag"
        style={{
          position: 'absolute',
          right: -8,
          top: 38,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 13px',
          borderRadius: 999,
          background: 'rgba(255,255,255,0.82)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 14px 30px -14px rgba(20,12,5,0.32)',
          fontSize: 12.5,
          color: 'var(--ink)',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ fontSize: 14 }}>☕</span>
        <span><strong style={{ fontWeight: 600 }}>Maya</strong> just came back — her 12th visit</span>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .aura-orbit { animation: aura-spin 60s linear infinite; transform-origin: 50% 50%; }
        .aura-orbit-rev { animation: aura-spin 60s linear infinite reverse; transform-origin: 50% 50%; }
        .aura-tag { animation: aura-bob 7s ease-in-out infinite; }
        .aura-pulse { animation: aura-ping 3.2s ease-out infinite; }
        @keyframes aura-spin { to { transform: rotate(360deg); } }
        @keyframes aura-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        @keyframes aura-ping {
          0% { transform: scale(1); opacity: 0.8; }
          70%,100% { transform: scale(1.7); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .aura-orbit, .aura-orbit-rev, .aura-tag, .aura-pulse { animation: none !important; }
        }
      `,
        }}
      />
    </div>
  );
}

function BrandLockup({ name }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <svg width="30" height="30" viewBox="0 0 32 32" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="lockG" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D67A45" />
            <stop offset="50%" stopColor="#E5B14A" />
            <stop offset="100%" stopColor="#8D6B8D" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="14" fill="url(#lockG)" />
        <circle cx="16" cy="16" r="6.5" fill="var(--cream)" />
      </svg>
      <span
        style={{
          fontFamily: 'var(--display)',
          fontWeight: 700,
          fontSize: 26,
          letterSpacing: '-0.04em',
          color: 'var(--ink)',
        }}
      >
        {name}
      </span>
    </div>
  );
}

export default function ConceptHero({ brand = 'aura' }) {
  const isAro = brand === 'aro';
  const name = isAro ? 'aro' : 'aura';
  // the synthesis: if the name is "aro", "aura" becomes the feeling it protects
  const sub = isAro
    ? 'Every café has an aura. Aro keeps it glowing — remembering your regulars, welcoming them back, keeping the ritual alive. You stay in the moment, not the admin.'
    : 'Every café has its people. Aura remembers them, welcomes them back, and keeps the ritual alive — so you stay in the moment, not the admin.';
  return (
    <section
      className="section grain grain-soft"
      style={{
        position: 'relative',
        background: 'var(--cream)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 120,
        paddingBottom: 80,
      }}
    >
      <div style={{ position: 'absolute', top: 40, left: 48, zIndex: 5 }}>
        <BrandLockup name={name} />
      </div>
      <div className="container" style={{ width: '100%' }}>
        <div
          className="r-hero"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            alignItems: 'center',
          }}
        >
          {/* LEFT — the feeling, with room to breathe */}
          <div>
            <div className="eyebrow">
              <span className="dot" /> {name} · the regulars club
            </div>

            <h1
              style={{
                marginTop: 28,
                fontFamily: 'var(--display)',
                fontWeight: 600,
                fontSize: 'clamp(46px, 6vw, 88px)',
                letterSpacing: '-0.045em',
                lineHeight: 0.98,
              }}
            >
              Keep your{' '}
              <span className="serif-it" style={{ fontWeight: 400, color: 'var(--terra)' }}>
                circle
              </span>{' '}
              close.
            </h1>

            <p
              style={{
                marginTop: 26,
                maxWidth: 430,
                fontSize: 18,
                lineHeight: 1.6,
                color: 'var(--ink-soft)',
              }}
            >
              {sub}
            </p>

            <div style={{ marginTop: 38, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="#" className="btn-primary" style={{ padding: '18px 28px', fontSize: 15 }}>
                Claim your free month <span className="arrow-circle">→</span>
              </a>
              <a href="#" className="btn-secondary">See how it feels ↓</a>
            </div>

            <div
              style={{
                marginTop: 46,
                fontFamily: 'var(--mono)',
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
              }}
            >
              A few cafés per neighbourhood · first month free
            </div>
          </div>

          {/* RIGHT — your circle of regulars */}
          <div className="hide-mobile">
            <AuraCircle />
          </div>
        </div>
      </div>
    </section>
  );
}
