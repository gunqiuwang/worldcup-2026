import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  type: 'ball' | 'star' | 'dot';
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const PARTICLE_COUNT = 20;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // 初始化粒子
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.15 + 0.05,
        type: Math.random() > 0.7 ? 'ball' : Math.random() > 0.5 ? 'star' : 'dot',
      });
    }

    function drawBall(x: number, y: number, size: number, opacity: number) {
      ctx!.beginPath();
      ctx!.arc(x, y, size * 2, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(255, 213, 79, ${opacity})`;
      ctx!.fill();
      // 五角形纹理
      ctx!.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 72 - 90) * (Math.PI / 180);
        const px = x + Math.cos(angle) * size;
        const py = y + Math.sin(angle) * size;
        if (i === 0) ctx!.moveTo(px, py);
        else ctx!.lineTo(px, py);
      }
      ctx!.closePath();
      ctx!.strokeStyle = `rgba(255, 213, 79, ${opacity * 0.5})`;
      ctx!.lineWidth = 0.5;
      ctx!.stroke();
    }

    function drawStar(x: number, y: number, size: number, opacity: number) {
      ctx!.beginPath();
      ctx!.arc(x, y, size * 0.5, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(0, 230, 118, ${opacity})`;
      ctx!.fill();
    }

    function drawDot(x: number, y: number, size: number, opacity: number) {
      ctx!.beginPath();
      ctx!.arc(x, y, size * 0.3, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
      ctx!.fill();
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas!.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas!.height) p.vy *= -1;

        if (p.type === 'ball') drawBall(p.x, p.y, p.size, p.opacity);
        else if (p.type === 'star') drawStar(p.x, p.y, p.size, p.opacity);
        else drawDot(p.x, p.y, p.size, p.opacity);
      }
      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
