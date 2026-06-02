#!/usr/bin/env python3
"""
蒙特卡洛小组赛模拟器
输入：每场比赛的胜/平/负概率
输出：每支球队的小组出线概率、夺冠概率
"""

import random
from dataclasses import dataclass, field
from typing import Optional
from odds_engine import TeamProbability


@dataclass
class GroupMatch:
    """一场小组赛"""
    home: str
    away: str
    home_win_prob: float   # 0-100
    draw_prob: float       # 0-100
    away_win_prob: float   # 0-100


@dataclass
class GroupStanding:
    """小组赛最终排名"""
    team: str
    played: int = 0
    won: int = 0
    drawn: int = 0
    lost: int = 0
    gf: int = 0   # 进球
    ga: int = 0   # 失球
    points: int = 0

    @property
    def gd(self) -> int:
        return self.gf - self.ga


@dataclass
class SimResult:
    """单次模拟结果"""
    group_winners: list[str]          # 小组前二（出线）
    group_third: Optional[str] = None # 第三名（可能出线）
    champion: Optional[str] = None    # 最终冠军


@dataclass
class GroupAnalysis:
    """蒙特卡洛分析结果"""
    group_name: str
    teams: list[str]
    simulations: int
    advancement_prob: dict[str, float]      # 队名 → 出线概率
    group_winner_prob: dict[str, float]     # 队名 → 小组第一概率
    avg_points: dict[str, float]            # 队名 → 平均积分


def simulate_match(home_win: float, draw: float, away_win: float) -> tuple[int, int]:
    """
    模拟一场比赛，返回 (主队进球, 客队进球)
    
    简化模型：
    - 主胜 → 主队 1-0 或 2-1（随机）
    - 平局 → 0-0 或 1-1（随机）
    - 客胜 → 客队 1-0 或 2-1（随机）
    """
    roll = random.random() * 100
    
    if roll < home_win:
        # 主队赢
        if random.random() < 0.6:
            return (1, 0)
        else:
            return (2, 1)
    elif roll < home_win + draw:
        # 平局
        if random.random() < 0.5:
            return (0, 0)
        else:
            return (1, 1)
    else:
        # 客队赢
        if random.random() < 0.6:
            return (0, 1)
        else:
            return (1, 2)


def simulate_group(
    group_name: str,
    teams: list[str],
    matches: list[GroupMatch],
    n_simulations: int = 10000,
) -> GroupAnalysis:
    """
    蒙特卡洛模拟一个小组
    
    4 队单循环，6 场比赛。前二出线。
    """
    # 初始化统计
    advancement_count = {t: 0 for t in teams}
    winner_count = {t: 0 for t in teams}
    total_points = {t: 0 for t in teams}
    
    for _ in range(n_simulations):
        standings = {t: GroupStanding(team=t) for t in teams}
        
        for match in matches:
            hg, ag = simulate_match(match.home_win_prob, match.draw_prob, match.away_win_prob)
            
            h = standings[match.home]
            a = standings[match.away]
            h.played += 1
            a.played += 1
            h.gf += hg
            h.ga += ag
            a.gf += ag
            a.ga += hg
            
            if hg > ag:
                h.won += 1
                h.points += 3
                a.lost += 1
            elif hg == ag:
                h.drawn += 1
                a.drawn += 1
                h.points += 1
                a.points += 1
            else:
                a.won += 1
                a.points += 3
                h.lost += 1
        
        # 排序：积分 > 净胜球 > 进球数
        sorted_teams = sorted(
            standings.values(),
            key=lambda s: (s.points, s.gd, s.gf),
            reverse=True,
        )
        
        # 前二出线
        advancement_count[sorted_teams[0].team] += 1
        advancement_count[sorted_teams[1].team] += 1
        winner_count[sorted_teams[0].team] += 1
        
        for t in teams:
            total_points[t] += standings[t].points
    
    return GroupAnalysis(
        group_name=group_name,
        teams=teams,
        simulations=n_simulations,
        advancement_prob={t: round(advancement_count[t] / n_simulations * 100, 1) for t in teams},
        group_winner_prob={t: round(winner_count[t] / n_simulations * 100, 1) for t in teams},
        avg_points={t: round(total_points[t] / n_simulations, 2) for t in teams},
    )


