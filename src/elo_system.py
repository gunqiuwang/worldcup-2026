#!/usr/bin/env python3
"""
Elo 评分系统
基于 FIFA 排名初始化，支持赛后动态更新
"""

import json
import math
from dataclasses import dataclass, asdict
from pathlib import Path
import re


@dataclass
class EloRating:
    abbr: str
    elo: float           # 当前 Elo 分
    peak_elo: float      # 历史最高
    games_played: int    # 总比赛数
    wins: int
    draws: int
    losses: int
    trend: str           # "up" / "down" / "stable"


# FIFA 排名 → Elo 初始值映射
# 参考：国际 Elo 评分标准
# 顶级队 (1-10): 1800-2100
# 一流队 (11-20): 1700-1800
# 二流队 (21-30): 1600-1700
# 三流队 (31-40): 1500-1600
# 四流队 (41-50): 1400-1500

RANK_TO_ELO = {
    1: 2100,   # 阿根廷
    2: 2080,   # 法国
    3: 2060,   # 西班牙
    4: 2040,   # 英格兰
    5: 2020,   # 巴西
    6: 2000,   # 荷兰
    7: 1980,   # 葡萄牙
    8: 1960,   # 比利时
    9: 1940,   # 克罗地亚
    10: 1920,  # 德国
    11: 1900,  # 乌拉圭
    12: 1880,  # 美国
    13: 1860,  # 摩洛哥
    14: 1840,  # 哥伦比亚
    15: 1820,  # 墨西哥
    16: 1800,  # 瑞士
    17: 1780,  # 塞内加尔
    18: 1760,  # 日本
    19: 1740,  # 丹麦 (未参赛，用于参考)
    20: 1720,  # 伊朗
    21: 1700,  # 塞尔维亚 (未参赛)
    22: 1680,  # 奥地利
    23: 1660,  # 韩国
    24: 1640,  # 澳大利亚
    25: 1620,  # 瑞典
    26: 1600,  # 土耳其
    27: 1580,  # 乌克兰 (未参赛)
    28: 1560,  # 波兰 (未参赛)
    29: 1540,  # 智利 (未参赛)
    30: 1520,  # 厄瓜多尔
    31: 1500,  # 秘鲁 (未参赛)
    32: 1480,  # 埃及
    33: 1460,  # 捷克
    34: 1440,  # 尼日利亚 (未参赛)
    35: 1420,  # 突尼斯
    36: 1400,  # 捷克
    37: 1380,  # 阿尔及利亚
    38: 1360,  # 科特迪瓦
    39: 1340,  # 苏格兰
    40: 1320,  # 卡塔尔
    41: 1300,  # 喀麦隆 (未参赛)
    42: 1280,  # 挪威
    43: 1260,  # 加拿大
    44: 1240,  # 委内瑞拉 (未参赛)
    45: 1220,  # 希腊 (未参赛)
    46: 1200,  # 巴拉圭
    47: 1180,  # 加纳
    48: 1160,  # 巴拿马
    49: 1140,  # 马里 (未参赛)
    50: 1120,  # 布基纳法索 (未参赛)
    # 参赛但排名靠后的队伍
    55: 1080,  # 巴拉圭
    56: 1060,  # 沙特
    57: 1040,  # 南非
    58: 1020,  # 刚果(金)
    59: 1000,  # 伊拉克
    61: 980,   # 乌兹别克斯坦
    63: 960,   # 波黑
    68: 940,   # 约旦
    72: 920,   # 佛得角
    85: 900,   # 库拉索
    87: 880,   # 海地
    94: 860,   # 新西兰
}


def get_elo_from_rank(rank: int) -> float:
    """从 FIFA 排名估算 Elo 分"""
    # 找到最近的排名
    if rank in RANK_TO_ELO:
        return RANK_TO_ELO[rank]
    
    # 线性插值
    sorted_ranks = sorted(RANK_TO_ELO.keys())
    
    if rank <= sorted_ranks[0]:
        return RANK_TO_ELO[sorted_ranks[0]]
    if rank >= sorted_ranks[-1]:
        return RANK_TO_ELO[sorted_ranks[-1]]
    
    # 找到上下界
    lower = max(r for r in sorted_ranks if r <= rank)
    upper = min(r for r in sorted_ranks if r >= rank)
    
    if lower == upper:
        return RANK_TO_ELO[lower]
    
    # 线性插值
    ratio = (rank - lower) / (upper - lower)
    return RANK_TO_ELO[lower] + ratio * (RANK_TO_ELO[upper] - RANK_TO_ELO[lower])


def expected_score(elo_a: float, elo_b: float) -> float:
    """
    计算 A 对 B 的期望胜率
    E_A = 1 / (1 + 10^((R_B - R_A) / 400))
    """
    return 1.0 / (1.0 + math.pow(10, (elo_b - elo_a) / 400.0))


def update_elo(old_elo: float, expected: float, actual: float, k: int = 32) -> float:
    """
    更新 Elo 分
    actual: 1=胜, 0.5=平, 0=负
    k: 更新系数 (国际比赛通常用 32-60)
    """
    return old_elo + k * (actual - expected)


