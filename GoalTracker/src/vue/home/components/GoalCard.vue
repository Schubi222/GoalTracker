<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { computed } from 'vue'
const { className, goalName, description, goal, color, currentProgress, unit } = defineProps<{
  goalName: string
  description?: string
  goal: number
  currentProgress: number
  color?: string
  unit?: string
  className?: string
}>()

const normalizedProgress = computed(() => {
  return ((currentProgress ? currentProgress : 1) / goal) * 100
})
const percentProgress = computed(() => {
  return normalizedProgress.value.toFixed(3) + '%'
})
</script>

<template>
  <Card :class="className">
    <CardHeader>
      <CardTitle>{{ goalName }}</CardTitle>
      <CardDescription v-if="description">{{ description }}</CardDescription>
    </CardHeader>
    <CardContent>
      <Progress :model-value="normalizedProgress" class="progress-bar" :color="color" />
      <!--      <MultiProgressIndicator
        :goal="100"
        :current="[5, 20, 50]"
        :colors="['#bef264', '#0ea5e9', '#9333ea']"
      />-->
      <div class="numerical-progress">
        {{ currentProgress }}{{ unit }}/{{ goal }}{{ unit }} ({{ percentProgress }})
      </div>
    </CardContent>
  </Card>
</template>

<style scoped lang="scss">
.no-rounded-top {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.not-corner {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-left: none !important;
  border-right: none !important;
}
</style>
