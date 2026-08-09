// src/components/ui/DesktopIcon.tsx
import { useState } from 'react';
import type { AppIcon } from '../../types';

interface DesktopIconProps {
  icon: AppIcon;
}

export function DesktopIcon({ icon }: DesktopIconProps) {
  // Estado local para saber si el icono está "marcado"
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      onClick={() => setIsSelected(true)}
      onBlur={() => setIsSelected(false)} // Si hacemos clic fuera, se desmarca
      onDoubleClick={icon.onOpen}
      tabIndex={0} // Necesario para que el onBlur funcione en un div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '75px',
        height: '85px',
        padding: '4px',
        cursor: 'pointer',
        outline: 'none',
        // Estilos condicionales: si está seleccionado, se pone azul
        backgroundColor: isSelected ? 'rgba(0, 88, 238, 0.3)' : 'transparent',
        border: isSelected ? '1px dotted rgba(255, 255, 255, 0.7)' : '1px solid transparent',
      }}
    >
      <img 
        src={icon.iconUrl} 
        alt={icon.label} 
        style={{ width: '32px', height: '32px', marginBottom: '4px', pointerEvents: 'none' }} 
      />
      <span
        style={{
          color: 'white',
          fontSize: '11px',
          textAlign: 'center',
          textShadow: '1px 1px 1px black',
          backgroundColor: isSelected ? '#0b61ff' : 'transparent',
          padding: '2px',
          lineHeight: '1.2',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}
      >
        {icon.label}
      </span>
    </div>
  );
}