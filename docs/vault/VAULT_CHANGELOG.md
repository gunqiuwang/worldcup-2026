---
type: changelog
status: active
confidence: high
last_updated: 2026-06-10
owner: both
reviewed_by: agent
---

# Vault Changelog

## [2026-06-10] sync | Cron自动同步 — 37个commit补更新

**触发:** TencentDB Agent Memory + Vault 融合实验
**问题:** 2026-06-07 → 2026-06-10 期间37个commit未同步到vault
**更新文件:**
- 01_CURRENT_BASELINE.md — HEAD/距开赛/新功能/视觉升级
- 04_ARCHITECTURE.md — Monte Carlo/FotMob MatchCard/Countdown/Logo
- 05_COMMANDS_AND_FILES.md — fetch_scores workflow/新组件/scripts
- 06_DEPLOYMENT.md — GitHub Actions工作流
- 08_INCIDENTS_AND_FIXES.md — 6条新incident(概率条/新闻v4/布局)
- VAULT_CHANGELOG.md — 本次同步记录
**主要变更:**
- feat: 实时比分管道(ESPN API + GitHub Action 30min)
- feat: 赔率自动更新(DraftKings via ESPN API)
- feat: Monte Carlo模拟 + 背景图
- feat: Logo breathing glow + split-flap countdown
- feat: FotMob MatchCard + FiveThirtyEight Standings
- fix: 概率条黑缝问题(5次迭代)
- fix: 新闻v4 — 去rss2json改直接RSS解析
- refactor: 排名页去掉进度条 + 单行truncate
- remove: 赔率看板(分析页重复)

## [2026-06-07] feat | 赔率自动更新

- ESPN API自带DraftKings赔率, 不需要单独的赔率API
- fetch_scores.py: 拉取比分+赔率, 原地替换predictions.ts的PREDICTIONS数组
- GROUP_PREDICTIONS(出线率)保留不动, 只更新单场胜/平/负概率
- 72场全部有赔率: MEX -225(66.3%), KOR +165(36.1%), ARG -500(79.1%) 等

## [2026-06-07] feat | 实时比分管道

- ESPN API (免费无限次) 替代 API-Football
- fetch_scores.py: 拉取72场小组赛比分+状态+积分榜
- GitHub Action: 比赛期间每30分钟自动更新
- useLiveScores hook: 前端读取 live_scores.json/standings.json

## [2026-06-07] ui | 头部重新设计

- Logo.tsx — SVG 足球+镜头组合图标
- 品牌名 "MatchLens AI" → "MatchLens" + "World Cup 2026"

## [2026-06-07] refactor | 分析页整改 — 去假数据

- 删除 OddsMovement + PredictionStats
- 信息层级: 赔率一览 → 焦点 → 爆冷 → 热门球队

## [2026-06-07] feat | 新闻管道 v3

- 严格WC过滤 + 48h滚动窗口 + 上限30条

## [2026-06-07] sync | 全面同步 — React SPA 迁移后的完整更新

- Phase: prototype → mvp
- 13个vault文件全部更新

## [2026-06-02] init | Vault created

- Phase: prototype
- Files created: 8 vault files + schema + changelog
