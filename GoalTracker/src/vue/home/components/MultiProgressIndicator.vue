<script setup lang="ts">
import { computed } from 'vue'
import { ProgressIndicator, ProgressRoot } from 'radix-vue'
import { cn } from '@/lib/utils'

const { goal, current, colors } = defineProps<{
  goal: number
  current: Array<number>
  colors: Array<string>
}>()

const summedIndicators = computed(() => {
  let lastProgress = 0
  const progressArray: Array<number> = []

  for (let i = 0; i < current.length; i++) {
    const currentSingle = current[i] + lastProgress
    progressArray.push(currentSingle)
    lastProgress = currentSingle
  }

  return progressArray
})
</script>

<template>
  <!--  TODO: PROBLEM LEFT BR CAUSES COLOR OVERFLOW-->
  <ProgressRoot
    :max="goal"
    :class="cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary')"
  >
    <ProgressIndicator
      v-for="(progress, index) in summedIndicators"
      :key="progress"
      class="progress-indicator h-full w-full flex-1 bg-primary rounded-full transition-all absolute overflow-hidden"
      :style="`transform: translateX(-${100 - (progress ?? 0)}%);
      background-color: ${colors[index]}; z-index:${100 - index}`"
    />
  </ProgressRoot>
</template>

<style scoped></style>
