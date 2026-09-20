import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    // Local dev talks straight to the live shared booking platform, exactly
    // as production does via the /api rewrite in vercel.json.
    proxy: {
      '/api': {
        target: 'https://www.bookaride.co.nz',
        changeOrigin: true,
      },
    },
  },
})
