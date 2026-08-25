"use client";

import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
}

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate 32 smooth ambient floating bokeh orbs
    const colors = [
      "rgba(212, 175, 55, 0.4)", // Gold
      "rgba(247, 202, 208, 0.35)", // Rose pink
      "rgba(224, 122, 95, 0.3)", // Sunset peach
      "rgba(255, 248, 240, 0.4)", // Warm champagne
    ];

    const generated: Particle[] = Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2,
      color: colors[i % colors.length],
    }));

    setParticles(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Subtle ambient light blooms */}
      <div className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] rounded-full bg-roseGold-500/5 blur-[120px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-3/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-champagne-500/5 blur-[140px] pointer-events-none transform translate-x-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[30vw] h-[30vw] rounded-full bg-sunset-500/5 blur-[130px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2" />

      {/* Floating stars / bokeh particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none transition-all"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            opacity: p.opacity,
            animation: `float ${p.duration}s ease-in-out infinite alternate`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
