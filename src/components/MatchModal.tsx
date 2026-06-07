import { motion } from 'framer-motion';
import { X, Clock, MapPin, TrendingUp, BarChart3 } from 'lucide-react';
import type { MatchData } from '../data/schedule';
import { TEAMS } from '../data/teams';
import { getPrediction } from '../data/predictions';
import Flag from './Flag';
import RadarChart from './RadarChart';

interface Props {
  match: MatchData | null;
  onClose: () => void;
}

const TIER_COLORS: Record<string, string> = {
  S: 'text-red', A: 'text-gold', B: 'text-blue', C: 'text-gray-500',
};

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

  const pred = getPrediction(match.id);
  const probs = pred
    ? { homeProb: Math.round(pred.home_win), drawProb: Math.round(pred.draw), awayProb: Math.round(pred.away_win) }
    : null;

  const homeTeam = TEAMS[match.home.abbr];
  const awayTeam = TEAMS[match.away.abbr];
  const homeRank = homeTeam?.fifa_rank || 50;
  const awayRank = awayTeam?.fifa_rank || 50;

  const radarData = probs ? [
    { label: '主胜', value: probs.homeProb },
    { label: '平局', value: probs.drawProb },
    { label: '客胜', value: probs.awayProb },
  ] : [];

  return (
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
              {homeTeam && (
                <div className="flex items-center justify-center gap-1 mt-0.5">
                  <span className={`text-[10px] font-bold ${TIER_COLORS[homeTeam.tier]}`}>{homeTeam.tier}</span>
                  <span className={`text-[10px] ${homeTeam.trend === '↑' ? 'text-green' : homeTeam.trend === '↓' ? 'text-red-400' : 'text-gray-500'}`}>{homeTeam.trend}</span>
                </div>
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
              {awayTeam && (
                <div className="flex items-center justify-center gap-1 mt-0.5">
                  <span className={`text-[10px] font-bold ${TIER_COLORS[awayTeam.tier]}`}>{awayTeam.tier}</span>
                  <span className={`text-[10px] ${awayTeam.trend === '↑' ? 'text-green' : awayTeam.trend === '↓' ? 'text-red-400' : 'text-gray-500'}`}>{awayTeam.trend}</span>
                </div>
              )}
            </div>
          </div>

          {/* 赔率预测 */}
          {probs && (
            <div className="glass-card p-4 mb-3">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-gold" />
                <span className="text-sm font-semibold">赔率预测</span>
                {(() => {
                  const diff = Math.abs(probs.homeProb - probs.awayProb);
                  const label = diff < 10 ? '势均力敌' : diff < 20 ? '小有差距' : '差距明显';
                  const cls = diff < 10 ? 'text-red' : diff < 20 ? 'text-gold' : 'text-green';
                  return <span className={`text-[10px] font-bold ml-auto ${cls}`}>{label}</span>;
                })()}
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

          {/* 数据对比 */}
          <div className="glass-card p-4 mb-3">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-gold" />
              <span className="text-sm font-semibold">数据对比</span>
            </div>
            <CompareBar label="FIFA排名" left={60 - homeRank} right={60 - awayRank} leftLabel={`#${homeRank}`} rightLabel={`#${awayRank}`} />
            {homeTeam && awayTeam && (
              <>
                <CompareBar
                  label="实力等级"
                  left={{ S: 4, A: 3, B: 2, C: 1 }[homeTeam.tier] || 1}
                  right={{ S: 4, A: 3, B: 2, C: 1 }[awayTeam.tier] || 1}
                  leftLabel={homeTeam.tier}
                  rightLabel={awayTeam.tier}
                />
                <div className="flex justify-between items-center mt-2">
                  <div className="text-center">
                    <span className={`text-sm ${homeTeam.trend === '↑' ? 'text-green' : homeTeam.trend === '↓' ? 'text-red-400' : 'text-gray-500'}`}>
                      {homeTeam.trend === '↑' ? '状态上升' : homeTeam.trend === '↓' ? '状态下滑' : '状态平稳'}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-500">近期趋势</span>
                  <div className="text-center">
                    <span className={`text-sm ${awayTeam.trend === '↑' ? 'text-green' : awayTeam.trend === '↓' ? 'text-red-400' : 'text-gray-500'}`}>
                      {awayTeam.trend === '↑' ? '状态上升' : awayTeam.trend === '↓' ? '状态下滑' : '状态平稳'}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 实力评级 */}
          {homeTeam && awayTeam && (
            <div className="glass-card p-4">
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="text-[10px] text-gray-500 mb-1">{match.home.name}</div>
                  <div className={`text-2xl font-bold ${TIER_COLORS[homeTeam.tier]}`}>{homeTeam.tier}</div>
                  <div className="text-[10px] text-gray-500">
                    {homeTeam.tier === 'S' ? '夺冠热门' : homeTeam.tier === 'A' ? '争冠实力' : homeTeam.tier === 'B' ? '中游球队' : '弱旅'}
                  </div>
                </div>
                <div className="text-gray-600 text-xs">vs</div>
                <div className="text-center">
                  <div className="text-[10px] text-gray-500 mb-1">{match.away.name}</div>
                  <div className={`text-2xl font-bold ${TIER_COLORS[awayTeam.tier]}`}>{awayTeam.tier}</div>
                  <div className="text-[10px] text-gray-500">
                    {awayTeam.tier === 'S' ? '夺冠热门' : awayTeam.tier === 'A' ? '争冠实力' : awayTeam.tier === 'B' ? '中游球队' : '弱旅'}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
  );
}
