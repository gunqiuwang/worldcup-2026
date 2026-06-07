import { useEffect, useState } from 'react';

export default function Logo({ size = 28 }: { size?: number }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setLoaded(true));
  }, []);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 12px rgba(255,213,79,0.25))' }}
    >
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#FFD54F" />
          <stop offset="100%" stopColor="#FFA726" />
        </linearGradient>
        <linearGradient id="goldGrad2" x1="40" y1="0" x2="0" y2="40">
          <stop offset="0%" stopColor="#FFE082" />
          <stop offset="100%" stopColor="#FFB74D" />
        </linearGradient>
        <clipPath id="ballClip">
          <circle cx="20" cy="20" r="10" />
        </clipPath>
      </defs>

      {/* Outer ring — slow rotate, draw-in */}
      <g style={{ transformOrigin: '20px 20px' }}>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          dur="25s"
          repeatCount="indefinite"
        />
        <circle
          cx="20" cy="20" r="17"
          stroke="url(#goldGrad)"
          strokeWidth="1.2"
          opacity="0.5"
          strokeDasharray={loaded ? '107' : '107'}
          strokeDashoffset={loaded ? '0' : '107'}
          style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
        {/* Tick marks — like a lens */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <line
            key={deg}
            x1="20"
            y1="2.5"
            x2="20"
            y2="4.5"
            stroke="url(#goldGrad)"
            strokeWidth="0.8"
            opacity={loaded ? 0.4 : 0}
            transform={`rotate(${deg} 20 20)`}
            style={{ transition: `opacity 0.5s ease ${0.5 + deg / 1000}s` }}
          />
        ))}
      </g>

      {/* Inner ring — counter-rotate */}
      <g style={{ transformOrigin: '20px 20px' }}>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="360 20 20"
          to="0 20 20"
          dur="18s"
          repeatCount="indefinite"
        />
        <circle
          cx="20" cy="20" r="13"
          stroke="url(#goldGrad2)"
          strokeWidth="0.8"
          strokeDasharray={loaded ? '82' : '82'}
          strokeDashoffset={loaded ? '0' : '82'}
          style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s' }}
        >
          <animate
            attributeName="opacity"
            values="0.25;0.45;0.25"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Football body */}
      <circle
        cx="20" cy="20" r="10"
        fill="url(#goldGrad)"
        opacity="0.12"
      >
        <animate attributeName="opacity" values="0.08;0.15;0.08" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle
        cx="20" cy="20" r="10"
        stroke="url(#goldGrad)"
        strokeWidth="1"
        strokeDasharray={loaded ? '63' : '63'}
        strokeDashoffset={loaded ? '0' : '63'}
        style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s' }}
      />

      {/* Pentagon pattern — cleaner, centered */}
      <g clipPath="url(#ballClip)" opacity={loaded ? 1 : 0} style={{ transition: 'opacity 0.8s ease 0.8s' }}>
        {/* Center pentagon */}
        <path
          d="M20 14L17 17L18.5 21H21.5L23 17L20 14Z"
          fill="url(#goldGrad)"
          opacity="0.35"
        />
        {/* Top-left */}
        <path
          d="M14.5 18L13 21L15 23.5H17.5L16 21L14.5 18Z"
          fill="url(#goldGrad)"
          opacity="0.25"
        />
        {/* Top-right */}
        <path
          d="M25.5 18L27.5 21L26 23.5H23.5L24.5 21L25.5 18Z"
          fill="url(#goldGrad)"
          opacity="0.25"
        />
        {/* Bottom */}
        <path
          d="M16.5 24L18.5 27L21.5 27L23.5 24H16.5Z"
          fill="url(#goldGrad)"
          opacity="0.2"
        />
      </g>

      {/* Center highlight */}
      <circle cx="18.5" cy="17" r="1.5" fill="white" opacity="0.12" />

      {/* Crosshair — staggered pulse */}
      <g opacity={loaded ? 0.5 : 0} style={{ transition: 'opacity 0.6s ease 1s' }}>
        <line x1="20" y1="2" x2="20" y2="6" stroke="url(#goldGrad)" strokeWidth="0.6">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.5s" repeatCount="indefinite" />
        </line>
        <line x1="20" y1="34" x2="20" y2="38" stroke="url(#goldGrad)" strokeWidth="0.6">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.5s" begin="0.6s" repeatCount="indefinite" />
        </line>
        <line x1="2" y1="20" x2="6" y2="20" stroke="url(#goldGrad)" strokeWidth="0.6">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
        </line>
        <line x1="34" y1="20" x2="38" y2="20" stroke="url(#goldGrad)" strokeWidth="0.6">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2.5s" begin="1.8s" repeatCount="indefinite" />
        </line>
      </g>
    </svg>
  );
}
