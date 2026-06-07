---
type: incidents
status: active
confidence: high
last_updated: 2026-06-07
owner: agent
reviewed_by: agent
---

# Incidents and Fixes

## [2026-06-06] 排名页白屏

**Severity:** High
**Symptom:** 排名页 (GroupStandings) 打开后白屏
**Root Cause:** 出线率计算引用了不存在的数据字段
**Fix:** 8606610 — 改用 schedule.ts 中的概率数据
**Lesson:** 数据源变更后必须检查所有消费端

## [2026-06-06] localStorage 导致白屏

**Severity:** High
**Symptom:** 部分用户打开页面白屏
**Root Cause:** localStorage 存了旧版 odds 数据结构，新版解析失败
**Fix:** e3e52dc — 清除 localStorage 中的 odds 字段
**Lesson:** localStorage 存储需要版本号或 try-catch 保护

## [2026-06-05] 欢迎页重复显示

**Severity:** Medium
**Symptom:** 每次刷新都显示 LandingPage
**Root Cause:** localStorage key 未正确设置
**Fix:** 689b8b9 — 设置 `wc-visited` + 刷新保持当前页

## [2026-06-05] 数据管道三套矛盾数据

**Severity:** High
**Symptom:** 不同页面显示不同的胜率数据
**Root Cause:** Elo/Form/ensemble 三套模型各自计算，结果不一致
**Fix:** 01bd150 — 大瘦身：删除 7 个 Python 脚本，统一到 predictions.ts
**Lesson:** 数据源必须唯一，多源会导致不一致

## [2026-06-07] 分析页假数据

**Severity:** High
**Symptom:** 赔率异动排行的方向(up/down)和变化百分比是用 matchId 做伪随机生成的，不是真实数据
**Root Cause:** 没有实时赔率API，用 Math.random 模拟填充
**Fix:** 删除 OddsMovement 组件 + PredictionStats (鸡肋)，重组信息层级
**Decision:** 赛前不接实时赔率API (The Odds API 免费500次/月不够96场用)，等开赛后再说

## [2026-06-07] 新闻源语言问题

**Severity:** Low
**Symptom:** 新闻全部为英文
**Root Cause:** 只接入了英文 RSS 源
**Fix:** 0d61e0f — 添加中文新闻源 + 前端信息层级优化
