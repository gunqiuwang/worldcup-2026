import { motion } from 'framer-motion';
import { Clock, MapPin, Zap, CheckCircle2, Calendar } from 'lucide-react';
import type { MatchData } from '../data/schedule';
import { getPrediction } from '../data/predictions';
import { TEAMS } from '../data/teams';
import Flag from './Flag';

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Shanghai',
  });
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'live') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red/20 text-red animate-pulse">
        <Zap className="w-3 h-3" /> LIVE
      </span>
    );
  }
  if (status === 'finished') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green/15 text-green">
        <CheckCircle2 className="w-3 h-3" /> FT
      </span>
    );
  }
  return null;
}

/* ── FotMob 风格对战概率条 ── */
function BattleBar({ home, draw, away, homeAbbr, awayAbbr }: { home: number; draw: number; away: number; homeAbbr: string; awayAbbr: string }) {
  const total = home + draw + away;
  if (total === 0) return null;

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <span className="text-[9px] font-bold text-green tabular-nums w-8 text-right">{home.toFixed(0)}%</span>
        <div className="flex-1 flex h-2 rounded-full overflow-hidden bg-white/[0.04]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${home}%` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-gradient-to-r from-green/80 to-green rounded-l-full"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${draw}%` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="bg-white/10"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${away}%` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="bg-gradient-to-r from-red to-red/80 rounded-r-full"
          />
        </div>
        <span className="text-[9px] font-bold text-red tabular-nums w-8">{away.toFixed(0)}%</span>
      </div>
      <div className="flex justify-center mt-1">
        <span className="text-[9px] text-gray-600">平 {draw.toFixed(0)}%</span>
      </div>
    </div>
  );
}

/* ── Tier badge ── */
function TierBadge({ tier }: { tier: string }) {
  const colors: Record<string, string> = {
    S: 'bg-red/15 text-red border-red/20',
    A: 'bg-gold/15 text-gold border-gold/20',
    B: 'bg-blue/15 text-blue border-blue/20',
    C: 'bg-gray-500/10 text-gray-500 border-gray-500/15',
  };
  return (
    <span className={`inline-block px-1 py-0 rounded text-[8px] font-bold border leading-tight ${colors[tier] || colors.C}`}>
      {tier}
    </span>
  );
}

interface Props {
  match: MatchData;
  index: number;
  onClick?: () => void;
}

export default function MatchCard({ match, index, onClick }: Props) {
  const showScore = match.status === 'live' || match.status === 'finished';

  const pred = getPrediction(match.id);
  const homeProb = pred?.home_win || match.odds?.home_win_prob || 0;
  const drawProb = pred?.draw || match.odds?.draw_prob || 0;
  const awayProb = pred?.away_win || match.odds?.away_win_prob || 0;

  const homeTeam = TEAMS[match.home.abbr];
  const awayTeam = TEAMS[match.away.abbr];

  // 爆冷指数
  const upsetIndex = pred ? Math.round(100 - Math.abs(pred.home_win - pred.away_win) * 2) : 0;
  const isUpset = upsetIndex > 60;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.985 }}
      onClick={onClick}
      className="glass-card p-4 mb-3 relative overflow-hidden group cursor-pointer hover:border-white/[0.1] transition-all duration-200"
    >
      {/* Shimmer on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.015] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

      {/* Top bar: time + meta */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {!showScore ? (
            <span className="flex items-center gap-1 text-xs text-gray-400 font-medium tabular-nums">
              <Clock className="w-3 h-3" />
              {formatTime(match.date)}
            </span>
          ) : (
            <StatusBadge status={match.status} />
          )}
          {match.group && (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-white/[0.04] text-gray-500 border border-white/[0.04]">
              {match.group}组
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {pred && (
            <span className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${
              Math.abs(pred.home_win - pred.away_win) > 20 ? 'bg-green/10 text-green' :
              Math.abs(pred.home_win - pred.away_win) > 10 ? 'bg-gold/10 text-gold' :
              'bg-white/[0.04] text-gray-500'
            }`}>
              {Math.abs(pred.home_win - pred.away_win) > 20 ? '强弱分明' :
               Math.abs(pred.home_win - pred.away_win) > 10 ? '略有差距' : '势均力敌'}
            </span>
          )}
          {isUpset && (
            <span className="text-[9px] text-red font-bold">🔥 爆冷</span>
          )}
        </div>
      </div>

      {/* Teams — FotMob 对战布局 */}
      <div className="flex items-center gap-3">
        {/* Home */}
        <div className="flex-1 flex flex-col items-center">
          <div className="relative">
            <Flag code={match.home.abbr} size="lg" />
            {homeTeam && (
              <div className="absolute -top-1 -right-2">
                <TierBadge tier={homeTeam.tier} />
              </div>
            )}
          </div>
          <div className="text-[13px] font-semibold mt-1.5 text-center leading-tight">{match.home.name}</div>
          {homeTeam && (
            <div className="text-[9px] text-gray-600 mt-0.5">
              #{homeTeam.fifa_rank} <span>{homeTeam.trend}</span>
            </div>
          )}
        </div>

        {/* Center: score or time */}
        <div className="w-20 flex-shrink-0 text-center">
          {showScore ? (
            <div className="flex items-center justify-center gap-1.5">
              <motion.span
                key={match.home.score}
                initial={{ scale: 1.3, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="text-2xl font-extrabold tabular-nums text-white"
              >
                {match.home.score}
              </motion.span>
              <span className="text-gray-600 text-sm mx-0.5">:</span>
              <motion.span
                key={match.away.score}
                initial={{ scale: 1.3, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="text-2xl font-extrabold tabular-nums text-white"
              >
                {match.away.score}
              </motion.span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">vs</span>
              {pred && (
                <span className="text-[9px] text-gray-600 mt-0.5 tabular-nums">
                  {pred.details}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Away */}
        <div className="flex-1 flex flex-col items-center">
          <div className="relative">
            <Flag code={match.away.abbr} size="lg" />
            {awayTeam && (
              <div className="absolute -top-1 -right-2">
                <TierBadge tier={awayTeam.tier} />
              </div>
            )}
          </div>
          <div className="text-[13px] font-semibold mt-1.5 text-center leading-tight">{match.away.name}</div>
          {awayTeam && (
            <div className="text-[9px] text-gray-600 mt-0.5">
              #{awayTeam.fifa_rank} <span>{awayTeam.trend}</span>
            </div>
          )}
        </div>
      </div>

      {/* Battle probability bar */}
      {homeProb > 0 && (
        <BattleBar home={homeProb} draw={drawProb} away={awayProb} homeAbbr={match.home.abbr} awayAbbr={match.away.abbr} />
      )}

      {/* Venue */}
      <div className="flex items-center gap-1 text-[9px] text-gray-600 mt-2.5">
        <MapPin className="w-2.5 h-2.5" />
        <span className="truncate">{match.venue}</span>
      </div>
    </motion.div>
  );
}
