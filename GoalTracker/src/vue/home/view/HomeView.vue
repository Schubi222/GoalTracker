<script setup lang="ts">
import GoalCard from '@/vue/home/components/GoalCard.vue'
import { computed } from 'vue'
const firstProgressData = {
  goalName: 'Road to a million',
  description: 'My journey to a million before 30',
  goal: 1000000,
  unit: '€',
  currentProgress: [
    { value: 19336, label: 'Investments', unit: '€', color: '#4ade80' },
    { value: 2920, label: 'Bargeld', unit: '€', color: '#374151' },
    { value: 850, label: 'Gold', unit: '€', color: '#fbbf24' }
  ]
}

const totalProgress = computed(() => {
  return firstProgressData.currentProgress.reduce((a, b) => a + b.value, 0)
})
</script>

<template>
  <div class="Dashboard-Wrapper">
    <div class="progress-indicators">
      <div class="total-progress">
        <GoalCard
          :goal-name="firstProgressData.goalName"
          :goal="firstProgressData.goal"
          :current-progress="totalProgress"
          :description="firstProgressData.description"
          color="#22d3ee"
          :unit="firstProgressData.unit"
        />
      </div>
      <div class="separated-progresses">
        <GoalCard
          v-for="(progress, index) in firstProgressData.currentProgress"
          :key="progress.label"
          :goalName="progress.label"
          :goal="totalProgress"
          :currentProgress="progress.value"
          :color="progress.color"
          :unit="progress.unit"
          :className="`no-rounded-top ${index !== 0 && index !== firstProgressData.currentProgress.length - 1 ? 'not-corner' : 'corner'}`"
        />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.progress-indicators {
  max-width: 500px;
}
.separated-progresses {
  display: flex;
}
</style>
