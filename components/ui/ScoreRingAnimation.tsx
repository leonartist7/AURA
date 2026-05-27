'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { CountUpNumber } from './CountUpNumber';

interface ScoreRingAnimationProps {
  score: number; // 0–100
}

/**
 * Cinematic 3-second reveal:
 *   0.0 – 1.0s : coffee-cup outline draws in gold
 *   1.0 – 2.0s : cup fades to ring, ring fills to score
 *   1.0 – 2.0s : number counts 0 -> score (handled by CountUpNumber)
 *
 * Reduced-motion: snap to filled ring + final number instantly.
 */
export function ScoreRingAnimation({ score }: ScoreRingAnimationProps) {
  const reduced = useReducedMotion();
  const RADIUS = 92;
  const CIRC = 2 * Math.PI * RADIUS;
  const targetDash = CIRC * (1 - score / 100);

  return (
    <div className="relative mx-auto h-56 w-56" aria-label={`Score ${score} of 100`}>
      <svg viewBox="0 0 220 220" className="absolute inset-0">
        {/* Background ring */}
        <circle
          cx="110"
          cy="110"
          r={RADIUS}
          fill="none"
          stroke="#EDE4D6"
          strokeWidth="10"
        />

        {/* Stage 1 — cup outline (0-1s), then fades out */}
        <motion.path
          d="M62 70 L158 70 L150 158 Q150 174 134 174 L86 174 Q70 174 70 158 Z"
          fill="none"
          stroke="#C9A961"
          strokeWidth="3"
          strokeLinecap="round"
          initial={reduced ? { pathLength: 1, opacity: 0 } : { pathLength: 0, opacity: 1 }}
          animate={reduced ? { opacity: 0 } : { pathLength: [0, 1, 1], opacity: [1, 1, 0] }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 2, times: [0, 0.5, 1], ease: [0.65, 0, 0.35, 1] }
          }
        />

        {/* Stage 2 — filling ring (1-2s) */}
        <motion.circle
          cx="110"
          cy="110"
          r={RADIUS}
          fill="none"
          stroke="#C9A961"
          strokeWidth="10"
          strokeLinecap="round"
          transform="rotate(-90 110 110)"
          strokeDasharray={CIRC}
          initial={
            reduced
              ? { strokeDashoffset: targetDash, opacity: 1 }
              : { strokeDashoffset: CIRC, opacity: 0 }
          }
          animate={
            reduced
              ? { strokeDashoffset: targetDash, opacity: 1 }
              : { strokeDashoffset: targetDash, opacity: 1 }
          }
          transition={
            reduced
              ? { duration: 0 }
              : { strokeDashoffset: { delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }, opacity: { delay: 0.9, duration: 0.2 } }
          }
        />
      </svg>

      {/* Score number */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduced ? 0 : 1, duration: 0.3 }}
      >
        <div className="font-display text-7xl font-bold leading-none text-aura-espresso">
          <CountUpNumber to={score} duration={reduced ? 0 : 1.2} />
        </div>
        <div className="mt-1 text-xs uppercase tracking-[0.18em] text-aura-mute">
          / 100
        </div>
      </motion.div>
    </div>
  );
}
