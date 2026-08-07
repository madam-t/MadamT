"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
    gradient: "from-brand/15 via-transparent to-transparent",
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
    gradient: "from-transparent via-brand/12 to-transparent",
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
    gradient: "from-brand/10 via-transparent to-brand/5",
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
    gradient: "from-brand/20 via-transparent to-transparent",
    visualType: "code",
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

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
    if (isPaused || prefersReducedMotion) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused, prefersReducedMotion]);

  const currentSlide = CAROUSEL_SLIDES[currentIndex];
  const SlideIcon = currentSlide.icon;

  return (
    <div
      className="relative w-full rounded-2xl border border-line bg-surface-deep overflow-hidden shadow-2xl group select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Madam T in action"
    >
      {/* Top Banner Control Bar */}
      <div className="bg-surface px-5 py-3 border-b border-line flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-brand animate-pulse" />
          <span className="font-mono text-xs text-ink-muted font-semibold tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-ink" />
            MADAM T IN ACTION // REAL-WORLD FIELD SNAPSHOTS
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-ink-subtle">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1.5 hover:text-brand-ink transition-colors cursor-pointer"
            title={isPaused ? "Resume slideshow" : "Pause slideshow"}
            aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
          >
            {isPaused ? (
              <>
                <Play className="w-3 h-3 text-brand-ink" />
                <span className="hidden sm:inline">PAUSED</span>
              </>
            ) : (
              <>
                <Pause className="w-3 h-3 text-ink-faint" />
                <span className="hidden sm:inline">AUTO-PLAY</span>
              </>
            )}
          </button>
          <span className="text-brand-ink font-bold">
            {pad(currentIndex + 1)} / {pad(CAROUSEL_SLIDES.length)}
          </span>
        </div>
      </div>

      {/* Main Carousel Card Body */}
      <div className="relative min-h-[380px] md:min-h-[420px] p-6 md:p-10 flex flex-col justify-between overflow-hidden">
        {/*
          The animated slide backdrop sits at z-0, not -z-10: a negative
          z-index paints it underneath the card's own bg-surface-deep, which
          hid these gradients completely. Content blocks below sit at z-10.
        */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-0 bg-gradient-to-br ${currentSlide.gradient} z-0`}
          >
            {/* Ambient Background Radial Highlight */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[120px] pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Content Header & Badges */}
        <div className="space-y-4 max-w-2xl z-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/15 border border-brand/30 text-brand-ink text-xs font-mono font-semibold uppercase tracking-wider">
              <SlideIcon className="w-3.5 h-3.5" />
              {currentSlide.tag}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-mono text-ink-subtle">
              <MapPin className="w-3 h-3 text-brand-ink" />
              {currentSlide.location}
            </span>
          </div>

          <h3 className="text-2xl md:text-4xl font-extrabold text-ink tracking-tight leading-tight">
            {currentSlide.title}
          </h3>

          <p className="text-sm md:text-base text-ink-muted leading-relaxed font-normal">
            {currentSlide.subtitle}
          </p>
        </div>

        {/* Interactive Visual Element Graphics */}
        <div className="my-6 z-10">
          {currentSlide.visualType === "ocr" && (
            <div className="p-4 rounded-xl bg-surface/80 border border-line max-w-md font-mono text-xs text-ink-muted space-y-2">
              <div className="flex items-center justify-between text-[11px] text-brand-ink border-b border-line pb-1.5 font-bold">
                <span>[LIVE OCR DATA STREAM]</span>
                <span>STATUS: 750+ RECORDS DIGITIZED</span>
              </div>
              <div className="space-y-1 text-[11px]">
                <div className="text-ink-subtle">&gt; Scanning Tablet Image... OK</div>
                <div className="text-ink-subtle">&gt; Gemini API Extracting Fields... 100%</div>
                <div className="text-success">&gt; Auto-Populated Google Sheet Record #0749</div>
              </div>
            </div>
          )}

          {currentSlide.visualType === "design" && (
            <div className="p-4 rounded-xl bg-surface/80 border border-line max-w-md font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px] text-brand-ink border-b border-line pb-1.5 font-bold">
                <span>[DESIGN THINKING MATRIX]</span>
                <span>UCT MARKETING HONOURS</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="p-2 rounded bg-surface-2 border border-line text-ink-muted">Empathize & Define</div>
                <div className="p-2 rounded bg-surface-2 border border-brand/40 text-brand-ink">Ideate & Prototype</div>
                <div className="p-2 rounded bg-surface-2 border border-line text-ink-muted">Test & Scale</div>
              </div>
            </div>
          )}

          {currentSlide.visualType === "logistics" && (
            <div className="p-4 rounded-xl bg-surface/80 border border-line max-w-md font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px] text-brand-ink border-b border-line pb-1.5 font-bold">
                <span>[CROSS-BORDER CORRIDOR]</span>
                <span>3 NATIONS • ZERO DELAYS</span>
              </div>
              <div className="flex items-center justify-between text-ink-muted text-[11px] pt-1">
                <span>Namibia</span>
                <span className="text-brand-ink">&rarr;</span>
                <span>Botswana</span>
                <span className="text-brand-ink">&rarr;</span>
                <span>Eswatini</span>
              </div>
            </div>
          )}

          {currentSlide.visualType === "code" && (
            <div className="p-4 rounded-xl bg-surface/80 border border-line max-w-md font-mono text-xs space-y-2">
              <div className="flex items-center justify-between text-[11px] text-brand-ink border-b border-line pb-1.5 font-bold">
                <span>[ENGINEERING TECH STACK]</span>
                <span>MADAM T + 2 SOFTWARE DEVS</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2 py-0.5 rounded bg-surface-2 text-ink-muted border border-line">Next.js 16</span>
                <span className="px-2 py-0.5 rounded bg-surface-2 text-ink-muted border border-line">TypeScript</span>
                <span className="px-2 py-0.5 rounded bg-surface-2 text-ink-muted border border-line">Tailwind CSS</span>
                <span className="px-2 py-0.5 rounded bg-brand/20 text-brand-ink border border-brand/40">Apps Script</span>
              </div>
            </div>
          )}
        </div>

        {/* Carousel Bottom Controls & Indicators */}
        <div className="pt-4 border-t border-line flex items-center justify-between z-10">
          {/* Accent Indicator Dots */}
          <div className="flex items-center gap-2">
            {CAROUSEL_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? "w-8 bg-brand"
                    : "w-2 bg-line-strong hover:bg-ink-faint"
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
              className="w-10 h-10 rounded-xl bg-surface border border-line hover:border-brand hover:text-brand-ink text-ink-muted flex items-center justify-center transition-all cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="w-10 h-10 rounded-xl bg-surface border border-line hover:border-brand hover:text-brand-ink text-ink-muted flex items-center justify-center transition-all cursor-pointer"
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
