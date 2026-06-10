// 比赛预览数据加载 — 从 public/match-previews.json 读取 Poisson 预测

export interface MatchPreview {
  match: string;
  home: string;
  away: string;
  home_name: string;
  away_name: string;
  style: string;
  verdict: string;
  likely_score: string;
  goals_note: string;
  home_xg: number;
  away_xg: number;
  top_scores: { score: string; prob: number }[];
  probabilities: {
    home_win: number;
    draw: number;
    away_win: number;
  };
}

let _previews: MatchPreview[] | null = null;
let _loading: Promise<void> | null = null;

async function loadPreviews(): Promise<void> {
  if (_previews) return;
  try {
    const res = await fetch('/match-previews.json');
    if (res.ok) {
      _previews = await res.json();
    }
  } catch {
    _previews = [];
  }
}

/** 获取某场比赛的预览 (按主客队缩写匹配) */
export async function getMatchPreview(home: string, away: string): Promise<MatchPreview | null> {
  if (!_loading) _loading = loadPreviews();
  await _loading;
  return _previews?.find(p => p.home === home && p.away === away) ?? null;
}

/** 获取所有预览 */
export async function getAllPreviews(): Promise<MatchPreview[]> {
  if (!_loading) _loading = loadPreviews();
  await _loading;
  return _previews ?? [];
}
