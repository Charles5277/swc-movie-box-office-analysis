<script setup lang="ts">
import { weeklyData, calculateDerivedMetrics, formatDateRangeShort } from "~/data/box-office";

const OFFICIAL_RELEASE_WEEK = 5;

const metrics = calculateDerivedMetrics(weeklyData);

// 只顯示正式上映後的數據（第 5 週起），排除試映期異常數據
const chartData = metrics
  .filter((m) => m.week >= OFFICIAL_RELEASE_WEEK)
  .map((m) => {
    const weekData = weeklyData.find((w) => w.week === m.week);
    return {
      week: m.week,
      dateRange: weekData?.dateRange ?? "",
      decayRate: m.decayRate !== null ? Number(m.decayRate.toFixed(2)) : 0,
      baseline: 1, // 基準線 = 1（持平）
    };
  });

const categories = {
  decayRate: {
    name: "週變動係數",
    color: "#8b5cf6", // violet-500
  },
  baseline: {
    name: "基準線（持平）",
    color: "#6b7280", // gray-500
  },
};

const xFormatter = (i: number) => {
  const d = chartData[i];
  return d ? formatDateRangeShort(d.dateRange) : "";
};

// 響應式 x 軸刻度數量
const { xNumTicks } = useChartTicks(chartData.length);

// 計算統計
const growthWeeks = chartData.filter((d) => d.decayRate > 1).length;
const decayWeeks = chartData.filter((d) => d.decayRate < 1 && d.decayRate > 0).length;
const avgDecayRate =
  chartData.length > 0 ? chartData.reduce((sum, d) => sum + d.decayRate, 0) / chartData.length : 0;

// 近 3 週趨勢
const recent3 = chartData.slice(-3);
const recentAvg =
  recent3.length > 0 ? recent3.reduce((sum, d) => sum + d.decayRate, 0) / recent3.length : 0;
const trend = recentAvg >= 1 ? "成長" : "衰退";
const trendColor = recentAvg >= 1 ? "success" : "warning";
</script>

<template>
  <UCard class="transition-shadow duration-200 hover:shadow-lg">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-violet-500/10">
            <UIcon name="i-lucide-activity" class="text-xl text-violet-500" />
          </div>
          <div>
            <h3 class="font-semibold text-neutral-800 dark:text-neutral-200">週變動係數</h3>
            <p class="text-xs text-neutral-500 dark:text-neutral-400">
              本週票房 / 上週票房（&gt;1 成長, &lt;1 衰退）
            </p>
          </div>
        </div>
        <UBadge :color="trendColor" variant="soft" size="sm"> 近期趨勢：{{ trend }} </UBadge>
      </div>
    </template>

    <BarChart
      :data="chartData"
      :categories="categories"
      :height="256"
      :x-formatter="xFormatter"
      :x-num-ticks="xNumTicks"
      x-label="日期"
      :y-axis="['decayRate', 'baseline']"
      :bar-padding="0.35"
      :group-padding="0.15"
    />

    <template #footer>
      <div class="grid grid-cols-4 gap-3">
        <div class="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-center">
          <p class="text-xs text-emerald-600 dark:text-emerald-400 mb-1">成長週數</p>
          <p class="font-bold text-emerald-700 dark:text-emerald-300">{{ growthWeeks }} 週</p>
        </div>
        <div class="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-center">
          <p class="text-xs text-red-600 dark:text-red-400 mb-1">衰退週數</p>
          <p class="font-bold text-red-700 dark:text-red-300">{{ decayWeeks }} 週</p>
        </div>
        <div class="p-3 rounded-lg bg-violet-50 dark:bg-violet-900/20 text-center">
          <p class="text-xs text-violet-600 dark:text-violet-400 mb-1">平均係數</p>
          <p class="font-bold text-violet-700 dark:text-violet-300">
            {{ avgDecayRate.toFixed(2) }}
          </p>
        </div>
        <div class="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-center">
          <p class="text-xs text-amber-600 dark:text-amber-400 mb-1">近 3 週平均</p>
          <p class="font-bold text-amber-700 dark:text-amber-300">{{ recentAvg.toFixed(2) }}</p>
        </div>
      </div>
    </template>
  </UCard>
</template>
