import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  build: {
    target: 'es2015',
    outDir: 'dist',
    sourcemap: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    base: process.env.NODE_ENV === 'production' ? './' : '/',
    host: 'localhost',
    port: 80,
    open: true,
    // https: true,
    proxy: {
      '/apis': {
        target: 'https://40f071780t.goho.co:443/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/apis/, '')
      }
    }
  }
})