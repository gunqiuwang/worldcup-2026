---
type: deployment
status: active
confidence: medium
last_updated: 2026-06-07
owner: agent
reviewed_by: agent
---

# Deployment

## Build

```bash
npm run build    # tsc -b && vite build
# Output: dist/ (index.html + assets/*.js + assets/*.css)
# JS: 377KB (gzip 112KB), CSS: 27KB (gzip 5.6KB)
```

## Deploy Pipeline

```
GitHub push (SSH) → GitHub repo (gunqiuwang/worldcup-2026)
    → 待配置: Vercel / Cloudflare Pages 自动部署
```

**当前状态:** 代码功能完整，待选择部署平台并配置 CI/CD。

## Environment

| Requirement | Notes |
|------------|-------|
| Node.js | 18+ |
| npm | 9+ |
| Git | SSH key 已配置 |
| GitHub | gunqiuwang/worldcup-2026 |

## News Pipeline (GitHub Action)

```yaml
# .github/workflows/fetch-news.yml
# 每2小时自动运行 fetch_news.py
# 输出: public/news.json
```

## Health Check

- 本地: `npm run dev` → http://localhost:4173
- 构建: `npm run build` → 无错误
- 部署后: 访问域名确认 4 个 Tab 正常切换

## Rollback

- Git: `git revert HEAD` 或回退到特定 commit
- Vercel/Cloudflare: Dashboard → 回退到上一版本
