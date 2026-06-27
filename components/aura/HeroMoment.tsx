// @ts-nocheck
'use client';

/* HeroMoment — the live "wow moment" centerpiece for the hero.
   A returning regular walks in: the app greets them by name, points tick
   up, their usual is already waiting, and the barista sees who they are.
   Self-contained, framer-motion driven, loops gently, respects
   prefers-reduced-motion. Reuses the global .phone/.screen/.notch CSS. */

import * as React from 'react';
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from 'framer-motion';

const { useState, useEffect, useRef } = React;

/* gentle count-up that runs whenever `run` flips true */
function useCountUp(from, to, run, duration = 1100) {
  const [n, setN] = useState(from);
  useEffect(() => {
    if (!run) {
      setN(to);
      return;
    }
    let raf;
    let start;
    const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic
    const tick = (ts) => {
      if (start == null) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setN(Math.round(from + (to - from) * ease(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [from, to, run, duration]);
  return n;
}

/* ── The animated app screen ── */
function MomentScreen({ beat, active }) {
  // points climb from 1,234 → 1,284 the first time the hero comes into view.
  // `active` is already gated by reduced-motion, so this settles to 1,284
  // instantly for users who prefer reduced motion.
  const points = useCountUp(1234, 1284, active, 1200);
  const progress = 72;

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        background: 'var(--cream-warm)',
        color: 'var(--ink)',
        overflow: 'hidden',
      }}
    >
      {/* gradient header */}
      <div
        style={{
          position: 'absolute',
          inset: '0 0 auto 0',
          height: 320,
          background:
            'linear-gradient(160deg, #E5B14A 0%, #DC8B7E 55%, #8D6B8D 100%)',
          clipPath: 'ellipse(140% 100% at 50% 0%)',
        }}
      />

      {/* status bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 28px 6px',
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--cream)',
        }}
      >
        <span>9:41</span>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          <svg width="16" height="10" viewBox="0 0 16 10" fill="var(--cream)">
            <rect x="0" y="6" width="3" height="4" rx="0.5" />
            <rect x="4" y="4" width="3" height="6" rx="0.5" />
            <rect x="8" y="2" width="3" height="8" rx="0.5" />
            <rect x="12" y="0" width="3" height="10" rx="0.5" />
          </svg>
          <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
            <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="var(--cream)" />
            <rect x="2" y="2" width="14" height="7" rx="1.2" fill="var(--cream)" />
            <rect x="19" y="3.5" width="2" height="4" rx="1" fill="var(--cream)" />
          </svg>
        </div>
      </div>

      {/* greeting */}
      <div style={{ position: 'relative', padding: '8px 22px 0', color: 'white' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                opacity: 0.85,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Welcome back
            </div>
            <div
              style={{
                fontFamily: 'var(--display)',
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: '-0.03em',
                marginTop: 2,
              }}
            >
              Hey, Maya
            </div>
          </div>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.25)',
              border: '1.5px solid rgba(255,255,255,0.55)',
            }}
          />
        </div>

        {/* points card */}
        <div
          style={{
            marginTop: 22,
            padding: 18,
            borderRadius: 22,
            background: 'rgba(255,255,255,0.16)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.32)',
            color: 'white',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 11,
              opacity: 0.85,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            <span>Your points</span>
            <span>Silver</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 8,
              marginTop: 6,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--display)',
                fontSize: 44,
                fontWeight: 800,
                letterSpacing: '-0.04em',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {points.toLocaleString()}
            </span>
            <span style={{ fontSize: 12, opacity: 0.8 }}>pts</span>

            {/* +50 flash */}
            <AnimatePresence>
              {active && (
                <motion.span
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 18 }}
                  style={{
                    marginLeft: 'auto',
                    fontSize: 12,
                    fontWeight: 700,
                    padding: '3px 9px',
                    borderRadius: 999,
                    background: 'rgba(255,255,255,0.9)',
                    color: '#A65A30',
                  }}
                >
                  +50
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div
            style={{
              marginTop: 12,
              height: 5,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.22)',
              overflow: 'hidden',
            }}
          >
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.1, ease: 'easeOut', delay: 0.3 }}
              style={{ height: '100%', background: 'white', borderRadius: 999 }}
            />
          </div>
          <div style={{ marginTop: 8, fontSize: 11, opacity: 0.85 }}>
            2 visits away from <strong style={{ fontWeight: 600 }}>Gold</strong>
          </div>
        </div>
      </div>

      {/* bottom sheet */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: 290,
          background: 'var(--cream-warm)',
          borderRadius: '28px 28px 0 0',
          padding: '20px 22px 26px',
          boxShadow: '0 -8px 24px rgba(20,12,5,0.06)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontWeight: 600, fontSize: 14 }}>Ready for you</span>
          <span
            style={{
              fontSize: 11,
              color: 'var(--muted)',
              fontFamily: 'var(--mono)',
              textTransform: 'uppercase',
            }}
          >
            3 perks
          </span>
        </div>

        {/* "your usual" — highlighted with a breathing ring */}
        <motion.div
          animate={
            active
              ? { boxShadow: ['0 0 0 0 rgba(214,122,69,0)', '0 0 0 3px rgba(214,122,69,0.35)', '0 0 0 0 rgba(214,122,69,0)'] }
              : {}
          }
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 14px',
            borderRadius: 16,
            background: 'white',
            marginTop: 12,
            boxShadow: '0 6px 14px -10px rgba(20,12,5,0.16)',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 11,
              background: '#D67A45',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
            }}
          >
            ☕
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 13.5 }}>Your usual oat flat white</div>
            <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>Ready in 3 min · tap to confirm</div>
          </div>
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 10,
              padding: '4px 8px',
              background: 'var(--ink)',
              color: 'var(--cream)',
              borderRadius: 999,
            }}
          >
            −20%
          </div>
        </motion.div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 14px',
            borderRadius: 16,
            background: 'white',
            marginTop: 10,
            opacity: 0.92,
            boxShadow: '0 6px 14px -10px rgba(20,12,5,0.16)',
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 11,
              background: '#8D6B8D',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
            }}
          >
            🎁
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 13.5 }}>Mystery reward</div>
            <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>Spin to reveal</div>
          </div>
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 10,
              padding: '4px 8px',
              background: 'var(--ink)',
              color: 'var(--cream)',
              borderRadius: 999,
            }}
          >
            NEW
          </div>
        </div>
      </div>

      {/* welcome toast — slides down on beat 0 */}
      <AnimatePresence>
        {beat === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -28 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            style={{
              position: 'absolute',
              top: 52,
              left: 16,
              right: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '11px 14px',
              borderRadius: 16,
              background: 'rgba(31,22,18,0.82)',
              backdropFilter: 'blur(14px)',
              color: 'var(--cream)',
              boxShadow: '0 12px 30px -12px rgba(20,12,5,0.6)',
              zIndex: 12,
            }}
          >
            <span style={{ fontSize: 18 }}>☕</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600 }}>Welcome back, Maya</div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>Your usual is one tap away</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* barista chip — what the counter sees, beat 2 */}
      <AnimatePresence>
        {beat === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            style={{
              position: 'absolute',
              bottom: 26,
              left: 18,
              right: 18,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '11px 14px',
              borderRadius: 16,
              background: 'rgba(92,124,80,0.95)',
              color: 'white',
              boxShadow: '0 12px 30px -12px rgba(20,12,5,0.5)',
              zIndex: 12,
            }}
          >
            <span
              style={{
                width: 26,
                height: 26,
                borderRadius: 8,
                background: 'rgba(255,255,255,0.22)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              M
            </span>
            <div style={{ flex: 1, fontSize: 12 }}>
              <strong style={{ fontWeight: 700 }}>Barista sees:</strong> Maya · 3rd visit this week
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── The floating Apple-Wallet-style pass, layered in front ── */
function FloatingPass({ reduced }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: -8 }}
      whileInView={{ opacity: 1, y: 0, rotate: -7 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ delay: 0.4, type: 'spring', stiffness: 120, damping: 16 }}
      style={{
        position: 'absolute',
        left: -54,
        bottom: 70,
        width: 196,
        zIndex: 6,
        pointerEvents: 'none',
      }}
    >
      <motion.div
        animate={reduced ? {} : { y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          padding: 16,
          borderRadius: 20,
          background:
            'linear-gradient(145deg, #D67A45 0%, #DC8B7E 48%, #8D6B8D 100%)',
          color: 'white',
          boxShadow:
            '0 30px 50px -20px rgba(141,107,141,0.55), 0 1px 0 rgba(255,255,255,0.25) inset',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* shine sweep */}
        {!reduced && (
          <motion.div
            animate={{ x: ['-120%', '220%'] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: 60,
              background:
                'linear-gradient(105deg, transparent, rgba(255,255,255,0.5), transparent)',
              transform: 'skewX(-18deg)',
            }}
          />
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 10,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            opacity: 0.92,
          }}
        >
          <span style={{ fontWeight: 700 }}>aura club</span>
          <span>Silver</span>
        </div>
        <div
          style={{
            marginTop: 14,
            fontFamily: 'var(--display)',
            fontSize: 19,
            fontWeight: 700,
            letterSpacing: '-0.02em',
          }}
        >
          Maya Rivera
        </div>
        <div style={{ fontSize: 11, opacity: 0.85, marginTop: 1 }}>
          The Roastery · Kensington
        </div>
        <div
          style={{
            marginTop: 14,
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em' }}>
            1,284<span style={{ fontSize: 11, fontWeight: 500, opacity: 0.8 }}> pts</span>
          </span>
          {/* faux barcode */}
          <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 20 }}>
            {[6, 14, 9, 18, 7, 16, 11, 20, 8, 15].map((h, i) => (
              <span
                key={i}
                style={{
                  width: 2,
                  height: h,
                  background: 'rgba(255,255,255,0.85)',
                  borderRadius: 1,
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Public component ── */
export default function HeroMoment() {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-12%' });
  const [beat, setBeat] = useState(reduced ? -1 : 0);

  // cycle: 0 welcome toast → 1 (clean) → 2 barista chip → loop
  useEffect(() => {
    if (reduced || !inView) return;
    const id = setInterval(() => setBeat((b) => (b + 1) % 3), 2600);
    return () => clearInterval(id);
  }, [reduced, inView]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <FloatingPass reduced={reduced} />
      <div className="phone" style={{ transform: 'scale(0.94)', transformOrigin: 'top center' }}>
        <div className="notch" />
        <div className="screen">
          <MomentScreen beat={beat} active={inView && !reduced} />
        </div>
      </div>
    </div>
  );
}
