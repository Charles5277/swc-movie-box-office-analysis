<script setup lang="ts">
import { weeklyData, calculateDerivedMetrics, formatDateRangeShort } from "~/data/box-office";

const metrics = calculateDerivedMetrics(weeklyData);

// 計算整體平均票價
const totalRevenue = weeklyData.reduce((sum, w) => sum + w.revenue, 0);
const totalTickets = weeklyData.reduce((sum, w) => sum + w.tickets, 0);
const overallAveragePrice = totalTickets > 0 ? totalRevenue / totalTickets : 0;

const chartData = metrics.map((m, i) => ({
  week: m.week,
  dateRange: weeklyData[i]?.dateRange ?? "",
  price: Math.round(m.averageTicketPrice),
  average: Math.round(overallAveragePrice),
}));

const categories = {
  price: {
    name: "週平均票價（元）",
    color: "#f59e0b", // amber-500 - 主要數據
  },
  average: {
    name: "整體平均票價",
    color: "#6b7280", // neutral - 基準線
  },
};

const xFormatter = (i: number) => {
  const d = chartData[i];
  return d ? formatDateRangeShort(d.dateRange) : "";
};

// 響應式 x 軸刻度
const { xExplicitTicks } = useChartTicks(chartData.length);

const minPrice = Math.min(...chartData.map((d) => d.price));
const maxPrice = Math.max(...chartData.map((d) => d.price));
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
            <h3 class="font-semibold text-neutral-800 dark:text-neutral-200">平均票價趨勢</h3>
            <p class="text-xs text-neutral-500 dark:text-neutral-400">每週平均票價變化</p>
          </div>
        </div>
        <UBadge color="neutral" variant="soft" size="sm">
          平均 {{ Math.round(overallAveragePrice) }} 元
        </UBadge>
      </div>
    </template>

    <LineChart
      :data="chartData"
      :categories="categories"
      :height="256"
      :x-formatter="xFormatter"
      :x-explicit-ticks="xExplicitTicks"
      x-label="日期"
      y-label="元"
    />

    <template #footer>
      <div class="grid grid-cols-3 gap-4 text-sm">
        <div>
          <span class="text-neutral-500 dark:text-neutral-400">最低票價</span>
          <p class="font-semibold text-neutral-800 dark:text-neutral-200">{{ minPrice }} 元</p>
        </div>
        <div>
          <span class="text-neutral-500 dark:text-neutral-400">最高票價</span>
          <p class="font-semibold text-neutral-800 dark:text-neutral-200">{{ maxPrice }} 元</p>
        </div>
        <div>
          <span class="text-neutral-500 dark:text-neutral-400">價差</span>
          <p class="font-semibold text-neutral-800 dark:text-neutral-200">
            {{ maxPrice - minPrice }} 元
          </p>
        </div>
      </div>
    </template>
  </UCard>
</template>
