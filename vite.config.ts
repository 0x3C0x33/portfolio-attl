import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Desactivamos la minificación estricta del CSS para evitar que falle con la sintaxis de XP.css
    cssMinify: false,
  },
})
