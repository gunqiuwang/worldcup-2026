#!/usr/bin/env python3
"""
世界杯新闻自动抓取器
数据源: ESPN Soccer + BBC Football RSS (通过 rss2json 转 JSON)
输出: public/news.json
定时: 每2小时由 cron 运行

零 API key, 零后端依赖
"""

import json
import urllib.request
import urllib.parse
import os
import re
from datetime import datetime, timezone

# RSS 源
FEEDS = [
    {
        "url": "https://www.espn.com/espn/rss/soccer/news",
        "source": "ESPN",
    },
    {
        "url": "https://feeds.bbci.co.uk/sport/football/rss.xml",
        "source": "BBC Sport",
    },
]

# 世界杯关键词 (用于分类和过滤)
WORLD_CUP_KEYWORDS = [
    "world cup", "fifa", "2026", "wc ", "worldcup",
    "世界杯", "美加墨",
]

INJURY_KEYWORDS = [
    "injury", "injured", "hurt", "out", "sidelined",
    "doubt", "fitness", "knock", "muscle", "hamstring",
    "ankle", "knee", "surgery", "recovery", "withdraw",
    "伤病", "受伤", "伤退",
]

TACTICAL_KEYWORDS = [
    "tactic", "formation", "lineup", "starting xi", "squad",
    "system", "style", "approach", "strategy", "coach",
    "manager", "pochettino", "deschamps", "nagelsmann",
    "战术", "阵型", "阵容", "首发",
]

HOT_KEYWORDS = [
    "messi", "mbappé", "ronaldo", "neymar", "bellingham",
    "haaland", "vinicius", "rodri", "yamal", "endrick",
    "upset", "shock", "record", "history", "debut",
    "controversy", "drama", "visa", "protest",
]

# 32 强队伍关键词 → 国家代码
TEAM_KEYWORDS = {
    "argentina": "ARG", "messi": "ARG", "scaloni": "ARG",
    "brazil": "BRA", "neymar": "BRA", "endrick": "BRA", "vinicius": "BRA",
    "france": "FRA", "mbappé": "FRA", "mbappe": "FRA", "deschamps": "FRA", "dembélé": "FRA", "dembele": "FRA",
    "england": "ENG", "kane": "ENG", "bellingham": "ENG", "palmer": "ENG",
    "germany": "GER", "musiala": "GER", "wirtz": "GER", "nagelsmann": "GER",
    "spain": "ESP", "yamal": "ESP", "pedri": "ESP", "rodri": "ESP",
    "portugal": "POR", "ronaldo": "POR", "leão": "POR",
    "netherlands": "NED", "gakpo": "NED",
    "belgium": "BEL", "de bruyne": "BEL",
    "croatia": "CRO", "modric": "CRO",
    "morocco": "MAR", "hakimi": "MAR",
    "japan": "JPN", "mitoma": "JPN",
    "south korea": "KOR", "son": "KOR", "korea": "KOR",
    "usa": "USA", "usmnt": "USA", "pulisic": "USA", "pochettino": "USA", "united states": "USA",
    "mexico": "MEX",
    "canada": "CAN",
    "uruguay": "URU", "núñez": "URU", "nunez": "URU",
    "colombia": "COL",
    "ecuador": "ECU",
    "senegal": "SEN",
    "ghana": "GHA",
    "cameroon": "CMR",
    "tunisia": "TUN",
    "australia": "AUS",
    "saudi arabia": "KSA", "saudi": "KSA",
    "iran": "IRI",
    "qatar": "QAT",
    "wales": "WAL",
    "scotland": "SCO",
    "switzerland": "SUI",
    "poland": "POL",
    "denmark": "DEN",
    "serbia": "SRB",
    "costa rica": "CRC",
    "chile": "CHI",
    "paraguay": "PAR",
    "peru": "PER",
    "new zealand": "NZL",
    "honduras": "HON",
    "egypt": "EGY",
}

# 中文翻译映射
TEAM_CN = {
    "ARG": "阿根廷", "BRA": "巴西", "FRA": "法国", "ENG": "英格兰",
    "GER": "德国", "ESP": "西班牙", "POR": "葡萄牙", "NED": "荷兰",
    "BEL": "比利时", "CRO": "克罗地亚", "MAR": "摩洛哥", "JPN": "日本",
    "KOR": "韩国", "USA": "美国", "MEX": "墨西哥", "CAN": "加拿大",
    "URU": "乌拉圭", "COL": "哥伦比亚", "ECU": "厄瓜多尔", "SEN": "塞内加尔",
    "GHA": "加纳", "CMR": "喀麦隆", "TUN": "突尼斯", "AUS": "澳大利亚",
    "KSA": "沙特", "IRI": "伊朗", "QAT": "卡塔尔", "WAL": "威尔士",
    "SCO": "苏格兰", "SUI": "瑞士", "POL": "波兰", "DEN": "丹麦",
    "SRB": "塞尔维亚", "CRC": "哥斯达黎加", "CHI": "智利", "PAR": "巴拉圭",
    "PER": "秘鲁", "NZL": "新西兰", "HON": "洪都拉斯", "EGY": "埃及",
}


