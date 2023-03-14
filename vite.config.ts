import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import path from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias: {
        "@": path.resolve(__dirname, "src/"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@pinia": path.resolve(__dirname, "src/config/pinia")
    },
    extensions: ['.js', '.json', '.ts']
  },
  plugins: [
      vue(),
      Components({ /* options */ }),
  ]
})
