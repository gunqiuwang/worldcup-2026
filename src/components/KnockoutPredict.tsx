import { motion } from 'framer-motion';
import { GitBranch, Crown, Trophy, ChevronRight } from 'lucide-react';
import { GROUPS, TEAMS } from '../data/teams';
import { GROUP_PREDICTIONS } from '../data/predictions';
import { ELO_RATINGS } from '../data/elo_ratings';
import Flag from './Flag';
import { useMemo } from 'react';

interface TeamSlot {
  abbr: string;
  name: string;
  prob: number;
}

// 获取各组前二
function getAllGroupTop2(): { winners: TeamSlot[]; runners: TeamSlot[] } {
  const groupOrder = Object.keys(GROUPS).sort();
  const winners: TeamSlot[] = [];
  const runners: TeamSlot[] = [];

  for (const g of groupOrder) {
    const pred = GROUP_PREDICTIONS[g];
    const teams = GROUPS[g] || [];

    if (pred) {
      const sorted = [...pred.teams].sort((a, b) => b.advancement_pct - a.advancement_pct);
      const t1 = TEAMS[sorted[0].team];
      const t2 = TEAMS[sorted[1].team];
      winners.push({ abbr: sorted[0].team, name: t1?.cn || sorted[0].team, prob: sorted[0].advancement_pct });
      runners.push({ abbr: sorted[1].team, name: t2?.cn || sorted[1].team, prob: sorted[1].advancement_pct });
    } else {
      const sorted = [...teams].sort((a, b) => (TEAMS[a]?.fifa_rank || 99) - (TEAMS[b]?.fifa_rank || 99));
      winners.push({ abbr: sorted[0], name: TEAMS[sorted[0]]?.cn || sorted[0], prob: 85 });
      runners.push({ abbr: sorted[1], name: TEAMS[sorted[1]]?.cn || sorted[1], prob: 65 });
    }
  }

  return { winners, runners };
}

// 预测冠军: 取所有队中出线概率 × Elo 最高的
function predictChampion(): TeamSlot {
  const allTeams: TeamSlot[] = [];
  const { winners, runners } = getAllGroupTop2();
  allTeams.push(...winners, ...runners);

  return allTeams.reduce((best, t) => {
    const bestElo = ELO_RATINGS[best.abbr]?.elo || 1500;
    const tElo = ELO_RATINGS[t.abbr]?.elo || 1500;
    const bestScore = best.prob * bestElo / 1500;
    const tScore = t.prob * tElo / 1500;
    return tScore > bestScore ? t : best;
  }, allTeams[0]);
}

