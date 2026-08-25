"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  Smile,
  HeartHandshake,
  Music,
  Eye,
  Laugh,
  Crown,
  Flame,
  ShieldCheck,
  Sun,
  Gem,
  Compass,
  Flower2,
  PartyPopper,
  Feather,
  Stars,
  Zap,
  Palette,
  SunMedium,
  Coffee,
  Camera,
  Gift,
  HeartPulse,
  LucideIcon,
} from "lucide-react";
import { siteConfig, ReasonItem } from "@/config/siteConfig";
import { triggerHeartBurst } from "@/utils/confetti";

const iconMap: Record<string, LucideIcon> = {
  Smile,
  HeartHandshake,
  Sparkles,
  Music,
  Eye,
  Laugh,
  Crown,
  Heart,
  Flame,
  ShieldCheck,
  Sun,
  Gem,
  Compass,
  Flower2,
  PartyPopper,
  Feather,
  Stars,
  Zap,
  Palette,
  SunMedium,
  Coffee,
  Camera,
  Gift,
  HeartPulse,
};

export default function ReasonsSection() {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [likedCards, setLikedCards] = useState<Record<number, boolean>>({});

  const tags = ["All", "Heart", "Soul", "Joy", "Charm", "Strength", "Beauty"];

  const filteredReasons = selectedTag === "All"
    ? siteConfig.reasons
    : siteConfig.reasons.filter((r) => r.tag === selectedTag);

  const handleCardClick = (reason: ReasonItem, e: React.MouseEvent) => {
    setLikedCards((prev) => ({
      ...prev,
      [reason.number]: !prev[reason.number],
    }));

    // Trigger subtle romantic heart burst at click position
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerHeartBurst(x, y);
  };

  return (
    <section id="reasons" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Background Ambient Aura */}
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-roseGold-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel-gold mb-4 border border-amber-400/30"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="text-xs uppercase tracking-[0.2em] text-amber-200 font-medium">
            24 Years • 24 Treasures
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-champagne-50"
        >
          24 Things That Make You Special
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 font-sans text-sm sm:text-base md:text-lg text-champagne-300/80 max-w-xl mx-auto font-light"
        >
          One for every year of your magnificent journey. Tap any card to leave a heart.
        </motion.p>

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 mt-8"
        >
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                selectedTag === tag
                  ? "bg-gradient-to-r from-amber-400 to-roseGold-400 text-night-900 font-semibold shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-105"
                  : "glass-pill text-champagne-300/70 hover:text-champagne-100 hover:bg-white/10"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>
      </div>

      {/* 24 Reasons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <AnimatePresence mode="popLayout">
          {filteredReasons.map((reason) => {
            const IconComponent = iconMap[reason.iconName] || Heart;
            const isLiked = likedCards[reason.number];

            return (
              <motion.div
                key={reason.number}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={(e) => handleCardClick(reason, e)}
                className={`relative group rounded-2xl p-6 transition-all duration-300 cursor-pointer overflow-hidden border ${
                  isLiked
                    ? "glass-panel-rose border-roseGold-400/50 shadow-[0_10px_30px_rgba(217,98,123,0.2)]"
                    : "glass-panel border-white/10 hover:border-amber-400/40 hover:shadow-[0_15px_35px_rgba(212,175,55,0.15)]"
                }`}
              >
                {/* Subtle Background Number Watermark */}
                <span className="absolute -bottom-4 -right-2 font-serif text-7xl font-bold text-white/[0.03] pointer-events-none group-hover:text-white/[0.06] transition-colors select-none">
                  {reason.number < 10 ? `0${reason.number}` : reason.number}
                </span>

                {/* Card Top Row: Badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400/20 to-roseGold-400/20 border border-amber-400/40 flex items-center justify-center font-serif text-xs font-bold text-amber-300">
                      {reason.number}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-champagne-400/70 font-medium">
                      {reason.tag}
                    </span>
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-roseGold-300 group-hover:text-amber-300 group-hover:bg-white/10 transition-all duration-300">
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Content */}
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-amber-200 transition-colors">
                  {reason.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-champagne-200/80 leading-relaxed">
                  {reason.description}
                </p>

                {/* Bottom Heart Indicator */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-champagne-400/50">
                  <span className="text-[11px] group-hover:text-roseGold-300 transition-colors">
                    {isLiked ? "Cherished forever ❤️" : "Tap to heart"}
                  </span>
                  <Heart
                    className={`w-4 h-4 transition-all duration-300 ${
                      isLiked
                        ? "text-roseGold-400 fill-roseGold-400 scale-125"
                        : "text-white/20 group-hover:text-roseGold-300/60"
                    }`}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
