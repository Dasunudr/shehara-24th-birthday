"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Heart, Sparkles, Feather } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function LetterSection() {
  return (
    <section id="letter" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[600px] h-[400px] bg-roseGold-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel-rose mb-4 border border-roseGold-400/30"
        >
          <Mail className="w-3.5 h-3.5 text-roseGold-300" />
          <span className="text-xs uppercase tracking-[0.2em] text-roseGold-200 font-medium">
            From The Heart
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-champagne-50"
        >
          A Little Message For You
        </motion.h2>
      </div>

      {/* Luxury Letter / Parchment Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl p-8 sm:p-12 md:p-16 glass-panel border border-amber-300/20 shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden"
        style={{
          background: "linear-gradient(145deg, rgba(30, 24, 38, 0.85) 0%, rgba(20, 16, 26, 0.95) 100%)",
        }}
      >
        {/* Decorative corner ribbons & glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-roseGold-400/10 rounded-full blur-2xl pointer-events-none" />

        {/* Wax Seal / Heart Monogram Stamp */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-roseGold-500 to-amber-400 p-[1px] shadow-lg flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-night-900 flex items-center justify-center">
              <Heart className="w-5 h-5 text-roseGold-300 fill-roseGold-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Feather Quill Accent */}
        <div className="flex items-center gap-2 text-amber-300/70 mb-8">
          <Feather className="w-4 h-4" />
          <span className="text-[11px] uppercase tracking-[0.25em] font-medium font-sans">
            Personal Note
          </span>
        </div>

        {/* Letter Greeting */}
        <h3 className="font-handwriting text-3xl sm:text-4xl text-amber-200 mb-6">
          {siteConfig.letter.greeting}
        </h3>

        {/* Letter Paragraphs */}
        <div className="space-y-4 sm:space-y-6 font-sans text-sm sm:text-base md:text-lg text-champagne-100/90 leading-relaxed font-light">
          {siteConfig.letter.paragraphs.map((para, i) => (
            <p key={i} className="tracking-wide">
              {para}
            </p>
          ))}
        </div>

        {/* Signature */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-handwriting text-2xl sm:text-3xl text-roseGold-200">
            {siteConfig.letter.signature}
          </p>

          <div className="flex items-center gap-2 text-xs text-champagne-300/60">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Written with sincerity</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
