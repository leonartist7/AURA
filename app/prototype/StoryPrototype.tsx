/* eslint-disable */
// @ts-nocheck
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

// ─── helpers ────────────────────────────────────────────────────────────────
const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

const hx = (h: string) =>
  [0, 2, 4].map((i) => parseInt(h.replace('#', '').slice(i, i + 2), 16));

const mix = (c1: string, c2: string, t: number) => {
  const a = hx(c1), b = hx(c2);
  return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(',')})`;
};

const ramp = (p: number, stops: { p: number; [k: string]: any }[], key: string) => {
  const s = stops.findIndex((s) => s.p >= p);
  if (s <= 0) return stops[0][key];
  if (s >= stops.length) return stops[stops.length - 1][key];
  const a = stops[s - 1], b = stops[s];
  const t = clamp((p - a.p) / (b.p - a.p));
  return mix(a[key], b[key], t);
};

// fade-in a→b, hold b→c, fade-out c→d
const win = (p: number, a: number, b: number, c: number, d: number) => {
  if (p < a || p > d) return 0;
  if (p < b) return clamp((p - a) / (b - a));
  if (p <= c) return 1;
  return clamp(1 - (p - c) / (d - c));
};

// ─── sky colour keyframes ────────────────────────────────────────────────────
const SKY = [
  { p: 0.00, top: '#D9C6A6', bot: '#EFE4CC' }, // first light
  { p: 0.14, top: '#F4ECD7', bot: '#F7F0DE' }, // bright morning
  { p: 0.30, top: '#ECD5A8', bot: '#E8C990' }, // late morning
  { p: 0.50, top: '#D89A5C', bot: '#C98E5A' }, // golden hour
  { p: 0.62, top: '#7A3E2C', bot: '#5C2E1E' }, // dusk
  { p: 0.70, top: '#2A1F18', bot: '#160F0B' }, // deep night
  { p: 0.80, top: '#1A1208', bot: '#0E0904' }, // darkest
  { p: 0.90, top: '#5C3A20', bot: '#8A5C38' }, // pre-dawn glow
  { p: 1.00, top: '#F0E6D0', bot: '#F7F0DE' }, // morning again
];

const ORB_COLOR = [
  { p: 0.00, c: '#F5DEB3' }, // pale dawn
  { p: 0.14, c: '#FFE680' }, // morning yellow
  { p: 0.50, c: '#FFB347' }, // golden
  { p: 0.62, c: '#FF6B35' }, // sunset orange
  { p: 0.70, c: '#FF4500' }, // deep red before dark
  { p: 0.72, c: '#1A1208' }, // hidden in night
  { p: 0.90, c: '#FF6B35' }, // reappearing
  { p: 1.00, c: '#FFE680' }, // new morning
];

// ─── clock ──────────────────────────────────────────────────────────────────
const fmtClock = (p: number) => {
  const totalMins = Math.round(p * 24 * 60); // 0 = 5am, wraps back
  const startMins = 5 * 60;
  const mins = (startMins + totalMins) % (24 * 60);
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const ampm = h < 12 ? 'AM' : 'PM';
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
};

// ─── sub-components ─────────────────────────────────────────────────────────
function Act({ p, a, b, c, d, children }: any) {
  const o = win(p, a, b, c, d);
  const y = o < 1 && p < b ? (1 - o) * 24 : 0;
  return (
    <div style={{
      position: 'absolute', left: '50%', top: '50%',
      transform: `translate(-50%, calc(-50% + ${y}px))`,
      opacity: o, textAlign: 'center', maxWidth: 560,
      padding: '0 24px', pointerEvents: o > 0 ? 'auto' : 'none',
      transition: 'none',
    }}>
      {children}
    </div>
  );
}

function Tile({ p, a, b, c, d, label, value, sub }: any) {
  const o = win(p, a, b, c, d);
  const x = o < 1 && p < b ? (1 - o) * 16 : 0;
  return (
    <div style={{
      opacity: o,
      transform: `translateX(${x}px)`,
      background: 'rgba(243,234,215,0.12)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(243,234,215,0.22)',
      borderRadius: 12,
      padding: '14px 18px',
      minWidth: 140,
    }}>
      <div className="mono" style={{ color: 'rgba(243,234,215,0.55)', fontSize: 10, marginBottom: 6 }}>{label}</div>
      <div className="display" style={{ color: '#F3EAD7', fontSize: 26, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ color: 'rgba(243,234,215,0.6)', fontSize: 12, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

// ─── main ────────────────────────────────────────────────────────────────────
export default function StoryPrototype() {
  const [p, setP] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const onScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const el = wrapRef.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      setP(clamp(-top / scrollable));
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll]);

  // sky
  const skyTop = ramp(p, SKY, 'top');
  const skyBot = ramp(p, SKY, 'bot');

  // orb — sun arc
  const orbColor = ramp(p, ORB_COLOR, 'c');
  const orbX = clamp(p * 1.1 - 0.05) * 80 + 8; // 8% → 88%
  const orbArcY = Math.sin(clamp(p * 1.1 - 0.05) * Math.PI) * -30; // peaks at -30%
  const orbTop = 55 + orbArcY; // base 55%, peak ~25%
  const orbVisible = p < 0.68 || p > 0.88;
  const orbSize = 56 + Math.sin(clamp(p) * Math.PI) * 24; // grows through day

  // night
  const nightO = win(p, 0.65, 0.70, 0.82, 0.88);
  const dawnO = win(p, 0.88, 0.94, 1.0, 1.0);

  // phone glow
  const phoneO = win(p, 0.60, 0.67, 0.78, 0.84);

  // stars
  const stars = Array.from({ length: 26 }, (_, i) => ({
    x: ((i * 37 + 11) % 97) + 1.5,
    y: ((i * 53 + 7) % 55) + 2,
    size: (i % 3) + 1,
    delay: (i * 0.13) % 1,
  }));

  return (
    <div ref={wrapRef} style={{ height: '640vh', position: 'relative' }}>
      {/* sticky scene */}
      <div className="grain" style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
        background: `linear-gradient(180deg, ${skyTop} 0%, ${skyBot} 100%)`,
        transition: 'background 0.05s linear',
      }}>

        {/* stars */}
        {stars.map((s, i) => (
          <span key={i} style={{
            position: 'absolute',
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.size, height: s.size,
            borderRadius: '50%',
            background: '#F7F0DE',
            opacity: nightO * (0.4 + s.delay * 0.6),
          }} />
        ))}

        {/* orb — the sun */}
        {orbVisible && (
          <div style={{
            position: 'absolute',
            left: `${orbX}%`,
            top: `${orbTop}%`,
            transform: 'translate(-50%, -50%)',
            width: orbSize, height: orbSize,
            borderRadius: '50%',
            background: orbColor,
            boxShadow: `0 0 ${orbSize * 1.5}px ${orbSize * 0.8}px ${orbColor}55`,
            opacity: p > 0.66 ? clamp(1 - (p - 0.66) / 0.04) : 1,
          }} />
        )}

        {/* horizon glow at dawn re-entry */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '35%',
          background: `linear-gradient(0deg, #FF6B3522 0%, transparent 100%)`,
          opacity: dawnO,
          pointerEvents: 'none',
        }} />

        {/* phone — after lights off */}
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: phoneO,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
        }}>
          {/* phone body */}
          <div style={{
            width: 180, height: 320, borderRadius: 28,
            background: '#0E0904',
            border: '2px solid rgba(243,234,215,0.15)',
            boxShadow: '0 0 60px 20px rgba(229,177,74,0.12)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 12, padding: 20,
          }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(243,234,215,0.2)', marginBottom: 8 }} />
            {/* notification */}
            <div style={{
              width: '100%',
              background: 'rgba(243,234,215,0.08)',
              border: '1px solid rgba(229,177,74,0.25)',
              borderRadius: 14, padding: '10px 12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: '#D67A45', flexShrink: 0 }} />
                <span style={{ color: 'rgba(243,234,215,0.9)', fontSize: 11, fontWeight: 600 }}>AURA</span>
                <span style={{ color: 'rgba(243,234,215,0.35)', fontSize: 10, marginLeft: 'auto' }}>now</span>
              </div>
              <div style={{ color: '#F3EAD7', fontSize: 12, lineHeight: 1.4 }}>
                We&apos;re closed, but your usual is waiting for tomorrow. ☀
              </div>
            </div>
            {/* second notification */}
            <div style={{
              width: '100%',
              background: 'rgba(243,234,215,0.05)',
              border: '1px solid rgba(243,234,215,0.1)',
              borderRadius: 14, padding: '10px 12px',
            }}>
              <div style={{ color: 'rgba(243,234,215,0.5)', fontSize: 11, marginBottom: 4 }}>Visit streak</div>
              <div className="display" style={{ color: '#E5B14A', fontSize: 28 }}>12 days</div>
            </div>
          </div>
          <div style={{ color: 'rgba(243,234,215,0.5)', fontSize: 13, letterSpacing: '0.06em' }}>
            The café closes. AURA stays open.
          </div>
        </div>

        {/* glass tiles — morning rush / system data */}
        <div style={{
          position: 'absolute', bottom: 32, left: 32,
          display: 'flex', gap: 12, flexWrap: 'wrap',
        }}>
          <Tile p={p} a={0.18} b={0.24} c={0.44} d={0.52} label="Today's regulars" value="34" sub="12 already in" />
          <Tile p={p} a={0.20} b={0.26} c={0.44} d={0.52} label="Avg spend / visit" value="£7.40" sub="↑ 18% vs last month" />
          <Tile p={p} a={0.22} b={0.28} c={0.44} d={0.52} label="At-risk customers" value="8" sub="Not seen in 14 days" />
        </div>

        {/* narrative acts */}
        <Act p={p} a={0.00} b={0.06} c={0.11} d={0.16}>
          <h1 className="display" style={{ fontSize: 'clamp(36px,6vw,72px)', color: '#2A1F18', marginBottom: 16 }}>
            One day.
          </h1>
          <p style={{ color: '#5C3A20', fontSize: 18, lineHeight: 1.6 }}>
            Every café tells a story in light. Scroll to live it.
          </p>
        </Act>

        <Act p={p} a={0.16} b={0.22} c={0.32} d={0.38}>
          <h2 className="display" style={{ fontSize: 'clamp(28px,5vw,60px)', color: '#2A1F18', marginBottom: 14 }}>
            The morning rush.
          </h2>
          <p style={{ color: '#5C3A20', fontSize: 17, lineHeight: 1.6 }}>
            You know their names before they reach the counter.<br />
            AURA knows who&apos;s coming before they walk through the door.
          </p>
        </Act>

        <Act p={p} a={0.38} b={0.44} c={0.54} d={0.60}>
          <h2 className="display" style={{ fontSize: 'clamp(28px,5vw,60px)', color: '#F3EAD7', marginBottom: 14 }}>
            The system clicks.
          </h2>
          <p style={{ color: 'rgba(243,234,215,0.75)', fontSize: 17, lineHeight: 1.6 }}>
            Who&apos;s drifting. Who&apos;s loyal. Who needs a reason to come back.<br />
            It all runs quietly — so you can stay present.
          </p>
        </Act>

        <Act p={p} a={0.60} b={0.67} c={0.76} d={0.84}>
          <h2 className="display" style={{ fontSize: 'clamp(28px,5vw,56px)', color: '#F3EAD7', marginBottom: 14 }}>
            After the lights go off.
          </h2>
          <p style={{ color: 'rgba(243,234,215,0.7)', fontSize: 17, lineHeight: 1.6 }}>
            The café closes. The relationship doesn&apos;t.
          </p>
        </Act>

        <Act p={p} a={0.88} b={0.93} c={0.97} d={1.00}>
          <h2 className="display" style={{ fontSize: 'clamp(28px,5vw,60px)', color: '#2A1F18', marginBottom: 14 }}>
            A new day begins.
          </h2>
          <p style={{ color: '#5C3A20', fontSize: 17, lineHeight: 1.6, marginBottom: 28 }}>
            And your regulars are already on their way.
          </p>
          <a href="/" style={{
            display: 'inline-block',
            background: '#D67A45', color: '#F3EAD7',
            padding: '14px 32px', borderRadius: 8,
            fontWeight: 600, fontSize: 15, textDecoration: 'none',
            letterSpacing: '0.02em',
          }}>
            Meet AURA →
          </a>
        </Act>

        {/* clock */}
        <div className="mono" style={{
          position: 'absolute', top: 20, right: 24,
          color: p > 0.60 && p < 0.88 ? 'rgba(243,234,215,0.5)' : 'rgba(42,31,24,0.45)',
          fontSize: 11, letterSpacing: '0.14em',
        }}>
          {fmtClock(p)}
        </div>

        {/* progress bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 3,
          background: 'rgba(42,31,24,0.1)',
        }}>
          <div style={{
            height: '100%', width: `${p * 100}%`,
            background: 'linear-gradient(90deg, #D67A45, #E5B14A, #8D6B8D)',
            transition: 'none',
          }} />
        </div>

        {/* back link */}
        <a href="/" className="mono" style={{
          position: 'absolute', top: 20, left: 24,
          color: p > 0.60 && p < 0.88 ? 'rgba(243,234,215,0.5)' : 'rgba(42,31,24,0.4)',
          fontSize: 10, textDecoration: 'none', letterSpacing: '0.12em',
        }}>
          ← AURA
        </a>
      </div>
    </div>
  );
}
