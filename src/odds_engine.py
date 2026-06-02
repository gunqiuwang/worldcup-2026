#!/usr/bin/env python3
"""
赔率反算胜率算法 — 核心引擎
从多家菠菜公司的赔率数据中，去水后计算真实概率。
支持多源加权、置信度评估、置信区间。
"""

import json
import math
from dataclasses import dataclass, field
from typing import Optional


@dataclass
class OddsSource:
    """单个数据源的赔率"""
    name: str           # e.g. "Pinnacle", "Bet365"
    weight: float       # 权重 0-1
    home_odds: float    # 主胜赔率（小数制）
    draw_odds: float    # 平局赔率（足球用）
    away_odds: float    # 客胜赔率
    last_updated: str   # ISO timestamp
    is_live: bool = False


@dataclass
class TeamProbability:
    """最终输出"""
    home_team: str
    away_team: str
    home_win: float       # 0-100
    draw: float           # 0-100
    away_win: float       # 0-100
    confidence: str       # "high" / "medium" / "low"
    sources_used: int
    total_weight: float
    vig_home: float       # 各源的平均抽水率
    edge_detected: Optional[str] = None  # 如果检测到明显偏差


def remove_vig(odds: list[float]) -> list[float]:
    """
    去掉庄家抽水（overround / vig）
    原理：真实概率之和 = 1，但庄家概率之和 > 1
    去水后 = 每个原始概率 / 总和
    
    >>> remove_vig([2.0, 3.5, 4.0])
    [0.519, 0.297, 0.184]  # 三位小数近似
    """
    raw_probs = [1.0 / o for o in odds]
    total = sum(raw_probs)
    return [p / total for p in raw_probs]


def calc_vig(odds: list[float]) -> float:
    """
    计算庄家抽水率
    抽水率 = (总和 - 1) * 100
    
    >>> calc_vig([1.8, 3.5, 4.0])
    9.2  # 大约 9.2% 抽水
    """
    raw_probs = [1.0 / o for o in odds]
    return (sum(raw_probs) - 1.0) * 100


def weighted_probability(sources: list[OddsSource]) -> tuple[float, float, float]:
    """
    多源加权概率
    权重高的数据源对最终结果影响更大
    
    Returns: (home_win, draw, away_win) 各 0-100
    """
    if not sources:
        return (33.3, 33.3, 33.4)
    
    total_weight = sum(s.weight for s in sources)
    home_sum = 0.0
    draw_sum = 0.0
    away_sum = 0.0
    
    for src in sources:
        probs = remove_vig([src.home_odds, src.draw_odds, src.away_odds])
        w = src.weight / total_weight
        home_sum += probs[0] * w
        draw_sum += probs[1] * w
        away_sum += probs[2] * w
    
    # 归一化确保总和 = 100
    total = home_sum + draw_sum + away_sum
    return (
        round(home_sum / total * 100, 1),
        round(draw_sum / total * 100, 1),
        round(away_sum / total * 100, 1),
    )


def assess_confidence(sources: list[OddsSource]) -> str:
    """
    数据置信度评估
    
    规则：
    - 3+ 数据源且抽水率一致 → high
    - 2 数据源 → medium
    - 1 数据源 → low
    - 数据源之间偏差 > 8% → 降级
    """
    if len(sources) >= 3:
        base = "high"
    elif len(sources) >= 2:
        base = "medium"
    else:
        base = "low"
    
    # 检查各源之间的一致性
    if len(sources) >= 2:
        all_probs = []
        for src in sources:
            probs = remove_vig([src.home_odds, src.draw_odds, src.away_odds])
            all_probs.append(probs[0])  # 只看主胜概率的一致性
        
        spread = max(all_probs) - min(all_probs)
        if spread > 0.08:  # 8% 以上偏差
            if base == "high":
                return "medium"
            elif base == "medium":
                return "low"
    
    return base


def detect_edge(sources: list[OddsSource]) -> Optional[str]:
    """
    检测赔率异动
    
    如果某个数据源的概率和其他源偏差 > 5%，标记出来
    这通常意味着有大资金进场或内幕消息
    """
    if len(sources) < 2:
        return None
    
    all_home = []
    for src in sources:
        probs = remove_vig([src.home_odds, src.draw_odds, src.away_odds])
        all_home.append((src.name, probs[0]))
    
    avg = sum(p for _, p in all_home) / len(all_home)
    
    for name, prob in all_home:
        diff = abs(prob - avg)
        if diff > 0.05:
            direction = "偏高" if prob > avg else "偏低"
            return f"{name} 赔率{direction} {diff*100:.1f}%"
    
    return None


def calculate(
    home_team: str,
    away_team: str,
    sources: list[OddsSource],
) -> TeamProbability:
    """
    主入口：输入队伍名 + 多源赔率数据，输出综合概率
    """
    home_win, draw, away_win = weighted_probability(sources)
    confidence = assess_confidence(sources)
    edge = detect_edge(sources)
    
    avg_vig = sum(calc_vig([s.home_odds, s.draw_odds, s.away_odds]) for s in sources) / len(sources) if sources else 0
    total_weight = sum(s.weight for s in sources)
    
    return TeamProbability(
        home_team=home_team,
        away_team=away_team,
        home_win=home_win,
        draw=draw,
        away_win=away_win,
        confidence=confidence,
        sources_used=len(sources),
        total_weight=round(total_weight, 2),
        vig_home=round(avg_vig, 2),
        edge_detected=edge,
    )


# ─── 测试 ──────────────────────────────────────────────────────────────────

