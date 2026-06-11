import { motion } from 'framer-motion';

interface DataPoint { label: string; value: number }

interface Dataset {
  data: DataPoint[];
  color: string;
  label?: string;
}

interface RadarChartProps {
  /** 单数据模式（兼容旧用法） */
  data?: DataPoint[];
  color?: string;
  /** 双数据叠加模式 */
  datasets?: Dataset[];
  size?: number;
}

export default function RadarChart({ data, color = '#FFD54F', datasets, size = 180 }: RadarChartProps) {
  // 统一成 datasets 格式
  const series: Dataset[] = datasets ?? (data ? [{ data, color }] : []);

  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2 - 24;
  const n = series[0]?.data.length ?? 0;
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

  // 计算每个 dataset 的数据点
  const allPaths = series.map((ds) => {
    const pts = ds.data.map((d, i) => {
      const r = (d.value / 100) * maxR;
      const angle = i * angleStep - Math.PI / 2;
      return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
    });
    return { ...ds, points: pts, path: pts.map((p) => `${p.x},${p.y}`).join(' ') };
  });

  // 标签位置（用第一个 dataset 的标签）
  const labelPoints = (series[0]?.data ?? []).map((d, i) => {
    const r = maxR + 16;
    const angle = i * angleStep - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), label: d.label };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* 网格 */}
      {gridPaths.map((points, i) => (
        <polygon key={i} points={points} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      ))}
      {/* 轴线 */}
      {Array.from({ length: n }, (_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        return (
          <line key={i} x1={cx} y1={cy} x2={cx + maxR * Math.cos(angle)} y2={cy + maxR * Math.sin(angle)} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
        );
      })}
      {/* 数据区域 — 按顺序画，后画的在上层 */}
      {allPaths.map((ds, idx) => (
        <motion.polygon
          key={`area-${idx}`}
          points={ds.path}
          fill={ds.color}
          fillOpacity={idx === 0 ? 0.18 : 0.12}
          stroke={ds.color}
          strokeWidth="1.5"
          strokeDasharray={idx === 0 ? 'none' : '4 2'}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: idx * 0.15 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
      {/* 数据点 */}
      {allPaths.map((ds, idx) =>
        ds.points.map((p, i) => (
          <motion.circle
            key={`dot-${idx}-${i}`}
            cx={p.x}
            cy={p.y}
            r="3"
            fill={ds.color}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + idx * 0.15 + i * 0.08 }}
          />
        ))
      )}
      {/* 标签 */}
      {labelPoints.map((lp, i) => (
        <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle" className="fill-gray-400" fontSize="9">
          {lp.label}
        </text>
      ))}
      {/* 图例 — 只在双数据时显示 */}
      {series.length > 1 && (
        <g transform={`translate(${cx - 30}, ${size - 10})`}>
          {series.map((ds, i) => (
            <g key={i} transform={`translate(${i * 60}, 0)`}>
              <line x1="0" y1="0" x2="12" y2="0" stroke={ds.color} strokeWidth="2" strokeDasharray={i === 0 ? 'none' : '4 2'} />
              <text x="15" y="0" dominantBaseline="middle" fill={ds.color} fontSize="8">{ds.label}</text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}
