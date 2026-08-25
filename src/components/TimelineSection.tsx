"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Calendar, Heart, Clock, Compass } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function TimelineSection() {
  return (
    <section id="timeline" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[700px] h-[500px] bg-champagne-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel-gold mb-4 border border-amber-400/30"
        >
          <Compass className="w-3.5 h-3.5 text-amber-300" />
          <span className="text-xs uppercase tracking-[0.2em] text-amber-200 font-medium">
            Journey & Milestones
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-champagne-50"
        >
          A Collection of Beautiful Moments
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 font-sans text-sm sm:text-base md:text-lg text-champagne-300/80 max-w-xl mx-auto font-light"
        >
          Every chapter tells a story of elegance, growth, spontaneous joy, and memories that shine forever.
        </motion.p>
      </div>

      {/* Vertical Animated Timeline */}
      <div className="relative">
        {/* Central Connecting Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-400/60 via-roseGold-400/60 to-amber-300/30 transform md:-translate-x-1/2" />

        <div className="space-y-12 sm:space-y-16">
          {siteConfig.timeline.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Center Node / Dot */}
                <div className="absolute left-4 md:left-1/2 top-6 transform -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-night-900 border-2 border-amber-400 p-1 shadow-[0_0_15px_rgba(212,175,55,0.8)] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-amber-300 to-roseGold-400 animate-pulse" />
                  </div>
                </div>

                {/* Content Card (Left or Right on desktop) */}
                <div className="pl-12 md:pl-0 w-full md:w-1/2 md:px-8">
                  <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-amber-400/30 shadow-2xl transition-all duration-300 hover:-translate-y-1 group">
                    {/* Chapter & Tag */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs uppercase tracking-widest text-amber-300 font-bold">
                        {item.year}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-roseGold-300 bg-roseGold-400/10 px-2.5 py-0.5 rounded-full border border-roseGold-400/20">
                        {item.date}
                      </span>
                    </div>

                    {/* Image if present */}
                    {item.image && (
                      <div className="relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden mb-4 bg-night-900">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 500px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-night-900/80 via-transparent to-transparent" />
                      </div>
                    )}

                    {/* Text Details */}
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-amber-200 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-amber-300/80 font-medium mb-2">
                      {item.subtitle}
                    </p>
                    <p className="font-sans text-xs sm:text-sm text-champagne-200/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
