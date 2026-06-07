// 足球主题 SVG 图标（Lucide 没有的）

export function SoccerBall({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2l3 6h-6l3-6zM2 12l6 3v-6l-6 3zM22 12l-6 3v-6l6 3zM12 22l-3-6h6l-3 6z" fill="currentColor" opacity="0.3" />
      <path d="M9.5 9.5L12 2l2.5 7.5H9.5zM14.5 14.5L12 22l-2.5-7.5h5z" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

export function Trophy({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 9H4a2 2 0 01-2-2V5a2 2 0 012-2h2M18 9h2a2 2 0 002-2V5a2 2 0 00-2-2h-2" />
      <path d="M6 3h12v6a6 6 0 01-12 0V3z" />
      <path d="M6 7H3.5A1.5 1.5 0 002 8.5v1A1.5 1.5 0 003.5 11H6M18 7h2.5A1.5 1.5 0 0122 8.5v1a1.5 1.5 0 01-1.5 1.5H18" />
      <path d="M12 15v3M8 21h8M12 18h0" strokeLinecap="round" />
    </svg>
  );
}

export function SoccerBoot({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 18l1-6 5-5 4 1 3-1 4 3v6a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <path d="M13 7l2 2M9 8l1.5 1.5M6 11l1 1" strokeLinecap="round" strokeWidth="1" opacity="0.5" />
      <path d="M3 18h18" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

export function Stadium({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="8" rx="9" ry="4" />
      <path d="M3 8v8c0 2.2 4 4 9 4s9-1.8 9-4V8" />
      <path d="M3 12c0 2.2 4 4 9 4s9-1.8 9-4" opacity="0.3" />
    </svg>
  );
}

export function Whistle({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="14" cy="12" r="6" />
      <path d="M3 6l5 3 3 3" strokeLinecap="round" />
      <circle cx="14" cy="12" r="2" fill="currentColor" opacity="0.2" />
    </svg>
  );
}

export function Jersey({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 2l-6 4v4l3 1v9a2 2 0 002 2h10a2 2 0 002-2v-9l3-1V6l-6-4" />
      <path d="M8 2c0 2.2 1.8 4 4 4s4-1.8 4-4" />
      <path d="M10 14h4" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

export function StadiumField({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="1" />
      <line x1="12" y1="4" x2="12" y2="20" />
      <circle cx="12" cy="12" r="3" />
      <rect x="2" y="8" width="4" height="8" rx="0.5" opacity="0.3" />
      <rect x="18" y="8" width="4" height="8" rx="0.5" opacity="0.3" />
    </svg>
  );
}
