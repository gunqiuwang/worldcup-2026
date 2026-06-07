import { motion } from 'framer-motion';
import { Zap, BarChart3, TrendingUp } from 'lucide-react';
import { SCHEDULE } from '../data/schedule';
import { TEAMS } from '../data/teams';
import { PREDICTIONS, getPrediction } from '../data/predictions';
import Flag from './Flag';
import UpsetRanking from './UpsetRanking';
import OddsMovement from './OddsMovement';
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

/* 今日焦点 — 赔率最接近的 3 场 */
function TodayHighlight() {
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
      .slice(0, 3);
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
        <span className="text-sm font-bold">今日焦点</span>
        <span className="text-[10px] text-gray-500 ml-auto">赔率最接近的 3 场</span>
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

/* 预测统计 */
function PredictionStats() {
  const stats = useMemo(() => {
    const close = PREDICTIONS.filter(p => Math.abs(p.home_win - p.away_win) < 10).length;
    const upset = PREDICTIONS.filter(p => {
      const diff = Math.abs(p.home_win - p.away_win);
      return diff < 15 && diff > 5;
    }).length;
    const blowout = PREDICTIONS.filter(p => Math.abs(p.home_win - p.away_win) > 30).length;
    return { total: PREDICTIONS.length, close, upset, blowout };
  }, []);

  return (
    <div className="glass-card p-4 mb-3">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-bold">预测总览</span>
        <span className="text-[10px] text-gray-500 ml-auto">{stats.total} 场比赛</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { value: stats.close, label: '势均力敌', color: 'text-red', bg: 'bg-red/10' },
          { value: stats.upset, label: '小有悬念', color: 'text-gold', bg: 'bg-gold/10' },
          { value: stats.blowout, label: '碾压局', color: 'text-green', bg: 'bg-green/10' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className={`text-center p-2 rounded-xl ${s.bg}`}>
            <div className={`text-lg font-extrabold ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-gray-500">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* 全场赔率一览 */
function OddsOverview() {
  const matches = useMemo(() => {
    return SCHEDULE
      .map((m) => {
        const pred = getPrediction(m.id);
        if (!pred) return null;
        return {
          id: m.id, home: m.home.abbr, away: m.away.abbr,
          homeName: m.home.name, awayName: m.away.name, group: m.group,
          homeProb: pred.home_win, drawProb: pred.draw, awayProb: pred.away_win,
        };
      })
      .filter(Boolean)
      .sort((a, b) => Math.abs(a!.homeProb - a!.awayProb) - Math.abs(b!.homeProb - b!.awayProb));
  }, []);

  return (
    <div className="glass-card p-4 mb-3">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center">
          <BarChart3 className="w-3.5 h-3.5 text-gold" />
        </div>
        <span className="text-sm font-bold">全场赔率一览</span>
        <span className="text-[10px] text-gray-500 ml-auto">{matches.length} 场</span>
      </div>
      <div className="space-y-2">
        {matches.map((m, i) => (
          <motion.div key={m!.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
            className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-gold/20 transition">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Flag code={m!.home} size="sm" />
                <span className="text-xs font-semibold">{m!.homeName}</span>
              </div>
              <span className="text-[10px] text-gray-600">{m!.group}组</span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold">{m!.awayName}</span>
                <Flag code={m!.away} size="sm" />
              </div>
            </div>
            <div className="flex h-2 rounded-full overflow-hidden bg-white/5 mb-1.5">
              <div className="bg-gradient-to-r from-green to-green-dark transition-all" style={{ width: `${m!.homeProb}%` }} />
              <div className="bg-gradient-to-r from-gold to-gold-dark transition-all" style={{ width: `${m!.drawProb}%` }} />
              <div className="bg-gradient-to-r from-red to-red-dark transition-all" style={{ width: `${m!.awayProb}%` }} />
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-green font-semibold">{m!.homeProb}%</span>
              <span className="text-gray-500">平 {m!.drawProb}%</span>
              <span className="text-red font-semibold">{m!.awayProb}%</span>
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

      <ErrorBoundary><TodayHighlight /></ErrorBoundary>
      <PredictionStats />

      <LazySection>
        <ErrorBoundary><UpsetRanking /></ErrorBoundary>
      </LazySection>
      <LazySection>
        <ErrorBoundary><HotTeams onTeamClick={onTeamClick} /></ErrorBoundary>
      </LazySection>
      <LazySection>
        <ErrorBoundary><OddsOverview /></ErrorBoundary>
      </LazySection>
      <LazySection>
        <ErrorBoundary><OddsMovement /></ErrorBoundary>
      </LazySection>
    </div>
  );
}
