import { motion } from 'framer-motion';
import { Zap, ChevronRight, BarChart3, Shield, Target, Eye } from 'lucide-react';
import { SCHEDULE } from '../data/schedule';
import { TEAMS, GROUPS } from '../data/teams';
import { PREDICTIONS, GROUP_PREDICTIONS, getPrediction } from '../data/predictions';
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
      drawProb: number;
      confidence: string;
      upsetIndex: number;
      date: string;
      group: string;
      venue: string;
      city: string;
    }> = [];

    for (const m of SCHEDULE) {
      // 优先使用 predictions 数据
      const pred = getPrediction(m.id);
      let homeProb: number;
      let awayProb: number;
      let drawProb: number;
      let confidence: string;
      let upsetIndex: number;

      if (pred) {
        homeProb = pred.home_win;
        awayProb = pred.away_win;
        drawProb = pred.draw;
        confidence = pred.confidence;
        upsetIndex = pred.upset_index;
      } else if (m.odds?.details) {
        const probs = calcMatchProbs(m.odds.details, m.home.abbr, m.away.abbr);
        if (!probs) continue;
        homeProb = probs.homeProb;
        awayProb = probs.awayProb;
        drawProb = probs.drawProb;
        confidence = 'medium';
        upsetIndex = calcUpsetIndex(probs.homeProb, probs.awayProb);
      } else {
        continue;
      }

      results.push({
        id: m.id,
        home: m.home.abbr,
        away: m.away.abbr,
        homeName: m.home.name,
        awayName: m.away.name,
        homeProb,
        awayProb,
        drawProb,
        confidence,
        upsetIndex,
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
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  m.confidence === 'high' ? 'bg-green/20 text-green' :
                  m.confidence === 'medium' ? 'bg-gold/20 text-gold' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {m.confidence === 'high' ? '高置信' : m.confidence === 'medium' ? '中置信' : '低置信'}
                </span>
                <span className="text-[10px] text-gray-600">{m.venue}</span>
              </div>
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
                <div className="flex items-center gap-1">
                  <div className="w-8 h-1 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green to-gold rounded-full"
                      style={{ width: `${Math.min(m.homeProb, 100)}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-500">{m.drawProb}%</span>
                  <div className="w-8 h-1 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold to-red rounded-full"
                      style={{ width: `${Math.min(m.awayProb, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* 客队 */}
              <div className="flex flex-col items-center flex-1">
                <Flag code={m.away} size="lg" className="mb-1" />
                <span className="text-xs font-semibold">{m.awayName}</span>
                <span className="text-[10px] text-gold font-bold">{m.awayProb}%</span>
              </div>
            </div>

            {/* 爆冷指数 */}
            {m.upsetIndex > 50 && (
              <div className="mt-2 flex items-center gap-1">
                <span className="text-[10px] text-red">🔥 爆冷指数</span>
                <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red to-gold rounded-full"
                    style={{ width: `${m.upsetIndex}%` }}
                  />
                </div>
                <span className="text-[10px] text-red font-bold">{m.upsetIndex}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// 小组出线概率
function GroupAdvancement() {
  return (
    <div className="glass-card p-4 mb-3">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-gold/10 flex items-center justify-center">
          <BarChart3 className="w-3.5 h-3.5 text-gold" />
        </div>
        <span className="text-sm font-bold">小组出线概率</span>
        <span className="text-[10px] text-gray-500 ml-auto">蒙特卡洛模拟</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {Object.entries(GROUP_PREDICTIONS).slice(0, 6).map(([group, pred]) => (
          <div key={group} className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <div className="text-[10px] text-gray-500 mb-1">{group}组</div>
            {pred.teams.slice(0, 2).map((t) => (
              <div key={t.team} className="flex items-center gap-1 mb-0.5">
                <Flag code={t.team} size="sm" />
                <span className="text-[10px] font-semibold flex-1">{TEAMS[t.team]?.cn || t.team}</span>
                <span className={`text-[10px] font-bold ${
                  t.advancement_pct >= 70 ? 'text-green' : 'text-gold'
                }`}>
                  {t.advancement_pct}%
                </span>
              </div>
            ))}
          </div>
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
  const stats = useMemo(() => {
    const total = PREDICTIONS.length;
    const highConf = PREDICTIONS.filter(p => p.confidence === 'high').length;
    const medConf = PREDICTIONS.filter(p => p.confidence === 'medium').length;
    const lowConf = PREDICTIONS.filter(p => p.confidence === 'low').length;
    const upsetCount = PREDICTIONS.filter(p => p.upset_index > 50).length;
    
    return { total, highConf, medConf, lowConf, upsetCount };
  }, []);

  return (
    <div className="glass-card p-4 mb-3">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-bold">预测统计</span>
        <span className="text-[10px] text-gray-500 ml-auto">{stats.total} 场比赛</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { value: stats.highConf, label: '高置信', color: 'text-green' },
          { value: stats.medConf, label: '中置信', color: 'text-gold' },
          { value: stats.lowConf, label: '低置信', color: 'text-gray-400' },
          { value: stats.upsetCount, label: '爆冷预警', color: 'text-red' },
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
      <GroupAdvancement />
      <ModelStats />
      <DataDimensions />
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
