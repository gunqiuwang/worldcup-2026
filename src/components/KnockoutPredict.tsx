import { motion } from 'framer-motion';
import { GitBranch, Crown, Trophy } from 'lucide-react';
import { GROUPS, TEAMS } from '../data/teams';
import { GROUP_PREDICTIONS } from '../data/predictions';
import Flag from './Flag';
import { useMemo } from 'react';

interface TeamSlot {
  abbr: string;
  name: string;
  prob: number;
}

// 2026 世界杯 12 组 32 强对阵规则
// 上半区: A1vB2, C1vD2, E1vF2, G1vH2, I1vJ2, K1vL2
// 下半区: B1vA2, D1vC2, F1vE2, H1vG2, J1vI2, L1vK2
const BRACKET_PAIRS: [string, string][] = [
  // 上半区
  ['A', 'B'], ['C', 'D'], ['E', 'F'], ['G', 'H'], ['I', 'J'], ['K', 'L'],
  // 下半区
  ['B', 'A'], ['D', 'C'], ['F', 'E'], ['H', 'G'], ['J', 'I'], ['L', 'K'],
];

function getGroupTop2(group: string): [TeamSlot, TeamSlot] {
  const pred = GROUP_PREDICTIONS[group];
  const teams = GROUPS[group] || [];

  if (pred) {
    const sorted = [...pred.teams].sort((a, b) => b.advancement_pct - a.advancement_pct);
    const t1 = TEAMS[sorted[0].team];
    const t2 = TEAMS[sorted[1].team];
    return [
      { abbr: sorted[0].team, name: t1?.cn || sorted[0].team, prob: sorted[0].advancement_pct },
      { abbr: sorted[1].team, name: t2?.cn || sorted[1].team, prob: sorted[1].advancement_pct },
    ];
  }

  // fallback: FIFA 排名
  const sorted = [...teams].sort((a, b) => (TEAMS[a]?.fifa_rank || 99) - (TEAMS[b]?.fifa_rank || 99));
  const t1 = TEAMS[sorted[0]];
  const t2 = TEAMS[sorted[1]];
  return [
    { abbr: sorted[0], name: t1?.cn || sorted[0], prob: 85 },
    { abbr: sorted[1], name: t2?.cn || sorted[1], prob: 65 },
  ];
}

function generateBracket() {
  // 32 强对阵
  const r32: Array<[TeamSlot, TeamSlot]> = BRACKET_PAIRS.map(([g1, g2]) => {
    const [winner] = getGroupTop2(g1);
    const [, runner] = getGroupTop2(g2);
    return [winner, runner];
  });

  // 逐轮淘汰 (概率高的赢)
  function advance(prev: TeamSlot[]): TeamSlot[] {
    const next: TeamSlot[] = [];
    for (let i = 0; i < prev.length; i += 2) {
      next.push(prev[i].prob >= prev[i + 1].prob ? prev[i] : prev[i + 1]);
    }
    return next;
  }

  const r16 = advance(r32.map(([a, b]) => a.prob >= b.prob ? a : b));
  const qf = advance(r16);
  const sf = advance(qf);
  const final = advance(sf);
  const champion = final[0] || { abbr: 'ARG', name: '阿根廷', prob: 20 };

  return { r32, r16, qf, sf, final: final, champion };
}

function TeamSlotCard({ team, isWinner }: { team: TeamSlot; isWinner?: boolean }) {
  return (
    <div className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs transition-all ${
      isWinner ? 'bg-gold/10 border border-gold/20' : 'bg-white/[0.02] border border-transparent'
    }`}>
      <Flag code={team.abbr} size="sm" />
      <span className={`font-medium truncate ${isWinner ? 'text-gold' : 'text-gray-300'}`}>{team.name}</span>
      <span className={`text-[10px] ml-auto ${isWinner ? 'text-gold font-bold' : 'text-gray-600'}`}>{team.prob}%</span>
    </div>
  );
}

function BracketRound({ title, matches, icon }: {
  title: string;
  matches: Array<[TeamSlot, TeamSlot] | TeamSlot>;
  icon: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs font-semibold text-gray-400">{title}</span>
      </div>
      <div className="space-y-1.5">
        {matches.map((m, i) => {
          if (Array.isArray(m)) {
            const [a, b] = m as [TeamSlot, TeamSlot];
            const winner = a.prob >= b.prob ? a : b;
            return (
              <div key={i} className="glass-card p-2 space-y-1">
                <TeamSlotCard team={a} isWinner={winner.abbr === a.abbr} />
                <div className="text-[10px] text-gray-600 text-center">vs</div>
                <TeamSlotCard team={b} isWinner={winner.abbr === b.abbr} />
              </div>
            );
          }
          return <TeamSlotCard key={i} team={m as TeamSlot} isWinner />;
        })}
      </div>
    </div>
  );
}

export default function KnockoutPredict() {
  const bracket = useMemo(() => generateBracket(), []);

  // 构建 16 强对阵 (两两配对)
  const r16Matches: Array<[TeamSlot, TeamSlot]> = [];
  for (let i = 0; i < bracket.r16.length; i += 2) {
    r16Matches.push([bracket.r16[i], bracket.r16[i + 1]]);
  }

  const qfMatches: Array<[TeamSlot, TeamSlot]> = [];
  for (let i = 0; i < bracket.qf.length; i += 2) {
    qfMatches.push([bracket.qf[i], bracket.qf[i + 1]]);
  }

  const sfMatches: Array<[TeamSlot, TeamSlot]> = [];
  for (let i = 0; i < bracket.sf.length; i += 2) {
    sfMatches.push([bracket.sf[i], bracket.sf[i + 1]]);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 mb-3"
    >
      <div className="flex items-center gap-2 mb-4">
        <GitBranch className="w-4 h-4 text-gold" />
        <span className="text-sm font-semibold">淘汰赛预测</span>
        <span className="text-[10px] text-gray-500 ml-auto">基于出线概率推演</span>
      </div>

      {/* 冠军预测 */}
      <div className="text-center mb-5 py-4 rounded-xl bg-gradient-to-b from-gold/5 to-transparent border border-gold/10">
        <Crown className="w-8 h-8 text-gold mx-auto mb-2" />
        <div className="text-[10px] text-gray-500 mb-1">预测冠军</div>
        <div className="flex items-center justify-center gap-2">
          <Flag code={bracket.champion.abbr} size="lg" />
          <span className="text-lg font-bold gold-gradient">{bracket.champion.name}</span>
        </div>
        <div className="text-[10px] text-gold mt-1">夺冠概率 {bracket.champion.prob}%</div>
      </div>

      {/* 逐轮展示 */}
      <BracketRound title="32 强" matches={bracket.r32} icon={<span className="text-[10px] bg-gold/10 text-gold px-1.5 py-0.5 rounded">R32</span>} />
      <BracketRound title="16 强" matches={r16Matches} icon={<span className="text-[10px] bg-gold/10 text-gold px-1.5 py-0.5 rounded">R16</span>} />
      <BracketRound title="8 强" matches={qfMatches} icon={<span className="text-[10px] bg-gold/10 text-gold px-1.5 py-0.5 rounded">QF</span>} />
      <BracketRound title="半决赛" matches={sfMatches} icon={<span className="text-[10px] bg-gold/10 text-gold px-1.5 py-0.5 rounded">SF</span>} />
      <BracketRound title="决赛" matches={[bracket.final] as any} icon={<Trophy className="w-3.5 h-3.5 text-gold" />} />
    </motion.div>
  );
}
