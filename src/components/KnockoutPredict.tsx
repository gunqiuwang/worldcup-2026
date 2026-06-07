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

// 生成淘汰赛树数据
function generateBracket(): { r32: Array<[TeamSlot, TeamSlot]>; champion: TeamSlot } {
  const groupWinners: TeamSlot[] = [];
  const groupRunners: TeamSlot[] = [];

  for (const [group, teams] of Object.entries(GROUPS)) {
    const pred = GROUP_PREDICTIONS[group];
    
    if (pred) {
      // 使用集成预测的出线概率
      const sorted = [...pred.teams].sort((a, b) => b.advancement_pct - a.advancement_pct);
      const winner = TEAMS[sorted[0].team];
      const runner = TEAMS[sorted[1].team];
      if (winner) groupWinners.push({ abbr: sorted[0].team, name: winner.cn, prob: sorted[0].advancement_pct });
      if (runner) groupRunners.push({ abbr: sorted[1].team, name: runner.cn, prob: sorted[1].advancement_pct });
    } else {
      // 降级到 FIFA 排名
      const sorted = [...teams].sort((a, b) => {
        return (TEAMS[a]?.fifa_rank || 99) - (TEAMS[b]?.fifa_rank || 99);
      });
      const winner = TEAMS[sorted[0]];
      const runner = TEAMS[sorted[1]];
      if (winner) groupWinners.push({ abbr: sorted[0], name: winner.cn, prob: 90 });
      if (runner) groupRunners.push({ abbr: sorted[1], name: runner.cn, prob: 70 });
    }
  }

  // 32强对阵：A1vsB2, C1vsD2, ...
  const r32: Array<[TeamSlot, TeamSlot]> = [];
  for (let i = 0; i < Math.min(groupWinners.length, groupRunners.length); i++) {
    const j = (i + 1) % groupRunners.length;
    r32.push([groupWinners[i], groupRunners[j]]);
  }

  // 冠军
  const champion = groupWinners[0] || { abbr: 'BRA', name: '巴西', prob: 18 };

  return { r32: r32.slice(0, 16), champion };
}

// 生成后续轮次
function generateRounds(bracket: ReturnType<typeof generateBracket>) {
  const { r32 } = bracket;

  // 16强
  const r16: TeamSlot[] = r32.map(([a, b]) => a.prob >= b.prob ? a : b);
  // 8强
  const qf: TeamSlot[] = [];
  for (let i = 0; i < r16.length; i += 2) {
    const a = r16[i];
    const b = r16[i + 1];
    qf.push(b ? (a.prob >= b.prob ? a : b) : a);
  }
  // 4强
  const sf: TeamSlot[] = [];
  for (let i = 0; i < qf.length; i += 2) {
    const a = qf[i];
    const b = qf[i + 1];
    sf.push(b ? (a.prob >= b.prob ? a : b) : a);
  }
  // 决赛
  const final: TeamSlot[] = [];
  for (let i = 0; i < sf.length; i += 2) {
    const a = sf[i];
    const b = sf[i + 1];
    final.push(b ? (a.prob >= b.prob ? a : b) : a);
  }

  return { r16, qf, sf, final };
}

function MatchSlot({ team, delay, highlight }: { team: TeamSlot; delay: number; highlight?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={`flex items-center gap-2 p-1.5 rounded-lg ${
        highlight ? 'bg-gold/10 border border-gold/20' : 'bg-white/[0.02]'
      }`}
    >
      <Flag code={team.abbr} size="sm" />
      <span className="text-[10px] font-semibold truncate flex-1">{team.name}</span>
      <span className={`text-[10px] font-bold ${
        team.prob >= 70 ? 'text-green' : team.prob >= 50 ? 'text-gold' : 'text-gray-400'
      }`}>
        {team.prob}%
      </span>
    </motion.div>
  );
}

export default function KnockoutPredict() {
  const bracket = useMemo(() => generateBracket(), []);
  const rounds = useMemo(() => generateRounds(bracket), [bracket]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 mb-3"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-gold/10 flex items-center justify-center">
          <GitBranch className="w-4 h-4 text-gold" />
        </div>
        <div>
          <h3 className="text-sm font-bold">淘汰赛预测</h3>
          <p className="text-[10px] text-gray-500">基于出线概率的晋级路径</p>
        </div>
      </div>

      {/* 32强 */}
      <div className="mb-4">
        <div className="text-[10px] text-gray-500 mb-2 flex items-center gap-1">
          <Trophy className="w-3 h-3" />
          32 强对阵
        </div>
        <div className="grid grid-cols-2 gap-1">
          {bracket.r32.slice(0, 8).map(([a, b], i) => (
            <div key={i} className="space-y-0.5">
              <MatchSlot team={a} delay={i * 0.05} highlight={a.prob >= 70} />
              <MatchSlot team={b} delay={i * 0.05 + 0.02} />
            </div>
          ))}
        </div>
      </div>

      {/* 晋级路径 */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: '16强', teams: rounds.r16.slice(0, 8), icon: '⚔️' },
          { label: '8强', teams: rounds.qf.slice(0, 4), icon: '🏆' },
          { label: '4强', teams: rounds.sf.slice(0, 2), icon: '🔥' },
          { label: '决赛', teams: rounds.final.slice(0, 1), icon: '👑' },
        ].map((round) => (
          <div key={round.label}>
            <div className="text-[10px] text-gray-500 mb-1 text-center">{round.icon} {round.label}</div>
            <div className="space-y-0.5">
              {round.teams.map((t, i) => (
                <MatchSlot key={i} team={t} delay={0.5 + i * 0.1} highlight={t.prob >= 80} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 预测冠军 */}
      <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-gold/10 to-transparent border border-gold/20">
        <div className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-gold" />
          <div>
            <div className="text-xs text-gray-500">预测冠军</div>
            <div className="text-sm font-bold">{bracket.champion.name}</div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-lg font-extrabold text-gold">{bracket.champion.prob}%</div>
            <div className="text-[10px] text-gray-500">出线概率</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
