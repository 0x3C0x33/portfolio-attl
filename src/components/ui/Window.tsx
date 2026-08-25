// src/components/ui/Window.tsx
import type { ReactNode } from 'react';
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
}: WindowProps) {
  if (!isOpen || isMinimized) return null;

  return (
    <Rnd
      default={{
        x: 100,
        y: 80,
        width: defaultWidth,
        height: defaultHeight,
      }}
      minWidth={280}
      minHeight={150}
      bounds="parent"
      dragHandleClassName="title-bar"
      style={{ zIndex: 10 }}
    >
      <div
        className="window"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          margin: 0,
        }}
      >
        <div className="title-bar" style={{ cursor: 'move', userSelect: 'none' }}>
          <div className="title-bar-text" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {iconUrl && <img src={iconUrl} alt="" style={{ width: '16px', height: '16px' }} />}
            <span>{title}</span>
          </div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" onClick={onMinimize} />
            <button aria-label="Maximize" disabled />
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