def print_group_analysis(analysis: GroupAnalysis):
    """漂亮地输出小组分析"""
    print(f"\n{'='*50}")
    print(f"🏟️  小组 {analysis.group_name}  ({analysis.simulations:,} 次模拟)")
    print(f"{'='*50}")
    print(f"{'队伍':<12} {'出线%':>8} {'小组第一%':>10} {'平均积分':>10}")
    print(f"{'-'*42}")
    
    for team in sorted(analysis.teams, key=lambda t: analysis.advancement_prob[t], reverse=True):
        adv = analysis.advancement_prob[team]
        win = analysis.group_winner_prob[team]
        pts = analysis.avg_points[team]
        
        # 可视化条
        bar_len = int(adv / 2)
        bar = "█" * bar_len + "░" * (50 - bar_len)
        
        print(f"{team:<12} {adv:>6.1f}%  {win:>8.1f}%  {pts:>8.2f}")
        print(f"             {bar}")


# ─── 测试 ──────────────────────────────────────────────────────────────────

def test_group_a():
    """模拟 A 组：美国、哥伦比亚、塞内加尔、沙特"""
    matches = [
        GroupMatch("美国", "哥伦比亚",  45, 28, 27),
        GroupMatch("美国", "塞内加尔",  50, 25, 25),
        GroupMatch("美国", "沙特",      60, 22, 18),
        GroupMatch("哥伦比亚", "塞内加尔", 40, 30, 30),
        GroupMatch("哥伦比亚", "沙特",     55, 25, 20),
        GroupMatch("塞内加尔", "沙特",     48, 27, 25),
    ]
    
    result = simulate_group("A", ["美国", "哥伦比亚", "塞内加尔", "沙特"], matches)
    print_group_analysis(result)
    return result


def test_all_groups():
    """模拟全部 12 个小组（使用示例概率）"""
    groups = {
        "A": (["美国", "哥伦比亚", "塞内加尔", "沙特"], [
            GroupMatch("美国", "哥伦比亚",  45, 28, 27),
            GroupMatch("塞内加尔", "沙特",   48, 27, 25),
            GroupMatch("美国", "塞内加尔",   50, 25, 25),
            GroupMatch("哥伦比亚", "沙特",   55, 25, 20),
            GroupMatch("美国", "沙特",       60, 22, 18),
            GroupMatch("哥伦比亚", "塞内加尔", 40, 30, 30),
        ]),
        "B": (["英格兰", "日本", "巴西", "新西兰"], [
            GroupMatch("英格兰", "日本",     50, 25, 25),
            GroupMatch("巴西", "新西兰",     70, 18, 12),
            GroupMatch("英格兰", "巴西",     35, 28, 37),
            GroupMatch("日本", "新西兰",     55, 25, 20),
            GroupMatch("英格兰", "新西兰",   65, 20, 15),
            GroupMatch("日本", "巴西",       22, 25, 53),
        ]),
        "C": (["阿根廷", "墨西哥", "冰岛", "南非"], [
            GroupMatch("阿根廷", "墨西哥",   55, 25, 20),
            GroupMatch("冰岛", "南非",       42, 30, 28),
            GroupMatch("阿根廷", "冰岛",     62, 22, 16),
            GroupMatch("墨西哥", "南非",     52, 27, 21),
            GroupMatch("阿根廷", "南非",     68, 20, 12),
            GroupMatch("墨西哥", "冰岛",     48, 28, 24),
        ]),
    }
    
    all_results = {}
    for name, (teams, matches) in groups.items():
        result = simulate_group(name, teams, matches, n_simulations=10000)
        print_group_analysis(result)
        all_results[name] = result
    
    return all_results


if __name__ == "__main__":
    random.seed(42)  # 固定种子方便复现
    print("🎲 2026 世界杯小组赛蒙特卡洛模拟")
    print("=" * 50)
    test_all_groups()
