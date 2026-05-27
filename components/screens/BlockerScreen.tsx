'use client';

/** Shown when viewport < 375px — diagnostic is mobile/tablet only. */
export function BlockerScreen() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-4xl text-aura-espresso">aura</p>
      <p className="mt-6 max-w-xs text-base text-aura-mute">
        Best viewed on a phone or tablet. Pop this open on your device and we’ll
        get started.
      </p>
    </div>
  );
}
