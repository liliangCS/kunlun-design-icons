import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import DefineOptions from "unplugin-vue-define-options/vite"
import path from "path"

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: path.resolve(__dirname, "core/index.ts"),
      name: "KlIcon",
      // the proper extensions will be added
      fileName: "kl-icon"
    },
    outDir: path.resolve(__dirname, "kunlun-design-icons/lib"),
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue"
        }
      }
    }
  },
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "core/icon-svg")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]"
    }),
    DefineOptions()
  ]
})
