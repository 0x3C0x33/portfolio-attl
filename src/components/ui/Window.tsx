// src/components/ui/Window.tsx
import { useState, useEffect, type ReactNode } from 'react';
import { Rnd } from 'react-rnd';

interface WindowProps {
  title: string;
  iconUrl?: string;
  isOpen: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  children: ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  zIndex?: number;
  onFocus?: () => void;
  taskbarHeight?: number;
}

export function Window({
  title,
  iconUrl,
  isOpen,
  isMinimized,
  onClose,
  onMinimize,
  children,
  defaultWidth = 500,
  defaultHeight = 320,
  zIndex = 10,
  onFocus,
  taskbarHeight = 30,
}: WindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);

  // Dimensiones del viewport para calcular píxeles exactos
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  // Guardamos las dimensiones y posición previas para restaurar
  const [bounds, setBounds] = useState({
    x: 100,
    y: 80,
    width: defaultWidth,
    height: defaultHeight,
  });

  // Escuchar cambios de tamaño de la ventana del navegador
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isOpen || isMinimized) return null;

  const toggleMaximize = () => {
    onFocus?.();
    setIsMaximized((prev) => !prev);
  };

  // Cálculo en PÍXELES EXACTOS para evitar conflictos con translate3d
  const currentPosition = isMaximized ? { x: 0, y: 0 } : { x: bounds.x, y: bounds.y };
  const currentSize = isMaximized
    ? {
        width: screenSize.width,
        height: screenSize.height - taskbarHeight,
      }
    : {
        width: bounds.width,
        height: bounds.height,
      };

  return (
    <Rnd
      position={currentPosition}
      size={currentSize}
      onDragStop={(_e, d) => {
        if (!isMaximized) {
          setBounds((prev) => ({ ...prev, x: d.x, y: d.y }));
        }
      }}
      onResizeStop={(_e, _dir, ref, _delta, position) => {
        if (!isMaximized) {
          setBounds({
            width: parseInt(ref.style.width, 10),
            height: parseInt(ref.style.height, 10),
            x: position.x,
            y: position.y,
          });
        }
      }}
      disableDragging={isMaximized}
      enableResizing={!isMaximized}
      minWidth={280}
      minHeight={150}
      onMouseDown={onFocus}
      dragHandleClassName="title-bar"
      style={{
        zIndex: zIndex,
      }}
    >
      <div
        className="window"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          margin: 0,
          boxSizing: 'border-box',
        }}
      >
        <div
          className="title-bar"
          style={{ cursor: isMaximized ? 'default' : 'move', userSelect: 'none' }}
          onDoubleClick={toggleMaximize}
        >
          <div className="title-bar-text" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {iconUrl && <img src={iconUrl} alt="" style={{ width: '16px', height: '16px' }} />}
            <span>{title}</span>
          </div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" onClick={onMinimize} />
            <button
              aria-label={isMaximized ? 'Restore' : 'Maximize'}
              onClick={toggleMaximize}
            />
            <button aria-label="Close" onClick={onClose} />
          </div>
        </div>
        <div
          className="window-body"
          style={{
            flex: 1,
            margin: '0px',
            overflow: 'auto',
          }}
        >
          {children}
        </div>
      </div>
    </Rnd>
  );
}