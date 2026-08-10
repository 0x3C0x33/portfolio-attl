// src/hooks/useWindowManager.ts
import { useState } from 'react';
import type { WindowItem } from '../types';

export function useWindowManager(initialWindows: Record<string, WindowItem>) {
  const [windows, setWindows] = useState<Record<string, WindowItem>>(initialWindows);

  const openWindow = (id: string) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: {
          ...prev[id],
          isOpen: true,
          isMinimized: false,
          isFocused: true,
        },
      };
    });
  };

  const toggleWindow = (id: string) => {
    setWindows((prev) => {
      const win = prev[id];
      if (!win) return prev;

      if (win.isMinimized) {
        return { ...prev, [id]: { ...win, isMinimized: false, isFocused: true } };
      }
      if (win.isFocused) {
        return { ...prev, [id]: { ...win, isMinimized: true, isFocused: false } };
      }
      return { ...prev, [id]: { ...win, isFocused: true } };
    });
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: { ...prev[id], isOpen: false, isFocused: false },
      };
    });
  };

  const minimizeWindow = (id: string) => {
    setWindows((prev) => {
      if (!prev[id]) return prev;
      return {
        ...prev,
        [id]: { ...prev[id], isMinimized: true, isFocused: false },
      };
    });
  };

  return {
    windows,
    windowList: Object.values(windows),
    openWindow,
    toggleWindow,
    closeWindow,
    minimizeWindow,
  };
}