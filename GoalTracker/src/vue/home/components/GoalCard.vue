<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { computed } from 'vue'
const { startDate, className, goalName, description, goal, color, currentProgress, unit } =
  defineProps<{
    goalName: string
    description?: string
    goal: number
    currentProgress: number
    color?: string
    unit?: string
    className?: string
    startDate?: string
  }>()

const normalizedProgress = computed(() => {
  return ((currentProgress ? currentProgress : 1) / goal) * 100
})
const percentProgress = computed(() => {
  return normalizedProgress.value.toFixed(2) + '%'
})
</script>

<template>
  <Card :class="className">
    <CardHeader>
      <div class="top">
        <CardTitle>{{ goalName }}</CardTitle>
        <div class="timestamp">{{ startDate }}</div>
      </div>

      <CardDescription v-if="description">{{ description }}</CardDescription>
    </CardHeader>
    <CardContent>
      <Progress :model-value="normalizedProgress" class="progress-bar" :color="color" />
      <div class="numerical-progress">
        {{ currentProgress }}{{ unit }} / {{ goal }}{{ unit }} ({{ percentProgress }})
      </div>
    </CardContent>
  </Card>
</template>

<style scoped lang="scss">
.top-card {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.no-rounded-top {
  border-radius: 0 !important;
  box-shadow: none !important ;
}
.not-edge {
  border-left: none !important;
  border-right: none !important;
  border-top: none !important;
}
.edge-left {
  border-top: none !important;
}
.edge-right {
  border-top: none !important;
}
.top {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
</style>
