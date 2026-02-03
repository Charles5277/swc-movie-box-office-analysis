# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案概述

台灣電影《陽光女子合唱團》票房分析儀表板，使用 Nuxt 4 + Vue 3 + TypeScript 構建，部署於 Cloudflare Pages。

## 常用指令

```bash
# 安裝依賴
pnpm install

# 開發伺服器 (localhost:3000)
pnpm dev

# 生產構建
pnpm build

# 預覽生產版本
pnpm preview

# 靜態生成
pnpm generate
```

## 技術棧

- **框架:** Nuxt 4.3 + Vue 3.5
- **UI:** @nuxt/ui 4.4 (主題色: amber)
- **圖表:** nuxt-charts 2.1
- **字體:** Huninn (粉圓體，Google Fonts)
- **部署:** Cloudflare Pages (nitro preset)
- **Linter:** oxlint

## 專案架構

```
app/
├── pages/index.vue          # 主頁面（儀表板）
├── components/              # 12 個 Vue 組件
│   ├── HeroStats.vue        # 票房統計卡片
│   ├── RankingTable.vue     # 國產電影排行表
│   ├── CountdownCard.vue    # 奪冠進度追蹤
│   ├── WeeklyChart.vue      # 週票房趨勢圖
│   ├── CumulativeChart.vue  # 累計票房曲線
│   └── ...                  # 其他分析圖表
├── data/box-office.ts       # 核心數據 + 工具函數
├── types/index.ts           # TypeScript 類型定義
└── assets/css/main.css      # Tailwind + 自訂樣式
```

## 核心數據結構

`app/data/box-office.ts` 包含：

- `movieInfo` - 電影基本資訊
- `weeklyData` - 週票房數據陣列
- `top10Rankings` - 台灣國產電影票房排行
- 工具函數：`getAverageTicketPrice()`, `getDecayRate()`, `calculateDerivedMetrics()`, `calculateTargetProjection()`

## 開發注意事項

- 使用 `~` 別名指向 `app/` 目錄
- 支援深色模式（自動切換）
- 所有 UI 文字使用繁體中文
- 數據更新時修改 `app/data/box-office.ts` 中的 `weeklyData` 和 `latestDaily`
