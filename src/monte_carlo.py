#!/usr/bin/env python3
"""
蒙特卡洛小组赛模拟器 v2 — Poisson 比分模型

输入：每场比赛的胜/平/负概率（来自赔率反算）
输出：每支球队的小组出线概率、小组第一概率、平均积分

改进：用 Poisson 分布模拟具体比分，正确处理净胜球/进球数排名
"""

import math
import random
from collections import Counter
from dataclasses import dataclass
from typing import Optional


# === 数据结构 ===

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
    """小组赛排名"""
    team: str
    played: int = 0
    won: int = 0
    drawn: int = 0
    lost: int = 0
    gf: int = 0
    ga: int = 0
    points: int = 0

    @property
    def gd(self) -> int:
        return self.gf - self.ga


@dataclass
class GroupAnalysis:
    """蒙特卡洛分析结果"""
    group_name: str
    teams: list[str]
    simulations: int
    advancement_prob: dict[str, float]
    group_winner_prob: dict[str, float]
    avg_points: dict[str, float]
    avg_gf: dict[str, float]
    avg_ga: dict[str, float]


# === Poisson 模型 ===

def _probs_to_lambda(home_win: float, draw: float, away_win: float) -> tuple[float, float]:
    """
    从胜/平/负概率推导期望进球数 (lambda)

    方法：用 Dixon-Coles 简化近似
    - 胜率越高 → 进攻越强 → lambda 越大
    - 平率高 → 两队实力接近
    """
    # 归一化
    total = home_win + draw + away_win
    if total == 0:
        return (1.2, 1.0)
    hw = home_win / total
    dr = draw / total
    aw = away_win / total

    # 主队期望进球：主胜概率越高 → 越高
    # 客队期望进球：客胜概率越高 → 越高
    # 平局 → 两队接近
    home_lambda = 0.8 + hw * 1.8 + dr * 0.4
    away_lambda = 0.5 + aw * 1.8 + dr * 0.4

    # 限制在合理范围
    home_lambda = max(0.3, min(3.5, home_lambda))
    away_lambda = max(0.2, min(3.5, away_lambda))

    return (home_lambda, away_lambda)


def _poisson_pmf(k: int, lam: float) -> float:
    """Poisson PMF: P(X=k) = e^(-λ) * λ^k / k!"""
    if lam <= 0:
        return 1.0 if k == 0 else 0.0
    return math.exp(-lam) * (lam ** k) / math.factorial(k)


def _sample_poisson(lam: float) -> int:
    """从 Poisson 分布采样"""
    # Knuth's algorithm
    L = math.exp(-lam)
    k = 0
    p = 1.0
    while True:
        k += 1
        p *= random.random()
        if p < L:
            return k - 1


def simulate_match_poisson(home_win: float, draw: float, away_win: float) -> tuple[int, int]:
    """
    用 Poisson 分布模拟一场比赛比分

    输入：主胜/平/客胜概率 (0-100)
    输出：(主队进球, 客队进球)
    """
    home_lam, away_lam = _probs_to_lambda(home_win, draw, away_win)

    # 采样
    hg = _sample_poisson(home_lam)
    ag = _sample_poisson(away_lam)

    # 防止超大比分（实际世界杯单场很少超过 6 球）
    hg = min(hg, 7)
    ag = min(ag, 7)

    return (hg, ag)


# === 小组模拟 ===

