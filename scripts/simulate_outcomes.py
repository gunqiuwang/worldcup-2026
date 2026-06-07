#!/usr/bin/env python3
"""
蒙特卡洛小组出线模拟器
数据源: predictions.ts (PREDICTIONS 数组)
输出: predictions.ts (GROUP_PREDICTIONS 对象)

每场模拟 10000 次，计算:
- advancement_pct: 出线概率 (前2名)
- winner_pct: 小组第一概率
- avg_points: 平均积分
- avg_gf / avg_ga: 平均进球/失球
"""

import json
import os
import re
import random
from datetime import datetime, timezone

# 小组定义 (和 teams.ts 同步)
GROUPS = {
    "A": ["ARG", "ALG", "AUT", "JOR"],
    "B": ["USA", "PAR", "AUS", "TUR"],
    "C": ["BEL", "EGY", "IRN", "NZL"],
    "D": ["CAN", "BIH", "QAT", "SUI"],
    "E": ["BRA", "HAI", "MAR", "SCO"],
    "F": ["GER", "CUW", "CIV", "ECU"],
    "G": ["COL", "POR", "COD", "UZB"],
    "H": ["ESP", "CPV", "KSA", "URU"],
    "I": ["ENG", "CRO", "GHA", "PAN"],
    "J": ["MEX", "CZE", "KOR", "RSA"],
    "K": ["FRA", "IRQ", "NOR", "SEN"],
    "L": ["NED", "JPN", "SWE", "TUN"],
}

# 每个小组的3轮对阵 (home, away) — 必须和 predictions.ts 的 key 一致
GROUP_FIXTURES = {
    "A": [("ARG","ALG"), ("AUT","JOR"), ("ARG","AUT"), ("JOR","ALG"), ("ALG","AUT"), ("JOR","ARG")],
    "B": [("USA","PAR"), ("AUS","TUR"), ("USA","AUS"), ("TUR","PAR"), ("PAR","AUS"), ("TUR","USA")],
    "C": [("BEL","EGY"), ("IRN","NZL"), ("BEL","IRN"), ("NZL","EGY"), ("EGY","IRN"), ("NZL","BEL")],
    "D": [("CAN","BIH"), ("QAT","SUI"), ("CAN","QAT"), ("SUI","BIH"), ("BIH","QAT"), ("SUI","CAN")],
    "E": [("BRA","MAR"), ("HAI","SCO"), ("SCO","MAR"), ("BRA","HAI"), ("MAR","HAI"), ("SCO","BRA")],
    "F": [("GER","CUW"), ("CIV","ECU"), ("GER","CIV"), ("ECU","CUW"), ("CUW","CIV"), ("ECU","GER")],
    "G": [("POR","COD"), ("UZB","COL"), ("POR","UZB"), ("COL","COD"), ("COL","POR"), ("COD","UZB")],
    "H": [("ESP","CPV"), ("KSA","URU"), ("ESP","KSA"), ("URU","CPV"), ("CPV","KSA"), ("URU","ESP")],
    "I": [("ENG","CRO"), ("GHA","PAN"), ("ENG","GHA"), ("PAN","CRO"), ("CRO","GHA"), ("PAN","ENG")],
    "J": [("MEX","RSA"), ("KOR","CZE"), ("CZE","RSA"), ("MEX","KOR"), ("CZE","MEX"), ("RSA","KOR")],
    "K": [("FRA","SEN"), ("IRQ","NOR"), ("FRA","IRQ"), ("NOR","SEN"), ("NOR","FRA"), ("SEN","IRQ")],
    "L": [("NED","JPN"), ("SWE","TUN"), ("NED","SWE"), ("TUN","JPN"), ("JPN","SWE"), ("TUN","NED")],
}

SIMULATIONS = 10000


