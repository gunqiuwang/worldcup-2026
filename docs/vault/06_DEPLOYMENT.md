---
type: deployment
status: active
confidence: low
last_updated: 2026-06-02
owner: agent
reviewed_by: unreviewed
---

# Deployment

## Build

Unknown — 未确定构建流程。当前是纯 HTML，可能不需要构建。

## Deploy

```bash
npx wrangler pages deploy ./ --project-name=worldcup2026
```

**Or via Cloudflare Dashboard:**
1. 连接 GitHub 仓库
2. 自动部署每次 push

## Environment

| Requirement | Notes |
|------------|-------|
| Cloudflare 账号 | guokun19851124 |
| 域名 | 404969.xyz |
| Workers | 免费 10万次/天 |
| KV | 免费 1GB |

## Health Check

访问 https://404969.xyz 确认页面加载。

## Rollback

Cloudflare Dashboard → Pages → 回退到上一版本。
