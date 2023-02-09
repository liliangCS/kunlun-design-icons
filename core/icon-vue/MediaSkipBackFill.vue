<template>
  <BaseIcon
    svgType="media"
    svgName="skip-back-fill"
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
  size?: number | string
}
defineProps<IPropsType>()
defineOptions({
  name: "KlMediaSkipBackFill"
})
</script>
