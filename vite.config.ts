import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 纯前端构建；Clipper2 的 wasm 由 Vite 作为静态资源分发
export default defineConfig({
  plugins: [vue()],
  base: './',
  optimizeDeps: {
    exclude: ['clipper2-wasm']
  },
  build: {
    target: 'es2022'
  }
})