def parse_predictions(pred_path):
    """从 predictions.ts 解析 PREDICTIONS 数组"""
    with open(pred_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 提取 PREDICTIONS 数组
    match = re.search(
        r"export const PREDICTIONS: MatchPrediction\[\] = \[(.*?)\];",
        content,
        re.DOTALL,
    )
    if not match:
        raise ValueError("找不到 PREDICTIONS 数组")

    array_str = match.group(1)

    # 解析每个对象
    predictions = {}
    for obj_match in re.finditer(r'\{[^}]+\}', array_str):
        obj_str = obj_match.group()
        # 用 json.loads 解析
        obj = json.loads(obj_str)
        home = obj["home"]
        away = obj["away"]
        key = (home, away)
        predictions[key] = {
            "home_win": obj["home_win"] / 100,
            "draw": obj["draw"] / 100,
            "away_win": obj["away_win"] / 100,
        }

    return predictions


def simulate_group(group, fixtures, predictions):
    """模拟一个小组的所有比赛"""
    teams = GROUPS[group]

    # 统计
    stats = {t: {"points": 0, "gf": 0, "ga": 0, "advancement": 0, "winner": 0} for t in teams}

    for _ in range(SIMULATIONS):
        # 重置本轮统计
        sim = {t: {"points": 0, "gf": 0, "ga": 0} for t in teams}

        for home, away in fixtures:
            key = (home, away)
            if key not in predictions:
                # 如果没有赔率数据，用默认概率
                probs = {"home_win": 0.45, "draw": 0.25, "away_win": 0.30}
            else:
                probs = predictions[key]

            # 随机生成比赛结果
            r = random.random()
            if r < probs["home_win"]:
                # 主胜
                hg, ag = generate_score(home_win=True)
                sim[home]["points"] += 3
            elif r < probs["home_win"] + probs["draw"]:
                # 平局
                hg, ag = generate_score(draw=True)
                sim[home]["points"] += 1
                sim[away]["points"] += 1
            else:
                # 客胜
                hg, ag = generate_score(home_win=False)
                sim[away]["points"] += 3

            sim[home]["gf"] += hg
            sim[home]["ga"] += ag
            sim[away]["gf"] += ag
            sim[away]["ga"] += hg

        # 排名: 积分 → 净胜球 → 进球数
        ranked = sorted(
            teams,
            key=lambda t: (sim[t]["points"], sim[t]["gf"] - sim[t]["ga"], sim[t]["gf"]),
            reverse=True,
        )

        # 统计
        for t in teams:
            stats[t]["points"] += sim[t]["points"]
            stats[t]["gf"] += sim[t]["gf"]
            stats[t]["ga"] += sim[t]["ga"]

        # 前2名出线
        for t in ranked[:2]:
            stats[t]["advancement"] += 1
        # 第1名
        stats[ranked[0]]["winner"] += 1

    # 计算百分比
    result = []
    for t in teams:
        s = stats[t]
        result.append({
            "team": t,
            "advancement_pct": round(s["advancement"] / SIMULATIONS * 100, 1),
            "winner_pct": round(s["winner"] / SIMULATIONS * 100, 1),
            "avg_points": round(s["points"] / SIMULATIONS, 2),
            "avg_gf": round(s["gf"] / SIMULATIONS, 2),
            "avg_ga": round(s["ga"] / SIMULATIONS, 2),
        })

    # 按出线概率排序
    result.sort(key=lambda x: (-x["advancement_pct"], -x["winner_pct"]))
    return result


def generate_score(home_win=False, draw=False):
    """生成合理的比分"""
    if draw:
        # 平局: 0-0, 1-1, 2-2 为主
        r = random.random()
        if r < 0.35:
            return 0, 0
        elif r < 0.70:
            return 1, 1
        elif r < 0.88:
            return 2, 2
        else:
            return 3, 3
    elif home_win:
        # 主胜
        r = random.random()
        if r < 0.30:
            return 1, 0
        elif r < 0.55:
            return 2, 0
        elif r < 0.70:
            return 2, 1
        elif r < 0.82:
            return 3, 0
        elif r < 0.90:
            return 3, 1
        else:
            return random.choice([(3,2), (4,0), (4,1), (4,2)])
    else:
        # 客胜
        r = random.random()
        if r < 0.30:
            return 0, 1
        elif r < 0.55:
            return 0, 2
        elif r < 0.70:
            return 1, 2
        elif r < 0.82:
            return 0, 3
        elif r < 0.90:
            return 1, 3
        else:
            return random.choice([(2,3), (0,4), (1,4), (2,4)])


def update_predictions_file(pred_path, group_predictions):
    """更新 predictions.ts 中的 GROUP_PREDICTIONS"""
    with open(pred_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 构建新的 GROUP_PREDICTIONS
    gp_lines = ["export const GROUP_PREDICTIONS: Record<string, GroupPrediction> = {"]
    for group in sorted(group_predictions.keys()):
        teams = group_predictions[group]
        gp_lines.append(f'  "{group}": {{')
        gp_lines.append(f'    "group": "{group}",')
        gp_lines.append(f'    "simulations": {SIMULATIONS},')
        gp_lines.append('    "teams": [')
        for t in teams:
            gp_lines.append('      {')
            gp_lines.append(f'        "team": "{t["team"]}",')
            gp_lines.append(f'        "advancement_pct": {t["advancement_pct"]},')
            gp_lines.append(f'        "winner_pct": {t["winner_pct"]},')
            gp_lines.append(f'        "avg_points": {t["avg_points"]},')
            gp_lines.append(f'        "avg_gf": {t["avg_gf"]},')
            gp_lines.append(f'        "avg_ga": {t["avg_ga"]}')
            gp_lines.append('      },')
        gp_lines.append('    ]')
        gp_lines.append('  },')
    gp_lines.append("};")
    new_gp = "\n".join(gp_lines)

    # 替换 GROUP_PREDICTIONS
    pattern = r"export const GROUP_PREDICTIONS: Record<string, GroupPrediction> = \{.*?\};"
    updated = re.sub(pattern, new_gp, content, flags=re.DOTALL)

    # 更新时间戳
    updated = re.sub(
        r"// 出线率来自蒙特卡洛模拟.*",
        f"// 出线率来自蒙特卡洛模拟 ({SIMULATIONS}次, 最后更新: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')})",
        updated,
    )

    with open(pred_path, "w", encoding="utf-8") as f:
        f.write(updated)


def main():
    print("🎲 蒙特卡洛小组出线模拟器")
    print(f"⏰ {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"📊 每组模拟 {SIMULATIONS} 次")

    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.dirname(script_dir)
    pred_path = os.path.join(project_dir, "src", "data", "predictions.ts")

    # 1. 解析赔率
    print("\n📡 解析 PREDICTIONS...")
    predictions = parse_predictions(pred_path)
    print(f"  ✅ {len(predictions)} 场比赛赔率")

    # 2. 模拟每个小组
    print(f"\n🎲 模拟 {len(GROUPS)} 个小组...")
    group_predictions = {}
    for group in sorted(GROUPS.keys()):
        fixtures = GROUP_FIXTURES[group]
        result = simulate_group(group, fixtures, predictions)
        group_predictions[group] = result

        # 打印摘要
        top = result[0]
        print(f"  {group}组: {top['team']} {top['advancement_pct']}% 出线 | {top['winner_pct']}% 小组第一")

    # 3. 更新 predictions.ts
    print("\n✏️ 更新 predictions.ts...")
    update_predictions_file(pred_path, group_predictions)
    print(f"  ✅ GROUP_PREDICTIONS 已更新")

    print("\n✅ 完成!")


if __name__ == "__main__":
    main()
