// src/types/programs.ts

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


