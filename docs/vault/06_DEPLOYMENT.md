---
type: deployment
status: active
confidence: high
last_updated: 2026-06-10
owner: agent
reviewed_by: agent
---

# Deployment

## Build

```bash
npm run build    # tsc -b && vite build
# Output: dist/ (index.html + assets/*.js + assets/*.css)
```

## Deploy Pipeline

```
GitHub push (SSH) → GitHub repo (gunqiuwang/worldcup-2026)
    → 待配置: Vercel / Cloudflare Pages 自动部署
```

**当前状态:** 代码功能完整，CI/CD 数据管道已运行，前端部署待配置。

## GitHub Actions (已运行)

### update-news.yml
- **触发:** 每2小时 + push触发
- **做什么:** fetch_news.py → public/news.json
- **内容:** 多源RSS直接解析(ESPN+BBC+中文源), 源轮换排序, 48h滚动, 上限30条

### update-scores.yml
- **触发:** 比赛期间每30min
- **做什么:** fetch_scores.py → live_scores.json + standings.json + predictions.ts
- **内容:** ESPN API(免费无限次)拉取比分+DraftKings赔率+积分榜
- **注意:** 需要 `permissions:write` 让 Action 能 push 更新后的 predictions.ts

## Environment

| Requirement | Notes |
|------------|-------|
| Node.js | 18+ |
| npm | 9+ |
| Git | SSH key 已配置 |
| GitHub | gunqiuwang/worldcup-2026 |

## Health Check

- 本地: `npm run dev` → http://localhost:4173
- 构建: `npm run build` → 无错误
- 新闻: GitHub Action 每2h自动更新 news.json
- 比分: GitHub Action 比赛期间每30min更新
- 部署后: 访问域名确认 4 个 Tab 正常切换

## Rollback

- Git: `git revert HEAD` 或回退到特定 commit
- GitHub Actions: 禁用 workflow → 回到静态数据
