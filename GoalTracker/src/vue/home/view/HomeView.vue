<script setup lang="ts">
import GoalCard from '@/vue/home/components/GoalCard.vue'
import { DateTime } from 'luxon'
import { computed, onMounted, ref } from 'vue'
const firstProgressData = {
  goalName: 'Road to a million',
  description: 'My journey to a million before 30',
  goal: 1000000,
  unit: '€',
  startTimeStampUnix: 1697027563,
  projectedCompoundEffect: 11,
  currentProgress: [
    { value: 19336, label: 'Investments', unit: '€', color: '#4ade80' },
    { value: 2920, label: 'Bargeld', unit: '€', color: '#374151' },
    { value: 850, label: 'Gold', unit: '€', color: '#fbbf24' }
  ]
}
const compoundTable = ref<Array<{ timestamp: string; value: number }>>([])

const totalProgress = computed(() => {
  return firstProgressData.currentProgress.reduce((a, b) => a + b.value, 0)
})
function getPositionClass(index: number) {
  if (index === 0) return 'edge-left'
  if (index === firstProgressData.currentProgress.length - 1) return 'edge-right'
  return 'not-edge'
}

const startDate = computed(() => {
  const date = DateTime.fromMillis(firstProgressData.startTimeStampUnix * 1000)
  return date.toLocaleString(DateTime.DATETIME_SHORT)
})

const projectedFinish = computed(() => {
  const start = DateTime.fromMillis(firstProgressData.startTimeStampUnix * 1000)
  const now = DateTime.now()
  const dif = start.diffNow().as('milliseconds') * -1
  const multiplesTillFinish = firstProgressData.goal / totalProgress.value
  return now.plus({ milliseconds: multiplesTillFinish * dif }).toLocaleString(DateTime.DATE_SHORT)
})

function progressInYear(dif: number, progress: number) {
  const year = 31556926 * 1000
  const yearMultiples = year / dif
  return progress / yearMultiples
}

function calculateCompoundTable() {
  const year = 31556926 * 1000
  const start = DateTime.fromMillis(firstProgressData.startTimeStampUnix * 1000)
  const now = DateTime.now()
  const dif = start.diffNow().as('milliseconds') * -1
  let totalTimeToAdd = 0
  let totalProgressAdded = totalProgress.value
  const progressYear = progressInYear(dif, totalProgress.value)
  while (totalProgressAdded < firstProgressData.goal) {
    console.log(firstProgressData)
    totalProgressAdded += progressYear
    totalTimeToAdd += year
    if (totalProgressAdded < firstProgressData.goal) {
      totalProgressAdded =
        totalProgressAdded * (1 + firstProgressData.projectedCompoundEffect / 100)
    }
    totalProgressAdded = Math.round(totalProgressAdded)
    compoundTable.value.push({
      value: totalProgressAdded,
      timestamp: now.plus({ milliseconds: totalTimeToAdd }).toLocaleString(DateTime.DATE_SHORT)
    })
  }
}

onMounted(() => {
  calculateCompoundTable()
})

// const finishWithCompound = computed(() => {
//   return compoundTable.value?.at(0)?.timestamp
// })
</script>

<template>
  <div class="Dashboard-Wrapper">
    <div class="heading">Dashboard</div>
    <div class="progress-indicators">
      <div class="total-progress">
        <GoalCard
          :goal-name="firstProgressData.goalName"
          :goal="firstProgressData.goal"
          :current-progress="totalProgress"
          :description="firstProgressData.description"
          color="#22d3ee"
          :unit="firstProgressData.unit"
          :className="'top-card'"
          :startDate="startDate"
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
          :className="`no-rounded-top ${getPositionClass(index)}`"
        />
      </div>
      <div class="prediction">If you keep this pace you will finish on: {{ projectedFinish }}</div>
      <div class="prediction">
        With the projected compound rate of {{ firstProgressData.projectedCompoundEffect }}% you
        will finish on: {{ compoundTable?.at(-1)?.timestamp }}
      </div>
      <div class="prediction" v-if="compoundTable.length">
        <div class="row" v-for="year in compoundTable" :key="year.timestamp">
          Year: {{ year.timestamp }} - {{ year.value }}€
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.prediction {
  width: 100%;
  color: var(--Gray-950);
  background: white;
  z-index: 1;
  padding: 10px;
}
.Dashboard-Wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background: var(--blue-700);
  color: var(--yellow-100);
}
.heading {
  padding: 1rem 0;
  font-size: 54px;
  font-weight: 500;
}
.progress-indicators {
  max-width: 500px;
}
.separated-progresses {
  display: flex;
}
</style>
