#!/usr/bin/env python3
"""
比赛预测生成器 — 从赔率推算最可能比分 + 赛前预览
数学模型: 赔率 → 隐含概率 → 期望进球(xG) → Poisson分布 → 最可能比分
输出: public/match-previews.json
"""
import json
import math
import os
import re
import sys
from datetime import datetime, timezone

# ============ 工具函数 ============

def american_to_prob(odds_str):
    """美式赔率 → 隐含概率"""
    odds = int(odds_str.replace("+", ""))
    if odds < 0:
        return abs(odds) / (abs(odds) + 100)
    else:
        return 100 / (odds + 100)


def prob_to_xg(home_prob, draw_prob, away_prob):
    """
    从胜平负概率推算期望进球数(xG)
    基于 Dixon-Coles 简化模型:
    - 总期望进球 ≈ 2.5 (世界杯平均)
    - 主场优势 ≈ +0.15 xG
    - 胜率越高, xG差距越大
    """
    # 归一化概率
    total = home_prob + draw_prob + away_prob
    hp = home_prob / total
    dp = draw_prob / total
    ap = away_prob / total

    # 期望总进球 (世界杯平均每场2.5球)
    total_goals = 2.5

    # 从胜率推算进球差
    # 胜率差距越大, 进球差越大
    goal_diff = (hp - ap) * 2.5  # 最大差约2球

    # 主队xG = (总进球 + 进球差) / 2
    home_xg = max(0.3, (total_goals + goal_diff) / 2)
    away_xg = max(0.3, (total_goals - goal_diff) / 2)

    return round(home_xg, 2), round(away_xg, 2)


def poisson_prob(lam, k):
    """Poisson分布: P(X=k) = λ^k * e^(-λ) / k!"""
    return (lam ** k) * math.exp(-lam) / math.factorial(k)


def score_matrix(home_xg, away_xg, max_goals=6):
    """生成比分概率矩阵"""
    matrix = []
    for h in range(max_goals + 1):
        row = []
        for a in range(max_goals + 1):
            p = poisson_prob(home_xg, h) * poisson_prob(away_xg, a)
            row.append(round(p * 100, 1))
        matrix.append(row)
    return matrix


def top_scores(matrix, n=5):
    """最可能的N个比分"""
    scores = []
    for h, row in enumerate(matrix):
        for a, prob in enumerate(row):
            scores.append({"home": h, "away": a, "prob": prob})
    scores.sort(key=lambda x: -x["prob"])
    return scores[:n]


# ============ 球队信息 ============

TEAM_NAMES = {
    "MEX": "墨西哥", "RSA": "南非", "KOR": "韩国", "CZE": "捷克",
    "CAN": "加拿大", "BIH": "波黑", "USA": "美国", "PAR": "巴拉圭",
    "QAT": "卡塔尔", "SUI": "瑞士", "BRA": "巴西", "MAR": "摩洛哥",
    "HAI": "海地", "SCO": "苏格兰", "AUS": "澳大利亚", "TUR": "土耳其",
    "GER": "德国", "CUW": "库拉索", "ENG": "英格兰", "SRB": "塞尔维亚",
    "FRA": "法国", "NZL": "新西兰", "ARG": "阿根廷", "NGA": "尼日利亚",
    "ESP": "西班牙", "JPN": "日本", "POR": "葡萄牙", "GHA": "加纳",
    "COL": "哥伦比亚", "URU": "乌拉圭", "SEN": "塞内加al", "ECU": "厄瓜多尔",
    "NED": "荷兰", "CHI": "智利", "BEL": "比利时", "CRC": "哥斯达黎加",
    "MOR": "摩洛哥", "CRO": "克罗地亚", "MNE": "黑山", "KSA": "沙特",
    "UKR": "乌克兰", "PAN": "巴拿马", "ITA": "意大利", "CHN": "中国",
    "POL": "波兰", "IRN": "伊朗", "MEX": "墨西哥", "BOL": "玻利维亚",
    "PER": "秘鲁", "VEN": "委内瑞拉", "IRQ": "伊拉克", "JAM": "牙买加",
    "UZB": "乌兹别克斯坦", "JOR": "约旦", "UAE": "阿联酋", "BHR": "巴林",
    "OMA": "阿曼", "IDN": "印尼", "SVK": "斯洛伐克", "NIR": "北爱尔兰",
}

