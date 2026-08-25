"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Maximize2,
  Heart,
  RotateCw,
  Stamp,
  Shuffle,
  Camera,
  Film,
  Layers,
  MapPin,
  MessageCircleHeart,
  ChevronLeft,
  ChevronRight,
  Flame,
} from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import Lightbox from "./Lightbox";
import { triggerHeartBurst, triggerBirthdayConfetti } from "@/utils/confetti";

type GalleryMode = "scrapbook" | "filmstrip" | "showcase";

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [likes, setLikes] = useState<Record<string, number>>({
    "photo-1": 12,
    "photo-2": 24,
    "photo-3": 18,
    "photo-4": 15,
  });
  const [galleryMode, setGalleryMode] = useState<GalleryMode>("scrapbook");
  const [shuffleKey, setShuffleKey] = useState(0);

  const toggleFlip = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerHeartBurst(x, y);
  };

  const handleScatter = () => {
    setShuffleKey((prev) => prev + 1);
  };

  const handleShowerLove = () => {
    triggerBirthdayConfetti();
  };

  return (
    <section
      id="gallery"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[85vw] max-w-[900px] h-[500px] bg-gradient-to-r from-roseGold-500/10 via-amber-500/10 to-roseGold-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-rose mb-4 border border-roseGold-400/30 shadow-lg"
        >
          <Camera className="w-3.5 h-3.5 text-roseGold-300 animate-pulse" />
          <span className="text-xs uppercase tracking-[0.25em] text-roseGold-200 font-semibold">
            Shehara&apos;s Memory Keepsake
          </span>
          <Heart className="w-3.5 h-3.5 text-roseGold-400 fill-roseGold-400" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-champagne-50 leading-tight"
        >
          Cherished Moments of <span className="gradient-text-rose font-display italic">Shehara</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 font-sans text-sm sm:text-base md:text-lg text-champagne-300/85 max-w-xl mx-auto font-light leading-relaxed"
        >
          Every photograph holds a story of radiant laughter, golden sunsets, and pure magic. Tap any Polaroid to flip it and read a sweet personal note on the back! 💌
        </motion.p>

        {/* Interactive Controls Bar: Mode Switcher & Fun Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-8"
        >
          {/* Mode Switchers */}
          <div className="flex items-center p-1 rounded-full glass-panel border border-white/10 shadow-lg">
            <button
              onClick={() => setGalleryMode("scrapbook")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                galleryMode === "scrapbook"
                  ? "bg-gradient-to-r from-amber-400 to-roseGold-400 text-night-900 font-bold shadow-md"
                  : "text-champagne-300 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Polaroid Scrapbook</span>
            </button>

            <button
              onClick={() => setGalleryMode("filmstrip")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                galleryMode === "filmstrip"
                  ? "bg-gradient-to-r from-amber-400 to-roseGold-400 text-night-900 font-bold shadow-md"
                  : "text-champagne-300 hover:text-white"
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Cinematic Filmstrip</span>
            </button>
          </div>

          {/* Shuffle Polaroids */}
          <button
            onClick={handleScatter}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full glass-pill text-xs text-champagne-200 hover:text-amber-200 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
            title="Randomize photo tilts"
          >
            <Shuffle className="w-3.5 h-3.5 text-amber-300" />
            <span>Shuffle Tilt</span>
          </button>

          {/* Shower Hearts */}
          <button
            onClick={handleShowerLove}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-gradient-to-r from-roseGold-500/20 to-amber-500/20 text-xs text-roseGold-200 hover:text-white border border-roseGold-400/40 hover:bg-roseGold-500/30 transition-all cursor-pointer shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Shower Love ✨</span>
          </button>
        </motion.div>
      </div>

      {/* GALLERY MODE 1: ROMANTIC POLAROID SCRAPBOOK */}
      {galleryMode === "scrapbook" && (
        <div
          key={shuffleKey}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 items-start pt-4"
        >
          {siteConfig.galleryPhotos.map((photo: any, index: number) => {
            const isFlipped = flippedCards[photo.id];
            const baseRotations = [-2.5, 3, -2, 2.5];
            const randomRotation =
              baseRotations[index % baseRotations.length] + (shuffleKey % 3) * 0.5;

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 40, rotate: 0 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: randomRotation,
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                whileHover={{
                  scale: 1.04,
                  rotate: 0,
                  zIndex: 20,
                  transition: { duration: 0.3 },
                }}
                className="relative group cursor-pointer"
                style={{ perspective: 1200 }}
              >
                {/* Washi Tape at Top */}
                <div
                  className={`absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 w-24 sm:w-28 h-6 bg-gradient-to-r ${photo.tapeColor} backdrop-blur-md opacity-85 shadow-sm transform -rotate-2 border-y border-white/30 rounded-xs pointer-events-none`}
                />

                {/* 3D Flipping Card Container */}
                <div
                  onClick={() => toggleFlip(photo.id)}
                  className="relative w-full rounded-2xl transition-transform duration-700 shadow-[0_20px_45px_rgba(0,0,0,0.5)] border border-white/20"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* FRONT OF POLAROID */}
                  <div
                    className="w-full bg-[#fbf9f5] rounded-2xl p-4 sm:p-5 text-night-900 flex flex-col justify-between"
                    style={{
                      backfaceVisibility: "hidden",
                      boxShadow: "inset 0 0 20px rgba(0,0,0,0.03)",
                    }}
                  >
                    {/* Glossy Photo Frame */}
                    <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-night-900 shadow-inner mb-4">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover object-center filter contrast-[1.03] group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      {/* Subtle Glare overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />

                      {/* Expand Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPhoto(photo);
                        }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-night-900/70 backdrop-blur-md text-white border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
                        title="View Fullscreen"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Location Badge */}
                      {photo.location && (
                        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-night-900/60 backdrop-blur-md text-[10px] text-champagne-200 border border-white/10">
                          <MapPin className="w-2.5 h-2.5 text-amber-300" />
                          <span>{photo.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Polaroid Bottom Note Area */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-amber-800/80">
                          {photo.tag}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-rose-700/80 font-handwriting">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          <span>Shehara</span>
                        </div>
                      </div>

                      <h3 className="font-handwriting text-2xl font-bold text-night-900 leading-tight">
                        {photo.title}
                      </h3>

                      <p className="font-sans text-[11px] text-gray-600 line-clamp-2 leading-relaxed">
                        {photo.caption}
                      </p>

                      {/* Action Bar: Flip Button & Like Heart Stamp */}
                      <div className="pt-3 mt-2 border-t border-gray-200/80 flex items-center justify-between">
                        {/* Flip button */}
                        <button
                          onClick={(e) => toggleFlip(photo.id, e)}
                          className="flex items-center gap-1 text-[11px] text-amber-800 hover:text-amber-950 font-medium hover:underline cursor-pointer"
                        >
                          <RotateCw className="w-3 h-3" />
                          <span>Read Note 💌</span>
                        </button>

                        {/* Love Stamp */}
                        <button
                          onClick={(e) => handleLike(photo.id, e)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100/80 hover:bg-rose-200 text-rose-800 text-xs font-semibold transition-transform active:scale-125 cursor-pointer shadow-xs"
                          title="Leave a love stamp"
                        >
                          <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
                          <span>{likes[photo.id] || 0}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* BACK OF POLAROID (Secret Handwritten Note) */}
                  <div
                    className="absolute inset-0 w-full h-full bg-[#FAF5EC] rounded-2xl p-6 sm:p-7 text-night-900 flex flex-col justify-between border border-amber-900/10 shadow-2xl"
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                      backgroundImage:
                        "repeating-linear-gradient(transparent, transparent 27px, rgba(212, 175, 55, 0.15) 28px)",
                    }}
                  >
                    {/* Top Postage Stamp & Wax Stamp */}
                    <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
                      <div className="flex items-center gap-1.5 text-xs text-amber-900 font-bold uppercase tracking-wider">
                        <MessageCircleHeart className="w-4 h-4 text-rose-600" />
                        <span>A Note for Shehara</span>
                      </div>

                      {/* Cute Postage Stamp */}
                      <div className="w-9 h-11 border-2 border-dashed border-rose-400 bg-rose-50 p-0.5 rounded-xs flex flex-col items-center justify-center shadow-xs">
                        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                        <span className="text-[8px] font-serif font-bold text-rose-800 mt-0.5">24th</span>
                      </div>
                    </div>

                    {/* Handwritten Secret Note */}
                    <div className="my-auto py-2">
                      <p className="font-handwriting text-xl sm:text-2xl text-night-900/90 leading-relaxed">
                        &ldquo;{photo.backNote}&rdquo;
                      </p>
                    </div>

                    {/* Bottom Close / Flip Back */}
                    <div className="pt-2 border-t border-amber-900/10 flex items-center justify-between">
                      <span className="text-xs text-gray-500 font-handwriting text-lg">
                        — Forever special
                      </span>

                      <button
                        onClick={(e) => toggleFlip(photo.id, e)}
                        className="px-3 py-1 rounded-full bg-night-900 text-champagne-100 text-xs font-medium hover:bg-night-800 transition-colors flex items-center gap-1"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>Flip Back</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* GALLERY MODE 2: CINEMATIC FILMSTRIP */}
      {galleryMode === "filmstrip" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative glass-panel rounded-3xl p-6 sm:p-8 border border-white/15 overflow-hidden shadow-2xl"
        >
          {/* Top Film Perforation Strip */}
          <div className="flex justify-between items-center pb-4 mb-6 border-b border-white/10 overflow-hidden">
            <div className="flex items-center gap-2 text-xs text-amber-300 font-mono tracking-widest uppercase">
              <Film className="w-4 h-4" />
              <span>SHEHARA MEMORY ROLL • 35MM ISO-100 • 24TH EDITION</span>
            </div>
            <div className="hidden sm:flex gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-3.5 h-2.5 rounded-xs bg-white/20" />
              ))}
            </div>
          </div>

          {/* Film Frames Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.galleryPhotos.map((photo: any, idx: number) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative rounded-2xl overflow-hidden bg-black/60 border-2 border-white/10 hover:border-amber-400/50 transition-all duration-500 cursor-pointer shadow-xl"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover object-center group-hover:scale-108 transition-transform duration-700 filter brightness-[0.9]"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                  {/* Frame Number Badge */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-amber-300 border border-white/10">
                    FRAME 0{idx + 1}A
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] uppercase tracking-widest text-roseGold-300 font-semibold block mb-0.5">
                      {photo.tag}
                    </span>
                    <h4 className="font-serif text-base text-white font-bold group-hover:text-amber-200 transition-colors">
                      {photo.title}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Film Strip Details */}
          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-champagne-300/70 font-mono">
            <span>TAKE #24 • CELEBRATING SHEHARA</span>
            <button
              onClick={() => setSelectedPhoto(siteConfig.galleryPhotos[0])}
              className="text-amber-300 hover:underline flex items-center gap-1"
            >
              <span>Open Cinema Lightbox</span>
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Lightbox Modal */}
      <Lightbox
        photo={selectedPhoto}
        photos={siteConfig.galleryPhotos}
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onSelectPhoto={(photo) => setSelectedPhoto(photo)}
      />
    </section>
  );
}
