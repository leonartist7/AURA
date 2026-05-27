'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { VideoBackground } from '@/components/ui/VideoBackground';
import { fadeUp, staggerContainer, staggerItem } from '@/lib/motion';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="relative flex min-h-dvh flex-col px-6 pt-10 pb-10">
      {/* MEDIA SLOT: hero loop video — see VideoBackground for spec */}
      <VideoBackground src="/media/hero-loop.mp4" />

      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="font-display text-3xl lowercase tracking-tight text-aura-espresso"
      >
        aura
      </motion.p>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="mx-auto mt-auto flex w-full max-w-screen flex-col items-start gap-7"
      >
        <motion.h1
          variants={staggerItem}
          className="font-display text-[2.6rem] leading-[1.05] tracking-tight text-aura-espresso"
        >
          Let’s see how your café is really doing.
        </motion.h1>

        <motion.p
          variants={staggerItem}
          className="text-base leading-relaxed text-aura-mute"
        >
          5 minutes. 12 questions. A real score backed by real data.
        </motion.p>

        <motion.div variants={fadeUp} className="w-full">
          <Button fullWidth onClick={onStart}>
            Start my diagnostic
            <span aria-hidden="true">→</span>
          </Button>
          <p className="mt-3 text-center text-xs text-aura-mute">
            Free · No signup yet · Takes 5 min
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
