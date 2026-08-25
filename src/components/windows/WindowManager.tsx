// src/components/windows/WindowManager.tsx
import { Window } from '../ui/Window';
import type { WindowItem } from '../../types';
import { AboutWindow } from './AboutWindow';
import { HemobrutalWindow } from './HemobrutalWindow';
import { CreditsWindow } from './CreditsWindow';

interface WindowManagerProps {
  windows: Record<string, WindowItem>;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
}

export function WindowManager({ windows, onClose, onMinimize }: WindowManagerProps) {
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
          defaultWidth={600}
          defaultHeight={400}
        >
          <HemobrutalWindow />
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