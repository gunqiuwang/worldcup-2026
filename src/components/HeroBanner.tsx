import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { SCHEDULE } from '../data/schedule';
import { TEAMS, GROUPS } from '../data/teams';
import { calcMatchProbs, calcUpsetIndex } from '../utils/odds';
import Flag from './Flag';

// 48 队坐标（经纬度）
const COORDS: Record<string, [number, number]> = {
  ARG: [-34, -58], ALG: [36, 3], AUT: [48, 16], JOR: [31, 36],
  USA: [38, -97], PAR: [-23, -58], AUS: [-25, 134], TUR: [39, 35],
  BEL: [50, 4], EGY: [26, 30], IRN: [32, 53], NZL: [-41, 174],
  CAN: [56, -106], BIH: [44, 18], QAT: [25, 51], SUI: [47, 8],
  BRA: [-10, -55], HAI: [19, -72], MAR: [32, -5], SCO: [56, -4],
  GER: [51, 10], CUW: [12, -69], CIV: [7, -5], ECU: [-2, -78],
  COL: [4, -72], POR: [39, -8], COD: [-4, 21], UZB: [41, 65],
  ESP: [40, -4], CPV: [15, -24], KSA: [24, 45], URU: [-33, -56],
  ENG: [52, -1], CRO: [45, 16], GHA: [8, -1], PAN: [9, -80],
  MEX: [23, -102], CZE: [50, 15], KOR: [36, 128], RSA: [-29, 24],
  FRA: [47, 2], IRQ: [33, 44], NOR: [60, 10], SEN: [14, -14],
  NED: [52, 5], JPN: [36, 140], SWE: [62, 15], TUN: [34, 9],
};

function toSvg(lon: number, lat: number): [number, number] {
  return [((lon + 180) / 360) * 600, ((90 - lat) / 180) * 280];
}

// 连线：只连相邻大洲的代表队
const CONNECTIONS = [
  ['USA', 'MEX'], ['CAN', 'USA'], ['BRA', 'ARG'], ['ENG', 'FRA'],
  ['GER', 'ESP'], ['JPN', 'KOR'], ['AUS', 'NZL'], ['MAR', 'EGY'],
  ['NED', 'BEL'], ['CRO', 'ITA'], ['POR', 'BRA'], ['SEN', 'GHA'],
];

