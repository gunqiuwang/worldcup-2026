import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Target, Calendar, MapPin, TrendingUp } from 'lucide-react';
import { TEAMS } from '../data/teams';
import { SCHEDULE } from '../data/schedule';
import { calcMatchProbs, calcUpsetIndex } from '../utils/odds';
import Flag from './Flag';

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

  // 晋级概率（基于FIFA排名）
  const advanceProb = Math.min(95, Math.max(5, Math.round((100 - team.fifa_rank) * 1.1)));

  // 该队所有比赛的平均爆冷指数
  const avgUpset = (() => {
    const upsets = teamMatches
      .filter((m) => m.odds?.details)
      .map((m) => {
        const probs = calcMatchProbs(m.odds!.details!, m.home.abbr, m.away.abbr);
        if (!probs) return 0;
        return calcUpsetIndex(probs.homeProb, probs.awayProb);
      });
    return upsets.length > 0 ? Math.round(upsets.reduce((a, b) => a + b, 0) / upsets.length) : 0;
  })();

  // 历史最佳（模拟）
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
      transition={{ duration: 0.25 }}
      className="px-4"
    >
      {/* 返回按钮 */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gold transition mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        返回
      </button>

      {/* 球队头像 */}
      <div className="text-center mb-6">
        <Flag code={teamAbbr} size="xl" className="mx-auto mb-3" />
        <h2 className="text-xl font-extrabold">{team.cn}</h2>
        <div className="text-xs text-gray-500 mt-1">FIFA 排名 #{team.fifa_rank}</div>
      </div>

      {/* 数据卡片 */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-3 text-center"
        >
          <Trophy className="w-5 h-5 text-gold mx-auto mb-1" />
          <div className="text-lg font-extrabold text-green">{advanceProb}%</div>
          <div className="text-[10px] text-gray-500">晋级概率</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card p-3 text-center"
        >
          <Target className="w-5 h-5 text-red mx-auto mb-1" />
          <div className="text-lg font-extrabold text-gold">{avgUpset}</div>
          <div className="text-[10px] text-gray-500">平均爆冷指数</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-3 text-center"
        >
          <TrendingUp className="w-5 h-5 text-green mx-auto mb-1" />
          <div className="text-sm font-bold">{bestResult}</div>
          <div className="text-[10px] text-gray-500">历史最佳</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="glass-card p-3 text-center"
        >
          <Calendar className="w-5 h-5 text-blue-400 mx-auto mb-1" />
          <div className="text-lg font-extrabold text-gold">{teamMatches.length}</div>
          <div className="text-[10px] text-gray-500">小组赛场次</div>
        </motion.div>
      </div>

      {/* 赛程列表 */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-gold" />
          <span className="text-sm font-bold">小组赛程</span>
        </div>
        <div className="space-y-2">
          {teamMatches.map((m, i) => {
            const isHome = m.home.abbr === teamAbbr;
            const opponent = isHome ? m.away : m.home;
            const probs = m.odds?.details
              ? calcMatchProbs(m.odds.details, m.home.abbr, m.away.abbr)
              : null;

            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-gold/20 transition cursor-pointer"
                onClick={() => onMatchClick?.(m.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-gray-500">{m.group}组 · 第{i + 1}轮</span>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500">
                    <MapPin className="w-3 h-3" />
                    {m.venue}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flag code={m.home.abbr} size="sm" />
                    <span className={`text-xs font-semibold ${isHome ? 'text-gold' : ''}`}>{m.home.name}</span>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">{formatDate(m.date)}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold ${!isHome ? 'text-gold' : ''}`}>{m.away.name}</span>
                    <Flag code={m.away.abbr} size="sm" />
                  </div>
                </div>
                {probs && (
                  <div className="mt-2">
                    <div className="flex h-1 rounded-full overflow-hidden bg-white/5">
                      <div className="bg-green transition-all" style={{ width: `${probs.homeProb}%` }} />
                      <div className="bg-gold transition-all" style={{ width: `${probs.drawProb}%` }} />
                      <div className="bg-red transition-all" style={{ width: `${probs.awayProb}%` }} />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
