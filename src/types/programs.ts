// src/types/programs.ts

export interface ControlGuideItem {
  key: string;
  action: string;
}

export interface ProgramMenuItem {
  id: string;
  name: string;
  iconUrl: string;
  category?: 'program' | 'game';
  description?: string;
  defaultWidth?: number;
  defaultHeight?: number;
  gameUrl?: string;
  backend?: 'dosbox' | 'dosboxX';
  controls?: ControlGuideItem[];
}

export const START_MENU_PROGRAMS: ProgramMenuItem[] = [
  {
    id: 'paint',
    name: 'Microsoft Paint (XP)',
    iconUrl: '/icons/User Personalization.webp',
    category: 'program',
    defaultWidth: 640,
    defaultHeight: 480,
  },
  {
    id: 'notepad',
    name: 'Notepad',
    iconUrl: '/icons/List File.webp',
    category: 'program',
    defaultWidth: 520,
    defaultHeight: 380,
  },
  {
    id: 'calculator',
    name: 'Calculator',
    iconUrl: '/icons/System Properties.webp',
    category: 'program',
    defaultWidth: 320,
    defaultHeight: 360,
  },
  {
    id: 'tyrian',
    name: 'Tyrian 2000',
    iconUrl: '/icons/games/TyrianIcon.webp',
    category: 'game',
    description: 'MS-DOS Arcade • Freeware Oficial • 11.6 MB',
    defaultWidth: 660,
    defaultHeight: 520,
    gameUrl: '/games/Tyrian2000.jsdos',
    backend: 'dosbox',
    controls: [
      { key: 'Flechas', action: 'Mover nave' },
      { key: 'Espacio / Ctrl', action: 'Disparo principal' },
      { key: 'Alt', action: 'Arma secundaria' },
      { key: 'Intro / P', action: 'Pausa' },
      { key: 'Esc', action: 'Menú' },
    ],
  },
  {
    id: 'ghinirun',
    name: 'Ghini Run',
    iconUrl: '/icons/games/ghinirun.webp',
    category: 'game',
    description: 'MS-DOS 7.1 Arcade • 5.4 MB',
    defaultWidth: 660,
    defaultHeight: 520,
    gameUrl: '/games/ghinirun.jsdos?v=3',
    backend: 'dosboxX',
    controls: [
      { key: 'Flechas', action: 'Conducir (Acelerar, Frenar, Girar)' },
      { key: 'Espacio', action: 'Freno de mano / Nitro' },
      { key: 'Esc / P', action: 'Pausa / Menú' },
    ],
  },
  {
    id: 'bblast',
    name: 'Ball Blaster',
    iconUrl: '/icons/games/ballblaster.webp',
    category: 'game',
    description: 'MS-DOS Arcade • Puzzle Bobble • 4.5 MB',
    defaultWidth: 660,
    defaultHeight: 520,
    gameUrl: '/games/bblast.jsdos',
    backend: 'dosbox',
    controls: [
      { key: 'Flechas Izq / Der', action: 'Apuntar cañón' },
      { key: 'Espacio', action: 'Disparar bola' },
      { key: 'Esc / P', action: 'Pausa / Menú' },
    ],
  },
  {
    id: 'beatsofrage',
    name: 'Beats of Rage',
    iconUrl: '/icons/games/BeatsOfRage.webp',
    category: 'game',
    description: "Beat 'em Up • Senile Team • 56 MB",
    defaultWidth: 660,
    defaultHeight: 520,
    gameUrl: '/games/BeatsOfRage.jsdos',
    backend: 'dosboxX',
    controls: [
      { key: 'Flechas', action: 'Moverse / Navegar menú' },
      { key: 'Ctrl', action: 'Golpe normal' },
      { key: 'Alt', action: 'Saltar' },
      { key: 'Shift', action: 'Poder especial' },
      { key: 'Intro', action: 'Seleccionar en menú / Pausa' },
      { key: 'Esc', action: 'Pausa' },
    ],
  },
  {
    id: 'minesweeper',
    name: 'Minesweeper',
    iconUrl: '/icons/Minesweeper.webp',
    category: 'game',
    defaultWidth: 320,
    defaultHeight: 390,
  },
];