export default function HeroBanner() {
  const allTeams = useMemo(() => Object.keys(GROUPS).flatMap((g) => GROUPS[g]), []);

  const dots = useMemo(() => allTeams.map((abbr) => {
    const c = COORDS[abbr];
    if (!c) return null;
    const [x, y] = toSvg(c[1], c[0]);
    return { abbr, x, y };
  }).filter(Boolean), [allTeams]);

  const lines = useMemo(() => CONNECTIONS.map(([a, b]) => {
    const ca = COORDS[a], cb = COORDS[b];
    if (!ca || !cb) return null;
    const [x1, y1] = toSvg(ca[1], ca[0]);
    const [x2, y2] = toSvg(cb[1], cb[0]);
    return { x1, y1, x2, y2 };
  }).filter(Boolean), []);

  // 今日焦点比赛
  const focusMatch = useMemo(() => {
    for (const m of SCHEDULE) {
      if (!m.odds?.details) continue;
      const probs = calcMatchProbs(m.odds.details, m.home.abbr, m.away.abbr);
      if (!probs) continue;
      const upset = calcUpsetIndex(probs.homeProb, probs.awayProb);
      if (upset >= 40) return { ...m, probs, upset };
    }
    return null;
  }, []);

  const stats = [
    { value: '48', label: '参赛队伍' },
    { value: '104', label: '比赛场次' },
    { value: '16', label: '主办城市' },
    { value: '39', label: '赛事天数' },
    { value: '3', label: '主办国家' },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl mb-4" style={{ background: 'linear-gradient(180deg, #0a0e1a 0%, #0d1225 50%, #0B0F1A 100%)' }}>
      {/* 世界地图 SVG */}
      <div className="absolute inset-0 opacity-30">
        <svg viewBox="0 0 600 280" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          {/* 连线 */}
          {lines.map((l, i) => l && (
            <motion.line
              key={i}
              x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
              stroke="#FFD54F"
              strokeWidth="0.3"
              strokeOpacity="0.15"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: i * 0.1, duration: 1.5 }}
            />
          ))}
          {/* 光点 */}
          {dots.map((d) => d && (
            <g key={d.abbr}>
              <circle cx={d.x} cy={d.y} r="3" fill="#FFD54F" opacity="0.08">
                <animate attributeName="r" values="2;5;2" dur="4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.1;0.03;0.1" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx={d.x} cy={d.y} r="1.2" fill="#FFD54F" opacity="0.5" />
            </g>
          ))}
        </svg>
      </div>

      {/* 内容 */}
      <div className="relative z-10 px-4 py-5">
        {/* 顶部标题 */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[10px] text-gold/60 tracking-widest uppercase mb-1"
            >
              MatchLens AI · 智能分析平台
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg font-extrabold gold-gradient"
            >
              2026 世界杯
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="text-[11px] text-gray-400"
            >
              胜负预测与数据分析
            </motion.p>
          </div>
          {/* 主办国旗帜 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex gap-1.5"
          >
            <Flag code="CAN" size="sm" />
            <Flag code="USA" size="sm" />
            <Flag code="MEX" size="sm" />
          </motion.div>
        </div>

        {/* 统计条 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex justify-between mb-4 py-2.5 px-3 rounded-xl border border-gold/10 bg-white/[0.02]"
        >
          {stats.map((s, i) => (
            <div key={s.label} className="text-center">
              <div className="text-sm font-extrabold text-gold">{s.value}</div>
              <div className="text-[9px] text-gray-500">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* 比赛预测卡片 */}
        {focusMatch && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="p-3 rounded-xl border border-gold/15 bg-gradient-to-br from-white/[0.04] to-transparent"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-gold/70 font-semibold">MATCH PREDICTION</span>
              <span className="text-[10px] text-gray-500">{focusMatch.group}组</span>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Flag code={focusMatch.home.abbr} size="md" />
                <span className="text-xs font-bold">{focusMatch.home.name}</span>
              </div>
              <span className="text-[10px] text-gray-600 font-mono">VS</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold">{focusMatch.away.name}</span>
                <Flag code={focusMatch.away.abbr} size="md" />
              </div>
            </div>

            {/* 胜平负概率 */}
            <div className="flex gap-1.5 mb-2">
              {[
                { label: '主胜', value: focusMatch.probs.homeProb, color: 'from-green to-green-dark' },
                { label: '平局', value: focusMatch.probs.drawProb, color: 'from-gold to-gold-dark' },
                { label: '客胜', value: focusMatch.probs.awayProb, color: 'from-red to-red-dark' },
              ].map((p) => (
                <div key={p.label} className="flex-1 text-center">
                  <div className={`text-base font-extrabold bg-gradient-to-r ${p.color} bg-clip-text text-transparent`}>
                    {p.value}%
                  </div>
                  <div className="text-[9px] text-gray-500">{p.label}</div>
                </div>
              ))}
            </div>

            {/* 底部指标 */}
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/[0.03]">
                <span className="text-[9px] text-gray-500">爆冷风险</span>
                <span className={`text-[10px] font-bold ${
                  focusMatch.upset >= 60 ? 'text-red' : focusMatch.upset >= 40 ? 'text-gold' : 'text-green'
                }`}>
                  {focusMatch.upset >= 60 ? '高' : focusMatch.upset >= 40 ? '中' : '低'}
                </span>
              </div>
              <div className="flex-1 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/[0.03]">
                <span className="text-[9px] text-gray-500">模型信心</span>
                <span className="text-[10px] font-bold text-gold">78%</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* 底部渐变遮罩 */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
