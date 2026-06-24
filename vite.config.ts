import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  // GitHub Pages base path - change this to your repo name
  base: '/echomind/',
  appType: 'spa',
})