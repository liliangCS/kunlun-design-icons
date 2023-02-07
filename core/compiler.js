import { writeFileSync, readdirSync } from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function kebab2Pascal(text) {
  const words = text.split("")
  words[0] = words[0].toUpperCase()
  for (let i = 0; i < words.length; i++) {
    if (words[i] === "-") {
      words.splice(i, 1)
      words[i] = words[i].toUpperCase()
    }
  }
  return words.join("")
}

// 读取svg目录结构
const readSvgFile = () => {
  const svgs = []
  const dirs = readdirSync(path.resolve(__dirname, "./icon-svg"))
  dirs.forEach((dir) => {
    const files = readdirSync(path.resolve(__dirname, `./icon-svg/${dir}`))
    files.forEach((file) => {
      const fileName = file.replace(/.svg$/, "")
      svgs.push([dir, fileName])
    })
  })
  return svgs
}

// 生成组件数据
const createCpnData = () => {
  const svgs = readSvgFile()
  const cpns = svgs.map((svg) => {
    const [svgType, svgName] = svg
    const cpnName = kebab2Pascal(svgType + "-" + svgName)
    return { svgType, svgName, cpnName }
  })
  return cpns
}

// 创建组件模板
const createCpnTemplate = (svgType, svgName, cpnName) => {
  return `<template>
    <BaseIcon
        svgType="${svgType}"
        svgName="${svgName}"
        :className="className"
        :color="color"
        :size="size"
    ></BaseIcon>
</template>

<script lang="ts" setup>
import BaseIcon from '../BaseIcon.vue'
export interface IPropsType {
    className?: string
    color?: string
    size?: number
}
defineProps<IPropsType>()
defineOptions({
    name: 'Kl${cpnName}'
})
</script>`
}

// 创建组件
const createCpn = () => {
  const cpns = createCpnData()
  let importStr = ""
  let exportStr = ""
  try {
    cpns.forEach((cpn) => {
      const { svgType, svgName, cpnName } = cpn
      const template = createCpnTemplate(svgType, svgName, cpnName)
      writeFileSync(path.resolve(__dirname, `./icon-vue/${cpnName}.vue`), template)
      importStr += createImportTemplate(cpnName)
      exportStr += createExportTemplate(cpnName)
    })
    writeFileSync(
      path.resolve(__dirname, "./index.ts"),
      "import 'virtual:svg-icons-register'\n;import installer from '../utils/installer';\n"
    )
    writeFileSync(path.resolve(__dirname, "./index.ts"), importStr, {
      flag: "a+"
    })
    writeFileSync(path.resolve(__dirname, "./index.ts"), exportStr, {
      flag: "a+"
    })
    console.log("构建成功")
  } catch (error) {
    console.log("构建失败", error.message)
  }
}

// import模板
const createImportTemplate = (cpnName) => {
  return `import ${cpnName} from "./icon-vue/${cpnName}.vue";\n`
}

// export模板
const createExportTemplate = (cpnName) => {
  return `export const Kl${cpnName} = installer(${cpnName});\n`
}
createCpn()
