import { motion, AnimatePresence } from 'framer-motion';
import { Zap, CheckCircle2, XCircle, Target } from 'lucide-react';
import { SCHEDULE } from '../data/schedule';
import { getPrediction } from '../data/predictions';
import { getPredictionResult } from './MatchCard';
import Flag from './Flag';
import UpsetRanking from './UpsetRanking';
import HotTeams from './HotTeams';
import ErrorBoundary from './ErrorBoundary';
import { useMemo, useRef, useState, useEffect, type ReactNode } from 'react';

function LazySection({ children, fallback }: { children: ReactNode; fallback?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { rootMargin: '200px' }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref}>
      {visible ? children : fallback || <div className="h-32 rounded-xl bg-white/[0.02] animate-pulse mb-3" />}
    </div>
  );
}

/* 预测准确率 */
function AccuracyStats() {
  const stats = useMemo(() => {
    const finished = SCHEDULE.filter(m => m.status === 'finished');
    let correct = 0, wrong = 0;
    const details: { id: string; home: string; away: string; hs: number; as: number; result: 'correct' | 'wrong' }[] = [];
    for (const m of finished) {
      const r = getPredictionResult(m);
      if (!r) continue;
      if (r === 'correct') correct++;
      else wrong++;
      details.push({ id: m.id, home: m.home.name, away: m.away.name, hs: m.home.score!, as: m.away.score!, result: r });
    }
    const total = correct + wrong;
    return { correct, wrong, total, pct: total > 0 ? Math.round(correct / total * 100) : 0, details };
  }, []);

  if (stats.total === 0) return null;

  return (
    <div className="glass-card p-4 mb-3">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center">
          <Target className="w-3.5 h-3.5 text-gold" />
        </div>
        <div>
          <span className="text-sm font-bold">预测准确率</span>
          <span className="text-[10px] text-gray-500 block">基于博彩赔率方向预测</span>
        </div>
        <span className="ml-auto text-2xl font-extrabold text-gold">{stats.pct}%</span>
      </div>
      {/* Progress bar */}
      <div className="flex h-2 rounded-full overflow-hidden mb-3 bg-white/[0.04]">
        <div className="bg-green rounded-l-full transition-all" style={{ width: `${stats.pct}%` }} />
        <div className="bg-red rounded-r-full transition-all flex-1" />
      </div>
      <div className="flex items-center justify-between text-[10px] mb-3">
        <span className="text-green flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {stats.correct} 正确</span>
        <span className="text-gray-500">{stats.total} 场已结束</span>
        <span className="text-red flex items-center gap-1"><XCircle className="w-3 h-3" /> {stats.wrong} 失误</span>
      </div>
      {/* Recent results */}
      <div className="space-y-1.5">
        {stats.details.slice(-5).map((d) => (
          <div key={d.id} className="flex items-center justify-between text-[10px] py-1 px-2 rounded-lg bg-white/[0.02]">
            <span className="text-gray-300 w-16 truncate text-right">{d.home}</span>
            <span className="text-white font-bold tabular-nums mx-2">{d.hs}-{d.as}</span>
            <span className="text-gray-300 w-16 truncate">{d.away}</span>
            {d.result === 'correct' ? (
              <CheckCircle2 className="w-3 h-3 text-green ml-2 flex-shrink-0" />
            ) : (
              <XCircle className="w-3 h-3 text-red ml-2 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* 焦点比赛 — 赔率最接近的 5 场 */
function FocusMatches() {
  const highlights = useMemo(() => {
    return SCHEDULE
      .map((m) => {
        const pred = getPrediction(m.id);
        if (!pred) return null;
        return {
          id: m.id, home: m.home.abbr, away: m.away.abbr,
          homeName: m.home.name, awayName: m.away.name,
          homeProb: pred.home_win, drawProb: pred.draw, awayProb: pred.away_win,
          date: m.date, group: m.group,
        };
      })
      .filter(Boolean)
      .sort((a, b) => Math.abs(a!.homeProb - a!.awayProb) - Math.abs(b!.homeProb - b!.awayProb))
      .slice(0, 5);
  }, []);

  function fmt(dateStr: string) {
    const d = new Date(dateStr);
    return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
  }

  return (
    <div className="glass-card p-4 mb-3">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-green/10 flex items-center justify-center">
          <Zap className="w-3.5 h-3.5 text-green" />
        </div>
        <div>
          <span className="text-sm font-bold">焦点比赛</span>
          <span className="text-[10px] text-gray-500 block">赔率最接近 · 结果最难预测</span>
        </div>
      </div>
      <div className="space-y-2">
        {highlights.map((m, i) => (
          <motion.div key={m!.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="p-3 rounded-xl bg-gradient-to-r from-white/[0.02] to-transparent border border-white/[0.05] hover:border-gold/20 transition cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-gray-500">{m!.group}组 · {fmt(m!.date)}</span>
              {(() => {
                const diff = Math.abs(m!.homeProb - m!.awayProb);
                const label = diff < 10 ? '势均力敌' : diff < 20 ? '小有差距' : '差距明显';
                const cls = diff < 10 ? 'bg-red/20 text-red' : diff < 20 ? 'bg-gold/20 text-gold' : 'bg-green/20 text-green';
                return <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${cls}`}>{label}</span>;
              })()}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center flex-1">
                <Flag code={m!.home} size="lg" className="mb-1" />
                <span className="text-xs font-semibold">{m!.homeName}</span>
                <span className="text-[10px] text-green font-bold">{m!.homeProb}%</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 px-3">
                <span className="text-[10px] text-gray-500">vs</span>
                <span className="text-[10px] text-gold">{m!.drawProb}% 平</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <Flag code={m!.away} size="lg" className="mb-1" />
                <span className="text-xs font-semibold">{m!.awayName}</span>
                <span className="text-[10px] text-red font-bold">{m!.awayProb}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* 主组件 */
export default function Dashboard({ onTeamClick }: { onTeamClick?: (abbr: string) => void }) {
  return (
    <div className="px-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg font-bold">分析</span>
        <span className="text-xs text-gray-500">赔率数据 · 博彩公司共识</span>
      </div>

      {/* 🎯 预测准确率 */}
      <LazySection>
        <ErrorBoundary><AccuracyStats /></ErrorBoundary>
      </LazySection>

      {/* 🥈 焦点比赛 */}
      <LazySection>
        <ErrorBoundary><FocusMatches /></ErrorBoundary>
      </LazySection>

      {/* 🥉 爆冷预警 */}
      <LazySection>
        <ErrorBoundary><UpsetRanking /></ErrorBoundary>
      </LazySection>

      {/* 4️⃣ 热门球队 — 静态背景信息放最后 */}
      <LazySection>
        <ErrorBoundary><HotTeams onTeamClick={onTeamClick} /></ErrorBoundary>
      </LazySection>
    </div>
  );
}