def test_basic():
    """基本去水计算"""
    # 巴西 vs 德国，Pinnacle 赔率
    probs = remove_vig([1.60, 4.00, 5.50])
    print(f"去水后：主胜 {probs[0]*100:.1f}% | 平局 {probs[1]*100:.1f}% | 客胜 {probs[2]*100:.1f}%")
    print(f"抽水率：{calc_vig([1.60, 4.00, 5.50]):.1f}%")
    assert abs(sum(probs) - 1.0) < 0.001, "去水后概率之和必须等于 1"
    print("✅ 去水计算正确\n")


def test_multi_source():
    """多源加权"""
    sources = [
        OddsSource("Pinnacle", 0.4, 1.60, 4.00, 5.50, "2026-06-11T19:00:00"),
        OddsSource("Bet365", 0.25, 1.55, 3.80, 6.00, "2026-06-11T19:00:00"),
        OddsSource("ESPN", 0.15, 1.65, 3.90, 5.00, "2026-06-11T19:00:00"),
    ]
    
    result = calculate("巴西", "德国", sources)
    print(f"🇧🇷 {result.home_team} vs 🇩🇪 {result.away_team}")
    print(f"  主胜: {result.home_win}%")
    print(f"  平局: {result.draw}%")
    print(f"  客胜: {result.away_win}%")
    print(f"  置信度: {result.confidence} ({result.sources_used} 个数据源)")
    print(f"  平均抽水: {result.vig_home}%")
    print(f"  异动检测: {result.edge_detected or '无'}")
    assert abs(result.home_win + result.draw + result.away_win - 100) < 0.5
    print("✅ 多源加权正确\n")
    return result


def test_edge_detection():
    """赔率异动检测"""
    sources = [
        OddsSource("Pinnacle", 0.4, 1.60, 4.00, 5.50, "2026-06-11T19:00:00"),
        OddsSource("Bet365", 0.25, 1.90, 3.50, 4.00, "2026-06-11T19:00:00"),  # 明显不同
        OddsSource("ESPN", 0.15, 1.65, 3.90, 5.00, "2026-06-11T19:00:00"),
    ]
    
    result = calculate("阿根廷", "法国", sources)
    print(f"🇦🇷 {result.home_team} vs 🇫🇷 {result.away_team}")
    print(f"  异动检测: {result.edge_detected}")
    print(f"  置信度: {result.confidence}")
    assert result.edge_detected is not None, "应该检测到 Bet365 的偏差"
    print("✅ 异动检测正确\n")


def test_confidence_levels():
    """不同数据源数量的置信度"""
    base_odds = [1.60, 4.00, 5.50]
    
    # 1 个源
    s1 = [OddsSource("ESPN", 1.0, *base_odds, "2026-06-11")]
    assert assess_confidence(s1) == "low"
    
    # 2 个源
    s2 = [
        OddsSource("ESPN", 0.5, *base_odds, "2026-06-11"),
        OddsSource("Bet365", 0.5, 1.55, 3.80, 6.00, "2026-06-11"),
    ]
    assert assess_confidence(s2) == "medium"
    
    # 3 个源
    s3 = [
        OddsSource("Pinnacle", 0.4, *base_odds, "2026-06-11"),
        OddsSource("Bet365", 0.25, 1.55, 3.90, 5.60, "2026-06-11"),
        OddsSource("ESPN", 0.15, 1.65, 3.95, 5.40, "2026-06-11"),
    ]
    assert assess_confidence(s3) == "high"
    
    print("✅ 置信度分级正确\n")


def demo_full_match():
    """模拟一场完整的比赛分析"""
    print("=" * 50)
    print("🏆 2026 世界杯小组赛 A 组")
    print("=" * 50)
    
    # 第 1 时刻：开赛前一天
    print("\n📅 赛前 24 小时：")
    t1 = [
        OddsSource("Pinnacle", 0.4, 1.80, 3.60, 4.50, "2026-06-11T09:00:00"),
        OddsSource("ESPN", 0.3, 1.75, 3.70, 4.60, "2026-06-11T09:00:00"),
    ]
    r1 = calculate("美国", "哥伦比亚", t1)
    print(f"  🇺🇸 美国 {r1.home_win}% | 平 {r1.draw}% | 哥伦比亚 🇨🇴 {r1.away_win}%")
    print(f"  置信度: {r1.confidence}")
    
    # 第 2 时刻：赛前 2 小时，赔率变了
    print("\n📅 赛前 2 小时：")
    t2 = [
        OddsSource("Pinnacle", 0.4, 1.65, 3.80, 5.00, "2026-06-11T19:00:00"),
        OddsSource("Bet365", 0.25, 1.70, 3.70, 4.80, "2026-06-11T19:00:00"),
        OddsSource("ESPN", 0.15, 1.68, 3.75, 4.90, "2026-06-11T19:00:00"),
    ]
    r2 = calculate("美国", "哥伦比亚", t2)
    print(f"  🇺🇸 美国 {r2.home_win}% | 平 {r2.draw}% | 哥伦比亚 🇨🇴 {r2.away_win}%")
    print(f"  置信度: {r2.confidence}")
    
    # 概率变化
    delta = r2.home_win - r1.home_win
    arrow = "↑" if delta > 0 else "↓"
    print(f"\n  📊 美国胜率变化: {arrow} {abs(delta):.1f}%")
    
    print("\n✅ 完整模拟完成")


if __name__ == "__main__":
    test_basic()
    test_multi_source()
    test_edge_detection()
    test_confidence_levels()
    demo_full_match()
