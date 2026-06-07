import { motion } from 'framer-motion';
import { AlertTriangle, Flame, ChevronRight } from 'lucide-react';
import { SCHEDULE } from '../data/schedule';
import { TEAMS } from '../data/teams';
import { calcMatchProbs, calcUpsetIndex } from '../utils/odds';
import Flag from './Flag';
import { useMemo } from 'react';

interface UpsetMatch {
  id: string;
  home: string;
  away: string;
  homeName: string;
  awayName: string;
  homeProb: number;
  awayProb: number;
  upsetIndex: number;
  date: string;
  group: string;
  level: 'high' | 'medium' | 'low';
}

export default function UpsetRanking() {
  const upsetMatches = useMemo(() => {
    const results: UpsetMatch[] = [];

    for (const m of SCHEDULE) {
      if (!m.odds?.details) continue;
      const probs = calcMatchProbs(
        m.odds.details,
        m.home.abbr,
        m.away.abbr
      );
      if (!probs) continue;

      const upset = calcUpsetIndex(probs.homeProb, probs.awayProb);
      if (upset < 40) continue; // 只显示有爆冷可能的比赛

      results.push({
        id: m.id,
        home: m.home.abbr,
        away: m.away.abbr,
        homeName: m.home.name,
        awayName: m.away.name,
        homeProb: probs.homeProb,
        awayProb: probs.awayProb,
        upsetIndex: upset,
        date: m.date,
        group: m.group,
        level: upset >= 70 ? 'high' : upset >= 55 ? 'medium' : 'low',
      });
    }

    return results.sort((a, b) => b.upsetIndex - a.upsetIndex).slice(0, 8);
  }, []);

  const levelColors = {
    high: { bg: 'bg-red/10', text: 'text-red', border: 'border-red/20', label: '高危' },
    medium: { bg: 'bg-gold/10', text: 'text-gold', border: 'border-gold/20', label: '中等' },
    low: { bg: 'bg-green/10', text: 'text-green', border: 'border-green/20', label: '低' },
  };

  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return `${d.getMonth() + 1}/${d.getDate()}`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 mb-3"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-red/10 flex items-center justify-center">
          <AlertTriangle className="w-4 h-4 text-red" />
        </div>
        <div>
          <h3 className="text-sm font-bold">爆冷指数排行</h3>
          <p className="text-[10px] text-gray-500">赔率接近 = 爆冷可能高</p>
        </div>
      </div>

      <div className="space-y-2">
        {upsetMatches.map((m, i) => {
          const lc = levelColors[m.level];
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-3 p-2.5 rounded-xl border ${lc.border} ${lc.bg} hover:scale-[1.01] transition-transform cursor-pointer`}
            >
              {/* 排名 */}
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-extrabold ${i < 3 ? 'bg-red/20 text-red' : 'bg-white/5 text-gray-500'}`}>
                {i + 1}
              </div>

              {/* 主队 */}
              <div className="flex items-center gap-1.5 flex-1 justify-end">
                <span className="text-xs font-semibold">{m.homeName}</span>
                <Flag code={m.home} size="sm" />
              </div>

              {/* 中间信息 */}
              <div className="flex flex-col items-center min-w-[56px]">
                <div className="flex items-center gap-1">
                  <Flame className={`w-3 h-3 ${lc.text}`} />
                  <span className={`text-sm font-extrabold ${lc.text}`}>
                    {m.upsetIndex}
                  </span>
                </div>
                <span className="text-[9px] text-gray-500">{m.group}组 · {formatDate(m.date)}</span>
              </div>

              {/* 客队 */}
              <div className="flex items-center gap-1.5 flex-1">
                <Flag code={m.away} size="sm" />
                <span className="text-xs font-semibold">{m.awayName}</span>
              </div>

              {/* 箭头 */}
              <ChevronRight className="w-4 h-4 text-gray-600 flex-shrink-0" />
            </motion.div>
          );
        })}
      </div>

      {upsetMatches.length === 0 && (
        <div className="text-center py-6 text-gray-500 text-xs">
          暂无高爆冷风险比赛
        </div>
      )}
    </motion.div>
  );
}
