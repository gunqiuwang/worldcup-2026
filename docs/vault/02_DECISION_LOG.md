---
type: decision-log
status: active
confidence: high
last_updated: 2026-06-07
owner: both
reviewed_by: agent
---

# Decision Log

## Decision: 从 Vanilla HTML 迁移到 React SPA

**Date:** 2026-06-03 | **Status:** Accepted
**Decision:** 用 React + Vite + TypeScript + Tailwind 重写整个前端
**Why:** 前端交互复杂度（Tab切换、模态框、动画、主题系统）超出 vanilla JS 可维护范围
**Alternatives rejected:**
- 继续 vanilla HTML — 1200+ 行单文件不可维护
- Next.js — 对纯前端 SPA 太重
- Vue — 团队更熟悉 React 生态

## Decision: predictions.ts 为唯一数据源

**Date:** 2026-06-05 | **Status:** Accepted
**Decision:** 删除 Elo/Form/ensemble 三套矛盾数据，统一到 predictions.ts
**Why:** 三套数据互相矛盾，前端展示混乱。一次大瘦身删了 7 个 Python 脚本 (-8000 行)
**Impact:** 数据管道从 ~10000 行精简到核心数据文件

## Decision: 5Tab → 4Tab

**Date:** 2026-06-05 | **Status:** Accepted
**Decision:** 合并为 4 个 Tab：赛程/排名/分析/资讯
**Why:** 原来赔率和分析分开导致信息碎片化

## Decision: GitHub Action 新闻管道

**Date:** 2026-06-06 | **Status:** Accepted
**Decision:** fetch_news.py 通过 GitHub Action 每 2 小时执行，输出 news.json
**Why:** 免费、可靠、不依赖外部服务。ESPN + BBC RSS 两个源

## Decision: SSH 替代 HTTPS push

**Date:** 2026-06-04 | **Status:** Accepted
**Decision:** Git remote 切到 SSH (git@github.com:gunqiuwang/xxx.git)
**Why:** WSL 环境下 HTTPS push 经常超时

## Decision: 深色科技感设计

**Date:** 2026-06-01 | **Status:** Accepted
**Decision:** 深色底 + 金色点缀，glass morphism 风格
**Why:** 世界杯氛围 + 科技感 + 信息密度高时深色更易读

## Decision: 移动端优先

**Date:** 2026-06-01 | **Status:** Accepted
**Decision:** max-width 560px, Mobile-first
**Why:** 用户主要在手机上看比赛信息

## Decision: 信息站保持纯工具属性

**Date:** 2026-06-01 | **Status:** Accepted
**Decision:** 内容（星座×球队、MBTI等）单独在公众号发，不塞进信息站
**Why:** 信息站保持纯工具属性，内容引流到公众号
