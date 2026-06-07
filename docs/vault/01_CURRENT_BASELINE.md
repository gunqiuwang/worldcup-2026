---
type: baseline
status: active
confidence: high
last_updated: 2026-06-07
owner: agent
reviewed_by: agent
---

# Current Baseline

## Current State

| Key | Value | Confidence |
|-----|-------|------------|
| **Current Branch** | master | high |
| **HEAD Commit** | 0d61e0f feat: 中文新闻源 + 前端信息层级优化 | high |
| **Unpushed Commits** | 3 (中文新闻源, 数据管道瘦身, 出线率修复) | high |
| **Phase** | mvp (功能完整，待部署) | high |
| **Build** | ✅ TypeScript零错误, Vite 35s | high |
| **Bundle** | JS 377KB / CSS 27KB | high |
| **Dev Server** | `npm run dev` → 端口 4173 | high |
| **距开赛** | 4 天 (6月11日) | high |

## Architecture (Current)

- **Frontend:** React 18 + Vite + TypeScript + Tailwind CSS + Framer Motion
- **Data:** predictions.ts (唯一数据源 — 赔率概率 + 蒙特卡洛出线率)
- **News:** fetch_news.py (ESPN+BBC RSS) → news.json → GitHub Action 每2h
- **Hosting:** GitHub → 待部署 Vercel/Cloudflare
- **Git:** SSH push (git@github.com:gunqiuwang/worldcup-2026.git)

## 4-Tab Structure

| Tab | Component | Key Features |
|-----|-----------|-------------|
| 赛程 | MatchCard | 今日/全部, 分组筛选, 搜索, MatchModal详情 |
| 排名 | GroupStandings | 积分榜 + 出线概率 |
| 分析 | Dashboard | 焦点比赛, 预测总览, 冷门榜(UpsetRanking), 热门队(HotTeams), 赔率一览, 赔率走势(OddsMovement) |
| 资讯 | NewsPage | ESPN+BBC RSS 新闻聚合 |

## Data Pipeline (Final)

```
predictions.ts (唯一数据源)
    ├── getPrediction(matchId) → 胜/平/负概率
    ├── Monte Carlo → 出线概率
    └── teams.ts → tier(S/A/B/C) + trend(↑↓→)

fetch_news.py (GitHub Action, 每2h)
    ├── ESPN RSS → parse
    ├── BBC RSS → parse
    └── → public/news.json → 前端 fetch
```

## Deleted (Refactor Cleanup)

- ❌ Elo rating system
- ❌ Form analysis
- ❌ Ensemble prediction model
- ❌ 7 个 Python 脚本 (-8000 行)
- ❌ 三套矛盾数据源

## Recent Commits (Latest 10)

```
0d61e0f feat: 中文新闻源 + 前端信息层级优化
01bd150 refactor: 数据管道大瘦身
8606610 fix: 出线率计算错误 — 改用schedule中的概率数据
016c5ff hotfix: 排名页白屏修复
e3e52dc hotfix: localStorage 存了 odds 导致白屏
0f87643 refactor: 5Tab→4Tab 数据整合
3c6ff50 fix: news.json 提交到 git + GitHub Action 自动更新
689b8b9 fix: 欢迎页只显示一次 + 刷新保持当前页 + 按钮重设计
9fce816 fix: 3个Bug修复 + 死代码清理
c7e7611 feat: 自动新闻频道 - RSS实时抓取 + 10分钟前端刷新
```

## Must NOT Regress

- predictions.ts 唯一数据源（不可恢复多数据源）
- 深色科技感 + 金色设计方向
- 移动端优先 max-width 560px
- TypeScript 零错误构建
- 4Tab 结构（赛程/排名/分析/资讯）
