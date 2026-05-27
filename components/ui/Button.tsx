'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { LoadingDots } from './LoadingDots';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-btn font-medium ' +
  'min-h-[52px] px-7 text-base tracking-tight transition-colors duration-200 ' +
  'disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer select-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-aura-espresso text-aura-cream hover:bg-[#3a2a23] shadow-aura-lg',
  secondary:
    'bg-aura-gold text-aura-espresso hover:bg-[#bb9a52] shadow-aura',
  ghost:
    'bg-transparent text-aura-espresso hover:bg-aura-line/60',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = 'primary', loading, fullWidth, className = '', children, disabled, ...rest },
    ref,
  ) {
    const cls = [
      base,
      variants[variant],
      fullWidth ? 'w-full' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        className={cls}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        {...(rest as Record<string, unknown>)}
      >
        {loading ? <LoadingDots /> : children}
      </motion.button>
    );
  },
);
