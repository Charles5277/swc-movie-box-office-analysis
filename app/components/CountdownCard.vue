<script setup lang="ts">
import { getGapToFirst, getProgressPercentage, targetRevenue, getLatestCumulativeRevenue } from "~/data/box-office";

const gap = getGapToFirst();
const progress = getProgressPercentage();
const currentRevenue = getLatestCumulativeRevenue();
const isAchieved = gap <= 0;

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
</script>

<template>
  <UCard class="overflow-hidden">
    <div class="flex flex-col lg:flex-row gap-8 items-center">
      <!-- Progress Circle Section -->
      <div class="flex-shrink-0 relative">
        <div
          class="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20 dark:from-amber-500/10 dark:to-orange-500/10 rounded-full blur-2xl scale-150"
        />
        <ProgressCircle
          :value="Math.min(Math.round(progress), 100)"
          :size="180"
          :stroke-width="14"
          text-size="1.75rem"
        />
      </div>

      <!-- Info Section -->
      <div class="flex-1 space-y-6 w-full">
        <!-- Target Info -->
        <div
          class="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200/50 dark:border-amber-700/30"
        >
          <div class="flex-shrink-0 p-2.5 rounded-lg bg-amber-500/10">
            <UIcon name="i-lucide-target" class="text-2xl text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">目標：超越《海角七號》</p>
            <p class="text-xl font-bold text-amber-700 dark:text-amber-300">
              {{ formatCurrency(targetRevenue) }}
            </p>
          </div>
        </div>

        <!-- Stats Grid -->
        <div class="grid gap-4 sm:grid-cols-2">
          <div
            class="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200/50 dark:border-emerald-700/30 transition-transform duration-200 hover:scale-[1.02]"
          >
            <div class="flex items-center gap-2 mb-2">
              <UIcon name="i-lucide-trending-up" class="text-emerald-600 dark:text-emerald-400" />
              <p class="text-sm font-medium text-emerald-700 dark:text-emerald-300">目前票房</p>
            </div>
            <p class="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
              {{ formatCurrency(currentRevenue) }}
            </p>
          </div>

          <div
            :class="[
              'p-5 rounded-xl border transition-transform duration-200 hover:scale-[1.02]',
              isAchieved
                ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200/50 dark:border-emerald-700/30'
                : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200/50 dark:border-rose-700/30',
            ]"
          >
            <div class="flex items-center gap-2 mb-2">
              <UIcon
                :name="isAchieved ? 'i-lucide-check-circle' : 'i-lucide-arrow-up-circle'"
                :class="
                  isAchieved
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-rose-600 dark:text-rose-400'
                "
              />
              <p
                :class="[
                  'text-sm font-medium',
                  isAchieved
                    ? 'text-emerald-700 dark:text-emerald-300'
                    : 'text-rose-700 dark:text-rose-300',
                ]"
              >
                {{ isAchieved ? "已達成" : "還需要" }}
              </p>
            </div>
            <p
              :class="[
                'text-2xl font-bold',
                isAchieved
                  ? 'text-emerald-700 dark:text-emerald-300'
                  : 'text-rose-700 dark:text-rose-300',
              ]"
            >
              {{ isAchieved ? "目標達成!" : formatCurrency(gap) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>
