---
type: agent-prompts
status: active
confidence: high
last_updated: 2026-06-07
owner: both
reviewed_by: agent
---

# Agent Prompts

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
5. Update 08_INCIDENTS_AND_FIXES.md with incident record.
6. Append to VAULT_CHANGELOG.md.
```

## Feature

```
1. Read vault. Identify affected components.
2. Do NOT touch files in 03_DO_NOT_TOUCH.md without approval.
3. New analysis modules go in Dashboard.tsx as LazySection.
4. Run `npm run build` to verify.
5. Update 01_CURRENT_BASELINE.md. Append to VAULT_CHANGELOG.md.
```

## Data Update

```
1. predictions.ts is the ONLY data source.
2. Match IDs in schedule.ts must match predictions.ts.
3. teams.ts tier/trend changes affect Dashboard components.
4. After update: `npx tsc --noEmit` + `npm run build`.
```

## Task Completion (ALWAYS last)

```
Task complete. Update vault:
1. Update 01_CURRENT_BASELINE.md (HEAD commit, status)
2. Append to VAULT_CHANGELOG.md
3. Commit with prefix "docs:" or "feat:" or "fix:"
```
