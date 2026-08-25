"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Volume2, VolumeX, Sparkles, Disc } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { ambientSynth } from "@/utils/audioSynth";
import { getAssetPath } from "@/utils/assetPath";

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export default function MusicPlayer({ isPlaying, onToggle }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [useSynth, setUseSynth] = useState(false);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(getAssetPath(siteConfig.music.src));
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;

      audioRef.current.addEventListener("error", () => {
        // If MP3 is not yet uploaded in public/audio, use synthetic ambient audio
        setUseSynth(true);
      });
    }
  }, []);

  useEffect(() => {
    if (isPlaying) {
      if (!useSynth && audioRef.current) {
        audioRef.current.play().catch(() => {
          // If browser policy blocks file or file doesn't exist, start synthetic chords
          setUseSynth(true);
          ambientSynth?.play();
        });
      } else {
        ambientSynth?.play();
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      ambientSynth?.pause();
    }
  }, [isPlaying, useSynth]);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 glass-panel rounded-full p-2 pr-4 border border-amber-400/20 shadow-2xl backdrop-blur-xl group hover:border-amber-400/50 transition-all"
      >
        {/* Vinyl / Disc Spinner Button */}
        <button
          onClick={onToggle}
          className="relative w-11 h-11 rounded-full bg-night-900 border border-white/20 flex items-center justify-center overflow-hidden cursor-pointer shadow-md hover:scale-105 transition-transform"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          <div
            className={`w-full h-full rounded-full bg-gradient-to-tr from-night-900 via-amber-900/40 to-night-900 flex items-center justify-center ${
              isPlaying ? "animate-spin-slow" : ""
            }`}
          >
            {/* Vinyl grooving rings */}
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-amber-400 to-roseGold-400 p-[1px]">
                <div className="w-full h-full rounded-full bg-night-900 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
                </div>
              </div>
            </div>
          </div>
        </button>

        {/* Info & Animated Equalizer */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium text-champagne-100">
              {isPlaying ? "Now Playing" : "Birthday Melody"}
            </span>
            {isPlaying && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            )}
          </div>

          {/* Equalizer Bars */}
          <div className="flex items-end gap-1 h-3 mt-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`w-1 rounded-full bg-gradient-to-t from-amber-400 to-roseGold-400 transition-all duration-300 ${
                  isPlaying ? "animate-pulse" : "h-1 opacity-30"
                }`}
                style={{
                  height: isPlaying ? `${Math.sin(i * 1.5) * 6 + 7}px` : "3px",
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Play / Pause indicator icon */}
        <button
          onClick={onToggle}
          className="ml-1 text-champagne-300 hover:text-amber-300 transition-colors p-1"
        >
          {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </motion.div>
    </div>
  );
}
