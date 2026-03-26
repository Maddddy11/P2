import React, { useMemo } from 'react';

const COLORS = ['#a78bfa','#38bdf8','#2dd4bf','#f472b6','#fbbf24','#34d399','#fb923c','#818cf8'];

export default function Confetti() {
  const pieces = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      color: COLORS[i % COLORS.length],
      left: 20 + Math.random() * 60,
      delay: Math.random() * 0.6,
      duration: 2 + Math.random() * 1.5,
      size: 6 + Math.random() * 8,
      rotate: Math.random() * 360,
      isCircle: i % 4 === 0,
    }));
  }, []);

  return (
    <>
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            top: 0,
            background: p.color,
            width: p.size,
            height: p.isCircle ? p.size : p.size * 0.5,
            borderRadius: p.isCircle ? '50%' : '2px',
            transform: `rotate(${p.rotate}deg)`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </>
  );
}
