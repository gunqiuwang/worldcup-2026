---
type: changelog
status: active
confidence: high
last_updated: 2026-06-07
owner: both
reviewed_by: agent
---

# Vault Changelog

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
