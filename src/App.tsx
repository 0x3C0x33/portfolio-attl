// src/App.tsx
import { useState } from 'react';
import { Desktop } from './components/layout/Desktop';
import { Taskbar } from './components/layout/Taskbar';
import { Bootscreen } from './components/layout/Bootscreen';
import { PowerScreen } from './components/layout/PowerScreen';
import { WindowManager } from './components/windows/WindowManager';
import { useWindowManager } from './hooks/useWindowManager';
import { useBootSequence } from './hooks/useBootSequence';
import { WALLPAPERS } from './types/wallpapers';
import { START_MENU_PROGRAMS, type AppIcon, type WindowItem } from './types';

const INITIAL_WINDOWS: Record<string, WindowItem> = {
  about: {
    id: 'about',
    title: 'Sobre_Mí.cfg - Configuración',
    iconUrl: '/icons/User1.webp',
    isOpen: false,
    isMinimized: false,
    isFocused: false,
  },
  hemobrutal: {
    id: 'hemobrutal',
    title: 'HemoBrutal.exe - Juego',
    iconUrl: '/icons/Hearts.webp',
    isOpen: false,
    isMinimized: false,
    isFocused: false,
  },
  server: {
    id: 'server',
    title: 'Servidor.bat - Script',
    iconUrl: '/icons/Server.webp',
    isOpen: false,
    isMinimized: false,
    isFocused: false,
  },
  mypage: {
    id: 'mypage',
    title: 'Portfolio ATTL - Web',
    iconUrl: '/icons/My Network Places.webp',
    isOpen: false,
    isMinimized: false,
    isFocused: false,
  },
  credits: {
    id: 'credits',
    title: 'Créditos.txt',
    iconUrl: '/icons/List File.webp',
    isOpen: false,
    isMinimized: false,
    isFocused: false,
  },
  ...START_MENU_PROGRAMS.reduce((acc, prog) => {
    acc[prog.id] = {
      id: prog.id,
      title: prog.name,
      iconUrl: prog.iconUrl,
      isOpen: false,
      isMinimized: false,
      isFocused: false,
    };
    return acc;
  }, {} as Record<string, WindowItem>),
};

export default function App() {
  const { windows, windowList, openWindow, toggleWindow, closeWindow, minimizeWindow } =
    useWindowManager(INITIAL_WINDOWS);
  const { bootState, turnOn, turnOff } = useBootSequence(3000); // 3 segundos de carga

  const [wallpaper, setWallpaper] = useState<string>(() => {
    return localStorage.getItem('xp_wallpaper') || WALLPAPERS[0].url;
  });

  const handleSelectWallpaper = (url: string) => {
    setWallpaper(url);
    localStorage.setItem('xp_wallpaper', url);
  };

  const desktopIcons: AppIcon[] = [
    {
      id: 'about',
      label: 'Sobre_Mí.cfg',
      iconUrl: '/icons/User1.webp',
      onOpen: () => openWindow('about'),
    },
    {
      id: 'server',
      label: 'Servidor.bat',
      iconUrl: '/icons/Server.webp',
      onOpen: () => openWindow('server'),
    },
    {
      id: 'mypage',
      label: 'MiWeb.html',
      iconUrl: '/icons/My Network Places.webp',
      onOpen: () => openWindow('mypage'),
    },
    {
      id: 'hemobrutal',
      label: 'HemoBrutal.exe',
      iconUrl: '/icons/Hearts.webp',
      onOpen: () => openWindow('hemobrutal'),
    },
  ];

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh', 
        width: '100vw', 
        overflow: 'hidden', 
        position: 'relative',
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Fondo negro de seguridad: evita cualquier destello del escritorio durante el encendido y arranque */}
      {(bootState === 'off' || bootState === 'booting') && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: '#000000',
            zIndex: 99990,
          }}
        />
      )}

      {/* 1. Pantalla de encendido (Turn ON) cuando el PC está apagado */}
      {bootState === 'off' && <PowerScreen onTurnOn={turnOn} />}

      {/* 2. Pantalla de arranque Bootscreen */}
      {(bootState === 'booting' || bootState === 'fading') && (
        <Bootscreen bootState={bootState} />
      )}

      {/* 3. Entorno de Escritorio Windows XP */}
      <Desktop icons={desktopIcons} />
      <WindowManager 
        windows={windows} 
        onClose={closeWindow} 
        onMinimize={minimizeWindow} 
      />
      <Taskbar
        windows={windowList}
        onToggleWindow={toggleWindow}
        onOpenCredits={() => openWindow('credits')}
        currentWallpaper={wallpaper}
        onSelectWallpaper={handleSelectWallpaper}
        onTurnOff={turnOff}
        onOpenProgram={(id) => openWindow(id)}
      />
    </div>
  );
}