<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { computed } from 'vue'
import MultiProgressIndicator from '@/vue/home/components/MultiProgressIndicator.vue'
const { goalName, description, goal, color, currentProgress, unit } = defineProps<{
  goalName: string
  description?: string
  goal: number
  currentProgress: number
  color?: string
  unit?: string
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
      <Progress :model-value="normalizedProgress" class="progress-bar" :color="color" />
      <!--      <MultiProgressIndicator
        :goal="100"
        :current="[5, 20, 50]"
        :colors="['#bef264', '#0ea5e9', '#9333ea']"
      />-->
      <div class="numerical-progress">{{ currentProgress }}{{ unit }}/{{ goal }}{{ unit }}</div>
    </CardContent>
  </Card>
</template>

<style scoped></style>