def fetch_feed(feed_url, source_name):
    """通过 rss2json 获取 RSS 内容"""
    api = "https://api.rss2json.com/v1/api.json"
    encoded = urllib.parse.quote(feed_url)
    url = f"{api}?rss_url={encoded}"

    req = urllib.request.Request(url, headers={"User-Agent": "WorldCup2026Bot/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode())
    except Exception as e:
        print(f"  ❌ {source_name} fetch failed: {e}")
        return []

    if data.get("status") != "ok":
        print(f"  ❌ {source_name} API error: {data.get('message')}")
        return []

    items = []
    for item in data.get("items", []):
        title = clean_html(item.get("title", ""))
        desc = clean_html(item.get("description", ""))
        text = f"{title} {desc}".lower()

        # 必须和足球/世界杯相关
        if not is_football_related(text):
            continue

        news = {
            "id": hash_key(item.get("link", title)),
            "title": title,
            "summary": desc[:200],
            "url": item.get("link", ""),
            "source": source_name,
            "time": format_time(item.get("pubDate", "")),
            "timestamp": item.get("pubDate", ""),
            "category": classify(text),
            "team": detect_team(text),
            "is_hot": is_hot(text),
        }
        items.append(news)

    print(f"  ✅ {source_name}: {len(items)} football articles")
    return items


def clean_html(text):
    """去除 HTML 标签"""
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"&amp;", "&", text)
    text = re.sub(r"&lt;", "<", text)
    text = re.sub(r"&gt;", ">", text)
    text = re.sub(r"&#\d+;", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def is_football_related(text):
    """是否和足球/世界杯相关"""
    football_kw = [
        "soccer", "football", "fifa", "world cup", "goal", "match",
        "tournament", "qualifier", "friendly", "striker", "midfielder",
        "defender", "goalkeeper", "pitch", "stadium", "league",
        "premier league", "la liga", "serie a", "bundesliga", "ligue 1",
        "champions league", "copa america", "euro",
    ]
    return any(kw in text for kw in football_kw)


def classify(text):
    """分类: injury / tactical / hot"""
    for kw in INJURY_KEYWORDS:
        if kw in text:
            return "injury"
    for kw in TACTICAL_KEYWORDS:
        if kw in text:
            return "tactical"
    return "hot"


def detect_team(text):
    """检测相关队伍"""
    for keyword, code in sorted(TEAM_KEYWORDS.items(), key=lambda x: -len(x[0])):
        if keyword in text:
            return code
    return ""


def is_hot(text):
    """是否热点"""
    hot_signals = ["controversy", "drama", "record", "shock", "upset",
                   "debut", "sent off", "red card", "visa", "protest",
                   "world cup", "2026"]
    return sum(1 for s in hot_signals if s in text) >= 2


def hash_key(text):
    """生成短 hash ID"""
    import hashlib
    return hashlib.md5(text.encode()).hexdigest()[:10]


def format_time(pub_date):
    """转换时间格式为相对时间"""
    try:
        dt = datetime.strptime(pub_date, "%Y-%m-%d %H:%M:%S")
        dt = dt.replace(tzinfo=timezone.utc)
        now = datetime.now(timezone.utc)
        diff = now - dt
        seconds = int(diff.total_seconds())
        if seconds < 3600:
            return f"{max(1, seconds // 60)}分钟前"
        elif seconds < 86400:
            return f"{seconds // 3600}小时前"
        else:
            return f"{seconds // 86400}天前"
    except:
        return "刚刚"


def main():
    print("🌍 世界杯新闻抓取器启动...")
    print(f"⏰ {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

    all_news = []
    for feed in FEEDS:
        items = fetch_feed(feed["url"], feed["source"])
        all_news.extend(items)

    # 去重 (按 URL)
    seen = set()
    unique = []
    for n in all_news:
        if n["url"] not in seen:
            seen.add(n["url"])
            unique.append(n)

    # 排序: 热点优先, 然后按时间
    unique.sort(key=lambda x: (not x["is_hot"], x.get("timestamp", "")), reverse=False)
    unique.sort(key=lambda x: x["is_hot"], reverse=True)

    # 输出
    output = {
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "count": len(unique),
        "articles": unique,
    }

    # 写入 public/news.json
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.dirname(script_dir)
    output_path = os.path.join(project_dir, "public", "news.json")

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\n✅ 写入 {len(unique)} 条新闻到 {output_path}")
    for n in unique[:5]:
        team_str = f" [{TEAM_CN.get(n['team'], n['team'])}]" if n["team"] else ""
        hot_str = " 🔥" if n["is_hot"] else ""
        print(f"  {n['category']:8s} | {n['source']:10s} | {n['title'][:50]}{team_str}{hot_str}")


if __name__ == "__main__":
    main()
