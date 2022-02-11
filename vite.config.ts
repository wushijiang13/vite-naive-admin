import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias: {
        "@": path.resolve(__dirname, "src/"),
        "@utils": path.resolve(__dirname, "src/utils/")
    }
  },
  plugins: [
      vue(),
      Components({ /* options */ }),
  ]
})
