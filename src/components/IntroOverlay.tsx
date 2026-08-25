"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, X } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

interface IntroOverlayProps {
  onComplete: () => void;
}

export default function IntroOverlay({ onComplete }: IntroOverlayProps) {
  const [phase, setPhase] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Stage 0: Initial heartbeat (0ms)
    // Stage 1: "A little something for you..." (1200ms)
    // Stage 2: "Happy 24th Birthday ❤️" (3400ms)
    // Stage 3: Curtain fade-out (5400ms)
    const t1 = setTimeout(() => setPhase(1), 1000);
    const t2 = setTimeout(() => setPhase(2), 3000);
    const t3 = setTimeout(() => {
      setIsOpen(false);
      setTimeout(onComplete, 800);
    }, 5200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsOpen(false);
    setTimeout(onComplete, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-night-900 px-6 select-none"
          style={{
            background: "radial-gradient(ellipse at center, #231A2C 0%, #120E1A 60%, #08060B 100%)",
          }}
        >
          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute top-6 right-6 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs text-champagne-200/70 hover:text-champagne-100 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all z-20 cursor-pointer"
          >
            <span>Skip Intro</span>
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Glowing Ambient Halo */}
          <div className="absolute w-72 h-72 rounded-full bg-roseGold-500/15 blur-[90px] animate-pulse-glow" />

          {/* Intro Sequence Content */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto">
            {/* Glowing Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
              className="relative mb-8"
            >
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-roseGold-500 to-amber-300 p-0.5 shadow-[0_0_35px_rgba(224,122,95,0.6)]">
                <div className="w-full h-full rounded-full bg-night-900/90 flex items-center justify-center">
                  <Heart className="w-7 h-7 text-roseGold-300 fill-roseGold-400 animate-pulse" />
                </div>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1.5 -right-1.5 text-amber-300"
              >
                <Sparkles className="w-5 h-5 fill-amber-300" />
              </motion.div>
            </motion.div>

            {/* Stage 1: "A little something for you..." */}
            <AnimatePresence mode="wait">
              {phase <= 1 && (
                <motion.div
                  key="phase1"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="font-display italic text-2xl sm:text-3xl text-champagne-200 tracking-wide">
                    A little something for you...
                  </p>
                  <p className="font-sans text-xs tracking-widest text-champagne-400/60 uppercase mt-3">
                    Crafted with love
                  </p>
                </motion.div>
              )}

              {/* Stage 2: "Happy 24th Birthday Shehara ❤️" */}
              {phase >= 2 && (
                <motion.div
                  key="phase2"
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight gradient-text-gold">
                    Happy 24th Birthday, {siteConfig.herName}
                  </h1>
                  <p className="font-handwriting text-2xl sm:text-3xl text-roseGold-200">
                    To the sweetest, most special person in the world ❤️
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom subtle progress line */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-36 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5.2, ease: "linear" }}
              className="h-full bg-gradient-to-r from-amber-400 via-roseGold-400 to-amber-300"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
