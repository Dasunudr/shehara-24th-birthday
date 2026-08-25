"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Film, X, Volume2, VolumeX, Sparkles, Clock } from "lucide-react";
import { siteConfig, VideoItem } from "@/config/siteConfig";
import { getAssetPath } from "@/utils/assetPath";

export default function VideoSection() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [videoError, setVideoError] = useState<Record<string, boolean>>({});

  const handleVideoError = (id: string) => {
    setVideoError((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="videos" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 bg-night-850/50 border-y border-white/5">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[800px] h-[400px] bg-roseGold-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel-gold mb-4 border border-amber-400/30"
          >
            <Film className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-xs uppercase tracking-[0.2em] text-amber-200 font-medium">
              Motion & Memories
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-champagne-50"
          >
            Little Moments, Big Memories
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 font-sans text-sm sm:text-base md:text-lg text-champagne-300/80 max-w-xl mx-auto font-light"
          >
            Because photographs capture a split second, but video remembers the way you laugh, talk, and light up the room.
          </motion.p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {siteConfig.videos.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-xl hover:border-amber-400/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] cursor-pointer"
              onClick={() => setActiveVideo(video)}
            >
              {/* Poster / Thumbnail Box */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-night-900">
                {video.poster ? (
                  <Image
                    src={getAssetPath(video.poster)}
                    alt={video.title}
                    fill
                    className="object-cover object-center filter brightness-[0.8] group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-night-800">
                    <Film className="w-12 h-12 text-champagne-400/30" />
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-night-900 via-night-900/40 to-transparent" />

                {/* Duration Badge */}
                {video.duration && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-night-900/70 backdrop-blur-md border border-white/15 text-[11px] text-champagne-200">
                    <Clock className="w-3 h-3 text-amber-300" />
                    <span>{video.duration}</span>
                  </div>
                )}

                {/* Floating Central Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-400 to-roseGold-400 p-0.5 shadow-[0_0_30px_rgba(245,158,11,0.5)] transform group-hover:scale-110 transition-transform duration-300">
                    <div className="w-full h-full rounded-full bg-night-900/80 backdrop-blur-sm flex items-center justify-center text-amber-300 group-hover:text-white transition-colors">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Meta Info */}
              <div className="p-6">
                <span className="text-[11px] uppercase tracking-widest text-amber-300 font-semibold mb-1 block">
                  {video.subtitle}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-white font-bold mb-2 group-hover:text-amber-200 transition-colors">
                  {video.title}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-champagne-200/80 line-clamp-2">
                  {video.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cinematic Fullscreen Video Modal Player */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-night-900/95 backdrop-blur-2xl"
            onClick={() => setActiveVideo(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-champagne-100 transition-colors border border-white/15 cursor-pointer"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Container Box */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-4xl w-full glass-panel rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl p-2 sm:p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                {videoError[activeVideo.id] ? (
                  <div className="text-center p-8 flex flex-col items-center">
                    <Film className="w-12 h-12 text-amber-300 mb-3" />
                    <h4 className="font-serif text-xl text-white mb-2">{activeVideo.title}</h4>
                    <p className="text-xs text-champagne-300/80 max-w-md">
                      Video file ready to be placed at <code className="text-amber-300 bg-white/10 px-1.5 py-0.5 rounded">{activeVideo.src}</code>.
                    </p>
                  </div>
                ) : (
                  <video
                    src={getAssetPath(activeVideo.src)}
                    poster={activeVideo.poster ? getAssetPath(activeVideo.poster) : undefined}
                    controls
                    autoPlay
                    playsInline
                    onError={() => handleVideoError(activeVideo.id)}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Title & Caption */}
              <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif text-xl text-white font-semibold">
                    {activeVideo.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-champagne-300/80">
                    {activeVideo.caption}
                  </p>
                </div>
                <span className="text-xs uppercase tracking-wider text-amber-300 bg-amber-400/15 px-3 py-1 rounded-full border border-amber-400/30">
                  {activeVideo.subtitle}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
