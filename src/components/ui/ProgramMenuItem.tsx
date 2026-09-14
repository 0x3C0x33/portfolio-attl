// src/components/ui/ProgramMenuItem.tsx
import { useState } from 'react';
import type { ProgramMenuItem as ProgramMenuItemType } from '../../types';

interface ProgramMenuItemProps {
  program: ProgramMenuItemType;
  onClick: () => void;
  variant?: 'left' | 'right';
}

export function ProgramMenuItem({ program, onClick, variant = 'left' }: ProgramMenuItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const defaultColor = variant === 'right' ? '#00136b' : '#000000';
  const defaultFontWeight = variant === 'right' ? 'bold' : 'normal';

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
        padding: '4px 6px',
        backgroundColor: isHovered ? '#316ac5' : 'transparent',
        color: isHovered ? '#ffffff' : defaultColor,
        borderRadius: '3px',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        userSelect: 'none',
        transition: 'background-color 0.1s ease',
        fontFamily: 'Tahoma, sans-serif',
        fontSize: '11px',
      }}
    >
      <img
        src={program.iconUrl}
        alt={program.name}
        width={26}
        height={26}
        style={{
          width: '26px',
          height: '26px',
          objectFit: 'contain',
          flexShrink: 0,
        }}
      />

      <span
        style={{
          flex: 1,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          fontWeight: isHovered ? 'bold' : defaultFontWeight,
        }}
      >
        {program.name}
      </span>
    </button>
  );
}

