import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3127,
    proxy: {
      '/api': {
        target: 'http://localhost:8127',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
})
