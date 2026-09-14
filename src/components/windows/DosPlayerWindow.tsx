import { useState, useEffect } from 'react';
import type { ControlGuideItem } from '../../types';

interface DosPlayerWindowProps {
  bundleUrl?: string;
  title?: string;
  iconUrl?: string;
  description?: string;
  backend?: 'dosbox' | 'dosboxX';
  parts?: number;
  controls?: ControlGuideItem[];
}

export function DosPlayerWindow({
  bundleUrl = '/games/Tyrian2000.jsdos',
  title = 'Tyrian 2000',
  iconUrl = '/icons/Game Controller.webp',
  description,
  backend = 'dosbox',
  parts,
  controls,
}: DosPlayerWindowProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Precarga silenciosa en segundo plano mientras el usuario lee los controles
  useEffect(() => {
    if (!bundleUrl) return;
    const urlsToPrefetch = parts && parts > 1
      ? Array.from({ length: parts }, (_, i) => `${bundleUrl}.part${i + 1}`)
      : [bundleUrl];

    const links = urlsToPrefetch.map(url => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.as = 'fetch';
      link.href = url;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
      return link;
    });

    return () => {
      links.forEach(link => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, [bundleUrl, parts]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: '#000000',
        userSelect: 'none',
        overflow: 'hidden',
        fontFamily: 'Tahoma, sans-serif',
      }}
    >
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {!isPlaying ? (
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              backgroundColor: '#242730',
              color: '#ffffff',
              textAlign: 'center',
              boxSizing: 'border-box',
              overflowY: 'auto',
            }}
          >
            {/* Cabecera del juego */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <img
                src={iconUrl}
                alt={title}
                width={48}
                height={48}
                style={{
                  width: '48px',
                  height: '48px',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
                }}
              />
              <div style={{ textAlign: 'left' }}>
                <h2
                  style={{
                    margin: 0,
                    fontSize: '18px',
                    color: '#ffcc00',
                    textShadow: '1px 1px 2px #000',
                    fontFamily: 'monospace, Tahoma',
                  }}
                >
                  {title}
                </h2>
                <span style={{ fontSize: '11px', color: '#aaaaaa' }}>
                  {description || 'MS-DOS Arcade • Emulador Web'}
                </span>
              </div>
            </div>

            {/* Cuadro de controles */}
            <div
              style={{
                backgroundColor: '#16181f',
                border: '1px solid #3c404f',
                borderRadius: '4px',
                padding: '12px 18px',
                maxWidth: '420px',
                width: '100%',
                marginBottom: '20px',
                fontSize: '11px',
                textAlign: 'left',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.4)',
                lineHeight: '1.6',
              }}
            >
              <div style={{ color: '#55ff55', fontWeight: 'bold', marginBottom: '4px' }}>
                🎮 GUÍA DE CONTROLES:
              </div>
              {controls && controls.length > 0 ? (
                controls.map((c, i) => (
                  <div key={i}>
                    • <strong>{c.key}:</strong> {c.action}
                  </div>
                ))
              ) : (
                <>
                  <div>• <strong>Flechas:</strong> Mover / Navegar</div>
                  <div>• <strong>Espacio / Intro:</strong> Acción principal / Disparo / Salto</div>
                  <div>• <strong>Ctrl / Alt:</strong> Acciones secundarias</div>
                  <div>• <strong>P / Esc:</strong> Pausa / Menú</div>
                </>
              )}
            </div>

            {/* Botón de inicio */}
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              style={{
                padding: '10px 24px',
                fontSize: '13px',
                fontWeight: 'bold',
                cursor: 'pointer',
                backgroundColor: '#2e7d32',
                color: '#ffffff',
                border: '2px solid #1b5e20',
                borderRadius: '4px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                textShadow: '1px 1px 1px #000',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>▶</span>
              <span>INICIAR JUEGO</span>
            </button>

            <span style={{ fontSize: '10px', color: '#888888', marginTop: '10px' }}>
              El emulador y el juego se descargarán en tu navegador al hacer clic.
            </span>
          </div>
        ) : (
          <iframe
            src={`/emulator.html?bundle=${encodeURIComponent(bundleUrl)}&backend=${encodeURIComponent(backend)}${parts ? `&parts=${encodeURIComponent(parts)}` : ''}`}
            title={title}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
              backgroundColor: '#000000',
            }}
            allow="autoplay; fullscreen"
          />
        )}
      </div>
    </div>
  );
}
