// src/components/ui/Window.tsx
import type { ReactNode } from 'react';

interface WindowProps {
  title: string;
  iconUrl?: string;
  isOpen: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  children: ReactNode;
}

export function Window({
  title,
  iconUrl,
  isOpen,
  isMinimized,
  onClose,
  onMinimize,
  children,
}: WindowProps) {
  if (!isOpen || isMinimized) return null;

  return (
    <div
      className="window"
      style={{
        position: 'absolute',
        top: '10%',
        left: '20%',
        width: '500px',
        maxWidth: '90vw',
        zIndex: 10,
      }}
    >
      <div className="title-bar">
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
      <div className="window-body" style={{ margin: '8px', minHeight: '200px' }}>
        {children}
      </div>
    </div>
  );
}