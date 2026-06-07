#!/usr/bin/env python3
"""
集成预测模型
融合 Elo 评分 + 赔率共识 + 近期状态 → 最终概率
"""

import json
import math
from pathlib import Path


def load_json(path: str) -> dict:
    with open(path, 'r', encoding='utf-8') as f:
        return json.load(f)


def elo_expected(elo_a: float, elo_b: float) -> float:
    """Elo 期望胜率"""
    return 1.0 / (1.0 + math.pow(10, (elo_b - elo_a) / 400.0))


def ensemble_predict(
    home_abbr: str,
    away_abbr: str,
    elo_data: dict,
    form_data: dict,
    odds_home: float,
    odds_draw: float,
    odds_away: float,
) -> dict:
    """
    集成预测
    
    权重分配：
    - 赔率共识: 40% (市场最聪明)
    - Elo 评分: 35% (长期实力)
    - 近期状态: 25% (短期波动)
    """
    # 1. 赔率概率 (已经是 0-100)
    odds_total = odds_home + odds_draw + odds_away
    if odds_total > 0:
        odds_home_norm = odds_home / odds_total * 100
        odds_draw_norm = odds_draw / odds_total * 100
        odds_away_norm = odds_away / odds_total * 100
    else:
        odds_home_norm = 40
        odds_draw_norm = 25
        odds_away_norm = 35
    
    # 2. Elo 概率
    home_elo = elo_data.get(home_abbr, {}).get('elo', 1500)
    away_elo = elo_data.get(away_abbr, {}).get('elo', 1500)
    
    # 主场优势 (世界杯中立场，但仍有微弱主场效应)
    home_elo_adj = home_elo + 50  # 主队 +50 Elo
    
    elo_home = elo_expected(home_elo_adj, away_elo) * 100
    elo_away = elo_expected(away_elo, home_elo_adj) * 100
    elo_draw = max(10, 100 - elo_home - elo_away)  # 平局至少 10%
    
    # 归一化
    elo_total = elo_home + elo_draw + elo_away
    elo_home_norm = elo_home / elo_total * 100
    elo_draw_norm = elo_draw / elo_total * 100
    elo_away_norm = elo_away / elo_total * 100
    
    # 3. 状态概率调整
    home_form = form_data.get(home_abbr, {}).get('form_score', 50)
    away_form = form_data.get(away_abbr, {}).get('form_score', 50)
    
    # 状态差值 → 概率调整
    form_diff = (home_form - away_form) / 100  # -1 到 +1
    form_adj = form_diff * 10  # 最大调整 ±10%
    
    form_home = 50 + form_adj
    form_away = 50 - form_adj
    form_draw = 50  # 状态不影响平局率
    
    # 归一化
    form_total = form_home + form_draw + form_away
    form_home_norm = form_home / form_total * 100
    form_draw_norm = form_draw / form_total * 100
    form_away_norm = form_away / form_total * 100
    
    # 4. 加权融合
    W_ODDS = 0.40
    W_ELO = 0.35
    W_FORM = 0.25
    
    final_home = (
        odds_home_norm * W_ODDS +
        elo_home_norm * W_ELO +
        form_home_norm * W_FORM
    )
    final_draw = (
        odds_draw_norm * W_ODDS +
        elo_draw_norm * W_ELO +
        form_draw_norm * W_FORM
    )
    final_away = (
        odds_away_norm * W_ODDS +
        elo_away_norm * W_ELO +
        form_away_norm * W_FORM
    )
    
    # 归一化到 100%
    total = final_home + final_draw + final_away
    final_home = round(final_home / total * 100, 1)
    final_draw = round(final_draw / total * 100, 1)
    final_away = round(final_away / total * 100, 1)
    
    # 5. 置信度评估
    # 基于数据一致性
    sources = [
        (odds_home_norm, elo_home_norm, form_home_norm),
        (odds_away_norm, elo_away_norm, form_away_norm),
    ]
    
    max_spread = 0
    for odds, elo, form in sources:
        spread = max(abs(odds - elo), abs(odds - form), abs(elo - form))
        max_spread = max(max_spread, spread)
    
    if max_spread < 8:
        confidence = 'high'
    elif max_spread < 15:
        confidence = 'medium'
    else:
        confidence = 'low'
    
    # 6. 爆冷指数
    upset_index = 0
    if final_home < 45 or final_away < 45:
        upset_index = min(100, int((50 - min(final_home, final_away)) * 2))
    
    return {
        'home_win': final_home,
        'draw': final_draw,
        'away_win': final_away,
        'confidence': confidence,
        'upset_index': upset_index,
        'sources': {
            'odds': {'home': round(odds_home_norm, 1), 'draw': round(odds_draw_norm, 1), 'away': round(odds_away_norm, 1)},
            'elo': {'home': round(elo_home_norm, 1), 'draw': round(elo_draw_norm, 1), 'away': round(elo_away_norm, 1)},
            'form': {'home': round(form_home_norm, 1), 'draw': round(form_draw_norm, 1), 'away': round(form_away_norm, 1)},
        }
    }


