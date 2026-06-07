#!/usr/bin/env python3
"""
世界杯新闻自动抓取器 v2
数据源:
  - 中文: 懂球帝 + 直播吧 (网页抓取)
  - 英文: ESPN + BBC Sport (RSS)
输出: public/news.json
定时: 每2小时由 cron 运行
"""

import json
import urllib.request
import urllib.parse
import os
import re
import hashlib
from datetime import datetime, timezone

# ============ 配置 ============

# 英文 RSS 源
RSS_FEEDS = [
    {"url": "https://www.espn.com/espn/rss/soccer/news", "source": "ESPN"},
    {"url": "https://feeds.bbci.co.uk/sport/football/rss.xml", "source": "BBC Sport"},
]

# 中文网页源
WEB_SOURCES = [
    {"url": "https://www.dongqiudi.com/", "source": "懂球帝", "parser": "dongqiudi"},
    {"url": "https://news.zhibo8.cc/zuqiu/", "source": "直播吧", "parser": "zhibo8"},
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}

# ============ 关键词 ============

WORLD_CUP_KEYWORDS = [
    "world cup", "fifa", "2026", "wc ", "worldcup",
    "世界杯", "美加墨", "48队", "小组赛", "淘汰赛",
    "阿根廷", "巴西", "法国", "英格兰", "德国", "西班牙",
    "葡萄牙", "荷兰", "比利时", "克罗地亚", "摩洛哥",
    "日本", "韩国", "美国", "墨西哥", "加拿大",
    "乌拉圭", "哥伦比亚", "塞内加尔", "澳大利亚",
]

INJURY_KEYWORDS = [
    "injury", "injured", "hurt", "out", "sidelined",
    "伤病", "受伤", "伤退", "伤缺", "伤情",
]

TACTICAL_KEYWORDS = [
    "tactic", "formation", "lineup", "starting xi", "squad",
    "战术", "阵型", "阵容", "首发", "大名单", "集训",
]

HOT_KEYWORDS = [
    "messi", "mbappé", "ronaldo", "neymar", "bellingham",
    "haaland", "vinicius", "rodri", "yamal", "endrick",
    "梅西", "姆巴佩", "C罗", "内马尔", "贝林厄姆",
    "哈兰德", "维尼修斯", "亚马尔",
    "争议", "红牌", "绝杀", "逆转", "爆冷",
]

# 球队关键词 → 国家代码
TEAM_KEYWORDS = {
    # 英文
    "argentina": "ARG", "messi": "ARG", "scaloni": "ARG",
    "brazil": "BRA", "neymar": "BRA", "endrick": "BRA", "vinicius": "BRA",
    "france": "FRA", "mbappé": "FRA", "mbappe": "FRA", "deschamps": "FRA",
    "england": "ENG", "kane": "ENG", "bellingham": "ENG", "palmer": "ENG",
    "germany": "GER", "musiala": "GER", "wirtz": "GER",
    "spain": "ESP", "yamal": "ESP", "pedri": "ESP", "rodri": "ESP",
    "portugal": "POR", "ronaldo": "POR", "leão": "POR",
    "netherlands": "NED", "gakpo": "NED",
    "belgium": "BEL", "de bruyne": "BEL",
    "croatia": "CRO", "modric": "CRO",
    "morocco": "MAR", "hakimi": "MAR",
    "japan": "JPN", "mitoma": "JPN",
    "south korea": "KOR", "son heung": "KOR", "korea": "KOR",
    "usa": "USA", "usmnt": "USA", "pulisic": "USA", "pochettino": "USA",
    "mexico": "MEX", "canada": "CAN",
    "uruguay": "URU", "nunez": "URU",
    "colombia": "COL", "ecuador": "ECU", "senegal": "SEN",
    "ghana": "GHA", "australia": "AUS", "switzerland": "SUI",
    "scotland": "SCO", "wales": "WAL", "qatar": "QAT",
    # 中文
    "阿根廷": "ARG", "梅西": "ARG",
    "巴西": "BRA", "内马尔": "BRA", "维尼修斯": "BRA",
    "法国": "FRA", "姆巴佩": "FRA",
    "英格兰": "ENG", "凯恩": "ENG", "贝林厄姆": "ENG",
    "德国": "GER", "穆西亚拉": "GER", "维尔茨": "GER",
    "西班牙": "ESP", "亚马尔": "ESP", "佩德里": "ESP",
    "葡萄牙": "POR", "C罗": "POR",
    "荷兰": "NED",
    "比利时": "BEL", "德布劳内": "BEL",
    "克罗地亚": "CRO", "莫德里奇": "CRO",
    "摩洛哥": "MAR",
    "日本": "JPN", "三笘薫": "JPN",
    "韩国": "KOR", "孙兴慜": "KOR",
    "美国": "USA", "墨西哥": "MEX", "加拿大": "CAN",
    "乌拉圭": "URU", "哥伦比亚": "COL",
    "塞内加尔": "SEN", "加纳": "GHA",
    "澳大利亚": "AUS", "瑞士": "SUI", "苏格兰": "SCO",
}

