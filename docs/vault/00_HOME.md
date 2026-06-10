---
type: home
status: active
confidence: high
last_updated: 2026-06-10
owner: both
reviewed_by: agent
aliases: ["世界杯", "MatchLens AI", "worldcup2026"]
---

## 🔴 VAULT STARTUP SYNC (第一步，读任何文件之前)

**vault 可能已过期。先检查，再开工：**

```
1. 读本文件的 last_updated（上方 frontmatter）
2. cd 到项目根目录
3. git log --oneline --since=<last_updated> | grep -v "chore: update news" | grep -v "docs:"
4. 如果有未同步的 commit → 先跑 vault sync（见 09_AGENT_PROMPTS.md），再开始干活
```

**如果 vault 是最新的 → 正常开工，继续读下方 Mandatory reading order。**



# MatchLens AI — 2026 世界杯信息站

> 移动端优先的世界杯 SPA，核心卖点：赔率反算胜率 + 出线概率 + AI 分析。

## Quick Facts

| Key | Value |
|-----|-------|
| **Project** | MatchLens AI |
| **Repo** | gunqiuwang/worldcup-2026 (GitHub) |
| **Domain** | 404969.xyz (Cloudflare) |
| **Phase** | mvp (已部署) |
| **Stack** | React + Vite + TypeScript + Tailwind + Framer Motion |
| **Deploy** | GitHub → Vercel 自动部署 → Cloudflare 代理 |
| **Style** | 深色科技感，金色点缀，glass morphism |
| **JS Bundle** | 377KB (gzip 112KB) |
| **Last Updated** | 2026-06-10 |

## 4 Tabs

| Tab | Component | Content |
|-----|-----------|---------|
| 赛程 | App.tsx → MatchCard | FotMob风格, 概率条(红/蓝/绿), 主/客badge, 搜索 |
| 排名 | GroupStandings | FiveThirtyEight风格积分榜 + 出线概率, 单行truncate |
| 分析 | Dashboard | 焦点比赛、预测总览、冷门榜、热门队、赔率一览、赔率走势 |
| 资讯 | NewsPage | 多源RSS(ESPN+BBC+中文), 源轮换排序, GitHub Action 每2h |

## Most Important Files

| File | Why It Matters | Confidence |
|------|---------------|------------|
| `src/data/predictions.ts` | **唯一数据源** — 赔率概率 + 蒙特卡洛出线率 | high |
| `src/data/teams.ts` | 48队数据 + tier(S/A/B/C) + trend(↑↓→) | high |
| `src/data/schedule.ts` | 96场赛程（含时间、分组） | high |
| `src/App.tsx` | 主路由 + 4Tab 切换 + 主题系统 | high |
| `src/components/Dashboard.tsx` | 分析页主组件 | high |

## Most Important Commands

| Command | Purpose | Risk |
|---------|---------|------|
| `npm run dev` | 本地开发 (端口 4173) | Safe |
| `npm run build` | 生产构建 | Safe |
| `git push` | 推送到 GitHub (SSH) | Low |
| `python scripts/fetch_news.py` | 手动抓取新闻 | Safe |

## Agent Entry Page

> **Every new Agent MUST read this page first.**

**Mandatory reading order:**
1. [[00_HOME]] — You are here
2. [[01_CURRENT_BASELINE]] — Source of truth
3. [[03_DO_NOT_TOUCH]] — Danger zones
4. [[05_COMMANDS_AND_FILES]] — What you can run
5. [[VAULT_SCHEMA]] — Vault rules
6. Task-specific vault note

**After completing any task, you MUST:**
- Update [[01_CURRENT_BASELINE]] if status changed
- Append to [[VAULT_CHANGELOG]]

## Key Decisions

- **React SPA** 而非 Cloudflare Worker — 前端交互复杂度需要组件化
- **predictions.ts 唯一数据源** — 删除了 Elo/Form/ensemble 三套矛盾数据 + 7个Python脚本
- **GitHub Action 新闻** — fetch_news.py (ESPN+BBC RSS) → news.json, 每2h
- **SSH push** — HTTPS 在 WSL 超时，已切 SSH (git@github.com:gunqiuwang/xxx.git)

## Vault Navigation

- [[01_CURRENT_BASELINE]] — Where we are now
- [[02_DECISION_LOG]] — Why we made key choices
- [[03_DO_NOT_TOUCH]] — Danger zones
- [[04_ARCHITECTURE]] — How it all fits together
- [[05_COMMANDS_AND_FILES]] — What you can run and touch
- [[08_INCIDENTS_AND_FIXES]] — What broke and how we fixed it
- [[VAULT_SCHEMA]] — Vault rules
- [[VAULT_CHANGELOG]] — Vault log