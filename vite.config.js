import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/indexer/',
  plugins: [
    Vue(),
    Unocss(),
  ],
})