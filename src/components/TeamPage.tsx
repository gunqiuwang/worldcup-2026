import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Calendar, TrendingUp } from 'lucide-react';
import { TEAMS } from '../data/teams';
import { SCHEDULE } from '../data/schedule';
import { getPrediction, getGroupPrediction } from '../data/predictions';
import Flag from './Flag';

const TIER_COLORS: Record<string, string> = {
  S: 'text-red-400', A: 'text-gold', B: 'text-blue-400', C: 'text-gray-500',
};

interface Props {
  teamAbbr: string;
  onBack: () => void;
  onMatchClick?: (matchId: string) => void;
}

export default function TeamPage({ teamAbbr, onBack, onMatchClick }: Props) {
  const team = TEAMS[teamAbbr];
  if (!team) return null;

  const teamMatches = SCHEDULE.filter(
    (m) => m.home.abbr === teamAbbr || m.away.abbr === teamAbbr
  );

  const groupPred = getGroupPrediction(teamAbbr);
  const advanceProb = groupPred ? groupPred.team.advancement_pct : 0;

  const bestResult = team.fifa_rank <= 5 ? '🏆 冠军'
    : team.fifa_rank <= 15 ? '🥈 亚军/四强'
    : team.fifa_rank <= 30 ? '⚽ 16强'
    : '🎯 小组赛';

  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.2 }}
      className="px-4"
    >
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-4">
        <ArrowLeft className="w-4 h-4" /> 返回
      </button>

      {/* 球队头部 */}
      <div className="glass-card p-4 mb-3">
        <div className="flex items-center gap-4 mb-4">
          <Flag code={teamAbbr} size="xl" />
          <div>
            <h2 className="text-xl font-bold">{team.cn}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-400">FIFA #{team.fifa_rank}</span>
              <span className={`text-xs font-bold ${TIER_COLORS[team.tier]}`}>{team.tier} 级</span>
              <span className={`text-xs ${team.trend === '↑' ? 'text-green' : team.trend === '↓' ? 'text-red-400' : 'text-gray-500'}`}>
                {team.trend === '↑' ? '状态上升' : team.trend === '↓' ? '状态下滑' : '状态平稳'}
              </span>
            </div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-2xl font-extrabold text-gold">{advanceProb}%</div>
            <div className="text-[10px] text-gray-500">出线概率</div>
          </div>
        </div>

        {/* 数据卡片 */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Trophy, label: '历史最佳', value: bestResult, color: 'text-gold' },
            { icon: TrendingUp, label: '实力等级', value: `${team.tier} 级`, color: TIER_COLORS[team.tier] },
            { icon: Calendar, label: '小组赛', value: `${teamMatches.length} 场`, color: 'text-blue-400' },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.05] text-center">
                <Icon className={`w-4 h-4 ${card.color} mx-auto mb-1`} />
                <div className="text-xs font-bold">{card.value}</div>
                <div className="text-[10px] text-gray-500">{card.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 赛程 */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-gold" />
          <span className="text-sm font-bold">赛程</span>
          <span className="text-[10px] text-gray-500 ml-auto">{teamMatches.length} 场</span>
        </div>

        <div className="space-y-2">
          {teamMatches.map((m) => {
            const isHome = m.home.abbr === teamAbbr;
            const pred = getPrediction(m.id);
            const winProb = pred ? (isHome ? pred.home_win : pred.away_win) : 0;

            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-gold/20 transition cursor-pointer"
                onClick={() => onMatchClick?.(m.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-gray-500">{m.group}组 · {formatDate(m.date)}</span>
                  <span className="text-[10px] text-gray-600">{m.venue}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flag code={m.home.abbr} size="sm" />
                    <span className="text-xs font-semibold">{m.home.name}</span>
                  </div>
                  <span className={`text-sm font-bold ${winProb > 50 ? 'text-green' : winProb > 40 ? 'text-gold' : 'text-red'}`}>
                    {winProb}%
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold">{m.away.name}</span>
                    <Flag code={m.away.abbr} size="sm" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
