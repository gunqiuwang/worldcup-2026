#!/usr/bin/env python3
"""
预测生成器
读取 schedule.ts → 解析赔率 → 调用 odds_engine → 输出 predictions.json
"""

import json
import re
import sys
from pathlib import Path

# 添加当前目录到 path
sys.path.insert(0, str(Path(__file__).parent))

from odds_parser import parse_american_odds


def extract_schedule_from_ts(ts_path: str) -> list[dict]:
    """从 schedule.ts 提取比赛数据"""
    with open(ts_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 找到 SCHEDULE 数组的 JSON 部分
    # 格式: export const SCHEDULE: MatchData[] = [{...}, {...}, ...];
    match = re.search(r'export const SCHEDULE: MatchData\[\] = (\[.*?\]);', content, re.DOTALL)
    if not match:
        raise ValueError("无法从 schedule.ts 提取数据")
    
    json_str = match.group(1)
    # 移除 TypeScript 类型注释
    json_str = re.sub(r'//.*?\n', '\n', json_str)
    
    return json.loads(json_str)


def generate_predictions(schedule: list[dict]) -> list[dict]:
    """为每场比赛生成预测"""
    predictions = []
    
    for match in schedule:
        match_id = match['id']
        home_abbr = match['home']['abbr']
        away_abbr = match['away']['abbr']
        details = match.get('odds', {}).get('details', '')
        
        # 解析赔率
        home_win, draw, away_win = parse_american_odds(details)
        
        # 计算置信度
        # 排名差距越大 → 置信度越高
        # 这里简化处理，后续可以加 Elo
        confidence = "medium"
        if abs(home_win - away_win) > 30:
            confidence = "high"
        elif abs(home_win - away_win) < 10:
            confidence = "low"
        
        # 爆冷指数（0-100，越高越可能爆冷）
        # 当强队胜率 < 60% 且排名差距大时 → 爆冷风险高
        upset_index = 0
        if home_win < 45 or away_win < 45:
            upset_index = min(100, int((50 - min(home_win, away_win)) * 2))
        
        predictions.append({
            'match_id': match_id,
            'home': home_abbr,
            'away': away_abbr,
            'home_win': home_win,
            'draw': draw,
            'away_win': away_win,
            'confidence': confidence,
            'upset_index': upset_index,
            'details': details,
        })
    
    return predictions


def generate_group_predictions(predictions: list[dict], groups: dict) -> dict:
    """生成小组出线概率（简化版，基于单场概率累加）"""
    group_results = {}
    
    for group_name, teams in groups.items():
        # 找出该小组的所有比赛
        group_matches = [
            p for p in predictions 
            if p['home'] in teams and p['away'] in teams
        ]
        
        # 计算每队期望积分
        team_points = {t: 0.0 for t in teams}
        team_gf = {t: 0.0 for t in teams}
        team_ga = {t: 0.0 for t in teams}
        
        for match in group_matches:
            home = match['home']
            away = match['away']
            
            # 期望积分 = 胜率×3 + 平率×1
            home_expected = match['home_win'] * 3 / 100 + match['draw'] * 1 / 100
            away_expected = match['away_win'] * 3 / 100 + match['draw'] * 1 / 100
            
            team_points[home] += home_expected
            team_points[away] += away_expected
            
            # 期望进球（简化：胜率高的进更多球）
            team_gf[home] += match['home_win'] / 30  # 粗略估计
            team_gf[away] += match['away_win'] / 30
            team_ga[home] += match['away_win'] / 30
            team_ga[away] += match['home_win'] / 30
        
        # 计算出线概率（前两名）
        sorted_teams = sorted(team_points.items(), key=lambda x: x[1], reverse=True)
        
        # 简化：第一名出线概率 90%，第二名 70%，第三名 30%，第四名 10%
        advancement_prob = {}
        for i, (team, _) in enumerate(sorted_teams):
            if i == 0:
                advancement_prob[team] = 90
            elif i == 1:
                advancement_prob[team] = 70
            elif i == 2:
                advancement_prob[team] = 30
            else:
                advancement_prob[team] = 10
        
        group_results[group_name] = {
            'teams': [
                {
                    'team': team,
                    'advancement_pct': advancement_prob[team],
                    'avg_points': round(team_points[team], 2),
                    'avg_goals_for': round(team_gf[team], 2),
                    'avg_goals_against': round(team_ga[team], 2),
                }
                for team, _ in sorted_teams
            ]
        }
    
    return group_results


def main():
    """主函数"""
    print("🚀 开始生成预测数据...")
    
    # 读取赛程
    schedule_path = Path(__file__).parent / 'data' / 'schedule.ts'
    if not schedule_path.exists():
        print(f"❌ 找不到 {schedule_path}")
        return
    
    print(f"📂 读取赛程: {schedule_path}")
    schedule = extract_schedule_from_ts(str(schedule_path))
    print(f"✅ 读取到 {len(schedule)} 场比赛")
    
    # 读取分组信息
    teams_path = Path(__file__).parent / 'data' / 'teams.ts'
    with open(teams_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取 GROUPS
    groups_match = re.search(r'export const GROUPS: Record<string, string\[\]> = ({.*?});', content, re.DOTALL)
    if groups_match:
        groups = json.loads(groups_match.group(1))
        print(f"✅ 读取到 {len(groups)} 个小组")
    else:
        print("⚠️ 无法读取分组信息，跳过小组预测")
        groups = {}
    
    # 生成比赛预测
    print("\n📊 生成比赛预测...")
    predictions = generate_predictions(schedule)
    
    # 生成小组预测
    print("🏆 生成小组出线概率...")
    group_predictions = generate_group_predictions(predictions, groups)
    
    # 输出到 src/data/
    output_dir = Path(__file__).parent / 'data'
    
    predictions_file = output_dir / 'predictions.json'
    with open(predictions_file, 'w', encoding='utf-8') as f:
        json.dump(predictions, f, ensure_ascii=False, indent=2)
    print(f"\n💾 比赛预测已保存: {predictions_file}")
    print(f"   共 {len(predictions)} 场比赛")
    
    group_file = output_dir / 'group_predictions.json'
    with open(group_file, 'w', encoding='utf-8') as f:
        json.dump(group_predictions, f, ensure_ascii=False, indent=2)
    print(f"💾 小组预测已保存: {group_file}")
    
    # 统计
    high_conf = sum(1 for p in predictions if p['confidence'] == 'high')
    med_conf = sum(1 for p in predictions if p['confidence'] == 'medium')
    low_conf = sum(1 for p in predictions if p['confidence'] == 'low')
    upset_count = sum(1 for p in predictions if p['upset_index'] > 50)
    
    print(f"\n📈 统计:")
    print(f"   置信度分布: 高={high_conf}, 中={med_conf}, 低={low_conf}")
    print(f"   潜在爆冷场次: {upset_count}")
    
    # 显示前 5 场预测
    print(f"\n📋 前 5 场预测:")
    for p in predictions[:5]:
        print(f"   {p['home']} vs {p['away']}: 主胜 {p['home_win']}% | 平 {p['draw']}% | 客胜 {p['away_win']}%")
    
    print("\n✅ 预测生成完成！")


if __name__ == "__main__":
    main()
