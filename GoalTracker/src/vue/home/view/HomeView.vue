<script setup lang="ts">
import GoalCard from '@/vue/home/components/GoalCard.vue'
import { computed } from 'vue'
const firstProgressData = {
  goalName: 'Road to a million',
  description: 'My journey to a million before 30',
  goal: 1000000,
  currentProgress: [
    { value: 19336, label: 'Investments', unit: '€', color: '#4ade80' },
    { value: 2920, label: 'Bargeld', unit: '€', color: '#374151' },
    { value: 850, label: 'Gold', unit: '€', color: '#fbbf24' }
  ],
  current: 22000
}
</script>

<template>
  <div class="Dashboard-Wrapper">
    <GoalCard
      v-for="progress in firstProgressData.currentProgress"
      :key="progress.label"
      :goalName="progress.label"
      :goal="firstProgressData.goal"
      :currentProgress="progress.value"
      :color="progress.color"
      :unit="progress.unit"
    />
  </div>
</template>
