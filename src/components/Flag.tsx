import { useState } from 'react';
import { getFlagUrl, getEmojiFlag, getTeamLogo } from '../utils/flags';

interface FlagProps {
  code: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showBadge?: boolean;
  className?: string;
}

const SIZES = {
  sm: { flag: 'w-5 h-3.5 rounded-sm', badge: 'w-4 h-4 -bottom-0.5 -right-0.5' },
  md: { flag: 'w-8 h-5 rounded', badge: 'w-5 h-5 -bottom-1 -right-1' },
  lg: { flag: 'w-12 h-8 rounded-lg', badge: 'w-6 h-6 -bottom-1 -right-1' },
  xl: { flag: 'w-16 h-10 rounded-xl', badge: 'w-8 h-8 -bottom-1.5 -right-1.5' },
};

export default function Flag({ code, size = 'md', showBadge = false, className = '' }: FlagProps) {
  const [imgError, setImgError] = useState(false);
  const s = SIZES[size];

  if (imgError) {
    return <span className={`text-${size === 'sm' ? 'base' : size === 'lg' ? '3xl' : '2xl'} ${className}`}>{getEmojiFlag(code)}</span>;
  }

  return (
    <div className={`relative inline-block ${className}`}>
      <img
        src={getFlagUrl(code)}
        alt={code}
        className={`${s.flag} object-cover shadow-sm`}
        onError={() => setImgError(true)}
        loading="lazy"
      />
      {showBadge && (
        <img
          src={getTeamLogo(code)}
          alt=""
          className={`absolute ${s.badge} rounded-full bg-bg-2 border border-glass-border object-contain`}
          loading="lazy"
        />
      )}
    </div>
  );
}
