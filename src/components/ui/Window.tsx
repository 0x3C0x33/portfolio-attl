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

  // Guardamos las dimensiones y posición previas calculadas de forma responsiva
  const [bounds, setBounds] = useState(() => {
    const screenW = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const screenH = typeof window !== 'undefined' ? window.innerHeight : 768;
    const isMobile = screenW <= 640;

    const calcWidth = isMobile
      ? Math.min(screenW - 8, defaultWidth)
      : Math.min(defaultWidth, screenW - 40);

    const calcHeight = isMobile
      ? Math.min(screenH - taskbarHeight - 12, defaultHeight)
      : Math.min(defaultHeight, screenH - taskbarHeight - 40);

    const calcX = isMobile
      ? Math.max(4, Math.floor((screenW - calcWidth) / 2))
      : Math.max(20, Math.min(80, screenW - calcWidth - 20));

    const calcY = isMobile
      ? 6
      : Math.max(20, Math.min(60, screenH - taskbarHeight - calcHeight - 20));

    return {
      x: calcX,
      y: calcY,
      width: Math.max(260, calcWidth),
      height: Math.max(140, calcHeight),
    };
  });

  // Escuchar cambios de tamaño de la ventana del navegador (orientación / resize)
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      const isMobile = newWidth <= 640;

      setScreenSize({
        width: newWidth,
        height: newHeight,
      });

      setBounds((prev) => {
        const maxWidth = isMobile ? newWidth - 8 : newWidth - 20;
        const maxHeight = newHeight - taskbarHeight - (isMobile ? 12 : 20);

        const clampedWidth = Math.max(260, Math.min(prev.width, maxWidth));
        const clampedHeight = Math.max(140, Math.min(prev.height, maxHeight));

        const clampedX = Math.max(
          isMobile ? 4 : 10,
          Math.min(prev.x, newWidth - clampedWidth - (isMobile ? 4 : 10))
        );
        const clampedY = Math.max(
          isMobile ? 6 : 10,
          Math.min(prev.y, newHeight - taskbarHeight - clampedHeight - 10)
        );

        return {
          x: clampedX,
          y: clampedY,
          width: clampedWidth,
          height: clampedHeight,
        };
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [taskbarHeight]);

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
      minWidth={Math.min(260, screenSize.width - 8)}
      minHeight={140}
      onMouseDown={onFocus}
      dragHandleClassName="title-bar"
      cancel=".title-bar-controls, .title-bar-controls *, button, input, select, textarea, .window-body"
      style={{
        zIndex: zIndex,
        touchAction: 'none',
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
          style={{
            cursor: isMaximized ? 'default' : 'move',
            userSelect: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '3px 4px',
          }}
          onDoubleClick={toggleMaximize}
        >
          <div
            className="title-bar-text"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
              paddingRight: '6px',
            }}
          >
            {iconUrl && <img src={iconUrl} alt="" style={{ width: '16px', height: '16px', flexShrink: 0 }} />}
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</span>
          </div>

          <div
            className="title-bar-controls"
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            style={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              gap: '2px',
            }}
          >
            <button
              aria-label="Minimize"
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onMinimize();
              }}
              style={{ touchAction: 'manipulation' }}
            />
            <button
              aria-label={isMaximized ? 'Restore' : 'Maximize'}
              onClick={(e) => {
                e.stopPropagation();
                toggleMaximize();
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleMaximize();
              }}
              style={{ touchAction: 'manipulation' }}
            />
            <button
              aria-label="Close"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
              }}
              style={{ touchAction: 'manipulation' }}
            />
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