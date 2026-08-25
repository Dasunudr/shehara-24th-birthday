"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Sun, Heart } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { getAssetPath } from "@/utils/assetPath";

export default function SunsetSection() {
  return (
    <section id="sunset" className="relative min-h-[90vh] py-28 sm:py-36 w-full flex items-center justify-center overflow-hidden bg-night-900 border-y border-amber-500/10">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1 }}
          whileInView={{ scale: 1.05 }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="relative w-full h-full"
        >
          <Image
            src={getAssetPath(siteConfig.sunsetImage)}
            alt="Golden Sunset by the sea"
            fill
            className="object-cover object-center filter brightness-[0.75] contrast-[1.1] saturate-[1.15]"
            sizes="100vw"
          />
        </motion.div>

        {/* Cinematic Sunset Color Grading Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-night-900 via-night-900/60 to-night-900/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-night-900/85 via-sunset-500/20 to-night-900/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.25)_0%,rgba(13,10,18,0.85)_100%)]" />

        {/* Shimmering Golden Flare */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[900px] h-[550px] bg-gradient-to-tr from-amber-500/20 via-rose-500/15 to-transparent rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Foreground Content Card */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-gold mb-8 border border-amber-400/40 shadow-xl"
        >
          <Sun className="w-4 h-4 text-amber-300 animate-spin-slow" />
          <span className="text-xs uppercase tracking-[0.25em] text-amber-200 font-semibold">
            Golden Hour Serenity
          </span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="space-y-6"
        >
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-glow-sunset text-white leading-tight">
            &ldquo;Some moments feel like they were made to be remembered.&rdquo;
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="font-display italic text-2xl sm:text-4xl text-amber-200 font-normal tracking-wide"
          >
            And this is one of them.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 max-w-xl mx-auto p-6 sm:p-8 rounded-3xl glass-panel border border-amber-400/20 shadow-2xl backdrop-blur-md"
        >
          <p className="font-sans text-xs sm:text-sm md:text-base text-champagne-100/90 leading-relaxed font-light">
            Standing in the gentle waves as the golden sun kissed the horizon—Shehara glowing with pure grace, quiet wonder, holding white blossoms in that beautiful yellow dress. A moment etched in golden light forever.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-roseGold-300 font-handwriting text-2xl">
            <Heart className="w-4 h-4 text-roseGold-400 fill-roseGold-400" />
            <span>Shehara • Forever glowing in golden light</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
