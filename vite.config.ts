import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias: {
        "@": path.resolve(__dirname, "src/")
    }
  },
  plugins: [
      vue(),
      Components({ /* options */ }),
  ]
})
