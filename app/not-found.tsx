import type { Metadata } from 'next';
import Link from 'next/link';
import './aura-landing.css';

export const metadata: Metadata = {
  title: 'Lost the thread',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
        padding: '40px 24px',
        textAlign: 'center',
        background:
          'radial-gradient(120% 120% at 50% 0%, #2A1F18 0%, #1F1612 60%, #160F0B 100%)',
        color: '#F3EAD7',
        fontFamily: 'var(--body, ui-sans-serif, system-ui)',
      }}
    >
      <svg width="56" height="56" viewBox="0 0 32 32">
        <defs>
          <linearGradient id="nf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D67A45" />
            <stop offset="50%" stopColor="#E5B14A" />
            <stop offset="100%" stopColor="#8D6B8D" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="13" fill="url(#nf)" />
        <circle cx="16" cy="16" r="5.5" fill="#1F1612" />
      </svg>

      <h1
        style={{
          fontFamily: 'var(--display, serif)',
          fontSize: 'clamp(28px, 6vw, 44px)',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          margin: 0,
        }}
      >
        This table&apos;s not set.
      </h1>
      <p
        style={{
          maxWidth: 420,
          fontSize: 16,
          lineHeight: 1.5,
          color: 'rgba(243,234,215,0.74)',
          margin: 0,
        }}
      >
        The page you&apos;re after has either moved or never existed. Let&apos;s
        get you back to the warm part of the room.
      </p>

      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/"
          style={{
            padding: '14px 24px',
            borderRadius: 999,
            background: '#F3EAD7',
            color: '#1F1612',
            fontWeight: 600,
            fontSize: 14,
            textDecoration: 'none',
          }}
        >
          Back home
        </Link>
        <Link
          href="/diagnostic"
          style={{
            padding: '14px 24px',
            borderRadius: 999,
            border: '1px solid rgba(243,234,215,0.28)',
            color: '#F3EAD7',
            fontWeight: 600,
            fontSize: 14,
            textDecoration: 'none',
          }}
        >
          Café health check
        </Link>
      </div>
    </div>
  );
}
