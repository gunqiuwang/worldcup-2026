import { motion } from 'framer-motion';
import { Zap, ChevronRight, BarChart3, Shield, Target, Eye } from 'lucide-react';
import { SCHEDULE } from '../data/schedule';
import { TEAMS, GROUPS } from '../data/teams';
import { calcMatchProbs, calcUpsetIndex } from '../utils/odds';
import Flag from './Flag';
import UpsetRanking from './UpsetRanking';
import OddsMovement from './OddsMovement';
import KnockoutPredict from './KnockoutPredict';
import HotTeams from './HotTeams';
import ErrorBoundary from './ErrorBoundary';
import { useMemo, useRef, useState, useEffect, type ReactNode } from 'react';

// IntersectionObserver 懒加载包装器
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
      {visible ? children : fallback || (
        <div className="h-32 rounded-xl bg-white/[0.02] animate-pulse mb-3" />
      )}
    </div>
  );
}

// 今日重点比赛（赔率最接近的前3场）
function TodayHighlight() {
  const highlights = useMemo(() => {
    const results: Array<{
      id: string;
      home: string;
      away: string;
      homeName: string;
      awayName: string;
      homeProb: number;
      awayProb: number;
      date: string;
      group: string;
      venue: string;
      city: string;
    }> = [];

    for (const m of SCHEDULE) {
      if (!m.odds?.details) continue;
      const probs = calcMatchProbs(m.odds.details, m.home.abbr, m.away.abbr);
      if (!probs) continue;

      const upset = calcUpsetIndex(probs.homeProb, probs.awayProb);
      if (upset < 30) continue;

      results.push({
        id: m.id,
        home: m.home.abbr,
        away: m.away.abbr,
        homeName: m.home.name,
        awayName: m.away.name,
        homeProb: probs.homeProb,
        awayProb: probs.awayProb,
        date: m.date,
        group: m.group,
        venue: m.venue,
        city: m.city,
      });
    }

    return results.sort((a, b) => {
      const aDiff = Math.abs(a.homeProb - a.awayProb);
      const bDiff = Math.abs(b.homeProb - b.awayProb);
      return aDiff - bDiff;
    }).slice(0, 3);
  }, []);

  function formatDate(dateStr: string) {
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
        <span className="text-[10px] text-gray-500 ml-auto">赔率最接近的对决</span>
      </div>

      <div className="space-y-2">
        {highlights.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-3 rounded-xl bg-gradient-to-r from-white/[0.02] to-transparent border border-white/[0.05] hover:border-gold/20 transition cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-gray-500">{m.group}组 · {formatDate(m.date)}</span>
              <span className="text-[10px] text-gray-600">{m.venue}</span>
            </div>

            <div className="flex items-center justify-between">
              {/* 主队 */}
              <div className="flex flex-col items-center flex-1">
                <Flag code={m.home} size="lg" className="mb-1" />
                <span className="text-xs font-semibold">{m.homeName}</span>
                <span className="text-[10px] text-green font-bold">{m.homeProb}%</span>
              </div>

              {/* 中间 */}
              <div className="flex flex-col items-center gap-0.5 px-3">
                <span className="text-[10px] text-gray-500">vs</span>
                <div className="w-12 h-1 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green to-gold rounded-full"
                    style={{ width: `${Math.min(m.homeProb, 100)}%` }}
                  />
                </div>
              </div>

              {/* 客队 */}
              <div className="flex flex-col items-center flex-1">
                <Flag code={m.away} size="lg" className="mb-1" />
                <span className="text-xs font-semibold">{m.awayName}</span>
                <span className="text-[10px] text-gold font-bold">{m.awayProb}%</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 数据维度概览
function DataDimensions() {
  const dims = [
    { icon: BarChart3, label: '赔率变化', desc: '实时盘口异动', color: 'text-gold' },
    { icon: Shield, label: '球队状态', desc: '近期表现评估', color: 'text-green' },
    { icon: Target, label: '历史交锋', desc: '过往战绩分析', color: 'text-red' },
    { icon: Eye, label: '赛程强度', desc: '体能消耗预估', color: 'text-blue-400' },
  ];

  return (
    <div className="glass-card p-4 mb-3">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-bold">分析维度</span>
        <span className="text-[10px] text-gray-500 ml-auto">4大核心指标</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {dims.map((d, i) => {
          const Icon = d.icon;
          return (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-gold/20 transition"
            >
              <Icon className={`w-4 h-4 ${d.color} mb-1`} />
              <div className="text-xs font-semibold">{d.label}</div>
              <div className="text-[10px] text-gray-500">{d.desc}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// 模型战绩统计
function ModelStats() {
  return (
    <div className="glass-card p-4 mb-3">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-bold">模型战绩</span>
        <span className="text-[10px] text-gray-500 ml-auto">近30天</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { value: '328', label: '预测次数', color: 'text-gold' },
          { value: '198', label: '命中次数', color: 'text-green' },
          { value: '60.4%', label: '准确率', color: 'text-green' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="text-center p-2 rounded-xl bg-white/[0.02]"
          >
            <div className={`text-lg font-extrabold ${stat.color}`}>{stat.value}</div>
            <div className="text-[10px] text-gray-500">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function Dashboard({ onTeamClick }: { onTeamClick?: (abbr: string) => void }) {
  return (
    <div className="px-4">
      <ErrorBoundary>
        <TodayHighlight />
      </ErrorBoundary>
      <DataDimensions />
      <ModelStats />
      <LazySection>
        <ErrorBoundary>
          <UpsetRanking />
        </ErrorBoundary>
      </LazySection>
      <LazySection>
        <ErrorBoundary>
          <HotTeams onTeamClick={onTeamClick} />
        </ErrorBoundary>
      </LazySection>
      <LazySection>
        <ErrorBoundary>
          <OddsMovement />
        </ErrorBoundary>
      </LazySection>
      <LazySection>
        <ErrorBoundary>
          <KnockoutPredict />
        </ErrorBoundary>
      </LazySection>
    </div>
  );
}