def generate_elo_ratings() -> dict[str, EloRating]:
    """生成 48 队 Elo 评分"""
    # 读取 teams.ts 获取 FIFA 排名
    teams_path = Path(__file__).parent / 'data' / 'teams.ts'
    with open(teams_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    teams_match = re.search(r'export const TEAMS: Record<string, TeamInfo> = ({.*?});', content, re.DOTALL)
    if not teams_match:
        raise ValueError("无法读取 teams.ts")
    
    teams_data = json.loads(teams_match.group(1))
    
    ratings = {}
    
    for abbr, info in teams_data.items():
        rank = info.get('fifa_rank', 50)
        elo = get_elo_from_rank(rank)
        
        ratings[abbr] = EloRating(
            abbr=abbr,
            elo=round(elo, 1),
            peak_elo=round(elo, 1),
            games_played=0,
            wins=0,
            draws=0,
            losses=0,
            trend="stable",
        )
    
    return ratings


def save_elo_json(ratings: dict[str, EloRating], output_path: str):
    """保存为 JSON"""
    data = {abbr: asdict(rating) for abbr, rating in ratings.items()}
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"✅ 已保存 {len(data)} 队 Elo 评分到 {output_path}")


def save_elo_ts(ratings: dict[str, EloRating], output_path: str):
    """保存为 TypeScript 文件"""
    lines = [
        "// 自动生成的 Elo 评分数据",
        "// 由 elo_system.py 生成",
        "",
        "export interface EloRating {",
        "  abbr: string;",
        "  elo: number;",
        "  peak_elo: number;",
        "  games_played: number;",
        "  wins: number;",
        "  draws: number;",
        "  losses: number;",
        "  trend: string;  // 'up' | 'down' | 'stable'",
        "}",
        "",
        "export const ELO_RATINGS: Record<string, EloRating> = {",
    ]
    
    for abbr, rating in sorted(ratings.items(), key=lambda x: x[1].elo, reverse=True):
        lines.append(f'  "{abbr}": {{')
        lines.append(f'    abbr: "{abbr}",')
        lines.append(f'    elo: {rating.elo},')
        lines.append(f'    peak_elo: {rating.peak_elo},')
        lines.append(f'    games_played: {rating.games_played},')
        lines.append(f'    wins: {rating.wins},')
        lines.append(f'    draws: {rating.draws},')
        lines.append(f'    losses: {rating.losses},')
        lines.append(f'    trend: "{rating.trend}",')
        lines.append(f'  }},')
    
    lines.append("};")
    lines.append("")
    lines.append("/** 获取 Elo 评分 */")
    lines.append("export function getEloRating(abbr: string): EloRating | undefined {")
    lines.append("  return ELO_RATINGS[abbr];")
    lines.append("}")
    lines.append("")
    lines.append("/** 获取 Elo 等级 */")
    lines.append("export function getEloTier(elo: number): string {")
    lines.append("  if (elo >= 2000) return 'S';")
    lines.append("  if (elo >= 1800) return 'A';")
    lines.append("  if (elo >= 1600) return 'B';")
    lines.append("  if (elo >= 1400) return 'C';")
    lines.append("  return 'D';")
    lines.append("}")
    lines.append("")
    lines.append("/** 获取 Elo 等级颜色 */")
    lines.append("export function getEloTierColor(tier: string): string {")
    lines.append("  switch (tier) {")
    lines.append("    case 'S': return 'text-gold';")
    lines.append("    case 'A': return 'text-green';")
    lines.append("    case 'B': return 'text-blue-400';")
    lines.append("    case 'C': return 'text-gray-400';")
    lines.append("    default: return 'text-gray-500';")
    lines.append("  }")
    lines.append("}")
    lines.append("")
    lines.append("/** 计算两队期望胜率 */")
    lines.append("export function expectedScore(eloA: number, eloB: number): number {")
    lines.append("  return 1.0 / (1.0 + Math.pow(10, (eloB - eloA) / 400.0));")
    lines.append("}")
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print(f"✅ 已保存 TypeScript Elo 文件到 {output_path}")


def main():
    """主函数"""
    print("📊 开始生成 Elo 评分数据...")
    
    # 生成数据
    ratings = generate_elo_ratings()
    
    # 输出路径
    output_dir = Path(__file__).parent / 'data'
    
    # 保存 JSON
    save_elo_json(ratings, str(output_dir / 'elo_ratings.json'))
    
    # 保存 TypeScript
    save_elo_ts(ratings, str(output_dir / 'elo_ratings.ts'))
    
    # 统计
    elos = [r.elo for r in ratings.values()]
    print(f"\n📊 Elo 分布:")
    print(f"   最高: {max(elos):.0f}")
    print(f"   最低: {min(elos):.0f}")
    print(f"   平均: {sum(elos)/len(elos):.0f}")
    
    # 分层统计
    tiers = {'S': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0}
    for r in ratings.values():
        if r.elo >= 2000: tiers['S'] += 1
        elif r.elo >= 1800: tiers['A'] += 1
        elif r.elo >= 1600: tiers['B'] += 1
        elif r.elo >= 1400: tiers['C'] += 1
        else: tiers['D'] += 1
    
    print(f"\n🏆 等级分布:")
    for tier, count in tiers.items():
        print(f"   {tier} 级: {count} 队")
    
    # 显示 Top 10
    top10 = sorted(ratings.values(), key=lambda r: r.elo, reverse=True)[:10]
    print(f"\n🥇 Elo Top 10:")
    for i, r in enumerate(top10, 1):
        print(f"   {i:2}. {r.abbr}: {r.elo:.0f}")
    
    print("\n✅ Elo 评分生成完成！")


if __name__ == "__main__":
    main()
