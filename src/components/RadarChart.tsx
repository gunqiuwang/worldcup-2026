import { motion } from 'framer-motion';

interface RadarChartProps {
  data: { label: string; value: number }[]; // value 0-100
  size?: number;
  color?: string;
}

export default function RadarChart({ data, size = 160, color = '#FFD54F' }: RadarChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2 - 20;
  const n = data.length;
  const angleStep = (2 * Math.PI) / n;

  // 网格线
  const gridLevels = [0.25, 0.5, 0.75, 1];
  const gridPaths = gridLevels.map((level) => {
    const r = maxR * level;
    const points = Array.from({ length: n }, (_, i) => {
      const angle = i * angleStep - Math.PI / 2;
      return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
    });
    return points.join(' ');
  });

  // 数据点
  const dataPoints = data.map((d, i) => {
    const r = (d.value / 100) * maxR;
    const angle = i * angleStep - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });
  const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  // 标签位置
  const labelPoints = data.map((d, i) => {
    const r = maxR + 14;
    const angle = i * angleStep - Math.PI / 2;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      label: d.label,
    };
  });

  return (
    <svg width={size} height={size}>
      {/* 网格 */}
      {gridPaths.map((points, i) => (
        <polygon key={i} points={points} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      ))}
      {/* 轴线 */}
      {Array.from({ length: n }, (_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={cx + maxR * Math.cos(angle)}
            y2={cy + maxR * Math.sin(angle)}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.5"
          />
        );
      })}
      {/* 数据区域 */}
      <motion.polygon
        points={dataPath}
        fill={color}
        fillOpacity="0.15"
        stroke={color}
        strokeWidth="1.5"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />
      {/* 数据点 */}
      {dataPoints.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3"
          fill={color}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + i * 0.1 }}
        />
      ))}
      {/* 标签 */}
      {labelPoints.map((lp, i) => (
        <text
          key={i}
          x={lp.x}
          y={lp.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-gray-400"
          fontSize="9"
        >
          {lp.label}
        </text>
      ))}
    </svg>
  );
}
