// 赔率计算工具
// American odds → implied probability conversion

/** 解析美式赔率字符串，返回隐含胜率 (0-1) */
export function americanToProb(odds: number): number {
  if (odds < 0) {
    return Math.abs(odds) / (Math.abs(odds) + 100);
  }
  return 100 / (odds + 100);
}

/** 解析赔率字符串 "MEX -215" → { team, odds, prob } */
export function parseOddsDetail(detail: string): {
  team: string;
  odds: number;
  prob: number;
} | null {
  const m = detail.match(/^(\w+)\s+([+-]\d+)$/);
  if (!m) return null;
  const team = m[1];
  const odds = parseInt(m[2], 10);
  return { team, odds, prob: americanToProb(odds) };
}

/** 计算爆冷指数 (0-100)：双方胜率越接近，爆冷指数越高 */
export function calcUpsetIndex(homeProb: number, awayProb: number): number {
  // 胜率差越小 → 爆冷指数越高
  const diff = Math.abs(homeProb - awayProb);
  // 差值0时=100分（最大爆冷可能），差值60%以上=20分（一边倒）
  return Math.max(0, Math.round(100 - diff * 133));
}

/** 模拟赔率异动：基于FIFA排名差生成模拟变化 */
export function simulateOddsChange(
  homeRank: number,
  awayRank: number,
  matchId: string
): { prevOdds: number; currOdds: number; change: number } {
  // 用matchId作伪随机种子
  const seed = parseInt(matchId) || 0;
  const r = ((seed * 9301 + 49297) % 233280) / 233280;
  const rankDiff = Math.abs(homeRank - awayRank);
  // 排名差越大，赔率变化越小
  const baseChange = Math.max(3, 30 - rankDiff);
  const change = Math.round((r * baseChange * 2 - baseChange) * 10) / 10;
  return { prevOdds: 0, currOdds: 0, change };
}

/** 计算两队各自的隐含胜率 */
export function calcMatchProbs(
  detail: string,
  homeAbbr: string,
  awayAbbr: string
): { homeProb: number; awayProb: number; drawProb: number } | null {
  const parsed = parseOddsDetail(detail);
  if (!parsed) return null;

  // detail里的team可能是主队或客队
  if (parsed.team === homeAbbr) {
    const homeProb = parsed.prob;
    // 简化：假设平局概率约15-20%，剩余给另一队
    const drawProb = 0.15;
    const awayProb = 1 - homeProb - drawProb;
    return {
      homeProb: Math.round(homeProb * 1000) / 10,
      awayProb: Math.round(Math.max(0, awayProb) * 1000) / 10,
      drawProb: Math.round(drawProb * 1000) / 10,
    };
  } else {
    const awayProb = parsed.prob;
    const drawProb = 0.15;
    const homeProb = 1 - awayProb - drawProb;
    return {
      homeProb: Math.round(Math.max(0, homeProb) * 1000) / 10,
      awayProb: Math.round(awayProb * 1000) / 10,
      drawProb: Math.round(drawProb * 1000) / 10,
    };
  }
}
