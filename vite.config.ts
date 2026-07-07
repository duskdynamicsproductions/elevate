import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['**/*'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,gif,jpg,jpeg,webp,woff,woff2,ttf,eot}'],
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB limit to cache heavy gifs
        cleanupOutdatedCaches: true,
      },
      manifest: {
        name: 'Elevate',
        short_name: 'Elevate',
        description: 'Male Wellness | Physical Fitness | Mental Wellness',
        theme_color: '#0D0D0D',
        icons: [
          {
            src: 'elevate-favicon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'elevate-favicon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
});
