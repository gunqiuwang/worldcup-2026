#!/usr/bin/env python3
"""
世界杯新闻自动抓取器 v4
变更:
  - v4: 去掉rss2json中间层(ESPN 422)，RSS直接用feedparser或urllib解析
  - 严格世界杯过滤: 必须包含 WC 核心词, 单球队名不够
  - 48h 滚动窗口: 自动淘汰旧新闻
  - 合并旧数据: 新旧去重, 保留已有的 time 原始时间
  - 上限 30 条
数据源:
  - 中文: 直播吧 (网页抓取)
  - 英文: BBC Sport RSS (直接解析)
输出: public/news.json
定时: 每2小时由 GitHub Action 运行
"""

import json
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
import os
import re
import hashlib
from datetime import datetime, timezone, timedelta

# ============ 配置 ============

MAX_ARTICLES = 30       # 最多保留条数
MAX_AGE_HOURS = 48      # 滚动窗口 (小时)

# 英文 RSS 源 (直接请求，不用rss2json)
RSS_FEEDS = [
    {"url": "https://feeds.bbci.co.uk/sport/football/rss.xml", "source": "BBC Sport"},
    {"url": "https://www.skysports.com/rss/12040", "source": "Sky Sports"},
    {"url": "https://www.espn.com/espn/rss/soccer/news", "source": "ESPN"},
]

# 中文网页源
WEB_SOURCES = [
    {"url": "https://news.zhibo8.cc/zuqiu/", "source": "直播吧", "parser": "zhibo8"},
]

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}

# ============ 关键词 ============

WC_CORE = [
    "world cup", "fifa", "2026", "worldcup",
    "世界杯", "美加墨", "48队", "48强",
    "小组赛", "淘汰赛", "决赛圈", "抽签",
    "揭幕战", "半决赛", "八强", "四强",
    "fifa world cup", "qualifying",
]

TEAM_NAMES_EN = [
    "argentina", "brazil", "france", "england", "germany", "spain",
    "portugal", "netherlands", "belgium", "croatia", "morocco",
    "japan", "south korea", "usa", "mexico", "canada",
    "uruguay", "colombia", "senegal", "australia", "ecuador",
]
TEAM_NAMES_CN = [
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
    "messi", "mbappé", "mbappe", "ronaldo", "neymar", "bellingham",
    "haaland", "vinicius", "rodri", "yamal", "endrick",
    "梅西", "姆巴佩", "C罗", "内马尔", "贝林厄姆",
    "哈兰德", "维尼修斯", "亚马尔",
    "争议", "红牌", "绝杀", "逆转", "爆冷",
]

TEAM_KEYWORDS = {
    "argentina": "ARG", "messi": "ARG", "scaloni": "ARG",
    "brazil": "BRA", "neymar": "BRA", "endrick": "BRA", "vinicius": "BRA",
    "france": "FRA", "mbappé": "FRA", "mbappe": "FRA", "deschamps": "FRA",
    "england": "ENG", "kane": "ENG", "bellingham": "ENG", "palmer": "ENG",
    "germany": "GER", "musiala": "GER", "wirtz": "GER",
    "spain": "ESP", "yamal": "ESP", "pedri": "ESP", "rodri": "ESP",
    "portugal": "POR", "ronaldo": "POR",
    "netherlands": "NED", "gakpo": "NED",
    "belgium": "BEL", "de bruyne": "BEL",
    "croatia": "CRO", "modric": "CRO",
    "morocco": "MAR", "hakimi": "MAR",
    "japan": "JPN", "mitoma": "JPN",
    "south korea": "KOR", "son heung": "KOR", "korea": "KOR",
    "usa": "USA", "usmnt": "USA", "pulisic": "USA", "pochettino": "USA",
    "mexico": "MEX", "canada": "CAN",
    "uruguay": "URU", "nunez": "URU",
    "colombia": "COL", "senegal": "SEN", "australia": "AUS",
    "阿根廷": "ARG", "梅西": "ARG",
    "巴西": "BRA", "内马尔": "BRA", "维尼修斯": "BRA",
    "法国": "FRA", "姆巴佩": "FRA",
    "英格兰": "ENG", "凯恩": "ENG", "贝林厄姆": "ENG",
    "德国": "GER", "穆西亚拉": "GER", "维尔茨": "GER",
    "西班牙": "ESP", "亚马尔": "ESP", "佩德里": "ESP",
    "葡萄牙": "POR", "C罗": "POR",
    "荷兰": "NED", "比利时": "BEL", "德布劳内": "BEL",
    "克罗地亚": "CRO", "莫德里奇": "CRO", "摩洛哥": "MAR",
    "日本": "JPN", "三笘薫": "JPN", "韩国": "KOR", "孙兴慜": "KOR",
    "美国": "USA", "墨西哥": "MEX", "加拿大": "CAN",
    "乌拉圭": "URU", "哥伦比亚": "COL",
    "塞内加尔": "SEN", "澳大利亚": "AUS",
}

