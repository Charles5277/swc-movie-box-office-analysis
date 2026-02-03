<script setup lang="ts">
import { weeklyData, formatDateRangeShort } from "~/data/box-office";

const chartData = weeklyData.map((d) => ({
  week: d.week,
  dateRange: d.dateRange,
  revenue: d.revenue / 100_000_000,
}));

const categories = {
  revenue: {
    name: "週票房（億元）",
    color: "#f59e0b",
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

// 計算最高週票房
const maxWeek = chartData.reduce((max, curr) => (curr.revenue > max.revenue ? curr : max));
const maxWeekDateRange = weeklyData.find((d) => d.week === maxWeek.week)?.dateRange ?? "";
</script>

<template>
  <UCard class="transition-shadow duration-200 hover:shadow-lg">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-amber-500/10">
            <UIcon name="i-lucide-trending-up" class="text-xl text-amber-500" />
          </div>
          <div>
            <h3 class="font-semibold text-neutral-800 dark:text-neutral-200">週票房趨勢</h3>
            <p class="text-xs text-neutral-500 dark:text-neutral-400">每週票房收入變化</p>
          </div>
        </div>
        <UBadge color="amber" variant="soft" size="sm">
          最高：{{ formatDateRangeShort(maxWeekDateRange) }}
        </UBadge>
      </div>
    </template>

    <AreaChart
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
