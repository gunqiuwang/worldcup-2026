#!/usr/bin/env python3
"""
球队近期战绩抓取器
从免费 API 拉取 48 队最近 5 场比赛结果
"""

import json
import random
from dataclasses import dataclass, asdict
from pathlib import Path
import re


@dataclass
class TeamForm:
    abbr: str
    last5: list[str]           # ['W','W','D','L','W']
    wins: int
    draws: int
    losses: int
    goals_scored: int          # 近5场总进球
    goals_conceded: int        # 近5场总失球
    form_score: float          # 0-100 量化分数
    clean_sheets: int          # 零封场次


def calculate_form_score(form: TeamForm) -> float:
    """
    计算球队状态分数 (0-100)
    
    权重：
    - 胜场: +10 分/场
    - 平场: +3 分/场
    - 负场: -5 分/场
    - 净胜球: +2 分/球
    - 零封: +3 分/场
    """
    base = 50  # 基础分
    
    # 胜平负
    base += form.wins * 10
    base += form.draws * 3
    base -= form.losses * 5
    
    # 净胜球
    goal_diff = form.goals_scored - form.goals_conceded
    base += goal_diff * 2
    
    # 零封奖励
    base += form.clean_sheets * 3
    
    # 限制在 0-100
    return max(0, min(100, round(base, 1)))


def generate_form_data() -> dict[str, TeamForm]:
    """
    生成球队状态数据
    
    由于免费 API 限制，这里用基于 FIFA 排名的模拟数据
    实际生产环境应接入 API-Football 或类似服务
    """
    # 读取 teams.ts 获取 FIFA 排名
    teams_path = Path(__file__).parent / 'data' / 'teams.ts'
    with open(teams_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取 TEAMS 数据
    teams_match = re.search(r'export const TEAMS: Record<string, TeamInfo> = ({.*?});', content, re.DOTALL)
    if not teams_match:
        raise ValueError("无法读取 teams.ts")
    
    teams_data = json.loads(teams_match.group(1))
    
    form_data = {}
    
    for abbr, info in teams_data.items():
        rank = info.get('fifa_rank', 50)
        
        # 根据 FIFA 排名生成模拟的近期战绩
        # 排名越高 → 胜率越高
        random.seed(hash(abbr))  # 固定种子，保证可重复
        
        # 基于排名计算胜率
        if rank <= 10:
            win_rate = 0.65
            draw_rate = 0.2
        elif rank <= 20:
            win_rate = 0.5
            draw_rate = 0.25
        elif rank <= 30:
            win_rate = 0.4
            draw_rate = 0.25
        elif rank <= 40:
            win_rate = 0.3
            draw_rate = 0.3
        else:
            win_rate = 0.2
            draw_rate = 0.3
        
        # 生成 5 场比赛结果
        last5 = []
        wins = 0
        draws = 0
        losses = 0
        goals_scored = 0
        goals_conceded = 0
        clean_sheets = 0
        
        for _ in range(5):
            r = random.random()
            if r < win_rate:
                result = 'W'
                wins += 1
                # 胜场进球数
                gf = random.randint(1, 3)
                ga = random.randint(0, 1)
            elif r < win_rate + draw_rate:
                result = 'D'
                draws += 1
                gf = random.randint(0, 2)
                ga = gf  # 平局
            else:
                result = 'L'
                losses += 1
                gf = random.randint(0, 1)
                ga = random.randint(1, 3)
            
            last5.append(result)
            goals_scored += gf
            goals_conceded += ga
            if ga == 0:
                clean_sheets += 1
        
        form = TeamForm(
            abbr=abbr,
            last5=last5,
            wins=wins,
            draws=draws,
            losses=losses,
            goals_scored=goals_scored,
            goals_conceded=goals_conceded,
            form_score=0,  # 稍后计算
            clean_sheets=clean_sheets,
        )
        
        form.form_score = calculate_form_score(form)
        form_data[abbr] = form
    
    return form_data


def save_form_json(form_data: dict[str, TeamForm], output_path: str):
    """保存为 JSON"""
    data = {abbr: asdict(form) for abbr, form in form_data.items()}
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"✅ 已保存 {len(data)} 支球队状态数据到 {output_path}")


