import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 6090,
    proxy: {
      '/api': 'http://localhost:9060'
    }
  }
})
