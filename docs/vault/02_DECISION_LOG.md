---
type: decision-log
status: active
confidence: high
last_updated: 2026-06-02
owner: both
reviewed_by: human
---

# Decision Log

## Decision: 方案 B — 静态 + Workers 中间层

**Date:** 2026-06-01 | **Status:** Accepted
**Decision:** 前端纯 HTML/CSS/JS + Cloudflare Workers 做数据层
**Why:** API key 安全，可缓存省额度，Cloudflare 免费额度足够
**Alternatives rejected:**
- A. 纯静态 API 直调 — API key 暴露在前端
- C. Next.js 全栈 — 太重，Cloudflare SSR 支持有限
- D. 微信小程序 — 不是 Web，不满足需求

## Decision: 深色科技感设计

**Date:** 2026-06-01 | **Status:** Accepted
**Decision:** 深色底 + 金色点缀，glass morphism 风格
**Why:** 世界杯氛围 + 科技感 + 信息密度高时深色更易读

## Decision: 移动端优先

**Date:** 2026-06-01 | **Status:** Accepted
**Decision:** Mobile-first 自适应桌面端
**Why:** 用户主要在手机上看比赛信息

## Decision: 信息站保持纯工具属性

**Date:** 2026-06-01 | **Status:** Accepted
**Decision:** 内容（星座×球队、MBTI等）单独在公众号发，不塞进信息站
**Why:** 信息站保持纯工具属性，内容引流到公众号
