// src/components/windows/WindowManager.tsx
import { Window } from '../ui/Window';
import type { WindowItem } from '../../types';
import { AboutWindow } from './AboutWindow';
import { HemobrutalWindow } from './HemobrutalWindow';
import { ServerWindow } from './ServerWindow';
import { CreditsWindow } from './CreditsWindow';
import { useState } from 'react';

interface WindowManagerProps {
  windows: Record<string, WindowItem>;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
}

export function WindowManager({ windows, onClose, onMinimize }: WindowManagerProps) {
  const [activeZIndex, setActiveZIndex] = useState(10);
  const [windowZIndexes, setWindowZIndexes] = useState<{ [key: string]: number }>({});

  const bringToFront = (id: string) => {
    const nextZ = activeZIndex + 1;
    setActiveZIndex(nextZ);
    setWindowZIndexes((prev) => ({ ...prev, [id]: nextZ }));
  };
  
  return (
    <>
      {windows['about'] && (
        <Window
          title={windows['about'].title}
          iconUrl={windows['about'].iconUrl}
          isOpen={windows['about'].isOpen}
          isMinimized={windows['about'].isMinimized}
          onClose={() => onClose('about')}
          onMinimize={() => onMinimize('about')}
          zIndex={windowZIndexes['about'] || 10}
          onFocus={() => bringToFront('about')}
        >
          <AboutWindow onClose={() => onClose('about')}/>
        </Window>
      )}

      {windows['hemobrutal'] && (
        <Window
          title={windows['hemobrutal'].title}
          iconUrl={windows['hemobrutal'].iconUrl}
          isOpen={windows['hemobrutal'].isOpen}
          isMinimized={windows['hemobrutal'].isMinimized}
          onClose={() => onClose('hemobrutal')}
          onMinimize={() => onMinimize('hemobrutal')}
          zIndex={windowZIndexes['hemobrutal'] || 10}
          onFocus={() => bringToFront('hemobrutal')}
          defaultWidth={600}
          defaultHeight={400}
        >
          <HemobrutalWindow />
        </Window>
      )}

      {windows['server'] && (
        <Window
          title={windows['server'].title}
          iconUrl={windows['server'].iconUrl}
          isOpen={windows['server'].isOpen}
          isMinimized={windows['server'].isMinimized}
          onClose={() => onClose('server')}
          onMinimize={() => onMinimize('server')}
          zIndex={windowZIndexes['server'] || 10}
          onFocus={() => bringToFront('server')}
        >
          <ServerWindow />
        </Window>
      )}

      <Window
        title={windows['credits'].title}
        iconUrl={windows['credits'].iconUrl}
        isOpen={windows['credits'].isOpen}
        isMinimized={windows['credits'].isMinimized}
        onClose={() => onClose('credits')}
        onMinimize={() => onMinimize('credits')}
        defaultWidth={420}
        defaultHeight={280}
      >
        <CreditsWindow />
      </Window>
    </>
  );
}