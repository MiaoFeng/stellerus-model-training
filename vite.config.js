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
    '/api/project': {
      target: 'https://virtserver.swaggerhub.com/MIAOFENG/project/1.0.0',
      changeOrigin: true,
    },
    '/api/models': {
      target: 'https://virtserver.swaggerhub.com/MIAOFENG/models/1.0.0',
      changeOrigin: true,
    },
    // hmr: {
    //   overlay: false
    // },
  }
})
