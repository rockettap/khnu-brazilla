import { resolve } from 'node:path';

import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import handlebars from 'vite-plugin-handlebars';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(),
    ViteImageOptimizer({
      png: {
        quality: 70
      },
      jpeg: {
        quality: 70
      },
      jpg: {
        quality: 70
      },
      webp: {
        quality: 70
      }
    }),
    handlebars({
      partialDirectory: resolve('./src/partials')
    })
  ],
  root: './src',
  base: '/khnu-brazilla/',
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, './src/index.html'),
        shop: resolve(__dirname, './src/shop/index.html')
      }
    }
  },
  publicDir: '../public',
  envDir: '../'
});
