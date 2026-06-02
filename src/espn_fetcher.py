#!/usr/bin/env python3
"""
ESPN 数据抓取器（WSL → PowerShell → Windows 网络）
免费、无需 key、世界杯全覆盖。
"""

import json
import subprocess
from datetime import datetime, timezone, timedelta
from pathlib import Path

DATA_DIR = Path(__file__).parent.parent / "data"
DATA_DIR.mkdir(parents=True, exist_ok=True)

ESPN_BASE = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world"


def fetch_espn(endpoint: str) -> dict:
    """通过 PowerShell 调 Windows 的 curl 走代理访问 ESPN"""
    url = f"{ESPN_BASE}/{endpoint}"
    cmd = f'powershell.exe -Command "curl.exe -s \'{url}\'"'
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=30)
    return json.loads(result.stdout)


def fetch_all_matches() -> list[dict]:
    """拉取世界杯全部比赛"""
    cache_file = DATA_DIR / "espn_matches.json"
    
    data = fetch_espn("scoreboard?limit=100&dates=20260611-20260720")
    events = data.get("events", [])
    
    # 保存缓存
    with open(cache_file, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    
    return events


def parse_match(event: dict) -> dict:
    """把 ESPN 格式解析成我们的标准格式"""
    comp = event.get("competitions", [{}])[0]
    competitors = comp.get("competitors", [])
    
    home = {}
    away = {}
    for c in competitors:
        team = c.get("team", {})
        info = {
            "id": team.get("id", ""),
            "name": team.get("displayName", ""),
            "short_name": team.get("shortDisplayName", team.get("abbreviation", "")),
            "abbreviation": team.get("abbreviation", ""),
            "logo": team.get("logo", ""),
            "rank": c.get("rank", None),
            "score": c.get("score", None),
            "home_away": c.get("homeAway", ""),
        }
        if c.get("homeAway") == "home":
            home = info
        else:
            away = info
    
    # 赔率
    odds_data = comp.get("odds", []) or []
    odds = None
    if odds_data and odds_data[0] is not None:
        o = odds_data[0]
        home_odds = o.get("homeTeamOdds", {})
        away_odds = o.get("awayTeamOdds", {})
        draw_odds = o.get("drawOdds", {})
        
        odds = {
            "provider": o.get("provider", {}).get("name", "unknown"),
            "home_win_prob": home_odds.get("winPercentage"),
            "home_ml": home_odds.get("moneyLine"),
            "draw_prob": draw_odds.get("winPercentage"),
            "draw_ml": draw_odds.get("moneyLine"),
            "away_win_prob": away_odds.get("winPercentage"),
            "away_ml": away_odds.get("moneyLine"),
            "spread": o.get("spread"),
            "over_under": o.get("overUnder"),
            "details": o.get("details", ""),
        }
    
    status = comp.get("status", {})
    
    return {
        "espn_id": event.get("id", ""),
        "name": event.get("name", ""),
        "date": event.get("date", ""),
        "status": status.get("type", {}).get("description", "Scheduled"),
        "venue": comp.get("venue", {}).get("fullName", ""),
        "home": home,
        "away": away,
        "odds": odds,
    }


def get_schedule() -> list[dict]:
    """获取完整赛程（带赔率，如果有）"""
    events = fetch_all_matches()
    matches = [parse_match(e) for e in events]
    
    # 保存标准化数据
    with open(DATA_DIR / "schedule.json", "w", encoding="utf-8") as f:
        json.dump(matches, f, ensure_ascii=False, indent=2)
    
    return matches


def get_today_matches(matches: list[dict]) -> list[dict]:
    """筛选今日比赛"""
    today = datetime.now(timezone(timedelta(hours=8))).strftime("%Y-%m-%d")
    return [m for m in matches if m["date"].startswith(today)]


def get_matches_with_odds(matches: list[dict]) -> list[dict]:
    """只返回有赔率的比赛"""
    return [m for m in matches if m.get("odds") is not None]


# ─── 测试 ──────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print("📡 从 ESPN 拉取世界杯数据...\n")
    
    matches = get_schedule()
    print(f"✅ 共 {len(matches)} 场比赛\n")
    
    # 有赔率的
    with_odds = get_matches_with_odds(matches)
    print(f"📊 有赔率数据: {len(with_odds)} 场")
    for m in with_odds:
        odds = m["odds"]
        print(f"  {m['name']}")
        print(f"    主胜: {odds.get('home_win_prob','?')}% | 平: {odds.get('draw_prob','?')}% | 客: {odds.get('away_win_prob','?')}%")
    
    # 今日比赛
    today = get_today_matches(matches)
    print(f"\n📅 今日比赛: {len(today)} 场")
    for m in today:
        print(f"  {m['name']} | {m['date']} | {m['status']}")
    
    # 前 5 场（示例）
    print(f"\n📋 前 5 场比赛:")
    for m in matches[:5]:
        home = m["home"].get("name", "?")
        away = m["away"].get("name", "?")
        logo_h = m["home"].get("logo", "")
        logo_a = m["away"].get("logo", "")
        print(f"  {home} vs {away}")
        print(f"    时间: {m['date']}")
        print(f"    场地: {m.get('venue','?')}")
        if logo_h:
            print(f"    主队logo: {logo_h}")
        if logo_a:
            print(f"    客队logo: {logo_a}")
        if m.get("odds"):
            print(f"    赔率: ✅")
        print()
