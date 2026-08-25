"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, ChevronDown, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { getAssetPath } from "@/utils/assetPath";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const scrollToNext = () => {
    const gallery = document.querySelector("#gallery");
    if (gallery) {
      gallery.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden bg-night-900 pt-20 pb-12"
    >
      {/* Background Cinematic Video Container */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-night-900">
        <video
          ref={videoRef}
          src={getAssetPath("/videos/video-01.mp4")}
          poster={getAssetPath(siteConfig.heroImage)}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.03]"
        />

        {/* Clean, Non-blocking Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-night-900 via-night-900/30 to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(13,10,18,0.75)_100%)]" />

        {/* Soft Golden Sunset Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[600px] h-[50vw] max-h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center justify-center my-auto">
        {/* Top Tag / Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-gold mb-6 border border-amber-400/30 shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
          <span className="text-xs uppercase tracking-[0.25em] text-champagne-100 font-medium">
            A Special Day For Someone Extraordinary
          </span>
          <Heart className="w-3.5 h-3.5 text-roseGold-400 fill-roseGold-400" />
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3"
        >
          <h2 className="font-display italic text-xl sm:text-2xl md:text-3xl text-roseGold-200 tracking-wide font-normal">
            Celebrating 24 Beautiful Years of
          </h2>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-glow-gold gradient-text-gold leading-[1.05]">
            {siteConfig.herName}
          </h1>
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-champagne-100 font-semibold tracking-wide text-glow-rose">
            Happy 24th Birthday ✨
          </p>
        </motion.div>

        {/* Emotional Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-6 max-w-2xl"
        >
          <p className="font-sans text-base sm:text-lg md:text-xl text-champagne-100/90 font-light leading-relaxed tracking-wide drop-shadow-md">
            &ldquo;{siteConfig.subheading}&rdquo;
          </p>
        </motion.div>
      </div>

      {/* Video Controls (Mute/Unmute & Play/Pause) floating bottom right */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
        <button
          onClick={togglePlay}
          className="p-2.5 rounded-full glass-panel bg-night-900/60 hover:bg-night-900/90 text-champagne-100 border border-white/20 transition-all hover:scale-105 backdrop-blur-md cursor-pointer shadow-lg"
          title={isPlaying ? "Pause background video" : "Play background video"}
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? <Pause className="w-4 h-4 text-amber-300" /> : <Play className="w-4 h-4 text-amber-300 fill-amber-300" />}
        </button>
        <button
          onClick={toggleMute}
          className="p-2.5 rounded-full glass-panel bg-night-900/60 hover:bg-night-900/90 text-champagne-100 border border-white/20 transition-all hover:scale-105 backdrop-blur-md cursor-pointer shadow-lg"
          title={isMuted ? "Unmute video sound" : "Mute video sound"}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-champagne-300" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
        </button>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1.2,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-champagne-300/70 hover:text-champagne-100 transition-colors cursor-pointer group"
        aria-label="Scroll to begin"
      >
        <span className="text-xs uppercase tracking-[0.2em] font-light group-hover:tracking-[0.25em] transition-all">
          Scroll to begin
        </span>
        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:border-amber-400/40 transition-colors">
          <ChevronDown className="w-4 h-4 text-amber-300 animate-bounce" />
        </div>
      </motion.button>
    </section>
  );
}
