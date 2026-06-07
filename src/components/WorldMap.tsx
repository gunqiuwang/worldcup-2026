import { useMemo } from 'react';
import { TEAMS, GROUPS } from '../data/teams';

// 48 队的经纬度坐标
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

function lonLatToSvg(lon: number, lat: number): [number, number] {
  const x = ((lon + 180) / 360) * 800;
  const y = ((90 - lat) / 180) * 400;
  return [x, y];
}

export default function WorldMap() {
  const teamDots = useMemo(() => {
    const allTeams = Object.keys(GROUPS).flatMap((g) => GROUPS[g]);
    return allTeams.map((abbr) => {
      const coords = TEAM_COORDS[abbr];
      if (!coords) return null;
      const [x, y] = lonLatToSvg(coords[1], coords[0]);
      return { abbr, x, y };
    }).filter(Boolean);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-[0.06]" style={{ zIndex: 0 }}>
      <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        {/* 简化网格线 */}
        {Array.from({ length: 7 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 60} x2="800" y2={i * 60} stroke="currentColor" strokeWidth="0.3" className="text-gold/20" />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="400" stroke="currentColor" strokeWidth="0.3" className="text-gold/20" />
        ))}
        {/* 参赛国亮点 - 无动画 */}
        {teamDots.map((t) => t && (
          <circle key={t.abbr} cx={t.x} cy={t.y} r="2" className="fill-gold/50" />
        ))}
      </svg>
    </div>
  );
}