# ============ 赛前分析模板 ============

def generate_preview(home, away, home_xg, away_xg, top_5, home_win, draw, away_win, details):
    """生成赛前预览文案"""
    h_name = TEAM_NAMES.get(home, home)
    a_name = TEAM_NAMES.get(away, away)

    # 判断强弱
    if home_win > 65:
        verdict = f"{h_name}大热，晋级概率极高"
        style = "强弱分明"
    elif home_win > 50:
        verdict = f"{h_name}略占上风，但{a_name}不可小觑"
        style = "主队优势"
    elif away_win > 50:
        verdict = f"{a_name}反客为主，有望客场拿分"
        style = "客队优势"
    elif draw > 30:
        verdict = "势均力敌，平局概率最高"
        style = "五五开"
    else:
        verdict = "两队实力接近，胜负难料"
        style = "接近对决"

    # 最可能比分
    s1 = top_5[0]
    s2 = top_5[1]
    likely = f"{s1['home']}-{s1['away']}({s1['prob']}%) 或 {s2['home']}-{s2['away']}({s2['prob']}%)"

    # 进球预期
    total_xg = home_xg + away_xg
    if total_xg > 3.0:
        goals_note = "进球大战，大2.5值得关注"
    elif total_xg > 2.2:
        goals_note = "正常节奏，2-3球可期"
    else:
        goals_note = "闷战为主，小2.5概率高"

    return {
        "match": f"{h_name} vs {a_name}",
        "home": home,
        "away": away,
        "home_name": h_name,
        "away_name": a_name,
        "style": style,
        "verdict": verdict,
        "likely_score": likely,
        "goals_note": goals_note,
        "home_xg": home_xg,
        "away_xg": away_xg,
        "top_scores": [{"score": f"{s['home']}-{s['away']}", "prob": s['prob']} for s in top_5],
        "odds": details,
        "probabilities": {
            "home_win": round(home_win, 1),
            "draw": round(draw, 1),
            "away_win": round(away_win, 1),
        }
    }


# ============ 主函数 ============

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    predictions_path = os.path.join(project_root, "src/data/predictions.ts")
    output_path = os.path.join(project_root, "public/match-previews.json")

    # 读取 predictions.ts
    try:
        with open(predictions_path, "r") as f:
            content = f.read()
        # 提取 PREDICTIONS 数组: 找到 "= [" 后的 JSON
        marker = "PREDICTIONS: MatchPrediction[] ="
        eq_idx = content.index(marker)
        start = content.index("[", eq_idx + len(marker))
        # 找匹配的 ]
        depth = 0
        end = start
        for i in range(start, len(content)):
            if content[i] == "[":
                depth += 1
            elif content[i] == "]":
                depth -= 1
                if depth == 0:
                    end = i + 1
                    break
        raw = content[start:end]
        # JS允许尾逗号, JSON不允许 → 清理
        raw = re.sub(r',\s*]', ']', raw)
        predictions = json.loads(raw)
    except Exception as e:
        print(f"❌ 读取predictions.ts失败: {e}")
        sys.exit(1)

    print(f"📊 读取 {len(predictions)} 场比赛赔率数据")

    previews = []
    for pred in predictions:
        home = pred["home"]
        away = pred["away"]
        home_win = pred["home_win"]
        draw = pred["draw"]
        away_win = pred["away_win"]
        details = pred.get("details", "")

        # 计算xG
        home_xg, away_xg = prob_to_xg(home_win, draw, away_win)

        # 生成比分矩阵
        matrix = score_matrix(home_xg, away_xg)

        # 最可能的5个比分
        top_5 = top_scores(matrix, 5)

        # 生成预览
        preview = generate_preview(home, away, home_xg, away_xg, top_5,
                                    home_win, draw, away_win, details)
        previews.append(preview)

    # 输出
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(previews, f, ensure_ascii=False, indent=2)

    print(f"✅ 生成 {len(previews)} 场比赛预览 → {output_path}")

    # 预览前3场
    for p in previews[:3]:
        print(f"\n⚽ {p['match']}")
        print(f"   预测: {p['verdict']}")
        print(f"   最可能比分: {p['likely_score']}")
        print(f"   进球预期: {p['goals_note']} (xG: {p['home_xg']}-{p['away_xg']})")


if __name__ == "__main__":
    main()
