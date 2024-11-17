import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import cesium from 'vite-plugin-cesium'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), eslintPlugin(), cesium()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler" // or 'modern'
      }
    }
  },
  optimizeDeps: {
    exclude:['Cesium']
  },
  server: {
    port: 5174,
  }
})
