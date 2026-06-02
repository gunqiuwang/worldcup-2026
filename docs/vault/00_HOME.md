---
type: home
status: active
confidence: high
last_updated: 2026-06-02
owner: both
reviewed_by: unreviewed
aliases: ["世界杯", "世界杯 Home", "worldcup2026"]
---

# 2026 世界杯信息站 — Agent Vault

> 移动端优先的世界杯信息站，核心卖点：赔率反算胜率 + Polymarket 套利信号。

## Quick Facts

| Key | Value |
|-----|-------|
| **Project** | 2026 世界杯信息站 |
| **Domain** | 404969.xyz (Cloudflare) |
| **Phase** | prototype |
| **Deploy** | Cloudflare Pages + Workers |
| **Style** | 深色科技感，金色点缀 |
| **Last Updated** | 2026-06-02 |

## Most Important Files

| File | Why It Matters | Confidence |
|------|---------------|------------|
| `项目构想.md` | 完整项目规划（功能、技术栈、时间线） | high |
| `index.html` | 初版 demo（纯展示，1219行） | high |

## Most Important Commands

| Command | Purpose | Risk |
|---------|---------|------|
| 浏览器打开 index.html | 本地预览 demo | Safe |
| `npx wrangler pages deploy` | 部署到 Cloudflare Pages | Critical |

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
- Append to [[10_REPORT_INDEX]] if a report was generated
- Append to [[VAULT_CHANGELOG]]

## Current Known Risks

| Risk | Severity | Confidence | Mitigation |
|------|----------|------------|------------|
| 距开赛仅 10 天 | High | high | 基础版 2-3 天上线 |
| API 额度有限 (500次/月) | Medium | high | Workers 缓存 + API-Football 做主力 |
| 赔率数据实时性未确定 | Medium | medium | 待确认比赛日更新频率 |
| Polymarket 无世界杯盘口 | Medium | high | 需要小改 polymarket-odds-scanner |

## Next Recommended Action

1. 确认功能优先级（赔率分析 vs 基础赛程 vs 互动）
2. 对接 API-Football 获取真实数据
3. 将 demo 升级为可部署的静态站

## Vault Navigation

- [[01_CURRENT_BASELINE]] — Where we are now
- [[02_DECISION_LOG]] — Why we made key choices
- [[03_DO_NOT_TOUCH]] — Danger zones
- [[04_ARCHITECTURE]] — How it all fits together
- [[05_COMMANDS_AND_FILES]] — What you can run and touch
- [[VAULT_SCHEMA]] — Vault rules
- [[VAULT_CHANGELOG]] — Vault log
