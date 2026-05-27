'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Checkmark } from './Checkmark';

interface ChoiceCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  selected: boolean;
  onSelect: () => void;
  /** Pulsing red dot — used for "no system" answers on Q6. */
  worry?: boolean;
}

export function ChoiceCard({
  title,
  description,
  icon,
  selected,
  onSelect,
  worry,
}: ChoiceCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      aria-pressed={selected}
      className={[
        'relative w-full cursor-pointer rounded-card bg-white/70 p-4 text-left',
        'shadow-aura transition-all duration-200',
        'hover:bg-white hover:shadow-aura-lg',
        selected
          ? 'ring-2 ring-aura-gold bg-white'
          : 'ring-1 ring-transparent',
      ].join(' ')}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <span className="mt-0.5 text-aura-gold" aria-hidden="true">
            {icon}
          </span>
        )}
        <div className="flex-1">
          <p className="text-base font-medium text-aura-espresso">{title}</p>
          {description && (
            <p className="mt-1 text-sm text-aura-mute">{description}</p>
          )}
        </div>
        {selected && (
          <span className="text-aura-forest" aria-hidden="true">
            <Checkmark size={18} />
          </span>
        )}
      </div>

      {worry && selected && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-3 inline-block h-2.5 w-2.5 rounded-full bg-aura-coral animate-pulse-dot"
        />
      )}
    </motion.button>
  );
}
