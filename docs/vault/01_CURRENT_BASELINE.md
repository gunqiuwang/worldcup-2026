---
type: baseline
status: active
confidence: high
last_updated: 2026-06-10
owner: agent
reviewed_by: agent
---

# Current Baseline

## Current State

| Key | Value | Confidence |
|-----|-------|------------|
| **Current Branch** | master | high |
| **HEAD Commit** | 8e4e646 fix: 删掉英文新闻源，只保留中文(直播吧) | high |
| **Unpushed Commits** | 0 (全部已推送到 GitHub) | high |
| **Phase** | mvp (功能完整，已部署数据管道) | high |
| **Build** | ✅ TypeScript零错误 | high |
| **距开赛** | **1 天** (6月11日揭幕战) | high |

## Architecture (Current)

- **Frontend:** React 18 + Vite + TypeScript + Tailwind CSS + Framer Motion
- **Data:** predictions.ts (唯一数据源 — 赔率概率 + 蒙特卡洛出线率)
- **Live Scores:** fetch_scores.py (ESPN API) → live_scores.json + standings.json + predictions.ts 原地替换
- **News:** fetch_news.py (多源RSS直接解析, 源轮换排序) → news.json
- **Hosting:** GitHub → Vercel 自动部署 → Cloudflare 代理 → www.404969.xyz
- **Git:** SSH push (git@github.com:gunqiuwang/worldcup-2026.git)

## 4-Tab Structure

| Tab | Component | Key Features |
|-----|-----------|-------------|
| 赛程 | MatchCard | **焦点赛程**(开赛前显示揭幕日)/全部, 概率条(红/蓝/绿), 主/客badge |
| 排名 | GroupStandings | FiveThirtyEight风格积分榜 + 出线概率, 单行truncate |
| 分析 | Dashboard | 焦点比赛(5场), 爆冷预警(10条), 热门队 |
| 资讯 | NewsPage | 中文源(直播吧), 48h滚动, 上限30条, GitHub Action每2h |

## Data Pipeline (Current)

```
predictions.ts (唯一数据源)
    ├── PREDICTIONS[] → 每场比赛: home_win/draw/away_win 概率
    ├── getPrediction(matchId) → 查询接口
    ├── Monte Carlo → group_qualification 出线概率 (monteCarlo.ts)
    └── teams.ts → tier(S/A/B/C) + trend(↑↓→)

fetch_scores.py (GitHub Action, 比赛期间每30min)
    ├── ESPN API (site.api.espn.com) → 免费无限次
    ├── 72场小组赛比分 + 状态(live/scheduled/finished)
    ├── DraftKings赔率 → 原地替换predictions.ts
    ├── 积分榜(开赛后自动生成)
    └── → live_scores.json + standings.json + predictions.ts

fetch_news.py (GitHub Action, 每2h)
    ├── 中文源(直播吧)爬取
    ├── 严格WC过滤 + 48h滚动窗口 + 上限30条
    └── → public/news.json → 前端 fetch
```

## Recent Commits (Latest 10, 排除 chore/docs)

```
d0796f5 fix: 今日tab开赛前显示揭幕日比赛而非随机6场
93952ee remove: 赔率看板 from analysis page — already shown on homepage
f8e6ffd fix: draw bar gold opacity 100% to match analysis page
18c23d1 feat: add 主/客 badge next to tier badge
3b41719 fix: MatchCard概率条归一化+flex-1消除黑缝
b3541b3 fix: 多源RSS+源轮换排序+push触发workflow
8e240b6 fix: 新闻v4—去rss2json改直接RSS解析+修复scores workflow条件判断
ffb1064 refactor: 排名页去掉进度条，队名单行truncate不换行，加列表头
3c00505 feat: visual upgrade — FotMob MatchCard + FiveThirtyEight Standings + refined Logo
99668ce feat: Logo breathing glow + split-flap countdown animation
```

## Visual Upgrades Since 2026-06-07

- **MatchCard:** FotMob风格重设计, 概率条(红=主胜/蓝=平局/绿=客胜), 主/客 badge
- **Countdown:** split-flap翻页动画 + 呼吸光效
- **Logo:** SVG足球+镜头, breathing glow动画
- **GroupStandings:** FiveThirtyEight风格, 单行truncate, 去掉进度条
- **背景:** Monte Carlo模拟可视化 + background image overlay

## Must NOT Regress

- predictions.ts 唯一数据源（不可恢复多数据源）
- 深色科技感 + 金色设计方向
- 移动端优先 max-width 560px
- TypeScript 零错误构建
- 4Tab 结构（赛程/排名/分析/资讯）
