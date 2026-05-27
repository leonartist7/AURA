'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { DiagnosticAnswers, ScreenIndex } from './types';

const STORAGE_KEY = 'aura-diagnostic-v1';

interface PersistedState {
  answers: DiagnosticAnswers;
  screen: ScreenIndex;
  updatedAt: number;
}

interface UseDiagnosticStorageResult {
  answers: DiagnosticAnswers;
  setAnswers: (updater: (prev: DiagnosticAnswers) => DiagnosticAnswers) => void;
  hydratedScreen: ScreenIndex | null;
  saveScreen: (screen: ScreenIndex) => void;
  clear: () => void;
  hydrated: boolean;
}

/**
 * Persists the in-progress diagnostic to localStorage so an owner doesn't lose
 * their place when the screen locks mid-conversation. Writes are debounced
 * so we don't thrash localStorage on every keystroke.
 */
export function useDiagnosticStorage(): UseDiagnosticStorageResult {
  const [answers, setAnswersState] = useState<DiagnosticAnswers>({});
  const [hydratedScreen, setHydratedScreen] = useState<ScreenIndex | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const writeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScreen = useRef<ScreenIndex>(1);

  // Read once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PersistedState;
        if (parsed && typeof parsed === 'object' && parsed.answers) {
          setAnswersState(parsed.answers);
          if (parsed.screen) {
            setHydratedScreen(parsed.screen);
            lastScreen.current = parsed.screen;
          }
        }
      }
    } catch {
      // localStorage corrupt or unavailable — fall back to memory-only state.
    }
    setHydrated(true);
  }, []);

  const persist = useCallback((next: DiagnosticAnswers, screen: ScreenIndex) => {
    if (writeTimer.current) clearTimeout(writeTimer.current);
    writeTimer.current = setTimeout(() => {
      try {
        const payload: PersistedState = {
          answers: next,
          screen,
          updatedAt: Date.now(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch {
        // ignore quota / privacy errors
      }
    }, 200);
  }, []);

  const setAnswers = useCallback<UseDiagnosticStorageResult['setAnswers']>(
    (updater) => {
      setAnswersState((prev) => {
        const next = updater(prev);
        persist(next, lastScreen.current);
        return next;
      });
    },
    [persist],
  );

  const saveScreen = useCallback(
    (screen: ScreenIndex) => {
      lastScreen.current = screen;
      // Persist immediately on screen change for accurate restore.
      try {
        const payload: PersistedState = {
          answers,
          screen,
          updatedAt: Date.now(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch {
        // ignore
      }
    },
    [answers],
  );

  const clear = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setAnswersState({});
    setHydratedScreen(null);
    lastScreen.current = 1;
  }, []);

  return { answers, setAnswers, hydratedScreen, saveScreen, clear, hydrated };
}
