---
type: architecture
status: active
confidence: high
last_updated: 2026-06-07
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
| **Animation** | Framer Motion |
| **Icons** | Lucide React |
| **Hosting** | GitHub → Vercel/Cloudflare (待部署) |
| **News** | GitHub Action (Python fetch_news.py) |

## Data Flow

```
predictions.ts (唯一数据源)
    ├── PREDICTIONS[] → 每场比赛: home_win/draw/away_win 概率
    ├── getPrediction(matchId) → 查询接口
    └── Monte Carlo → group_qualification 出线概率

teams.ts
    ├── TEAMS[] → 48队详情 (name, abbr, flag, fifa_rank, group)
    ├── GROUPS → 分组映射
    └── tier(S/A/B/C) + trend(↑↓→) 标签

schedule.ts
    └── SCHEDULE[] → 96场比赛 (id, date, home, away, group)

fetch_news.py (GitHub Action, 每2h)
    ├── ESPN RSS → parse
    ├── BBC RSS → parse
    └── → public/news.json → 前端 fetch
```

## Component Architecture

```
App.tsx (主路由 + 主题 + 搜索)
├── LandingPage (欢迎页, 只显示一次)
├── ParticleBackground (背景粒子)
├── Countdown (倒计时, 仅赛程页)
├── BottomNav (4Tab 导航)
│
├── [赛程] MatchCard → MatchModal (详情弹窗)
├── [排名] GroupStandings
├── [分析] Dashboard (信息层级: 赔率→焦点→爆冷→热门)
│   ├── OddsOverview (全场赔率一览 — 按分组折叠, 顶层)
│   ├── FocusMatches (焦点比赛 — 赔率最接近5场)
│   ├── UpsetRanking (爆冷预警 — top 10)
│   └── HotTeams (热门队 — tier排名, 最底层)
├── [资讯] NewsPage
│
└── TeamPage (球队详情, 从分析页进入)
```

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
