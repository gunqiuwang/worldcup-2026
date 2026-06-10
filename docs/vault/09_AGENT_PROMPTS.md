---
type: agent-prompts
status: active
confidence: high
last_updated: 2026-06-07
owner: both
reviewed_by: agent
---

## 🔴 VAULT STARTUP SYNC (每次开工必做)

**在做任何事情之前，先检查 vault 是否过期：**

```
1. cat docs/vault/00_HOME.md → 获取 last_updated 日期
2. git log --oneline --since=<last_updated> | grep -v "chore: update news" | grep -v "docs:"
3. 如果有未同步的 commit → 先执行 vault sync，再开始干活
```

**vault sync 流程：**
```
1. git log --oneline --since=<vault_last_updated> | grep -v "chore: update news"
2. 按 commit 类型归类: feat/fix/refactor/remove
3. 更新受影响的 vault 文件（参考 VAULT_CHANGELOG 中的变更→文件映射）
4. git commit -m "docs: vault sync — <简述>"
```

**为什么：** 世界杯项目 37 个 commit 没同步的教训。vault 腐烂的原因不是没有 cron job，而是 agent 做完活忘了更新。这个检查让 vault 同步变成每个 session 的第一个动作，零额外成本。


# Agent Prompts

## 🔴 CORE RULE: 边做边更新 Vault

**Every code change MUST update the vault DURING the work, NOT after.**

具体来说：
- 每次 commit 代码后 → 立即同步更新 `01_CURRENT_BASELINE.md`
- 每次修复 bug → 立即追加 `08_INCIDENTS_AND_FIXES.md`
- 每次做架构决策 → 立即追加 `02_DECISION_LOG.md`
- 每次新增/删除文件 → 立即更新 `05_COMMANDS_AND_FILES.md`
- 每次改部署方式 → 立即更新 `06_DEPLOYMENT.md`
- 最后一次 commit 包含 vault 变更，前缀 `docs:`

**反模式（禁止）：**
- ❌ 做完所有功能再一次性更新 vault（记忆已丢失，信息不准确）
- ❌ 只更新代码不更新 vault（vault 变成废纸）
- ❌ 等用户提醒才更新 vault

**正确模式：**
- ✅ 代码改一行 → vault 同步更新对应文件
- ✅ 每个工作段结束时 commit vault 变更

## New Task Startup (ALWAYS first)

```
Read docs/vault/00_HOME.md before making changes.
React + Vite + TypeScript + Tailwind + Framer Motion.
predictions.ts is the SINGLE data source. Never add parallel data sources.
Mobile-first, max-width 560px. Dark theme with gold accents.
4 tabs: 赛程/排名/分析/资讯. Don't merge or split tabs.
SSH push (HTTPS times out in WSL).
```

## Bugfix

```
1. Read vault. Identify the bug in the component chain.
2. Check if predictions.ts data is correct first.
3. Propose fix with affected files. Do not refactor.
4. Run `npx tsc --noEmit` after fix.
5. 【边做边更新】立即追加 08_INCIDENTS_AND_FIXES.md
6. 【边做边更新】立即更新 01_CURRENT_BASELINE.md
```

## Feature

```
1. Read vault. Identify affected components.
2. Do NOT touch files in 03_DO_NOT_TOUCH.md without approval.
3. New analysis modules go in Dashboard.tsx as LazySection.
4. Run `npm run build` to verify.
5. 【边做边更新】新增/删除文件时更新 05_COMMANDS_AND_FILES.md
6. 【边做边更新】架构变化时更新 04_ARCHITECTURE.md
7. 【边做边更新】更新 01_CURRENT_BASELINE.md
```

## Data Update

```
1. predictions.ts is the ONLY data source.
2. Match IDs in schedule.ts must match predictions.ts.
3. teams.ts tier/trend changes affect Dashboard components.
4. After update: `npx tsc --noEmit` + `npm run build`.
5. 【边做边更新】更新 01_CURRENT_BASELINE.md
```

## Task Completion (ALWAYS last)

```
Task complete. Final vault sync:
1. Verify all vault files are up to date (01-10)
2. Update VAULT_CHANGELOG.md with summary
3. git add docs/vault/ && git commit -m "docs: vault sync"
4. git push
```