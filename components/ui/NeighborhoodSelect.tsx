'use client';

import { useId, useState } from 'react';
import { CALGARY_NEIGHBORHOODS } from '@/lib/calgaryNeighborhoods';
import { TextInput } from './TextInput';

interface NeighborhoodSelectProps {
  value: string | undefined;
  onChange: (next: string) => void;
}

const OTHER = '__other__';

export function NeighborhoodSelect({ value, onChange }: NeighborhoodSelectProps) {
  const id = useId();
  const isCustom =
    value != null &&
    value.length > 0 &&
    !CALGARY_NEIGHBORHOODS.includes(value as (typeof CALGARY_NEIGHBORHOODS)[number]);
  const [showCustom, setShowCustom] = useState(isCustom);

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-medium uppercase tracking-[0.12em] text-aura-mute"
      >
        Neighbourhood
      </label>
      <div className="relative">
        <select
          id={id}
          value={showCustom ? OTHER : value ?? ''}
          onChange={(e) => {
            if (e.target.value === OTHER) {
              setShowCustom(true);
              onChange('');
            } else {
              setShowCustom(false);
              onChange(e.target.value);
            }
          }}
          className="w-full cursor-pointer appearance-none rounded-btn bg-white/70 px-4 py-3.5 pr-10 text-base text-aura-espresso shadow-aura-inset focus:outline-none"
        >
          <option value="" disabled>
            Pick one…
          </option>
          {CALGARY_NEIGHBORHOODS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
          <option value={OTHER}>Other / not listed</option>
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-aura-mute"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      {showCustom && (
        <div className="mt-3">
          <TextInput
            label="Tell me which one"
            hideLabel
            placeholder="Which neighbourhood?"
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            autoFocus
          />
        </div>
      )}
    </div>
  );
}
