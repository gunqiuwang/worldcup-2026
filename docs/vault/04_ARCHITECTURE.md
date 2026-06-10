---
type: architecture
status: active
confidence: high
last_updated: 2026-06-10
owner: agent
reviewed_by: agent
---

# Architecture

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 |
| **Build** | Vite 5.4 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + 自定义 CSS 变量 |
| **Animation** | Framer Motion (split-flap countdown, breathing glow) |
| **Icons** | Lucide React |
| **Hosting** | GitHub repo → 待配置 Vercel/Cloudflare Pages |
| **Data** | ESPN API (免费无限次) + 多源RSS |
| **CI** | GitHub Actions (新闻每2h, 比分每30min) |

## Data Flow

```
predictions.ts (唯一数据源)
    ├── PREDICTIONS[] → 每场比赛: home_win/draw/away_win 概率
    ├── getPrediction(matchId) → 查询接口
    └── Monte Carlo (monteCarlo.ts) → group_qualification 出线概率

teams.ts
    ├── TEAMS[] → 48队详情 (name, abbr, flag, fifa_rank, group)
    ├── GROUPS → 分组映射
    └── tier(S/A/B/C) + trend(↑↓→) 标签 + 主/客 badge

schedule.ts
    └── SCHEDULE[] → 96场比赛 (id, date, home, away, group)

fetch_scores.py (GitHub Action, 比赛期间每30min)
    ├── ESPN API (site.api.espn.com) → 免费无限次
    ├── 72场小组赛比分 + 状态(live/scheduled/finished)
    ├── DraftKings赔率 → 原地替换predictions.ts
    ├── 积分榜(开赛后自动生成)
    └── → live_scores.json + standings.json + predictions.ts

fetch_news.py (GitHub Action, 每2h)
    ├── 多源RSS直接解析 (ESPN+BBC+中文源)
    ├── 源轮换排序 — 同源新闻分散排列
    ├── 严格WC过滤 + 48h滚动窗口 + 上限30条
    └── → public/news.json → 前端 fetch
```

## Component Architecture

```
App.tsx (主路由 + 主题 + 搜索 + Logo)
├── LandingPage (欢迎页, 只显示一次)
├── ParticleBackground (背景粒子)
├── Logo (SVG足球+镜头, breathing glow动画)
├── Countdown (split-flap翻页倒计时, 仅赛程页)
├── BottomNav (4Tab 导航)
│
├── [赛程] MatchCard (FotMob风格)
│   ├── 概率条: 红=主胜 / 蓝=平局 / 绿=客胜
│   ├── 主/客 badge + TierBadge(内联)
│   └── MatchModal (详情弹窗)
├── [排名] GroupStandings (FiveThirtyEight风格)
│   ├── 单行truncate, 去掉进度条
│   └── 列表头 + 积分榜
├── [分析] Dashboard
│   ├── OddsOverview (全场赔率一览 — 按分组折叠, 顶层)
│   ├── FocusMatches (焦点比赛 — 赔率最接近5场)
│   ├── UpsetRanking (爆冷预警 — top 10)
│   └── HotTeams (热门队 — tier排名, 最底层)
├── [资讯] NewsPage (多源RSS, 48h滚动)
│
└── TeamPage (球队详情, 从分析页进入)
```

## Visual Design System

| Element | Style |
|---------|-------|
| **MatchCard** | FotMob风格: 概率条(红/蓝/绿), 主/客badge, TierBadge内联 |
| **Countdown** | split-flap翻页动画 + 呼吸光效 |
| **Logo** | SVG足球+镜头, breathing glow |
| **GroupStandings** | FiveThirtyEight风格, 单行truncate |
| **背景** | Monte Carlo模拟可视化 + background image overlay 15% opacity |

## Theme System

3 个主题通过 CSS 变量切换：
- **dark** (默认) — 深色科技感
- **light** — 浅色模式
- **matchday** — 比赛日红色调

## Key Design Patterns

- **LazySection** — IntersectionObserver 懒加载，首屏只渲染可见区域
- **ErrorBoundary** — 每个分析组件独立错误隔离
- **Skeleton** — 加载占位符
- **localStorage** — 页面状态持久化 (page, theme, visited)
- **源轮换排序** — 新闻同源分散，提升阅读体验

## Removed Components

- ❌ OddsMovement — 伪随机假数据 (2026-06-07)
- ❌ PredictionStats — 鸡肋 (2026-06-07)
- ❌ 赔率看板(分析页) — 首页已有 (2026-06-09)
