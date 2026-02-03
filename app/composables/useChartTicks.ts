import { useBreakpoints } from "@vueuse/core";

/**
 * 根據螢幕寬度計算合適的圖表 x 軸刻度
 * 確保在手機上不會重疊，同時保證頭尾日期顯示
 */
export function useChartTicks(dataLength: number) {
  const breakpoints = useBreakpoints({
    sm: 640,
    md: 768,
    lg: 1024,
  });

  const isMobile = breakpoints.smaller("sm");
  const isTablet = breakpoints.between("sm", "md");

  // 根據螢幕尺寸決定最大刻度數（包含頭尾）
  const maxTicks = computed(() => {
    if (isMobile.value) {
      // 手機：最多 3 個刻度（頭、中、尾）
      return Math.min(3, dataLength);
    } else if (isTablet.value) {
      // 平板：最多 5 個刻度
      return Math.min(5, dataLength);
    } else {
      // 桌面：顯示較多刻度
      return Math.min(9, dataLength);
    }
  });

  // 計算明確的刻度索引，確保頭尾一定包含
  const xExplicitTicks = computed(() => {
    const tickCount = maxTicks.value;
    if (dataLength <= 1) return [0];
    if (tickCount >= dataLength) {
      // 如果刻度數足夠，顯示全部
      return Array.from({ length: dataLength }, (_, i) => i);
    }

    // 確保頭尾一定包含，中間均勻分佈
    const ticks: number[] = [0]; // 第一個
    const innerCount = tickCount - 2; // 中間的刻度數量

    if (innerCount > 0) {
      const step = (dataLength - 1) / (tickCount - 1);
      for (let i = 1; i <= innerCount; i++) {
        ticks.push(Math.round(step * i));
      }
    }

    ticks.push(dataLength - 1); // 最後一個

    // 去重並排序
    return [...new Set(ticks)].sort((a, b) => a - b);
  });

  // 計算實際的刻度數量
  const xNumTicks = computed(() => xExplicitTicks.value.length);

  return {
    xNumTicks,
    xExplicitTicks,
    isMobile,
    isTablet,
  };
}
