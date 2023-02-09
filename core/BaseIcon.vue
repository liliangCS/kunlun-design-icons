<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
    :style="{ color: color, width: size + 'px', height: size + 'px' }"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue"
export interface IPropsType {
  svgName: string
  svgType: string
  className?: string
  color?: string
  size?: number | string
}
const props = defineProps<IPropsType>()
const svgClass = computed(() => {
  return props.className ? `icon ${props.className}` : "icon"
})
const symbolId = computed(() => `#icon-${props.svgType}-${props.svgName}`)
</script>

<style scope>
.icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
