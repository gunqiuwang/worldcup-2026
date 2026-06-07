import { motion } from 'framer-motion';
import { Zap, BarChart3, Brain, TrendingUp, AlertTriangle, ArrowRightLeft } from 'lucide-react';
import { SCHEDULE } from '../data/schedule';
import { TEAMS } from '../data/teams';
import { ENSEMBLE_PREDICTIONS, getEnsemblePrediction } from '../data/ensemble_predictions';
import { calcMatchProbs, calcUpsetIndex, parseOddsDetail } from '../utils/odds';
import Flag from './Flag';
import UpsetRanking from './UpsetRanking';
import OddsMovement from './OddsMovement';
import HotTeams from './HotTeams';
import ErrorBoundary from './ErrorBoundary';
import { useMemo, useRef, useState, useEffect, type ReactNode } from 'react';

// IntersectionObserver 懒加载
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

/* ── 今日焦点 ── */
function TodayHighlight() {
  const highlights = useMemo(() => {
    const results: Array<{
      id: string; home: string; away: string;
      homeName: string; awayName: string;
      homeProb: number; awayProb: number; drawProb: number;
      confidence: string; upsetIndex: number;
      date: string; group: string; venue: string;
    }> = [];

    for (const m of SCHEDULE) {
      const pred = getEnsemblePrediction(m.id);
      let homeProb: number, awayProb: number, drawProb: number, confidence: string, upsetIndex: number;

      if (pred) {
        homeProb = pred.home_win; awayProb = pred.away_win; drawProb = pred.draw;
        confidence = pred.confidence; upsetIndex = pred.upset_index;
      } else if (m.odds?.details) {
        const probs = calcMatchProbs(m.odds.details, m.home.abbr, m.away.abbr);
        if (!probs) continue;
        homeProb = probs.homeProb; awayProb = probs.awayProb; drawProb = probs.drawProb;
        confidence = 'medium'; upsetIndex = calcUpsetIndex(probs.homeProb, probs.awayProb);
      } else continue;

      results.push({
        id: m.id, home: m.home.abbr, away: m.away.abbr,
        homeName: m.home.name, awayName: m.away.name,
        homeProb, awayProb, drawProb, confidence, upsetIndex,
        date: m.date, group: m.group, venue: m.venue,
      });
    }

    return results.sort((a, b) => {
      return Math.abs(a.homeProb - a.awayProb) - Math.abs(b.homeProb - b.awayProb);
    }).slice(0, 3);
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
        <span className="text-[10px] text-gray-500 ml-auto">集成模型 · 赔率最接近的 3 场</span>
      </div>
      <div className="space-y-2">
        {highlights.map((m, i) => (
          <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="p-3 rounded-xl bg-gradient-to-r from-white/[0.02] to-transparent border border-white/[0.05] hover:border-gold/20 transition cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-gray-500">{m.group}组 · {fmt(m.date)}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                m.confidence === 'high' ? 'bg-green/20 text-green' :
                m.confidence === 'medium' ? 'bg-gold/20 text-gold' : 'bg-gray-500/20 text-gray-400'
              }`}>
                {m.confidence === 'high' ? '高置信' : m.confidence === 'medium' ? '中置信' : '低置信'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center flex-1">
                <Flag code={m.home} size="lg" className="mb-1" />
                <span className="text-xs font-semibold">{m.homeName}</span>
                <span className="text-[10px] text-green font-bold">{m.homeProb}%</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 px-3">
                <span className="text-[10px] text-gray-500">vs</span>
                <span className="text-[10px] text-gold">{m.drawProb}% 平</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <Flag code={m.away} size="lg" className="mb-1" />
                <span className="text-xs font-semibold">{m.awayName}</span>
                <span className="text-[10px] text-red font-bold">{m.awayProb}%</span>
              </div>
            </div>
            {m.upsetIndex > 50 && (
              <div className="mt-2 flex items-center gap-1">
                <span className="text-[10px] text-red">🔥 爆冷</span>
                <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-red to-gold rounded-full" style={{ width: `${m.upsetIndex}%` }} />
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

/* ── 集成模型说明 ── */
function ModelInfo() {
  return (
    <div className="glass-card p-4 mb-3">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-blue-400/10 flex items-center justify-center">
          <Brain className="w-3.5 h-3.5 text-blue-400" />
        </div>
        <span className="text-sm font-bold">模型说明</span>
        <span className="text-[10px] text-gray-500 ml-auto">三路数据融合</span>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[
          { label: '赔率共识', weight: '40%', desc: '博彩公司隐含概率', color: 'text-gold' },
          { label: 'Elo 评分', weight: '35%', desc: '国际象棋等级分', color: 'text-green' },
          { label: '近期状态', weight: '25%', desc: '最近5场表现', color: 'text-blue-400' },
        ].map((m) => (
          <div key={m.label} className="text-center p-2 rounded-xl bg-white/[0.02]">
            <div className={`text-lg font-extrabold ${m.color}`}>{m.weight}</div>
            <div className="text-[10px] text-gray-400 font-medium">{m.label}</div>
            <div className="text-[9px] text-gray-600 mt-0.5">{m.desc}</div>
          </div>
        ))}
      </div>
      <div className="text-[10px] text-gray-600 leading-relaxed">
        集成模型融合三路独立数据源：美式赔率隐含概率（市场共识）、Elo 国际等级分（历史实力）、近期5场战绩（当前状态）。
        三路加权输出胜/平/负概率、置信度和爆冷指数。
      </div>
    </div>
  );
}

/* ── 预测统计 ── */
function PredictionStats() {
  const stats = useMemo(() => ({
    total: ENSEMBLE_PREDICTIONS.length,
    high: ENSEMBLE_PREDICTIONS.filter(p => p.confidence === 'high').length,
    med: ENSEMBLE_PREDICTIONS.filter(p => p.confidence === 'medium').length,
    low: ENSEMBLE_PREDICTIONS.filter(p => p.confidence === 'low').length,
    upset: ENSEMBLE_PREDICTIONS.filter(p => p.upset_index > 50).length,
  }), []);

  return (
    <div className="glass-card p-4 mb-3">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-bold">预测总览</span>
        <span className="text-[10px] text-gray-500 ml-auto">{stats.total} 场比赛</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { value: stats.high, label: '高置信', color: 'text-green', bg: 'bg-green/10' },
          { value: stats.med, label: '中置信', color: 'text-gold', bg: 'bg-gold/10' },
          { value: stats.low, label: '低置信', color: 'text-gray-400', bg: 'bg-gray-500/10' },
          { value: stats.upset, label: '爆冷预警', color: 'text-red', bg: 'bg-red/10' },
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

/* ── 赔率总览 ── */
function OddsOverview() {
  const matches = useMemo(() => {
    return SCHEDULE
      .map((m) => {
        const pred = getEnsemblePrediction(m.id);
        if (pred) return { id: m.id, home: m.home.abbr, away: m.away.abbr, homeName: m.home.name, awayName: m.away.name, group: m.group, homeProb: pred.home_win, drawProb: pred.draw, awayProb: pred.away_win, confidence: pred.confidence, upsetIndex: pred.upset_index };
        if (m.odds?.details) {
          const probs = calcMatchProbs(m.odds.details, m.home.abbr, m.away.abbr);
          if (probs) return { id: m.id, home: m.home.abbr, away: m.away.abbr, homeName: m.home.name, awayName: m.away.name, group: m.group, homeProb: probs.homeProb, drawProb: probs.drawProb, awayProb: probs.awayProb, confidence: 'low', upsetIndex: calcUpsetIndex(probs.homeProb, probs.awayProb) };
        }
        return null;
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
            {m!.upsetIndex > 50 && (
              <div className="mt-1 text-center">
                <span className="text-[9px] text-red bg-red/10 px-2 py-0.5 rounded-full">🔥 爆冷指数 {m!.upsetIndex}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── 主组件 ── */
export default function Dashboard({ onTeamClick }: { onTeamClick?: (abbr: string) => void }) {
  return (
    <div className="px-4">
      {/* 标题 */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg font-bold">分析</span>
        <span className="text-xs text-gray-500">AI 模型 · 数据融合</span>
      </div>

      <ErrorBoundary><TodayHighlight /></ErrorBoundary>
      <PredictionStats />
      <ModelInfo />

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
