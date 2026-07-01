'use client';

import { useEffect, useRef, useState } from 'react';

/* Shared scroll-story math + a pinned-progress hook, reused by the lab demos. */

export const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));

// fade in a→b, hold b→c, fade out c→d
export const win = (p: number, a: number, b: number, c: number, d: number) => {
  if (p <= a || p >= d) return 0;
  if (p < b) return (p - a) / (b - a);
  if (p <= c) return 1;
  return 1 - (p - c) / (d - c);
};

const hx = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
export const mix = (c1: string, c2: string, t: number) => {
  const a = hx(c1), b = hx(c2);
  return `rgb(${a.map((v, i) => Math.round(lerp(v, b[i], t))).join(',')})`;
};
// multi-stop color ramp: stops = [[pos, '#hex'], ...] sorted by pos
export const ramp = (p: number, stops: [number, string][]) => {
  if (p <= stops[0][0]) return stops[0][1];
  for (let i = 1; i < stops.length; i++) {
    if (p <= stops[i][0]) {
      const t = seg(p, stops[i - 1][0], stops[i][0]);
      return mix(stops[i - 1][1], stops[i][1], t);
    }
  }
  return stops[stops.length - 1][1];
};

/** Progress (0..1) through a pinned/sticky section whose wrapper ref is returned. */
export function usePinnedProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    let last = -1;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const next = clamp(-rect.top / Math.max(1, total));
        if (Math.abs(next - last) > 0.0005) {
          last = next;
          setP(next);
        }
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return { ref, p };
}
