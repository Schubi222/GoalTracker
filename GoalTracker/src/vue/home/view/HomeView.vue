<script setup lang="ts">
import { Card, CardHeader } from '@/components/ui/card'
import GoalCard from '@/vue/home/components/GoalCard.vue'
const firstProgressData = {
  goalName: 'Road to a million',
  description: 'My journey to a million before 30',
  goal: 1000000,
  current: 22000,
  color: 'hsla(142.1 70.6% 45.3%)'
}
</script>

<template>
  <div class="Dashboard-Wrapper">
    <GoalCard
      :goalName="firstProgressData.goalName"
      :description="firstProgressData.description"
      :goal="firstProgressData.goal"
      :currentProgress="firstProgressData.current"
      :color="firstProgressData.color"
    />
  </div>
</template>
