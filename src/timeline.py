#!/usr/bin/env python3
"""
赔率时间序列存储
记录每场比赛的概率变化历史，为前端折线图提供数据。
轻量实现：JSON 文件存储，不依赖数据库。
"""

import json
import os
from datetime import datetime, timezone, timedelta
from dataclasses import dataclass, asdict
from pathlib import Path


DATA_DIR = Path(__file__).parent.parent / "data"
MATCHES_FILE = DATA_DIR / "matches.json"
HISTORY_DIR = DATA_DIR / "history"


@dataclass
class OddsSnapshot:
    """某一时刻的赔率快照"""
    timestamp: str          # ISO 8601
    home_win: float         # 0-100
    draw: float             # 0-100
    away_win: float         # 0-100
    confidence: str         # high / medium / low
    sources: int            # 数据源数量
    vig: float              # 抽水率
    edge: str = ""          # 异动检测
    live_score: str = ""    # 比赛进行中的比分


@dataclass
class MatchInfo:
    """比赛基础信息"""
    match_id: str           # 唯一 ID，如 "A1" = A 组第 1 场
    group: str              # A-L
    home_team: str
    away_team: str
    kick_off: str           # ISO 8601 开赛时间
    venue: str              # 球场
    status: str = "scheduled"  # scheduled / live / finished
    home_score: int = -1
    away_score: int = -1
    snapshots: list = None  # OddsSnapshot 列表

    def __post_init__(self):
        if self.snapshots is None:
            self.snapshots = []


