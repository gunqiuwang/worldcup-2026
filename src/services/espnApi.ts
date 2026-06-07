// ESPN 公开 API 接入
// 文档: https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard

export interface EspnScore {
  id: string;
  status: 'scheduled' | 'in' | 'final'; // in = 进行中
  clock: string;
  home: { abbr: string; score: number };
  away: { abbr: string; score: number };
}

const ESPN_BASE = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world';

// ESPN 队名缩写 → FIFA 代码映射
const ESPN_TO_FIFA: Record<string, string> = {
  ARG: 'ARG', ALG: 'ALG', AUT: 'AUT', JOR: 'JOR',
  USA: 'USA', PAR: 'PAR', AUS: 'AUS', TUR: 'TUR',
  BEL: 'BEL', EGY: 'EGY', IRN: 'IRN', NZL: 'NZL',
  CAN: 'CAN', BIH: 'BIH', QAT: 'QAT', SUI: 'SUI',
  BRA: 'BRA', HAI: 'HAI', MAR: 'MAR', SCO: 'SCO',
  GER: 'GER', CUW: 'CUW', CIV: 'CIV', ECU: 'ECU',
  COL: 'COL', POR: 'POR', COD: 'COD', UZB: 'UZB',
  ESP: 'ESP', CPV: 'CPV', KSA: 'KSA', URU: 'URU',
  ENG: 'ENG', CRO: 'CRO', GHA: 'GHA', PAN: 'PAN',
  MEX: 'MEX', CZE: 'CZE', KOR: 'KOR', RSA: 'RSA',
  FRA: 'FRA', IRQ: 'IRQ', NOR: 'NOR', SEN: 'SEN',
  NED: 'NED', JPN: 'JPN', SWE: 'SWE', TUN: 'TUN',
};

// 拉取今日比分
export async function fetchScores(): Promise<EspnScore[]> {
  try {
    const res = await fetch(`${ESPN_BASE}/scoreboard`);
    if (!res.ok) return [];
    const data = await res.json();

    return (data.events || []).map((ev: any) => {
      const comp = ev.competitions?.[0];
      if (!comp) return null;

      const competitors = comp.competitors || [];
      const home = competitors.find((c: any) => c.homeAway === 'home');
      const away = competitors.find((c: any) => c.homeAway === 'away');

      const statusCode = comp.status?.type?.state; // 'pre' | 'in' | 'post'
      let status: EspnScore['status'] = 'scheduled';
      if (statusCode === 'in') status = 'in';
      else if (statusCode === 'post') status = 'final';

      return {
        id: ev.id,
        status,
        clock: comp.status?.displayClock || '0:00',
        home: {
          abbr: ESPN_TO_FIFA[home?.team?.abbreviation] || home?.team?.abbreviation || '',
          score: parseInt(home?.score || '0', 10),
        },
        away: {
          abbr: ESPN_TO_FIFA[away?.team?.abbreviation] || away?.team?.abbreviation || '',
          score: parseInt(away?.score || '0', 10),
        },
      };
    }).filter(Boolean);
  } catch {
    return [];
  }
}

// 轮询管理
let pollTimer: ReturnType<typeof setInterval> | null = null;
let lastScores: EspnScore[] = [];

export function startScorePolling(
  onUpdate: (scores: EspnScore[]) => void,
  intervalMs = 30000
) {
  if (pollTimer) clearInterval(pollTimer);

  const poll = async () => {
    const scores = await fetchScores();
    if (scores.length > 0) {
      // 检测进球
      for (const s of scores) {
        const prev = lastScores.find((p) => p.id === s.id);
        if (prev) {
          if (s.home.score > prev.home.score || s.away.score > prev.away.score) {
            // 进球事件
            window.dispatchEvent(new CustomEvent('goal', { detail: s }));
          }
        }
      }
      lastScores = scores;
      onUpdate(scores);
    }
  };

  poll(); // 立即执行一次
  pollTimer = setInterval(poll, intervalMs);
}

export function stopScorePolling() {
  if (pollTimer) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
}
