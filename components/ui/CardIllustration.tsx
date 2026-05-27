'use client';

interface CardIllustrationProps {
  slot: string;
  className?: string;
}

/**
 * MEDIA SLOT: drop a small editorial illustration per prescription card
 * (e.g. ChatGPT/Recraft 1:1 600x600 PNG) at /media/cards/{slot}.png.
 *
 * When empty, renders a tasteful warm gradient block so the layout still
 * looks intentional.
 */
export function CardIllustration({ slot, className = '' }: CardIllustrationProps) {
  return (
    <div
      className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl ${className}`}
      aria-hidden="true"
      style={{
        background:
          'radial-gradient(circle at 30% 30%, rgba(232,155,108,0.55), transparent 60%),' +
          'radial-gradient(circle at 70% 70%, rgba(201,169,97,0.45), transparent 60%),' +
          'linear-gradient(135deg, #FBEFE2 0%, #F1E8F0 100%)',
      }}
      data-slot={slot}
    />
  );
}