TEAM_CN = {
    "ARG": "阿根廷", "BRA": "巴西", "FRA": "法国", "ENG": "英格兰",
    "GER": "德国", "ESP": "西班牙", "POR": "葡萄牙", "NED": "荷兰",
    "BEL": "比利时", "CRO": "克罗地亚", "MAR": "摩洛哥", "JPN": "日本",
    "KOR": "韩国", "USA": "美国", "MEX": "墨西哥", "CAN": "加拿大",
    "URU": "乌拉圭", "COL": "哥伦比亚", "ECU": "厄瓜多尔", "SEN": "塞内加尔",
    "GHA": "加纳", "AUS": "澳大利亚", "SUI": "瑞士", "SCO": "苏格兰",
    "QAT": "卡塔尔", "WAL": "威尔士", "IRN": "伊朗", "NZL": "新西兰",
    "BIH": "波黑", "PAN": "巴拿马", "CIV": "科特迪瓦", "COD": "刚果(金)",
    "UZB": "乌兹别克斯坦", "IRQ": "伊拉克", "NOR": "挪威", "SWE": "瑞典",
    "TUN": "突尼斯", "CPV": "佛得角", "KSA": "沙特", "CUW": "库拉索",
    "RSA": "南非", "JOR": "约旦", "ALG": "阿尔及利亚", "AUT": "奥地利",
    "CZE": "捷克", "TUR": "土耳其", "PAR": "巴拉圭", "HAI": "海地",
    "IRN": "伊朗", "GHA": "加纳", "PAN": "巴拿马",
}


# ============ 工具函数 ============

def clean_html(text):
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"&amp;", "&", text)
    text = re.sub(r"&lt;", "<", text)
    text = re.sub(r"&gt;", ">", text)
    text = re.sub(r"&#\d+;", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def hash_key(text):
    return hashlib.md5(text.encode()).hexdigest()[:10]


def is_football_related(text):
    text_lower = text.lower()
    return any(kw in text_lower for kw in WORLD_CUP_KEYWORDS)


def classify(text):
    text_lower = text.lower()
    for kw in INJURY_KEYWORDS:
        if kw in text_lower:
            return "injury"
    for kw in TACTICAL_KEYWORDS:
        if kw in text_lower:
            return "tactical"
    return "hot"


def detect_team(text):
    text_lower = text.lower()
    for keyword, code in sorted(TEAM_KEYWORDS.items(), key=lambda x: -len(x[0])):
        if keyword in text_lower:
            return code
    return ""


def is_hot(text):
    text_lower = text.lower()
    return sum(1 for s in HOT_KEYWORDS if s.lower() in text_lower) >= 1


def format_time(pub_date):
    try:
        for fmt in ["%Y-%m-%d %H:%M:%S", "%Y-%m-%dT%H:%M:%S", "%a, %d %b %Y %H:%M:%S %z"]:
            try:
                dt = datetime.strptime(pub_date, fmt)
                break
            except ValueError:
                continue
        else:
            return "刚刚"

        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=timezone.utc)
        now = datetime.now(timezone.utc)
        diff = now - dt
        seconds = int(diff.total_seconds())
        if seconds < 0:
            return "刚刚"
        if seconds < 3600:
            return f"{max(1, seconds // 60)}分钟前"
        elif seconds < 86400:
            return f"{seconds // 3600}小时前"
        else:
            return f"{seconds // 86400}天前"
    except:
        return "刚刚"


# ============ 中文源解析 ============

def fetch_dongqiudi():
    """抓取懂球帝首页新闻"""
    url = "https://www.dongqiudi.com/"
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=10) as resp:
            content = resp.read().decode("utf-8", errors="ignore")
    except Exception as e:
        print(f"  ❌ 懂球帝: {e}")
        return []

    # 提取 JSON 中的新闻标题
    titles = re.findall(r'"title"\s*:\s*"([^"]{10,100})"', content)

    # 提取链接
    links = re.findall(r'"url"\s*:\s*"([^"]*?)"', content)
    # 也尝试提取文章 ID
    article_ids = re.findall(r'"articleId"\s*:\s*"?(\d+)"?', content)

    items = []
    seen = set()
    for i, title in enumerate(titles):
        if title in seen:
            continue
        seen.add(title)

        text = title.lower()
        # 必须和世界杯/足球相关
        if not is_football_related(text):
            # 如果标题包含足球相关词汇也算
            football_extra = ["足球", "球", "赛", "教练", "球员", "进球", "比赛", "联赛"]
            if not any(k in title for k in football_extra):
                continue

        link = ""
        if i < len(links):
            link = links[i]
            if link.startswith("//"):
                link = "https:" + link
        elif i < len(article_ids):
            link = f"https://www.dongqiudi.com/articles/{article_ids[i]}"

        items.append({
            "id": hash_key(f"dqd-{title}"),
            "category": classify(text),
            "title": title,
            "summary": "",
            "url": link or "https://www.dongqiudi.com/",
            "team": detect_team(text),
            "time": "刚刚",
            "source": "懂球帝",
            "is_hot": is_hot(text),
        })

    print(f"  ✅ 懂球帝: {len(items)} 条足球新闻")
    return items


