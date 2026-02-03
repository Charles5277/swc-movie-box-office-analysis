<script setup lang="ts">
import { weeklyData, formatDateRangeShort } from "~/data/box-office";

// 準備圖表資料：累計票數（萬）與累計票房（億元）
const chartData = weeklyData.map((d) => ({
  week: d.week,
  dateRange: d.dateRange,
  cumulativeTickets: d.cumulativeTickets / 10_000,
  cumulativeRevenue: d.cumulativeRevenue / 100_000_000,
}));

const categories = {
  cumulativeTickets: {
    name: "累計人次（萬）",
    color: "#10b981", // emerald-500 - 人次指標
  },
  cumulativeRevenue: {
    name: "累計票房（億元）",
    color: "#f59e0b", // amber-500 - 主要票房數據
  },
};

const xFormatter = (i: number) => {
  const d = chartData[i];
  return d ? formatDateRangeShort(d.dateRange) : "";
};

// 響應式 x 軸刻度數量
const { xNumTicks } = useChartTicks(chartData.length);

// 里程碑資料
const milestones = [
  { tickets: 10, label: "10萬人" },
  { tickets: 50, label: "50萬人" },
  { tickets: 100, label: "100萬人" },
];

const latestTickets = weeklyData[weeklyData.length - 1]?.cumulativeTickets ?? 0;
const formatTickets = new Intl.NumberFormat("zh-TW").format(Math.round(latestTickets));
</script>

<template>
  <UCard class="transition-shadow duration-200 hover:shadow-lg">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-emerald-500/10">
            <UIcon name="i-lucide-users" class="text-xl text-emerald-500" />
          </div>
          <div>
            <h3 class="font-semibold text-neutral-800 dark:text-neutral-200">累計觀影人次</h3>
            <p class="text-xs text-neutral-500 dark:text-neutral-400">票房與人次累積成長</p>
          </div>
        </div>
        <UBadge color="emerald" variant="soft" size="sm"> {{ formatTickets }} 人次 </UBadge>
      </div>
    </template>

    <LineChart
      :data="chartData"
      :categories="categories"
      :height="256"
      :x-formatter="xFormatter"
      :x-num-ticks="xNumTicks"
      x-label="日期"
    />

    <template #footer>
      <div class="flex flex-wrap gap-2">
        <div
          v-for="m in milestones"
          :key="m.tickets"
          :class="[
            'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
            latestTickets >= m.tickets * 10_000
              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400',
          ]"
        >
          <UIcon
            :name="
              latestTickets >= m.tickets * 10_000 ? 'i-lucide-check-circle' : 'i-lucide-circle'
            "
            :class="latestTickets >= m.tickets * 10_000 ? 'text-emerald-500' : 'text-neutral-400'"
          />
          {{ m.label }}
        </div>
      </div>
    </template>
  </UCard>
</template>
