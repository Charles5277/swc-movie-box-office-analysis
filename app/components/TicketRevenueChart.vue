<script setup lang="ts">
import { weeklyData, formatDateRangeShort } from "~/data/box-office";

// 準備圖表資料：週票房（億元）
const chartData = weeklyData.map((d) => ({
  week: d.week,
  dateRange: d.dateRange,
  revenue: d.revenue / 100_000_000,
}));

const categories = {
  revenue: {
    name: "週票房（億元）",
    color: "#f59e0b", // amber-500
  },
};

const xFormatter = (i: number) => {
  const d = chartData[i];
  return d ? formatDateRangeShort(d.dateRange) : "";
};

const yFormatter = (tick: number) => (tick === 0 ? "0" : `${tick.toFixed(1)}`);

// 限制 Y 軸最多顯示 6 個刻度
const yNumTicks = 6;

// 響應式 x 軸刻度
const { xExplicitTicks } = useChartTicks(chartData.length);

// 計算人次相關輔助資訊
const latestWeek = weeklyData[weeklyData.length - 1];
const latestTickets = latestWeek?.tickets ?? 0;
const formatLatestTickets = new Intl.NumberFormat("zh-TW").format(latestTickets);

// 計算整體平均票價
const totalRevenue = weeklyData.reduce((sum, d) => sum + d.revenue, 0);
const totalTickets = weeklyData.reduce((sum, d) => sum + d.tickets, 0);
const overallAvgPrice = Math.round(totalRevenue / totalTickets);

// 最近 4 週人次資料
const recentTickets = weeklyData.slice(-4).map((d) => ({
  week: d.week,
  dateRange: d.dateRange,
  tickets: d.tickets,
}));
</script>

<template>
  <UCard class="transition-shadow duration-200 hover:shadow-lg">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-amber-500/10">
            <UIcon name="i-lucide-banknote" class="text-xl text-amber-500" />
          </div>
          <div>
            <h3 class="font-semibold text-neutral-800 dark:text-neutral-200">週票房收入</h3>
            <p class="text-xs text-neutral-500 dark:text-neutral-400">
              本週人次：{{ formatLatestTickets }} 人
            </p>
          </div>
        </div>
        <UBadge color="amber" variant="soft" size="sm"> 平均票價：NT${{ overallAvgPrice }} </UBadge>
      </div>
    </template>

    <AreaChart
      :data="chartData"
      :categories="categories"
      :height="256"
      :x-formatter="xFormatter"
      :x-explicit-ticks="xExplicitTicks"
      :y-formatter="yFormatter"
      :y-num-ticks="yNumTicks"
      x-label="日期"
      y-label="億元"
    />

    <template #footer>
      <div class="flex flex-wrap gap-3 text-xs">
        <span class="text-neutral-500 dark:text-neutral-400 self-center">近 4 週人次：</span>
        <div
          v-for="item in recentTickets"
          :key="item.week"
          class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800"
        >
          <span class="text-neutral-500 dark:text-neutral-400">{{
            formatDateRangeShort(item.dateRange)
          }}</span>
          <span class="font-medium text-emerald-600 dark:text-emerald-400">
            {{ new Intl.NumberFormat("zh-TW").format(item.tickets) }}
          </span>
        </div>
      </div>
    </template>
  </UCard>
</template>
