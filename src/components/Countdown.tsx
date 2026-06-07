import { motion } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown';
import { Flame } from 'lucide-react';

export default function Countdown() {
  const cd = useCountdown();

  if (cd.isStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5 mx-4 mb-4 text-center"
      >
        <div className="flex items-center justify-center gap-2 text-lg font-bold text-gold">
          <Flame className="w-5 h-5" />
          赛事进行中
          <Flame className="w-5 h-5" />
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
      className="glass-card p-5 mx-4 mb-4 text-center"
    >
      <div className="text-xs text-gray-400 mb-3 tracking-widest uppercase">距开赛</div>
      <div className="flex justify-center gap-3">
        {units.map((u, i) => (
          <div key={u.label} className="flex items-center gap-3">
            <div className="flex flex-col items-center min-w-[56px]">
              <motion.div
                key={u.value}
                initial={{ scale: 1.1, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-3xl font-extrabold text-gold tabular-nums leading-none"
              >
                {String(u.value).padStart(2, '0')}
              </motion.div>
              <div className="text-[10px] text-gray-500 mt-1 tracking-wide">{u.label}</div>
            </div>
            {i < 3 && <span className="text-xl text-gray-600 font-light">:</span>}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
