import { motion } from 'framer-motion';
import { GitBranch, ChevronRight, Trophy, Crown } from 'lucide-react';
import { GROUPS, TEAMS } from '../data/teams';
import Flag from './Flag';
import { useMemo } from 'react';

// 基于FIFA排名的模拟晋级概率
function calcAdvanceProb(fifaRank: number, groupSize: number): number {
  // 排名越靠前，晋级概率越高
  const rankScore = Math.max(0, 100 - fifaRank);
  return Math.min(95, Math.max(5, Math.round(rankScore * 1.1)));
}

interface KnockoutTeam {
  abbr: string;
  name: string;
  prob: number;
  group: string;
  seed: number; // 小组内种子位
}

export default function KnockoutPredict() {
  const knockoutData = useMemo(() => {
    // 每组前2名晋级 → 24队
    const round32: KnockoutTeam[] = [];

    for (const [group, teams] of Object.entries(GROUPS)) {
      teams.forEach((abbr, idx) => {
        const t = TEAMS[abbr];
        if (!t) return;
        const prob = calcAdvanceProb(t.fifa_rank, teams.length);
        round32.push({
          abbr,
          name: t.cn,
          prob,
          group,
          seed: idx + 1,
        });
      });
    }

    // 按小组和概率排序
    round32.sort((a, b) => {
      if (a.group !== b.group) return a.group.localeCompare(b.group);
      return b.prob - a.prob;
    });

    // 取每组前2名
    const qualified = round32.filter((_, i) => {
      const groupTeams = round32.filter((t) => t.group === round32[i].group);
      return groupTeams.indexOf(round32[i]) < 2;
    });

    return qualified;
  }, []);

  // 按小组分组显示
  const grouped = useMemo(() => {
    const g: Record<string, KnockoutTeam[]> = {};
    for (const t of knockoutData) {
      if (!g[t.group]) g[t.group] = [];
      g[t.group].push(t);
    }
    return g;
  }, [knockoutData]);

  const groups = Object.keys(grouped).sort();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 mb-3"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-green/10 flex items-center justify-center">
          <GitBranch className="w-4 h-4 text-green" />
        </div>
        <div>
          <h3 className="text-sm font-bold">淘汰赛晋级预测</h3>
          <p className="text-[10px] text-gray-500">小组前2名晋级32强 · 基于FIFA排名模拟</p>
        </div>
      </div>

      {/* 淘汰赛路径 */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {/* 16强 */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1 mb-2">
            <span className="text-[10px] font-bold text-gold px-2 py-0.5 rounded-full bg-gold/10">
              32强
            </span>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <span className="text-[10px] font-bold text-gray-500">16强</span>
          </div>
          {groups.slice(0, 6).map((g) => (
            <div key={g} className="flex items-center gap-1 p-1.5 rounded-lg bg-white/[0.02]">
              <span className="text-[9px] text-gray-500 w-3 font-bold">{g}</span>
              {grouped[g].map((t) => (
                <div key={t.abbr} className="flex items-center gap-0.5">
                  <Flag code={t.abbr} size="sm" />
                  <span className="text-[9px] text-gray-400">{t.prob}%</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* 右侧 */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1 mb-2">
            <span className="text-[10px] font-bold text-gold px-2 py-0.5 rounded-full bg-gold/10">
              32强
            </span>
            <ChevronRight className="w-3 h-3 text-gray-600" />
            <span className="text-[10px] font-bold text-gray-500">16强</span>
          </div>
          {groups.slice(6).map((g) => (
            <div key={g} className="flex items-center gap-1 p-1.5 rounded-lg bg-white/[0.02]">
              <span className="text-[9px] text-gray-500 w-3 font-bold">{g}</span>
              {grouped[g].map((t) => (
                <div key={t.abbr} className="flex items-center gap-0.5">
                  <Flag code={t.abbr} size="sm" />
                  <span className="text-[9px] text-gray-400">{t.prob}%</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 冠军热门 */}
      <div className="border-t border-white/[0.05] pt-3">
        <div className="flex items-center gap-1.5 mb-2">
          <Crown className="w-3.5 h-3.5 text-gold" />
          <span className="text-xs font-bold text-gold">冠军热门</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {[
            { abbr: 'BRA', prob: 18 },
            { abbr: 'ENG', prob: 14 },
            { abbr: 'FRA', prob: 13 },
            { abbr: 'ARG', prob: 12 },
            { abbr: 'GER', prob: 10 },
            { abbr: 'ESP', prob: 9 },
          ].map((t, i) => (
            <motion.div
              key={t.abbr}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl bg-gold/5 border border-gold/10 flex-shrink-0"
            >
              <Flag code={t.abbr} size="md" />
              <span className="text-[10px] font-semibold">{TEAMS[t.abbr]?.cn}</span>
              <div className="flex items-center gap-0.5">
                <Trophy className="w-3 h-3 text-gold" />
                <span className="text-[10px] font-bold text-gold">{t.prob}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
