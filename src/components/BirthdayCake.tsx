"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Heart,
  Flame,
  RotateCcw,
  Utensils,
  PartyPopper,
  CheckCircle2,
  Smile,
  Send,
  Share2,
} from "lucide-react";
import { triggerBirthdayConfetti, triggerHeartBurst } from "@/utils/confetti";
import { siteConfig } from "@/config/siteConfig";

type RitualStep = "lit" | "blown" | "cut" | "eaten";

export default function BirthdayCake() {
  const [step, setStep] = useState<RitualStep>("lit");
  const [isKnifeActive, setIsKnifeActive] = useState(false);
  const [sliceProgress, setSliceProgress] = useState(0);

  // Play synthetic pleasant sound effects
  const playSound = (type: "blow" | "slice" | "cheer") => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      if (type === "blow") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.6);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      } else if (type === "slice") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === "cheer") {
        const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
          gain.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + i * 0.1 + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.1 + 0.8);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.1);
          osc.stop(ctx.currentTime + i * 0.1 + 0.9);
        });
      }
    } catch (e) {
      // Audio fallback
    }
  };

  // Step 1: Blow out 24 candles
  const handleBlowOut = () => {
    if (step !== "lit") return;
    playSound("blow");
    setStep("blown");
    triggerBirthdayConfetti();
    setTimeout(() => {
      playSound("cheer");
    }, 400);
  };

  // Step 2: Grab Knife
  const handleGrabKnife = () => {
    setIsKnifeActive(true);
    playSound("slice");
  };

  // Step 3: Cut the cake
  const handleCutCake = () => {
    if (step !== "blown") return;
    playSound("slice");
    setSliceProgress(100);

    setTimeout(() => {
      setStep("cut");
      setIsKnifeActive(false);
      playSound("cheer");
      triggerBirthdayConfetti();
    }, 600);
  };

  // Step 4: Virtual Bite
  const handleEatSlice = (e: React.MouseEvent) => {
    playSound("cheer");
    setStep("eaten");
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerHeartBurst(x, y);
  };

  // Step 5: WhatsApp Share to Dasun (+94715121506)
  const handleSendToDasun = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerHeartBurst(x, y);

    const message = encodeURIComponent(
      `Hey Dasun! ❤️ I just cut my 24th birthday cake on our website and I'm sharing the first sweet slice with you! 🎂🍰 Thank you for this beautiful surprise and for making my birthday so special! 🥰✨`
    );
    window.open(`https://wa.me/${siteConfig.yourPhone}?text=${message}`, "_blank");
  };

  // Step 6: WhatsApp Share to Shehara (+94721431597)
  const handleSendToShehara = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    triggerHeartBurst(x, y);

    const message = encodeURIComponent(
      `Happy 24th Birthday, my beautiful Shehara! 🎂 Here is a sweet virtual slice of your birthday cake made just for you! 🍰❤️ May all your dreams come true and may this year bring endless love and happiness! ✨💖`
    );
    window.open(`https://wa.me/${siteConfig.herPhone}?text=${message}`, "_blank");
  };

  // Replay
  const handleReset = () => {
    setStep("lit");
    setIsKnifeActive(false);
    setSliceProgress(0);
  };

  return (
    <section
      id="cake"
      className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-12 max-w-4xl mx-auto text-center overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[700px] h-[550px] bg-gradient-to-tr from-amber-500/10 via-roseGold-500/15 to-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-2xl mx-auto mb-10 sm:mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-gold mb-4 border border-amber-400/30 shadow-lg"
        >
          <PartyPopper className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
          <span className="text-xs uppercase tracking-[0.25em] text-amber-200 font-semibold">
            Interactive Birthday Celebration
          </span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-champagne-50"
        >
          Make a Wish & Cut the Cake 🎂
        </motion.h2>

        {/* Step-based instructions */}
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-4 font-sans text-sm sm:text-base text-champagne-200/90 max-w-lg mx-auto font-light leading-relaxed"
        >
          {step === "lit" &&
            `Close your eyes, make a secret 24th birthday wish in your heart, then tap the cake or button below to blow out your 24 candles, ${siteConfig.herName}! ✨`}
          {step === "blown" &&
            `Your wish is sent to the stars! ✨ Now click the button below to pick up the golden knife and cut your birthday cake! 🔪🍰`}
          {step === "cut" &&
            `Happy 24th Birthday, ${siteConfig.herName}! ❤️ Your freshly sliced celebratory cake is served. You can taste it and share a slice via WhatsApp!`}
          {step === "eaten" &&
            `Mmm, delicious! May your 24th year be full of sweet laughter, grand adventures, and boundless love! 💖`}
        </motion.p>
      </div>

      {/* Main Interactive Cake Station */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-xl mx-auto p-6 sm:p-10 rounded-3xl glass-panel border border-amber-400/25 shadow-2xl overflow-hidden"
      >
        {/* Step Progress Tracker */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              step === "lit"
                ? "bg-amber-400 text-night-900 shadow-md"
                : "bg-white/10 text-champagne-300"
            }`}
          >
            <span>1. Make Wish</span>
          </div>

          <span className="text-white/20">→</span>

          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              step === "blown"
                ? "bg-amber-400 text-night-900 shadow-md animate-pulse"
                : step === "cut" || step === "eaten"
                ? "bg-emerald-400/20 text-emerald-300 border border-emerald-400/30"
                : "bg-white/10 text-champagne-300"
            }`}
          >
            <span>2. Cut Cake 🔪</span>
          </div>

          <span className="text-white/20">→</span>

          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              step === "cut" || step === "eaten"
                ? "bg-gradient-to-r from-roseGold-400 to-amber-400 text-night-900 shadow-md"
                : "bg-white/10 text-champagne-300"
            }`}
          >
            <span>3. Share Slice 🍰</span>
          </div>
        </div>

        {/* Dynamic Celebration Banner */}
        <AnimatePresence mode="wait">
          {step === "blown" && (
            <motion.div
              key="wish-banner"
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15 }}
              className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-roseGold-500/20 to-amber-500/20 border border-amber-400/40 shadow-lg text-center"
            >
              <p className="font-serif text-lg sm:text-xl text-amber-200 font-bold">
                Candles Blown Out! Wish Registered ✨
              </p>
              <p className="text-xs text-roseGold-200 font-handwriting text-xl mt-0.5">
                Now let&apos;s cut the cake together, {siteConfig.herName}!
              </p>
            </motion.div>
          )}

          {(step === "cut" || step === "eaten") && (
            <motion.div
              key="slice-banner"
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15 }}
              className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-roseGold-500/20 via-amber-500/20 to-roseGold-500/20 border border-roseGold-400/40 shadow-xl text-center"
            >
              <p className="font-serif text-xl sm:text-2xl text-amber-200 font-bold">
                Happy 24th Birthday, {siteConfig.herName}! 🍰✨
              </p>
              <p className="text-xs sm:text-sm text-roseGold-200 font-handwriting text-2xl mt-1">
                A fresh sweet slice for the most wonderful girl ❤️
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🎂 THE TIERED BIRTHDAY CAKE & INTERACTIVE KNIFE 🔪 */}
        <div className="relative pt-4 pb-2 select-none">
          {/* Animated Golden Knife Overlay when cutting */}
          <AnimatePresence>
            {isKnifeActive && (
              <motion.div
                initial={{ x: -120, y: -80, rotate: -45, opacity: 0 }}
                animate={{
                  x: 0,
                  y: [0, 60, 0],
                  rotate: -25,
                  opacity: 1,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute top-10 right-8 sm:right-16 z-40 pointer-events-none filter drop-shadow-[0_10px_20px_rgba(245,158,11,0.6)]"
              >
                {/* Visual Knife Graphic */}
                <div className="flex items-center">
                  <div className="w-28 sm:w-36 h-6 bg-gradient-to-r from-white via-amber-100 to-amber-300 rounded-l-full border border-amber-400/80 shadow-inner flex items-center px-3">
                    <span className="text-[9px] font-serif font-bold text-amber-900/60 uppercase tracking-widest">
                      24K GOLD
                    </span>
                  </div>
                  <div className="w-12 sm:w-16 h-8 bg-gradient-to-r from-amber-700 via-roseGold-600 to-amber-800 rounded-r-lg border border-amber-300 shadow-md flex items-center justify-center">
                    <Heart className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 24 CANDLES SITTING FLUSH DIRECTLY ON TOP OF CAKE TIER 1 */}
          <div className="relative z-10 w-52 sm:w-68 mx-auto -mb-1">
            <div className="grid grid-cols-12 gap-1 sm:gap-1.5 items-end justify-items-center">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={`candle-${i}`} className="flex flex-col items-center">
                  {/* Flame */}
                  <div className="h-4 flex items-center justify-center">
                    {step === "lit" ? (
                      <div
                        className="w-2 h-3 sm:w-2.5 sm:h-3.5 bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 rounded-full flame-active shadow-[0_0_10px_#f59e0b]"
                        style={{ animationDelay: `${(i % 8) * 0.18}s` }}
                      />
                    ) : (
                      <div className="w-1 h-2.5 bg-white/40 rounded-full smoke-puff" />
                    )}
                  </div>
                  {/* Wick */}
                  <div className="w-[1.5px] h-1 bg-gray-400" />
                  {/* Candle Body sitting directly on top */}
                  <div
                    className={`w-1.5 sm:w-2 h-5 sm:h-6 rounded-t-xs border-x border-white/20 shadow-xs ${
                      i % 2 === 0
                        ? "bg-gradient-to-b from-amber-200 via-roseGold-300 to-amber-400"
                        : "bg-gradient-to-b from-roseGold-200 via-amber-300 to-roseGold-400"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* CAKE TIER 1: Top Strawberry Champagne Tier */}
          <div className="relative w-56 sm:w-72 h-14 sm:h-16 mx-auto rounded-t-2xl bg-gradient-to-r from-champagne-200 via-roseGold-100 to-champagne-200 border-t-2 border-x-2 border-white/40 shadow-inner flex items-center justify-center overflow-hidden z-0">
            {/* Cut line animation */}
            {sliceProgress > 0 && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 0.4 }}
                className="absolute top-0 right-16 w-1 bg-amber-400 shadow-[0_0_8px_#f59e0b] z-20"
              />
            )}

            {/* Frosting Drips */}
            <div className="absolute top-0 inset-x-0 h-2.5 bg-white/50 rounded-b-lg flex justify-around items-center px-2">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="w-1.5 h-1.5 rounded-full bg-roseGold-400/40 shadow-xs" />
              ))}
            </div>

            <span className="font-serif text-sm sm:text-base font-bold text-night-900 tracking-wider">
              {siteConfig.herName} • 24th
            </span>
          </div>

          {/* CAKE TIER 2: Bottom Rose Velvet Tier with Sliced Out Piece Effect */}
          <div className="relative w-72 sm:w-92 h-20 sm:h-24 mx-auto rounded-t-2xl bg-gradient-to-r from-roseGold-500 via-roseGold-400 to-roseGold-600 border-t-2 border-x-2 border-amber-300/40 shadow-2xl flex items-center justify-center">
            {/* Cut line indicator */}
            {sliceProgress > 0 && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 0.4 }}
                className="absolute top-0 right-20 w-1 bg-amber-400 shadow-[0_0_8px_#f59e0b] z-20"
              />
            )}

            <div className="absolute -top-1 inset-x-4 h-2 bg-amber-300/60 rounded-full blur-[1px]" />
            <div className="flex items-center gap-2 text-night-900 font-serif font-bold text-xs sm:text-sm tracking-widest uppercase">
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>Happy 24th Birthday</span>
              <Heart className="w-4 h-4 text-rose-300 fill-rose-300" />
            </div>
          </div>

          {/* Cake Stand Base */}
          <div className="w-80 sm:w-[380px] h-4 mx-auto rounded-full bg-gradient-to-r from-amber-400 via-champagne-100 to-amber-400 shadow-xl border border-white/40" />
          <div className="w-48 sm:w-60 h-2 mx-auto rounded-b-xl bg-amber-500/40" />
        </div>

        {/* 🍰 SERVED CAKE SLICE & WHATSAPP SHARING STATION */}
        <AnimatePresence>
          {(step === "cut" || step === "eaten") && (
            <motion.div
              initial={{ scale: 0, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="mt-6 p-6 sm:p-7 rounded-2xl glass-panel-gold border border-amber-400/40 max-w-md mx-auto shadow-2xl flex flex-col items-center text-center"
            >
              {/* Plate with Cake Slice Graphic */}
              <div className="relative w-28 h-24 mb-3 flex items-center justify-center">
                {/* Golden Plate */}
                <div className="w-28 h-8 rounded-full bg-gradient-to-r from-amber-300 via-champagne-100 to-amber-300 shadow-md border border-white/60 absolute bottom-0" />

                {/* Sliced Cake Piece */}
                {step !== "eaten" ? (
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 flex flex-col items-center"
                  >
                    {/* Strawberry / Golden Cherry Top */}
                    <div className="w-4 h-4 rounded-full bg-rose-600 shadow-sm flex items-center justify-center -mb-1">
                      <div className="w-1.5 h-1 bg-emerald-500 rounded-full" />
                    </div>

                    {/* Cake Slice Triangle */}
                    <div
                      className="w-16 h-12 bg-gradient-to-r from-roseGold-400 via-champagne-200 to-roseGold-500 border border-white/40 shadow-lg flex items-center justify-center rounded-sm"
                      style={{
                        clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
                      }}
                    />
                  </motion.div>
                ) : (
                  <div className="relative z-10 text-roseGold-300 font-serif text-sm font-bold animate-pulse">
                    ✨ Clean Plate! ❤️
                  </div>
                )}
              </div>

              <h4 className="font-serif text-lg font-bold text-white mb-1">
                Shehara&apos;s Birthday Slice 🍰
              </h4>
              <p className="text-xs text-champagne-200/80 mb-5">
                {step === "eaten"
                  ? "Sweetness enjoyed! Share this special moment on WhatsApp below!"
                  : "Freshly cut, full of sweet wishes. Taste a bite or share with each other!"}
              </p>

              {/* Action Buttons: Taste + WhatsApp Shares */}
              <div className="w-full space-y-2.5">
                {step === "cut" && (
                  <button
                    onClick={handleEatSlice}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-lg hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Smile className="w-4 h-4" />
                    <span>Taste Virtual Slice 🍓</span>
                  </button>
                )}

                {/* WhatsApp Share 1: Feed/Send to Dasun */}
                <button
                  onClick={handleSendToDasun}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Feed a Slice to Dasun (WhatsApp) 🍰</span>
                </button>

                {/* WhatsApp Share 2: Send to Shehara */}
                <button
                  onClick={handleSendToShehara}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-[#25D366] to-emerald-600 hover:opacity-95 text-white shadow-lg hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Send a Slice to Shehara (WhatsApp) 💖</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🎮 ACTION CONTROL BUTTONS */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {/* Action Button 1: Blow out candles */}
          {step === "lit" && (
            <button
              onClick={handleBlowOut}
              className="px-6 py-3 rounded-full font-serif font-bold text-sm bg-gradient-to-r from-amber-400 via-amber-300 to-roseGold-400 text-night-900 shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Flame className="w-4 h-4" />
              <span>Blow Out 24 Candles 🕯️</span>
            </button>
          )}

          {/* Action Button 2: Cut Cake with Knife */}
          {step === "blown" && !isKnifeActive && (
            <button
              onClick={handleGrabKnife}
              className="px-6 py-3 rounded-full font-serif font-bold text-sm bg-gradient-to-r from-amber-400 via-amber-300 to-roseGold-400 text-night-900 shadow-[0_0_25px_rgba(245,158,11,0.6)] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer animate-bounce"
            >
              <Utensils className="w-4 h-4" />
              <span>Pick Up Golden Knife & Cut 🔪</span>
            </button>
          )}

          {step === "blown" && isKnifeActive && (
            <button
              onClick={handleCutCake}
              className="px-6 py-3 rounded-full font-serif font-bold text-sm bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 text-night-900 shadow-[0_0_25px_rgba(16,185,129,0.6)] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Make The Slice Now! 🍰</span>
            </button>
          )}

          {/* Action Button 3: Replay / Relight */}
          {(step === "cut" || step === "eaten" || step === "blown") && (
            <button
              onClick={handleReset}
              className="px-4 py-2.5 rounded-full text-xs font-medium bg-white/10 hover:bg-white/20 text-champagne-200 border border-white/15 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
              <span>Replay Birthday Ritual 🎂</span>
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
