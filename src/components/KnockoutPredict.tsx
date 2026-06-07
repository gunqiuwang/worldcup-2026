import { motion } from 'framer-motion';
import { GitBranch, Crown } from 'lucide-react';
import { GROUPS, TEAMS } from '../data/teams';
import { GROUP_PREDICTIONS } from '../data/predictions';
import Flag from './Flag';
import { useMemo } from 'react';

interface TeamSlot {
  abbr: string;
  name: string;
  prob: number;
}

const TIER_SCORE: Record<string, number> = { S: 4, A: 3, B: 2, C: 1 };

function getAllGroupTop2(): { winners: TeamSlot[]; runners: TeamSlot[] } {
  const groupOrder = Object.keys(GROUPS).sort();
  const winners: TeamSlot[] = [];
  const runners: TeamSlot[] = [];

  for (const g of groupOrder) {
    const pred = GROUP_PREDICTIONS[g];
    if (pred) {
      const sorted = [...pred.teams].sort((a, b) => b.advancement_pct - a.advancement_pct);
      const t1 = TEAMS[sorted[0].team];
      const t2 = TEAMS[sorted[1].team];
      winners.push({ abbr: sorted[0].team, name: t1?.cn || sorted[0].team, prob: sorted[0].advancement_pct });
      runners.push({ abbr: sorted[1].team, name: t2?.cn || sorted[1].team, prob: sorted[1].advancement_pct });
    }
  }

  return { winners, runners };
}

function predictChampion(): TeamSlot {
  const { winners, runners } = getAllGroupTop2();
  const allTeams = [...winners, ...runners];

  return allTeams.reduce((best, t) => {
    const bestTier = TIER_SCORE[TEAMS[best.abbr]?.tier || 'C'] || 1;
    const tTier = TIER_SCORE[TEAMS[t.abbr]?.tier || 'C'] || 1;
    const bestScore = best.prob * bestTier;
    const tScore = t.prob * tTier;
    return tScore > bestScore ? t : best;
  }, allTeams[0]);
}

export default function KnockoutPredict() {
  const { winners, runners } = useMemo(() => getAllGroupTop2(), []);
  const champion = useMemo(() => predictChampion(), []);

  const r32Pairs = useMemo(() => {
    const pairs: Array<{ home: TeamSlot; away: TeamSlot; label: string }> = [];
    const groups = Object.keys(GROUPS).sort();
    for (let i = 0; i < groups.length; i += 2) {
      const g1 = groups[i];
      const g2 = groups[i + 1];
      if (!g2) break;
      const pred1 = GROUP_PREDICTIONS[g1];
      const pred2 = GROUP_PREDICTIONS[g2];
      if (!pred1 || !pred2) continue;

      const s1 = [...pred1.teams].sort((a, b) => b.advancement_pct - a.advancement_pct);
      const s2 = [...pred2.teams].sort((a, b) => b.advancement_pct - a.advancement_pct);
      pairs.push({
        home: { abbr: s1[0].team, name: TEAMS[s1[0].team]?.cn || s1[0].team, prob: s1[0].advancement_pct },
        away: { abbr: s2[1].team, name: TEAMS[s2[1].team]?.cn || s2[1].team, prob: s2[1].advancement_pct },
        label: `${g1}1 vs ${g2}2`,
      });
    }
    return pairs;
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 mb-3">
      <div className="flex items-center gap-2 mb-4">
        <GitBranch className="w-4 h-4 text-gold" />
        <span className="text-sm font-semibold">淘汰赛预测</span>
        <span className="text-[10px] text-gray-500 ml-auto">小组前二交叉对阵</span>
      </div>

      <div className="text-center mb-5 py-4 rounded-xl bg-gradient-to-b from-gold/5 to-transparent border border-gold/10">
        <Crown className="w-8 h-8 text-gold mx-auto mb-2" />
        <div className="text-[10px] text-gray-500 mb-1">预测冠军</div>
        <div className="flex items-center justify-center gap-2">
          <Flag code={champion.abbr} size="lg" />
          <span className="text-lg font-bold gold-gradient">{champion.name}</span>
        </div>
      </div>

      <div className="mb-2">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] bg-gold/10 text-gold px-1.5 py-0.5 rounded font-bold">R32</span>
          <span className="text-xs font-semibold text-gray-400">32 强交叉对阵</span>
        </div>
        <div className="space-y-1.5">
          {r32Pairs.map((p, i) => {
            const winner = p.home.prob >= p.away.prob ? p.home : p.away;
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                <span className="text-[9px] text-gray-600 w-12">{p.label}</span>
                <Flag code={p.home.abbr} size="sm" />
                <span className={`text-[11px] font-medium flex-1 ${winner.abbr === p.home.abbr ? 'text-gold' : 'text-gray-400'}`}>{p.home.name}</span>
                <span className="text-[10px] text-gray-600 font-mono">{p.home.prob}%</span>
                <span className="text-[10px] text-gray-600">vs</span>
                <span className="text-[10px] text-gray-600 font-mono">{p.away.prob}%</span>
                <span className={`text-[11px] font-medium flex-1 text-right ${winner.abbr === p.away.abbr ? 'text-gold' : 'text-gray-400'}`}>{p.away.name}</span>
                <Flag code={p.away.abbr} size="sm" />
              </motion.div>
            );
          })}
        </div>
      </div>

      <details className="mt-4">
        <summary className="text-[10px] text-gray-500 cursor-pointer hover:text-gold transition">查看全部 24 支晋级队伍</summary>
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
