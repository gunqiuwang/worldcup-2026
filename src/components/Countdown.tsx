import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown';
import { Flame, Trophy } from 'lucide-react';

/* ── Split-flap digit ── */
function FlipDigit({ value, label }: { value: number; label: string }) {
  const [display, setDisplay] = useState(value);
  const [prev, setPrev] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (value !== display) {
      setPrev(display);
      setFlipping(true);
      // After top flap finishes flipping, update display
      timeoutRef.current = setTimeout(() => {
        setDisplay(value);
        setFlipping(false);
      }, 300);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [value]);

  const str = String(display).padStart(2, '0');
  const prevStr = String(prev).padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="relative select-none"
        style={{
          width: label === '天' ? 52 : 44,
          height: 56,
          perspective: 200,
        }}
      >
        {/* Static top half — shows current (or new during flip) */}
        <div
          className="absolute inset-x-0 top-0 overflow-hidden rounded-t-lg flex items-end justify-center"
          style={{
            height: '50%',
            background: 'linear-gradient(180deg, rgba(255,213,79,0.12) 0%, rgba(255,213,79,0.06) 100%)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <span
            className="font-extrabold tabular-nums leading-none"
            style={{
              fontSize: label === '天' ? 28 : 24,
              color: 'var(--gold)',
              textShadow: '0 0 20px rgba(255,213,79,0.4)',
              transform: 'translateY(50%)',
            }}
          >
            {flipping ? prevStr : str}
          </span>
        </div>

        {/* Static bottom half — shows current (or old during flip) */}
        <div
          className="absolute inset-x-0 bottom-0 overflow-hidden rounded-b-lg flex items-start justify-center"
          style={{
            height: '50%',
            background: 'linear-gradient(180deg, rgba(255,213,79,0.04) 0%, rgba(255,213,79,0.08) 100%)',
          }}
        >
          <span
            className="font-extrabold tabular-nums leading-none"
            style={{
              fontSize: label === '天' ? 28 : 24,
              color: 'var(--gold)',
              textShadow: '0 0 20px rgba(255,213,79,0.3)',
              transform: 'translateY(-50%)',
            }}
          >
            {str}
          </span>
        </div>

        {/* Flipping top half — old number flips down */}
        {flipping && (
          <div
            className="absolute inset-x-0 top-0 overflow-hidden rounded-t-lg flex items-end justify-center"
            style={{
              height: '50%',
              background: 'linear-gradient(180deg, rgba(255,213,79,0.12) 0%, rgba(255,213,79,0.06) 100%)',
              transformOrigin: 'bottom center',
              animation: 'flipTop 0.3s cubic-bezier(0.36, 0, 0.66, -0.56) forwards',
              backfaceVisibility: 'hidden',
              zIndex: 3,
            }}
          >
            <span
              className="font-extrabold tabular-nums leading-none"
              style={{
                fontSize: label === '天' ? 28 : 24,
                color: 'var(--gold)',
                textShadow: '0 0 20px rgba(255,213,79,0.4)',
                transform: 'translateY(50%)',
              }}
            >
              {prevStr}
            </span>
          </div>
        )}

        {/* Flipping bottom half — new number flips up into place */}
        {flipping && (
          <div
            className="absolute inset-x-0 bottom-0 overflow-hidden rounded-b-lg flex items-start justify-center"
            style={{
              height: '50%',
              background: 'linear-gradient(180deg, rgba(255,213,79,0.04) 0%, rgba(255,213,79,0.08) 100%)',
              transformOrigin: 'top center',
              animation: 'flipBottom 0.3s cubic-bezier(0.36, 0, 0.66, -0.56) 0.15s forwards',
              zIndex: 2,
            }}
          >
            <span
              className="font-extrabold tabular-nums leading-none"
              style={{
                fontSize: label === '天' ? 28 : 24,
                color: 'var(--gold)',
                textShadow: '0 0 20px rgba(255,213,79,0.3)',
                transform: 'translateY(-50%)',
              }}
            >
              {str}
            </span>
          </div>
        )}

        {/* Center line — the split */}
        <div
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px"
          style={{
            background: 'rgba(0,0,0,0.5)',
            zIndex: 4,
            boxShadow: '0 1px 0 rgba(255,255,255,0.04)',
          }}
        />
      </div>
      <span className="text-[10px] text-gray-500 tracking-wide font-medium">{label}</span>
    </div>
  );
}

/* ── Main Countdown ── */
export default function Countdown() {
  const cd = useCountdown();

  if (cd.isStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-5 mx-4 mb-4 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red/5 via-gold/5 to-red/5 animate-pulse" />
        <div className="relative flex items-center justify-center gap-2 text-lg font-bold text-gold">
          <Flame className="w-5 h-5 animate-bounce" />
          <span className="gold-gradient text-xl">赛事进行中</span>
          <Flame className="w-5 h-5 animate-bounce" />
        </div>
      </motion.div>
    );
  }

  return (
    <>
      {/* Split-flip CSS keyframes */}
      <style>{`
        @keyframes flipTop {
          0% { transform: rotateX(0deg); }
          100% { transform: rotateX(-90deg); }
        }
        @keyframes flipBottom {
          0% { transform: rotateX(90deg); }
          100% { transform: rotateX(0deg); }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="glass-card p-5 mx-4 mb-4 text-center relative overflow-hidden"
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        {/* Title */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Trophy className="w-4 h-4 text-gold" />
          <span className="text-xs text-gray-400 tracking-widest uppercase font-medium">
            FIFA World Cup 2026
          </span>
          <Trophy className="w-4 h-4 text-gold" />
        </div>

        {/* Flip digits */}
        <div className="flex justify-center gap-2.5">
          <FlipDigit value={cd.days} label="天" />
          <Sep />
          <FlipDigit value={cd.hours} label="时" />
          <Sep />
          <FlipDigit value={cd.minutes} label="分" />
          <Sep />
          <FlipDigit value={cd.seconds} label="秒" />
        </div>

        {/* Bottom hint */}
        <div className="mt-4 text-[10px] text-gray-500">
          距开赛还有 <span className="text-gold font-semibold">{cd.days}</span> 天
        </div>
      </motion.div>
    </>
  );
}

/* ── Separator colon ── */
function Sep() {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 self-start pt-5">
      <motion.span
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        className="block w-1 h-1 rounded-full bg-gold/60"
      />
      <motion.span
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        className="block w-1 h-1 rounded-full bg-gold/60"
      />
    </div>
  );
}