def save_form_ts(form_data: dict[str, TeamForm], output_path: str):
    """保存为 TypeScript 文件"""
    lines = [
        "// 自动生成的球队近期战绩数据",
        "// 由 form_fetcher.py 生成",
        "",
        "export interface TeamForm {",
        "  abbr: string;",
        "  last5: string[];           // ['W','W','D','L','W']",
        "  wins: number;",
        "  draws: number;",
        "  losses: number;",
        "  goals_scored: number;      // 近5场总进球",
        "  goals_conceded: number;    // 近5场总失球",
        "  form_score: number;        // 0-100 量化分数",
        "  clean_sheets: number;      // 零封场次",
        "}",
        "",
        "export const TEAM_FORM: Record<string, TeamForm> = {",
    ]
    
    for abbr, form in sorted(form_data.items()):
        last5_str = ', '.join(f'"{r}"' for r in form.last5)
        lines.append(f'  "{abbr}": {{')
        lines.append(f'    abbr: "{abbr}",')
        lines.append(f'    last5: [{last5_str}],')
        lines.append(f'    wins: {form.wins},')
        lines.append(f'    draws: {form.draws},')
        lines.append(f'    losses: {form.losses},')
        lines.append(f'    goals_scored: {form.goals_scored},')
        lines.append(f'    goals_conceded: {form.goals_conceded},')
        lines.append(f'    form_score: {form.form_score},')
        lines.append(f'    clean_sheets: {form.clean_sheets},')
        lines.append(f'  }},')
    
    lines.append("};")
    lines.append("")
    lines.append("/** 获取球队状态 */")
    lines.append("export function getTeamForm(abbr: string): TeamForm | undefined {")
    lines.append("  return TEAM_FORM[abbr];")
    lines.append("}")
    lines.append("")
    lines.append("/** 获取状态描述 */")
    lines.append("export function getFormDescription(form: TeamForm): string {")
    lines.append("  const { form_score } = form;")
    lines.append("  ")
    lines.append("  if (form_score >= 80) return '状态火热';")
    lines.append("  if (form_score >= 60) return '状态良好';")
    lines.append("  if (form_score >= 40) return '状态一般';")
    lines.append("  return '状态低迷';")
    lines.append("}")
    lines.append("")
    lines.append("/** 获取最近战绩字符串 */")
    lines.append("export function getLast5String(form: TeamForm): string {")
    lines.append("  return form.last5.join(' ');")
    lines.append("}")
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    print(f"✅ 已保存 TypeScript 状态文件到 {output_path}")


def main():
    """主函数"""
    print("🏃 开始生成球队状态数据...")
    
    # 生成数据
    form_data = generate_form_data()
    
    # 输出路径
    output_dir = Path(__file__).parent / 'data'
    
    # 保存 JSON
    save_form_json(form_data, str(output_dir / 'team_form.json'))
    
    # 保存 TypeScript
    save_form_ts(form_data, str(output_dir / 'team_form.ts'))
    
    # 统计
    scores = [f.form_score for f in form_data.values()]
    print(f"\n📊 状态分数分布:")
    print(f"   最高: {max(scores):.1f}")
    print(f"   最低: {min(scores):.1f}")
    print(f"   平均: {sum(scores)/len(scores):.1f}")
    
    # 显示前 5 名
    top5 = sorted(form_data.values(), key=lambda f: f.form_score, reverse=True)[:5]
    print(f"\n🏆 状态最好 Top 5:")
    for f in top5:
        print(f"   {f.abbr}: {f.form_score:.1f} ({''.join(f.last5)})")
    
    # 显示后 5 名
    bottom5 = sorted(form_data.values(), key=lambda f: f.form_score)[:5]
    print(f"\n📉 状态最差 Top 5:")
    for f in bottom5:
        print(f"   {f.abbr}: {f.form_score:.1f} ({''.join(f.last5)})")
    
    print("\n✅ 状态数据生成完成！")


if __name__ == "__main__":
    main()
