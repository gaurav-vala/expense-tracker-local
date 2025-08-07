import path from "path"

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';
import { tanstackRouter } from '@tanstack/router-plugin/vite'



// https://vite.dev/config/
export default defineConfig({
  plugins: [tanstackRouter({
    target: 'react',
    autoCodeSplitting: true,
  }), react(), VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['/vite.svg', 'robots.txt', 'apple-touch-icon.png'],
    manifest: {
      name: 'Expense Tracker',
      short_name: 'Pennywise',
      description: 'Your Finance Journey, Powered by Me.',
      theme_color: '#ffffff',
      icons: [
        {
          src: '/vite.svg',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/vite.svg',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  }),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
