'use client';

import { useId, type ReactNode } from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (next: number) => void;
  /** Live-rendered label below the slider, e.g. "230 customers / day". */
  display: ReactNode;
  /** Optional sub-copy reacting to the value, e.g. "Most cafés are here." */
  reactiveCopy?: ReactNode;
  hideLabel?: boolean;
}

/**
 * Big, friendly slider with a live readout. The thumb is gold (see globals.css)
 * so it reads as a deliberate brand element, not a default control.
 */
export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  display,
  reactiveCopy,
  hideLabel,
}: SliderProps) {
  const id = useId();
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className={
          hideLabel
            ? 'sr-only'
            : 'mb-3 block text-xs font-medium uppercase tracking-[0.12em] text-aura-mute'
        }
      >
        {label}
      </label>
      <div className="mb-3 flex items-baseline justify-between">
        <span className="font-display text-3xl tabular text-aura-espresso">
          {display}
        </span>
      </div>
      <input
        id={id}
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
      {reactiveCopy && (
        <p className="mt-4 text-sm leading-relaxed text-aura-mute">
          {reactiveCopy}
        </p>
      )}
    </div>
  );
}
