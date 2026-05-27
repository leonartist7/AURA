'use client';

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import { useEffect } from 'react';

interface CountUpNumberProps {
  to: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
}

/**
 * Counts a number up from 0 with eased motion. Honours prefers-reduced-motion
 * by snapping to the final value (no animation).
 */
export function CountUpNumber({
  to,
  duration = 1.2,
  format = (n) => Math.round(n).toLocaleString('en-CA'),
  className = '',
}: CountUpNumberProps) {
  const reduced = useReducedMotion();
  const mv = useMotionValue(reduced ? to : 0);
  const display = useTransform(mv, (v) => format(v));

  useEffect(() => {
    if (reduced) {
      mv.set(to);
      return;
    }
    const controls = animate(mv, to, {
      duration,
      ease: [0.22, 1, 0.36, 1], // easeOutQuart-ish
    });
    return () => controls.stop();
  }, [to, duration, reduced, mv]);

  return <motion.span className={`tabular ${className}`}>{display}</motion.span>;
}
