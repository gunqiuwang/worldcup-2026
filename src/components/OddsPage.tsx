import { motion } from 'framer-motion';
import { TrendingUp, Lock } from 'lucide-react';

export default function OddsPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mb-6"
      >
        <TrendingUp className="w-8 h-8 text-gold" />
      </motion.div>
      <h3 className="text-lg font-bold mb-2">赔率分析</h3>
      <p className="text-sm text-gray-400 mb-4">开赛后开放（6月11日）</p>
      <div className="flex items-center gap-1.5 text-xs text-gray-500">
        <Lock className="w-3 h-3" />
        实时赔率反算胜率 · 盘口异动预警
      </div>
    </div>
  );
}
