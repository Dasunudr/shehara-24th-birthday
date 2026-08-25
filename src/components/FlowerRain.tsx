"use client";

import React, { useEffect, useRef, useState } from "react";
import { Flower2, Sparkles } from "lucide-react";

interface FlowerParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  swaySpeed: number;
  swayAngle: number;
  swayRadius: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  opacity: number;
  isFlower: boolean; // true = 5-petal sakura flower, false = single rose petal
  colorTop: string;
  colorMid: string;
  colorBottom: string;
  centerColor: string;
}

export default function FlowerRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const flowersRef = useRef<FlowerParticle[]>([]);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const flowerPalettes = [
      // Soft Rose & Sakura Pink
      {
        top: "#FFB8C6",
        mid: "#F77F98",
        bottom: "#E0486D",
        center: "#FFE484",
      },
      // Deep Velvet Crimson
      {
        top: "#F45B7A",
        mid: "#D11E48",
        bottom: "#960A2C",
        center: "#FFD166",
      },
      // Pastel Cherry Blossom
      {
        top: "#FFF0F3",
        mid: "#FFC2D1",
        bottom: "#FF85A1",
        center: "#FFDE59",
      },
      // Glowing Champagne Gold Flower
      {
        top: "#FFF9E6",
        mid: "#F5DF8E",
        bottom: "#D4AF37",
        center: "#FFFFFF",
      },
    ];

    const createParticle = (startY?: number): FlowerParticle => {
      const palette = flowerPalettes[Math.floor(Math.random() * flowerPalettes.length)];
      const isFlower = Math.random() > 0.45; // 55% full flowers, 45% single petals
      const size = isFlower ? Math.random() * 14 + 14 : Math.random() * 12 + 10;

      return {
        x: Math.random() * width,
        y: startY !== undefined ? startY : Math.random() * -height,
        size,
        speedY: Math.random() * 1.8 + 1.2,
        speedX: (Math.random() - 0.5) * 0.9,
        swaySpeed: Math.random() * 0.025 + 0.015,
        swayAngle: Math.random() * Math.PI * 2,
        swayRadius: Math.random() * 2.2 + 1.2,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        rotSpeedX: (Math.random() - 0.5) * 0.035,
        rotSpeedY: (Math.random() - 0.5) * 0.045,
        rotSpeedZ: (Math.random() - 0.5) * 0.025,
        opacity: Math.random() * 0.35 + 0.65,
        isFlower,
        colorTop: palette.top,
        colorMid: palette.mid,
        colorBottom: palette.bottom,
        centerColor: palette.center,
      };
    };

    // Initialize 60 falling flower particles across the screen
    const totalParticles = Math.min(Math.max(Math.floor(width / 24), 45), 70);
    flowersRef.current = Array.from({ length: totalParticles }, () =>
      createParticle(Math.random() * height)
    );

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      flowersRef.current.forEach((item) => {
        // 3D physics & wind updates
        item.rotX += item.rotSpeedX;
        item.rotY += item.rotSpeedY;
        item.rotZ += item.rotSpeedZ;

        item.swayAngle += item.swaySpeed;
        item.x += Math.sin(item.swayAngle) * item.swayRadius + item.speedX;
        item.y += item.speedY;

        // Reset particle to top if fallen past bottom
        if (item.y > height + 50) {
          item.y = -40;
          item.x = Math.random() * width;
        }
        if (item.x < -50) item.x = width + 40;
        if (item.x > width + 50) item.x = -40;

        const scaleX = Math.cos(item.rotY);
        const scaleY = Math.cos(item.rotX);

        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rotZ);
        ctx.scale(Math.max(0.2, Math.abs(scaleX)), Math.max(0.25, Math.abs(scaleY)));
        ctx.globalAlpha = item.opacity;

        if (item.isFlower) {
          // Draw 5-petal Sakura / Blossom Flower
          const petalCount = 5;
          const r = item.size;

          for (let i = 0; i < petalCount; i++) {
            const angle = (i * Math.PI * 2) / petalCount;
            ctx.save();
            ctx.rotate(angle);

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(r * 0.45, -r * 0.7, r * 0.4, -r * 1.1, 0, -r);
            ctx.bezierCurveTo(-r * 0.4, -r * 1.1, -r * 0.45, -r * 0.7, 0, 0);
            ctx.closePath();

            const grad = ctx.createRadialGradient(0, 0, 2, 0, -r * 0.7, r);
            grad.addColorStop(0, item.colorTop);
            grad.addColorStop(0.6, item.colorMid);
            grad.addColorStop(1, item.colorBottom);
            ctx.fillStyle = grad;
            ctx.fill();

            ctx.restore();
          }

          // Flower Center Pistil
          ctx.beginPath();
          ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
          ctx.fillStyle = item.centerColor;
          ctx.shadowColor = item.colorMid;
          ctx.shadowBlur = 8;
          ctx.fill();
        } else {
          // Draw Curved Organic Rose Petal
          const s = item.size;
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.bezierCurveTo(s * 0.9, -s * 0.5, s * 0.95, s * 0.5, 0, s);
          ctx.bezierCurveTo(-s * 0.95, s * 0.5, -s * 0.9, -s * 0.5, 0, -s);
          ctx.closePath();

          const grad = ctx.createLinearGradient(0, -s, 0, s);
          grad.addColorStop(0, item.colorTop);
          grad.addColorStop(0.55, item.colorMid);
          grad.addColorStop(1, item.colorBottom);
          ctx.fillStyle = grad;
          ctx.shadowColor = item.colorMid;
          ctx.shadowBlur = 6;
          ctx.fill();

          // Petal vein
          ctx.beginPath();
          ctx.moveTo(0, -s * 0.7);
          ctx.lineTo(0, s * 0.7);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        ctx.restore();
      });

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  const triggerFlowerBurst = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = canvas.width;

    const burst = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * -120 - 20,
      size: Math.random() * 16 + 14,
      speedY: Math.random() * 2.5 + 1.8,
      speedX: (Math.random() - 0.5) * 1.5,
      swaySpeed: Math.random() * 0.035 + 0.02,
      swayAngle: Math.random() * Math.PI * 2,
      swayRadius: Math.random() * 2.5 + 1.5,
      rotX: Math.random() * Math.PI * 2,
      rotY: Math.random() * Math.PI * 2,
      rotZ: Math.random() * Math.PI * 2,
      rotSpeedX: (Math.random() - 0.5) * 0.05,
      rotSpeedY: (Math.random() - 0.5) * 0.06,
      rotSpeedZ: (Math.random() - 0.5) * 0.04,
      opacity: Math.random() * 0.3 + 0.7,
      isFlower: Math.random() > 0.4,
      colorTop: "#FFB8C6",
      colorMid: "#F77F98",
      colorBottom: "#E0486D",
      centerColor: "#FFE484",
    }));

    flowersRef.current.push(...burst);
  };

  return (
    <>
      {/* Full-Screen Romantic Falling Flowers & Petals Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-40 w-full h-full"
      />

      {/* Floating Interactive Flower Rain Button */}
      <button
        onClick={triggerFlowerBurst}
        className="fixed bottom-6 left-6 z-50 p-2.5 sm:px-4 sm:py-2.5 rounded-full glass-panel-rose text-roseGold-200 hover:text-white border border-roseGold-400/40 hover:border-roseGold-400/80 transition-all hover:scale-105 shadow-[0_4px_25px_rgba(247,127,152,0.35)] flex items-center gap-2 cursor-pointer group backdrop-blur-xl"
        title="Shower More Flowers 🌸"
        aria-label="Shower Flowers"
      >
        <Flower2 className="w-4 h-4 text-roseGold-300 animate-spin-slow group-hover:scale-110 transition-transform" />
        <span className="text-xs font-serif tracking-wider font-semibold text-champagne-100">
          Flower Rain 🌸
        </span>
      </button>
    </>
  );
}
