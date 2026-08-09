// src/components/layout/Desktop.tsx
import { DesktopIcon } from '../ui/DesktopIcon';
import type { AppIcon } from '../../types';

interface DesktopProps {
  icons: AppIcon[];
}

export function Desktop({ icons }: DesktopProps) {
  return (
    <div 
      style={{
        flex: 1,
        display: 'grid',
        // Magia del Grid: casillas de 75x85, ordenadas en columnas de arriba a abajo
        gridTemplateRows: 'repeat(auto-fill, 85px)',
        gridTemplateColumns: 'repeat(auto-fill, 75px)',
        gridAutoFlow: 'column', 
        gap: '2px',
        padding: '10px',
        height: 'calc(100vh - 30px)', // Dejamos 30px abajo para la futura barra de tareas
        width: '100vw',
      }}
    >
      {/* Iteramos sobre el array de iconos y renderizamos un componente por cada uno */}
      {icons.map((icon) => (
        <DesktopIcon key={icon.id} icon={icon} />
      ))}
    </div>
  );
}