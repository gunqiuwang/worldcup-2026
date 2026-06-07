import { motion } from 'framer-motion';
import { Trophy, ArrowUpCircle } from 'lucide-react';
import { GROUPS, TEAMS } from '../data/teams';

function GroupTable({ group, teams }: { group: string; teams: string[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 mb-3"
    >
      <div className="flex items-center gap-2 mb-3">
        <Trophy className="w-4 h-4 text-gold" />
        <span className="text-sm font-bold text-gold">{group} 组</span>
        <span className="text-[10px] text-gray-500">({teams.length} 队)</span>
      </div>

      <table className="w-full text-xs">
        <thead>
          <tr className="text-[10px] text-gray-500 uppercase tracking-wider">
            <th className="text-left py-1 pr-2">#</th>
            <th className="text-left py-1">球队</th>
            <th className="text-center py-1 px-1">赛</th>
            <th className="text-center py-1 px-1">胜</th>
            <th className="text-center py-1 px-1">平</th>
            <th className="text-center py-1 px-1">负</th>
            <th className="text-center py-1 px-1">进</th>
            <th className="text-center py-1 px-1">失</th>
            <th className="text-center py-1 px-1">净</th>
            <th className="text-center py-1 pl-1 font-bold text-gold">分</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((abbr, i) => {
            const t = TEAMS[abbr];
            if (!t) return null;
            const qualify = i < 2;
            return (
              <tr key={abbr} className="border-t border-white/[0.03]">
                <td className={`py-2 pr-2 font-bold ${qualify ? 'text-green' : 'text-gray-500'}`}>
                  <div className="flex items-center gap-1">
                    {qualify && <ArrowUpCircle className="w-3 h-3" />}
                    {i + 1}
                  </div>
                </td>
                <td className="py-2">
                  <div className="flex items-center gap-2 font-semibold">
                    <span className="text-base">{t.flag}</span>
                    {t.cn}
                  </div>
                </td>
                <td className="text-center py-2 text-gray-400">0</td>
                <td className="text-center py-2 text-gray-400">0</td>
                <td className="text-center py-2 text-gray-400">0</td>
                <td className="text-center py-2 text-gray-400">0</td>
                <td className="text-center py-2 text-gray-400">0</td>
                <td className="text-center py-2 text-gray-400">0</td>
                <td className="text-center py-2 text-gray-400">0</td>
                <td className="text-center py-2 pl-1 font-extrabold text-gold">0</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </motion.div>
  );
}

export default function GroupStandings() {
  const groups = Object.keys(GROUPS).sort();
  return (
    <div className="px-4">
      {groups.map((g) => (
        <GroupTable key={g} group={g} teams={GROUPS[g]} />
      ))}
    </div>
  );
}
