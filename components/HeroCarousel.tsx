"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Camera,
  Users,
  Globe2,
  Sparkles,
  MapPin,
  Pause,
  Play,
} from "lucide-react";

interface SlidePhoto {
  src: string;
  alt: string;
}

interface SlideData {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  location: string;
  icon: typeof Camera;
  gradient: string;
  visualType: "ocr" | "design" | "logistics";
  photos: SlidePhoto[];
  /** Drives the photo composition, so shots keep their natural crop. */
  photoLayout: "portrait" | "landscape";
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
    gradient: "from-brand/15 via-transparent to-transparent",
    visualType: "ocr",
    photoLayout: "portrait",
    photos: [
      {
        src: "/slides/field-data-1.webp",
        alt: "Capturing patient records on a laptop at a field station",
      },
      {
        src: "/slides/field-data-2.webp",
        alt: "Digitising captured field records into a cloud spreadsheet",
      },
    ],
  },
  {
    id: "workshops",
    tag: "Design Thinking & Strategy",
    title: "Leading Interactive Workshops",
    subtitle:
      "Applying material from the UCT Hasso Plattner Design Thinking principles to lead a full day Design Thinking Dash with Fellows of the Allan Gray Orbis Foundation.",
    location: "Allan Gray Namibia Fellows",
    icon: Users,
    gradient: "from-transparent via-brand/12 to-transparent",
    visualType: "design",
    photoLayout: "landscape",
    photos: [
      {
        src: "/slides/workshops-1.webp",
        alt: "Madam T presenting during a Design Thinking Dash workshop",
      },
      {
        src: "/slides/workshops-2.webp",
        alt: "Madam T facilitating a group session with Allan Gray Fellows",
      },
    ],
  },
  {
    id: "event-coordination",
    tag: "Cross-Border Logistics",
    title: "Multi-Country Event Oversight",
    subtitle:
      "Planning, coordinating and executing events across 3 countries with over 150 delegates on consecutive weekends.",
    location: "Southern Africa Operations",
    icon: Globe2,
    gradient: "from-brand/10 via-transparent to-brand/5",
    visualType: "logistics",
    photoLayout: "portrait",
    photos: [
      {
        src: "/slides/events-1.webp",
        alt: "Madam T presenting at a lectern during a multi-country event",
      },
      {
        src: "/slides/events-2.webp",
        alt: "Madam T briefing delegates at an event planning session",
      },
    ],
  },
];

const pad = (n: number) => String(n).padStart(2, "0");

/*
 * Photo composition for the active slide.
 *
 * The panel is a fixed-height box and each card is placed inside it as a
 * percentage. Sizing the cards by aspect-ratio instead made the landscape
 * slide 200px taller than the portrait ones, so the whole carousel resized
 * as it advanced. Percentages of a shared box keep every slide identical
 * while still giving each orientation a crop close to its native ratio.
 */
const PHOTO_FRAMES: Record<
  SlideData["photoLayout"],
  { className: string; sizes: string }[]
> = {
  portrait: [
    { className: "top-0 left-0 w-[47%] h-[86%]", sizes: "(min-width: 1024px) 190px, 45vw" },
    { className: "bottom-0 right-0 w-[47%] h-[86%]", sizes: "(min-width: 1024px) 190px, 45vw" },
  ],
  landscape: [
    { className: "top-0 right-0 w-[86%] h-[62%]", sizes: "(min-width: 1024px) 345px, 80vw" },
    { className: "bottom-0 left-0 w-[52%] h-[46%] z-10", sizes: "(min-width: 1024px) 210px, 50vw" },
  ],
};

function SlidePhotos({ slide }: { slide: SlideData }) {
  const prefersReducedMotion = useReducedMotion();
  const frames = PHOTO_FRAMES[slide.photoLayout];

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.08 },
    },
  };

  const item: Variants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20, scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (
    <motion.div
      key={slide.id}
      variants={container}
      initial="hidden"
      animate="visible"
      className="relative mx-auto w-full max-w-[420px] lg:max-w-none h-[320px] sm:h-[340px]"
    >
      {slide.photos.map((photo, i) => (
        <motion.div
          key={photo.src}
          variants={item}
          className={`absolute overflow-hidden rounded-xl border border-line bg-surface shadow-xl ${
            frames[i]?.className ?? frames[0].className
          }`}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={frames[i]?.sizes ?? frames[0].sizes}
            className="object-cover"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

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
      <div className="bg-surface px-3 sm:px-5 py-3 border-b border-line flex items-center justify-between gap-3">
        {/*
          min-w-0 + truncate so this label can never widen the bar: the full
          string measures ~507px against ~272px of usable width at 360px.
          Phones get the short form; the suffix returns from md up.
        */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-2.5 h-2.5 shrink-0 rounded-full bg-brand animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs text-ink-muted font-semibold tracking-wider flex items-center gap-1.5 min-w-0">
            <Sparkles className="w-3.5 h-3.5 shrink-0 text-brand-ink" />
            <span className="truncate min-w-0">
              MADAM T IN ACTION
              <span className="hidden md:inline">
                {" // REAL-WORLD FIELD SNAPSHOTS"}
              </span>
            </span>
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-mono text-ink-subtle shrink-0">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center gap-1.5 py-1 px-1 -mx-1 hover:text-brand-ink transition-colors cursor-pointer"
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
      <div className="relative min-h-[380px] md:min-h-[420px] p-4 sm:p-6 md:p-10 flex flex-col justify-between overflow-hidden">
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

        {/* Slide body: copy on the left, photography on the right */}
        <div className="relative z-10 flex-1 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] gap-8 lg:gap-12 items-center">
          {/* Left column: copy + the mock data panel */}
          <div className="space-y-6">
            <div className="space-y-4 max-w-2xl">
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
            <div>
              {currentSlide.visualType === "ocr" && (
                <div className="p-4 rounded-xl bg-surface/80 border border-line max-w-md font-mono text-xs text-ink-muted space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[10px] sm:text-[11px] text-brand-ink border-b border-line pb-1.5 font-bold">
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
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[10px] sm:text-[11px] text-brand-ink border-b border-line pb-1.5 font-bold">
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
                  <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[10px] sm:text-[11px] text-brand-ink border-b border-line pb-1.5 font-bold">
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
            </div>
          </div>

          {/* Right column: real photography from the engagement */}
          <SlidePhotos slide={currentSlide} />
        </div>

        {/* Carousel Bottom Controls & Indicators */}
        <div className="pt-4 mt-6 border-t border-line flex items-center justify-between z-10">
          {/* Accent Indicator Dots */}
          <div className="flex items-center gap-2">
            {/*
              The visible dot stays 8px, but the button wrapping it is 44px
              tall so it clears the minimum touch target on a phone.
            */}
            {CAROUSEL_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className="h-11 flex items-center px-1 -mx-1 cursor-pointer group/dot"
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={idx === currentIndex ? "true" : undefined}
              >
                <span
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-8 bg-brand"
                      : "w-2 bg-line-strong group-hover/dot:bg-ink-faint"
                  }`}
                />
              </button>
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
