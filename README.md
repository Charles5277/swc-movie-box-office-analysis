# ☀️ 陽光女子合唱團 票房分析儀表板

> 追蹤台灣電影《陽光女子合唱團》票房表現的即時數據視覺化分析平台

🔗 **線上版：[swc.yudefine.com](https://swc.yudefine.com)**

## 功能特色

- 📊 **週票房趨勢追蹤** — 每週更新票房數據與戲院數變化
- 🏆 **國產電影票房排行** — 與歷年國產電影票房即時對比
- 📈 **累計票房曲線** — 票房與觀影人次雙軸分析
- 🎯 **奪冠進度追蹤** — 超越《海角七號》的里程碑進度
- 📉 **進階分析圖表** — 衰退率、票價趨勢、週變化率等多維度分析
- 🌙 **深色模式** — 自動跟隨系統偏好

## 截圖預覽

| 亮色模式 | 深色模式 |
|---------|---------|
| ![Light Mode](https://img.shields.io/badge/預覽-亮色模式-f59e0b?style=for-the-badge) | ![Dark Mode](https://img.shields.io/badge/預覽-深色模式-1e293b?style=for-the-badge) |

## 技術棧

| 類別 | 技術 |
|------|------|
| 框架 | [Nuxt 4](https://nuxt.com/) + [Vue 3](https://vuejs.org/) + TypeScript |
| UI | [@nuxt/ui v4](https://ui.nuxt.com/) (主題色: amber) |
| 圖表 | [nuxt-charts](https://github.com/nuxt-modules/charts) (Apache ECharts) |
| SEO | [@nuxtjs/seo](https://nuxtseo.com/) |
| 字體 | [Huninn 粉圓體](https://fonts.google.com/specimen/Huninn) (Google Fonts) |
| Linter | [oxlint](https://oxc.rs/) |
| 部署 | [Cloudflare Pages](https://pages.cloudflare.com/) |

## 專案架構

```
app/
├── pages/index.vue            # 主頁面（儀表板）
├── components/
│   ├── HeroStats.vue           # 核心票房統計卡片
│   ├── RankingTable.vue        # 國產電影票房排行表
│   ├── RevenueAchievement.vue  # 票房奪冠進度
│   ├── TicketsChallenge.vue    # 觀影人次挑戰進度
│   ├── WeeklyChart.vue         # 週票房趨勢圖
│   ├── CumulativeChart.vue     # 累計票房曲線
│   ├── TicketRevenueChart.vue  # 票數與票房對照
│   ├── CumulativeTicketsChart.vue # 累計觀影人次
│   ├── WeeklyChangeRateChart.vue  # 週變化率分析
│   ├── GrowthTheaterChart.vue  # 成長率與戲院數
│   ├── TicketPriceChart.vue    # 平均票價趨勢
│   └── DecayRateChart.vue      # 票房衰退率分析
├── data/box-office.ts          # 核心數據 + 工具函數
├── types/index.ts              # TypeScript 類型定義
└── assets/css/main.css         # Tailwind + 自訂樣式
```

## 開發

```bash
# 安裝依賴
pnpm install

# 啟動開發伺服器 (localhost:3000)
pnpm dev

# 建置生產版本
pnpm build

# 預覽生產版本
pnpm preview

# 靜態生成
pnpm generate

# Lint 檢查
pnpm lint
```

## 資料更新

票房數據位於 `app/data/box-office.ts`，更新方式：

1. 每週更新 `weeklyData` 陣列（加入新一週的票房數據）
2. 每日可更新 `latestDaily`（單日票房快報）
3. 資料來源：[國家影視聽中心票房資訊系統](https://boxofficetw.tfai.org.tw/search/32701)

## 授權

MIT License

---

由 [Yudefine 域定資訊工作室](https://yudefine.com) 製作
