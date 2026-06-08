import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { GROUPS, TEAMS } from '../data/teams';
import { GROUP_PREDICTIONS } from '../data/predictions';
import Flag from './Flag';
import KnockoutPredict from './KnockoutPredict';
import ErrorBoundary from './ErrorBoundary';
import { SoccerBall } from './Icons';

const TIER_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  S: { bg: 'bg-red/10', text: 'text-red', border: 'border-red/20' },
  A: { bg: 'bg-gold/10', text: 'text-gold', border: 'border-gold/20' },
  B: { bg: 'bg-blue/10', text: 'text-blue', border: 'border-blue/20' },
  C: { bg: 'bg-gray-500/10', text: 'text-gray-500', border: 'border-gray-500/15' },
};

function GroupTable({ group, teams }: { group: string; teams: string[] }) {
  const pred = GROUP_PREDICTIONS[group];

  const sortedTeams = pred
    ? [...pred.teams].sort((a, b) => b.advancement_pct - a.advancement_pct)
    : teams.map((t, i) => ({ team: t, advancement_pct: i < 2 ? 70 : 30, winner_pct: i === 0 ? 40 : 10, avg_points: 0, avg_gf: 0, avg_ga: 0 }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card p-4 mb-3"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <SoccerBall className="w-4 h-4 text-gold" />
          <span className="text-sm font-bold text-gold">{group} 组</span>
        </div>
        {pred && (
          <span className="text-[9px] text-gray-600">{pred.simulations?.toLocaleString()} 次模拟</span>
        )}
      </div>

      {/* Column headers */}
      <div className="flex items-center px-2 pb-1.5 mb-1 text-[8px] text-gray-600 border-b border-white/[0.04]">
        <div className="w-4 text-center">#</div>
        <div className="flex-1 ml-2">球队</div>
        <div className="w-12 text-right">出线</div>
        <div className="w-12 text-right">夺冠</div>
      </div>

      {/* Team rows */}
      <div className="space-y-0.5">
        {sortedTeams.map((tp, i) => {
          const abbr = tp.team;
          const t = TEAMS[abbr];
          if (!t) return null;
          const qualify = i < 2;
          const prob = tp.advancement_pct;
          const tc = TIER_COLORS[t.tier] || TIER_COLORS.C;

          return (
            <motion.div
              key={abbr}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`flex items-center gap-2 px-2 py-2 rounded-lg transition-colors ${
                qualify ? 'bg-green/[0.04]' : 'hover:bg-white/[0.02]'
              }`}
            >
              {/* Rank */}
              <div className={`w-4 text-center font-bold text-[11px] flex-shrink-0 ${qualify ? 'text-green' : 'text-gray-600'}`}>
                {i + 1}
              </div>

              {/* Flag */}
              <div className="flex-shrink-0">
                <Flag code={abbr} size="sm" />
              </div>

              {/* Name + meta — single line, truncate name if needed */}
              <div className="flex-1 min-w-0 flex items-center gap-1.5">
                <span className="text-[13px] font-semibold truncate">{t.cn}</span>
                <span className={`px-1 py-0 rounded text-[7px] font-bold border leading-none flex-shrink-0 ${tc.bg} ${tc.text} ${tc.border}`}>
                  {t.tier}
                </span>
                <span className={`text-[10px] flex-shrink-0 ${
                  t.trend === '↑' ? 'text-green' :
                  t.trend === '↓' ? 'text-red' :
                  'text-gray-600'
                }`}>
                  {t.trend}
                </span>
                <span className="text-[9px] text-gray-600 flex-shrink-0 hidden min-[400px]:inline">
                  #{t.fifa_rank}
                </span>
              </div>

              {/* Advancement % */}
              <div className={`w-12 text-right flex-shrink-0`}>
                <span className={`text-[12px] font-bold tabular-nums ${qualify ? 'text-green' : 'text-gray-500'}`}>
                  {prob}%
                </span>
              </div>

              {/* Winner % */}
              <div className="w-12 text-right flex-shrink-0">
                <span className={`text-[11px] font-bold tabular-nums ${tp.winner_pct > 30 ? 'text-gold' : 'text-gray-600'}`}>
                  {tp.winner_pct}%
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-2 pt-2 border-t border-white/[0.03] text-[8px] text-gray-600">
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green" /> 前2出线</span>
        <span>出线% · 夺冠%</span>
      </div>
    </motion.div>
  );
}

export default function GroupStandings() {
  const groups = Object.keys(GROUPS).sort();
  return (
    <div className="px-4">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-gold" />
        <h2 className="text-lg font-bold">排名</h2>
        <span className="text-xs text-gray-500">12 组 48 队</span>
      </div>
      {groups.map((g) => (
        <GroupTable key={g} group={g} teams={GROUPS[g]} />
      ))}
      <ErrorBoundary fallback={<div className="glass-card p-4 text-center text-gray-500 text-sm">淘汰赛预测加载中...</div>}>
        <KnockoutPredict />
      </ErrorBoundary>
    </div>
  );
}
