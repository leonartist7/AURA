'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface CoffeeLeakAnimationProps {
  /** Roughly maps to at-risk customers — we cap visible drips at 12 for legibility. */
  intensity: number;
}

/**
 * SVG cup leaking drips. Intensity drives drip count (1-12) and staggered
 * animation delay. Drips fall, fade, and repeat.
 */
export function CoffeeLeakAnimation({ intensity }: CoffeeLeakAnimationProps) {
  const reduced = useReducedMotion();
  const drips = Math.max(1, Math.min(12, Math.ceil(intensity / 6)));

  return (
    <div className="relative mx-auto h-56 w-56" aria-hidden="true">
      <svg viewBox="0 0 200 240" className="absolute inset-0">
        {/* Saucer shadow */}
        <ellipse cx="100" cy="220" rx="70" ry="6" fill="#2A1F1A" opacity="0.08" />

        {/* Cup body */}
        <motion.path
          d="M40 70 L160 70 L150 180 Q150 200 130 200 L70 200 Q50 200 50 180 Z"
          fill="#FAF6F0"
          stroke="#2A1F1A"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        />
        {/* Coffee */}
        <motion.ellipse
          cx="100"
          cy="72"
          rx="58"
          ry="6"
          fill="#5C3A24"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, duration: 0.4, ease: 'easeOut' }}
        />
        {/* Crack along the bottom — implied leak source */}
        <motion.path
          d="M70 195 q5 -4 10 0 q5 4 10 0 q5 -4 10 0 q5 4 10 0 q5 -4 10 0"
          fill="none"
          stroke="#C9A961"
          strokeWidth="1.4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        />
        {/* Handle */}
        <motion.path
          d="M160 90 q26 4 26 32 q0 28 -26 32"
          fill="none"
          stroke="#2A1F1A"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        />
      </svg>

      {/* Drips */}
      <div className="absolute inset-x-0 top-[78%] flex justify-center">
        <div className="relative h-24 w-40">
          {Array.from({ length: drips }, (_, i) => {
            const left = (i / Math.max(drips - 1, 1)) * 100;
            const delay = (i * 0.18) % 1.6;
            return (
              <motion.span
                key={i}
                className="absolute top-0 block h-3 w-1.5 rounded-full bg-[#5C3A24]"
                style={{ left: `${left}%` }}
                initial={{ y: 0, opacity: 0 }}
                animate={
                  reduced
                    ? { opacity: 0.7 }
                    : { y: [0, 60], opacity: [0, 0.9, 0] }
                }
                transition={{
                  duration: 1.8,
                  repeat: reduced ? 0 : Infinity,
                  delay,
                  ease: 'easeIn',
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
