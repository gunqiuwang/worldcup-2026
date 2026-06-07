import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff } from 'lucide-react';
import Countdown from './components/Countdown';
import MatchCard from './components/MatchCard';
import GroupStandings from './components/GroupStandings';
import BottomNav from './components/BottomNav';
import OddsPage from './components/OddsPage';
import { SCHEDULE } from './data/schedule';
import type { MatchData } from './data/schedule';

type Tab = 'today' | 'all';

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00+08:00');
  const days = ['日', '一', '二', '三', '四', '五', '六'];
  return `${d.getMonth() + 1}月${d.getDate()}日 周${days[d.getDay()]}`;
}

function groupByDate(matches: MatchData[]) {
  const groups: Record<string, MatchData[]> = {};
  matches.forEach((m) => {
    const date = m.date.slice(0, 10);
    if (!groups[date]) groups[date] = [];
    groups[date].push(m);
  });
  return groups;
}

export default function App() {
  const [page, setPage] = useState('matches');
  const [tab, setTab] = useState<Tab>('today');

  const today = new Date().toISOString().slice(0, 10);
  const now = new Date();

  const displayMatches = useMemo(() => {
    if (tab === 'today') {
      const todayMatches = SCHEDULE.filter((m) => m.date.slice(0, 10) === today);
      if (todayMatches.length > 0) return todayMatches;
      // fallback: nearest future matches
      const future = SCHEDULE.filter((m) => new Date(m.date) > now);
      return future.length > 0 ? future.slice(0, 6) : SCHEDULE.slice(0, 6);
    }
    return SCHEDULE;
  }, [tab, today]);

  const grouped = useMemo(() => groupByDate(displayMatches), [displayMatches]);

  return (
    <div className="max-w-[560px] mx-auto pb-20">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4">
        <h1 className="text-xl font-extrabold gold-gradient tracking-tight">⚽ 2026 世界杯</h1>
        <div className="pulse-dot">
          <Wifi className="w-3 h-3" />
          LIVE
        </div>
      </header>

      {/* Countdown */}
      <Countdown />

      {/* Content */}
      <AnimatePresence mode="wait">
        {page === 'matches' && (
          <motion.div
            key="matches"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Tabs */}
            <div className="flex gap-1 bg-glass rounded-xl p-1 mx-4 mb-4 border border-glass-border">
              {(['today', 'all'] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    tab === t
                      ? 'bg-gold/10 text-gold'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {t === 'today' ? '今日' : '全部赛程'}
                </button>
              ))}
            </div>

            {/* Matches */}
            <div className="px-4">
              {Object.entries(grouped).map(([date, matches]) => (
                <div key={date}>
                  <div className="text-xs text-gray-400 font-semibold py-3">
                    {formatDate(date)}
                  </div>
                  {matches.map((m, i) => (
                    <MatchCard key={m.id} match={m} index={i} />
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {page === 'standings' && (
          <motion.div
            key="standings"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <GroupStandings />
          </motion.div>
        )}

        {page === 'odds' && (
          <motion.div
            key="odds"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            <OddsPage />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Nav */}
      <BottomNav active={page} onNavigate={setPage} />
    </div>
  );
}
