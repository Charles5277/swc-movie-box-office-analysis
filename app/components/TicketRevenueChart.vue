<script setup lang="ts">
import { weeklyData, formatDateRangeShort } from '~/data/box-office'

// 準備圖表資料：週票房（億元）與週票數（萬）
const chartData = weeklyData.map((d) => ({
  week: d.week,
  dateRange: d.dateRange,
  revenue: d.revenue / 100_000_000,
  tickets: d.tickets / 10_000,
}))

const categories = {
  revenue: {
    name: '週票房（億元）',
    color: '#f59e0b', // amber-500 - 主要票房數據
  },
  tickets: {
    name: '週票數（萬人）',
    color: '#10b981', // emerald-500 - 次要指標
  },
}

const xFormatter = (i: number) => {
  const d = chartData[i]
  return d ? formatDateRangeShort(d.dateRange) : ''
}

const yFormatter = (tick: number) => tick === 0 ? '0' : `${tick.toFixed(1)} 億`

// 限制 Y 軸最多顯示 6 個刻度
const yNumTicks = 6

// 計算平均票價
const avgPrices = weeklyData.map((d) => ({
  week: d.week,
  dateRange: d.dateRange,
  avgPrice: d.tickets > 0 ? Math.round(d.revenue / d.tickets) : 0,
}))

// 計算整體平均票價
const totalRevenue = weeklyData.reduce((sum, d) => sum + d.revenue, 0)
const totalTickets = weeklyData.reduce((sum, d) => sum + d.tickets, 0)
const overallAvgPrice = Math.round(totalRevenue / totalTickets)
</script>

<template>
  <UCard class="transition-shadow duration-200 hover:shadow-lg">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-amber-500/10">
            <UIcon name="i-lucide-ticket" class="text-xl text-amber-500" />
          </div>
          <div>
            <h3 class="font-semibold text-neutral-800 dark:text-neutral-200">票房 vs 人次</h3>
            <p class="text-xs text-neutral-500 dark:text-neutral-400">收入與觀影人數對應關係</p>
          </div>
        </div>
        <UBadge color="amber" variant="soft" size="sm">
          平均票價：NT${{ overallAvgPrice }}
        </UBadge>
      </div>
    </template>

    <AreaChart
      :data="chartData"
      :categories="categories"
      :height="256"
      :x-formatter="xFormatter"
      :x-num-ticks="Math.ceil(chartData.length * 2 / 3)"
      :y-formatter="yFormatter"
      :y-num-ticks="yNumTicks"
      x-label="日期"
    />

    <template #footer>
      <div class="flex flex-wrap gap-3 text-xs">
        <div
          v-for="item in avgPrices.slice(-4)"
          :key="item.week"
          class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800"
        >
          <span class="text-neutral-500 dark:text-neutral-400">{{ formatDateRangeShort(item.dateRange) }}</span>
          <span class="font-medium text-amber-600 dark:text-amber-400">NT${{ item.avgPrice }}</span>
        </div>
      </div>
    </template>
  </UCard>
</template>
