<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { computed } from 'vue'
const { goalName, description, goal, color, currentProgress } = defineProps<{
  goalName: string
  description?: string
  goal: number
  currentProgress: number
  color?: string
}>()

const normalizedProgress = computed(() => {
  return ((currentProgress ? currentProgress : 1) / goal) * 100
})
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>{{ goalName }}</CardTitle>
      <CardDescription v-if="description">{{ description }}</CardDescription>
    </CardHeader>
    <CardContent>
      <Progress :model-value="normalizedProgress" class="progress-bar" />
    </CardContent>
  </Card>
</template>

<style scoped>
.progress-bar > :deep(.progress-indicator) {
  background: v-bind(color);
}
</style>
