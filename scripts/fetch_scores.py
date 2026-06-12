#!/usr/bin/env python3
"""
世界杯实时比分更新器 v1
数据源: ESPN API (免费, 无限次)
输出:
  - src/data/live_scores.json (比分+状态)
  - src/data/standings.json (积分榜, 开赛后自动生成)
"""

import json
import urllib.request
import os
import sys
from datetime import datetime, timezone

# ESPN API endpoints
ESPN_BASE = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world"

# 国家名映射 (ESPN英文 → 中文)
TEAM_CN = {
    "Mexico": "墨西哥", "South Africa": "南非", "South Korea": "韩国",
    "Czechia": "捷克", "Canada": "加拿大", "Bosnia-Herzegovina": "波黑",
    "United States": "美国", "Paraguay": "巴拉圭", "Qatar": "卡塔尔",
    "Switzerland": "瑞士", "France": "法国", "Australia": "澳大利亚",
    "Argentina": "阿根廷", "Brazil": "巴西", "England": "英格兰",
    "Germany": "德国", "Spain": "西班牙", "Portugal": "葡萄牙",
    "Netherlands": "荷兰", "Belgium": "比利时", "Croatia": "克罗地亚",
    "Morocco": "摩洛哥", "Japan": "日本", "Colombia": "哥伦比亚",
    "Uruguay": "乌拉圭", "Senegal": "塞内加尔", "Ecuador": "厄瓜多尔",
    "Iran": "伊朗", "Saudi Arabia": "沙特", "Egypt": "埃及",
    "New Zealand": "新西兰", "Ghana": "加纳", "Tunisia": "突尼斯",
    "Jamaica": "牙买加", "Panama": "巴拿马", "Honduras": "洪都拉斯",
    "El Salvador": "萨尔瓦多", "Costa Rica": "哥斯达黎加",
    "Nigeria": "尼日利亚", "Cameroon": "喀麦隆", "Serbia": "塞尔维亚",
    "Denmark": "丹麦", "Poland": "波兰", "Sweden": "瑞典",
    "Wales": "威尔士", "Scotland": "苏格兰", "Ukraine": "乌克兰",
    "Italy": "意大利", "Norway": "挪威", "Austria": "奥地利",
    "Türkiye": "土耳其", "Turkey": "土耳其", "Peru": "秘鲁",
    "Ireland": "爱尔兰", "Algeria": "阿尔及利亚", "Ivory Coast": "科特迪瓦",
    "DR Congo": "刚果(金)", "Uzbekistan": "乌兹别克斯坦",
    "Jordan": "约旦", "Palestine": "巴勒斯坦", "Indonesia": "印尼",
    "Iraq": "伊拉克", "Bahrain": "巴林", "Kuwait": "科威特",
    "Curaçao": "库拉索", "Haiti": "海地",
    "Côte d'Ivoire": "科特迪瓦",
}

# ESPN 国家代码 → 我们的代码
ESPN_TO_ABBR = {
    "MEX": "MEX", "RSA": "RSA", "ZAF": "RSA", "KOR": "KOR",
    "CZE": "CZE", "CAN": "CAN", "BIH": "BIH", "USA": "USA",
    "PAR": "PAR", "QAT": "QAT", "SUI": "SUI", "CHE": "SUI",
    "FRA": "FRA", "AUS": "AUS", "ARG": "ARG", "BRA": "BRA",
    "ENG": "ENG", "GER": "GER", "DEU": "GER", "ESP": "ESP",
    "POR": "POR", "NED": "NED", "NLD": "NED", "BEL": "BEL",
    "CRO": "CRO", "HRV": "CRO", "MAR": "MAR", "JPN": "JPN",
    "COL": "COL", "URU": "URU", "SEN": "SEN", "ECU": "ECU",
    "IRN": "IRN",    "SAU": "KSA", "EGY": "EGY", "NZL": "NZL",
    "GHA": "GHA", "TUN": "TUN", "JAM": "JAM", "PAN": "PAN",
    "HON": "HON", "SLV": "SLV", "CRC": "CRC", "NGA": "NGA",
    "CMR": "CMR", "SRB": "SRB", "DNK": "DNK", "DEN": "DEN",
    "POL": "POL", "SWE": "SWE", "WAL": "WAL", "SCO": "SCO",
    "UKR": "UKR", "ITA": "ITA", "NOR": "NOR", "AUT": "AUT",
    "TUR": "TUR", "PER": "PER", "IRL": "IRL", "DZA": "DZA",
    "ALG": "ALG", "CIV": "CIV", "COD": "COD", "UZB": "UZB",
    "JOR": "JOR", "PSE": "PSE", "IDN": "IDN", "IRQ": "IRQ",
    "BHR": "BHR", "KWT": "KWT", "CUW": "CUW", "HAI": "HAI",
}


