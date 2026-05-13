import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import path from "node:path"
import legacy from '@vitejs/plugin-legacy'
import { execSync } from 'node:child_process'
import versionData from './version.json'

// 获取上次 git 提交时间
function getGitLastCommitDate(): string {
  try {
    const timestamp = execSync('git log -1 --format=%ct', { encoding: 'utf-8' }).trim()
    const date = new Date(Number(timestamp) * 1000)
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  } catch {
    return ''
  }
}

// 获取版本号
function getAppVersion(): string {
  return `V${versionData.major}.${versionData.minor}.${versionData.patch}`
}

// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  define: {
    __GIT_COMMIT_DATE__: JSON.stringify(getGitLastCommitDate()),
    __APP_VERSION__: JSON.stringify(getAppVersion()),
  },
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
    extensions: ['.js', '.json', '.ts', '.vue']
  },
  plugins: [
      vue(),
      Components({ /* options */ }),
      legacy()
  ],
  build:{
    // sourcemap:true,
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('echarts')) {
              return 'vendor-echarts'
            }
            if (id.includes('naive-ui')) {
              return 'vendor-naive-ui'
            }
            if (id.includes('luckysheet') || id.includes('luckyexcel')) {
              return 'vendor-luckysheet'
            }
            if (id.includes('xlsx') || id.includes('sheetjs')) {
              return 'vendor-xlsx'
            }
            if (id.includes('@wangeditor')) {
              return 'vendor-wangeditor'
            }
            return 'vendor'
          }
        }
      }
    }
  }
})
