import { useState, useEffect } from 'react';

const WC_START = new Date('2026-06-11T19:00:00Z').getTime();

export interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isStarted: boolean;
  total: number;
}

export function useCountdown(): CountdownValue {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const diff = WC_START - now;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isStarted: true, total: 0 };
  }

  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    isStarted: false,
    total: diff,
  };
}
