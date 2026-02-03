<script setup lang="ts">
import {
  weeklyData,
  targetRevenue,
  getProgressPercentage,
  formatDateRangeShort,
} from "~/data/box-office";

// 只顯示實際資料
const chartData = weeklyData.map((d) => ({
  week: d.week,
  dateRange: d.dateRange,
  cumulative: d.cumulativeRevenue / 100_000_000,
  target: targetRevenue / 100_000_000,
}));

const categories = {
  cumulative: {
    name: "累計票房（億元）",
    color: "#10b981",
  },
  target: {
    name: "目標（海角七號）",
    color: "#ef4444",
  },
};

const xFormatter = (i: number) => {
  const d = chartData[i];
  return d ? formatDateRangeShort(d.dateRange) : "";
};

const yFormatter = (tick: number) => (tick === 0 ? "0" : `${tick.toFixed(1)} 億`);

// 限制 Y 軸最多顯示 6 個刻度
const yNumTicks = 6;

// 響應式 x 軸刻度數量
const { xNumTicks } = useChartTicks(chartData.length);

const progress = Math.round(getProgressPercentage());
</script>

<template>
  <UCard class="transition-shadow duration-200 hover:shadow-lg">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-emerald-500/10">
            <UIcon name="i-lucide-chart-line" class="text-xl text-emerald-500" />
          </div>
          <div>
            <h3 class="font-semibold text-neutral-800 dark:text-neutral-200">累計票房</h3>
            <p class="text-xs text-neutral-500 dark:text-neutral-400">票房累積成長曲線</p>
          </div>
        </div>
        <UBadge :color="progress >= 100 ? 'success' : 'warning'" variant="soft" size="sm">
          達成率：{{ progress }}%
        </UBadge>
      </div>
    </template>

    <LineChart
      :data="chartData"
      :categories="categories"
      :height="256"
      :x-formatter="xFormatter"
      :x-num-ticks="xNumTicks"
      :y-formatter="yFormatter"
      :y-num-ticks="yNumTicks"
      x-label="日期"
    />
  </UCard>
</template>
