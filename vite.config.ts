import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/prueba-tecnica-react-1/',
  plugins: [react()],
})
