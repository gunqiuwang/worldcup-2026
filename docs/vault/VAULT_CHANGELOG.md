---
type: changelog
status: active
confidence: high
last_updated: 2026-06-07
owner: both
reviewed_by: agent
---

# Vault Changelog

## [2026-06-07] feat | 赔率自动更新

- ESPN API自带DraftKings赔率, 不需要单独的赔率API
- fetch_scores.py: 拉取比分+赔率, 原地替换predictions.ts的PREDICTIONS数组
- GROUP_PREDICTIONS(出线率)保留不动, 只更新单场胜/平/负概率
- 72场全部有赔率: MEX -225(66.3%), KOR +165(36.1%), ARG -500(79.1%) 等
- 赔率随比赛进展实时变化(博彩公司调整)

## [2026-06-07] feat | 实时比分管道

- ESPN API (免费无限次) 替代 API-Football (免费版不支持2026)
- fetch_scores.py: 拉取72场小组赛比分+状态+积分榜
- GitHub Action: 比赛期间每30分钟自动更新
- useLiveScores hook: 前端读取 live_scores.json/standings.json
- live_scores.json: 72场全部scheduled, 开赛后自动更新

## [2026-06-07] ui | 头部重新设计

- 新增 Logo.tsx — SVG 足球+镜头组合图标
- 品牌名 "MatchLens AI" → "MatchLens" + "World Cup 2026" 副标题
- LIVE 指示移到最左侧（优先级最高）
- 按钮从圆形改为圆角方形 (rounded-lg)
- 搜索功能正常：按球队名/缩写过滤赛程

## [2026-06-07] refactor | 分析页整改 — 去假数据 + 信息层级优化

- 删除 OddsMovement (伪随机假数据) + PredictionStats (鸡肋)
- 全场赔率一览升至顶部 + 按分组折叠
- 焦点比赛(原"今日焦点")去掉"今日"误导, 扩展到5场
- 爆冷预警扩展到10条 + 增加解释文案
- 信息层级: 赔率一览 → 焦点 → 爆冷 → 热门球队
- Bundle: 377KB → 373KB

## [2026-06-07] feat | 新闻管道 v3

- 严格世界杯过滤: 必须含WC核心词(世界杯/2026/FIFA等), 单球队名不够
- 48h滚动窗口: 自动淘汰旧新闻
- 上限30条: 376→30
- 合并旧数据: 新旧去重不丢失
- 新增 time_iso 字段用于精确时间排序

## [2026-06-07] sync | 全面同步 — React SPA 迁移后的完整更新

- 更新所有 13 个 vault 文件
- 架构从 vanilla HTML 更新为 React + Vite + TS + Tailwind
- 数据管道：predictions.ts 唯一数据源
- 新增 8 条决策记录
- 新增 5 条 incident 记录
- Phase: prototype → mvp
- Confidence: 全面 medium → high (经过验证)

## [2026-06-02] init | Vault created

- Phase: prototype
- Files created: 8 vault files + schema + changelog
- Source: 项目构想.md (detailed planning doc) + index.html (demo)
- Key decisions documented: 4
- Confidence: high (项目构想.md is very detailed)
