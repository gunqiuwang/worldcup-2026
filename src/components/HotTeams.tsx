import { motion } from 'framer-motion';
import { Flame, TrendingUp, ChevronRight } from 'lucide-react';
import { TEAMS } from '../data/teams';
import Flag from './Flag';
import { useMemo } from 'react';

interface HotTeam {
  abbr: string;
  name: string;
  heat: number; // 0-100
  trend: 'up' | 'down' | 'flat';
  reason: string;
}

export default function HotTeams({ onTeamClick }: { onTeamClick?: (abbr: string) => void }) {
  const teams = useMemo<HotTeam[]>(() => {
    // 基于 FIFA 排名 + 知名度生成热度
    const data: HotTeam[] = [
      { abbr: 'BRA', name: '巴西', heat: 95, trend: 'up', reason: '5次冠军热门' },
      { abbr: 'ARG', name: '阿根廷', heat: 92, trend: 'up', reason: '卫冕冠军梅西接班人' },
      { abbr: 'FRA', name: '法国', heat: 90, trend: 'flat', reason: '姆巴佩领衔' },
      { abbr: 'ENG', name: '英格兰', heat: 88, trend: 'up', reason: '欧洲杯亚军' },
      { abbr: 'GER', name: '德国', heat: 85, trend: 'down', reason: '东道主世界杯冠军' },
      { abbr: 'ESP', name: '西班牙', heat: 83, trend: 'up', reason: '欧洲杯冠军' },
    ];
    return data;
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
          <p className="text-[10px] text-gray-500">关注度最高的球队</p>
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
                <span className="text-[10px] font-bold text-gold">{t.heat}</span>
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