def fetch_zhibo8():
    """抓取直播吧足球新闻"""
    url = "https://news.zhibo8.cc/zuqiu/"
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=10) as resp:
            content = resp.read().decode("utf-8", errors="ignore")
    except Exception as e:
        print(f"  ❌ 直播吧: {e}")
        return []

    # 提取新闻链接和标题
    pattern = r'<a[^>]*href="(//news\.zhibo8\.com/[^"]*)"[^>]*>([^<]{10,})</a>'
    matches = re.findall(pattern, content)

    items = []
    seen = set()
    for href, title in matches:
        title = title.strip()
        if title in seen or len(title) < 8:
            continue
        seen.add(title)

        text = title.lower()
        # 必须和世界杯/足球相关
        if not is_football_related(text):
            football_extra = ["足球", "球", "赛", "教练", "球员", "进球", "比赛", "联赛", "国足"]
            if not any(k in title for k in football_extra):
                continue

        link = "https:" + href if href.startswith("//") else href

        items.append({
            "id": hash_key(f"zb8-{title}"),
            "category": classify(text),
            "title": title,
            "summary": "",
            "url": link,
            "team": detect_team(text),
            "time": "刚刚",
            "source": "直播吧",
            "is_hot": is_hot(text),
        })

    print(f"  ✅ 直播吧: {len(items)} 条足球新闻")
    return items


# ============ 英文 RSS 源 ============

def fetch_rss(feed_url, source_name):
    """通过 rss2json 获取 RSS 内容"""
    api = "https://api.rss2json.com/v1/api.json"
    encoded = urllib.parse.quote(feed_url)
    url = f"{api}?rss_url={encoded}"

    req = urllib.request.Request(url, headers={"User-Agent": "WorldCup2026Bot/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode())
    except Exception as e:
        print(f"  ❌ {source_name}: {e}")
        return []

    if data.get("status") != "ok":
        print(f"  ❌ {source_name}: API error")
        return []

    items = []
    for item in data.get("items", []):
        title = clean_html(item.get("title", ""))
        desc = clean_html(item.get("description", ""))
        text = f"{title} {desc}".lower()

        if not is_football_related(text):
            continue

        items.append({
            "id": hash_key(item.get("link", title)),
            "category": classify(text),
            "title": title,
            "summary": desc[:200],
            "url": item.get("link", ""),
            "team": detect_team(text),
            "time": format_time(item.get("pubDate", "")),
            "source": source_name,
            "is_hot": is_hot(text),
        })

    print(f"  ✅ {source_name}: {len(items)} football articles")
    return items


# ============ 主函数 ============

def main():
    print("🌍 世界杯新闻抓取器 v2 启动...")
    print(f"⏰ {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

    all_news = []

    # 1. 中文源 (优先)
    print("\n📡 中文源:")
    all_news.extend(fetch_dongqiudi())
    all_news.extend(fetch_zhibo8())

    # 2. 英文 RSS 源
    print("\n📡 英文源:")
    for feed in RSS_FEEDS:
        all_news.extend(fetch_rss(feed["url"], feed["source"]))

    # 去重 (按标题相似度)
    seen = set()
    unique = []
    for n in all_news:
        key = n["title"][:30]  # 用前30字去重
        if key not in seen:
            seen.add(key)
            unique.append(n)

    # 排序: 中文优先, 然后热点, 然后时间
    def sort_key(x):
        is_cn = 1 if x["source"] in ("懂球帝", "直播吧") else 0
        is_hot = 1 if x["is_hot"] else 0
        return (-is_cn, -is_hot)

    unique.sort(key=sort_key)

    # 输出
    output = {
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "count": len(unique),
        "articles": unique,
    }

    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.dirname(script_dir)
    output_path = os.path.join(project_dir, "public", "news.json")

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    # 统计
    cn_count = sum(1 for n in unique if n["source"] in ("懂球帝", "直播吧"))
    en_count = len(unique) - cn_count

    print(f"\n✅ 写入 {len(unique)} 条新闻 ({cn_count} 中文 / {en_count} 英文)")
    print(f"   路径: {output_path}")
    for n in unique[:5]:
        team_str = f" [{TEAM_CN.get(n['team'], n['team'])}]" if n["team"] else ""
        hot_str = " 🔥" if n["is_hot"] else ""
        lang = "🇨🇳" if n["source"] in ("懂球帝", "直播吧") else "🇬🇧"
        print(f"  {lang} {n['category']:8s} | {n['source']:8s} | {n['title'][:45]}{team_str}{hot_str}")


if __name__ == "__main__":
    main()
