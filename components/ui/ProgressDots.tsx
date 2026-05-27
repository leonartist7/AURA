'use client';

interface ProgressDotsProps {
  total: number;
  current: number; // 1-indexed
}

/**
 * Eight tiny dots that show the owner there's an end in sight.
 * Past = filled muted, current = gold, future = ring.
 */
export function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div
      className="flex items-center justify-center gap-1.5"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-label={`Step ${current} of ${total}`}
    >
      {Array.from({ length: total }, (_, i) => {
        const n = i + 1;
        const isCurrent = n === current;
        const isPast = n < current;
        return (
          <span
            key={n}
            className={[
              'h-1.5 rounded-full transition-all duration-300',
              isCurrent
                ? 'w-6 bg-aura-gold'
                : isPast
                ? 'w-1.5 bg-aura-espresso/40'
                : 'w-1.5 bg-aura-line',
            ].join(' ')}
          />
        );
      })}
    </div>
  );
}
