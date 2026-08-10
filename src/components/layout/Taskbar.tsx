// src/components/layout/Taskbar.tsx
import { useState } from 'react';
import { SystemClock } from '../ui/SystemClock';
import { VolumeControl } from '../ui/VolumeControl';
import type { WindowItem } from '../../types';
import "xp.css/dist/XP.css";

interface TaskbarProps {
  windows?: WindowItem[];
  onToggleWindow?: (id: string) => void;
  onOpenCredits?: () => void;
  volume?: number;
  onVolumeChange?: (val: number) => void;
}

export function Taskbar({
  windows = [],
  onToggleWindow,
  onOpenCredits,
}: TaskbarProps) {
  const [isStartOpen, setIsStartOpen] = useState(false);

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
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', height: '100%', flex: 1, overflow: 'hidden' }}>
        {/* Botón Inicio */}
        <button
          onClick={() => setIsStartOpen(!isStartOpen)}
          style={{
            height: '100%',
            padding: '0 12px 0 8px',
            border: 'none',
            borderRadius: '0 8px 8px 0',
            background: isStartOpen
              ? 'linear-gradient(to bottom, #1e541e 0%, #2b702b 100%)'
              : 'linear-gradient(to bottom, #388e3c 0%, #2e7d32 100%)',
            color: 'white',
            fontWeight: 'bold',
            fontStyle: 'italic',
            fontSize: '14px',
            textShadow: '1px 1px 1px #000',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: isStartOpen ? 'inset 1px 1px 2px #000' : 'inset 0 1px 1px rgba(255,255,255,0.4)',
          }}
        >
          <span style={{ fontSize: '15px', fontStyle: 'normal' }}>💻</span>
          inicio
        </button>

        {/* Pestañas de Ventanas abiertas */}
        <div style={{ display: 'flex', gap: '2px', marginLeft: '6px', overflowX: 'auto', flex: 1, height: '100%', alignItems: 'center' }}>
          {windows.map((win) => {
            if (!win.isOpen) return null;
            const isHold = win.isFocused && !win.isMinimized;

            return (
              <button
                key={win.id}
                onClick={() => onToggleWindow && onToggleWindow(win.id)}
                style={{
                  height: '24px',
                  maxWidth: '160px',
                  minWidth: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0 8px',
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
                }}
              >
                <img src={win.iconUrl} alt="" style={{ width: '14px', height: '14px' }} />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{win.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* System Tray (Iconos + Reloj) */}
      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'linear-gradient(to bottom, #0f80d6 0%, #0b62ba 50%, #0950a3 100%)',
          borderLeft: '1px solid #094080',
          boxShadow: 'inset 1px 0 2px rgba(0,0,0,0.2)',
          padding: '0 8px',
        }}
      >
        {/* Control de Volumen */}
        <VolumeControl />

        {/* Icono de Créditos / Agradecimientos */}
        <button
          onClick={onOpenCredits}
          title="Agradecimientos"
          style={{
            background: 'transparent',
            border: 'none',
            padding: '2px 4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: '13px' }}>📜</span>
        </button>

        {/* Reloj */}
        <SystemClock />
      </div>
    </footer>
  );
}