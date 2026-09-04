// src/App.tsx
import { useState } from 'react';
import { Desktop } from './components/layout/Desktop';
import { Taskbar } from './components/layout/Taskbar';
import { Bootscreen } from './components/layout/Bootscreen';
import { WindowManager } from './components/windows/WindowManager';
import { useWindowManager } from './hooks/useWindowManager';
import { useBootSequence } from './hooks/useBootSequence';
import { WALLPAPERS } from './types/wallpapers';
import type { AppIcon, WindowItem } from './types';

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
};

export default function App() {
  const { windows, windowList, openWindow, toggleWindow, closeWindow, minimizeWindow } =
    useWindowManager(INITIAL_WINDOWS);
  const bootState = useBootSequence(3000); // 3 segundos de carga

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
      <Bootscreen bootState={bootState} />
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
      />
    </div>
  );
}