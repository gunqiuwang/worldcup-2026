import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Clock, MapPin, BarChart3, Target, TrendingUp } from 'lucide-react';
import type { MatchData } from '../data/schedule';
import { TEAMS } from '../data/teams';
import { getPrediction } from '../data/predictions';
import { getMatchPreview, type MatchPreview } from '../data/matchPreview';
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
  const homeTeam = TEAMS[match.home.abbr];
  const awayTeam = TEAMS[match.away.abbr];
  const homeRank = homeTeam?.fifa_rank || 50;
  const awayRank = awayTeam?.fifa_rank || 50;

  const [preview, setPreview] = useState<MatchPreview | null>(null);
  useEffect(() => {
    if (match) {
      getMatchPreview(match.home.abbr, match.away.abbr).then(setPreview);
    }
  }, [match]);

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

          {/* 雷达图对比 — 双色叠加 */}
          {homeTeam && awayTeam && (() => {
            const tierScore = (t: string) => ({ S: 100, A: 75, B: 50, C: 25 }[t] || 25);
            const trendScore = (t: string) => t === '↑' ? 80 : t === '→' ? 50 : 20;
            const rankScore = (r: number) => Math.max(5, 100 - r * 1.5);
            const makeData = (rank: number, team: typeof homeTeam) => [
              { label: 'FIFA', value: rankScore(rank) },
              { label: '实力', value: tierScore(team.tier) },
              { label: '状态', value: trendScore(team.trend) },
            ];
            return (
              <div className="glass-card p-4 mb-3">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-4 h-4 text-gold" />
                  <span className="text-sm font-semibold">实力雷达</span>
                </div>
                <div className="flex justify-center">
                  <RadarChart
                    datasets={[
                      { data: makeData(homeRank, homeTeam), color: '#FFD54F', label: match.home.name },
                      { data: makeData(awayRank, awayTeam), color: '#6A9AB8', label: match.away.name },
                    ]}
                    size={180}
                  />
                </div>
              </div>
            );
          })()}

          {/* Poisson 预测 */}
          {preview && (
            <div className="glass-card p-4 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-gold" />
                <span className="text-sm font-semibold">AI 赛前预测</span>
                <span className="pill-badge ml-auto">{preview.style}</span>
              </div>
              <div className="text-xs text-gray-400 mb-4">{preview.verdict}</div>

              {/* 第一行：最可能比分 */}
              <div className="text-center mb-4">
                {preview.likely_score.split(' 或 ').map((s, i) => (
                  <div key={i} className={i === 0 ? 'text-3xl font-extrabold text-white tracking-wider' : 'text-base font-semibold text-gray-400 mt-1'}>
                    {s.trim()}
                  </div>
                ))}
                <div className="text-[11px] text-gray-500 mt-1">最可能比分</div>
              </div>

              {/* 第二行：xG 左右 + 概率条 */}
              <div className="flex items-center justify-between mb-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-gold">{preview.home_xg}</div>
                  <div className="text-[10px] text-gold/70">{match.home.name} xG</div>
                </div>
                <div className="flex-1 mx-4">
                  <div className="flex h-2 rounded-full overflow-hidden mb-1.5">
                    <div className="bg-green transition-all" style={{ width: `${preview.probabilities.home_win}%` }} />
                    <div className="bg-gray-600 transition-all" style={{ width: `${preview.probabilities.draw}%` }} />
                    <div className="bg-blue transition-all" style={{ width: `${preview.probabilities.away_win}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-green">主胜 {preview.probabilities.home_win}%</span>
                    <span className="text-gray-500">平 {preview.probabilities.draw}%</span>
                    <span className="text-blue">客胜 {preview.probabilities.away_win}%</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-blue">{preview.away_xg}</div>
                  <div className="text-[10px] text-blue/70">{match.away.name} xG</div>
                </div>
              </div>

              <div className="text-[10px] text-gray-400 text-center">{preview.goals_note}</div>
            </div>
          )}

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
