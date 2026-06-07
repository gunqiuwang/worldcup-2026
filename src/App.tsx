import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Sparkles, Search, X } from 'lucide-react';
import Countdown from './components/Countdown';
import MatchCard from './components/MatchCard';
import GroupStandings from './components/GroupStandings';
import BottomNav from './components/BottomNav';
import Logo from './components/Logo';

import Dashboard from './components/Dashboard';
import NewsPage from './components/NewsPage';
import ParticleBackground from './components/ParticleBackground';
import MatchModal from './components/MatchModal';
import TeamPage from './components/TeamPage';
import LandingPage from './components/LandingPage';
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
  const [showLanding, setShowLanding] = useState(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('wc-visited');
    }
    return true;
  });
  const [page, setPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wc-page');
      // 'odds' tab was removed, redirect to 'data'
      if (saved === 'odds') return 'data';
      return saved || 'matches';
    }
    return 'matches';
  });
  const [tab, setTab] = useState<Tab>('today');
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('wc-theme') as Theme) || 'dark';
    }
    return 'dark';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [filterGroup, setFilterGroup] = useState<string | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<MatchData | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [isLoading] = useState(false);

  const today = new Date().toISOString().slice(0, 10);
  const now = new Date();
  const allGroups = Object.keys(GROUPS).sort();

  const toggleTheme = useCallback(() => {
    const idx = THEME_ORDER.indexOf(theme);
    const next = THEME_ORDER[(idx + 1) % THEME_ORDER.length];
    setTheme(next);
    localStorage.setItem('wc-theme', next);
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

  const handleEnterFromLanding = useCallback(() => {
    setShowLanding(false);
    setPage('matches');
    localStorage.setItem('wc-visited', '1');
    localStorage.setItem('wc-page', 'matches');
  }, []);

  return (
    <>
      {/* Landing Page */}
      <AnimatePresence>
        {showLanding && (
          <LandingPage onEnter={handleEnterFromLanding} />
        )}
      </AnimatePresence>

      {/* Theme CSS */}
      <style>{THEME_CSS[theme]}</style>

      {/* Particle background */}
      <ParticleBackground />

      <div className="max-w-[560px] mx-auto pb-20 relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-40 px-4 py-3 backdrop-blur-xl" style={{ background: 'rgba(8,9,10,0.85)' }}>
          <div className="flex items-center justify-between">
            {/* 左侧: Logo + 品牌名 */}
            <div className="flex items-center gap-2.5">
              <Logo size={28} />
              <div className="flex flex-col">
                <h1 className="text-[15px] font-bold gold-gradient tracking-tight leading-tight">
                  MatchLens
                </h1>
                <span className="text-[9px] text-gray-500 tracking-widest uppercase">World Cup 2026</span>
              </div>
            </div>

            {/* 右侧: 功能按钮 */}
            <div className="flex items-center gap-1.5">
              {/* LIVE 指示 */}
              <div className="pulse-dot mr-1">
                <span className="text-[10px]">LIVE</span>
              </div>

              {/* 搜索按钮 */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                style={{ 
                  background: showSearch ? 'rgba(255,213,79,0.1)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${showSearch ? 'rgba(255,213,79,0.3)' : 'rgba(255,255,255,0.06)'}`
                }}
              >
                {showSearch ? (
                  <X className="w-3.5 h-3.5 text-gold" />
                ) : (
                  <Search className="w-3.5 h-3.5 text-gray-400" />
                )}
              </button>
              
              {/* 主题切换 */}
              <button
                onClick={toggleTheme}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                style={{ 
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)'
                }}
                title={THEME_LABELS[theme]}
              >
                {theme === 'dark' ? (
                  <Moon className="w-3.5 h-3.5 text-gray-400" />
                ) : theme === 'light' ? (
                  <Sun className="w-3.5 h-3.5 text-gold" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-red" />
                )}
              </button>
            </div>
          </div>
          
          {/* 搜索栏 */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="搜索球队..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-all"
                      style={{ 
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)'
                      }}
                      autoFocus
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Countdown - 只在赛程页显示 */}
        {page === 'matches' && <Countdown />}

        {/* Content */}
        <AnimatePresence mode="wait">
          {selectedTeam && (
            <motion.div
              key="team"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TeamPage
                teamAbbr={selectedTeam}
                onBack={() => setSelectedTeam(null)}
                onMatchClick={(id) => {
                  const m = SCHEDULE.find((s) => s.id === id);
                  if (m) { setSelectedMatch(m); setSelectedTeam(null); }
                }}
              />
            </motion.div>
          )}

          {!selectedTeam && page === 'data' && (
            <motion.div
              key="data"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Dashboard onTeamClick={setSelectedTeam} />
            </motion.div>
          )}

          {!selectedTeam && page === 'matches' && (
            <motion.div
              key="matches"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Tabs */}
              <div className="flex gap-1 mx-4 mb-3 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                {(['today', 'all'] as Tab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 text-center py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      tab === t ? 'text-gold' : 'text-gray-500 hover:text-gray-300'
                    }`}
                    style={tab === t ? { background: 'rgba(255,213,79,0.1)' } : {}}
                  >
                    {t === 'today' ? '今日' : '全部赛程'}
                  </button>
                ))}
              </div>

              {/* 筛选器 */}
              <div className="flex gap-2 px-4 mb-3 overflow-x-auto scrollbar-hide">
                <button
                  onClick={() => setFilterGroup(null)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    !filterGroup ? 'text-gold' : 'text-gray-500 hover:text-gray-300'
                  }`}
                  style={!filterGroup 
                    ? { background: 'rgba(255,213,79,0.1)', border: '1px solid rgba(255,213,79,0.2)' }
                    : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }
                  }
                >
                  全部
                </button>
                {allGroups.map((g) => (
                  <button
                    key={g}
                    onClick={() => setFilterGroup(filterGroup === g ? null : g)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      filterGroup === g ? 'text-gold' : 'text-gray-500 hover:text-gray-300'
                    }`}
                    style={filterGroup === g 
                      ? { background: 'rgba(255,213,79,0.1)', border: '1px solid rgba(255,213,79,0.2)' }
                      : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }
                    }
                  >
                    {g}组
                  </button>
                ))}
              </div>

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

          {!selectedTeam && page === 'standings' && (
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

          {!selectedTeam && page === 'news' && (
            <motion.div
              key="news"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4">
                <NewsPage />
              </div>
            </motion.div>
          )}


        </AnimatePresence>

        {/* Bottom Nav */}
        <BottomNav active={page} onNavigate={(id) => { setPage(id); localStorage.setItem('wc-page', id); }} />
      </div>

      {/* Match Detail Modal */}
      <MatchModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />
    </>
  );
}
