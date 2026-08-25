"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Heart, Sparkles, MapPin } from "lucide-react";
import { PhotoItem } from "@/config/siteConfig";
import { getAssetPath } from "@/utils/assetPath";

interface LightboxProps {
  photo: PhotoItem | null;
  photos: PhotoItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelectPhoto: (photo: PhotoItem) => void;
}

export default function Lightbox({
  photo,
  photos,
  isOpen,
  onClose,
  onSelectPhoto,
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !photo) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, photo, photos]);

  if (!isOpen || !photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + photos.length) % photos.length;
    onSelectPhoto(photos[prevIdx]);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % photos.length;
    onSelectPhoto(photos[nextIdx]);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-night-900/90 backdrop-blur-2xl"
        onClick={onClose}
      >
        {/* Top Control Bar */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-50 flex items-center gap-3">
          <div className="text-xs text-champagne-300/70 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            {currentIndex + 1} / {photos.length}
          </div>
          <button
            onClick={onClose}
            className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-champagne-100 transition-colors border border-white/15 cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Previous Navigation Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-40 p-2.5 sm:p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-champagne-100 backdrop-blur-md border border-white/15 transition-all hover:scale-110 cursor-pointer"
          aria-label="Previous Photo"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Next Navigation Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-40 p-2.5 sm:p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-champagne-100 backdrop-blur-md border border-white/15 transition-all hover:scale-110 cursor-pointer"
          aria-label="Next Photo"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Main Lightbox Content Container */}
        <motion.div
          key={photo.id}
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center glass-panel rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-2xl p-2 sm:p-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image Box */}
          <div className="relative w-full h-[55vh] sm:h-[65vh] rounded-xl sm:rounded-2xl overflow-hidden bg-night-900">
            <Image
              src={getAssetPath(photo.src)}
              alt={photo.alt}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 95vw, 1000px"
              priority
            />
          </div>

          {/* Caption Box */}
          <div className="w-full pt-3 sm:pt-4 px-2 sm:px-4 pb-2 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h3 className="font-serif text-lg sm:text-xl text-champagne-100 font-semibold">
                  {photo.title}
                </h3>
                {photo.tag && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                    {photo.tag}
                  </span>
                )}
              </div>
              <p className="font-sans text-xs sm:text-sm text-champagne-200/80 mt-1 max-w-xl">
                {photo.caption}
              </p>
            </div>

            {photo.location && (
              <div className="flex items-center gap-1.5 text-xs text-roseGold-300/80 shrink-0">
                <MapPin className="w-3.5 h-3.5 text-roseGold-400" />
                <span>{photo.location}</span>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
