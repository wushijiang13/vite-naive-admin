import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import path from "node:path"
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  resolve:{
    alias: {
        "@": path.resolve(__dirname, "src/"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@pinia": path.resolve(__dirname, "src/config/pinia"),
        "@components": path.resolve(__dirname, "src/components"),
        "@views": path.resolve(__dirname, "src/views"),
        "@config": path.resolve(__dirname, "src/config"),
        "@types": path.resolve(__dirname, "src/config/types"),
    },
    extensions: ['.js', '.json', '.ts']
  },
  plugins: [
      vue(),
      Components({ /* options */ }),
      legacy()
  ],
  build:{
    // sourcemap:true,
  }
})
