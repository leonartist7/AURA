import type { Metadata } from 'next';
import Link from 'next/link';
import '../aura-landing.css';
export const metadata: Metadata = { title: 'aro — scroll approach lab', robots: { index: false } };
const items = [
  { h: 'a', t: 'Living 3D', d: 'Live WebGL ring — morphs on scroll, breathes & glows while idle. Max wow, heaviest.' },
  { h: 'b', t: 'Parallax depth', d: 'Background color shifts, soft elements fly at different speeds, surroundings light up. Ultra-light.' },
  { h: 'c', t: 'Cinematic', d: 'Full-bleed warm backdrop + scroll color-grade + a 3D-ring accent + parallax type. Mixed media.' },
];
export default function Page() {
  return (
    <div className="aura-landing-root" style={{ minHeight: '100dvh', background: 'var(--cream)', display: 'flex', alignItems: 'center' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 40 }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)' }}>Scroll-approach lab · pick a direction</div>
        <h1 style={{ margin: '14px 0 30px', fontFamily: 'var(--display)', fontWeight: 600, fontSize: 'clamp(32px,5vw,60px)', letterSpacing: '-0.04em' }}>Three ways to tell the story.</h1>
        <div style={{ display: 'grid', gap: 16 }}>
          {items.map((it) => (
            <Link key={it.h} href={`/lab/${it.h}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ padding: 24, borderRadius: 20, background: 'var(--cream-warm)', border: '1px solid rgba(42,31,24,0.08)', display: 'flex', gap: 18, alignItems: 'center' }}>
                <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 30, color: 'var(--terra)', textTransform: 'uppercase' }}>{it.h}</div>
                <div>
                  <div style={{ fontFamily: 'var(--display)', fontWeight: 600, fontSize: 22 }}>{it.t}</div>
                  <div style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 4 }}>{it.d}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
