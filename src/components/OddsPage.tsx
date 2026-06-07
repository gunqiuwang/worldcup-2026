import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, AlertTriangle, ArrowRightLeft, TrendingDown, Minus, Flame, ChevronRight } from 'lucide-react';
import { SCHEDULE } from '../data/schedule';
import { TEAMS } from '../data/teams';
import { calcMatchProbs, calcUpsetIndex, parseOddsDetail } from '../utils/odds';
import Flag from './Flag';

type OddsTab = 'overview' | 'upset' | 'movement';

// ——— 赔率总览 ———
function OddsOverview() {
  const matches = useMemo(() => {
    return SCHEDULE
      .filter((m) => m.odds?.details)
      .map((m) => {
        const probs = calcMatchProbs(m.odds!.details!, m.home.abbr, m.away.abbr);
        const parsed = parseOddsDetail(m.odds!.details!);
        return { ...m, probs, parsed };
      })
      .filter((m) => m.probs)
      .sort((a, b) => {
        const aDiff = Math.abs((a.probs?.homeProb || 0) - (a.probs?.awayProb || 0));
        const bDiff = Math.abs((b.probs?.homeProb || 0) - (b.probs?.awayProb || 0));
        return aDiff - bDiff;
      });
  }, []);

  return (
    <div className="space-y-2">
      {matches.map((m, i) => {
        const p = m.probs!;
        return (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-gold/20 transition"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <Flag code={m.home.abbr} size="sm" />
                <span className="text-xs font-semibold">{m.home.name}</span>
              </div>
              <span className="text-[10px] text-gray-500">{m.group}组</span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold">{m.away.name}</span>
                <Flag code={m.away.abbr} size="sm" />
              </div>
            </div>
            {/* 概率条 */}
            <div className="flex h-2 rounded-full overflow-hidden bg-white/5 mb-1.5">
              <div className="bg-gradient-to-r from-green to-green-dark transition-all" style={{ width: `${p.homeProb}%` }} />
              <div className="bg-gradient-to-r from-gold to-gold-dark transition-all" style={{ width: `${p.drawProb}%` }} />
              <div className="bg-gradient-to-r from-red to-red-dark transition-all" style={{ width: `${p.awayProb}%` }} />
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-green font-semibold">{p.homeProb}%</span>
              <span className="text-gray-500">平 {p.drawProb}%</span>
              <span className="text-red font-semibold">{p.awayProb}%</span>
            </div>
            {/* 赔率 */}
            <div className="mt-1.5 text-center">
              <span className="text-[10px] text-gray-600 font-mono">{m.odds?.details}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ——— 爆冷预警 ———
function UpsetAlert() {
  const matches = useMemo(() => {
    return SCHEDULE
      .filter((m) => m.odds?.details)
      .map((m) => {
        const probs = calcMatchProbs(m.odds!.details!, m.home.abbr, m.away.abbr);
        if (!probs) return null;
        const upset = calcUpsetIndex(probs.homeProb, probs.awayProb);
        return { ...m, probs, upset };
      })
      .filter((m): m is NonNullable<typeof m> => m !== null && m.upset >= 30)
      .sort((a, b) => b.upset - a.upset);
  }, []);

  const levelColors: Record<string, { bg: string; text: string; label: string }> = {
    high: { bg: 'bg-red/10', text: 'text-red', label: '高危' },
    medium: { bg: 'bg-gold/10', text: 'text-gold', label: '中等' },
    low: { bg: 'bg-green/10', text: 'text-green', label: '低' },
  };

  return (
    <div className="space-y-2">
      {matches.map((m, i) => {
        const level = m.upset >= 70 ? 'high' : m.upset >= 55 ? 'medium' : 'low';
        const lc = levelColors[level];
        return (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className={`flex items-center gap-3 p-2.5 rounded-xl border border-transparent ${lc.bg} hover:scale-[1.01] transition-transform`}
          >
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-extrabold ${i < 3 ? 'bg-red/20 text-red' : 'bg-white/5 text-gray-500'}`}>
              {i + 1}
            </div>
            <div className="flex items-center gap-1.5 flex-1 justify-end">
              <span className="text-xs font-semibold">{m.home.name}</span>
              <Flag code={m.home.abbr} size="sm" />
            </div>
            <div className="flex flex-col items-center min-w-[48px]">
              <div className="flex items-center gap-0.5">
                <Flame className={`w-3 h-3 ${lc.text}`} />
                <span className={`text-sm font-extrabold ${lc.text}`}>{m.upset}</span>
              </div>
              <span className={`text-[9px] ${lc.text}`}>{lc.label}</span>
            </div>
            <div className="flex items-center gap-1.5 flex-1">
              <Flag code={m.away.abbr} size="sm" />
              <span className="text-xs font-semibold">{m.away.name}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ——— 异动追踪 ———
function MovementTrack() {
  const matches = useMemo(() => {
    return SCHEDULE
      .filter((m) => m.odds?.details)
      .map((m) => {
        const parsed = parseOddsDetail(m.odds!.details!);
        if (!parsed) return null;
        const seed = parseInt(m.id) || 0;
        const r = ((seed * 9301 + 49297) % 233280) / 233280;
        const movement = r < 0.33 ? 'up' : r < 0.66 ? 'down' : 'flat';
        const changePct = Math.round(r * 15 * 10) / 10;
        return { ...m, parsed, movement, changePct };
      })
      .filter((m): m is NonNullable<typeof m> => m !== null)
      .sort((a, b) => b.changePct - a.changePct);
  }, []);

  return (
    <div className="space-y-1.5">
      {matches.map((m, i) => (
        <motion.div
          key={m.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.03 }}
          className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-white/[0.03] transition"
        >
          <div className="w-5 text-center text-[10px] font-bold text-gray-500">{i + 1}</div>
          <div className="flex items-center gap-1 flex-1 min-w-0">
            <Flag code={m.home.abbr} size="sm" />
            <span className="text-[11px] font-medium truncate">{m.home.name}</span>
            <span className="text-[10px] text-gray-600 mx-0.5">vs</span>
            <Flag code={m.away.abbr} size="sm" />
            <span className="text-[11px] font-medium truncate">{m.away.name}</span>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-[10px] text-gray-500 font-mono">{m.odds?.details}</span>
            <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-semibold ${
              m.movement === 'up' ? 'bg-green/10 text-green'
              : m.movement === 'down' ? 'bg-red/10 text-red'
              : 'bg-white/5 text-gray-500'
            }`}>
              {m.movement === 'up' ? <TrendingUp className="w-3 h-3" />
                : m.movement === 'down' ? <TrendingDown className="w-3 h-3" />
                : <Minus className="w-3 h-3" />}
              {m.changePct}%
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ——— 主组件 ———
export default function OddsPage() {
  const [tab, setTab] = useState<OddsTab>('overview');

  const tabs: { id: OddsTab; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: '赔率总览', icon: TrendingUp },
    { id: 'upset', label: '爆冷预警', icon: AlertTriangle },
    { id: 'movement', label: '异动追踪', icon: ArrowRightLeft },
  ];

  return (
    <div className="px-4">
      {/* Tab 切换 */}
      <div className="flex gap-1 bg-glass rounded-xl p-1 mb-4 border border-glass-border">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                tab === t.id ? 'bg-gold/10 text-gold' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* 内容 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {tab === 'overview' && <OddsOverview />}
          {tab === 'upset' && <UpsetAlert />}
          {tab === 'movement' && <MovementTrack />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
