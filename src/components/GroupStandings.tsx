import { motion } from 'framer-motion';
import { ArrowUpCircle, Shield } from 'lucide-react';
import { GROUPS, TEAMS } from '../data/teams';
import { GROUP_PREDICTIONS } from '../data/predictions';
import { getTeamForm } from '../data/team_form';
import { getEloRating, getEloTier, getEloTierColor } from '../data/elo_ratings';
import Flag from './Flag';
import RingChart from './RingChart';
import { SoccerBall } from './Icons';
import KnockoutPredict from './KnockoutPredict';
import ErrorBoundary from './ErrorBoundary';

function GroupTable({ group, teams }: { group: string; teams: string[] }) {
  const pred = GROUP_PREDICTIONS[group];
  
  // 按出线概率排序
  const sortedTeams = pred 
    ? [...pred.teams].sort((a, b) => b.advancement_pct - a.advancement_pct)
    : teams.map((t, i) => ({ team: t, advancement_pct: i < 2 ? 70 : 30 }));

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
        {sortedTeams.map((tp, i) => {
          const abbr = tp.team;
          const t = TEAMS[abbr];
          if (!t) return null;
          const qualify = i < 2;
          const prob = tp.advancement_pct;
          const form = getTeamForm(abbr);
          const elo = getEloRating(abbr);
          const eloTier = elo ? getEloTier(elo.elo) : '-';

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
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-500">FIFA #{t.fifa_rank}</span>
                  {elo && (
                    <span className={`text-[10px] font-bold ${getEloTierColor(eloTier)}`}>
                      {eloTier}
                    </span>
                  )}
                  {form && (
                    <span className={`text-[10px] ${
                      form.form_score >= 80 ? 'text-green' :
                      form.form_score >= 60 ? 'text-gold' :
                      'text-gray-500'
                    }`}>
                      {form.form_score}分
                    </span>
                  )}
                </div>
              </div>
              <RingChart value={prob} size={40} strokeWidth={3} color={qualify ? '#00E676' : '#5F6368'} showValue={false} />
              <div className={`text-xs font-bold w-10 text-right ${qualify ? 'text-green' : 'text-gray-500'}`}>
                {prob}%
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 预测积分表 */}
      {pred && (
        <div className="mt-3 pt-2 border-t border-white/[0.03]">
          <table className="w-full text-[10px]">
            <thead>
              <tr className="text-gray-500 uppercase tracking-wider">
                <th className="text-left py-1">球队</th>
                <th className="text-center py-1 px-0.5">预测分</th>
                <th className="text-center py-1 px-0.5">进球</th>
                <th className="text-center py-1 px-0.5">失球</th>
                <th className="text-center py-1 font-bold text-gold">出线%</th>
              </tr>
            </thead>
            <tbody>
              {pred.teams.map((tp) => {
                const t = TEAMS[tp.team];
                if (!t) return null;
                return (
                  <tr key={tp.team} className="border-t border-white/[0.02]">
                    <td className="py-1.5 flex items-center gap-1.5">
                      <Flag code={tp.team} size="sm" />
                      <span className="font-medium">{t.cn}</span>
                    </td>
                    <td className="text-center text-gray-400">{tp.avg_points.toFixed(1)}</td>
                    <td className="text-center text-gray-400">{tp.avg_goals_for.toFixed(1)}</td>
                    <td className="text-center text-gray-400">{tp.avg_goals_against.toFixed(1)}</td>
                    <td className="text-center font-extrabold text-gold">{tp.advancement_pct}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}

export default function GroupStandings() {
  const groups = Object.keys(GROUPS).sort();
  return (
    <div className="px-4">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-gold" />
        <h2 className="text-lg font-bold">排名</h2>
        <span className="text-xs text-gray-500">12 组 48 队</span>
      </div>
      {groups.map((g) => (
        <GroupTable key={g} group={g} teams={GROUPS[g]} />
      ))}
      {/* 淘汰赛预测 */}
      <ErrorBoundary fallback={<div className="glass-card p-4 text-center text-gray-500 text-sm">淘汰赛预测加载中...</div>}>
        <KnockoutPredict />
      </ErrorBoundary>
    </div>
  );
}
