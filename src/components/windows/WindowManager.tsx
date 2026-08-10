// src/components/windows/WindowManager.tsx
import { Window } from '../ui/Window';
import type { WindowItem } from '../../types';
import { AboutWindow } from './AboutWindow';
import { Hemobrutal } from './Hemobrutal';

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
          <AboutWindow />
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
        >
          <Hemobrutal />
        </Window>
      )}
    </>
  );
}