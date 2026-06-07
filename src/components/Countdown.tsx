import { motion } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown';
import { Flame, Trophy } from 'lucide-react';

export default function Countdown() {
  const cd = useCountdown();

  if (cd.isStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5 mx-4 mb-4 text-center relative overflow-hidden"
      >
        {/* 背景光效 */}
        <div className="absolute inset-0 bg-gradient-to-r from-red/5 via-gold/5 to-red/5 animate-pulse" />
        
        <div className="relative flex items-center justify-center gap-2 text-lg font-bold text-gold">
          <Flame className="w-5 h-5 animate-bounce" />
          <span className="gold-gradient text-xl">赛事进行中</span>
          <Flame className="w-5 h-5 animate-bounce" />
        </div>
      </motion.div>
    );
  }

  const units = [
    { value: cd.days, label: '天' },
    { value: cd.hours, label: '时' },
    { value: cd.minutes, label: '分' },
    { value: cd.seconds, label: '秒' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 mx-4 mb-4 text-center relative overflow-hidden"
    >
      {/* 顶部装饰线 */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
      {/* 标题 */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Trophy className="w-4 h-4 text-gold" />
        <span className="text-xs text-gray-400 tracking-widest uppercase font-medium">FIFA World Cup 2026</span>
        <Trophy className="w-4 h-4 text-gold" />
      </div>
      
      {/* 倒计时数字 */}
      <div className="flex justify-center gap-3">
        {units.map((u, i) => (
          <div key={u.label} className="flex items-center gap-3">
            <div className="flex flex-col items-center min-w-[56px]">
              <motion.div
                key={u.value}
                initial={{ scale: 1.1, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-3xl font-extrabold tabular-nums leading-none"
                style={{ 
                  color: 'var(--gold)',
                  textShadow: '0 0 20px rgba(255,213,79,0.3)'
                }}
              >
                {String(u.value).padStart(2, '0')}
              </motion.div>
              <div className="text-[10px] text-gray-500 mt-1 tracking-wide font-medium">{u.label}</div>
            </div>
            {i < 3 && (
              <motion.span 
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-xl text-gray-600 font-light"
              >
                :
              </motion.span>
            )}
          </div>
        ))}
      </div>
      
      {/* 底部提示 */}
      <div className="mt-4 text-[10px] text-gray-500">
        距开赛还有 <span className="text-gold font-semibold">{cd.days}</span> 天
      </div>
    </motion.div>
  );
}
