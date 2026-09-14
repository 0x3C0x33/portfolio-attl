// src/types/index.ts

export interface AppIcon {
  id: string;
  label: string;
  iconUrl: string;
  onOpen?: () => void; // Función opcional que se ejecutará al hacer doble clic
}

// Nueva interfaz para las ventanas activas en la barra de tareas
export interface WindowItem {
  id: string;
  title: string;
  iconUrl: string;
  isOpen: boolean;
  isMinimized: boolean;
  isFocused: boolean;
}

export type { ProgramMenuItem } from './programs';
export { START_MENU_PROGRAMS } from './programs';

