---
type: baseline
status: active
confidence: high
last_updated: 2026-06-02
owner: agent
reviewed_by: unreviewed
---

# Current Baseline

## Current State

| Key | Value | Confidence |
|-----|-------|------------|
| **Current Branch** | master | high |
| **HEAD Commit** | feat: Phase 1 — Worker + 前端 + 48队数据 | high |
| **Phase** | mvp-ready (待部署) | high |
| **Production** | 未部署（需用户执行 wrangler） | high |
| **距开赛** | 9 天 (6月11日) | high |

## Capabilities (已完成)

1. ✅ Cloudflare Worker (`workers/api.js`) — ESPN 代理 + KV 缓存 + CORS
2. ✅ 前端重写 (`index.html`) — 倒计时 + 赛程 + 积分榜 + 赔率占位
3. ✅ 48 队数据 (`data/teams.json`) — 中文名 + 国旗 + FIFA 排名 + 12 组分组
4. ✅ 72 场小组赛完整数据 (`data/schedule_full.json`) — 从 ESPN 解析
5. ✅ 离线降级 — API 不通时自动用内嵌数据
6. ✅ 赔率反算算法 (`src/odds_engine.py`) — 多源加权去水
7. ✅ Monte Carlo 模拟器 v2 (`src/monte_carlo.py`) — Poisson 比分模型
8. ✅ 赔率时间线 (`src/timeline.py`) — JSON 文件存储
9. ✅ Vault 知识库完整（13 个文件）

## 待部署

| 步骤 | 命令 | 状态 |
|------|------|------|
| 安装 wrangler | `npm install -g wrangler` | 需用户执行 |
| 登录 | `wrangler login` | 需用户执行 |
| 创建 KV | `wrangler kv namespace create CACHE_KV` | 需用户执行 |
| 部署 Worker | `wrangler deploy` | 需用户执行 |
| 部署 Pages | `wrangler pages deploy . --project-name=worldcup2026` | 需用户执行 |
| 更新 API_BASE | 改 index.html 里的 Worker 地址 | 部署后我来做 |

## Known Issues

| Issue | Severity | Status |
|-------|----------|--------|
| 未部署 | High | 等用户执行 wrangler |
| Worker 地址未确定 | High | 部署后更新 |
| 赔率 API 未接入 | Medium | Phase 2 |
| 实时比分轮询未实现 | Medium | Phase 2 |

## Must NOT Regress

- 赔率反算算法（去水公式）
- 深色科技感 + 金色设计方向
- 移动端优先
- Cloudflare 免费方案
- 离线降级能力