def fetch_json(url):
    """Fetch JSON from URL"""
    req = urllib.request.Request(url, headers={"User-Agent": "WorldCup2026Bot/1.0"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        return json.loads(resp.read().decode())


def espn_status_to_our(status_type):
    """ESPN status → our status"""
    state = status_type.get("state", "")
    if state == "post":
        return "finished"
    elif state == "in":
        return "live"
    return "scheduled"


def fetch_all_group_stage():
    """Fetch all group stage matches from ESPN"""
    url = f"{ESPN_BASE}/scoreboard?dates=20260611-20260627&limit=100"
    data = fetch_json(url)
    return data.get("events", [])


def fetch_standings():
    """Fetch group standings if available"""
    url = f"{ESPN_BASE}/standings"
    try:
        data = fetch_json(url)
        return data.get("children", [])
    except Exception:
        return []


def american_to_prob(odds):
    """美式赔率 → 隐含概率 (0-100)"""
    if odds < 0:
        return round(abs(odds) / (abs(odds) + 100) * 100, 1)
    return round(100 / (odds + 100) * 100, 1)


def extract_odds(comp):
    """从ESPN比赛数据提取DraftKings赔率"""
    odds_list = comp.get("odds", [])
    if not odds_list:
        return None
    odds = odds_list[0]  # DraftKings
    if not odds:
        return None

    ml = odds.get("moneyline", {})
    home_odds = ml.get("home", {}).get("close", {}).get("odds")
    away_odds = ml.get("away", {}).get("close", {}).get("odds")
    draw_odds = ml.get("draw", {}).get("close", {}).get("odds")

    if home_odds is None or away_odds is None:
        return None

    home_american = int(home_odds)
    away_american = int(away_odds)
    draw_american = int(draw_odds) if draw_odds else 0

    home_prob = american_to_prob(home_american)
    away_prob = american_to_prob(away_american)
    draw_prob = american_to_prob(draw_american) if draw_odds else round(100 - home_prob - away_prob, 1)

    # Normalize to 100%
    total = home_prob + draw_prob + away_prob
    if total > 0:
        home_prob = round(home_prob / total * 100, 1)
        draw_prob = round(draw_prob / total * 100, 1)
        away_prob = round(100 - home_prob - draw_prob, 1)

    details = odds.get("details", "")

    return {
        "home_prob": home_prob,
        "draw_prob": draw_prob,
        "away_prob": away_prob,
        "details": details,
    }


def process_matches(events):
    """Process ESPN events into our format"""
    matches = []
    for event in events:
        comp = event["competitions"][0]
        status_info = comp["status"]["type"]
        home = comp["competitors"][0]
        away = comp["competitors"][1]

        home_team = home["team"]
        away_team = away["team"]

        home_abbr = ESPN_TO_ABBR.get(home_team.get("abbreviation", ""), home_team.get("abbreviation", ""))
        away_abbr = ESPN_TO_ABBR.get(away_team.get("abbreviation", ""), away_team.get("abbreviation", ""))

        home_score = home.get("score")
        away_score = away.get("score")

        if espn_status_to_our(status_info) == "scheduled":
            home_score = None
            away_score = None
        else:
            home_score = int(home_score) if home_score is not None else None
            away_score = int(away_score) if away_score is not None else None

        elapsed = comp["status"].get("elapsed")
        odds = extract_odds(comp)

        matches.append({
            "espn_id": event["id"],
            "date": event["date"],
            "status": espn_status_to_our(status_info),
            "status_detail": status_info.get("shortDetail", ""),
            "elapsed": elapsed,
            "home": {
                "abbr": home_abbr,
                "name": TEAM_CN.get(home_team["displayName"], home_team["displayName"]),
                "score": home_score,
            },
            "away": {
                "abbr": away_abbr,
                "name": TEAM_CN.get(away_team["displayName"], away_team["displayName"]),
                "score": away_score,
            },
            "venue": comp.get("venue", {}).get("fullName", ""),
            "odds": odds,
        })

    return matches


def process_standings(groups):
    """Process ESPN standings into our format"""
    result = []
    for group in groups:
        gname = group.get("name", "")
        entries = group.get("standings", {}).get("entries", [])

        teams = []
        for entry in entries:
            team = entry["team"]
            stats = {s["name"]: s["value"] for s in entry.get("stats", [])}
            abbr = ESPN_TO_ABBR.get(team.get("abbreviation", ""), team.get("abbreviation", ""))

            teams.append({
                "abbr": abbr,
                "name": TEAM_CN.get(team["displayName"], team["displayName"]),
                "played": int(stats.get("gamesPlayed", 0)),
                "wins": int(stats.get("wins", 0)),
                "draws": int(stats.get("ties", 0)),
                "losses": int(stats.get("losses", 0)),
                "goals_for": int(stats.get("pointsFor", 0)),
                "goals_against": int(stats.get("pointsAgainst", 0)),
                "goal_diff": int(stats.get("pointDifferential", 0)),
                "points": int(stats.get("points", 0)),
            })

        # Sort by: points desc → goal_diff desc → goals_for desc
        teams.sort(key=lambda t: (-t["points"], -t["goal_diff"], -t["goals_for"]))

        result.append({
            "group": gname,
            "teams": teams,
        })

    return result


def main():
    print("⚽ 世界杯比分更新器 v1 启动...")
    print(f"⏰ {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.dirname(script_dir)

    # 1. Fetch all group stage matches
    print("\n📡 拉取小组赛数据...")
    events = fetch_all_group_stage()
    matches = process_matches(events)
    print(f"  ✅ {len(matches)} 场比赛")

    # Status summary
    status_count = {}
    for m in matches:
        status_count[m["status"]] = status_count.get(m["status"], 0) + 1
    print(f"  状态: {status_count}")

    # 2. Write live_scores.json
    scores_path = os.path.join(project_dir, "src", "data", "live_scores.json")
    scores_data = {
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "count": len(matches),
        "matches": matches,
    }
    with open(scores_path, "w", encoding="utf-8") as f:
        json.dump(scores_data, f, ensure_ascii=False, indent=2)
    print(f"  ✅ 写入 {scores_path}")

    # 3. Generate predictions.ts from live odds
    print("\n📊 生成 predictions.ts...")
    predictions = []
    for m in matches:
        if m["odds"]:
            predictions.append({
                "match_id": m["espn_id"],
                "home": m["home"]["abbr"],
                "away": m["away"]["abbr"],
                "home_win": m["odds"]["home_prob"],
                "draw": m["odds"]["draw_prob"],
                "away_win": m["odds"]["away_prob"],
                "details": m["odds"]["details"],
            })

    if predictions:
        pred_path = os.path.join(project_dir, "src", "data", "predictions.ts")
        import re as _re

        # Build new PREDICTIONS array
        pred_lines = ["export const PREDICTIONS: MatchPrediction[] = ["]
        for p in predictions:
            pred_lines.append("  {")
            pred_lines.append(f'    "match_id": "{p["match_id"]}",')
            pred_lines.append(f'    "home": "{p["home"]}",')
            pred_lines.append(f'    "away": "{p["away"]}",')
            pred_lines.append(f'    "home_win": {p["home_win"]},')
            pred_lines.append(f'    "draw": {p["draw"]},')
            pred_lines.append(f'    "away_win": {p["away_win"]},')
            pred_lines.append(f'    "details": "{p["details"]}"')
            pred_lines.append("  },")
        pred_lines.append("];")
        new_array = "\n".join(pred_lines)

        # Read existing file and replace only the PREDICTIONS array
        try:
            with open(pred_path, "r") as f:
                existing = f.read()

            # Replace the PREDICTIONS array (from "export const PREDICTIONS" to the closing "];")
            pattern = r"export const PREDICTIONS: MatchPrediction\[\] = \[.*?\];"
            updated = _re.sub(pattern, new_array, existing, flags=_re.DOTALL)

            # Update the header comment
            updated = _re.sub(
                r"// 最后更新: .*",
                f"// 最后更新: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}",
                updated,
            )

            with open(pred_path, "w", encoding="utf-8") as f:
                f.write(updated)
        except FileNotFoundError:
            # First time - create full file
            with open(pred_path, "w", encoding="utf-8") as f:
                f.write(f"""// 唯一数据源 — 赔率概率 (DraftKings via ESPN API)
// 自动更新: fetch_scores.py → GitHub Action 每30分钟
// 最后更新: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}

export interface MatchPrediction {{
  match_id: string;
  home: string;
  away: string;
  home_win: number;
  draw: number;
  away_win: number;
  details: string;
}}

{new_array}

export function getPrediction(matchId: string): MatchPrediction | undefined {{
  return PREDICTIONS.find((p) => p.match_id === matchId);
}}
""")

        print(f"  ✅ 更新 {len(predictions)} 场赔率到 predictions.ts")

    # 4. Fetch standings (may be empty before tournament)
    print("\n📡 拉取积分榜...")
    groups = fetch_standings()
    if groups:
        standings = process_standings(groups)
        standings_path = os.path.join(project_dir, "src", "data", "standings.json")
        standings_data = {
            "updated_at": datetime.now(timezone.utc).isoformat(),
            "groups": standings,
        }
        with open(standings_path, "w", encoding="utf-8") as f:
            json.dump(standings_data, f, ensure_ascii=False, indent=2)
        print(f"  ✅ 写入 {standings_path}")
    else:
        print("  ⏳ 积分榜暂未开放 (开赛后自动更新)")

    # 4. Show upcoming/live matches
    print("\n📋 今日/进行中:")
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    for m in matches:
        if m["status"] == "live" or (m["date"][:10] == today):
            h = m["home"]
            a = m["away"]
            score_str = f"{h['score']}-{a['score']}" if h["score"] is not None else "vs"
            print(f"  {m['status']:8s} | {h['name']} {score_str} {a['name']} | {m['status_detail']}")

    print("\n✅ 完成!")


if __name__ == "__main__":
    main()
