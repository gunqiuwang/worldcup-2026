import { motion } from 'framer-motion';
import { GitBranch, Crown, Trophy } from 'lucide-react';
import { GROUPS, TEAMS } from '../data/teams';
import Flag from './Flag';
import { useMemo } from 'react';

function calcAdvanceProb(fifaRank: number): number {
  return Math.min(95, Math.max(5, Math.round((100 - fifaRank) * 1.1)));
}

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
    const sorted = [...teams].sort((a, b) => {
      return (TEAMS[a]?.fifa_rank || 99) - (TEAMS[b]?.fifa_rank || 99);
    });
    const winner = TEAMS[sorted[0]];
    const runner = TEAMS[sorted[1]];
    if (winner) groupWinners.push({ abbr: sorted[0], name: winner.cn, prob: calcAdvanceProb(winner.fifa_rank) });
    if (runner) groupRunners.push({ abbr: sorted[1], name: runner.cn, prob: calcAdvanceProb(runner.fifa_rank) });
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
      className={`flex items-center gap-1.5 px-2 py-1 rounded-lg border transition ${
        highlight
          ? 'bg-gold/10 border-gold/30'
          : 'bg-white/[0.02] border-white/[0.05] hover:border-gold/20'
      }`}
    >
      <Flag code={team.abbr} size="sm" />
      <span className="text-[10px] font-semibold truncate max-w-[60px]">{team.name}</span>
      <span className={`text-[9px] font-bold ml-auto ${highlight ? 'text-gold' : 'text-gray-500'}`}>
        {team.prob}%
      </span>
    </motion.div>
  );
}

function RoundColumn({ title, teams, delay }: { title: string; teams: TeamSlot[]; delay: number }) {
  return (
    <div className="flex flex-col gap-2 min-w-[100px]">
      <div className="text-[10px] font-bold text-gold text-center mb-1">{title}</div>
      {teams.filter((t) => t && t.abbr).map((t, i) => (
        <MatchSlot key={t.abbr + i} team={t} delay={delay + i * 0.05} />
      ))}
    </div>
  );
}

export default function KnockoutPredict() {
  const bracket = useMemo(() => generateBracket(), []);
  const rounds = useMemo(() => generateRounds(bracket), [bracket]);

  // 冠军热门
  const championTeams = useMemo(() => {
    return [
      { abbr: 'BRA', prob: 18 }, { abbr: 'ENG', prob: 14 },
      { abbr: 'FRA', prob: 13 }, { abbr: 'ARG', prob: 12 },
      { abbr: 'GER', prob: 10 }, { abbr: 'ESP', prob: 9 },
    ];
  }, []);

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
          <h3 className="text-sm font-bold">淘汰赛晋级树</h3>
          <p className="text-[10px] text-gray-500">基于FIFA排名模拟 · 32强→冠军</p>
        </div>
      </div>

      {/* 树状图 - 横向滚动 */}
      <div className="overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
        <div className="flex gap-3 items-center" style={{ minWidth: 'max-content' }}>
          <RoundColumn title="32强" teams={bracket.r32.map(([a]) => a)} delay={0} />
          <div className="flex flex-col gap-6 justify-center text-gray-600">
            {bracket.r32.map((_, i) => (
              <span key={i} className="text-[10px]">→</span>
            ))}
          </div>
          <RoundColumn title="16强" teams={rounds.r16} delay={0.2} />
          <div className="flex flex-col gap-6 justify-center text-gray-600">
            {rounds.r16.map((_, i) => i % 2 === 0 ? <span key={i} className="text-[10px]">→</span> : null)}
          </div>
          <RoundColumn title="8强" teams={rounds.qf} delay={0.4} />
          <div className="flex flex-col gap-6 justify-center text-gray-600">
            {rounds.qf.map((_, i) => i % 2 === 0 ? <span key={i} className="text-[10px]">→</span> : null)}
          </div>
          <RoundColumn title="4强" teams={rounds.sf} delay={0.6} />
          <div className="flex flex-col gap-6 justify-center text-gray-600">
            {rounds.sf.map((_, i) => i % 2 === 0 ? <span key={i} className="text-[10px]">→</span> : null)}
          </div>
          <RoundColumn title="决赛" teams={rounds.final} delay={0.8} />
          {/* 冠军 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: 'spring' }}
            className="flex flex-col items-center gap-1 min-w-[80px]"
          >
            <Crown className="w-5 h-5 text-gold mb-1" />
            <span className="text-[10px] font-bold text-gold">冠军</span>
            <div className="p-2 rounded-xl bg-gold/10 border border-gold/30 text-center">
              <Flag code={rounds.final[0]?.abbr || 'BRA'} size="md" />
              <div className="text-xs font-bold mt-1">{rounds.final[0]?.name || '巴西'}</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 冠军热门 */}
      <div className="border-t border-white/[0.05] pt-3 mt-3">
        <div className="flex items-center gap-1.5 mb-2">
          <Trophy className="w-3.5 h-3.5 text-gold" />
          <span className="text-xs font-bold text-gold">冠军热门</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {championTeams.map((t, i) => (
            <motion.div
              key={t.abbr}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.08 }}
              className="flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl bg-gold/5 border border-gold/10 flex-shrink-0"
            >
              <Flag code={t.abbr} size="md" />
              <span className="text-[10px] font-semibold">{TEAMS[t.abbr]?.cn}</span>
              <span className="text-[10px] font-bold text-gold">{t.prob}%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
