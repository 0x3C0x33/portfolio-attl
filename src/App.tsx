// src/App.tsx
import { Desktop } from './components/layout/Desktop';
import { Taskbar } from './components/layout/Taskbar';
import { WindowManager } from './components/windows/WindowManager';
import { useWindowManager } from './hooks/useWindowManager';
import type { AppIcon, WindowItem } from './types';

const INITIAL_WINDOWS: Record<string, WindowItem> = {
  about: {
    id: 'about',
    title: 'Sobre_Mí.txt - Bloc de notas',
    iconUrl: '/icons/User1.ico',
    isOpen: false,
    isMinimized: false,
    isFocused: false,
  },
  hemobrutal: {
    id: 'hemobrutal',
    title: 'HemoBrutal.exe - Juego',
    iconUrl: '/icons/Hearts.ico',
    isOpen: false,
    isMinimized: false,
    isFocused: false,
  }
};

export default function App() {
  const { windows, windowList, openWindow, toggleWindow, closeWindow, minimizeWindow } =
    useWindowManager(INITIAL_WINDOWS);

  const desktopIcons: AppIcon[] = [
    {
      id: 'about',
      label: 'Sobre_Mí.txt',
      iconUrl: '/icons/User1.ico',
      onOpen: () => openWindow('about'),
    },
    {
      id: 'hemobrutal',
      label: 'HemoBrutal.exe',
      iconUrl: '/icons/Hearts.ico',
      onOpen: () => openWindow('hemobrutal'),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden', position: 'relative' }}>
      <Desktop icons={desktopIcons} />
      <WindowManager windows={windows} onClose={closeWindow} onMinimize={minimizeWindow} />
      <Taskbar windows={windowList} onToggleWindow={toggleWindow} />
      <audio src="/sounds/boot.mp3" autoPlay></audio>
    </div>
  );
}