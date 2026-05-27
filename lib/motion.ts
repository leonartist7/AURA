import type { Variants, Transition } from 'framer-motion';

/**
 * Shared motion language for the whole app.
 * - Springs feel intentional, never mechanical
 * - Stagger children by 100ms (spec)
 * - Page transitions = slide + fade, "magazine page turn"
 */

export const spring: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 30,
  mass: 0.9,
};

export const softSpring: Transition = {
  type: 'spring',
  stiffness: 180,
  damping: 26,
  mass: 1,
};

export const pageSlide: Variants = {
  initial: { x: 28, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: spring },
  exit:    { x: -28, opacity: 0, transition: { duration: 0.22, ease: [0.33, 1, 0.68, 1] } },
};

export const fadeUp: Variants = {
  initial: { y: 14, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: spring },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  initial: { y: 18, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: spring },
};

export const tapScale = {
  whileTap: { scale: 0.96 },
  transition: { type: 'spring' as const, stiffness: 400, damping: 22 },
};
