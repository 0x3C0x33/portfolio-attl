// src/constants/wallpapers.ts

export interface Wallpaper {
  id: string;
  name: string;
  url: string;
}

export const WALLPAPERS: Wallpaper[] = [
  { id: "default", name: "Bliss Reimagined", url: "/wallpapers/default.webp" },
  { id: "mountain", name: "Monte Fuji", url: "/wallpapers/mountain.webp" },
  { id: "pc", name: "Retro PC", url: "/wallpapers/pc.webp" },
  { id: "cabin", name: "Cabaña", url: "/wallpapers/cabin.webp" },
  { id: "bridge", name: "Puente", url: "/wallpapers/bridge.webp" },
];