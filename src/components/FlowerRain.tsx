"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Flower2 } from "lucide-react";

interface Petal {
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
  colorTop: string;
  colorMid: string;
  colorBottom: string;
  veinColor: string;
}

export default function FlowerRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animFrameId = useRef<number | null>(null);
  const [isActive, setIsActive] = useState(true);

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

    // Color palettes for organic petals
    const petalPalettes = [
      // Soft Rose Pink
      {
        top: "#FFB7C5",
        mid: "#F48CA0",
        bottom: "#D94F70",
        vein: "rgba(255, 255, 255, 0.4)",
      },
      // Crimson Velvet Rose
      {
        top: "#E25875",
        mid: "#C72C48",
        bottom: "#8B1028",
        vein: "rgba(255, 180, 190, 0.35)",
      },
      // Cherry Blossom Sakura
      {
        top: "#FFE4E8",
        mid: "#FFC2CD",
        bottom: "#FFA5B8",
        vein: "rgba(255, 255, 255, 0.5)",
      },
      // Golden Champagne Petal
      {
        top: "#FFF6D6",
        mid: "#F3DA8C",
        bottom: "#D4AF37",
        vein: "rgba(255, 255, 255, 0.6)",
      },
    ];

    const createPetal = (startY?: number): Petal => {
      const palette = petalPalettes[Math.floor(Math.random() * petalPalettes.length)];
      const size = Math.random() * 11 + 9; // Size between 9px and 20px

      return {
        x: Math.random() * width,
        y: startY !== undefined ? startY : Math.random() * -height,
        size,
        speedY: Math.random() * 1.6 + 1.1,
        speedX: (Math.random() - 0.5) * 0.8,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayAngle: Math.random() * Math.PI * 2,
        swayRadius: Math.random() * 1.8 + 0.8,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        rotSpeedX: (Math.random() - 0.5) * 0.03,
        rotSpeedY: (Math.random() - 0.5) * 0.04,
        rotSpeedZ: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.4 + 0.55,
        colorTop: palette.top,
        colorMid: palette.mid,
        colorBottom: palette.bottom,
        veinColor: palette.vein,
      };
    };

    // Initialize 42 fluttering petals distributed across and above the viewport
    const totalPetals = Math.min(Math.floor(width / 32), 48);
    petalsRef.current = Array.from({ length: totalPetals }, () =>
      createPetal(Math.random() * height - height * 0.5)
    );

    // Animation Loop with 3D wind & tumbling physics
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      petalsRef.current.forEach((petal) => {
        // Apply 3D rotation
        petal.rotX += petal.rotSpeedX;
        petal.rotY += petal.rotSpeedY;
        petal.rotZ += petal.rotSpeedZ;

        // Apply wind sway & gravitational fall
        petal.swayAngle += petal.swaySpeed;
        petal.x += Math.sin(petal.swayAngle) * petal.swayRadius + petal.speedX;
        petal.y += petal.speedY;

        // Re-spawn petal at top when it drifts below viewport
        if (petal.y > height + 40) {
          petal.y = -30;
          petal.x = Math.random() * width;
        }
        if (petal.x < -40) petal.x = width + 30;
        if (petal.x > width + 40) petal.x = -30;

        // 3D Perspective Scaling based on rotation
        const scaleX = Math.cos(petal.rotY);
        const scaleY = Math.cos(petal.rotX);

        ctx.save();
        ctx.translate(petal.x, petal.y);
        ctx.rotate(petal.rotZ);
        ctx.scale(Math.max(0.15, Math.abs(scaleX)), Math.max(0.2, Math.abs(scaleY)));

        // Draw curved organic petal path
        ctx.beginPath();
        ctx.moveTo(0, -petal.size);
        ctx.bezierCurveTo(
          petal.size * 0.85,
          -petal.size * 0.55,
          petal.size * 0.9,
          petal.size * 0.5,
          0,
          petal.size
        );
        ctx.bezierCurveTo(
          -petal.size * 0.9,
          petal.size * 0.5,
          -petal.size * 0.85,
          -petal.size * 0.55,
          0,
          -petal.size
        );
        ctx.closePath();

        // Luxury Gradient Fill
        const grad = ctx.createLinearGradient(0, -petal.size, 0, petal.size);
        grad.addColorStop(0, petal.colorTop);
        grad.addColorStop(0.55, petal.colorMid);
        grad.addColorStop(1, petal.colorBottom);
        ctx.fillStyle = grad;
        ctx.globalAlpha = petal.opacity;
        ctx.shadowColor = petal.colorMid;
        ctx.shadowBlur = 6;
        ctx.fill();

        // Subtle Petal Spine / Vein Highlight
        ctx.beginPath();
        ctx.moveTo(0, -petal.size * 0.7);
        ctx.lineTo(0, petal.size * 0.7);
        ctx.strokeStyle = petal.veinColor;
        ctx.lineWidth = 0.75;
        ctx.globalAlpha = petal.opacity * 0.45;
        ctx.stroke();

        ctx.restore();
      });

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isActive]);

  const addPetalBurst = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = canvas.width;
    const height = canvas.height;

    // Add a shower of 25 new falling petals from top
    const newPetals: Petal[] = Array.from({ length: 25 }, () => ({
      x: Math.random() * width,
      y: Math.random() * -150 - 20,
      size: Math.random() * 12 + 10,
      speedY: Math.random() * 2.2 + 1.4,
      speedX: (Math.random() - 0.5) * 1.2,
      swaySpeed: Math.random() * 0.03 + 0.015,
      swayAngle: Math.random() * Math.PI * 2,
      swayRadius: Math.random() * 2.2 + 1,
      rotX: Math.random() * Math.PI * 2,
      rotY: Math.random() * Math.PI * 2,
      rotZ: Math.random() * Math.PI * 2,
      rotSpeedX: (Math.random() - 0.5) * 0.04,
      rotSpeedY: (Math.random() - 0.5) * 0.05,
      rotSpeedZ: (Math.random() - 0.5) * 0.03,
      opacity: Math.random() * 0.35 + 0.65,
      colorTop: "#FFB7C5",
      colorMid: "#F48CA0",
      colorBottom: "#D94F70",
      veinColor: "rgba(255, 255, 255, 0.5)",
    }));

    petalsRef.current.push(...newPetals);
  };

  return (
    <>
      {/* Full-Screen Romantic Petal Shower Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-30 w-full h-full"
        style={{ mixBlendMode: "screen" }}
      />

      {/* Floating Shower Flower Petals Button */}
      <button
        onClick={addPetalBurst}
        className="fixed bottom-6 left-6 z-40 p-2.5 sm:px-4 sm:py-2.5 rounded-full glass-panel-rose text-roseGold-200 hover:text-white border border-roseGold-400/30 hover:border-roseGold-400/60 transition-all hover:scale-105 shadow-xl flex items-center gap-2 cursor-pointer group"
        title="Shower More Flower Petals"
        aria-label="Shower Rose Petals"
      >
        <Flower2 className="w-4 h-4 text-roseGold-400 animate-spin-slow group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline text-xs font-serif tracking-wider font-semibold">
          Flower Rain 🌸
        </span>
      </button>
    </>
  );
}
