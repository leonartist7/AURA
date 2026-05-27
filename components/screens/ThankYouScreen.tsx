'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';

/** Calm confetti + thank-you. Fired right after a successful submit. */
export function ThankYouScreen() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    (async () => {
      const confetti = (await import('canvas-confetti')).default;
      if (cancelled) return;
      const colors = ['#C9A961', '#E89B6C', '#A8B5A0', '#5C7C50'];
      const fire = (origin: { x: number; y: number }) =>
        confetti({
          particleCount: 60,
          spread: 70,
          startVelocity: 45,
          gravity: 0.9,
          ticks: 240,
          origin,
          colors,
          scalar: 0.9,
        });
      fire({ x: 0.2, y: 0.4 });
      setTimeout(() => fire({ x: 0.8, y: 0.4 }), 220);
      setTimeout(() => fire({ x: 0.5, y: 0.3 }), 440);
    })();
    return () => {
      cancelled = true;
    };
  }, [reduced]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="font-display text-3xl lowercase tracking-tight text-aura-espresso"
      >
        aura
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 220, damping: 28 }}
        className="mt-8 max-w-xs font-display text-4xl leading-tight text-aura-espresso"
      >
        Report on its way.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="mt-4 max-w-xs text-base text-aura-mute"
      >
        We’ll be in touch within 24 hours.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-12 font-display text-lg italic text-aura-espresso/80"
      >
        — Leon
      </motion.p>
    </div>
  );
}
