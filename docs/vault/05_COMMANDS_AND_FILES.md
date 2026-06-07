---
type: commands-files
status: active
confidence: high
last_updated: 2026-06-07
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

### News Pipeline

| Command | Purpose | Risk |
|---------|---------|------|
| `python scripts/fetch_news.py` | 手动抓取 ESPN+BBC 新闻 | Safe |

### Deploy (待配置)

| Command | Purpose | Risk |
|---------|---------|------|
| Vercel/Cloudflare 自动部署 | GitHub push 触发 | Medium |

## File Inventory

### Data Layer (核心)

| File | Purpose | Update When | Risk |
|------|---------|-------------|------|
| `src/data/predictions.ts` | **唯一数据源** — 胜/平/负概率 + 出线率 | 赛事数据更新 | 🔴 Critical |
| `src/data/teams.ts` | 48队数据 + tier/trend | 阵容变化 | 🟡 Medium |
| `src/data/schedule.ts` | 96场赛程 | 赛程调整 | 🟡 Medium |
| `public/news.json` | 新闻缓存 (GitHub Action 自动更新) | 自动 | 🟢 Low |

### Components (核心)

| File | Purpose | Update When | Risk |
|------|---------|-------------|------|
| `src/App.tsx` | 主路由 + 4Tab + 主题 + 搜索 | 功能变更 | 🔴 High |
| `src/components/Dashboard.tsx` | 分析页主组件 | 新增分析模块 | 🟡 Medium |
| `src/components/MatchCard.tsx` | 赛程卡片 | UI 调整 | 🟢 Low |
| `src/components/GroupStandings.tsx` | 排名页 | 数据结构变化 | 🟡 Medium |
| `src/components/NewsPage.tsx` | 资讯页 | 新闻源变化 | 🟢 Low |
| `src/components/BottomNav.tsx` | 底部导航 | Tab 变更 | 🟢 Low |
| `src/components/MatchModal.tsx` | 比赛详情弹窗 | UI 调整 | 🟢 Low |
| `src/components/TeamPage.tsx` | 球队详情页 | 数据结构变化 | 🟢 Low |

### Config

| File | Purpose | Risk |
|------|---------|------|
| `package.json` | 依赖 + 脚本 | 🟡 Medium |
| `vite.config.ts` | Vite 构建配置 | 🟡 Medium |
| `tailwind.config.js` | Tailwind 自定义 | 🟢 Low |
| `tsconfig.json` | TypeScript 配置 | 🟡 Medium |
