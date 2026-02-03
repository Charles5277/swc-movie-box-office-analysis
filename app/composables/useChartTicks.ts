import { useBreakpoints } from "@vueuse/core";

/**
 * 根據螢幕寬度計算合適的圖表 x 軸刻度數量
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

  // 根據螢幕尺寸決定最大刻度數
  const maxTicks = computed(() => {
    if (isMobile.value) {
      // 手機：最多 4-5 個刻度（包含頭尾）
      return Math.min(5, dataLength);
    } else if (isTablet.value) {
      // 平板：最多 6-8 個刻度
      return Math.min(8, Math.ceil(dataLength / 2));
    } else {
      // 桌面：顯示較多刻度
      return Math.min(12, Math.ceil((dataLength * 2) / 3));
    }
  });

  // 計算實際的刻度數量，確保至少有 2 個（頭尾）
  const xNumTicks = computed(() => Math.max(2, maxTicks.value));

  return {
    xNumTicks,
    isMobile,
    isTablet,
  };
}
