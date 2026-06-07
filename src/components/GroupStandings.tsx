import { motion } from 'framer-motion';
import { ArrowUpCircle, Shield } from 'lucide-react';
import { GROUPS, TEAMS } from '../data/teams';
import Flag from './Flag';
import RingChart from './RingChart';
import { SoccerBall } from './Icons';

// 模拟出线概率（开赛后用真实数据）
const MOCK_PROB: Record<string, number[]> = {
  A: [85, 60, 35, 20], B: [75, 65, 40, 20], C: [70, 55, 45, 30],
  D: [65, 55, 50, 30], E: [80, 60, 35, 25], F: [75, 60, 40, 25],
  G: [70, 55, 45, 30], H: [80, 65, 30, 25], I: [75, 60, 40, 25],
  J: [65, 55, 50, 30], K: [80, 60, 35, 25], L: [70, 55, 45, 30],
};

function GroupTable({ group, teams }: { group: string; teams: string[] }) {
  const probs = MOCK_PROB[group] || [25, 25, 25, 25];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 mb-3"
    >
      <div className="flex items-center gap-2 mb-4">
        <SoccerBall className="w-4 h-4 text-gold" />
        <span className="text-sm font-bold text-gold">{group} 组</span>
        <span className="text-[10px] text-gray-500">({teams.length} 队)</span>
      </div>

      <div className="space-y-2">
        {teams.map((abbr, i) => {
          const t = TEAMS[abbr];
          if (!t) return null;
          const qualify = i < 2;
          const prob = probs[i];

          return (
            <motion.div
              key={abbr}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`flex items-center gap-3 p-2 rounded-xl transition ${
                qualify ? 'bg-green/5' : 'hover:bg-white/[0.02]'
              }`}
            >
              <div className={`w-5 text-center font-bold text-xs ${qualify ? 'text-green' : 'text-gray-500'}`}>
                {qualify ? <ArrowUpCircle className="w-4 h-4 mx-auto" /> : i + 1}
              </div>
              <Flag code={abbr} size="sm" />
              <div className="flex-1">
                <div className="text-sm font-semibold">{t.cn}</div>
                <div className="text-[10px] text-gray-500">FIFA #{t.fifa_rank}</div>
              </div>
              <RingChart value={prob} size={40} strokeWidth={3} color={qualify ? '#00E676' : '#5F6368'} showValue={false} />
              <div className={`text-xs font-bold w-10 text-right ${qualify ? 'text-green' : 'text-gray-500'}`}>
                {prob}%
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* table header */}
      <div className="mt-3 pt-2 border-t border-white/[0.03]">
        <table className="w-full text-[10px]">
          <thead>
            <tr className="text-gray-500 uppercase tracking-wider">
              <th className="text-left py-1">球队</th>
              <th className="text-center py-1 px-0.5">赛</th>
              <th className="text-center py-1 px-0.5">胜</th>
              <th className="text-center py-1 px-0.5">平</th>
              <th className="text-center py-1 px-0.5">负</th>
              <th className="text-center py-1 px-0.5">净</th>
              <th className="text-center py-1 font-bold text-gold">分</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((abbr, i) => {
              const t = TEAMS[abbr];
              if (!t) return null;
              return (
                <tr key={abbr} className="border-t border-white/[0.02]">
                  <td className="py-1.5 flex items-center gap-1.5">
                    <Flag code={abbr} size="sm" />
                    <span className="font-medium">{t.cn}</span>
                  </td>
                  <td className="text-center text-gray-400">0</td>
                  <td className="text-center text-gray-400">0</td>
                  <td className="text-center text-gray-400">0</td>
                  <td className="text-center text-gray-400">0</td>
                  <td className="text-center text-gray-400">0</td>
                  <td className="text-center font-extrabold text-gold">0</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default function GroupStandings() {
  const groups = Object.keys(GROUPS).sort();
  return (
    <div className="px-4">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-gold" />
        <h2 className="text-lg font-bold">小组积分榜</h2>
        <span className="text-xs text-gray-500">12 组 48 队</span>
      </div>
      {groups.map((g) => (
        <GroupTable key={g} group={g} teams={GROUPS[g]} />
      ))}
    </div>
  );
}
