'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { DiagnosticAnswers, ScreenIndex } from '@/lib/types';
import { useDiagnosticStorage } from '@/lib/storage';
import { pageSlide } from '@/lib/motion';

import { WelcomeScreen } from './screens/WelcomeScreen';
import { BasicsScreen } from './screens/BasicsScreen';
import { RetentionScreen } from './screens/RetentionScreen';
import { LeakScreen } from './screens/LeakScreen';
import { MarketingScreen } from './screens/MarketingScreen';
import { PresenceScreen } from './screens/PresenceScreen';
import { ScoreScreen } from './screens/ScoreScreen';
import { PrescriptionScreen } from './screens/PrescriptionScreen';
import { ThankYouScreen } from './screens/ThankYouScreen';
import { BlockerScreen } from './screens/BlockerScreen';

const TOTAL_SCREENS = 8;
const MIN_VIEWPORT = 375;

/**
 * Central orchestrator. Owns:
 *   - screen index (1..9)
 *   - answers (persisted to localStorage via useDiagnosticStorage)
 *   - viewport blocker check
 *   - browser back-button handling
 */
export function DiagnosticFlow() {
  const { answers, setAnswers, hydratedScreen, saveScreen, clear, hydrated } =
    useDiagnosticStorage();
  const [screen, setScreen] = useState<ScreenIndex>(1);
  const [tooNarrow, setTooNarrow] = useState(false);
  const hasRestored = useRef(false);

  // Viewport size guard
  useEffect(() => {
    const check = () => setTooNarrow(window.innerWidth < MIN_VIEWPORT);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Restore from storage exactly once after hydration
  useEffect(() => {
    if (!hydrated || hasRestored.current) return;
    hasRestored.current = true;
    if (hydratedScreen && hydratedScreen > 1 && hydratedScreen <= 9) {
      setScreen(hydratedScreen);
    }
  }, [hydrated, hydratedScreen]);

  // Browser-back support — gracefully step backwards through the flow
  useEffect(() => {
    const onPop = () => {
      setScreen((s) => (s > 1 ? ((s - 1) as ScreenIndex) : 1));
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Push a history entry every screen change so popstate has something to pop
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.history.pushState({ screen }, '');
    saveScreen(screen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen]);

  const update = useCallback(
    (patch: Partial<DiagnosticAnswers>) => {
      setAnswers((prev) => ({ ...prev, ...patch }));
    },
    [setAnswers],
  );

  const goTo = (s: ScreenIndex) => setScreen(s);

  if (tooNarrow) return <BlockerScreen />;

  return (
    <main className="relative mx-auto min-h-dvh w-full max-w-screen">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={screen}
          variants={pageSlide}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative"
        >
          {screen === 1 && <WelcomeScreen onStart={() => goTo(2)} />}
          {screen === 2 && (
            <BasicsScreen
              answers={answers}
              update={update}
              onNext={() => goTo(3)}
            />
          )}
          {screen === 3 && (
            <RetentionScreen
              answers={answers}
              update={update}
              onNext={() => goTo(4)}
            />
          )}
          {screen === 4 && <LeakScreen answers={answers} onNext={() => goTo(5)} />}
          {screen === 5 && (
            <MarketingScreen
              answers={answers}
              update={update}
              onNext={() => goTo(6)}
            />
          )}
          {screen === 6 && (
            <PresenceScreen
              answers={answers}
              update={update}
              onNext={() => goTo(7)}
            />
          )}
          {screen === 7 && <ScoreScreen answers={answers} onNext={() => goTo(8)} />}
          {screen === 8 && (
            <PrescriptionScreen
              answers={answers}
              update={update}
              onSubmitted={() => {
                clear();
                goTo(9);
              }}
            />
          )}
          {screen === 9 && <ThankYouScreen />}
        </motion.div>
      </AnimatePresence>
      <span className="sr-only">
        Screen {screen} of {TOTAL_SCREENS + 1}
      </span>
    </main>
  );
}
