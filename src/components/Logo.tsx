export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 外圈 — 镜头光圈 */}
      <circle cx="16" cy="16" r="14" stroke="url(#goldGrad)" strokeWidth="1.5" opacity="0.6" />
      <circle cx="16" cy="16" r="11" stroke="url(#goldGrad)" strokeWidth="1" opacity="0.3" />
      
      {/* 足球主体 */}
      <circle cx="16" cy="16" r="8" fill="url(#goldGrad)" opacity="0.15" />
      <circle cx="16" cy="16" r="8" stroke="url(#goldGrad)" strokeWidth="1.2" />
      
      {/* 足球五边形纹理 */}
      <path d="M16 10L13 13L14.5 17H17.5L19 13L16 10Z" fill="url(#goldGrad)" opacity="0.4" />
      <path d="M11 15L10 18L12 20H14.5L13 17L11 15Z" fill="url(#goldGrad)" opacity="0.3" />
      <path d="M21 15L23 18L22 20H19.5L19 17L21 15Z" fill="url(#goldGrad)" opacity="0.3" />
      <path d="M13 21L14.5 24L17.5 24L19 21H13Z" fill="url(#goldGrad)" opacity="0.25" />
      
      {/* 中心高光 */}
      <circle cx="14.5" cy="13.5" r="1.5" fill="white" opacity="0.15" />
      
      {/* 镜头十字光 */}
      <line x1="16" y1="3" x2="16" y2="6" stroke="url(#goldGrad)" strokeWidth="0.8" opacity="0.5" />
      <line x1="16" y1="26" x2="16" y2="29" stroke="url(#goldGrad)" strokeWidth="0.8" opacity="0.5" />
      <line x1="3" y1="16" x2="6" y2="16" stroke="url(#goldGrad)" strokeWidth="0.8" opacity="0.5" />
      <line x1="26" y1="16" x2="29" y2="16" stroke="url(#goldGrad)" strokeWidth="0.8" opacity="0.5" />
      
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#FFD54F" />
          <stop offset="100%" stopColor="#FFA726" />
        </linearGradient>
      </defs>
    </svg>
  );
}
