import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Flag from './Flag';

interface Props {
  onEnter: () => void;
}

/* ── 浮动粒子 ── */
function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
    opacity: Math.random() * 0.4 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -100, 0], opacity: [p.opacity, p.opacity * 2, p.opacity], scale: [1, 1.5, 1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ── 光晕 ── */
function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(100,150,255,0.15) 0%, transparent 70%)', left: '-10%', top: '-20%' }}
        animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,200,100,0.1) 0%, transparent 70%)', right: '-15%', bottom: '-10%' }}
        animate={{ x: [0, -40, 0], y: [0, -50, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

/* ── 星光闪烁 ── */
function TwinklingStars() {
  const stars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size, boxShadow: '0 0 6px rgba(255,255,255,0.6)' }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2 + Math.random() * 2, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export default function LandingPage({ onEnter }: Props) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {/* 背景图 */}
      <picture>
        <source media="(max-width: 640px)" srcSet="/hero-mobile.jpg" />
        <source media="(min-width: 641px)" srcSet="/hero-web.jpg" />
        <img src="/hero-web.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
      </picture>

      {/* 暗色遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/75" />

      {/* 动画层 */}
      <AuroraBackground />
      <FloatingParticles />
      <TwinklingStars />

      {/* 内容 */}
      <div className="relative z-10 flex flex-col h-full max-w-[560px] mx-auto px-6">
        {/* 顶部品牌 */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="pt-12 text-center"
        >
          <motion.h1
            className="text-2xl font-extrabold tracking-tight"
            animate={{ textShadow: ['0 0 20px rgba(255,215,0,0.3)', '0 0 40px rgba(255,215,0,0.5)', '0 0 20px rgba(255,215,0,0.3)'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="bg-gradient-to-r from-gold via-yellow-200 to-gold bg-clip-text text-transparent">MatchLens</span>
            <span className="text-white/80 text-lg ml-1.5 font-light">AI</span>
          </motion.h1>
          <motion.p className="text-[11px] text-white/40 tracking-widest mt-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            2026 WORLD CUP ANALYSIS
          </motion.p>
        </motion.div>

        {/* 主标题 */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }} className="mt-auto mb-8">
          <motion.h2 className="text-xl font-bold text-white leading-tight mb-3" initial={{ x: -20 }} animate={{ x: 0 }} transition={{ delay: 1, duration: 0.6 }}>
            用数据读懂<br />每一场胜负
          </motion.h2>
          <motion.p className="text-xs text-white/50 leading-relaxed" initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}>
            融合赔率变化、球队状态、历史交锋与 AI 模型评分，<br />
            为 104 场比赛生成概率预测、爆冷指数与风险预警。
          </motion.p>
        </motion.div>

        {/* 主办国 */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4, duration: 0.6 }} className="flex items-center gap-3 mb-6">
          <span className="text-[10px] text-white/30 tracking-wider">HOST</span>
          <div className="flex items-center gap-1.5">
            <Flag code="CAN" size="sm" />
            <Flag code="USA" size="sm" />
            <Flag code="MEX" size="sm" />
          </div>
          <div className="h-3 w-px bg-white/10 mx-1" />
          <span className="text-[10px] text-white/30">48 队 · 104 场 · 39 天</span>
        </motion.div>

        {/* CTA 按钮 — 毛玻璃风格 */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={onEnter}
          className="w-full py-4 rounded-2xl mb-10 relative overflow-hidden group cursor-pointer
            bg-white/[0.06] backdrop-blur-xl
            border border-white/[0.12]
            hover:bg-white/[0.1] hover:border-gold/30
            transition-all duration-300"
        >
          {/* 底部金色光晕 */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(255,213,79,0.15) 0%, transparent 70%)' }} />

          {/* 顶部高光线 */}
          <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* 文字 */}
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span className="text-sm font-semibold bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
              进入倒计时
            </span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronRight className="w-4 h-4 text-gold/70" />
            </motion.div>
          </span>
        </motion.button>

        {/* 底部小字 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="text-center pb-6"
        >
          <span className="text-[9px] text-white/20 tracking-wider">MATCHLENS AI · DATA-DRIVEN PREDICTIONS</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
