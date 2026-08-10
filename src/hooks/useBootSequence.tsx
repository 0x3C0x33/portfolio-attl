// src/hooks/useBootSequence.ts
import { useState, useEffect } from 'react';

export type BootState = 'booting' | 'fading' | 'ready';

export function useBootSequence(bootDurationMs = 3000) {
  const [bootState, setBootState] = useState<BootState>('booting');

  useEffect(() => {
    // 1. Pasar de booting a fading tras el tiempo indicado (3s)
    const bootTimer = setTimeout(() => {
      setBootState('fading');
      const audio = new Audio('/sounds/boot.mp3');
      audio.play().catch(() => {
        // Autoplay bloqueado por el navegador si el usuario no ha interactuado
      });

      // 2. Pasar a ready tras completar la animación de fade (1s)
      const fadeTimer = setTimeout(() => {
        setBootState('ready');
      }, 1000);

      return () => clearTimeout(fadeTimer);
    }, bootDurationMs);

    return () => clearTimeout(bootTimer);
  }, [bootDurationMs]);

  return bootState;
}