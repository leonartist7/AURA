// @ts-nocheck
'use client';

/* AroLanding — the synthesized "best prototype".
   One emotional arc, organic (non-rectangular) section transitions, the ring
   motif recurring, copy from docs/AURA-COPY-BANK.md, sales psychology baked
   into the order: desire → social proof → loss aversion → hope → magic →
   friction-kill → operator proof → scarcity → authority → risk-reversal.
   Performant: mostly CSS + a few in-view reveals. Reduced-motion safe. */

import * as React from 'react';
import { motion } from 'framer-motion';

const { useMemo } = React;

/* ───────── atoms ───────── */

function Ring({ size = 30, holeColor = 'var(--cream)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="aroRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D67A45" />
          <stop offset="50%" stopColor="#E5B14A" />
          <stop offset="100%" stopColor="#8D6B8D" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14" fill="url(#aroRingGrad)" />
      <circle cx="16" cy="16" r="6.5" fill={holeColor} />
    </svg>
  );
}

function Wordmark({ light = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <Ring size={28} holeColor={light ? '#1F1612' : 'var(--cream)'} />
      <span
        style={{
          fontFamily: 'var(--display)',
          fontWeight: 700,
          fontSize: 24,
          letterSpacing: '-0.04em',
          color: light ? 'var(--cream)' : 'var(--ink)',
        }}
      >
        aro
      </span>
    </div>
  );
}

const EASE = [0.22, 1, 0.36, 1];

function Reveal({ children, delay = 0, y = 20, style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.75, ease: EASE, delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children, accent = 'var(--terra)', color = 'var(--muted)' }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: 'var(--mono)',
        fontSize: 11,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color,
      }}
    >
      <span style={{ width: 7, height: 7, borderRadius: 999, background: accent }} />
      {children}
    </div>
  );
}

/* ───────── the circle of regulars (hero centerpiece) ───────── */

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
const REGULARS = ['M', 'J', 'A', 'L', 'S', 'R', 'K', 'T'];

function OrbitCircle() {
  const R = 184;
  const size = 480;
  const c = size / 2;
  const nodes = useMemo(
    () =>
      REGULARS.map((i, idx) => {
        const a = (idx / REGULARS.length) * Math.PI * 2 - Math.PI / 2;
        return {
          i,
          x: c + R * Math.cos(a),
          y: c + R * Math.sin(a),
          tint: TINTS[idx % TINTS.length],
          live: idx === 0 || idx === 3,
          delay: (idx % 4) * 1.1,
        };
      }),
    [c],
  );
  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto', maxWidth: '100%' }}>
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
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute', inset: 0 }}>
        <circle cx={c} cy={c} r={R} fill="none" stroke="rgba(42,31,24,0.10)" strokeWidth="1" strokeDasharray="2 7" />
        <circle cx={c} cy={c} r={R - 52} fill="none" stroke="rgba(42,31,24,0.06)" strokeWidth="1" />
      </svg>
      <div className="aro-orbit" style={{ position: 'absolute', inset: 0 }}>
        {nodes.map((n, idx) => (
          <div key={idx} style={{ position: 'absolute', left: n.x, top: n.y, width: 56, height: 56, marginLeft: -28, marginTop: -28 }}>
            <div className="aro-orbit-rev" style={{ width: '100%', height: '100%' }}>
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
                  boxShadow: '0 10px 22px -10px rgba(20,12,5,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
                  position: 'relative',
                }}
              >
                {n.i}
                {n.live && (
                  <span
                    className="aro-pulse"
                    style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '1.5px solid rgba(214,122,69,0.55)', animationDelay: `${n.delay}s` }}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
        <div
          style={{
            width: 112,
            height: 112,
            borderRadius: '50%',
            background: 'var(--cream-warm)',
            boxShadow: '0 20px 50px -18px rgba(214,122,69,0.5), inset 0 1px 0 rgba(255,255,255,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ring size={52} holeColor="var(--cream-warm)" />
        </div>
        <div style={{ marginTop: 14, fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          Your café
        </div>
      </div>
      <div
        className="aro-bob"
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
    </div>
  );
}

/* ───────── shared layout helpers ───────── */

function Container({ children, style = {} }) {
  return <div style={{ width: '100%', maxWidth: 1160, margin: '0 auto', padding: '0 32px', ...style }}>{children}</div>;
}

/* organic curved divider — a section's warm glow bleeding across the seam */
function ArcTop({ from, glow }) {
  return (
    <div style={{ position: 'absolute', top: -1, left: 0, right: 0, height: 120, overflow: 'hidden', pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          top: -200,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '140%',
          height: 320,
          borderRadius: '50%',
          background: from,
          boxShadow: glow ? `0 40px 120px ${glow}` : 'none',
        }}
      />
    </div>
  );
}

/* ───────── sections ───────── */

function Nav() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20 }}>
      <Container style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '28px 32px' }}>
        <Wordmark />
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <a className="hide-mobile" href="#leak" style={{ fontSize: 14, color: 'var(--ink-soft)', textDecoration: 'none' }}>How it feels</a>
          <a className="hide-mobile" href="#how" style={{ fontSize: 14, color: 'var(--ink-soft)', textDecoration: 'none' }}>The club</a>
          <a href="#offer" className="btn-primary" style={{ padding: '11px 18px', fontSize: 13 }}>Claim free month</a>
        </div>
      </Container>
    </div>
  );
}

