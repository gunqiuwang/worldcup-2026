---
type: incidents
status: active
confidence: high
last_updated: 2026-06-10
owner: agent
reviewed_by: agent
---

# Incidents and Fixes

## [2026-06-10] 概率条黑缝问题（多次修复）

**Severity:** Medium
**Symptom:** MatchCard概率条(home_win/draw/away_win)之间有黑色缝隙
**Root Cause:** flex布局下三个bar之间有间隙, draw概率为0时中间段消失
**Fix Chain:**
- `854ea04` 改绝对定位消除间隙
- `9df2ef4` 概率条中间段改灰色
- `03146bf` 平局概率条改蓝色
- `3b41719` 概率条归一化+flex-1消除黑缝
- `9fd0c5a` 第三条改flex-1填满剩余空间
**Final:** 绝对定位 + flex-1 + 颜色统一(红=主/蓝=平/绿=客)

## [2026-06-10] 概率条颜色方案反复

**Severity:** Low
**Symptom:** 概率条颜色方案改了多次: red=favorite→green=home→最终 red=home, blue=draw, green=away
**Fix Chain:**
- `9ec9a2b` refactor: red=favorite, green=underdog, blue=draw
- `8135dc7` revert: simple fixed colors — green=home, blue=draw, red=away
- `f8e6ffd` fix: draw bar gold opacity 100%
- `6eb2c1b` fix: draw bar color gold
**Lesson:** 颜色方案应在设计阶段确定, 不应在开发中反复修改

## [2026-06-10] 今日tab开赛前显示错误

**Severity:** Medium
**Symptom:** 开赛前"今日"tab显示随机6场而非揭幕日比赛
**Root Cause:** 没有处理"开赛前"状态, 按日期过滤逻辑在6月11日前不生效
**Fix:** `d0796f5` — 开赛前显示揭幕日(6月11日)比赛

## [2026-06-09] 新闻管道v4 — RSS解析问题

**Severity:** High
**Symptom:** 新闻数量锐减, 部分源抓不到
**Root Cause:** rss2json第三方服务不稳定, scores workflow条件判断错误
**Fix:**
- `8e240b6` 去rss2json改直接RSS解析 + 修复scores workflow条件判断
- `b3541b3` 多源RSS + 源轮换排序 + push触发workflow
- `531caed` add permissions:write for GH Actions git push
**Lesson:** 不依赖第三方RSS转换服务, 直接解析更可靠

## [2026-06-09] 排名页布局问题

**Severity:** Medium
**Symptom:** 长队名溢出, TierBadge被裁剪
**Root Cause:** absolute定位的TierBadge在overflow:hidden容器内被裁剪
**Fix:**
- `b9150d7` TierBadge从absolute改为队名内联
- `d141c16` long names truncated, group badge position
- `ffb1064` 排名页去掉进度条, 单行truncate, 加列表头

## [2026-06-09] 赔率看板重复

**Severity:** Low
**Symptom:** 分析页有赔率看板, 首页也有, 重复展示
**Fix:** `93952ee` 从分析页移除赔率看板

## [2026-06-07] 分析页假数据

**Severity:** High
**Symptom:** 赔率异动排行的方向(up/down)和变化百分比是用 matchId 做伪随机生成的
**Root Cause:** 没有实时赔率API, 用 Math.random 模拟填充
**Fix:** 删除 OddsMovement + PredictionStats, 重组信息层级
**Resolution:** ESPN API自带DraftKings赔率, fetch_scores.py自动更新

## [2026-06-07] 新闻源语言问题

**Severity:** Low
**Symptom:** 新闻全部为英文
**Fix:** 0d61e0f — 添加中文新闻源

## [2026-06-06] 排名页白屏

**Severity:** High
**Symptom:** 排名页 (GroupStandings) 打开后白屏
**Root Cause:** 出线率计算引用了不存在的数据字段
**Fix:** 8606610 — 改用 schedule.ts 中的概率数据

## [2026-06-06] localStorage 导致白屏

**Severity:** High
**Symptom:** 部分用户打开页面白屏
**Root Cause:** localStorage 存了旧版 odds 数据结构
**Fix:** e3e52dc — 清除 localStorage 中的 odds 字段

## [2026-06-05] 数据管道三套矛盾数据

**Severity:** High
**Symptom:** 不同页面显示不同的胜率数据
**Root Cause:** Elo/Form/ensemble 三套模型各自计算
**Fix:** 01bd150 — 删除 7 个 Python 脚本, 统一到 predictions.ts
