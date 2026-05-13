// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import path from "node:path";
import legacy from "@vitejs/plugin-legacy";
import { execSync } from "node:child_process";

// version.json
var version_default = {
  major: 1,
  minor: 0,
  patch: 1
};

// vite.config.ts
function getGitLastCommitDate() {
  try {
    const timestamp = execSync("git log -1 --format=%ct", { encoding: "utf-8" }).trim();
    const date = new Date(Number(timestamp) * 1e3);
    const pad = (n) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  } catch {
    return "";
  }
}
function getAppVersion() {
  return `V${version_default.major}.${version_default.minor}.${version_default.patch}`;
}
var vite_config_default = defineConfig({
  base: "./",
  define: {
    __GIT_COMMIT_DATE__: JSON.stringify(getGitLastCommitDate()),
    __APP_VERSION__: JSON.stringify(getAppVersion())
  },
  resolve: {
    alias: {
      "@": path.resolve("/Users/wushijiang/web/vite-naive-admin", "src/"),
      "@utils": path.resolve("/Users/wushijiang/web/vite-naive-admin", "src/utils"),
      "@pinia": path.resolve("/Users/wushijiang/web/vite-naive-admin", "src/config/pinia"),
      "@components": path.resolve("/Users/wushijiang/web/vite-naive-admin", "src/components"),
      "@views": path.resolve("/Users/wushijiang/web/vite-naive-admin", "src/views"),
      "@config": path.resolve("/Users/wushijiang/web/vite-naive-admin", "src/config"),
      "@types": path.resolve("/Users/wushijiang/web/vite-naive-admin", "src/config/types")
    },
    extensions: [".js", ".json", ".ts", ".vue"]
  },
  plugins: [
    vue(),
    Components({}),
    legacy()
  ],
  build: {
    chunkSizeWarningLimit: 2e3,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("echarts")) {
              return "vendor-echarts";
            }
            if (id.includes("naive-ui")) {
              return "vendor-naive-ui";
            }
            if (id.includes("luckysheet") || id.includes("luckyexcel")) {
              return "vendor-luckysheet";
            }
            if (id.includes("xlsx") || id.includes("sheetjs")) {
              return "vendor-xlsx";
            }
            if (id.includes("@wangeditor")) {
              return "vendor-wangeditor";
            }
            return "vendor";
          }
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgcGF0aCBmcm9tIFwibm9kZTpwYXRoXCJcbmltcG9ydCBsZWdhY3kgZnJvbSAnQHZpdGVqcy9wbHVnaW4tbGVnYWN5J1xuaW1wb3J0IHsgZXhlY1N5bmMgfSBmcm9tICdub2RlOmNoaWxkX3Byb2Nlc3MnXG5pbXBvcnQgdmVyc2lvbkRhdGEgZnJvbSAnLi92ZXJzaW9uLmpzb24nXG5cbi8vIFx1ODNCN1x1NTNENlx1NEUwQVx1NkIyMSBnaXQgXHU2M0QwXHU0RUE0XHU2NUY2XHU5NUY0XG5mdW5jdGlvbiBnZXRHaXRMYXN0Q29tbWl0RGF0ZSgpOiBzdHJpbmcge1xuICB0cnkge1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IGV4ZWNTeW5jKCdnaXQgbG9nIC0xIC0tZm9ybWF0PSVjdCcsIHsgZW5jb2Rpbmc6ICd1dGYtOCcgfSkudHJpbSgpXG4gICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKE51bWJlcih0aW1lc3RhbXApICogMTAwMClcbiAgICBjb25zdCBwYWQgPSAobjogbnVtYmVyKSA9PiBTdHJpbmcobikucGFkU3RhcnQoMiwgJzAnKVxuICAgIHJldHVybiBgJHtkYXRlLmdldEZ1bGxZZWFyKCl9LSR7cGFkKGRhdGUuZ2V0TW9udGgoKSArIDEpfS0ke3BhZChkYXRlLmdldERhdGUoKSl9ICR7cGFkKGRhdGUuZ2V0SG91cnMoKSl9OiR7cGFkKGRhdGUuZ2V0TWludXRlcygpKX06JHtwYWQoZGF0ZS5nZXRTZWNvbmRzKCkpfWBcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuICcnXG4gIH1cbn1cblxuLy8gXHU4M0I3XHU1M0Q2XHU3MjQ4XHU2NzJDXHU1M0Y3XG5mdW5jdGlvbiBnZXRBcHBWZXJzaW9uKCk6IHN0cmluZyB7XG4gIHJldHVybiBgViR7dmVyc2lvbkRhdGEubWFqb3J9LiR7dmVyc2lvbkRhdGEubWlub3J9LiR7dmVyc2lvbkRhdGEucGF0Y2h9YFxufVxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgYmFzZTonLi8nLFxuICBkZWZpbmU6IHtcbiAgICBfX0dJVF9DT01NSVRfREFURV9fOiBKU09OLnN0cmluZ2lmeShnZXRHaXRMYXN0Q29tbWl0RGF0ZSgpKSxcbiAgICBfX0FQUF9WRVJTSU9OX186IEpTT04uc3RyaW5naWZ5KGdldEFwcFZlcnNpb24oKSksXG4gIH0sXG4gIHJlc29sdmU6e1xuICAgIGFsaWFzOiB7XG4gICAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoXCIvVXNlcnMvd3VzaGlqaWFuZy93ZWIvdml0ZS1uYWl2ZS1hZG1pblwiLCBcInNyYy9cIiksXG4gICAgICAgIFwiQHV0aWxzXCI6IHBhdGgucmVzb2x2ZShcIi9Vc2Vycy93dXNoaWppYW5nL3dlYi92aXRlLW5haXZlLWFkbWluXCIsIFwic3JjL3V0aWxzXCIpLFxuICAgICAgICBcIkBwaW5pYVwiOiBwYXRoLnJlc29sdmUoXCIvVXNlcnMvd3VzaGlqaWFuZy93ZWIvdml0ZS1uYWl2ZS1hZG1pblwiLCBcInNyYy9jb25maWcvcGluaWFcIiksXG4gICAgICAgIFwiQGNvbXBvbmVudHNcIjogcGF0aC5yZXNvbHZlKFwiL1VzZXJzL3d1c2hpamlhbmcvd2ViL3ZpdGUtbmFpdmUtYWRtaW5cIiwgXCJzcmMvY29tcG9uZW50c1wiKSxcbiAgICAgICAgXCJAdmlld3NcIjogcGF0aC5yZXNvbHZlKFwiL1VzZXJzL3d1c2hpamlhbmcvd2ViL3ZpdGUtbmFpdmUtYWRtaW5cIiwgXCJzcmMvdmlld3NcIiksXG4gICAgICAgIFwiQGNvbmZpZ1wiOiBwYXRoLnJlc29sdmUoXCIvVXNlcnMvd3VzaGlqaWFuZy93ZWIvdml0ZS1uYWl2ZS1hZG1pblwiLCBcInNyYy9jb25maWdcIiksXG4gICAgICAgIFwiQHR5cGVzXCI6IHBhdGgucmVzb2x2ZShcIi9Vc2Vycy93dXNoaWppYW5nL3dlYi92aXRlLW5haXZlLWFkbWluXCIsIFwic3JjL2NvbmZpZy90eXBlc1wiKSxcbiAgICB9LFxuICAgIGV4dGVuc2lvbnM6IFsnLmpzJywgJy5qc29uJywgJy50cycsICcudnVlJ11cbiAgfSxcbiAgcGx1Z2luczogW1xuICAgICAgdnVlKCksXG4gICAgICBDb21wb25lbnRzKHsgLyogb3B0aW9ucyAqLyB9KSxcbiAgICAgIGxlZ2FjeSgpXG4gIF0sXG4gIGJ1aWxkOntcbiAgICAvLyBzb3VyY2VtYXA6dHJ1ZSxcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDIwMDAsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rcyhpZCkge1xuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnZWNoYXJ0cycpKSB7XG4gICAgICAgICAgICAgIHJldHVybiAndmVuZG9yLWVjaGFydHMnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25haXZlLXVpJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3ItbmFpdmUtdWknXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ2x1Y2t5c2hlZXQnKSB8fCBpZC5pbmNsdWRlcygnbHVja3lleGNlbCcpKSB7XG4gICAgICAgICAgICAgIHJldHVybiAndmVuZG9yLWx1Y2t5c2hlZXQnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3hsc3gnKSB8fCBpZC5pbmNsdWRlcygnc2hlZXRqcycpKSB7XG4gICAgICAgICAgICAgIHJldHVybiAndmVuZG9yLXhsc3gnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ0B3YW5nZWRpdG9yJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3Itd2FuZ2VkaXRvcidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAndmVuZG9yJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sWUFBWTtBQUNuQixTQUFTLGdCQUFnQjs7Ozs7Ozs7OztBQUl6QixTQUFTLHVCQUErQjtBQUN0QyxNQUFJO0FBQ0YsVUFBTSxZQUFZLFNBQVMsMkJBQTJCLEVBQUUsVUFBVSxRQUFRLENBQUMsRUFBRSxLQUFLO0FBQ2xGLFVBQU0sT0FBTyxJQUFJLEtBQUssT0FBTyxTQUFTLElBQUksR0FBSTtBQUM5QyxVQUFNLE1BQU0sQ0FBQyxNQUFjLE9BQU8sQ0FBQyxFQUFFLFNBQVMsR0FBRyxHQUFHO0FBQ3BELFdBQU8sR0FBRyxLQUFLLFlBQVksS0FBSyxJQUFJLEtBQUssU0FBUyxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssUUFBUSxDQUFDLEtBQUssSUFBSSxLQUFLLFNBQVMsQ0FBQyxLQUFLLElBQUksS0FBSyxXQUFXLENBQUMsS0FBSyxJQUFJLEtBQUssV0FBVyxDQUFDO0FBQUEsRUFDNUosUUFBRTtBQUNBLFdBQU87QUFBQSxFQUNUO0FBQ0Y7QUFHQSxTQUFTLGdCQUF3QjtBQUMvQixTQUFPLElBQUksZ0JBQVksU0FBUyxnQkFBWSxTQUFTLGdCQUFZO0FBQ25FO0FBR0EsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBSztBQUFBLEVBQ0wsUUFBUTtBQUFBLElBQ04scUJBQXFCLEtBQUssVUFBVSxxQkFBcUIsQ0FBQztBQUFBLElBQzFELGlCQUFpQixLQUFLLFVBQVUsY0FBYyxDQUFDO0FBQUEsRUFDakQ7QUFBQSxFQUNBLFNBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNILEtBQUssS0FBSyxRQUFRLDBDQUEwQyxNQUFNO0FBQUEsTUFDbEUsVUFBVSxLQUFLLFFBQVEsMENBQTBDLFdBQVc7QUFBQSxNQUM1RSxVQUFVLEtBQUssUUFBUSwwQ0FBMEMsa0JBQWtCO0FBQUEsTUFDbkYsZUFBZSxLQUFLLFFBQVEsMENBQTBDLGdCQUFnQjtBQUFBLE1BQ3RGLFVBQVUsS0FBSyxRQUFRLDBDQUEwQyxXQUFXO0FBQUEsTUFDNUUsV0FBVyxLQUFLLFFBQVEsMENBQTBDLFlBQVk7QUFBQSxNQUM5RSxVQUFVLEtBQUssUUFBUSwwQ0FBMEMsa0JBQWtCO0FBQUEsSUFDdkY7QUFBQSxJQUNBLFlBQVksQ0FBQyxPQUFPLFNBQVMsT0FBTyxNQUFNO0FBQUEsRUFDNUM7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNMLElBQUk7QUFBQSxJQUNKLFdBQVcsQ0FBZ0IsQ0FBQztBQUFBLElBQzVCLE9BQU87QUFBQSxFQUNYO0FBQUEsRUFDQSxPQUFNO0FBQUEsSUFFSix1QkFBdUI7QUFBQSxJQUN2QixlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixhQUFhLElBQUk7QUFDZixjQUFJLEdBQUcsU0FBUyxjQUFjLEdBQUc7QUFDL0IsZ0JBQUksR0FBRyxTQUFTLFNBQVMsR0FBRztBQUMxQixxQkFBTztBQUFBLFlBQ1Q7QUFDQSxnQkFBSSxHQUFHLFNBQVMsVUFBVSxHQUFHO0FBQzNCLHFCQUFPO0FBQUEsWUFDVDtBQUNBLGdCQUFJLEdBQUcsU0FBUyxZQUFZLEtBQUssR0FBRyxTQUFTLFlBQVksR0FBRztBQUMxRCxxQkFBTztBQUFBLFlBQ1Q7QUFDQSxnQkFBSSxHQUFHLFNBQVMsTUFBTSxLQUFLLEdBQUcsU0FBUyxTQUFTLEdBQUc7QUFDakQscUJBQU87QUFBQSxZQUNUO0FBQ0EsZ0JBQUksR0FBRyxTQUFTLGFBQWEsR0FBRztBQUM5QixxQkFBTztBQUFBLFlBQ1Q7QUFDQSxtQkFBTztBQUFBLFVBQ1Q7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
