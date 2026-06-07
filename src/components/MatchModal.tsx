import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MapPin, TrendingUp, Shield, Target, Swords, BarChart3, History } from 'lucide-react';
import type { MatchData } from '../data/schedule';
import { TEAMS } from '../data/teams';
import { calcMatchProbs } from '../utils/odds';
import Flag from './Flag';
import RadarChart from './RadarChart';
import { useMemo } from 'react';

interface Props {
  match: MatchData | null;
  onClose: () => void;
}

// 模拟历史交锋数据
function getH2H(home: string, away: string) {
  const seed = (home + away).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const results: Array<{ home: number; away: number; date: string }> = [];
  for (let i = 0; i < 5; i++) {
    const r = ((seed * (i + 1) * 9301 + 49297) % 233280) / 233280;
    results.push({
      home: Math.floor(r * 4),
      away: Math.floor((1 - r) * 4),
      date: `${2024 - i}-${String(Math.floor(r * 12) + 1).padStart(2, '0')}`,
    });
  }
  return results;
}

// 模拟近期战绩
function getRecentForm(abbr: string) {
  const seed = abbr.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return Array.from({ length: 5 }, (_, i) => {
    const r = ((seed * (i + 1) * 9301 + 49297) % 233280) / 233280;
    if (r < 0.45) return 'W' as const;
    if (r < 0.75) return 'D' as const;
    return 'L' as const;
  });
}

// 模拟球队数据对比
function getTeamStats(abbr: string) {
  const t = TEAMS[abbr];
  const rank = t?.fifa_rank || 50;
  const seed = abbr.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const r = ((seed * 9301 + 49297) % 233280) / 233280;
  return {
    rank,
    goals: Math.round((50 - rank) * 0.08 + r * 2 + 1),
    possession: Math.round(45 + (50 - rank) * 0.3 + r * 10),
    shots: Math.round(10 + (50 - rank) * 0.15 + r * 5),
    passAcc: Math.round(75 + (50 - rank) * 0.3 + r * 8),
  };
}