def simulate_group(
    group_name: str,
    teams: list[str],
    matches: list[GroupMatch],
    n_simulations: int = 10000,
) -> GroupAnalysis:
    """
    蒙特卡洛模拟一个小组

    4 队单循环，6 场比赛。排名规则：
    1. 积分
    2. 净胜球
    3. 进球数
    4. 相互战绩（简化版暂不处理）
    """
    advancement_count = {t: 0 for t in teams}
    winner_count = {t: 0 for t in teams}
    total_points = {t: 0 for t in teams}
    total_gf = {t: 0 for t in teams}
    total_ga = {t: 0 for t in teams}

    for _ in range(n_simulations):
        standings = {t: GroupStanding(team=t) for t in teams}

        for match in matches:
            hg, ag = simulate_match_poisson(
                match.home_win_prob, match.draw_prob, match.away_win_prob
            )

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
            total_gf[t] += standings[t].gf
            total_ga[t] += standings[t].ga

    return GroupAnalysis(
        group_name=group_name,
        teams=teams,
        simulations=n_simulations,
        advancement_prob={t: round(advancement_count[t] / n_simulations * 100, 1) for t in teams},
        group_winner_prob={t: round(winner_count[t] / n_simulations * 100, 1) for t in teams},
        avg_points={t: round(total_points[t] / n_simulations, 2) for t in teams},
        avg_gf={t: round(total_gf[t] / n_simulations, 2) for t in teams},
        avg_ga={t: round(total_ga[t] / n_simulations, 2) for t in teams},
    )


# === 输出 ===

def analysis_to_dict(a: GroupAnalysis) -> dict:
    """转成 JSON 可序列化的 dict"""
    return {
        'group': a.group_name,
        'simulations': a.simulations,
        'teams': [
            {
                'team': t,
                'advancement_pct': a.advancement_prob[t],
                'winner_pct': a.group_winner_prob[t],
                'avg_points': a.avg_points[t],
                'avg_gf': a.avg_gf[t],
                'avg_ga': a.avg_ga[t],
            }
            for t in sorted(a.teams, key=lambda x: a.advancement_prob[x], reverse=True)
        ],
    }


def print_group_analysis(analysis: GroupAnalysis):
    """漂亮输出"""
    print(f"\n{'='*55}")
    print(f"🏟️  小组 {analysis.group_name}  ({analysis.simulations:,} 次模拟)")
    print(f"{'='*55}")
    print(f"{'队伍':<12} {'出线%':>8} {'第一%':>8} {'均分':>6} {'均进球':>7} {'均失球':>7}")
    print(f"{'-'*55}")

    for team in sorted(analysis.teams, key=lambda t: analysis.advancement_prob[t], reverse=True):
        adv = analysis.advancement_prob[team]
        win = analysis.group_winner_prob[team]
        pts = analysis.avg_points[team]
        gf = analysis.avg_gf[team]
        ga = analysis.avg_ga[team]
        print(f"{team:<12} {adv:>6.1f}%  {win:>6.1f}%  {pts:>5.2f}  {gf:>5.2f}  {ga:>5.2f}")


# === 测试 ===

def test_poisson():
    """验证 Poisson 模型分布合理性"""
    print("🎲 Poisson 模型验证")
    print("主胜60% / 平25% / 客胜15% → 应该是强队主场")
    results = Counter()
    for _ in range(10000):
        hg, ag = simulate_match_poisson(60, 25, 15)
        results[(hg, ag)] += 1

    print("\n比分分布 (top 10):")
    for (hg, ag), count in results.most_common(10):
        pct = count / 100
        bar = "█" * int(pct * 2)
        print(f"  {hg}-{ag}: {pct:>5.1f}% {bar}")


def test_group_j():
    """模拟 J 组：墨西哥、捷克、韩国、南非"""
    matches = [
        GroupMatch("MEX", "RSA", 55, 25, 20),
        GroupMatch("KOR", "CZE", 40, 30, 30),
        GroupMatch("MEX", "KOR", 45, 28, 27),
        GroupMatch("CZE", "RSA", 45, 28, 27),
        GroupMatch("CZE", "MEX", 30, 28, 42),
        GroupMatch("RSA", "KOR", 25, 28, 47),
    ]
    result = simulate_group("J", ["MEX", "CZE", "KOR", "RSA"], matches, n_simulations=10000)
    print_group_analysis(result)
    return result


if __name__ == "__main__":
    random.seed(42)
    print("🎲 2026 世界杯蒙特卡洛模拟器 v2 (Poisson)")
    print("=" * 55)
    test_poisson()
    print()
    test_group_j()
