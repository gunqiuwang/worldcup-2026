# MatchLens AI 数据增强可行性方案

## 一、现状诊断

### 已有的（做得不错）
| 模块 | 文件 | 功能 |
|------|------|------|
| 赔率引擎 | `odds_engine.py` | 多源加权、去水、置信度、异动检测 |
| 蒙特卡洛 | `monte_carlo.py` | Poisson 比分模拟、小组出线概率 |
| ESPN抓取 | `espn_fetcher.py` | 实时比分数据 |
| 时间线 | `timeline.py` | 赛程时间管理 |

### 问题（核心瓶颈）
1. **前端数据全是 null** — `home_win_prob`, `draw_prob`, `away_win_prob` 全是空
2. **赔率只存了字符串** — `"MEX -215"` 没解析成数字
3. **Python模型和前端断联** — 模型算好了，但没生成 JSON 喂给前端
4. **只有 FIFA 排名** — 缺近期战绩、伤病、历史交锋

---

## 二、分阶段方案

### Phase 1：打通数据管道（1天）— 最高优先级

**目标：让前端的 104 场比赛都有概率数据**

**1.1 解析美式赔率 → 概率**
```
"-215" → |215|/(215+100) = 68.3% 主胜
"+165" → 100/(165+100) = 37.7% 客胜
```
- 写一个 `parse_american_odds()` 函数
- 把 `schedule.ts` 里所有 `details` 解析成 `home_win_prob` / `draw_prob` / `away_win_prob`
- 平局概率 = 历史平均 25%（或按 FIFA 排名差调整）

**1.2 Python → JSON → 前端**
- 写 `generate_predictions.py`
- 调用 `odds_engine.calculate()` 生成 104 场预测
- 输出 `src/data/predictions.json`
- 前端 `import predictions from './predictions.json'`

**1.3 蒙特卡洛 → 小组出线概率**
- 调用 `monte_carlo.simulate_group()` 跑 12 个小组
- 输出 `src/data/group_predictions.json`
- Dashboard 展示出线概率

---

### Phase 2：丰富数据维度（2-3天）

**2.1 近期战绩（免费 API）**

| API | 免费额度 | 数据质量 | 推荐度 |
|-----|---------|---------|--------|
| API-Football | 100请求/天 | ⭐⭐⭐⭐⭐ | 首选 |
| Football-Data.org | 无限制 | ⭐⭐⭐ | 备选 |
| ESPN API（已有） | 无限制 | ⭐⭐⭐⭐ | 已集成 |

**数据结构：**
```python
@dataclass
class TeamForm:
    abbr: str
    last5: list[str]        # ['W','W','D','L','W']
    goals_scored: int       # 近5场总进球
    goals_conceded: int     # 近5场总失球
    form_score: float       # 0-100 量化
    elo_rating: float       # Elo 积分
```

**2.2 Elo 评分系统**
- 从 FIFA 排名反推 Elo 初始值
- 公式：`Elo ≈ 1000 + (排名反序 × 20)`
- 赛后动态更新（贝叶斯）

**2.3 历史交锋**
- API-Football 有 H2H 接口
- 48 队两两组合 = C(48,2) = 1128 对
- 只取最近 5 次交锋记录
- 按需加载（点击比赛详情时拉取）

---

### Phase 3：模型升级（3-5天）

**3.1 集成模型**
```
最终概率 = 
    Elo模型 × 30% +
    赔率共识 × 35% +
    近期状态 × 20% +
    历史交锋 × 15%
```

**3.2 概率校准**
- Brier Score 衡量准确度
- Platt Scaling 校准输出
- 目标：说 60% → 实际接近 60%

**3.3 爆冷指数升级**
```
当前：排名差 > 30 → 红色
升级：排名差 × 赔率离散度 × 状态波动 → 百分比
```

---

### Phase 4：实时更新（世界杯期间）

**4.1 赔率追踪**
- 每小时记录一次
- 存 SQLite：`odds_history` 表
- 前端画趋势图

**4.2 赛后更新**
- 每场结束 → 贝叶斯更新 Elo
- 淘汰赛重新校准

---

## 三、技术架构

```
数据流：

[ESPN API] ──┐
[API-Football] ─┤──→ [Python Pipeline] ──→ [JSON 文件] ──→ [React 前端]
[赔率数据] ───┘         │
                        ├── odds_engine.py (去水+加权)
                        ├── monte_carlo.py (蒙特卡洛)
                        ├── elo_system.py (新增)
                        └── generate_predictions.py (新增)
```

### 新增文件
```
src/
├── data/
│   ├── predictions.json      # 104场预测（自动生成）
│   ├── group_predictions.json # 12组出线概率（自动生成）
│   └── team_form.json        # 48队近期战绩
├── elo_system.py             # Elo 评分系统
├── form_fetcher.py           # 近期战绩抓取
└── generate_predictions.py   # 主生成脚本
```

---

## 四、成本评估

| 项目 | 费用 | 说明 |
|------|------|------|
| API-Football 免费层 | ¥0 | 100请求/天 |
| ESPN API（已有） | ¥0 | 已集成 |
| 开发时间 | 5-7天 | Phase 1-3 |
| 世界杯期间维护 | 30分钟/天 | 更新数据 |

---

## 五、预期效果

| 指标 | 当前 | Phase 1 | Phase 2 | Phase 3 |
|------|------|---------|---------|---------|
| 概率覆盖率 | 0% | 100% | 100% | 100% |
| 数据维度 | 1个 | 2个 | 5个 | 7个 |
| 小组赛准确率 | — | ~55% | ~60% | ~65% |
| 爆冷识别 | 无 | 基础 | 中等 | 精准 |
| 用户感知 | "没数据" | "有概率" | "挺专业" | "真准" |

---

## 六、立即行动（今天可做）

### Step 1：解析赔率（30分钟）
```python
def parse_american_odds(details: str) -> tuple[float, float, float]:
    """从 'MEX -215' 解析出概率"""
    # 提取数字
    parts = details.split()
    odds_str = parts[-1]
    odds = int(odds_str)
    
    if odds < 0:
        home_prob = abs(odds) / (abs(odds) + 100)
        away_prob = 100 / (abs(odds) + 100)
    else:
        away_prob = 100 / (odds + 100)
        home_prob = odds / (odds + 100)
    
    draw_prob = 0.25  # 历史平均
    # 归一化
    total = home_prob + draw_prob + away_prob
    return (
        round(home_prob / total * 100, 1),
        round(draw_prob / total * 100, 1),
        round(away_prob / total * 100, 1),
    )
```

### Step 2：生成 predictions.json（1小时）
- 跑 104 场比赛
- 输出到 `src/data/predictions.json`

### Step 3：前端接入（1小时）
- Dashboard 读 predictions.json
- 显示概率、置信度、爆冷指数

**总计：2.5 小时，前端就有完整概率数据。**

要我现在开始写代码吗？
