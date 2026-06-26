import { ImageResponse } from 'next/og';

export const alt =
  "AURA CLUB — Your neighborhood's favorite. On purpose.";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Dynamic social share card. Renders at build time — no asset file to maintain.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background:
            'radial-gradient(120% 120% at 18% 0%, #2A1F18 0%, #1F1612 55%, #160F0B 100%)',
          fontFamily: 'serif',
        }}
      >
        {/* film-grain warmth via layered glow */}
        <div
          style={{
            position: 'absolute',
            top: -160,
            left: -120,
            width: 620,
            height: 620,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(229,177,74,0.28) 0%, rgba(214,122,69,0.10) 45%, rgba(0,0,0,0) 70%)',
          }}
        />

        {/* brand lockup */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background:
                'linear-gradient(135deg, #D67A45 0%, #E5B14A 50%, #8D6B8D 100%)',
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: '#F3EAD7',
              }}
            />
          </div>
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: '#F3EAD7',
              display: 'flex',
              gap: 10,
            }}
          >
            aura <span style={{ color: '#D67A45', fontStyle: 'italic' }}>club</span>
          </div>
        </div>

        {/* headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 72,
              lineHeight: 1.04,
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: '#F7F0DE',
              maxWidth: 920,
            }}
          >
            <span>Your neighborhood&apos;s favorite.</span>
            <span style={{ color: '#E5B14A', fontStyle: 'italic' }}>
              On purpose.
            </span>
          </div>
          <div
            style={{
              fontSize: 28,
              color: 'rgba(243,234,215,0.72)',
              maxWidth: 860,
            }}
          >
            The club that turns first visits into rituals — loyalty, offers &amp;
            direct ordering your regulars actually love.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
