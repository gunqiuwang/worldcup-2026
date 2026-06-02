---
type: schema
status: active
confidence: high
last_updated: 2026-06-02
owner: human
reviewed_by: human
---

# Vault Schema

## Project Identity

**Project:** 2026 世界杯信息站
**Description:** 移动端优先的世界杯信息站，赔率反算胜率 + Polymarket 套利

## Vault Version

```yaml
vault_version: 5.0.0
vault_created: 2026-06-02
```

## Project Phase

```yaml
project_phase: prototype
```

## Staleness Thresholds

```yaml
staleness_threshold_days: 7     # 世界杯项目节奏快
review_threshold_days: 3
audit_interval_days: 7
```

## Link Discipline

00_HOME is the hub. Reports only go to 10_REPORT_INDEX. No circular links.
