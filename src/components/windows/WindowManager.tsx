// src/components/windows/WindowManager.tsx
import { Window } from '../ui/Window';
import type { WindowItem } from '../../types';
import { AboutWindow } from './AboutWindow';
import { HemobrutalWindow } from './HemobrutalWindow';
import { ServerWindow } from './ServerWindow';
import { CreditsWindow } from './CreditsWindow';
import { useState } from 'react';
import { MyPageWindow } from './MyPageWindow';
import { EmptyProgramWindow } from './EmptyProgramWindow';
import { DosPlayerWindow } from './DosPlayerWindow';
import { START_MENU_PROGRAMS } from '../../types';

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

      {windows['mypage'] && (
        <Window
          title={windows['mypage'].title}
          iconUrl={windows['mypage'].iconUrl}
          isOpen={windows['mypage'].isOpen}
          isMinimized={windows['mypage'].isMinimized}
          onClose={() => onClose('mypage')}
          onMinimize={() => onMinimize('mypage')}
          zIndex={windowZIndexes['mypage'] || 10}
          onFocus={() => bringToFront('mypage')}
          defaultWidth={730}
          defaultHeight={500}
        >
          <MyPageWindow />
        </Window>
      )}

      {windows['credits'] && (
        <Window
          title={windows['credits'].title}
          iconUrl={windows['credits'].iconUrl}
          isOpen={windows['credits'].isOpen}
          isMinimized={windows['credits'].isMinimized}
          onClose={() => onClose('credits')}
          onMinimize={() => onMinimize('credits')}
          zIndex={windowZIndexes['credits'] || 10}
          onFocus={() => bringToFront('credits')}
          defaultWidth={420}
          defaultHeight={280}
        >
          <CreditsWindow />
        </Window>
      )}

      {/* Ventanas de programas del Menú de Inicio */}
      {START_MENU_PROGRAMS.map((prog) => {
        const win = windows[prog.id];
        if (!win) return null;
        return (
          <Window
            key={prog.id}
            title={win.title}
            iconUrl={win.iconUrl}
            isOpen={win.isOpen}
            isMinimized={win.isMinimized}
            onClose={() => onClose(prog.id)}
            onMinimize={() => onMinimize(prog.id)}
            zIndex={windowZIndexes[prog.id] || 10}
            onFocus={() => bringToFront(prog.id)}
            defaultWidth={prog.defaultWidth || 500}
            defaultHeight={prog.defaultHeight || 380}
          >
            {prog.gameUrl ? (
              <DosPlayerWindow
                bundleUrl={prog.gameUrl}
                title={win.title}
                iconUrl={win.iconUrl}
                description={prog.description}
                backend={prog.backend}
                controls={prog.controls}
              />
            ) : (
              <EmptyProgramWindow
                programId={prog.id}
                title={win.title}
                iconUrl={win.iconUrl}
                onClose={() => onClose(prog.id)}
              />
            )}
          </Window>
        );
      })}
    </>
  );
}