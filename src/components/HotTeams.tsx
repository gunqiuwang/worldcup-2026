import { motion } from 'framer-motion';
import { Flame, TrendingUp, ChevronRight } from 'lucide-react';
import { TEAMS } from '../data/teams';
import { GROUP_PREDICTIONS } from '../data/predictions';
import Flag from './Flag';
import { useMemo } from 'react';

const TIER_COLORS: Record<string, string> = {
  S: 'text-red-400', A: 'text-gold', B: 'text-blue-400', C: 'text-gray-500',
};

const TIER_HEAT: Record<string, number> = { S: 95, A: 75, B: 50, C: 25 };

export default function HotTeams({ onTeamClick }: { onTeamClick?: (abbr: string) => void }) {
  const teams = useMemo(() => {
    const data = Object.entries(TEAMS).map(([abbr, team]) => {
      const heat = TIER_HEAT[team.tier] || 25;
      const trendDir = team.trend === '↑' ? 'up' : team.trend === '↓' ? 'down' : 'flat';
      const reason = team.tier === 'S' ? '夺冠热门' : team.tier === 'A' ? '争冠实力' : team.tier === 'B' ? '中游球队' : '弱旅';
      return { abbr, name: team.cn, heat, trend: trendDir, reason, tier: team.tier, trendSymbol: team.trend };
    });
    return data.sort((a, b) => b.heat - a.heat).slice(0, 8);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 mb-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-xl bg-red/10 flex items-center justify-center">
          <Flame className="w-4 h-4 text-red" />
        </div>
        <div>
          <h3 className="text-sm font-bold">热门球队</h3>
          <p className="text-[10px] text-gray-500">赔率实力等级</p>
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
            <div className="w-20 flex-shrink-0">
              <div className="flex items-center gap-1 mb-0.5">
                <span className={`text-[10px] font-bold ${TIER_COLORS[t.tier]}`}>{t.tier}</span>
                {t.trend === 'up' && <TrendingUp className="w-3 h-3 text-green" />}
                {t.trend === 'down' && <TrendingUp className="w-3 h-3 text-red rotate-180" />}
              </div>
              <div className="h-1.5 rounded-full overflow-hidden bg-white/5">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${t.heat}%`, background: `linear-gradient(90deg, #4FC3F7 0%, #FFD54F ${t.heat}%, #FF5252 100%)` }} />
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600 flex-shrink-0" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
