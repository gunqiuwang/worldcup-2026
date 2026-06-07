import { useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Globe } from 'lucide-react';
import Flag from './Flag';

interface Props {
  onEnter: () => void;
}

/* ── 背景视频URL（可换成世界杯主题视频） ── */
const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4';

/* ── 视频无缝循环 + 淡入淡出 ── */
function useVideoFade(videoRef: React.RefObject<HTMLVideoElement | null>) {
  const fadeAnim = useRef(0);
  const fadingOut = useRef(false);

  const animateFade = useCallback((target: number, duration: number) => {
    const video = videoRef.current;
    if (!video) return;
    cancelAnimationFrame(fadeAnim.current);
    const start = performance.now();
    const from = parseFloat(video.style.opacity || '1');
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      video.style.opacity = String(from + (target - from) * t);
      if (t < 1) fadeAnim.current = requestAnimationFrame(step);
    };
    fadeAnim.current = requestAnimationFrame(step);
  }, [videoRef]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.style.opacity = '0';

    const onCanPlay = () => { video.play().catch(() => {}); animateFade(1, 500); };
    const onTimeUpdate = () => {
      if (!video.duration || fadingOut.current) return;
      if (video.duration - video.currentTime <= 0.55) { fadingOut.current = true; animateFade(0, 500); }
    };
    const onEnded = () => {
      fadingOut.current = false;
      video.style.opacity = '0';
      setTimeout(() => { video.currentTime = 0; video.play().catch(() => {}); animateFade(1, 500); }, 100);
    };

    video.addEventListener('canplay', onCanPlay, { once: true });
    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);
    return () => {
      cancelAnimationFrame(fadeAnim.current);
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
    };
  }, [videoRef, animateFade]);
}

/* ── 浮动粒子 ── */
function FloatingParticles() {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -100, 0], opacity: [p.opacity, p.opacity * 2, p.opacity], scale: [1, 1.5, 1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

export default function LandingPage({ onEnter }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useVideoFade(videoRef);

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {/* ── 全屏背景视频 ── */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover translate-y-[17%]"
        src={VIDEO_URL}
        muted
        playsInline
      />

      {/* ── 暗色遮罩 ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/75" />

      {/* ── 粒子层 ── */}
      <FloatingParticles />

      {/* ── 内容 ── */}
      <div className="relative z-10 flex flex-col h-full">
        {/* 顶部导航栏 */}
        <nav className="relative z-20 px-6 py-6">
          <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-gold" />
              <span className="gold-gradient font-extrabold text-lg tracking-tight">MatchLens AI</span>
            </div>
            <span className="text-[10px] text-white/30 tracking-widest">2026 WORLD CUP</span>
          </div>
        </nav>

        {/* 主内容区 */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center -translate-y-[10%]">
          {/* 主标题 - Instrument Serif */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight whitespace-nowrap"
            style={{ fontFamily: "'Instrument Serif', serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            用数据读懂胜负
          </motion.h1>

          {/* 副标题 */}
          <motion.p
            className="text-sm text-white/50 leading-relaxed max-w-md mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            融合赔率变化、球队状态、历史交锋与 AI 模型评分，<br />
            为 104 场比赛生成概率预测、爆冷指数与风险预警。
          </motion.p>

          {/* 主办国 */}
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <span className="text-[10px] text-white/30">HOST</span>
            <Flag code="CAN" size="sm" />
            <Flag code="USA" size="sm" />
            <Flag code="MEX" size="sm" />
            <span className="text-[10px] text-white/30 ml-2">48 队 · 104 场 · 39 天</span>
          </motion.div>

          {/* CTA 按钮 - 液态毛玻璃 */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onEnter}
            className="liquid-glass rounded-full px-10 py-4 text-white text-sm font-medium flex items-center gap-2 hover:bg-white/5 transition-colors"
          >
            进入倒计时
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* 底部数据条 */}
        <motion.div
          className="relative z-10 flex justify-center gap-8 pb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          {[
            { label: '比赛场次', value: '104' },
            { label: '参赛队伍', value: '48' },
            { label: 'AI 模型', value: '6+' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-gold text-lg font-bold">{s.value}</div>
              <div className="text-[10px] text-white/30">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