function Hero() {
  return (
    <section
      className="grain grain-soft"
      style={{ position: 'relative', background: 'var(--cream)', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 130, paddingBottom: 90 }}
    >
      <Container>
        <div className="r-hero" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <Reveal><Eyebrow>The regulars club · for cafés &amp; restaurants</Eyebrow></Reveal>
            <Reveal delay={0.06}>
              <h1 style={{ marginTop: 26, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(46px, 6vw, 88px)', letterSpacing: '-0.045em', lineHeight: 0.98 }}>
                Keep your <span className="serif-it" style={{ fontWeight: 400, color: 'var(--terra)' }}>circle</span> close.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p style={{ marginTop: 24, maxWidth: 440, fontSize: 18, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
                Every café has an aura — the warmth people feel when they walk in. aro keeps it glowing long after they leave, so first-timers become regulars and regulars become ritual.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div style={{ marginTop: 36, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <a href="#offer" className="btn-primary" style={{ padding: '18px 28px', fontSize: 15 }}>Claim your free month <span className="arrow-circle">→</span></a>
                <a href="#leak" className="btn-secondary">See how it feels ↓</a>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <div style={{ marginTop: 44, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                A few cafés per neighbourhood · first month free · no commissions
              </div>
            </Reveal>
          </div>
          <div className="hide-mobile">
            <OrbitCircle />
          </div>
        </div>
      </Container>
    </section>
  );
}

function ProofStrip() {
  const cafes = ['The Roastery', 'Bridge & Bean', 'Saint Aubin', 'Maman', 'Kettle Black', 'Rosso'];
  return (
    <section style={{ background: 'var(--cream)', padding: '10px 0 70px' }}>
      <Container>
        <Reveal>
          <div style={{ textAlign: 'center', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 26 }}>
            Loved by independent cafés across Kensington · Inglewood · Bridgeland
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '22px 44px', opacity: 0.7 }}>
            {cafes.map((c) => (
              <span key={c} style={{ fontFamily: 'var(--display)', fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--ink)' }}>{c}</span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Leak() {
  return (
    <section
      id="leak"
      className="grain grain-on-dark"
      style={{ position: 'relative', background: 'var(--espresso)', color: 'var(--cream)', padding: '150px 0 160px', overflow: 'hidden' }}
    >
      <ArcTop from="var(--cream)" />
      {/* faint ring glow bleeding in */}
      <div style={{ position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)', width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle, rgba(214,122,69,0.16), transparent 60%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
      <Container style={{ position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 64, alignItems: 'center' }} className="r-hero">
          {/* the empty seat */}
          <Reveal>
            <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: '40% 40% 38% 38% / 46% 46% 30% 30%', background: 'linear-gradient(160deg, #2A1F18, #160F0B)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}>
              <div style={{ textAlign: 'center', opacity: 0.5 }}>
                <div style={{ fontSize: 52 }}>☕</div>
                <div style={{ marginTop: 14, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(243,234,215,0.6)' }}>table 4 · 8:00 am · empty</div>
              </div>
              {/* light from a window */}
              <div style={{ position: 'absolute', top: '12%', right: '10%', width: 120, height: 180, background: 'linear-gradient(180deg, rgba(229,177,74,0.18), transparent)', filter: 'blur(24px)', borderRadius: 40 }} />
            </div>
          </Reveal>
          <div>
            <Reveal><Eyebrow accent="var(--saffron)" color="rgba(243,234,215,0.6)">The quiet leak</Eyebrow></Reveal>
            <Reveal delay={0.06}>
              <h2 style={{ marginTop: 22, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(34px, 4.4vw, 58px)', letterSpacing: '-0.03em', lineHeight: 1.04 }}>
                Your best regular just stopped coming. You&apos;ll never know why.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p style={{ marginTop: 22, maxWidth: 460, fontSize: 17, lineHeight: 1.65, color: 'rgba(243,234,215,0.78)' }}>
                A new job. A closer café. A forgotten ritual. No goodbye, no reason — just an empty seat where your Tuesday 8am used to sit.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div style={{ marginTop: 34 }}>
                <span style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 'clamp(40px,5vw,64px)', letterSpacing: '-0.04em', color: 'var(--terra)' }}>38%</span>
                <span style={{ marginLeft: 16, fontSize: 16, color: 'rgba(243,234,215,0.72)' }}>of regulars drift away every year — and most cafés never notice.</span>
                <div style={{ marginTop: 8, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(243,234,215,0.4)' }}>Illustrative — your real number is in the free café health check</div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Turn() {
  return (
    <section style={{ position: 'relative', background: 'var(--cream)', padding: '150px 0 120px', overflow: 'hidden' }}>
      <ArcTop from="var(--espresso)" />
      <Container>
        <Reveal style={{ textAlign: 'center' }}>
          <Eyebrow>The fix</Eyebrow>
        </Reveal>
        <Reveal delay={0.06} style={{ textAlign: 'center' }}>
          <h2 style={{ margin: '22px auto 0', maxWidth: 880, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(36px, 5vw, 70px)', letterSpacing: '-0.035em', lineHeight: 1.02 }}>
            What if your café remembered <span className="serif-it" style={{ fontWeight: 400, color: 'var(--terra)' }}>every one</span> of them?
          </h2>
        </Reveal>
        <Reveal delay={0.12} style={{ textAlign: 'center' }}>
          <p style={{ margin: '24px auto 0', maxWidth: 560, fontSize: 18, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
            aro quietly learns who your regulars are, welcomes them by name, and brings them back — turning your café into a circle people belong to.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

function Moving() {
  return (
    <section style={{ background: 'var(--cream-warm)', padding: '120px 0' }}>
      <Container>
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 64, alignItems: 'center' }} className="r-hero">
          <div>
            <Reveal><Eyebrow>Wherever they go</Eyebrow></Reveal>
            <Reveal delay={0.06}>
              <h2 style={{ marginTop: 22, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(34px, 4.4vw, 60px)', letterSpacing: '-0.03em', lineHeight: 1.02 }}>
                Your café, in their pocket. <span className="serif-it" style={{ fontWeight: 400, color: 'var(--terra)' }}>Everywhere they go.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p style={{ marginTop: 22, maxWidth: 440, fontSize: 17, lineHeight: 1.65, color: 'var(--ink-soft)' }}>
                A tap at the counter. A pass in their wallet. A gentle nudge on a slow Tuesday. Wherever they are, the ritual travels with them.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div style={{ marginTop: 28, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 18px', borderRadius: 999, background: 'var(--cream)', boxShadow: '0 10px 28px -16px rgba(20,12,5,0.3)' }}>
                <span style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 20, color: 'var(--terra)' }}>2–3×</span>
                <span style={{ fontSize: 14, color: 'var(--ink-soft)' }}>People with a pass come back more often.</span>
              </div>
            </Reveal>
          </div>
          {/* ring + travelling pass */}
          <Reveal delay={0.1}>
            <div style={{ position: 'relative', height: 380, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(229,177,74,0.3), transparent 62%)', filter: 'blur(10px)' }} />
              <div style={{ position: 'relative' }}>
                <Ring size={200} holeColor="var(--cream-warm)" />
                {/* the pass */}
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-46%, -50%) rotate(-7deg)',
                    width: 180,
                    padding: 16,
                    borderRadius: 18,
                    background: 'linear-gradient(145deg, #D67A45, #DC8B7E 48%, #8D6B8D)',
                    color: 'white',
                    boxShadow: '0 30px 50px -20px rgba(141,107,141,0.55)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9.5, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.9 }}>
                    <span style={{ fontWeight: 700 }}>aro</span><span>Silver</span>
                  </div>
                  <div style={{ marginTop: 16, fontFamily: 'var(--display)', fontSize: 17, fontWeight: 700 }}>Maya Rivera</div>
                  <div style={{ fontSize: 10.5, opacity: 0.85 }}>The Roastery · Kensington</div>
                  <div style={{ marginTop: 12, fontSize: 19, fontWeight: 800, letterSpacing: '-0.03em' }}>1,284<span style={{ fontSize: 10, fontWeight: 500, opacity: 0.8 }}> pts</span></div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: '01', t: 'We build your club with you.', s: 'Your menu, your rewards, your brand. You make coffee; we do the setup.' },
    { n: '02', t: 'Your regulars join in one tap.', s: 'A QR at the counter, a pass in their wallet. No app to download.' },
    { n: '03', t: 'aro keeps them coming back — on its own.', s: 'Welcomes, nudges, and rewards run quietly in the background.' },
  ];
  return (
    <section id="how" style={{ background: 'var(--cream)', padding: '120px 0' }}>
      <Container>
        <Reveal style={{ textAlign: 'center' }}><Eyebrow>Live in 14 days</Eyebrow></Reveal>
        <Reveal delay={0.06} style={{ textAlign: 'center' }}>
          <h2 style={{ margin: '20px auto 60px', fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(32px, 4vw, 52px)', letterSpacing: '-0.03em' }}>
            Simple enough to forget it&apos;s working.
          </h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36 }} className="r-3col">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div style={{ position: 'relative' }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--terra)', letterSpacing: '0.1em' }}>{s.n}</div>
                <div style={{ marginTop: 14, height: 1, background: 'linear-gradient(90deg, rgba(214,122,69,0.4), transparent)' }} />
                <h3 style={{ marginTop: 18, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{s.t}</h3>
                <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.55, color: 'var(--ink-soft)' }}>{s.s}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Numbers() {
  const stats = [
    { v: '+22%', l: 'repeat visits in the first 90 days' },
    { v: '0%', l: 'commission on direct orders — the margin stays yours' },
    { v: '~11 hrs', l: 'of marketing a month you no longer do' },
  ];
  return (
    <section style={{ background: 'var(--cream-warm)', padding: '120px 0' }}>
      <Container>
        <Reveal style={{ textAlign: 'center' }}>
          <h2 style={{ margin: '0 auto 12px', maxWidth: 820, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(30px, 3.8vw, 50px)', letterSpacing: '-0.03em', lineHeight: 1.06 }}>
            The romance is the point. <span className="serif-it" style={{ fontWeight: 400, color: 'var(--terra)' }}>The numbers are the proof.</span>
          </h2>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, marginTop: 56 }} className="r-3col">
          {stats.map((s, i) => (
            <Reveal key={s.v} delay={i * 0.1}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 'clamp(44px, 5vw, 68px)', letterSpacing: '-0.04em', color: 'var(--ink)' }}>{s.v}</div>
                <p style={{ margin: '10px auto 0', maxWidth: 240, fontSize: 15, lineHeight: 1.5, color: 'var(--ink-soft)' }}>{s.l}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3} style={{ textAlign: 'center' }}>
          <div style={{ marginTop: 44, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            Built for owners who&apos;d rather be in the room than in a spreadsheet
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Scarcity() {
  return (
    <section style={{ background: 'var(--cream)', padding: '100px 0' }}>
      <Container>
        <Reveal>
          <div
            style={{
              position: 'relative',
              borderRadius: '70px 70px 70px 12px',
              background: 'linear-gradient(135deg, #F7F0DE, #F3EAD7)',
              border: '1px solid rgba(42,31,24,0.07)',
              padding: 'clamp(36px, 6vw, 72px)',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', right: -60, top: -60, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(229,177,74,0.22), transparent 65%)', filter: 'blur(20px)' }} />
            <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 30 }}>
              <div style={{ maxWidth: 540 }}>
                <Eyebrow>Local by design</Eyebrow>
                <h2 style={{ marginTop: 18, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(30px, 4vw, 50px)', letterSpacing: '-0.03em', lineHeight: 1.04 }}>
                  Only a few cafés per neighbourhood.
                </h2>
                <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.6, color: 'var(--ink-soft)' }}>
                  aro runs on local loyalty, so we partner with just a handful of cafés in each area — never your competitor across the street.
                </p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 64, letterSpacing: '-0.04em', color: 'var(--terra)' }}>3<span style={{ color: 'var(--muted)', fontSize: 34 }}> / 5</span></div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>spots open in Kensington</div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Testimonial() {
  return (
    <section style={{ background: 'var(--cream)', padding: '80px 0 120px' }}>
      <Container style={{ maxWidth: 860 }}>
        <Reveal style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--display)', fontWeight: 500, fontSize: 'clamp(26px, 3.4vw, 40px)', letterSpacing: '-0.02em', lineHeight: 1.22 }}>
            “It feels like having a marketing person I could never afford — except it just <span className="serif-it" style={{ color: 'var(--terra)' }}>works while I make coffee.</span>”
          </p>
        </Reveal>
        <Reveal delay={0.1} style={{ textAlign: 'center' }}>
          <div style={{ marginTop: 26, display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(145deg, #D67A45, #8D6B8D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontFamily: 'var(--display)' }}>S</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Sofia</div>
              <div style={{ fontSize: 12.5, color: 'var(--muted)' }}>The Roastery · Kensington</div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Offer() {
  return (
    <section
      id="offer"
      className="grain grain-on-dark"
      style={{ position: 'relative', background: 'var(--espresso)', color: 'var(--cream)', padding: '160px 0 80px', overflow: 'hidden', textAlign: 'center' }}
    >
      <ArcTop from="var(--cream)" />
      {/* the ring rising like a sun */}
      <div style={{ position: 'absolute', top: 40, left: '50%', transform: 'translateX(-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(229,177,74,0.22), rgba(214,122,69,0.08) 40%, transparent 66%)', filter: 'blur(30px)', pointerEvents: 'none' }} />
      <Container style={{ position: 'relative' }}>
        <Reveal style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}>
          <Ring size={64} holeColor="var(--espresso)" />
        </Reveal>
        <Reveal delay={0.06}>
          <h2 style={{ margin: '0 auto', maxWidth: 880, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(40px, 5.5vw, 84px)', letterSpacing: '-0.04em', lineHeight: 0.98 }}>
            Your neighbourhood&apos;s favourite. <span className="serif-it" style={{ fontWeight: 400, color: 'var(--saffron)' }}>On purpose.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p style={{ margin: '26px auto 0', maxWidth: 520, fontSize: 18, lineHeight: 1.6, color: 'rgba(243,234,215,0.8)' }}>
            Start free for a month. Launch in 14 days. No commissions, no contract. If your regulars don&apos;t feel it, you walk away.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div style={{ marginTop: 38, display: 'flex', justifyContent: 'center' }}>
            <a href="#" className="btn-primary" style={{ background: 'var(--cream)', color: 'var(--ink)', padding: '18px 30px', fontSize: 15 }}>
              Claim your free month <span className="arrow-circle" style={{ background: 'var(--ink)', color: 'var(--cream)' }}>→</span>
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.24}>
          <div style={{ marginTop: 24, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(243,234,215,0.55)' }}>
            First month free · we set it all up · cancel anytime
          </div>
        </Reveal>

        {/* footer */}
        <div style={{ marginTop: 120, paddingTop: 40, borderTop: '1px solid rgba(243,234,215,0.12)', display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'center', justifyContent: 'space-between', textAlign: 'left' }}>
          <div>
            <Wordmark light />
            <div style={{ marginTop: 10, fontSize: 13, color: 'rgba(243,234,215,0.6)' }}>The regulars club. Every café has an aura — we keep it glowing.</div>
          </div>
          <div style={{ display: 'flex', gap: 22, fontSize: 13, color: 'rgba(243,234,215,0.7)' }}>
            <a href="#leak" style={{ color: 'inherit', textDecoration: 'none' }}>How it feels</a>
            <a href="#how" style={{ color: 'inherit', textDecoration: 'none' }}>The club</a>
            <a href="/diagnostic" style={{ color: 'inherit', textDecoration: 'none' }}>Café health check</a>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ───────── page ───────── */

export default function AroLanding() {
  return (
    <div style={{ background: 'var(--cream)', overflowX: 'hidden' }}>
      <Nav />
      <Hero />
      <ProofStrip />
      <Leak />
      <Turn />
      <Moving />
      <HowItWorks />
      <Numbers />
      <Scarcity />
      <Testimonial />
      <Offer />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .aro-orbit { animation: aro-spin 60s linear infinite; transform-origin: 50% 50%; }
        .aro-orbit-rev { animation: aro-spin 60s linear infinite reverse; transform-origin: 50% 50%; }
        .aro-bob { animation: aro-bob 7s ease-in-out infinite; }
        .aro-pulse { animation: aro-ping 3.2s ease-out infinite; }
        @keyframes aro-spin { to { transform: rotate(360deg); } }
        @keyframes aro-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes aro-ping { 0% { transform: scale(1); opacity: 0.8; } 70%,100% { transform: scale(1.7); opacity: 0; } }
        @media (max-width: 900px) {
          .r-hero { grid-template-columns: 1fr !important; }
          .r-3col { grid-template-columns: 1fr !important; gap: 28px !important; }
          .hide-mobile { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .aro-orbit, .aro-orbit-rev, .aro-bob, .aro-pulse { animation: none !important; }
        }
      `,
        }}
      />
    </div>
  );
}
