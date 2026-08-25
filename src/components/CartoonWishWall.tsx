"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Heart,
  Shuffle,
  PartyPopper,
  Smile,
  X,
  MessageCircle,
  Stars,
  Quote,
} from "lucide-react";
import { triggerBirthdayConfetti, triggerHeartBurst } from "@/utils/confetti";

interface Cartoon3DCharacter {
  id: string;
  name: string;
  universe: string;
  emoji: string;
  color: string;
  accentColor: string;
  borderColor: string;
  quote: string;
  catchphrase: string;
  svgType: "minion" | "stitch" | "pooh" | "olaf" | "pikachu" | "baymax" | "spongebob" | "simba";
}

export default function CartoonWishWall() {
  const [selectedCharacter, setSelectedCharacter] = useState<Cartoon3DCharacter | null>(null);
  const [leftPeeker, setLeftPeeker] = useState<boolean>(true);
  const [rightPeeker, setRightPeeker] = useState<boolean>(true);

  const characters: Cartoon3DCharacter[] = [
    {
      id: "minion",
      name: "Stuart the Minion",
      universe: "Despicable Me & Minions",
      emoji: "🍌",
      color: "#FACC15",
      accentColor: "#3B82F6",
      borderColor: "border-yellow-400/50",
      catchphrase: "“Bello! Tulaliloo ti amo, Shehara! Ba-ba-na-na! 🍌”",
      quote:
        "Bello Shehara! 🍌 Ba-ba-ba-banana! Poopaye 23, big celebration for 24! Gelato, banana, lots of love, and party horns for the queen of the day! Tulaliloo ti amo! Muak muak! 🎉🥳",
      svgType: "minion",
    },
    {
      id: "stitch",
      name: "Stitch (626)",
      universe: "Lilo & Stitch",
      emoji: "💙",
      color: "#3B82F6",
      accentColor: "#EC4899",
      borderColor: "border-blue-400/50",
      catchphrase: "“Aloha Shehara! Meega nala kweesta!”",
      quote:
        "‘Ohana means family, and family means celebrating Shehara's 24th birthday with maximum love, flowers, and lots of hugs! Ih! Happy Birthday Shehara! 🌺✨",
      svgType: "stitch",
    },
    {
      id: "pooh",
      name: "Winnie the Pooh",
      universe: "Hundred Acre Wood",
      emoji: "🍯",
      color: "#F59E0B",
      accentColor: "#EF4444",
      borderColor: "border-amber-400/50",
      catchphrase: "“Think, think, think... Sweetest Shehara!”",
      quote:
        "A day without a wonderful person like you, Shehara, is like a honey pot without a single drop of honey. Happy 24th Birthday! May your year be as sweet as golden honeycomb! 🍯❤️",
      svgType: "pooh",
    },
    {
      id: "olaf",
      name: "Olaf",
      universe: "Disney's Frozen",
      emoji: "⛄",
      color: "#06B6D4",
      accentColor: "#F97316",
      borderColor: "border-cyan-400/50",
      catchphrase: "“I like warm hugs!”",
      quote:
        "Hi Shehara! I'm Olaf and I like warm hugs! Some people are worth melting for, and on your 24th birthday, you deserve all the warm sunshine and love in Arendelle! ❄️💖",
      svgType: "olaf",
    },
    {
      id: "pikachu",
      name: "Pikachu",
      universe: "Pokémon",
      emoji: "⚡",
      color: "#EAB308",
      accentColor: "#EF4444",
      borderColor: "border-yellow-400/50",
      catchphrase: "“Pika-Pikachu! ⚡”",
      quote:
        "Pika-Pikachu! ⚡ (Translation: Happy 24th Birthday Shehara! You have an electric smile that powers up everyone's day! Sending you 100,000 volts of pure joy! 💛)",
      svgType: "pikachu",
    },
    {
      id: "baymax",
      name: "Baymax",
      universe: "Big Hero 6",
      emoji: "🤍",
      color: "#E2E8F0",
      accentColor: "#EF4444",
      borderColor: "border-white/50",
      catchphrase: "“Ba-la-la-la-la!”",
      quote:
        "Hello Shehara. I am Baymax, your personal birthday companion. My bio-scans indicate elevated levels of happiness today. On a scale of 1 to 10, your radiance is 100. (Fist bump: Ba-la-la-la-la) 🤍✨",
      svgType: "baymax",
    },
    {
      id: "spongebob",
      name: "SpongeBob",
      universe: "Bikini Bottom",
      emoji: "🧽",
      color: "#FBBF24",
      accentColor: "#3B82F6",
      borderColor: "border-yellow-400/50",
      catchphrase: "“I'm ready! Best day ever!”",
      quote:
        "I'm ready, I'm ready! Happy 24th Birthday, Shehara! Today is officially the BEST DAY EVER in all of Bikini Bottom! Sending you a deluxe Krabby Patty and jelly-fishing cheers! 🍍🫧",
      svgType: "spongebob",
    },
    {
      id: "simba",
      name: "Simba",
      universe: "The Lion King",
      emoji: "🦁",
      color: "#F97316",
      accentColor: "#EAB308",
      borderColor: "border-orange-400/50",
      catchphrase: "“Hakuna Matata!”",
      quote:
        "Hakuna Matata, Shehara! No worries for the rest of your days! Walk into your 24th year with the confidence and grace of a true queen! 👑🌅",
      svgType: "simba",
    },
  ];

  // Play pleasant musical sound effect
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const notes = [587.33, 739.99, 880.0, 1174.66];
      notes.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.0001, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + idx * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.5);
      });
    } catch (e) {}
  };

  const handleSelectCharacter = (char: Cartoon3DCharacter, e?: React.MouseEvent) => {
    playChime();
    setSelectedCharacter(char);

    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      triggerHeartBurst(x, y);
    } else {
      triggerBirthdayConfetti();
    }
  };

  const handleRandomSurprise = () => {
    const randomIdx = Math.floor(Math.random() * characters.length);
    handleSelectCharacter(characters[randomIdx]);
  };

  // Render 3D Stylized Vector Graphic for each character
  const renderCharacter3D = (type: string) => {
    switch (type) {
      case "minion":
        return (
          <div className="relative w-24 h-28 sm:w-28 sm:h-32 flex flex-col items-center justify-end">
            {/* Party Hat */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-300 shadow-sm animate-ping" />
              <div
                className="w-8 h-8 bg-gradient-to-b from-rose-500 via-amber-400 to-rose-600 shadow-md"
                style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
              />
            </div>
            {/* Yellow Capsule Head/Body */}
            <div className="relative w-20 sm:w-22 h-24 bg-gradient-to-tr from-yellow-500 via-yellow-400 to-amber-300 rounded-t-full rounded-b-3xl shadow-xl flex flex-col items-center justify-between border-2 border-yellow-300/60 overflow-hidden">
              {/* Metallic Goggle Strap */}
              <div className="w-full h-3 bg-night-900 mt-5 flex items-center justify-center relative">
                {/* Silver Goggle Eye */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600 p-1 border-2 border-gray-700 shadow-lg flex items-center justify-center -my-3 z-20">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center relative shadow-inner">
                    {/* Iris & Pupil */}
                    <div className="w-4 h-4 rounded-full bg-amber-800 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-black relative">
                        <div className="w-0.5 h-0.5 rounded-full bg-white absolute top-0.5 right-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Smile */}
              <div className="w-7 h-3 border-b-3 border-amber-900 rounded-full mt-2 mb-1" />
              {/* Denim Overalls */}
              <div className="w-full h-9 bg-gradient-to-b from-blue-600 to-blue-800 rounded-t-sm border-t border-blue-400 flex items-center justify-center relative">
                <div className="w-4 h-4 rounded-full bg-blue-900 border border-blue-400 flex items-center justify-center">
                  <span className="text-[7px] font-bold text-white">G</span>
                </div>
              </div>
            </div>
            {/* Shoes */}
            <div className="flex gap-2 -mt-1">
              <div className="w-4 h-2 bg-night-900 rounded-b-md" />
              <div className="w-4 h-2 bg-night-900 rounded-b-md" />
            </div>
          </div>
        );

      case "stitch":
        return (
          <div className="relative w-24 h-28 sm:w-28 sm:h-32 flex flex-col items-center justify-end">
            {/* Big Blue Alien Ears */}
            <div className="absolute top-2 -left-3 w-8 h-14 bg-gradient-to-tr from-blue-700 via-blue-500 to-pink-400 rounded-full transform -rotate-45 shadow-md" />
            <div className="absolute top-2 -right-3 w-8 h-14 bg-gradient-to-tl from-blue-700 via-blue-500 to-pink-400 rounded-full transform rotate-45 shadow-md" />
            {/* Head */}
            <div className="relative z-10 w-20 h-22 bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 rounded-full shadow-xl flex flex-col items-center justify-center border-2 border-blue-400/60 p-2">
              {/* Big Expressive Eyes */}
              <div className="flex gap-3 mb-1 mt-2">
                <div className="w-4 h-6 bg-night-900 rounded-full relative transform -rotate-6">
                  <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-1 right-1" />
                </div>
                <div className="w-4 h-6 bg-night-900 rounded-full relative transform rotate-6">
                  <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-1 left-1" />
                </div>
              </div>
              {/* Big Blue Nose */}
              <div className="w-5 h-3 bg-blue-900 rounded-full shadow-inner -mt-1" />
              {/* Wide Playful Smile */}
              <div className="w-9 h-3 border-b-2 border-night-900 rounded-full mt-1" />
              {/* Flower Necklace */}
              <div className="text-xs -mb-1 mt-1">🌸🌺</div>
            </div>
          </div>
        );

      case "pooh":
        return (
          <div className="relative w-24 h-28 sm:w-28 sm:h-32 flex flex-col items-center justify-end">
            {/* Ears */}
            <div className="absolute top-3 left-3 w-6 h-6 bg-amber-600 rounded-full shadow-sm" />
            <div className="absolute top-3 right-3 w-6 h-6 bg-amber-600 rounded-full shadow-sm" />
            {/* Head */}
            <div className="relative z-10 w-18 h-18 bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 rounded-full shadow-xl flex flex-col items-center justify-center border-2 border-amber-300/60">
              <div className="flex gap-4 mb-1">
                <div className="w-2 h-2 bg-night-900 rounded-full" />
                <div className="w-2 h-2 bg-night-900 rounded-full" />
              </div>
              <div className="w-3.5 h-2.5 bg-amber-900 rounded-full -mt-0.5" />
              <div className="w-4 h-1.5 border-b-2 border-amber-900 rounded-full mt-0.5" />
            </div>
            {/* Red Shirt with Honey Pot */}
            <div className="relative z-10 w-18 h-10 bg-gradient-to-b from-red-500 to-red-700 rounded-t-xl -mt-2 shadow-md flex items-center justify-center">
              <span className="text-xs">🍯</span>
            </div>
          </div>
        );

      case "olaf":
        return (
          <div className="relative w-24 h-28 sm:w-28 sm:h-32 flex flex-col items-center justify-end">
            {/* Hair twigs */}
            <div className="text-xs -mb-2">🌱</div>
            {/* Head */}
            <div className="relative z-20 w-14 h-14 bg-gradient-to-tr from-cyan-100 via-white to-blue-50 rounded-full shadow-lg flex flex-col items-center justify-center border border-cyan-200">
              <div className="flex gap-2 mb-0.5">
                <div className="w-2 h-2.5 bg-night-900 rounded-full" />
                <div className="w-2 h-2.5 bg-night-900 rounded-full" />
              </div>
              {/* Carrot Nose */}
              <div className="w-4 h-2 bg-orange-500 rounded-r-full shadow-sm transform -rotate-6 -mt-0.5" />
              <div className="w-3 h-1.5 border-b-2 border-gray-600 rounded-full mt-0.5" />
            </div>
            {/* Body Snowballs */}
            <div className="relative z-10 w-12 h-10 bg-white rounded-full shadow-md -mt-2 border border-cyan-200 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-gray-800 rounded-full" />
            </div>
            <div className="w-16 h-12 bg-white rounded-full shadow-lg -mt-2 border border-cyan-200 flex items-center justify-center">
              <div className="w-2 h-2 bg-gray-800 rounded-full" />
            </div>
          </div>
        );

      case "pikachu":
        return (
          <div className="relative w-24 h-28 sm:w-28 sm:h-32 flex flex-col items-center justify-end">
            {/* Lightning Ears */}
            <div className="absolute top-1 left-2 w-4 h-14 bg-gradient-to-t from-yellow-400 to-black rounded-t-full transform -rotate-30 shadow-md" />
            <div className="absolute top-1 right-2 w-4 h-14 bg-gradient-to-t from-yellow-400 to-black rounded-t-full transform rotate-30 shadow-md" />
            {/* Head */}
            <div className="relative z-10 w-20 h-20 bg-gradient-to-tr from-yellow-400 via-amber-300 to-yellow-200 rounded-full shadow-xl flex flex-col items-center justify-center border-2 border-yellow-300/60 p-2">
              <div className="flex gap-4 mb-1">
                <div className="w-2.5 h-2.5 bg-night-900 rounded-full relative">
                  <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 right-0.5" />
                </div>
                <div className="w-2.5 h-2.5 bg-night-900 rounded-full relative">
                  <div className="w-1 h-1 bg-white rounded-full absolute top-0.5 right-0.5" />
                </div>
              </div>
              <div className="w-1 h-1 bg-night-900 rounded-full -mt-0.5" />
              <div className="w-3 h-1.5 border-b-2 border-amber-900 rounded-full mt-0.5" />
              {/* Electric Red Cheeks */}
              <div className="absolute bottom-3 inset-x-2 flex justify-between px-0.5">
                <div className="w-3.5 h-3.5 bg-red-500 rounded-full shadow-sm animate-pulse" />
                <div className="w-3.5 h-3.5 bg-red-500 rounded-full shadow-sm animate-pulse" />
              </div>
            </div>
          </div>
        );

      case "baymax":
        return (
          <div className="relative w-24 h-28 sm:w-28 sm:h-32 flex flex-col items-center justify-end">
            {/* Head */}
            <div className="relative z-20 w-16 h-12 bg-gradient-to-tr from-slate-200 via-white to-gray-100 rounded-full shadow-md flex items-center justify-center border border-gray-300">
              <div className="w-8 h-1 bg-night-900 rounded-full flex items-center justify-between px-0.5">
                <div className="w-1.5 h-1.5 bg-night-900 rounded-full" />
                <div className="w-1.5 h-1.5 bg-night-900 rounded-full" />
              </div>
            </div>
            {/* Inflatable Body */}
            <div className="relative z-10 w-22 h-20 bg-gradient-to-b from-white via-slate-100 to-slate-200 rounded-full shadow-xl -mt-2 border border-gray-200 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full border border-gray-400 absolute top-4 left-5 flex items-center justify-center text-[6px]">
                🤍
              </div>
            </div>
          </div>
        );

      case "spongebob":
        return (
          <div className="relative w-24 h-28 sm:w-28 sm:h-32 flex flex-col items-center justify-end">
            {/* Yellow Sponge Body */}
            <div className="relative z-10 w-20 h-22 bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-500 rounded-lg shadow-xl border-2 border-yellow-300 flex flex-col items-center justify-between p-1.5 overflow-hidden">
              {/* Sponge Pores */}
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-600/30 absolute top-2 left-2" />
              <div className="w-3 h-3 rounded-full bg-yellow-600/30 absolute bottom-6 right-2" />
              {/* Eyes */}
              <div className="flex gap-2 mt-1">
                <div className="w-5 h-5 rounded-full bg-white border border-gray-400 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-sky-500 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-black" />
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full bg-white border border-gray-400 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-sky-500 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-black" />
                  </div>
                </div>
              </div>
              {/* Big Smile with 2 teeth */}
              <div className="flex flex-col items-center -mt-1">
                <div className="w-8 h-2 border-b-2 border-night-900 rounded-full" />
                <div className="flex gap-1 -mt-0.5">
                  <div className="w-1.5 h-1.5 bg-white border border-gray-400" />
                  <div className="w-1.5 h-1.5 bg-white border border-gray-400" />
                </div>
              </div>
              {/* White Collar & Red Tie */}
              <div className="w-full h-4 bg-white rounded-t-xs flex items-center justify-center relative">
                <div className="w-2 h-3 bg-red-600 transform rotate-45 shadow-sm" />
              </div>
            </div>
            {/* Brown Pants */}
            <div className="w-18 h-3 bg-amber-900 rounded-b-md -mt-1 shadow-sm" />
          </div>
        );

      case "simba":
        return (
          <div className="relative w-24 h-28 sm:w-28 sm:h-32 flex flex-col items-center justify-end">
            {/* Ears */}
            <div className="absolute top-2 left-2 w-6 h-6 bg-amber-700 rounded-full shadow-sm" />
            <div className="absolute top-2 right-2 w-6 h-6 bg-amber-700 rounded-full shadow-sm" />
            {/* Fluffy Mane / Head */}
            <div className="relative z-10 w-20 h-20 bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 rounded-full shadow-xl flex flex-col items-center justify-center border-2 border-amber-400/60 p-2">
              <div className="text-xs -mt-1">👑</div>
              <div className="flex gap-3 mb-1">
                <div className="w-2.5 h-3 bg-amber-950 rounded-full" />
                <div className="w-2.5 h-3 bg-amber-950 rounded-full" />
              </div>
              <div className="w-3 h-2 bg-pink-700 rounded-full -mt-0.5" />
              <div className="w-4 h-1.5 border-b-2 border-amber-950 rounded-full mt-0.5" />
            </div>
          </div>
        );

      default:
        return (
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-400 to-rose-400 flex items-center justify-center text-4xl shadow-xl">
            ✨
          </div>
        );
    }
  };

  return (
    <section
      id="cartoon-wishes"
      className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden text-center"
    >
      {/* 🍌 LEFT SIDE PEEKING 3D MINION */}
      <AnimatePresence>
        {leftPeeker && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="fixed left-2 sm:left-6 bottom-28 z-30 hidden md:flex flex-col items-center cursor-pointer group"
            onClick={() => handleSelectCharacter(characters[0])}
          >
            {/* Speech Bubble */}
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="mb-2 p-2.5 rounded-2xl glass-panel-gold border border-amber-400/40 text-[11px] text-amber-200 font-bold shadow-xl flex items-center gap-1"
            >
              <span>Bello Shehara! 🍌</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLeftPeeker(false);
                }}
                className="text-white/40 hover:text-white ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
            {/* 3D Minion Graphic */}
            <div className="transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 filter drop-shadow-[0_10px_20px_rgba(245,158,11,0.4)]">
              {renderCharacter3D("minion")}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 💙 RIGHT SIDE PEEKING 3D STITCH */}
      <AnimatePresence>
        {rightPeeker && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            className="fixed right-2 sm:right-6 bottom-28 z-30 hidden md:flex flex-col items-center cursor-pointer group"
            onClick={() => handleSelectCharacter(characters[1])}
          >
            {/* Speech Bubble */}
            <motion.div
              animate={{ y: [3, -3, 3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="mb-2 p-2.5 rounded-2xl glass-panel-rose border border-roseGold-400/40 text-[11px] text-roseGold-200 font-bold shadow-xl flex items-center gap-1"
            >
              <span>Aloha Shehara! 🌺</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setRightPeeker(false);
                }}
                className="text-white/40 hover:text-white ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
            {/* 3D Stitch Graphic */}
            <div className="transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 filter drop-shadow-[0_10px_20px_rgba(59,130,246,0.4)]">
              {renderCharacter3D("stitch")}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[90vw] max-w-[900px] h-[550px] bg-gradient-to-r from-amber-500/10 via-roseGold-500/15 to-purple-500/10 rounded-full blur-[170px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-gold mb-4 border border-amber-400/30 shadow-lg"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
          <span className="text-xs uppercase tracking-[0.25em] text-amber-200 font-semibold">
            Character Birthday Wish Wall
          </span>
          <Stars className="w-3.5 h-3.5 text-roseGold-300" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-champagne-50"
        >
          Famous Characters Wishing <span className="gradient-text-gold font-display italic">Shehara</span>! 🎈
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 font-sans text-sm sm:text-base md:text-lg text-champagne-300/85 max-w-xl mx-auto font-light leading-relaxed"
        >
          Your favorite animated icons gathered to wish you a wonderful 24th birthday! Tap any character to read their personalized message! ✨
        </motion.p>

        {/* Surprise Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 flex items-center justify-center"
        >
          <button
            onClick={handleRandomSurprise}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 via-roseGold-400 to-amber-300 text-night-900 text-xs sm:text-sm font-bold shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Shuffle className="w-4 h-4" />
            <span>Surprise Me With a Random Character! 🎲✨</span>
          </button>
        </motion.div>
      </div>

      {/* 🎭 3D INTERACTIVE CARTOON CHARACTER CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {characters.map((char, index) => {
          return (
            <motion.div
              key={char.id}
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ y: -10, scale: 1.03 }}
              onClick={(e) => handleSelectCharacter(char, e)}
              className={`group relative rounded-3xl p-6 glass-panel border ${char.borderColor} shadow-xl hover:shadow-[0_20px_45px_rgba(245,158,11,0.25)] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center justify-between text-center`}
              style={{
                background: `linear-gradient(160deg, rgba(28, 22, 38, 0.8) 0%, rgba(16, 12, 22, 0.9) 100%)`,
              }}
            >
              {/* 3D Character Illustration */}
              <div className="my-2 transform group-hover:scale-110 transition-transform duration-500">
                {renderCharacter3D(char.svgType)}
              </div>

              {/* Character Details */}
              <div className="space-y-1.5 w-full mt-3">
                <span className="text-[10px] uppercase tracking-widest text-amber-300/80 font-bold block">
                  {char.universe}
                </span>
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                  {char.name}
                </h3>
                <p className="font-handwriting text-sm sm:text-base text-roseGold-200 line-clamp-1 italic">
                  {char.catchphrase}
                </p>
              </div>

              {/* Read Quote Indicator */}
              <div className="mt-4 pt-3 border-t border-white/10 w-full flex items-center justify-center gap-1.5 text-xs text-amber-300 font-medium group-hover:underline">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Read Birthday Wish 💌</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 🌟 FULLSCREEN 3D CHARACTER MODAL DIALOGUE */}
      <AnimatePresence>
        {selectedCharacter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-night-900/90 backdrop-blur-2xl"
            onClick={() => setSelectedCharacter(null)}
          >
            <motion.div
              initial={{ scale: 0.85, y: 25, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 25, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`relative max-w-lg w-full rounded-3xl p-8 sm:p-10 glass-panel border ${selectedCharacter.borderColor} shadow-[0_25px_60px_rgba(0,0,0,0.7)] text-center overflow-hidden`}
              style={{
                background: `linear-gradient(160deg, rgba(32, 25, 45, 0.95) 0%, rgba(18, 14, 26, 0.98) 100%)`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCharacter(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-champagne-100 transition-colors border border-white/15 cursor-pointer z-20"
                aria-label="Close message"
              >
                <X className="w-4 h-4" />
              </button>

              {/* 3D Character Illustration in Modal */}
              <div className="relative mx-auto mb-4 flex justify-center transform scale-110">
                {renderCharacter3D(selectedCharacter.svgType)}
              </div>

              {/* Character Details */}
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-300 block mb-1">
                {selectedCharacter.universe}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-1">
                {selectedCharacter.name}
              </h3>
              <p className="font-handwriting text-lg text-roseGold-200 mb-6 italic">
                {selectedCharacter.catchphrase}
              </p>

              {/* Speech Bubble Card */}
              <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 shadow-inner text-left">
                <Quote className="w-5 h-5 text-amber-300/40 mb-2" />
                <p className="font-sans text-sm sm:text-base text-champagne-100/95 leading-relaxed font-light">
                  {selectedCharacter.quote}
                </p>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-roseGold-300 font-handwriting text-xl">
                  <span>Special Birthday Greeting for Shehara ❤️</span>
                  <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
                </div>
              </div>

              {/* Celebration Action Button */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    playChime();
                    triggerBirthdayConfetti();
                  }}
                  className="px-6 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-400 to-roseGold-400 text-night-900 shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Send Love & Confetti 🎉</span>
                </button>

                <button
                  onClick={() => setSelectedCharacter(null)}
                  className="px-4 py-2 rounded-full text-xs text-champagne-300 hover:text-white bg-white/10 hover:bg-white/20 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
