---
type: testing
status: active
confidence: medium
last_updated: 2026-06-07
owner: agent
reviewed_by: agent
---

# Testing and Verification

## Automated Checks

| Check | Command | Status |
|-------|---------|--------|
| TypeScript 类型检查 | `npx tsc --noEmit` | ✅ 零错误 |
| Vite 构建 | `npm run build` | ✅ 35s 完成 |
| Bundle 大小 | `dist/assets/*.js` | ✅ 377KB |

## Manual QA Checklist

- [ ] 4 个 Tab 正确切换 (赛程/排名/分析/资讯)
- [ ] 深色主题 + 金色元素正确渲染
- [ ] 移动端 560px 内正常显示
- [ ] 搜索功能正常 (球队名)
- [ ] 分组筛选正常
- [ ] MatchModal 弹出/关闭正常
- [ ] TeamPage 从分析页进入正常
- [ ] 主题切换 (dark/light/matchday) 正常
- [ ] LandingPage 只显示一次
- [ ] localStorage 状态保持 (页面、主题)
- [ ] 新闻页数据加载正常
- [ ] 倒计时准确

## Known Test Gaps

- 无单元测试
- 无 E2E 测试
- 无视觉回归测试
- 新闻管道依赖外部 RSS 可用性
