"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, TreePine, Heart, Compass, MapPin } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { getAssetPath } from "@/utils/assetPath";

export default function GardenSection() {
  return (
    <section id="nature" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Soft botanical ambiance glow */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[500px] h-[500px] bg-botanical-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-400/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center">
        {/* Left Column: Festive Tree Photo with luxury framing */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 relative"
        >
          <div className="relative h-[440px] sm:h-[540px] w-full rounded-3xl overflow-hidden glass-panel border border-white/15 shadow-2xl group">
            <Image
              src={getAssetPath(siteConfig.gardenImage)}
              alt="Festive lights and sparkling tree"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-[0.95]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Soft Festive Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-night-900/90 via-night-900/20 to-transparent" />

            {/* Photo Caption Badge */}
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl glass-panel border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span className="text-[11px] uppercase tracking-widest text-amber-300 font-semibold">
                  Sparkling Wonder
                </span>
              </div>
              <p className="font-serif text-lg text-white font-bold">
                Shining Bright in Every Season
              </p>
            </div>
          </div>

          {/* Decorative floating badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 glass-panel-gold px-4 py-2.5 rounded-2xl border border-amber-400/40 shadow-xl hidden sm:flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-xs font-semibold text-champagne-100">Fairy Light Magic</span>
          </motion.div>
        </motion.div>

        {/* Right Column: Poetic Text & Wishes */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-6 flex flex-col justify-center space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel-gold self-start border border-amber-400/30">
            <TreePine className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs uppercase tracking-[0.2em] text-amber-200 font-medium">
              The Little Moments
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Here&apos;s to more places, more adventures, more laughter, and more memories.
          </h2>

          <p className="font-sans text-sm sm:text-base md:text-lg text-champagne-200/80 leading-relaxed font-light">
            Whether wandering through tranquil gardens, standing under a canopy of holiday lights, or laughing until our stomachs hurt—it is the simple, joyful, unscripted moments that make life truly magical.
          </p>

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl glass-panel border border-white/5">
              <Compass className="w-5 h-5 text-amber-300 mb-2" />
              <h4 className="font-serif text-base font-semibold text-white">Endless Adventures</h4>
              <p className="text-xs text-champagne-300/70 mt-1">
                May your 24th year take you to dream destinations and create stories you will tell forever.
              </p>
            </div>

            <div className="p-4 rounded-2xl glass-panel border border-white/5">
              <Heart className="w-5 h-5 text-roseGold-400 mb-2 fill-roseGold-400" />
              <h4 className="font-serif text-base font-semibold text-white">Genuine Happiness</h4>
              <p className="text-xs text-champagne-300/70 mt-1">
                May every single day be filled with warm smiles, loving people, and peace in your heart.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
