// 世界杯图标 — 只保留实际使用的
export function SoccerBall({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M12 2C12 2 8 6 8 12s4 10 4 10" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M12 2c0 0 4 4 4 10s-4 10-4 10" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M2 12h20" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path d="M4 6.5c4 1 8 1 12 0" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <path d="M4 17.5c4-1 8-1 12 0" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    </svg>
  );
}