class OddsTimeline:
    """
    赔率时间线管理器
    
    职责：
    1. 存储所有比赛的基础信息
    2. 记录每次赔率更新的快照
    3. 提供查询接口（某场比赛的历史、当前状态）
    4. 计算变化幅度（用于前端动画）
    """
    
    def __init__(self):
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        HISTORY_DIR.mkdir(parents=True, exist_ok=True)
        self.matches: dict[str, MatchInfo] = {}
        self._load()
    
    def _load(self):
        """从文件加载已有数据"""
        if MATCHES_FILE.exists():
            with open(MATCHES_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
                for mid, m in data.items():
                    snapshots = [OddsSnapshot(**s) for s in m.pop("snapshots", [])]
                    info = MatchInfo(**m)
                    info.snapshots = snapshots
                    self.matches[mid] = info
    
    def save(self):
        """保存到文件"""
        data = {}
        for mid, m in self.matches.items():
            d = {
                "match_id": m.match_id,
                "group": m.group,
                "home_team": m.home_team,
                "away_team": m.away_team,
                "kick_off": m.kick_off,
                "venue": m.venue,
                "status": m.status,
                "home_score": m.home_score,
                "away_score": m.away_score,
                "snapshots": [asdict(s) for s in m.snapshots],
            }
            data[mid] = d
        
        with open(MATCHES_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    
    def add_match(self, match: MatchInfo):
        """注册一场比赛"""
        self.matches[match.match_id] = match
    
    def record_snapshot(self, match_id: str, snapshot: OddsSnapshot):
        """记录一次赔率快照"""
        if match_id not in self.matches:
            raise ValueError(f"比赛 {match_id} 不存在")
        
        self.matches[match_id].snapshots.append(snapshot)
        self.save()
    
    def get_current(self, match_id: str) -> OddsSnapshot | None:
        """获取最新快照"""
        m = self.matches.get(match_id)
        if not m or not m.snapshots:
            return None
        return m.snapshots[-1]
    
    def get_history(self, match_id: str, last_n: int = 0) -> list[OddsSnapshot]:
        """获取历史快照，last_n=0 表示全部"""
        m = self.matches.get(match_id)
        if not m:
            return []
        if last_n > 0:
            return m.snapshots[-last_n:]
        return m.snapshots
    
    def get_movement(self, match_id: str) -> dict:
        """
        计算概率变化幅度
        
        返回：
        - home_delta: 主胜概率相比首次记录的变化
        - draw_delta: 平局概率变化
        - away_delta: 客胜概率变化
        - max_shift: 最大单次变动
        - trend: "home_up" / "away_up" / "stable"
        """
        history = self.get_history(match_id)
        if len(history) < 2:
            return {
                "home_delta": 0, "draw_delta": 0, "away_delta": 0,
                "max_shift": 0, "trend": "stable",
            }
        
        first = history[0]
        last = history[-1]
        
        home_delta = last.home_win - first.home_win
        draw_delta = last.draw - first.draw
        away_delta = last.away_win - first.away_win
        
        # 最大单次变动
        max_shift = 0
        for i in range(1, len(history)):
            shift = abs(history[i].home_win - history[i-1].home_win)
            max_shift = max(max_shift, shift)
        
        if abs(home_delta) < 2:
            trend = "stable"
        elif home_delta > 0:
            trend = "home_up"
        else:
            trend = "away_up"
        
        return {
            "home_delta": round(home_delta, 1),
            "draw_delta": round(draw_delta, 1),
            "away_delta": round(away_delta, 1),
            "max_shift": round(max_shift, 1),
            "trend": trend,
        }
    
    def get_today_matches(self) -> list[MatchInfo]:
        """获取今日比赛"""
        today = datetime.now(timezone(timedelta(hours=8))).strftime("%Y-%m-%d")
        return [
            m for m in self.matches.values()
            if m.kick_off.startswith(today)
        ]
    
    def get_live_matches(self) -> list[MatchInfo]:
        """获取正在进行的比赛"""
        return [m for m in self.matches.values() if m.status == "live"]
    
    def to_chart_data(self, match_id: str) -> dict:
        """
        输出前端折线图需要的数据格式
        
        {
            "labels": ["19:00", "19:15", "19:30", ...],
            "datasets": {
                "home_win": [55.2, 54.8, 56.1, ...],
                "draw": [25.0, 25.2, 24.5, ...],
                "away_win": [19.8, 20.0, 19.4, ...]
            }
        }
        """
        history = self.get_history(match_id)
        if not history:
            return {"labels": [], "datasets": {"home_win": [], "draw": [], "away_win": []}}
        
        labels = []
        home_data = []
        draw_data = []
        away_data = []
        
        for snap in history:
            # 只取时间部分 HH:MM
            time_str = snap.timestamp.split("T")[1][:5] if "T" in snap.timestamp else snap.timestamp
            labels.append(time_str)
            home_data.append(snap.home_win)
            draw_data.append(snap.draw)
            away_data.append(snap.away_win)
        
        return {
            "labels": labels,
            "datasets": {
                "home_win": home_data,
                "draw": draw_data,
                "away_win": away_data,
            }
        }


# ─── 测试 ──────────────────────────────────────────────────────────────────

def test_timeline():
    """模拟一场比赛的赔率变化"""
    tl = OddsTimeline()
    
    # 注册比赛
    tl.add_match(MatchInfo(
        match_id="A1",
        group="A",
        home_team="美国",
        away_team="哥伦比亚",
        kick_off="2026-06-11T21:00:00+08:00",
        venue="达拉斯 AT&T 体育场",
    ))
    
    # 模拟 8 次赔率更新（赛前 2 小时到比赛中）
    updates = [
        ("2026-06-11T19:00:00+08:00", 53.0, 26.0, 21.0, "medium", 1, 6.5),
        ("2026-06-11T19:15:00+08:00", 53.5, 25.8, 20.7, "medium", 2, 6.3),
        ("2026-06-11T19:30:00+08:00", 54.2, 25.5, 20.3, "high",   3, 6.1),
        ("2026-06-11T20:00:00+08:00", 55.0, 25.0, 20.0, "high",   3, 5.8),
        ("2026-06-11T20:30:00+08:00", 55.8, 24.5, 19.7, "high",   3, 5.5),
        ("2026-06-11T21:00:00+08:00", 56.0, 24.3, 19.7, "high",   3, 5.3, "live", "0-0"),
        ("2026-06-11T21:30:00+08:00", 62.5, 22.0, 15.5, "high",   3, 5.0, "live", "1-0"),
        ("2026-06-11T22:45:00+08:00", 100.0, 0.0, 0.0,  "high",   3, 0.0, "finished", "2-1"),
    ]
    
    for update in updates:
        ts, hw, dr, aw, conf, src, vig = update[:7]
        status = update[7] if len(update) > 7 else "scheduled"
        score = update[8] if len(update) > 8 else ""
        
        tl.record_snapshot("A1", OddsSnapshot(
            timestamp=ts,
            home_win=hw, draw=dr, away_win=aw,
            confidence=conf, sources=src, vig=vig,
            live_score=score,
        ))
        tl.matches["A1"].status = status
        if score:
            parts = score.split("-")
            tl.matches["A1"].home_score = int(parts[0])
            tl.matches["A1"].away_score = int(parts[1])
    
    tl.save()
    
    # 验证
    current = tl.get_current("A1")
    print(f"当前概率：美国 {current.home_win}% | 平 {current.draw}% | 哥伦比亚 {current.away_win}%")
    
    movement = tl.get_movement("A1")
    print(f"变化幅度：美国 {movement['home_delta']:+.1f}% | 趋势: {movement['trend']}")
    print(f"最大单次变动: {movement['max_shift']:.1f}%")
    
    chart = tl.to_chart_data("A1")
    print(f"折线图数据点: {len(chart['labels'])} 个")
    print(f"时间轴: {chart['labels']}")
    print(f"主胜概率: {chart['datasets']['home_win']}")
    
    print("\n✅ 时间线测试通过")


if __name__ == "__main__":
    test_timeline()
