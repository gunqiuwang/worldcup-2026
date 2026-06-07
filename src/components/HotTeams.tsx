import { motion } from 'framer-motion';
import { Flame, TrendingUp, ChevronRight } from 'lucide-react';
import { TEAMS } from '../data/teams';
import { TEAM_FORM } from '../data/team_form';
import { ELO_RATINGS, getEloTier, getEloTierColor } from '../data/elo_ratings';
import Flag from './Flag';
import { useMemo } from 'react';

interface HotTeam {
  abbr: string;
  name: string;
  heat: number;
  trend: 'up' | 'down' | 'flat';
  reason: string;
  formScore: number;
  elo: number;
  eloTier: string;
}

export default function HotTeams({ onTeamClick }: { onTeamClick?: (abbr: string) => void }) {
  const teams = useMemo<HotTeam[]>(() => {
    const data: HotTeam[] = [];

    for (const [abbr, team] of Object.entries(TEAMS)) {
      const form = TEAM_FORM[abbr];
      const elo = ELO_RATINGS[abbr];
      
      if (!form || !elo) continue;

      // 热度 = Elo 评分 (0-100 映射)
      const heat = Math.min(100, Math.max(0, Math.round((elo.elo - 800) / 13)));
      
      // 趋势
      let trend: 'up' | 'down' | 'flat' = 'flat';
      if (form.form_score >= 70) trend = 'up';
      else if (form.form_score < 40) trend = 'down';

      // 理由
      let reason = '';
      if (form.form_score >= 80) reason = '状态火热';
      else if (form.form_score >= 60) reason = '状态良好';
      else if (form.form_score >= 40) reason = '状态一般';
      else reason = '状态低迷';

      const tier = getEloTier(elo.elo);
      reason += ` · ${tier}级`;

      data.push({
        abbr,
        name: team.cn,
        heat,
        trend,
        reason,
        formScore: form.form_score,
        elo: elo.elo,
        eloTier: tier,
      });
    }

    // 按热度排序，取前 8
    return data.sort((a, b) => b.heat - a.heat).slice(0, 8);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-4 mb-3"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-red/10 flex items-center justify-center">
          <Flame className="w-4 h-4 text-red" />
        </div>
        <div>
          <h3 className="text-sm font-bold">热门球队</h3>
          <p className="text-[10px] text-gray-500">Elo + 状态综合热度</p>
        </div>
      </div>

      <div className="space-y-2">
        {teams.map((t, i) => (
          <motion.div
            key={t.abbr}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.03] transition cursor-pointer"
            onClick={() => onTeamClick?.(t.abbr)}
          >
            <div className="w-6 text-center text-[10px] font-bold text-gray-500">{i + 1}</div>
            <Flag code={t.abbr} size="md" />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold">{t.name}</div>
              <div className="text-[10px] text-gray-500 truncate">{t.reason}</div>
            </div>
            {/* 热度条 */}
            <div className="w-20 flex-shrink-0">
              <div className="flex items-center gap-1 mb-0.5">
                <span className={`text-[10px] font-bold ${getEloTierColor(t.eloTier)}`}>{t.heat}</span>
                {t.trend === 'up' && <TrendingUp className="w-3 h-3 text-green" />}
                {t.trend === 'down' && <TrendingUp className="w-3 h-3 text-red rotate-180" />}
              </div>
              <div className="h-1.5 rounded-full overflow-hidden bg-white/5">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${t.heat}%`,
                    background: `linear-gradient(90deg, #4FC3F7 0%, #FFD54F ${t.heat}%, #FF5252 100%)`,
                  }}
                />
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600 flex-shrink-0" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