TEAM_CN = {
    "ARG": "阿根廷", "BRA": "巴西", "FRA": "法国", "ENG": "英格兰",
    "GER": "德国", "ESP": "西班牙", "POR": "葡萄牙", "NED": "荷兰",
    "BEL": "比利时", "CRO": "克罗地亚", "MAR": "摩洛哥", "JPN": "日本",
    "KOR": "韩国", "USA": "美国", "MEX": "墨西哥", "CAN": "加拿大",
    "URU": "乌拉圭", "COL": "哥伦比亚", "SEN": "塞内加尔", "AUS": "澳大利亚",
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


def is_world_cup_related(text):
    text_lower = text.lower()
    if any(kw in text_lower for kw in WC_CORE):
        return True
    has_team = any(t in text_lower for t in TEAM_NAMES_EN + TEAM_NAMES_CN)
    has_football = any(w in text_lower for w in [
        "世界杯", "world cup", "fifa", "2026",
        "出线", "参赛", "国家队", "national team",
    ])
    return has_team and has_football


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


def parse_time(pub_date):
    for fmt in ["%Y-%m-%d %H:%M:%S", "%Y-%m-%dT%H:%M:%S", "%a, %d %b %Y %H:%M:%S %z"]:
        try:
            dt = datetime.strptime(pub_date, fmt)
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            return dt
        except ValueError:
            continue
    return None


def time_ago(dt):
    if dt is None:
        return "刚刚"
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


# ============ 中文源解析 ============

def fetch_zhibo8():
    """抓取直播吧足球新闻"""
    url = "https://news.zhibo8.cc/zuqiu/"
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as resp:
            content = resp.read().decode("utf-8", errors="ignore")
    except Exception as e:
        print(f"  ❌ 直播吧: {e}")
        return []

    pattern = r'<a[^>]*href="(//news\.zhibo8\.com/[^"]*)"[^>]*>([^<]{10,})</a>'
    matches = re.findall(pattern, content)

    items = []
    seen = set()
    for href, title in matches:
        title = title.strip()
        if title in seen or len(title) < 8:
            continue
        seen.add(title)

        if not is_world_cup_related(title):
            continue

        link = "https:" + href if href.startswith("//") else href
        now = datetime.now(timezone.utc)
        items.append({
            "id": hash_key(f"zb8-{title}"),
            "category": classify(title),
            "title": title,
            "summary": "",
            "url": link,
            "team": detect_team(title),
            "time": "刚刚",
            "time_iso": now.isoformat(),
            "source": "直播吧",
            "is_hot": is_hot(title),
        })

    print(f"  ✅ 直播吧: {len(items)} 条")
    return items


# ============ 英文 RSS 源 (直接解析 XML) ============

def fetch_rss(feed_url, source_name):
    """直接请求RSS并解析XML，不依赖第三方API"""
    try:
        req = urllib.request.Request(feed_url, headers={"User-Agent": "WorldCup2026Bot/1.0"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            xml_content = resp.read().decode("utf-8", errors="ignore")
    except Exception as e:
        print(f"  ❌ {source_name}: {e}")
        return []

    items = []
    try:
        # 解析RSS XML
        root = ET.fromstring(xml_content)
        # RSS 2.0: channel/item
        for item in root.findall('.//item'):
            title_el = item.find('title')
            desc_el = item.find('description')
            link_el = item.find('link')
            pub_el = item.find('pubDate')

            title = clean_html(title_el.text or "") if title_el is not None else ""
            desc = clean_html(desc_el.text or "") if desc_el is not None else ""
            link = (link_el.text or "").strip() if link_el is not None else ""
            pub_date = (pub_el.text or "").strip() if pub_el is not None else ""

            text = f"{title} {desc}"
            if not is_world_cup_related(text):
                continue

            pub_dt = parse_time(pub_date)
            now = datetime.now(timezone.utc)

            items.append({
                "id": hash_key(link or title),
                "category": classify(text),
                "title": title,
                "summary": desc[:120],
                "url": link,
                "team": detect_team(text),
                "time": time_ago(pub_dt),
                "time_iso": (pub_dt or now).isoformat(),
                "source": source_name,
                "is_hot": is_hot(text),
            })
    except ET.ParseError as e:
        print(f"  ❌ {source_name}: XML解析失败: {e}")
        return []

    print(f"  ✅ {source_name}: {len(items)} 条")
    return items


# ============ 主函数 ============

def load_existing(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        # 兼容两种格式
        if isinstance(data, dict):
            return data.get("articles", [])
        elif isinstance(data, list):
            return data
        return []
    except (FileNotFoundError, json.JSONDecodeError):
        return []


def merge_and_prune(old_articles, new_articles, max_age_hours, max_count):
    cutoff = datetime.now(timezone.utc) - timedelta(hours=max_age_hours)

    combined = new_articles + old_articles

    seen = set()
    unique = []
    for a in combined:
        key = a["title"][:30]
        if key in seen:
            continue
        seen.add(key)

        iso = a.get("time_iso", "")
        if iso:
            try:
                dt = datetime.fromisoformat(iso)
                if dt.tzinfo is None:
                    dt = dt.replace(tzinfo=timezone.utc)
                if dt < cutoff:
                    continue
            except (ValueError, TypeError):
                pass

        iso_dt = None
        if iso:
            try:
                iso_dt = datetime.fromisoformat(iso)
                if iso_dt.tzinfo is None:
                    iso_dt = iso_dt.replace(tzinfo=timezone.utc)
            except:
                pass
        a["time"] = time_ago(iso_dt)

        unique.append(a)

    unique.sort(key=lambda x: (
        -(1 if x.get("is_hot") else 0),
    ))

    # 按源轮换: 不让单一源独占所有坑位
    from collections import defaultdict
    by_source = defaultdict(list)
    for a in unique:
        by_source[a.get("source", "")].append(a)

    # 每个源最多占 60% 的坑位
    max_per_source = max(3, int(max_count * 0.6))
    interleaved = []
    source_keys = list(by_source.keys())
    idx = 0
    while len(interleaved) < max_count:
        added = False
        for src in source_keys:
            if idx < len(by_source[src]) and len(interleaved) < max_count:
                article = by_source[src][idx]
                # 限制每个源
                count_so_far = sum(1 for a in interleaved if a.get("source") == src)
                if count_so_far < max_per_source:
                    interleaved.append(article)
                    added = True
        idx += 1
        if not added:
            break

    return interleaved


def main():
    print("🌍 世界杯新闻抓取器 v4 启动...")
    print(f"⏰ {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_dir = os.path.dirname(script_dir)
    output_path = os.path.join(project_dir, "public", "news.json")

    # 1. 加载旧数据
    old_articles = load_existing(output_path)
    print(f"📂 旧新闻: {len(old_articles)} 条")

    # 2. 抓取新数据
    new_articles = []
    errors = []

    print("\n📡 中文源:")
    new_articles.extend(fetch_zhibo8())

    print("\n📡 英文源:")
    for feed in RSS_FEEDS:
        result = fetch_rss(feed["url"], feed["source"])
        if not result:
            errors.append(feed["source"])
        new_articles.extend(result)

    print(f"\n📥 本次抓取: {len(new_articles)} 条世界杯相关新闻")

    # 3. 合并 + 淘汰 + 去重
    articles = merge_and_prune(old_articles, new_articles, MAX_AGE_HOURS, MAX_ARTICLES)

    # 4. 输出
    output = {
        "updated_at": datetime.now(timezone.utc).isoformat(),
        "count": len(articles),
        "articles": articles,
    }

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    # 5. 统计
    cn_count = sum(1 for n in articles if n.get("source") in ("直播吧",))
    en_count = len(articles) - cn_count

    print(f"\n✅ 写入 {len(articles)} 条 ({cn_count} 中文 / {en_count} 英文)")
    print(f"   滚动窗口: {MAX_AGE_HOURS}h | 上限: {MAX_ARTICLES} 条")
    print(f"   路径: {output_path}")

    if errors:
        print(f"\n⚠️  失败源: {', '.join(errors)} (不阻塞)")

    for n in articles[:5]:
        team_str = f" [{TEAM_CN.get(n['team'], n['team'])}]" if n.get("team") else ""
        hot_str = " 🔥" if n.get("is_hot") else ""
        lang = "🇨🇳" if n.get("source") in ("直播吧",) else "🇬🇧"
        print(f"  {lang} {n['category']:8s} | {n['source']:8s} | {n['title'][:45]}{team_str}{hot_str}")


if __name__ == "__main__":
    main()
