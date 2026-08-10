// src/components/ui/SystemClock.tsx
import { useState, useEffect } from 'react';

export function SystemClock() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      // Formato HH:MM AM/PM clásico
      const timeString = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      setTime(timeString);
    };

    updateClock(); // Hora inicial
    const timer = setInterval(updateClock, 10000); // Actualiza cada 10 segundos

    return () => clearInterval(timer); // Limpieza al desmontar
  }, []);

  return (
    <div 
      style={{
        padding: '0 8px',
        fontSize: '11px',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        textShadow: '1px 1px 1px #000',
      }}
    >
      {time}
    </div>
  );
}