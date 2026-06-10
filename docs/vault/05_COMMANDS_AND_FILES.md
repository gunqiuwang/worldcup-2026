---
type: commands-files
status: active
confidence: high
last_updated: 2026-06-10
owner: agent
reviewed_by: agent
---

# Commands and Files

## Commands

### Development

| Command | Purpose | Risk |
|---------|---------|------|
| `npm run dev` | Vite dev server (端口 4173) | Safe |
| `npm run build` | TypeScript 编译 + Vite 生产构建 | Safe |
| `npx tsc --noEmit` | 仅类型检查，不生成文件 | Safe |

### Git

| Command | Purpose | Risk |
|---------|---------|------|
| `git push` | 推送到 GitHub (SSH) | Low |
| `git log --oneline -10` | 查看最近提交 | Safe |
| `git diff --stat` | 查看变更概览 | Safe |

### Data Pipeline

| Command | Purpose | Risk |
|---------|---------|------|
| `python scripts/fetch_news.py` | 手动抓取多源RSS新闻 | Safe |
| `python scripts/fetch_scores.py` | 手动拉取比分+赔率+积分榜 | Safe |

### GitHub Actions (自动)

| Workflow | Trigger | What It Does |
|----------|---------|-------------|
| `update-news.yml` | 每2小时 + push触发 | fetch_news.py → news.json |
| `update-scores.yml` | 比赛期间每30min | fetch_scores.py → live_scores.json + standings.json + predictions.ts |

### Deploy (待配置)

| Command | Purpose | Risk |
|---------|---------|------|
| Vercel/Cloudflare 自动部署 | GitHub push 触发 | Medium |

## File Inventory

### Data Layer (核心)

| File | Purpose | Update When | Risk |
|------|---------|-------------|------|
| `src/data/predictions.ts` | **唯一数据源** — 胜/平/负概率 + 出线率 + DraftKings赔率 | 自动(fetch_scores.py) | 🔴 Critical |
| `src/data/teams.ts` | 48队数据 + tier/trend | 阵容变化 | 🟡 Medium |
| `src/data/schedule.ts` | 96场赛程 | 赛程调整 | 🟡 Medium |
| `src/data/monteCarlo.ts` | Monte Carlo模拟出线概率 | 概率模型调整 | 🟡 Medium |
| `src/data/live_scores.json` | 实时比分 + 状态 (自动生成) | 比赛期间每30min | 🟢 Auto |
| `src/data/standings.json` | 积分榜 (自动生成) | 比赛期间每30min | 🟢 Auto |
| `public/news.json` | 新闻缓存 (多源RSS, 48h滚动, 上限30条) | 每2h自动 | 🟢 Auto |

### Components (核心)

| File | Purpose | Update When | Risk |
|------|---------|-------------|------|
| `src/App.tsx` | 主路由 + 4Tab + 主题 + 搜索 | 功能变更 | 🔴 High |
| `src/components/MatchCard.tsx` | FotMob风格赛程卡片 + 概率条 | UI 调整 | 🟡 Medium |
| `src/components/GroupStandings.tsx` | FiveThirtyEight风格排名页 | 数据结构变化 | 🟡 Medium |
| `src/components/Dashboard.tsx` | 分析页主组件 | 新增分析模块 | 🟡 Medium |
| `src/components/Countdown.tsx` | split-flap翻页倒计时 | 动画调整 | 🟢 Low |
| `src/components/Logo.tsx` | SVG Logo + breathing glow | 品牌调整 | 🟢 Low |
| `src/components/MatchModal.tsx` | 比赛详情弹窗 | UI 调整 | 🟢 Low |
| `src/components/NewsPage.tsx` | 资讯页 | 新闻源变化 | 🟢 Low |
| `src/components/TeamPage.tsx` | 球队详情 | 数据结构变化 | 🟡 Medium |
| `src/components/BottomNav.tsx` | 底部导航 | Tab 变更 | 🟢 Low |

### Scripts

| File | Purpose | Risk |
|------|---------|------|
| `scripts/fetch_news.py` | 多源RSS新闻抓取 + 源轮换排序 | 🟡 Medium |
| `scripts/fetch_scores.py` | ESPN API比分+赔率+积分榜 | 🟡 Medium |

### Config

| File | Purpose | Risk |
|------|---------|------|
| `package.json` | 依赖 + 脚本 | 🟡 Medium |
| `vite.config.ts` | Vite 构建配置 | 🟡 Medium |
| `tailwind.config.js` | Tailwind 自定义 | 🟢 Low |
| `tsconfig.json` | TypeScript 配置 | 🟡 Medium |
| `.github/workflows/update-news.yml` | 新闻自动更新 | 🟡 Medium |
| `.github/workflows/update-scores.yml` | 比分自动更新 | 🟡 Medium |
