"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Sparkles, ArrowUp } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import EasterEggModal from "./EasterEggModal";
import { triggerHeartBurst } from "@/utils/confetti";
import { getAssetPath } from "@/utils/assetPath";

export default function FinalSection() {
  const [clickCount, setClickCount] = useState(0);
  const [easterEggOpen, setEasterEggOpen] = useState(false);

  const handleFooterHeartClick = (e: React.MouseEvent) => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerHeartBurst(x, y);

    if (newCount >= siteConfig.easterEgg.triggerCount) {
      setEasterEggOpen(true);
      setClickCount(0);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative pt-24 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-12 bg-night-900 overflow-hidden border-t border-white/5">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85vw] max-w-[800px] h-[400px] bg-gradient-to-t from-roseGold-500/10 via-amber-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Closing Portrait Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full p-1.5 bg-gradient-to-tr from-amber-400 via-roseGold-400 to-amber-300 shadow-[0_0_50px_rgba(224,122,95,0.4)] mb-8 overflow-hidden group cursor-pointer"
          onClick={scrollToTop}
        >
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src={getAssetPath(siteConfig.finalImage)}
              alt="Closing Portrait"
              fill
              className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
              sizes="250px"
            />
          </div>
        </motion.div>

        {/* Closing Headings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-3 mb-6"
        >
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            Happy 24th Birthday, <span className="gradient-text-gold">{siteConfig.herName}</span> ❤️
          </h2>

          <p className="font-sans text-base sm:text-lg text-champagne-200/90 max-w-xl mx-auto font-light">
            Here&apos;s to another year of beautiful memories.
          </p>

          <p className="font-display italic text-lg sm:text-xl text-roseGold-200">
            And hopefully... many more moments together.
          </p>
        </motion.div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="mt-6 px-5 py-2 rounded-full glass-panel text-xs text-champagne-300 hover:text-white border border-white/10 hover:border-amber-400/30 transition-all flex items-center gap-1.5 cursor-pointer group"
        >
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-amber-300" />
          <span>Back to Top</span>
        </button>

        {/* Bottom Credits & Secret Easter Egg Trigger */}
        <div className="mt-16 pt-8 border-t border-white/10 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-champagne-400/60">
          <p>
            Celebrating 24 Beautiful Years • {siteConfig.herName}
          </p>

          {/* Interactive Easter Egg Heart */}
          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <button
              onClick={handleFooterHeartClick}
              className="p-1 text-roseGold-400 hover:text-roseGold-300 hover:scale-125 transition-transform cursor-pointer relative"
              title="A secret rests here..."
            >
              <Heart className="w-4 h-4 fill-current animate-pulse" />
              {clickCount > 0 && clickCount < siteConfig.easterEgg.triggerCount && (
                <span className="absolute -top-3 -right-2 text-[10px] text-amber-300 font-bold bg-night-900/90 px-1 rounded-full border border-amber-300/30">
                  {clickCount}/{siteConfig.easterEgg.triggerCount}
                </span>
              )}
            </button>
            <span>just for you</span>
          </div>
        </div>
      </div>

      {/* Secret Easter Egg Modal */}
      <EasterEggModal
        isOpen={easterEggOpen}
        onClose={() => setEasterEggOpen(false)}
      />
    </footer>
  );
}
