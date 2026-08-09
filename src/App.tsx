// src/App.tsx
import { Desktop } from './components/layout/Desktop';
import type { AppIcon } from './types';

const MY_ICONS: AppIcon[] = [
  {
    id: 'about',
    label: 'Sobre_Mí.txt',
    iconUrl: '/desktop_icons/User1.ico',
    onOpen: () => console.log('Abriendo ventana Sobre Mí...')
  },
  {
    id: 'hemobrutal',
    label: 'HemoBrutal.exe',
    iconUrl: '/desktop_icons/Hearts.ico',
    onOpen: () => console.log('Abriendo proyecto HemoBrutal...')
  },
  {
    id: 'homelab',
    label: 'Homelab_Status',
    iconUrl: '/desktop_icons/Server.ico',
    onOpen: () => console.log('Abriendo arquitectura del Homelab...')
  }
];

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
      <Desktop icons={MY_ICONS} />
      
    </div>
  );
}