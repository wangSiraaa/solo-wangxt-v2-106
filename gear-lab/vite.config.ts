import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // clipper2 的 wasm 通过 ?url 显式加载，保持文件名稳定
  build: { target: 'es2022' },
  base: './',
})
