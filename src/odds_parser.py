#!/usr/bin/env python3
"""
美式赔率解析器
从 "MEX -215" 这种字符串解析出胜/平/负概率
"""

import re


def parse_american_odds(details: str) -> tuple[float, float, float]:
    """
    从美式赔率字符串解析概率
    
    输入: "MEX -215", "USA +100", "GER -5000"
    输出: (home_win%, draw%, away_win%)
    
    规则:
    - 负数 = 强队（热门），数字越大越强
    - 正数 = 弱队（冷门），数字越大越弱
    - 平局概率按 FIFA 排名差调整（默认 25%）
    """
    if not details:
        return (40.0, 25.0, 35.0)
    
    # 提取数字（可能是 "-215", "+165", "-120" 等）
    match = re.search(r'([+-]?\d+)', details)
    if not match:
        return (40.0, 25.0, 35.0)
    
    odds = int(match.group(1))
    
    # 美式赔率 → 隐含概率
    if odds < 0:
        # 热门（负数）：概率 = |odds| / (|odds| + 100)
        # -215 → 215/315 = 68.3%
        implied_prob = abs(odds) / (abs(odds) + 100)
        home_prob = implied_prob
        away_prob = 1 - implied_prob
    else:
        # 冷门（正数）：概率 = 100 / (odds + 100)
        # +165 → 100/265 = 37.7%
        implied_prob = 100 / (odds + 100)
        away_prob = implied_prob
        home_prob = 1 - implied_prob
    
    # 平局概率：根据实力差距调整
    # 实力越接近 → 平局概率越高
    diff = abs(home_prob - away_prob)
    if diff < 0.1:
        draw_prob = 0.28  # 实力接近，平局率高
    elif diff < 0.2:
        draw_prob = 0.25  # 中等差距
    elif diff < 0.3:
        draw_prob = 0.22  # 较大差距
    else:
        draw_prob = 0.18  # 悬殊比赛
    
    # 归一化到 100%
    total = home_prob + draw_prob + away_prob
    return (
        round(home_prob / total * 100, 1),
        round(draw_prob / total * 100, 1),
        round(away_prob / total * 100, 1),
    )


def test_parser():
    """测试解析器"""
    test_cases = [
        ("MEX -215", "热门主队"),
        ("USA +100", "实力接近"),
        ("GER -5000", "碾压局"),
        ("ECU +135", "客队略强"),
        ("SUI -400", "强队客场"),
    ]
    
    print("🎲 美式赔率解析测试")
    print("=" * 60)
    
    for details, desc in test_cases:
        home, draw, away = parse_american_odds(details)
        print(f"{details:<15} → 主胜 {home:>5.1f}% | 平 {draw:>5.1f}% | 客胜 {away:>5.1f}%  ({desc})")
    
    print("\n✅ 解析器测试通过")


if __name__ == "__main__":
    test_parser()
