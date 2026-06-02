---
type: danger-zones
status: active
confidence: high
last_updated: 2026-06-02
owner: human
reviewed_by: human
---

# DO NOT TOUCH

## Business Logic — Hands Off

| System | Rule | Exception |
|--------|------|-----------|
| 赔率反算算法 | 去水公式不可随意修改 | Bug fix with human approval |
| 信息层级 | 赔率 > 赛程 > 互动 | 不可调换 |
| 设计方向 | 深色科技感 + 金色 | 不可换成明亮风格 |
| 免费方案 | 只用 Cloudflare 免费额度 | 付费需用户批准 |

## Security Rules

**Never include in vault files:**
- API-Football API key
- The Odds API key
- Polymarket API credentials
- Cloudflare API token

## Commands Requiring Approval

| Command | Why |
|---------|-----|
| `npx wrangler pages deploy` | Pushes to production |
| `npx wrangler secret put` | Sets API secrets |
| Any paid API call | Costs money |
