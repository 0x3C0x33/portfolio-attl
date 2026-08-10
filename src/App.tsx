// src/App.tsx
import { useState } from 'react';
import { Desktop } from './components/layout/Desktop';
import { Taskbar } from './components/layout/Taskbar';
import { Window } from './components/ui/Window';
import type { AppIcon, WindowItem } from './types';

export default function App() {
  // Estado de las ventanas del sistema
  const [windows, setWindows] = useState<Record<string, WindowItem>>({
    about: {
      id: 'about',
      title: 'Sobre_Mí.txt - Bloc de notas',
      iconUrl: '/icons/File.ico',
      isOpen: false,
      isMinimized: false,
      isFocused: false,
    },
  });

  // Abrir ventana al hacer doble clic en el icono del escritorio
  const handleOpenWindow = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        isFocused: true,
      },
    }));
  };

  // Alternar minimizado/foco al hacer clic en el botón de la barra de tareas
  const handleToggleWindow = (id: string) => {
    setWindows((prev) => {
      const win = prev[id];
      if (win.isMinimized) {
        return { ...prev, [id]: { ...win, isMinimized: false, isFocused: true } };
      }
      if (win.isFocused) {
        return { ...prev, [id]: { ...win, isMinimized: true, isFocused: false } };
      }
      return { ...prev, [id]: { ...win, isFocused: true } };
    });
  };

  const handleCloseWindow = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false, isFocused: false },
    }));
  };

  const handleMinimizeWindow = (id: string) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true, isFocused: false },
    }));
  };

  const desktopIcons: AppIcon[] = [
    {
      id: 'about',
      label: 'Sobre_Mí.txt',
      iconUrl: '/icons/User1.ico',
      onOpen: () => handleOpenWindow('about'),
    },
    {
      id: 'hemobrutal',
      label: 'HemoBrutal.exe',
      iconUrl: '/icons/Hearts.ico',
      onOpen: () => console.log('Próximamente...'),
    },
  ];

  const aboutWin = windows['about'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative' }}>
      <Desktop icons={desktopIcons} />

      {/* Ventana "Sobre Mí" con el estilo nativo de xp.css */}
      {aboutWin && (
        <Window
          title={aboutWin.title}
          iconUrl={aboutWin.iconUrl}
          isOpen={aboutWin.isOpen}
          isMinimized={aboutWin.isMinimized}
          onClose={() => handleCloseWindow('about')}
          onMinimize={() => handleMinimizeWindow('about')}
        >
          <div style={{ padding: '12px', fontFamily: 'Tahoma, sans-serif', fontSize: '12px', color: '#000' }}>
            <h3 style={{ marginTop: 0 }}>¡Hola! Bienvenid@ a mi portfolio.</h3>
            <p>
              Desarrollador apasionado por los entornos web, sistemas y las interfaces retro.
            </p>
            <p>
              Actualmente construyendo proyectos como <strong>HemoBrutal</strong> y explorando nuevas tecnologías.
            </p>
          </div>
        </Window>
      )}
      <Taskbar
        windows={Object.values(windows)}
        onToggleWindow={handleToggleWindow}
      />
      <audio src="/sounds/boot.mp3" autoPlay></audio>
    </div>
  );
}