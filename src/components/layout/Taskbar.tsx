// src/components/layout/Taskbar.tsx

import { SystemClock } from '../ui/SystemClock';
import { VolumeControl } from '../ui/VolumeControl';
import type { WindowItem } from '../../types';
import { WallpaperSelector } from '../ui/WallpaperSelector';
import { StartMenu } from "./StartMenu";

interface TaskbarProps {
  windows?: WindowItem[];
  onToggleWindow?: (id: string) => void;
  onOpenCredits?: () => void;
  volume?: number;
  onVolumeChange?: (val: number) => void;
  currentWallpaper: string;
  onSelectWallpaper: (url: string) => void;
}

export function Taskbar({
  windows = [],
  onToggleWindow,
  onOpenCredits,
  currentWallpaper,
  onSelectWallpaper,
}: TaskbarProps) {
  return (
    <footer
      style={{
        height: '30px',
        width: '100vw',
        position: 'fixed',
        bottom: 0,
        left: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(to bottom, #1f2f86 0%, #3168d8 3%, #1e52c8 9%, #1542b3 18%, #1037a4 35%, #1134a0 50%, #0b2e99 70%, #0d257a 100%)',
        borderTop: '1px solid #002266',
        userSelect: 'none',
        boxSizing: 'border-box',
        overflow: 'visible',
      }}
    >
      {/* 1. Botón Inicio y Menú Desplegable (Con overflow visible garantizado) */}
      <div style={{ flexShrink: 0, height: '100%', position: 'relative', overflow: 'visible', zIndex: 100000 }}>
        <StartMenu
          onLogOff={() => {}}
          onTurnOff={() => {}}
        />
      </div>

      {/* 2. Pestañas de Ventanas abiertas con scroll horizontal responsivo */}
      <div
        style={{
          display: 'flex',
          gap: '2px',
          marginLeft: '4px',
          paddingRight: '4px',
          overflowX: 'auto',
          flex: 1,
          minWidth: 0,
          height: '100%',
          alignItems: 'center',
          scrollbarWidth: 'none',
        }}
      >
        {windows.map((win) => {
          if (!win.isOpen) return null;
          const isHold = win.isFocused && !win.isMinimized;

          return (
            <button
              key={win.id}
              onClick={() => onToggleWindow && onToggleWindow(win.id)}
              title={win.title}
              style={{
                height: '24px',
                maxWidth: '160px',
                minWidth: '32px',
                flex: '1 1 auto',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '0 6px',
                fontSize: '11px',
                color: 'white',
                border: '1px solid #0a246a',
                borderRadius: '2px',
                background: isHold
                  ? 'linear-gradient(to bottom, #122f7a 0%, #1941a5 100%)'
                  : 'linear-gradient(to bottom, #3c82f0 0%, #2264e1 100%)',
                boxShadow: isHold
                  ? 'inset 1px 1px 2px rgba(0,0,0,0.6)'
                  : 'inset 0 1px 0 rgba(255,255,255,0.3)',
                cursor: 'pointer',
                textAlign: 'left',
                overflow: 'hidden',
                touchAction: 'manipulation',
              }}
            >
              <img src={win.iconUrl} alt="" style={{ width: '14px', height: '14px', flexShrink: 0 }} />
              <span
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  minWidth: 0,
                  display: 'inline-block',
                }}
              >
                {win.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. System Tray (Iconos + Reloj) - Con flexShrink: 0 garantizado */}
      <div
        style={{
          height: '100%',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'linear-gradient(to bottom, #0f80d6 0%, #0b62ba 50%, #0950a3 100%)',
          borderLeft: '1px solid #094080',
          boxShadow: 'inset 1px 0 2px rgba(0,0,0,0.2)',
          padding: '0 6px',
          overflow: 'visible',
          position: 'relative',
        }}
      >
        {/* Control de Volumen */}
        <VolumeControl />

        {/* Selector de Fondo de Pantalla */}
        <WallpaperSelector
          currentWallpaper={currentWallpaper}
          onSelectWallpaper={onSelectWallpaper}
        />

        {/* Icono de Créditos */}
        <button
          onClick={onOpenCredits}
          title="Créditos"
          style={{
            background: 'transparent',
            border: 'none',
            padding: '1px 3px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '0px',
            touchAction: 'manipulation',
          }}
        >
          <span style={{ fontSize: '13px' }}>📜</span>
        </button>

        {/* Reloj del Sistema */}
        <SystemClock />
      </div>
    </footer>
  );
}