import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Target, Calendar, MapPin, TrendingUp, Activity } from 'lucide-react';
import { TEAMS } from '../data/teams';
import { SCHEDULE } from '../data/schedule';
import { getPrediction } from '../data/predictions';
import { getTeamForm, getFormDescription, getLast5String } from '../data/team_form';
import { calcMatchProbs, calcUpsetIndex } from '../utils/odds';
import Flag from './Flag';

interface Props {
  teamAbbr: string;
  onBack: () => void;
  onMatchClick?: (matchId: string) => void;
}

export default function TeamPage({ teamAbbr, onBack, onMatchClick }: Props) {
  const team = TEAMS[teamAbbr];
  if (!team) return null;

  const teamMatches = SCHEDULE.filter(
    (m) => m.home.abbr === teamAbbr || m.away.abbr === teamAbbr
  );

  // 获取球队状态
  const form = getTeamForm(teamAbbr);

  // 晋级概率（基于FIFA排名）
  const advanceProb = Math.min(95, Math.max(5, Math.round((100 - team.fifa_rank) * 1.1)));

  // 该队所有比赛的平均爆冷指数
  const avgUpset = (() => {
    const upsets = teamMatches
      .filter((m) => m.odds?.details)
      .map((m) => {
        const pred = getPrediction(m.id);
        if (pred) return pred.upset_index;
        const probs = calcMatchProbs(m.odds!.details!, m.home.abbr, m.away.abbr);
        if (!probs) return 0;
        return calcUpsetIndex(probs.homeProb, probs.awayProb);
      });
    return upsets.length > 0 ? Math.round(upsets.reduce((a, b) => a + b, 0) / upsets.length) : 0;
  })();

  // 历史最佳（模拟）
  const bestResult = team.fifa_rank <= 5 ? '🏆 冠军'
    : team.fifa_rank <= 15 ? '🥈 亚军/四强'
    : team.fifa_rank <= 30 ? '⚽ 16强'
    : '🎯 小组赛';

  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.2 }}
      className="px-4"
    >
      {/* 返回按钮 */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        返回
      </button>

      {/* 球队头部 */}
      <div className="glass-card p-4 mb-3">
        <div className="flex items-center gap-4 mb-4">
          <Flag code={teamAbbr} size="xl" />
          <div>
            <h2 className="text-xl font-bold">{team.cn}</h2>
            <div className="text-xs text-gray-400">
              FIFA 排名 #{team.fifa_rank}
            </div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-2xl font-extrabold text-gold">{advanceProb}%</div>
            <div className="text-[10px] text-gray-500">出线概率</div>
          </div>
        </div>

        {/* 球队状态卡片 */}
        {form && (
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-green" />
              <span className="text-sm font-semibold">近期状态</span>
              <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${
                form.form_score >= 80 ? 'bg-green/20 text-green' :
                form.form_score >= 60 ? 'bg-gold/20 text-gold' :
                form.form_score >= 40 ? 'bg-gray-500/20 text-gray-400' :
                'bg-red/20 text-red'
              }`}>
                {getFormDescription(form)}
              </span>
            </div>
            
            {/* 最近 5 场 */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] text-gray-500">最近5场:</span>
              <div className="flex gap-1">
                {form.last5.map((result, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      result === 'W' ? 'bg-green/20 text-green' :
                      result === 'D' ? 'bg-gold/20 text-gold' :
                      'bg-red/20 text-red'
                    }`}
                  >
                    {result}
                  </div>
                ))}
              </div>
              <span className="ml-auto text-[10px] text-gray-400">
                {form.wins}胜 {form.draws}平 {form.losses}负
              </span>
            </div>
            
            {/* 进攻/防守 */}
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div className="text-center p-1.5 rounded-lg bg-white/[0.02]">
                <div className="text-sm font-bold text-green">{form.goals_scored}</div>
                <div className="text-[10px] text-gray-500">总进球</div>
              </div>
              <div className="text-center p-1.5 rounded-lg bg-white/[0.02]">
                <div className="text-sm font-bold text-red">{form.goals_conceded}</div>
                <div className="text-[10px] text-gray-500">总失球</div>
              </div>
              <div className="text-center p-1.5 rounded-lg bg-white/[0.02]">
                <div className="text-sm font-bold text-blue-400">{form.clean_sheets}</div>
                <div className="text-[10px] text-gray-500">零封</div>
              </div>
            </div>
          </div>
        )}

        {/* 数据卡片 */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Trophy, label: '历史最佳', value: bestResult, color: 'text-gold' },
            { icon: Target, label: '爆冷指数', value: `${avgUpset}`, color: 'text-red' },
            { icon: TrendingUp, label: '状态分数', value: form ? `${form.form_score}` : '-', color: 'text-green' },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.05] text-center"
              >
                <Icon className={`w-4 h-4 ${card.color} mx-auto mb-1`} />
                <div className="text-xs font-bold">{card.value}</div>
                <div className="text-[10px] text-gray-500">{card.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 赛程 */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-gold" />
          <span className="text-sm font-bold">赛程</span>
          <span className="text-[10px] text-gray-500 ml-auto">{teamMatches.length} 场</span>
        </div>

        <div className="space-y-2">
          {teamMatches.map((m) => {
            const isHome = m.home.abbr === teamAbbr;
            const opponent = isHome ? m.away : m.home;
            const pred = getPrediction(m.id);
            
            // 获取该队的胜率
            let winProb = 0;
            if (pred) {
              winProb = isHome ? pred.home_win : pred.away_win;
            } else if (m.odds?.details) {
              const probs = calcMatchProbs(m.odds.details, m.home.abbr, m.away.abbr);
              if (probs) {
                winProb = isHome ? probs.homeProb : probs.awayProb;
              }
            }

            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-gold/20 transition cursor-pointer"
                onClick={() => onMatchClick?.(m.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-gray-500">
                    {m.group}组 · {formatDate(m.date)}
                  </span>
                  <span className="text-[10px] text-gray-600">{m.venue}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flag code={m.home.abbr} size="sm" />
                    <span className="text-xs font-semibold">{m.home.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {pred && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        pred.confidence === 'high' ? 'bg-green/20 text-green' :
                        pred.confidence === 'medium' ? 'bg-gold/20 text-gold' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {pred.confidence === 'high' ? '高置信' : pred.confidence === 'medium' ? '中置信' : '低置信'}
                      </span>
                    )}
                    <span className={`text-sm font-bold ${
                      winProb > 50 ? 'text-green' : winProb > 40 ? 'text-gold' : 'text-red'
                    }`}>
                      {winProb}%
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold">{m.away.name}</span>
                    <Flag code={m.away.abbr} size="sm" />
                  </div>
                </div>

                {/* 爆冷指数 */}
                {pred && pred.upset_index > 50 && (
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-[10px] text-red">🔥</span>
                    <div className="flex-1 h-0.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-red rounded-full"
                        style={{ width: `${pred.upset_index}%` }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
