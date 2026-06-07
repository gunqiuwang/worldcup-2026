---
type: danger-zones
status: active
confidence: high
last_updated: 2026-06-07
owner: human
reviewed_by: agent
---

# DO NOT TOUCH

## Architecture — Hands Off

| System | Rule | Exception |
|--------|------|-----------|
| predictions.ts 唯一数据源 | 不可恢复多数据源 | Bug fix with human approval |
| 4Tab 结构 | 赛程/排名/分析/资讯不可合并或拆分 | Human approval |
| 设计方向 | 深色科技感 + 金色 | 不可换成明亮风格 |
| 移动端优先 | max-width 560px | 不可改成桌面优先 |

## Data Integrity

| Rule | Why |
|------|-----|
| 不可删除 predictions.ts 中的蒙特卡洛出线率 | 排名页依赖 |
| 不可修改 teams.ts 的 tier/trend 标签 | 分析页依赖 |
| schedule.ts 的 match id 不可变 | predictions.ts 通过 matchId 关联 |

## Code Quality

| Rule | Why |
|------|-----|
| TypeScript 零错误 | `tsc --noEmit` 必须通过 |
| 不可引入新 CSS 框架 | 已用 Tailwind，不可混用 |
| 不可删除 ErrorBoundary | Dashboard 多组件需要错误隔离 |

## Security Rules

**Never include in vault files:**
- GitHub token / SSH keys
- Cloudflare API token
- Any API keys

## Commands Requiring Approval

| Command | Why |
|---------|-----|
| `git push` | Pushes to production repo |
| `npm publish` | 不适用但以防万一 |
| 任何删除组件的操作 | 可能影响其他 Tab |
