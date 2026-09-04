// src/components/layout/PowerScreen.tsx
import { useState, useCallback } from 'react';

interface PowerScreenProps {
  onTurnOn: () => void;
}

export function PowerScreen({ onTurnOn }: PowerScreenProps) {
  const [isPowering, setIsPowering] = useState(false);
  const [turboActive, setTurboActive] = useState(true);
  const [hddBlink, setHddBlink] = useState(false);

  const handleTurnOn = useCallback(() => {
    if (isPowering) return;
    setIsPowering(true);
    setHddBlink(true);

    // Reproducir el sonido del encendido del PC al pulsar el botón
    try {
      const audio = new Audio('/sounds/computerstartup.mp3');
      audio.play().catch(() => {
        // Fallback silencioso
      });
    } catch {
      // Audio no disponible
    }

    // Parpadeo realista del LED de HDD mientras arranca la torre
    const hddInterval = setInterval(() => {
      setHddBlink((prev) => !prev);
    }, 220);

    // 3 segundos (3000ms) de delay completo antes de pasar al boot sequence
    setTimeout(() => {
      clearInterval(hddInterval);
      onTurnOn();
    }, 3000);
  }, [isPowering, onTurnOn]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        backgroundColor: '#111215',
        backgroundImage: 'radial-gradient(circle at 50% 45%, #232730 0%, #0d0e11 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        pointerEvents: isPowering ? 'none' : 'auto',
        padding: '12px',
        boxSizing: 'border-box',
        overflowY: 'auto',
      }}
    >
      {/* Caja de la Torre PC Retro (Escalada un 50% más grande: width min(510px, 92vw)) */}
      <div
        style={{
          width: 'min(510px, 92vw)',
          backgroundColor: '#d8ceb2',
          backgroundImage: 'linear-gradient(to bottom, #e3dac0 0%, #d5caa9 100%)',
          borderRadius: '6px',
          borderTop: '4px solid #ede5cc',
          borderLeft: '4px solid #ede5cc',
          borderRight: '4px solid #aba084',
          borderBottom: '5px solid #8e856c',
          boxShadow: '0 25px 60px rgba(0,0,0,0.85), inset 1px 1px 0 rgba(255,255,255,0.7)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          fontFamily: "'MS Sans Serif', Tahoma, sans-serif",
          margin: 'auto',
        }}
      >
        {/* Cabecera superior con hendidura plástica */}
        <div
          style={{
            height: '20px',
            backgroundColor: '#cfc4a6',
            borderBottom: '2px solid #b8ac8c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: '16px',
          }}
        >
          {/* 4 ranuras decorativas superiores como en la foto */}
          <div style={{ display: 'flex', gap: '4px', backgroundColor: '#8a9bb0', padding: '3px 6px', borderRadius: '3px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#69788a' }} />
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#69788a' }} />
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#69788a' }} />
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#69788a' }} />
          </div>
        </div>

        {/* Bahía 1: Lector CD-ROM 52x */}
        <div
          style={{
            margin: '12px 15px 6px 15px',
            height: '72px',
            backgroundColor: '#e6ded0',
            border: '2px solid #b3a789',
            borderTopColor: '#786e54',
            borderLeftColor: '#786e54',
            borderRadius: '3px',
            boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '6px 12px',
          }}
        >
          {/* Bandeja del CD con ranura */}
          <div
            style={{
              height: '26px',
              border: '1px solid #c7bca5',
              borderBottom: '2px solid #786e54',
              backgroundColor: '#ded5c3',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: '10px', color: '#827863', letterSpacing: '1.5px', fontWeight: 'bold' }}>
              COMPACT DISC 52X MAX
            </span>
          </div>

          {/* Controles de la unidad CD: Minijack, rueda volumen, LED y botón expulsar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '3px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Jack de auriculares */}
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#1a1a1a', border: '1px solid #7a715a' }} />
              {/* Ruedecilla de volumen */}
              <div style={{ width: '24px', height: '6px', background: '#9e947c', borderRadius: '2px', border: '1px solid #635c4b' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* LED de lectura del CD */}
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: isPowering ? '#00ff66' : '#2b4d2b',
                  boxShadow: isPowering ? '0 0 6px #00ff66' : 'none',
                }}
              />
              {/* Botón Eject */}
              <div
                style={{
                  width: '30px',
                  height: '14px',
                  backgroundColor: '#d6cdb8',
                  border: '1px solid #fff',
                  borderRightColor: '#6d6550',
                  borderBottomColor: '#6d6550',
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '9px', color: '#544e3f', lineHeight: 1 }}>⏏</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bahía 2: Disquetera 3.5" (Floppy Drive) */}
        <div
          style={{
            margin: '6px 15px 12px 15px',
            height: '60px',
            backgroundColor: '#e0d8c7',
            border: '2px solid #b3a789',
            borderTopColor: '#786e54',
            borderLeftColor: '#786e54',
            borderRadius: '3px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 12px',
          }}
        >
          {/* Ranura del disquete con portilla protectora */}
          <div
            style={{
              width: '78%',
              height: '12px',
              backgroundColor: '#1b1c1e',
              border: '1px solid #544e3f',
              borderRadius: '2px',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)',
            }}
          />
          {/* Botón de expulsión de la disquetera */}
          <div
            style={{
              width: '24px',
              height: '18px',
              backgroundColor: '#d6cdb8',
              border: '2px solid #fff',
              borderRightColor: '#6d6550',
              borderBottomColor: '#6d6550',
              borderRadius: '2px',
            }}
          />
        </div>

        {/* SECCIÓN INFERIOR: Panel de Control Dividido */}
        <div
          style={{
            display: 'flex',
            borderTop: '3px solid #b6ab8d',
            backgroundColor: '#d0c4a4',
            minHeight: '270px',
          }}
        >
          {/* LADO IZQUIERDO: Pantalla 7-segmentos LED + Indicadores TURBO / HDD */}
          <div
            style={{
              flex: 1.25,
              padding: '16px 14px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRight: '3px solid #8e8369',
            }}
          >
            {/* Pantalla 7 Segmentos (Display de MHz) y LED Turbo */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#5e5645', letterSpacing: '0.8px' }}>
                  SPEED / MHZ
                </span>
                {/* LED Indicador Turbo */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ fontSize: '10px', color: '#665e4d', fontWeight: 'bold' }}>TURBO</span>
                  <div
                    style={{
                      width: '14px',
                      height: '6px',
                      borderRadius: '1px',
                      backgroundColor: isPowering && turboActive ? '#ffaa00' : '#4d3300',
                      boxShadow: isPowering && turboActive ? '0 0 8px #ffaa00' : 'none',
                    }}
                  />
                </div>
              </div>

              {/* Marco del Display Digital Verde */}
              <div
                style={{
                  backgroundColor: '#0a140a',
                  border: '2px solid #4a5445',
                  borderBottomColor: '#7d8a77',
                  borderRightColor: '#7d8a77',
                  borderRadius: '4px',
                  padding: '6px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'inset 0 3px 8px rgba(0,0,0,0.95)',
                }}
              >
                <span
                  style={{
                    fontFamily: "'Courier New', Courier, monospace",
                    fontSize: '38px',
                    fontWeight: 900,
                    color: isPowering ? '#39ff14' : '#142914',
                    textShadow: isPowering
                      ? '0 0 10px #39ff14, 0 0 20px rgba(57, 255, 20, 0.7)'
                      : 'none',
                    letterSpacing: '4px',
                    lineHeight: 1,
                  }}
                >
                  {isPowering ? (turboActive ? '66' : '33') : '--'}
                </span>
              </div>
            </div>

            {/* Fila de LEDs de Estado (HDD & POWER) */}
            <div
              style={{
                backgroundColor: '#c4b897',
                padding: '8px 12px',
                borderRadius: '3px',
                border: '1px solid #b0a382',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div
                  style={{
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    backgroundColor: isPowering ? '#00ff66' : '#153315',
                    boxShadow: isPowering ? '0 0 8px #00ff66' : 'none',
                  }}
                />
                <span style={{ fontSize: '10px', color: '#544c3c', fontWeight: 'bold' }}>PWR</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div
                  style={{
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    backgroundColor: isPowering && hddBlink ? '#ff3300' : '#401005',
                    boxShadow: isPowering && hddBlink ? '0 0 8px #ff3300' : 'none',
                  }}
                />
                <span style={{ fontSize: '10px', color: '#544c3c', fontWeight: 'bold' }}>HDD</span>
              </div>
            </div>

            {/* Botones secundarios: Turbo y Reset */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setTurboActive((prev) => !prev)}
                style={{
                  flex: 1,
                  height: '30px',
                  backgroundColor: '#d8ceb2',
                  border: '2px solid #fff',
                  borderRightColor: '#635b47',
                  borderBottomColor: '#635b47',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: '#474032',
                  cursor: 'pointer',
                  touchAction: 'manipulation',
                }}
              >
                TURBO
              </button>
              <button
                type="button"
                style={{
                  flex: 1,
                  height: '30px',
                  backgroundColor: '#d8ceb2',
                  border: '2px solid #fff',
                  borderRightColor: '#635b47',
                  borderBottomColor: '#635b47',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: '#474032',
                  cursor: 'pointer',
                  touchAction: 'manipulation',
                }}
              >
                RESET
              </button>
            </div>
          </div>

          {/* LADO DERECHO: Panel azul pizarra con perforaciones y el BOTÓN REDONDO TURN ON */}
          <div
            style={{
              flex: 1,
              backgroundColor: '#8797aa',
              backgroundImage: 'linear-gradient(to right, #7a8a9c 0%, #8e9eaf 100%)',
              borderLeft: '3px solid #a4b4c4',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 8px',
              position: 'relative',
            }}
          >
            {/* Matriz superior de orificios/dimples perforados estilo 90s */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 9px)', gap: '8px' }}>
              {Array.from({ length: 12 }).map((_, i) => (
                <span
                  key={`top-dot-${i}`}
                  style={{
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    backgroundColor: '#5d6b7b',
                    boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.65), 1px 1px 0 rgba(255,255,255,0.3)',
                  }}
                />
              ))}
            </div>

            {/* BOTÓN PRINCIPAL DE ENCENDIDO (Redondo con bisel 3D y LED central) */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                margin: '10px 0',
              }}
            >
              <button
                onClick={handleTurnOn}
                aria-label="Turn ON Computer"
                title="Presiona para encender el ordenador"
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  backgroundColor: isPowering ? '#229954' : '#2ecc71',
                  backgroundImage: isPowering
                    ? 'radial-gradient(circle at 35% 35%, #52be80 15%, #196f3d 85%)'
                    : 'radial-gradient(circle at 35% 35%, #58d68d 15%, #229954 85%)',
                  border: '3px solid #ede5cc',
                  borderRightColor: '#4d5743',
                  borderBottomColor: '#4d5743',
                  cursor: isPowering ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isPowering
                    ? 'inset 2px 2px 5px rgba(0,0,0,0.8), 0 0 22px #2ecc71'
                    : '0 6px 14px rgba(0,0,0,0.6), inset 1px 1px 2px rgba(255,255,255,0.6)',
                  transform: isPowering ? 'scale(0.92)' : 'scale(1)',
                  transition: 'transform 0.15s ease, box-shadow 0.2s ease',
                  touchAction: 'manipulation',
                  outline: 'none',
                }}
              >
                {/* LED central dentro del botón redondo */}
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: isPowering ? '#ffffff' : '#0e4720',
                    boxShadow: isPowering
                      ? '0 0 12px #ffffff, 0 0 20px #2ecc71'
                      : 'inset 0 1px 2px rgba(0,0,0,0.8)',
                    transition: 'all 0.2s ease',
                  }}
                />
              </button>

              {/* Etiqueta Retro "TURN ON" */}
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 'bold',
                  fontFamily: "'Courier New', Courier, monospace",
                  letterSpacing: '2px',
                  color: isPowering ? '#ffffff' : '#232c37',
                  textShadow: isPowering
                    ? '0 0 8px rgba(255,255,255,0.9)'
                    : '0 1px 0 rgba(255,255,255,0.4)',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  lineHeight: 1.1,
                }}
              >
                Turn ON
              </span>
            </div>

            {/* Matriz inferior de orificios/dimples perforados */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 9px)', gap: '8px' }}>
              {Array.from({ length: 16 }).map((_, i) => (
                <span
                  key={`bot-dot-${i}`}
                  style={{
                    width: '9px',
                    height: '9px',
                    borderRadius: '50%',
                    backgroundColor: '#5d6b7b',
                    boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.65), 1px 1px 0 rgba(255,255,255,0.3)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Parte inferior con hendiduras de ventilación del frontal */}
        <div
          style={{
            height: '28px',
            backgroundColor: '#c5b999',
            borderTop: '3px solid #8e8369',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          <div style={{ width: '90px', height: '4px', backgroundColor: '#8a7e62', borderRadius: '2px' }} />
          <div style={{ width: '90px', height: '4px', backgroundColor: '#8a7e62', borderRadius: '2px' }} />
        </div>
      </div>

      {/* Mensaje inferior nostálgico */}
      <span
        style={{
          marginTop: '18px',
          fontSize: '12px',
          color: '#717885',
          fontFamily: "'Courier New', Courier, monospace",
          letterSpacing: '1px',
          textAlign: 'center',
        }}
      >
        [ PRESS POWER BUTTON TO BOOT SYSTEM ]
      </span>
    </div>
  );
}
