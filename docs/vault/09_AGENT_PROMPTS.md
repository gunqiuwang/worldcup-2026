---
type: agent-prompts
status: active
confidence: high
last_updated: %s
owner: both
reviewed_by: human
---

# Agent Prompts

## New Task Startup (ALWAYS first)

```
Read docs/vault/00_HOME.md before making changes.
Then read 项目构想.md for full project context.
Mobile-first. Dark theme. Gold accents. Cloudflare free tier only.
```

## Task Completion (ALWAYS last)

```
Task complete. Update vault:
1. Update 01_CURRENT_BASELINE.md
2. Append to VAULT_CHANGELOG.md
3. Commit with prefix "docs:" or "feat:" or "fix:"
