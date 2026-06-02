---
type: architecture
status: active
confidence: medium
last_updated: 2026-06-02
owner: agent
reviewed_by: unreviewed
---

# Architecture

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML + CSS + vanilla JS |
| **Data Layer** | Cloudflare Workers (缓存 + 去水计算) |
| **Storage** | Cloudflare KV (历史赔率，免费 1GB) |
| **Hosting** | Cloudflare Pages (静态) + Workers |
| **Domain** | 404969.xyz |
| **Data Sources** | API-Football (主力) + The Odds API (备选) |

## Data Flow

```
用户访问 404969.xyz
    ↓
Cloudflare Pages (静态文件)
    ↓ JS 轮询 (每30秒)
Cloudflare Workers (中间层)
    ↓ 缓存命中? → 直接返回
    ↓ 缓存未命中
API-Football / The Odds API
    ↓
Workers KV (存历史数据)
    ↓
去水计算 → 返回前端
```

## Key Modules (待开发)

| Module | Purpose | Status |
|--------|---------|--------|
| 赔率反算 | 去水后真实概率 | 设计完成，未实现 |
| 胜率曲线 | 折线图展示概率变化 | 设计完成，未实现 |
| Monte Carlo | 小组出线概率模拟 | 构想阶段 |
| 盘口异动 | 概率变化 >5% 预警 | 构想阶段 |

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| API 额度不足 | 数据更新频率受限 | Workers 缓存 + 双数据源 |
| Polymarket 无世界杯 | 套利功能不可用 | 改造 scanner 适配 |
