import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, ArrowRightLeft } from 'lucide-react';
import { SCHEDULE } from '../data/schedule';
import { TEAMS } from '../data/teams';
import { parseOddsDetail } from '../utils/odds';
import Flag from './Flag';
import { useMemo } from 'react';

interface OddsItem {
  id: string;
  home: string;
  away: string;
  homeName: string;
  awayName: string;
  favorite: string; // 被看好的队伍
  favoriteOdds: number;
  underdog: string;
  underdogOdds: number;
  spread: number; // 赔率差距（越大越一边倒）
  date: string;
  group: string;
}

export default function OddsMovement() {
  const oddsList = useMemo(() => {
    const results: OddsItem[] = [];

    for (const m of SCHEDULE) {
      if (!m.odds?.details) continue;
      const parsed = parseOddsDetail(m.odds.details);
      if (!parsed) continue;

      const isHomeFav = parsed.team === m.home.abbr;
      const favAbbr = isHomeFav ? m.home.abbr : m.away.abbr;
      const dogAbbr = isHomeFav ? m.away.abbr : m.home.abbr;
      const favName = isHomeFav ? m.home.name : m.away.name;
      const dogName = isHomeFav ? m.away.name : m.home.name;

      results.push({
        id: m.id,
        home: m.home.abbr,
        away: m.away.abbr,
        homeName: m.home.name,
        awayName: m.away.name,
        favorite: favAbbr,
        favoriteOdds: parsed.odds,
        underdog: dogAbbr,
        underdogOdds: -parsed.odds,
        spread: Math.abs(parsed.odds),
        date: m.date,
        group: m.group,
      });
    }

    // 按赔率差距排序：差距越大 = 越一边倒
    return results.sort((a, b) => a.spread - b.spread).slice(0, 8);
  }, []);

  function formatOdds(odds: number): string {
    if (odds > 0) return `+${odds}`;
    return `${odds}`;
  }

  // 模拟异动方向（基于比赛ID伪随机）
  function getMovement(matchId: string): 'up' | 'down' | 'flat' {
    const seed = parseInt(matchId) || 0;
    const r = ((seed * 9301 + 49297) % 233280) / 233280;
    if (r < 0.33) return 'up';
    if (r < 0.66) return 'down';
    return 'flat';
  }

  function getChangePercent(matchId: string): number {
    const seed = parseInt(matchId) || 0;
    const r = ((seed * 9301 + 49297) % 233280) / 233280;
    return Math.round(r * 15 * 10) / 10;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 mb-3"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-gold/10 flex items-center justify-center">
          <ArrowRightLeft className="w-4 h-4 text-gold" />
        </div>
        <div>
          <h3 className="text-sm font-bold">赔率异动排行</h3>
          <p className="text-[10px] text-gray-500">最接近的对决 · 赔率差距最小</p>
        </div>
      </div>

      <div className="space-y-1.5">
        {oddsList.map((m, i) => {
          const movement = getMovement(m.id);
          const changePct = getChangePercent(m.id);

          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-white/[0.03] transition cursor-pointer"
            >
              {/* 排名 */}
              <div className="w-5 text-center text-[10px] font-bold text-gray-500">
                {i + 1}
              </div>

              {/* 对阵 */}
              <div className="flex items-center gap-1 flex-1 min-w-0">
                <Flag code={m.home} size="sm" />
                <span className="text-[11px] font-medium truncate">{m.homeName}</span>
                <span className="text-[10px] text-gray-600 mx-0.5">vs</span>
                <Flag code={m.away} size="sm" />
                <span className="text-[11px] font-medium truncate">{m.awayName}</span>
              </div>

              {/* 赔率 */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="text-[10px] text-gray-500 font-mono">
                  {formatOdds(m.favoriteOdds)}
                </span>

                {/* 异动指示 */}
                <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-semibold ${
                  movement === 'up'
                    ? 'bg-green/10 text-green'
                    : movement === 'down'
                    ? 'bg-red/10 text-red'
                    : 'bg-white/5 text-gray-500'
                }`}>
                  {movement === 'up' ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : movement === 'down' ? (
                    <TrendingDown className="w-3 h-3" />
                  ) : (
                    <Minus className="w-3 h-3" />
                  )}
                  {changePct}%
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
