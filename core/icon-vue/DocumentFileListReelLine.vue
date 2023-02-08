<template>
  <BaseIcon
    svgType="document"
    svgName="file-list-reel-line"
    :className="className"
    :color="color"
    :size="size"
  ></BaseIcon>
</template>

<script lang="ts" setup>
import BaseIcon from "../BaseIcon.vue"
export interface IPropsType {
  className?: string
  color?: string
  size?: number
}
defineProps<IPropsType>()
defineOptions({
  name: "KlDocumentFileListReelLine"
})
</script>
