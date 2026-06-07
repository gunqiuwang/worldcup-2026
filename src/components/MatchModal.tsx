import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MapPin, TrendingUp, Shield, BarChart3, History } from 'lucide-react';
import type { MatchData } from '../data/schedule';
import { TEAMS } from '../data/teams';
import { calcMatchProbs } from '../utils/odds';
import { getTeamForm } from '../data/team_form';
import { getEloRating, getEloTier, getEloTierColor } from '../data/elo_ratings';
import { getEnsemblePrediction } from '../data/ensemble_predictions';
import Flag from './Flag';
import RadarChart from './RadarChart';
import { useMemo } from 'react';

interface Props {
  match: MatchData | null;
  onClose: () => void;
}

function FormBadge({ result }: { result: string }) {
  const colors: Record<string, string> = { W: 'bg-green/20 text-green', D: 'bg-gold/20 text-gold', L: 'bg-red/20 text-red' };
  const labels: Record<string, string> = { W: '胜', D: '平', L: '负' };
  return (
    <span className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold ${colors[result] || 'bg-white/5 text-gray-500'}`}>
      {labels[result] || '?'}
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

  // 优先使用集成预测，fallback 到赔率计算
  const pred = getEnsemblePrediction(match.id);
  const probs = pred
    ? { homeProb: Math.round(pred.home_win), drawProb: Math.round(pred.draw), awayProb: Math.round(pred.away_win) }
    : match.odds?.details
      ? calcMatchProbs(match.odds.details, match.home.abbr, match.away.abbr)
      : null;

  // 真实数据
  const homeForm = useMemo(() => getTeamForm(match.home.abbr), [match]);
  const awayForm = useMemo(() => getTeamForm(match.away.abbr), [match]);
  const homeElo = useMemo(() => getEloRating(match.home.abbr), [match]);
  const awayElo = useMemo(() => getEloRating(match.away.abbr), [match]);
  const homeRank = TEAMS[match.home.abbr]?.fifa_rank || 50;
  const awayRank = TEAMS[match.away.abbr]?.fifa_rank || 50;
  const homeTier = homeElo ? getEloTier(homeElo.elo) : '-';
  const awayTier = awayElo ? getEloTier(awayElo.elo) : '-';

  const radarData = probs ? [
    { label: '主胜', value: probs.homeProb },
    { label: '平局', value: probs.drawProb },
    { label: '客胜', value: probs.awayProb },
  ] : [];

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
              <div className="text-[10px] text-gray-500">FIFA #{homeRank}</div>
              {homeElo && (
                <span className={`text-[10px] font-bold ${getEloTierColor(homeTier)}`}>
                  Elo {homeElo.elo} ({homeTier})
                </span>
              )}
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
              <div className="text-[10px] text-gray-500">FIFA #{awayRank}</div>
              {awayElo && (
                <span className={`text-[10px] font-bold ${getEloTierColor(awayTier)}`}>
                  Elo {awayElo.elo} ({awayTier})
                </span>
              )}
            </div>
          </div>

          {/* 1. 集成预测 */}
          {probs && (
            <div className="glass-card p-4 mb-3">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-gold" />
                <span className="text-sm font-semibold">集成预测</span>
                {pred && (
                  <span className={`text-[10px] font-bold ml-auto ${
                    pred.confidence === 'high' ? 'text-green' :
                    pred.confidence === 'medium' ? 'text-gold' : 'text-gray-500'
                  }`}>
                    {pred.confidence === 'high' ? '高置信' :
                     pred.confidence === 'medium' ? '中置信' : '低置信'}
                  </span>
                )}
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
              {/* 爆冷指数 */}
              {pred && (
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="text-gray-500">爆冷指数</span>
                    <span className="font-bold text-gold">{pred.upset_index}/100</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-green via-gold to-red transition-all"
                      style={{ width: `${pred.upset_index}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. 数据对比 (真实数据) */}
          <div className="glass-card p-4 mb-3">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-gold" />
              <span className="text-sm font-semibold">数据对比</span>
            </div>
            <CompareBar label="FIFA排名" left={60 - homeRank} right={60 - awayRank} leftLabel={`#${homeRank}`} rightLabel={`#${awayRank}`} />
            {homeElo && awayElo && (
              <CompareBar label="Elo评分" left={homeElo.elo - 1500} right={awayElo.elo - 1500} leftLabel={`${homeElo.elo}`} rightLabel={`${awayElo.elo}`} />
            )}
            {homeForm && awayForm && (
              <>
                <CompareBar label="状态分数" left={homeForm.form_score} right={awayForm.form_score} leftLabel={`${homeForm.form_score}`} rightLabel={`${awayForm.form_score}`} />
                <CompareBar label="近5场进球" left={homeForm.goals_scored} right={awayForm.goals_scored} leftLabel={`${homeForm.goals_scored}`} rightLabel={`${awayForm.goals_scored}`} />
                <CompareBar label="零封场次" left={homeForm.clean_sheets} right={awayForm.clean_sheets} leftLabel={`${homeForm.clean_sheets}`} rightLabel={`${awayForm.clean_sheets}`} />
              </>
            )}
          </div>

          {/* 3. 近期战绩 (真实数据) */}
          <div className="glass-card p-4 mb-3">
            <div className="flex items-center gap-2 mb-3">
              <History className="w-4 h-4 text-gold" />
              <span className="text-sm font-semibold">近期战绩</span>
              {homeForm && awayForm && (
                <span className="text-[10px] text-gray-500 ml-auto">
                  {homeForm.wins}胜{homeForm.draws}平{homeForm.losses}负 vs {awayForm.wins}胜{awayForm.draws}平{awayForm.losses}负
                </span>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center gap-1.5">
                <Flag code={match.home.abbr} size="sm" />
                <span className="text-[10px] font-medium">{match.home.name}</span>
                <div className="flex gap-1">
                  {homeForm ? homeForm.last5.map((r, i) => <FormBadge key={i} result={r} />) : <span className="text-[10px] text-gray-600">无数据</span>}
                </div>
              </div>
              <div className="text-[10px] text-gray-500">最近5场</div>
              <div className="flex flex-col items-center gap-1.5">
                <Flag code={match.away.abbr} size="sm" />
                <span className="text-[10px] font-medium">{match.away.name}</span>
                <div className="flex gap-1">
                  {awayForm ? awayForm.last5.map((r, i) => <FormBadge key={i} result={r} />) : <span className="text-[10px] text-gray-600">无数据</span>}
                </div>
              </div>
            </div>
          </div>

          {/* 4. Elo 等级 */}
          {(homeElo || awayElo) && (
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-gold" />
                <span className="text-sm font-semibold">实力评级</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="text-[10px] text-gray-500 mb-1">{match.home.name}</div>
                  {homeElo && (
                    <>
                      <div className={`text-lg font-bold ${getEloTierColor(homeTier)}`}>{homeTier}</div>
                      <div className="text-[10px] text-gray-500">Elo {homeElo.elo}</div>
                    </>
                  )}
                </div>
                <div className="text-gray-600 text-xs">vs</div>
                <div className="text-center">
                  <div className="text-[10px] text-gray-500 mb-1">{match.away.name}</div>
                  {awayElo && (
                    <>
                      <div className={`text-lg font-bold ${getEloTierColor(awayTier)}`}>{awayTier}</div>
                      <div className="text-[10px] text-gray-500">Elo {awayElo.elo}</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
