<script setup lang="ts">
import { weeklyData, formatDateRangeShort } from '~/data/box-office'

// 準備圖表資料，排除第一週（無增長率）
const chartData = weeklyData.slice(1).map((d) => ({
  week: d.week,
  dateRange: d.dateRange,
  changeRate: d.changeRate ?? 0,
  theaters: d.theaters,
}))

const categories = {
  changeRate: {
    name: '週增長率（%）',
    color: '#10b981', // emerald-500 - 成長指標
  },
  theaters: {
    name: '上映院數',
    color: '#8b5cf6', // violet-500 - 次要資訊
  },
}

const xFormatter = (i: number) => {
  const d = chartData[i]
  return d ? formatDateRangeShort(d.dateRange) : ''
}

// 找出最大增長週
const maxGrowthWeek = chartData.reduce((max, curr) =>
  curr.changeRate > max.changeRate ? curr : max,
)
</script>

<template>
  <UCard class="transition-shadow duration-200 hover:shadow-lg">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-emerald-500/10">
            <UIcon name="i-lucide-activity" class="text-xl text-emerald-500" />
          </div>
          <div>
            <h3 class="font-semibold text-neutral-800 dark:text-neutral-200">增長率 vs 院數</h3>
            <p class="text-xs text-neutral-500 dark:text-neutral-400">戲院數與票房增長關聯</p>
          </div>
        </div>
        <UBadge color="emerald" variant="soft" size="sm">
          最高：+{{ maxGrowthWeek.changeRate.toFixed(0) }}%
        </UBadge>
      </div>
    </template>

    <BarChart
      :data="chartData"
      :categories="categories"
      :height="256"
      :x-formatter="xFormatter"
      :x-num-ticks="Math.ceil(chartData.length * 2 / 3)"
      x-label="日期"
      :y-axis="['changeRate', 'theaters']"
      :bar-padding="0.35"
      :group-padding="0.15"
    />

    <template #footer>
      <div class="space-y-2 text-xs">
        <div class="flex items-start gap-2 p-2.5 rounded-lg bg-violet-50 dark:bg-violet-900/20 border border-violet-200/50 dark:border-violet-700/30">
          <UIcon name="i-lucide-zap" class="text-violet-500 flex-shrink-0 mt-0.5" />
          <span class="text-violet-700 dark:text-violet-300">第 4 週戲院從 2 家擴展至 88 家，帶動 1473% 爆發性增長</span>
        </div>
        <div class="flex items-start gap-2 p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/50 dark:border-emerald-700/30">
          <UIcon name="i-lucide-sparkles" class="text-emerald-500 flex-shrink-0 mt-0.5" />
          <span class="text-emerald-700 dark:text-emerald-300">第 7-8 週維持 88-89 家戲院，票房仍有 125-281% 成長，顯示口碑效應</span>
        </div>
      </div>
    </template>
  </UCard>
</template>
