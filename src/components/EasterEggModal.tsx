"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, X, Stars } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EasterEggModal({ isOpen, onClose }: EasterEggModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night-900/90 backdrop-blur-2xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.88, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.88, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-md w-full glass-panel-rose rounded-3xl p-8 sm:p-10 border border-roseGold-400/40 shadow-[0_20px_60px_rgba(217,98,123,0.3)] text-center overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-champagne-100 transition-colors border border-white/15"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Floating animated glowing heart */}
          <div className="relative mx-auto w-16 h-16 mb-6">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-roseGold-500 to-amber-400 p-[1px] shadow-[0_0_30px_rgba(224,122,95,0.6)] flex items-center justify-center animate-pulse">
              <div className="w-full h-full rounded-full bg-night-900 flex items-center justify-center">
                <Heart className="w-8 h-8 text-roseGold-300 fill-roseGold-400" />
              </div>
            </div>
            <Stars className="w-5 h-5 text-amber-300 absolute -top-1 -right-1 animate-bounce" />
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
            {siteConfig.easterEgg.title}
          </h3>

          <p className="font-sans text-sm sm:text-base text-champagne-100/90 leading-relaxed font-light mb-6">
            {siteConfig.easterEgg.message}
          </p>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <p className="font-handwriting text-2xl text-roseGold-200">
              {siteConfig.easterEgg.note}
            </p>
          </div>

          <button
            onClick={onClose}
            className="mt-6 px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-amber-400 to-roseGold-400 text-night-900 hover:scale-105 transition-transform"
          >
            Hold In My Heart ✨
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