function FormBadge({ result }: { result: 'W' | 'D' | 'L' }) {
  const colors = { W: 'bg-green/20 text-green', D: 'bg-gold/20 text-gold', L: 'bg-red/20 text-red' };
  const labels = { W: '胜', D: '平', L: '负' };
  return (
    <span className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold ${colors[result]}`}>
      {labels[result]}
    </span>
  );
}

function CompareBar({ label, left, right, leftLabel, rightLabel }: {
  label: string; left: number; right: number; leftLabel: string; rightLabel: string;
}) {
  const total = left + right;
  const leftPct = total > 0 ? (left / total) * 100 : 50;
  return (
    <div className="mb-2.5">
      <div className="flex justify-between text-[10px] text-gray-500 mb-1">
        <span>{leftLabel}</span>
        <span className="text-gray-400">{label}</span>
        <span>{rightLabel}</span>
      </div>
      <div className="flex h-1.5 rounded-full overflow-hidden gap-0.5">
        <div className="bg-green rounded-full transition-all" style={{ width: `${leftPct}%` }} />
        <div className="bg-red rounded-full transition-all" style={{ width: `${100 - leftPct}%` }} />
      </div>
    </div>
  );
}

export default function MatchModal({ match, onClose }: Props) {
  if (!match) return null;

  const probs = match.odds?.details
    ? calcMatchProbs(match.odds.details, match.home.abbr, match.away.abbr)
    : null;

  const h2h = useMemo(() => getH2H(match.home.abbr, match.away.abbr), [match]);
  const homeForm = useMemo(() => getRecentForm(match.home.abbr), [match]);
  const awayForm = useMemo(() => getRecentForm(match.away.abbr), [match]);
  const homeStats = useMemo(() => getTeamStats(match.home.abbr), [match]);
  const awayStats = useMemo(() => getTeamStats(match.away.abbr), [match]);

  const radarData = probs ? [
    { label: '主胜', value: probs.homeProb },
    { label: '平局', value: probs.drawProb },
    { label: '客胜', value: probs.awayProb },
  ] : [];

  const homeWins = h2h.filter((h) => h.home > h.away).length;
  const awayWins = h2h.filter((h) => h.away > h.home).length;
  const draws = h2h.filter((h) => h.home === h.away).length;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-bg-2 rounded-t-3xl sm:rounded-3xl border border-glass-border p-6 max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* close */}
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition">
            <X className="w-4 h-4 text-gray-400" />
          </button>

          {/* header */}
          <div className="text-center mb-5">
            {match.group && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gold/10 text-gold mb-2">
                {match.group} 组
              </span>
            )}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              {new Date(match.date).toLocaleString('zh-CN', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Shanghai' })}
              <span className="mx-1">·</span>
              <MapPin className="w-3 h-3" />
              {match.venue}
            </div>
          </div>

          {/* teams */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex-1 text-center">
              <Flag code={match.home.abbr} size="xl" className="mx-auto mb-2" />
              <div className="text-base font-bold">{match.home.name}</div>
              <div className="text-[10px] text-gray-500">FIFA #{homeStats.rank}</div>
            </div>
            <div className="text-center px-4">
              {(match.status === 'live' || match.status === 'finished') ? (
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-extrabold text-gold">{match.home.score}</span>
                  <span className="text-xl text-gray-500">:</span>
                  <span className="text-4xl font-extrabold text-gold">{match.away.score}</span>
                </div>
              ) : (
                <div className="text-2xl font-light text-gray-500">VS</div>
              )}
            </div>
            <div className="flex-1 text-center">
              <Flag code={match.away.abbr} size="xl" className="mx-auto mb-2" />
              <div className="text-base font-bold">{match.away.name}</div>
              <div className="text-[10px] text-gray-500">FIFA #{awayStats.rank}</div>
            </div>
          </div>

          {/* 1. 赔率分析 */}
          {probs && (
            <div className="glass-card p-4 mb-3">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-gold" />
                <span className="text-sm font-semibold">赔率分析</span>
              </div>
              <div className="flex justify-center mb-3">
                <RadarChart data={radarData} size={120} />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="glass-card p-2">
                  <div className="text-[10px] text-gray-500 mb-0.5">{match.home.name} 胜</div>
                  <div className="text-lg font-bold text-green">{probs.homeProb}%</div>
                </div>
                <div className="glass-card p-2">
                  <div className="text-[10px] text-gray-500 mb-0.5">平局</div>
                  <div className="text-lg font-bold text-gold">{probs.drawProb}%</div>
                </div>
                <div className="glass-card p-2">
                  <div className="text-[10px] text-gray-500 mb-0.5">{match.away.name} 胜</div>
                  <div className="text-lg font-bold text-red">{probs.awayProb}%</div>
                </div>
              </div>
            </div>
          )}

          {/* 2. 历史交锋 */}
          <div className="glass-card p-4 mb-3">
            <div className="flex items-center gap-2 mb-3">
              <Swords className="w-4 h-4 text-gold" />
              <span className="text-sm font-semibold">历史交锋</span>
              <span className="text-[10px] text-gray-500 ml-auto">{homeWins}胜 {draws}平 {awayWins}负</span>
            </div>
            <div className="space-y-1.5">
              {h2h.map((h, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-white/[0.02]">
                  <span className="text-[10px] text-gray-500 w-16">{h.date}</span>
                  <span className="text-xs font-semibold">{match.home.name}</span>
                  <span className="text-sm font-bold text-gold px-2">{h.home} - {h.away}</span>
                  <span className="text-xs font-semibold">{match.away.name}</span>
                  <span className={`text-[10px] font-bold w-6 text-center ${
                    h.home > h.away ? 'text-green' : h.home < h.away ? 'text-red' : 'text-gray-500'
                  }`}>
                    {h.home > h.away ? 'W' : h.home < h.away ? 'L' : 'D'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. 数据对比 */}
          <div className="glass-card p-4 mb-3">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-gold" />
              <span className="text-sm font-semibold">数据对比</span>
            </div>
            <CompareBar label="FIFA排名" left={60 - homeStats.rank} right={60 - awayStats.rank} leftLabel={`#${homeStats.rank}`} rightLabel={`#${awayStats.rank}`} />
            <CompareBar label="场均进球" left={homeStats.goals} right={awayStats.goals} leftLabel={`${homeStats.goals}`} rightLabel={`${awayStats.goals}`} />
            <CompareBar label="控球率" left={homeStats.possession} right={awayStats.possession} leftLabel={`${homeStats.possession}%`} rightLabel={`${awayStats.possession}%`} />
            <CompareBar label="射门" left={homeStats.shots} right={awayStats.shots} leftLabel={`${homeStats.shots}`} rightLabel={`${awayStats.shots}`} />
            <CompareBar label="传球成功率" left={homeStats.passAcc} right={awayStats.passAcc} leftLabel={`${homeStats.passAcc}%`} rightLabel={`${awayStats.passAcc}%`} />
          </div>

          {/* 4. 近期战绩 */}
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <History className="w-4 h-4 text-gold" />
              <span className="text-sm font-semibold">近期战绩</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center gap-1.5">
                <Flag code={match.home.abbr} size="sm" />
                <span className="text-[10px] font-medium">{match.home.name}</span>
                <div className="flex gap-1">
                  {homeForm.map((r, i) => <FormBadge key={i} result={r} />)}
                </div>
              </div>
              <div className="text-[10px] text-gray-500">最近5场</div>
              <div className="flex flex-col items-center gap-1.5">
                <Flag code={match.away.abbr} size="sm" />
                <span className="text-[10px] font-medium">{match.away.name}</span>
                <div className="flex gap-1">
                  {awayForm.map((r, i) => <FormBadge key={i} result={r} />)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
