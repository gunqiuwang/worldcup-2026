import { motion } from 'framer-motion';

export function SkeletonCard() {
  return (
    <div className="glass-card p-4 mb-3 animate-pulse">
      <div className="flex justify-between items-center mb-3">
        <div>
          <div className="h-3 w-16 bg-white/5 rounded mb-1.5" />
          <div className="h-2 w-24 bg-white/5 rounded" />
        </div>
        <div className="flex gap-1.5">
          <div className="h-4 w-10 bg-white/5 rounded-full" />
          <div className="h-4 w-12 bg-white/5 rounded-full" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex-1 text-center">
          <div className="w-12 h-8 bg-white/5 rounded-lg mx-auto mb-1.5" />
          <div className="h-3 w-12 bg-white/5 rounded mx-auto" />
        </div>
        <div className="w-20 text-center">
          <div className="h-6 w-12 bg-white/5 rounded mx-auto" />
        </div>
        <div className="flex-1 text-center">
          <div className="w-12 h-8 bg-white/5 rounded-lg mx-auto mb-1.5" />
          <div className="h-3 w-12 bg-white/5 rounded mx-auto" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGroup() {
  return (
    <div className="glass-card p-4 mb-3 animate-pulse">
      <div className="h-4 w-16 bg-white/5 rounded mb-3" />
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-3 py-2 border-t border-white/[0.03]">
          <div className="h-3 w-3 bg-white/5 rounded" />
          <div className="w-6 h-4 bg-white/5 rounded" />
          <div className="h-3 w-16 bg-white/5 rounded" />
          <div className="flex-1" />
          <div className="h-3 w-4 bg-white/5 rounded" />
        </div>
      ))}
    </div>
  );
}

export function LoadingState({ text = '加载中...' }: { text?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16 gap-3"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
        className="w-8 h-8 border-2 border-glass-border border-t-gold rounded-full"
      />
      <span className="text-xs text-gray-500">{text}</span>
    </motion.div>
  );
}
