import { motion } from 'framer-motion';
import { AlertTriangle, Flame, ChevronRight } from 'lucide-react';
import { TEAMS } from '../data/teams';
import { ENSEMBLE_PREDICTIONS } from '../data/ensemble_predictions';
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
  level: 'high' | 'medium' | 'low';
}

export default function UpsetRanking() {
  const upsetMatches = useMemo(() => {
    const results: UpsetMatch[] = [];

    for (const pred of ENSEMBLE_PREDICTIONS) {
      if (pred.upset_index < 40) continue;

      const homeTeam = TEAMS[pred.home];
      const awayTeam = TEAMS[pred.away];

      results.push({
        id: pred.match_id,
        home: pred.home,
        away: pred.away,
        homeName: homeTeam?.cn || pred.home,
        awayName: awayTeam?.cn || pred.away,
        homeProb: pred.home_win,
        awayProb: pred.away_win,
        upsetIndex: pred.upset_index,
        date: '',
        level: pred.upset_index >= 70 ? 'high' : pred.upset_index >= 55 ? 'medium' : 'low',
      });
    }

    return results.sort((a, b) => b.upsetIndex - a.upsetIndex).slice(0, 8);
  }, []);

  const levelColors = {
    high: { bg: 'bg-red/10', text: 'text-red', border: 'border-red/20', label: '高危' },
    medium: { bg: 'bg-gold/10', text: 'text-gold', border: 'border-gold/20', label: '中等' },
    low: { bg: 'bg-green/10', text: 'text-green', border: 'border-green/20', label: '低' },
  };

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
          <h3 className="text-sm font-bold">爆冷预警</h3>
          <p className="text-[10px] text-gray-500">集成模型识别的潜在冷门</p>
        </div>
        <Flame className="w-4 h-4 text-red ml-auto" />
      </div>

      <div className="space-y-2">
        {upsetMatches.map((m, i) => {
          const colors = levelColors[m.level];
          return (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`flex items-center gap-3 p-2.5 rounded-xl ${colors.bg} border ${colors.border} transition`}
            >
              <div className="w-6 text-center text-[10px] font-bold text-gray-500">{i + 1}</div>
              <Flag code={m.home} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold">
                  {m.homeName} <span className="text-gray-500">vs</span> {m.awayName}
                </div>
                <div className="text-[10px] text-gray-500">
                  {m.homeProb}% - {m.awayProb}%
                </div>
              </div>
              <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                <div className={`text-xs font-bold ${colors.text}`}>{m.upsetIndex}</div>
                <div className="text-[10px] text-gray-500">{colors.label}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 flex-shrink-0" />
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
