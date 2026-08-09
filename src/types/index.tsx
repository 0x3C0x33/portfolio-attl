// src/types/index.ts

export interface AppIcon {
  id: string;
  label: string;
  iconUrl: string;
  onOpen?: () => void; // Función opcional que se ejecutará al hacer doble clic
}