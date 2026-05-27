'use client';

import { useState } from 'react';

interface VideoBackgroundProps {
  src?: string;
  poster?: string;
  className?: string;
}

/**
 * Slot for the Screen 1 hero loop.
 *
 * MEDIA SLOT: drop an 8-second 9:16 mobile-first MP4 at /media/hero-loop.mp4
 * (e.g. a Seedance / Runway gradient + coffee-atmosphere loop). When src is
 * missing or the video fails to load, we render the warm Aura atmosphere
 * gradient — the app must look great empty too.
 */
export function VideoBackground({ src, poster, className = '' }: VideoBackgroundProps) {
  const [failed, setFailed] = useState(false);
  const showVideo = src && !failed;

  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {showVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={poster}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover opacity-60"
          src={src}
        />
      ) : (
        <div
          className="h-full w-full"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 10%, rgba(232,155,108,0.35), transparent 70%),' +
              'radial-gradient(ellipse 80% 70% at 30% 90%, rgba(201,169,97,0.22), transparent 70%),' +
              'radial-gradient(ellipse 70% 60% at 90% 70%, rgba(168,181,160,0.18), transparent 70%),' +
              'linear-gradient(180deg, #FBEFE2 0%, #FAF6F0 60%, #F1E8F0 100%)',
          }}
        />
      )}
      {/* Cream wash for legibility */}
      <div className="absolute inset-0 bg-aura-cream/30" />
    </div>
  );
}
