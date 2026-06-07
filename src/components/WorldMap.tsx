import { useMemo } from 'react';
import { TEAMS, GROUPS } from '../data/teams';

// 48 队的经纬度坐标（简化）
const TEAM_COORDS: Record<string, [number, number]> = {
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

// 经纬度 → SVG 坐标（简单墨卡托投影）
function lonLatToSvg(lon: number, lat: number): [number, number] {
  const x = ((lon + 180) / 360) * 800;
  const y = ((90 - lat) / 180) * 400;
  return [x, y];
}

// 简化版世界大陆轮廓 SVG path
const WORLD_PATHS = [
  // 北美洲
  'M80,60 L120,50 L160,55 L200,65 L220,80 L230,100 L220,120 L200,140 L180,160 L160,165 L140,170 L120,160 L100,140 L90,120 L80,100 Z',
  // 南美洲
  'M180,180 L200,170 L220,175 L240,190 L250,210 L255,230 L250,260 L240,280 L220,300 L200,310 L190,290 L185,260 L180,230 L175,210 Z',
  // 欧洲
  'M370,50 L400,45 L430,50 L450,55 L460,70 L455,85 L440,90 L420,95 L400,90 L380,85 L370,75 Z',
  // 非洲
  'M380,100 L420,95 L460,100 L480,120 L485,150 L480,180 L470,210 L450,240 L430,260 L410,270 L390,260 L380,240 L375,210 L370,180 L375,150 L380,120 Z',
  // 亚洲
  'M460,40 L520,35 L580,40 L640,50 L680,60 L700,80 L710,100 L700,120 L680,130 L640,135 L600,130 L560,120 L520,110 L490,100 L470,85 L460,65 Z',
  // 大洋洲
  'M640,230 L680,220 L720,225 L740,240 L735,260 L720,275 L700,280 L670,275 L650,260 L645,245 Z',
];

export default function WorldMap() {
  const teamDots = useMemo(() => {
    const allTeams = Object.keys(GROUPS).flatMap((g) => GROUPS[g]);
    return allTeams.map((abbr) => {
      const coords = TEAM_COORDS[abbr];
      if (!coords) return null;
      const [x, y] = lonLatToSvg(coords[1], coords[0]);
      return { abbr, x, y, name: TEAMS[abbr]?.cn || abbr };
    }).filter(Boolean);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.08]">
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* 大陆轮廓 */}
        {WORLD_PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
            className="text-gold/30"
          />
        ))}

        {/* 参赛国亮点 */}
        {teamDots.map((t) => t && (
          <g key={t.abbr}>
            {/* 外发光 */}
            <circle cx={t.x} cy={t.y} r="4" className="fill-gold/20">
              <animate attributeName="r" values="3;6;3" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" />
            </circle>
            {/* 核心点 */}
            <circle cx={t.x} cy={t.y} r="1.5" className="fill-gold/60" />
          </g>
        ))}
      </svg>
    </div>
  );
}
