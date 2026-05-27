'use client';

import { motion } from 'framer-motion';

/**
 * Three Aura-cream dots that bounce in sequence. Used inside buttons during
 * async submits and anywhere we'd otherwise reach for a generic spinner.
 */
export function LoadingDots({ size = 6 }: { size?: number }) {
  const dot = {
    width: size,
    height: size,
    borderRadius: '50%',
    background: 'currentColor',
  } as const;

  return (
    <span
      role="status"
      aria-label="Loading"
      className="inline-flex items-center gap-1.5"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          style={dot}
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.12,
          }}
        />
      ))}
    </span>
  );
}