def main():
    """主函数"""
    print("🧠 启动集成预测模型...")
    
    # 加载数据
    data_dir = Path(__file__).parent / 'data'
    
    elo_data = load_json(str(data_dir / 'elo_ratings.json'))
    form_data = load_json(str(data_dir / 'team_form.json'))
    
    # 读取 predictions.json (已有赔率解析)
    predictions = load_json(str(data_dir / 'predictions.json'))
    
    print(f"   ✅ Elo 数据: {len(elo_data)} 队")
    print(f"   ✅ 状态数据: {len(form_data)} 队")
    print(f"   ✅ 赔率预测: {len(predictions)} 场")
    
    # 生成集成预测
    ensemble_results = []
    
    for pred in predictions:
        home = pred['home']
        away = pred['away']
        
        result = ensemble_predict(
            home_abbr=home,
            away_abbr=away,
            elo_data=elo_data,
            form_data=form_data,
            odds_home=pred['home_win'],
            odds_draw=pred['draw'],
            odds_away=pred['away_win'],
        )
        
        ensemble_results.append({
            'match_id': pred['match_id'],
            'home': home,
            'away': away,
            'home_win': result['home_win'],
            'draw': result['draw'],
            'away_win': result['away_win'],
            'confidence': result['confidence'],
            'upset_index': result['upset_index'],
            'details': pred['details'],
            'sources': result['sources'],
        })
    
    # 保存结果
    output_path = data_dir / 'ensemble_predictions.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(ensemble_results, f, ensure_ascii=False, indent=2)
    
    print(f"\n💾 集成预测已保存: {output_path}")
    
    # 统计
    high_conf = sum(1 for r in ensemble_results if r['confidence'] == 'high')
    med_conf = sum(1 for r in ensemble_results if r['confidence'] == 'medium')
    low_conf = sum(1 for r in ensemble_results if r['confidence'] == 'low')
    upset_count = sum(1 for r in ensemble_results if r['upset_index'] > 50)
    
    print(f"\n📊 统计:")
    print(f"   置信度: 高={high_conf}, 中={med_conf}, 低={low_conf}")
    print(f"   爆冷预警: {upset_count} 场")
    
    # 显示前 5 场
    print(f"\n📋 前 5 场集成预测:")
    for r in ensemble_results[:5]:
        sources = r['sources']
        print(f"   {r['home']} vs {r['away']}: {r['home_win']}% | {r['draw']}% | {r['away_win']}%")
        print(f"      赔率: {sources['odds']['home']}% | {sources['elo']['home']}% | {sources['form']['home']}%")
    
    print("\n✅ 集成预测完成！")


if __name__ == "__main__":
    main()
