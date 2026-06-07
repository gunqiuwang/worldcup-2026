---
type: schema
status: active
confidence: high
last_updated: 2026-06-07
owner: human
reviewed_by: agent
---

# Vault Schema

## Project Identity

**Project:** MatchLens AI — 2026 世界杯信息站
**Description:** 移动端优先的世界杯 SPA，赔率反算胜率 + 出线概率 + AI 分析
**Repo:** gunqiuwang/worldcup-2026
**Domain:** 404969.xyz

## Vault Version

```yaml
vault_version: 5.4.0
vault_created: 2026-06-02
last_upgraded: 2026-06-07
```

## Project Phase

```yaml
project_phase: mvp
```

## Staleness Thresholds

```yaml
staleness_threshold_days: 7     # 世界杯项目节奏快
review_threshold_days: 3
audit_interval_days: 7
```

## Link Discipline

00_HOME is the hub. Reports only go to 10_REPORT_INDEX. No circular links.
