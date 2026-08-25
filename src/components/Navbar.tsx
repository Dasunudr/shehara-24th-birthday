"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X, Heart } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Memories", href: "#gallery" },
    { label: "Videos", href: "#videos" },
    { label: "24 Reasons", href: "#reasons" },
    { label: "Timeline", href: "#timeline" },
    { label: "Sunset", href: "#sunset" },
    { label: "Letter", href: "#letter" },
    { label: "Make a Wish", href: "#cake" },
  ];

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Floating Header Container */}
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none transition-all duration-300">
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`pointer-events-auto flex items-center justify-between gap-2 sm:gap-6 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 ${
            scrolled
              ? "glass-panel bg-night-900/85 shadow-2xl border-white/10"
              : "glass-pill bg-night-900/40 border-white/10"
          }`}
        >
          {/* Logo / Monogram */}
          <button
            onClick={() => scrollTo("#hero")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-roseGold-400 p-[1px] flex items-center justify-center shadow-sm">
              <div className="w-full h-full rounded-full bg-night-900 flex items-center justify-center">
                <span className="font-serif text-xs font-bold text-amber-300 group-hover:scale-110 transition-transform">
                  24
                </span>
              </div>
            </div>
            <span className="font-serif text-sm tracking-wider text-champagne-100 hidden md:inline group-hover:text-amber-200 transition-colors">
              {siteConfig.herName}
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="px-3 py-1.5 rounded-full text-xs text-champagne-200/80 hover:text-champagne-50 hover:bg-white/10 transition-all font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2">
            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-full text-champagne-200 hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-4 right-4 z-40 lg:hidden glass-panel bg-night-900/95 border-white/15 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-2">
              <div className="pb-3 mb-2 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-roseGold-400 fill-roseGold-400" />
                  <span className="font-serif text-sm text-champagne-100 font-medium">
                    {siteConfig.herName}&apos;s 24th Birthday
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-champagne-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl text-left text-sm text-champagne-200 hover:text-amber-200 hover:bg-white/5 transition-colors"
                >
                  <span>{link.label}</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300/40" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
