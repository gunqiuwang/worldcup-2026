import { motion, AnimatePresence } from 'framer-motion';
import { Zap, BarChart3 } from 'lucide-react';
import { SCHEDULE } from '../data/schedule';
import { getPrediction } from '../data/predictions';
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

/* 全场赔率一览 — 按分组折叠 */
function OddsOverview() {
  const [openGroup, setOpenGroup] = useState<string | null>('A');

  const groupedMatches = useMemo(() => {
    const groups: Record<string, { id: string; home: string; away: string; homeName: string; awayName: string; group: string; homeProb: number; drawProb: number; awayProb: number }[]> = {};

    SCHEDULE.forEach((m) => {
      const pred = getPrediction(m.id);
      if (!pred) return;
      if (!groups[m.group]) groups[m.group] = [];
      groups[m.group].push({
        id: m.id, home: m.home.abbr, away: m.away.abbr,
        homeName: m.home.name, awayName: m.away.name, group: m.group,
        homeProb: pred.home_win, drawProb: pred.draw, awayProb: pred.away_win,
      });
    });

    // 每组内部按赔率差距排序
    Object.values(groups).forEach(arr =>
      arr.sort((a, b) => Math.abs(a.homeProb - a.awayProb) - Math.abs(b.homeProb - b.awayProb))
    );

    return groups;
  }, []);

  const sortedGroups = useMemo(() => Object.keys(groupedMatches).sort(), [groupedMatches]);

  return (
    <div className="glass-card p-4 mb-3">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center">
          <BarChart3 className="w-3.5 h-3.5 text-gold" />
        </div>
        <div>
          <span className="text-sm font-bold">全场赔率一览</span>
          <span className="text-[10px] text-gray-500 block">{SCHEDULE.length} 场 · 按分组查看</span>
        </div>
      </div>

      {/* 分组 Tab */}
      <div className="flex gap-1 mb-3 overflow-x-auto scrollbar-hide pb-1">
        {sortedGroups.map((g) => (
          <button
            key={g}
            onClick={() => setOpenGroup(openGroup === g ? null : g)}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold whitespace-nowrap transition-all ${
              openGroup === g
                ? 'bg-gold/20 text-gold border border-gold/30'
                : 'bg-white/[0.03] text-gray-500 border border-white/[0.06] hover:text-gray-300'
            }`}
          >
            {g}组
            <span className="ml-1 opacity-60">{groupedMatches[g]?.length || 0}</span>
          </button>
        ))}
      </div>

      {/* 展开的分组内容 */}
      <AnimatePresence mode="wait">
        {openGroup && groupedMatches[openGroup] && (
          <motion.div
            key={openGroup}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-2"
          >
            {groupedMatches[openGroup].map((m, i) => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-gold/20 transition">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Flag code={m.home} size="sm" />
                    <span className="text-xs font-semibold">{m.homeName}</span>
                  </div>
                  <span className="text-[10px] text-gray-600">vs</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold">{m.awayName}</span>
                    <Flag code={m.away} size="sm" />
                  </div>
                </div>
                <div className="flex h-2 rounded-full overflow-hidden bg-white/5 mb-1.5">
                  <div className="bg-gradient-to-r from-green to-green-dark transition-all" style={{ width: `${m.homeProb}%` }} />
                  <div className="bg-gradient-to-r from-gold to-gold-dark transition-all" style={{ width: `${m.drawProb}%` }} />
                  <div className="bg-gradient-to-r from-red to-red-dark transition-all" style={{ width: `${m.awayProb}%` }} />
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-green font-semibold">{m.homeProb}%</span>
                  <span className="text-gray-500">平 {m.drawProb}%</span>
                  <span className="text-red font-semibold">{m.awayProb}%</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
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

      {/* 🥇 核心: 全场赔率一览 — 最上面 */}
      <ErrorBoundary><OddsOverview /></ErrorBoundary>

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
