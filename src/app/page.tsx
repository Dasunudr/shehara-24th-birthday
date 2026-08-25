"use client";

import React, { useState } from "react";
import IntroOverlay from "@/components/IntroOverlay";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PhotoGallery from "@/components/PhotoGallery";
import VideoSection from "@/components/VideoSection";
import ReasonsSection from "@/components/ReasonsSection";
import TimelineSection from "@/components/TimelineSection";
import SunsetSection from "@/components/SunsetSection";
import GardenSection from "@/components/GardenSection";
import LetterSection from "@/components/LetterSection";
import BirthdayCake from "@/components/BirthdayCake";
import FinalSection from "@/components/FinalSection";
import MusicPlayer from "@/components/MusicPlayer";
import ParticleBackground from "@/components/ParticleBackground";
import FlowerRain from "@/components/FlowerRain";
import CustomCursor from "@/components/CustomCursor";

export default function BirthdayPage() {
  const [introFinished, setIntroFinished] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const toggleMusic = () => {
    setIsMusicPlaying((prev) => !prev);
  };

  const handleIntroComplete = () => {
    setIntroFinished(true);
    // Auto-start calm ambient melody upon entering the experience
    setIsMusicPlaying(true);
  };

  return (
    <main className="relative min-h-screen bg-night-900 text-champagne-50 overflow-x-hidden film-grain">
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Romantic Flower Rain Shower */}
      <FlowerRain />

      {/* Ambient Floating Bokeh Particles */}
      <ParticleBackground />

      {/* Opening Intro Sequence */}
      {!introFinished && (
        <IntroOverlay onComplete={handleIntroComplete} />
      )}

      {/* Main Experience Layout */}
      <div className={`transition-opacity duration-1000 ${introFinished ? "opacity-100" : "opacity-0"}`}>
        {/* Floating Navigation Pill */}
        <Navbar isPlaying={isMusicPlaying} onToggleMusic={toggleMusic} />

        {/* Hero Section with Muted Cinematic Background Video */}
        <HeroSection />

        {/* Photo Memory Section */}
        <PhotoGallery />

        {/* Cinematic Video Showcase */}
        <VideoSection />

        {/* 24 Reasons That Make You Special */}
        <ReasonsSection />

        {/* Memory Timeline */}
        <TimelineSection />

        {/* Special Sunset Highlight */}
        <SunsetSection />

        {/* Nature & Festive Wonder */}
        <GardenSection />

        {/* Personal Love Letter */}
        <LetterSection />

        {/* Interactive 24-Candle Birthday Cake */}
        <BirthdayCake />

        {/* Cinematic Closing & Secret Easter Egg */}
        <FinalSection />

        {/* Floating Calm Music Controller */}
        <MusicPlayer isPlaying={isMusicPlaying} onToggle={toggleMusic} />
      </div>
    </main>
  );
}