export default function KnockoutPredict() {
  const { winners, runners } = useMemo(() => getAllGroupTop2(), []);
  const champion = useMemo(() => predictChampion(), []);

  // R32 对阵表 (简化展示)
  const r32Pairs = useMemo(() => {
    const pairs: Array<{ home: TeamSlot; away: TeamSlot; label: string }> = [];
    const groups = Object.keys(GROUPS).sort();
    for (let i = 0; i < groups.length; i += 2) {
      const g1 = groups[i];
      const g2 = groups[i + 1];
      if (!g2) break;
      const pred1 = GROUP_PREDICTIONS[g1];
      const pred2 = GROUP_PREDICTIONS[g2];
      const teams1 = GROUPS[g1] || [];
      const teams2 = GROUPS[g2] || [];

      let t1: TeamSlot, t2: TeamSlot;
      if (pred1) {
        const s = [...pred1.teams].sort((a, b) => b.advancement_pct - a.advancement_pct);
        const tm = TEAMS[s[0].team];
        t1 = { abbr: s[0].team, name: tm?.cn || s[0].team, prob: s[0].advancement_pct };
      } else {
        const s = [...teams1].sort((a, b) => (TEAMS[a]?.fifa_rank || 99) - (TEAMS[b]?.fifa_rank || 99));
        t1 = { abbr: s[0], name: TEAMS[s[0]]?.cn || s[0], prob: 85 };
      }
      if (pred2) {
        const s = [...pred2.teams].sort((a, b) => b.advancement_pct - a.advancement_pct);
        const tm = TEAMS[s[1].team];
        t2 = { abbr: s[1].team, name: tm?.cn || s[1].team, prob: s[1].advancement_pct };
      } else {
        const s = [...teams2].sort((a, b) => (TEAMS[a]?.fifa_rank || 99) - (TEAMS[b]?.fifa_rank || 99));
        t2 = { abbr: s[1], name: TEAMS[s[1]]?.cn || s[1], prob: 65 };
      }

      pairs.push({ home: t1, away: t2, label: `${g1}1 vs ${g2}2` });
    }
    return pairs;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 mb-3"
    >
      <div className="flex items-center gap-2 mb-4">
        <GitBranch className="w-4 h-4 text-gold" />
        <span className="text-sm font-semibold">淘汰赛预测</span>
        <span className="text-[10px] text-gray-500 ml-auto">小组前二交叉对阵</span>
      </div>

      {/* 冠军预测 */}
      <div className="text-center mb-5 py-4 rounded-xl bg-gradient-to-b from-gold/5 to-transparent border border-gold/10">
        <Crown className="w-8 h-8 text-gold mx-auto mb-2" />
        <div className="text-[10px] text-gray-500 mb-1">预测冠军</div>
        <div className="flex items-center justify-center gap-2">
          <Flag code={champion.abbr} size="lg" />
          <span className="text-lg font-bold gold-gradient">{champion.name}</span>
        </div>
      </div>

      {/* R32 对阵预览 */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] bg-gold/10 text-gold px-1.5 py-0.5 rounded font-bold">R32</span>
          <span className="text-xs font-semibold text-gray-400">32 强交叉对阵</span>
        </div>
        <div className="space-y-1.5">
          {r32Pairs.map((p, i) => {
            const winner = p.home.prob >= p.away.prob ? p.home : p.away;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]"
              >
                <span className="text-[9px] text-gray-600 w-12">{p.label}</span>
                <Flag code={p.home.abbr} size="sm" />
                <span className={`text-[11px] font-medium flex-1 ${winner.abbr === p.home.abbr ? 'text-gold' : 'text-gray-400'}`}>
                  {p.home.name}
                </span>
                <span className="text-[10px] text-gray-600 font-mono">{p.home.prob}%</span>
                <span className="text-[10px] text-gray-600">vs</span>
                <span className="text-[10px] text-gray-600 font-mono">{p.away.prob}%</span>
                <span className={`text-[11px] font-medium flex-1 text-right ${winner.abbr === p.away.abbr ? 'text-gold' : 'text-gray-400'}`}>
                  {p.away.name}
                </span>
                <Flag code={p.away.abbr} size="sm" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 全部小组前二 */}
      <details className="mt-4">
        <summary className="text-[10px] text-gray-500 cursor-pointer hover:text-gold transition">
          查看全部 24 支晋级队伍
        </summary>
        <div className="grid grid-cols-2 gap-1.5 mt-2">
          {winners.map((t, i) => (
            <div key={t.abbr} className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/[0.02]">
              <span className="text-[9px] text-gray-600 w-4">{Object.keys(GROUPS).sort()[i]}1</span>
              <Flag code={t.abbr} size="sm" />
              <span className="text-[10px] font-medium truncate flex-1">{t.name}</span>
              <span className="text-[9px] text-green font-bold">{t.prob}%</span>
            </div>
          ))}
          {runners.map((t, i) => (
            <div key={t.abbr + '-r'} className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/[0.02]">
              <span className="text-[9px] text-gray-600 w-4">{Object.keys(GROUPS).sort()[i]}2</span>
              <Flag code={t.abbr} size="sm" />
              <span className="text-[10px] font-medium truncate flex-1">{t.name}</span>
              <span className="text-[9px] text-gold font-bold">{t.prob}%</span>
            </div>
          ))}
        </div>
      </details>
    </motion.div>
  );
}
