"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Camera,
  Users,
  Globe2,
  Code2,
  Sparkles,
  MapPin,
  Pause,
  Play,
} from "lucide-react";

interface SlideData {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  location: string;
  icon: typeof Camera;
  accentBg: string;
  gradient: string;
  visualType: "ocr" | "design" | "logistics" | "code";
}

const CAROUSEL_SLIDES: SlideData[] = [
  {
    id: "field-data",
    tag: "Field Operations & OCR Automation",
    title: "Field Data Collection in Action",
    subtitle:
      "Deploying offline tablet photo-capture workflows & Gemini API OCR to eliminate manual data entry backlogs for medical volunteers.",
    location: "Medic Rush 2026 • Hochland",
    icon: Camera,
    accentBg: "from-[#d85d5d]/20 to-transparent",
    gradient: "from-[#1a0f0f] via-[#111111] to-[#0a0a0a]",
    visualType: "ocr",
  },
  {
    id: "workshops",
    tag: "Design Thinking & Strategy",
    title: "Leading Strategic Workshops",
    subtitle:
      "Applying UCT Marketing & Hasso Plattner Design Thinking principles to align multi-country stakeholders and solve complex problems.",
    location: "Cape Town & Remote Incubators",
    icon: Users,
    accentBg: "from-[#d85d5d]/15 to-transparent",
    gradient: "from-[#1c1213] via-[#111111] to-[#0a0a0a]",
    visualType: "design",
  },
  {
    id: "event-coordination",
    tag: "Cross-Border Logistics",
    title: "Multi-Country Event Oversight",
    subtitle:
      "Managing complex station rotations for 600+ students and coordinating Fellow teams across Namibia, Eswatini, and Botswana.",
    location: "Southern Africa Operations",
    icon: Globe2,
    accentBg: "from-[#d85d5d]/20 to-transparent",
    gradient: "from-[#170e0e] via-[#111111] to-[#0a0a0a]",
    visualType: "logistics",
  },
  {
    id: "dev-sessions",
    tag: "Remote Web & Tech Engineering",
    title: "Deep-Work Development Sessions",
    subtitle:
      "Leading software delivery alongside a 2-person engineering unit to ship Next.js platforms and custom Google Workspace tools.",
    location: "Remote Dev Lab • Windhoek",
    icon: Code2,
    accentBg: "from-[#d85d5d]/25 to-transparent",
    gradient: "from-[#1e1011] via-[#111111] to-[#0a0a0a]",
    visualType: "code",
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % CAROUSEL_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length
    );
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  const currentSlide = CAROUSEL_SLIDES[currentIndex];
  const SlideIcon = currentSlide.icon;

  return (
    <div
      className="relative w-full rounded-2xl border border-[#262626] bg-[#0a0a0a] overflow-hidden shadow-2xl group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top Banner Control Bar */}
      <div className="bg-[#111111] px-5 py-3 border-b border-[#262626] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#d85d5d] animate-pulse" />
          <span className="font-mono text-xs text-neutral-300 font-semibold tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#d85d5d]" />
            MADAM T IN ACTION // REAL-WORLD FIELD SNAPSHOTS
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="hidden sm:flex items-center gap-1.5 hover:text-[#d85d5d] transition-colors cursor-pointer"
            title={isPaused ? "Resume slideshow" : "Pause slideshow"}
          >
            {isPaused ? (
              <>
                <Play className="w-3 h-3 text-[#d85d5d]" /> PAUSED
              </>
            ) : (
              <>
                <Pause className="w-3 h-3 text-neutral-500" /> AUTO-PLAY
              </>
            )}
          </button>
          <span className="text-[#d85d5d] font-bold">
            0{currentIndex + 1} / 0{CAROUSEL_SLIDES.length}
          </span>
        </div>
      </div>

      {/* Main Carousel Card Body */}
      <div className="relative min-h-[380px] md:min-h-[420px] p-6 md:p-10 flex flex-col justify-between overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-0 bg-gradient-to-br ${currentSlide.gradient} -z-10`}
          >
            {/* Ambient Background Radial Highlight */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#d85d5d]/10 rounded-full blur-[120px] pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Content Header & Badges */}
        <div className="space-y-4 max-w-2xl z-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d85d5d]/15 border border-[#d85d5d]/30 text-[#d85d5d] text-xs font-mono font-semibold uppercase tracking-wider">
              <SlideIcon className="w-3.5 h-3.5" />
              {currentSlide.tag}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-mono text-neutral-400">
              <MapPin className="w-3 h-3 text-[#d85d5d]" />
              {currentSlide.location}
            </span>
          </div>

          <h3 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {currentSlide.title}
          </h3>

          <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-normal">
            {currentSlide.subtitle}
          </p>
        </div>

        {/* Interactive Visual Element Graphics */}
        <div className="my-6 z-10">
          {currentSlide.visualType === "ocr" && (
            <div className="p-4 rounded-xl bg-[#111111]/80 border border-[#262626] max-w-md font-mono text-xs text-neutral-300 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[#d85d5d] border-b border-[#262626] pb-1.5 font-bold">
                <span>[LIVE OCR DATA STREAM]</span>
                <span>STATUS: 750+ RECORDS DIGITIZED</span>
              </div>
              <div className="space-y-1 text-[11px]">
                <div className="text-neutral-400">&gt; Scanning Tablet Image... OK</div>
                <div className="text-neutral-400">&gt; Gemini API Extracting Fields... 100%</div>
                <div className="text-[#22c55e]">&gt; Auto-Populated Google Sheet Record #0749</div>
              </div>
            </div>
          )}

          {currentSlide.visualType === "design" && (
            <div className="p-4 rounded-xl bg-[#111111]/80 border border-[#262626] max-w-md font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[#d85d5d] border-b border-[#262626] pb-1.5 font-bold">
                <span>[DESIGN THINKING MATRIX]</span>
                <span>UCT MARKETING HONOURS</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="p-2 rounded bg-[#18181b] border border-[#262626] text-neutral-300">Empathize & Define</div>
                <div className="p-2 rounded bg-[#18181b] border border-[#d85d5d]/40 text-[#d85d5d]">Ideate & Prototype</div>
                <div className="p-2 rounded bg-[#18181b] border border-[#262626] text-neutral-300">Test & Scale</div>
              </div>
            </div>
          )}

          {currentSlide.visualType === "logistics" && (
            <div className="p-4 rounded-xl bg-[#111111]/80 border border-[#262626] max-w-md font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[#d85d5d] border-b border-[#262626] pb-1.5 font-bold">
                <span>[CROSS-BORDER CORRIDOR]</span>
                <span>3 NATIONS • ZERO DELAYS</span>
              </div>
              <div className="flex items-center justify-between text-neutral-300 text-[11px] pt-1">
                <span>Namibia</span>
                <span className="text-[#d85d5d]">&rarr;</span>
                <span>Botswana</span>
                <span className="text-[#d85d5d]">&rarr;</span>
                <span>Eswatini</span>
              </div>
            </div>
          )}

          {currentSlide.visualType === "code" && (
            <div className="p-4 rounded-xl bg-[#111111]/80 border border-[#262626] max-w-md font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[#d85d5d] border-b border-[#262626] pb-1.5 font-bold">
                <span>[ENGINEERING TECH STACK]</span>
                <span>MADAM T + 2 SOFTWARE DEVS</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2 py-0.5 rounded bg-[#18181b] text-neutral-300 border border-[#262626]">Next.js 16</span>
                <span className="px-2 py-0.5 rounded bg-[#18181b] text-neutral-300 border border-[#262626]">TypeScript</span>
                <span className="px-2 py-0.5 rounded bg-[#18181b] text-neutral-300 border border-[#262626]">Tailwind CSS</span>
                <span className="px-2 py-0.5 rounded bg-[#d85d5d]/20 text-[#d85d5d] border border-[#d85d5d]/40">Apps Script</span>
              </div>
            </div>
          )}
        </div>

        {/* Carousel Bottom Controls & Indicators */}
        <div className="pt-4 border-t border-[#262626] flex items-center justify-between z-10">
          {/* Accent Indicator Dots */}
          <div className="flex items-center gap-2">
            {CAROUSEL_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? "w-8 bg-[#d85d5d]"
                    : "w-2 bg-neutral-700 hover:bg-neutral-500"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Navigation Prev / Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              className="w-10 h-10 rounded-xl bg-[#111111] border border-[#262626] hover:border-[#d85d5d] hover:text-[#d85d5d] text-neutral-300 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="w-10 h-10 rounded-xl bg-[#111111] border border-[#262626] hover:border-[#d85d5d] hover:text-[#d85d5d] text-neutral-300 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
