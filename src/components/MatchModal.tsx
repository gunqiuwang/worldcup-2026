import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MapPin, TrendingUp, Shield, Target } from 'lucide-react';
import type { MatchData } from '../data/schedule';
import Flag from './Flag';
import RadarChart from './RadarChart';

interface Props {
  match: MatchData | null;
  onClose: () => void;
}

export default function MatchModal({ match, onClose }: Props) {
  if (!match) return null;

  const odds = match.odds;
  const radarData = odds ? [
    { label: '主胜', value: odds.home_win_prob || 0 },
    { label: '平局', value: odds.draw_prob || 0 },
    { label: '客胜', value: odds.away_win_prob || 0 },
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
        {/* backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* modal */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-bg-2 rounded-t-3xl sm:rounded-3xl border border-glass-border p-6 max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>

          {/* header */}
          <div className="text-center mb-6">
            {match.group && (
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gold/10 text-gold mb-2">
                {match.group} 组
              </span>
            )}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              {new Date(match.date).toLocaleString('zh-CN', {
                month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
                timeZone: 'Asia/Shanghai',
              })}
              <span className="mx-1">·</span>
              <MapPin className="w-3 h-3" />
              {match.venue}
            </div>
          </div>

          {/* teams */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1 text-center">
              <Flag code={match.home.abbr} size="xl" className="mx-auto mb-2" />
              <div className="text-base font-bold">{match.home.name}</div>
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
            </div>
          </div>

          {/* odds section */}
          {odds && (
            <div className="glass-card p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-gold" />
                <span className="text-sm font-semibold">赔率分析</span>
              </div>
              <div className="flex justify-center mb-3">
                <RadarChart data={radarData} size={140} />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="glass-card p-2">
                  <div className="text-[10px] text-gray-500 mb-0.5">{match.home.name} 胜</div>
                  <div className="text-lg font-bold text-green">{(odds.home_win_prob || 0).toFixed(1)}%</div>
                </div>
                <div className="glass-card p-2">
                  <div className="text-[10px] text-gray-500 mb-0.5">平局</div>
                  <div className="text-lg font-bold text-gold">{(odds.draw_prob || 0).toFixed(1)}%</div>
                </div>
                <div className="glass-card p-2">
                  <div className="text-[10px] text-gray-500 mb-0.5">{match.away.name} 胜</div>
                  <div className="text-lg font-bold text-red">{(odds.away_win_prob || 0).toFixed(1)}%</div>
                </div>
              </div>
            </div>
          )}

          {/* match info */}
          <div className="grid grid-cols-2 gap-2">
            <div className="glass-card p-3 text-center">
              <Shield className="w-4 h-4 text-gray-500 mx-auto mb-1" />
              <div className="text-[10px] text-gray-500">比赛状态</div>
              <div className="text-sm font-semibold">
                {match.status === 'live' ? '🔴 进行中' : match.status === 'finished' ? '✅ 已结束' : '⏳ 未开始'}
              </div>
            </div>
            <div className="glass-card p-3 text-center">
              <Target className="w-4 h-4 text-gray-500 mx-auto mb-1" />
              <div className="text-[10px] text-gray-500">比赛场地</div>
              <div className="text-sm font-semibold">{match.city || match.venue}</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
