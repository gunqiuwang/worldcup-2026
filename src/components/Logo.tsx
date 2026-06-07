import { useEffect, useState } from 'react';

export default function Logo({ size = 28 }: { size?: number }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    // Trigger stroke draw-in animation after mount
    requestAnimationFrame(() => setLoaded(true));
  }, []);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 8px rgba(255,213,79,0.3))' }}
    >
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#FFD54F" />
          <stop offset="100%" stopColor="#FFA726" />
        </linearGradient>
      </defs>

      {/* Outer ring — slow rotate, breathing glow */}
      <g style={{ transformOrigin: '16px 16px' }}>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 16 16"
          to="360 16 16"
          dur="20s"
          repeatCount="indefinite"
        />
        <circle
          cx="16"
          cy="16"
          r="14"
          stroke="url(#goldGrad)"
          strokeWidth="1.5"
          opacity="0.6"
          strokeDasharray={loaded ? '88' : '88'}
          strokeDashoffset={loaded ? '0' : '88'}
          style={{
            transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </g>

      {/* Inner ring — counter-rotate, breathing opacity */}
      <g style={{ transformOrigin: '16px 16px' }}>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="360 16 16"
          to="0 16 16"
          dur="15s"
          repeatCount="indefinite"
        />
        <circle
          cx="16"
          cy="16"
          r="11"
          stroke="url(#goldGrad)"
          strokeWidth="1"
          strokeDasharray={loaded ? '69' : '69'}
          strokeDashoffset={loaded ? '0' : '69'}
          style={{
            transition: 'stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}
        >
          <animate
            attributeName="opacity"
            values="0.2;0.45;0.2"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Football body — glow pulse */}
      <circle cx="16" cy="16" r="8" fill="url(#goldGrad)" opacity="0.15">
        <animate
          attributeName="opacity"
          values="0.1;0.2;0.1"
          dur="2.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="16"
        cy="16"
        r="8"
        stroke="url(#goldGrad)"
        strokeWidth="1.2"
        strokeDasharray={loaded ? '50' : '50'}
        strokeDashoffset={loaded ? '0' : '50'}
        style={{
          transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
        }}
      />

      {/* Pentagon texture */}
      <g opacity={loaded ? 1 : 0} style={{ transition: 'opacity 0.8s ease 1s' }}>
        <path d="M16 10L13 13L14.5 17H17.5L19 13L16 10Z" fill="url(#goldGrad)" opacity="0.4" />
        <path d="M11 15L10 18L12 20H14.5L13 17L11 15Z" fill="url(#goldGrad)" opacity="0.3" />
        <path d="M21 15L23 18L22 20H19.5L19 17L21 15Z" fill="url(#goldGrad)" opacity="0.3" />
        <path d="M13 21L14.5 24L17.5 24L19 21H13Z" fill="url(#goldGrad)" opacity="0.25" />
      </g>

      {/* Center highlight */}
      <circle cx="14.5" cy="13.5" r="1.5" fill="white" opacity="0.15" />

      {/* Crosshair lines — pulse */}
      <g opacity={loaded ? 0.5 : 0} style={{ transition: 'opacity 0.6s ease 1.2s' }}>
        <line x1="16" y1="3" x2="16" y2="6" stroke="url(#goldGrad)" strokeWidth="0.8">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="16" y1="26" x2="16" y2="29" stroke="url(#goldGrad)" strokeWidth="0.8">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" begin="0.5s" repeatCount="indefinite" />
        </line>
        <line x1="3" y1="16" x2="6" y2="16" stroke="url(#goldGrad)" strokeWidth="0.8">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" begin="1s" repeatCount="indefinite" />
        </line>
        <line x1="26" y1="16" x2="29" y2="16" stroke="url(#goldGrad)" strokeWidth="0.8">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="2s" begin="1.5s" repeatCount="indefinite" />
        </line>
      </g>
    </svg>
  );
}
