---
type: commands-files
status: active
confidence: medium
last_updated: 2026-06-02
owner: agent
reviewed_by: unreviewed
---

# Commands and Files

## Commands

### Safe Local

| Command | Purpose | Risk |
|---------|---------|------|
| 浏览器打开 index.html | 本地预览 | Safe |

### Deploy

| Command | Purpose | Risk |
|---------|---------|------|
| `npx wrangler pages deploy` | 部署到 Cloudflare | Critical |
| `npx wrangler secret put API_KEY` | 设置 API 密钥 | Critical |

## File Inventory

| File | Purpose | Update When | Risk |
|------|---------|-------------|------|
| `index.html` | Demo 页面 + 未来主页面 | 功能更新 | High |
| `项目构想.md` | 完整项目规划 | 新功能确认 | Low |
| `docs/vault/` | 项目知识库 | 任何变更 | Medium |
