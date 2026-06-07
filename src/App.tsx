import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Sun, Moon, Sparkles } from 'lucide-react';
import Countdown from './components/Countdown';
import MatchCard from './components/MatchCard';
import GroupStandings from './components/GroupStandings';
import BottomNav from './components/BottomNav';
import OddsPage from './components/OddsPage';
import Dashboard from './components/Dashboard';
import ParticleBackground from './components/ParticleBackground';
import SearchBar from './components/SearchBar';
import MatchModal from './components/MatchModal';
import { SkeletonCard, SkeletonGroup } from './components/Skeleton';
import { SCHEDULE } from './data/schedule';
import { GROUPS } from './data/teams';
import { THEME_CSS } from './theme';
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

type Theme = 'dark' | 'light' | 'matchday';

const THEME_ORDER: Theme[] = ['dark', 'light', 'matchday'];
const THEME_LABELS: Record<Theme, string> = { dark: '深色', light: '浅色', matchday: '比赛日' };

export default function App() {
  const [page, setPage] = useState('data');  // 默认显示数据中心
  const [tab, setTab] = useState<Tab>('today');
  const [theme, setTheme] = useState<Theme>('dark');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGroup, setFilterGroup] = useState<string | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<MatchData | null>(null);
  const [isLoading] = useState(false);

  const today = new Date().toISOString().slice(0, 10);
  const now = new Date();
  const allGroups = Object.keys(GROUPS).sort();

  const toggleTheme = useCallback(() => {
    const idx = THEME_ORDER.indexOf(theme);
    setTheme(THEME_ORDER[(idx + 1) % THEME_ORDER.length]);
  }, [theme]);

  const filteredMatches = useMemo(() => {
    let matches = SCHEDULE;
    if (filterGroup) {
      matches = matches.filter((m) => m.group === filterGroup);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      matches = matches.filter(
        (m) =>
          m.home.name.toLowerCase().includes(q) ||
          m.away.name.toLowerCase().includes(q) ||
          m.home.abbr.toLowerCase().includes(q) ||
          m.away.abbr.toLowerCase().includes(q)
      );
    }
    return matches;
  }, [filterGroup, searchQuery]);

  const displayMatches = useMemo(() => {
    if (tab === 'today') {
      const todayMatches = filteredMatches.filter((m) => m.date.slice(0, 10) === today);
      if (todayMatches.length > 0) return todayMatches;
      const future = filteredMatches.filter((m) => new Date(m.date) > now);
      return future.length > 0 ? future.slice(0, 6) : filteredMatches.slice(0, 6);
    }
    return filteredMatches;
  }, [tab, today, filteredMatches]);

  const grouped = useMemo(() => groupByDate(displayMatches), [displayMatches]);

  return (
    <>
      {/* Theme CSS */}
      <style>{THEME_CSS[theme]}</style>

      {/* Particle background */}
      <ParticleBackground />

      <div className="max-w-[560px] mx-auto pb-20 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-extrabold gold-gradient tracking-tight flex items-center gap-2">
            ⚽ 2026 世界杯
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full bg-glass border border-glass-border flex items-center justify-center hover:border-gold/30 transition"
              title={THEME_LABELS[theme]}
            >
              {theme === 'dark' ? (
                <Moon className="w-4 h-4 text-gray-400" />
              ) : theme === 'light' ? (
                <Sun className="w-4 h-4 text-gold" />
              ) : (
                <Sparkles className="w-4 h-4 text-red" />
              )}
            </button>
            <div className="pulse-dot">
              <Wifi className="w-3 h-3" />
              LIVE
            </div>
          </div>
        </header>

        {/* Countdown - 只在赛程页显示 */}
        {page === 'matches' && <Countdown />}

        {/* Content */}
        <AnimatePresence mode="wait">
          {page === 'data' && (
            <motion.div
              key="data"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Dashboard />
            </motion.div>
          )}

          {page === 'matches' && (
            <motion.div
              key="matches"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Tabs */}
              <div className="flex gap-1 bg-glass rounded-xl p-1 mx-4 mb-3 border border-glass-border">
                {(['today', 'all'] as Tab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      tab === t ? 'bg-gold/10 text-gold' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {t === 'today' ? '今日' : '全部赛程'}
                  </button>
                ))}
              </div>

              {/* Search + Filter */}
              <SearchBar
                onSearch={setSearchQuery}
                onFilterGroup={setFilterGroup}
                activeGroup={filterGroup}
                groups={allGroups}
              />

              {/* Matches */}
              <div className="px-4">
                {isLoading ? (
                  <>
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                  </>
                ) : Object.keys(grouped).length === 0 ? (
                  <div className="text-center py-16 text-gray-500 text-sm">
                    没有找到匹配的比赛
                  </div>
                ) : (
                  Object.entries(grouped).map(([date, matches]) => (
                    <div key={date}>
                      <div className="text-xs text-gray-400 font-semibold py-3 flex items-center gap-2">
                        <span>{formatDate(date)}</span>
                        <span className="text-gray-600">·</span>
                        <span className="text-gray-500">{matches.length} 场</span>
                      </div>
                      {matches.map((m, i) => (
                        <MatchCard
                          key={m.id}
                          match={m}
                          index={i}
                          onClick={() => setSelectedMatch(m)}
                        />
                      ))}
                    </div>
                  ))
                )}
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
              {isLoading ? (
                <div className="px-4">
                  <SkeletonGroup />
                  <SkeletonGroup />
                </div>
              ) : (
                <GroupStandings />
              )}
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

      {/* Match Detail Modal */}
      <MatchModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />
    </>
  );
}
