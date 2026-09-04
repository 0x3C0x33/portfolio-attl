// src/hooks/useBootSequence.tsx
import { useState, useEffect, useCallback } from 'react';

export type BootState = 'off' | 'booting' | 'fading' | 'ready';

export function useBootSequence(bootDurationMs = 3000) {
  const [bootState, setBootState] = useState<BootState>('off');

  const turnOn = useCallback(() => {
    setBootState('booting');
  }, []);

  const turnOff = useCallback(() => {
    setBootState('off');
  }, []);

  useEffect(() => {
    if (bootState !== 'booting') return;

    // 1. Pasar de booting a fading tras el tiempo indicado (3s)
    const bootTimer = setTimeout(() => {
      setBootState('fading');
      const audio = new Audio('/sounds/boot.mp3');
      audio.play().catch(() => {
        // Fallback silencioso
      });

      // 2. Pasar a ready tras completar la animación de fade (1s)
      const fadeTimer = setTimeout(() => {
        setBootState('ready');
      }, 1000);

      return () => clearTimeout(fadeTimer);
    }, bootDurationMs);

    return () => clearTimeout(bootTimer);
  }, [bootState, bootDurationMs]);

  return { bootState, turnOn, turnOff };
}