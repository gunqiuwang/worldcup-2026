import { motion } from 'framer-motion';
import { Clock, MapPin, Zap, CheckCircle2, Calendar } from 'lucide-react';
import type { MatchData } from '../data/schedule';
import { getEnsemblePrediction } from '../data/ensemble_predictions';
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
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red/20 text-red animate-pulse">
        <Zap className="w-3 h-3" /> 进行中
      </span>
    );
  }
  if (status === 'finished') {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-green/15 text-green">
        <CheckCircle2 className="w-3 h-3" /> 已结束
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/5 text-gray-400">
      <Calendar className="w-3 h-3" /> 未开始
    </span>
  );
}

function ProbBar({ home, draw, away }: { home: number; draw: number; away: number }) {
  const total = home + draw + away;
  if (total === 0) return null;
  return (
    <div className="mt-3">
      <div className="flex h-1.5 rounded-full overflow-hidden bg-white/5">
        <div className="bg-gradient-to-r from-green to-green-dark transition-all duration-1000" style={{ width: `${home}%` }} />
        <div className="bg-gradient-to-r from-gold to-gold-dark transition-all duration-1000" style={{ width: `${draw}%` }} />
        <div className="bg-gradient-to-r from-red to-red-dark transition-all duration-1000" style={{ width: `${away}%` }} />
      </div>
      <div className="flex justify-between text-[10px] text-gray-500 mt-1">
        <span>{home.toFixed(1)}%</span>
        <span>平 {draw.toFixed(1)}%</span>
        <span>{away.toFixed(1)}%</span>
      </div>
    </div>
  );
}

interface Props {
  match: MatchData;
  index: number;
  onClick?: () => void;
}

export default function MatchCard({ match, index, onClick }: Props) {
  const showScore = match.status === 'live' || match.status === 'finished';
  
  // 优先使用集成预测
  const pred = getEnsemblePrediction(match.id);
  const homeProb = pred?.home_win || match.odds?.home_win_prob || 0;
  const drawProb = pred?.draw || match.odds?.draw_prob || 0;
  const awayProb = pred?.away_win || match.odds?.away_win_prob || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glass-card p-4 mb-3 relative overflow-hidden group cursor-pointer hover:border-gold/20 transition-colors"
    >
      {/* shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

      {/* meta */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
            <Clock className="w-3 h-3" />
            {showScore ? (match.status === 'live' ? '进行中' : '已结束') : formatTime(match.date)}
          </div>
          <div className="flex items-center gap-1 text-[10px] text-gray-500 mt-0.5">
            <MapPin className="w-3 h-3" />
            {match.venue}{match.city ? ` · ${match.city}` : ''}
          </div>
        </div>
        <div className="flex gap-1.5">
          {match.group && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/5 text-gray-400">
              {match.group}组
            </span>
          )}
          {pred && (
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
              pred.confidence === 'high' ? 'bg-green/20 text-green' :
              pred.confidence === 'medium' ? 'bg-gold/20 text-gold' :
              'bg-gray-500/20 text-gray-400'
            }`}>
              {pred.confidence === 'high' ? '高置信' : pred.confidence === 'medium' ? '中置信' : '低置信'}
            </span>
          )}
          <StatusBadge status={match.status} />
        </div>
      </div>

      {/* teams with real flags */}
      <div className="flex items-center justify-between">
        <div className="flex-1 flex flex-col items-center">
          <Flag code={match.home.abbr} size="lg" className="mb-1.5" />
          <div className="text-sm font-semibold">{match.home.name}</div>
          {homeProb > 0 && (
            <div className={`text-[10px] font-bold ${
              homeProb > awayProb ? 'text-green' : homeProb < awayProb ? 'text-gold' : 'text-gray-400'
            }`}>
              {homeProb.toFixed(1)}%
            </div>
          )}
        </div>

        <div className="w-20 text-center flex-shrink-0">
          {showScore ? (
            <div className="flex items-center justify-center gap-2">
              <motion.span
                key={match.home.score}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                className="text-2xl font-extrabold text-gold"
              >
                {match.home.score}
              </motion.span>
              <span className="text-gray-500 text-sm">:</span>
              <motion.span
                key={match.away.score}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                className="text-2xl font-extrabold text-gold"
              >
                {match.away.score}
              </motion.span>
            </div>
          ) : (
            <div className="text-xs text-gray-400 font-medium">{formatTime(match.date)}</div>
          )}
        </div>

        <div className="flex-1 flex flex-col items-center">
          <Flag code={match.away.abbr} size="lg" className="mb-1.5" />
          <div className="text-sm font-semibold">{match.away.name}</div>
          {awayProb > 0 && (
            <div className={`text-[10px] font-bold ${
              awayProb > homeProb ? 'text-green' : awayProb < homeProb ? 'text-gold' : 'text-gray-400'
            }`}>
              {awayProb.toFixed(1)}%
            </div>
          )}
        </div>
      </div>

      {/* prob bar */}
      {homeProb > 0 && (
        <ProbBar home={homeProb} draw={drawProb} away={awayProb} />
      )}

      {/* 爆冷预警 */}
      {pred && pred.upset_index > 60 && (
        <div className="mt-2 flex items-center gap-1">
          <span className="text-[10px] text-red">🔥 爆冷指数 {pred.upset_index}</span>
          <div className="flex-1 h-0.5 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-red rounded-full" style={{ width: `${pred.upset_index}%` }} />
          </div>
        </div>
      )}
    </motion.div>
  );
}
