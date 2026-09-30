"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  ExternalLink,
  Mail,
  Calendar,
  Menu,
  X,
  Code2,
  Globe,
  ShieldCheck,
  FileCode2,
  Cpu,
  MapPin,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "showcase", label: "Showcase" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const CALENDAR_BOOKING_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0X1Vr35p4DG5PCJ4tHB0-j_BGPzvVaoOzLSSumSqGRCe9w5tCrNirqT7jBbZh7C-7n48NknxOl";

const SERVICES_DATA = [
  {
    number: "01",
    title: "Full Website Design & Custom Creation",
    icon: Code2,
    description:
      "Bespoke, high-performance digital presence engineered from the ground up. Crafted with modern design architecture, intuitive user flows, and responsive layouts that convert visitors into qualified clients.",
    deliverables: [
      "Custom UI/UX interface design tailored to your market positioning",
      "Next.js & TypeScript full-stack web architecture",
      "Mobile-first responsive optimization across all devices & resolutions",
      "Technical SEO foundation & Core Web Vitals optimization",
    ],
  },
  {
    number: "02",
    title: "Domain Procurement & Setup",
    icon: Globe,
    description:
      "End-to-end domain acquisition, registrar setup, and DNS management. We establish redundant, fast routing with automated SSL certificates and CDN caching so your digital address is secure and always online.",
    deliverables: [
      "Assistance with strategic domain acquisition & registration",
      "High-speed DNS routing (Cloudflare / modern edge network)",
      "Automated enterprise SSL/TLS certificate configuration",
      "Global CDN caching and sub-domain architecture",
    ],
  },
  {
    number: "03",
    title: "Enterprise Business Email Infrastructure",
    icon: ShieldCheck,
    description:
      "Institutional-grade business email routing through Google Workspace or Microsoft 365. Configured with strict cryptographic authentication protocols to ensure maximum deliverability and protect against phishing.",
    deliverables: [
      "Professional custom domain email accounts (@yourdomain.com)",
      "Strict SPF, DKIM, and DMARC authentication protocols",
      "Zero inbox spam penalty & email deliverability protection",
      "Seamless multi-device mail client sync & calendar integration",
    ],
  },
  {
    number: "04",
    title: "Developer Handover & Operational Guide",
    icon: FileCode2,
    description:
      "Complete technical autonomy with zero proprietary lock-in. We compile a comprehensive operational guide and structured source code repository so any internal developer or future team can take over immediately.",
    deliverables: [
      "Full source code ownership transfer via private Git repository",
      "Comprehensive architectural documentation & environment setup guide",
      "Operational runbook for content updates, deployment, and management",
      "Recorded handover walkthrough & developer briefing",
    ],
  },
  {
    number: "05",
    title: "Ongoing Technical Maintenance (Optional)",
    icon: Cpu,
    description:
      "Proactive infrastructure oversight and continuous stability. An optional ongoing engineering retainer ensuring your web application remains secure, up to date, and performing at peak speeds as your company scales.",
    deliverables: [
      "Continuous framework, dependency & security vulnerability patching",
      "24/7 automated uptime and latency monitoring",
      "Regular cloud backups & disaster recovery protocols",
      "Priority technical assistance and feature iteration support",
    ],
  },
];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [flippedService, setFlippedService] = useState<string | null>(null);
  const servicesContainerRef = useRef<HTMLDivElement>(null);

  const toggleService = useCallback((num: string) => {
    setFlippedService((prev) => (prev === num ? null : num));
  }, []);

  // Close flipped deliverable when clicking outside or scrolling to another part of the page
  useEffect(() => {
    if (!flippedService) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (
        servicesContainerRef.current &&
        !servicesContainerRef.current.contains(e.target as Node)
      ) {
        setFlippedService(null);
      }
    };

    const handleScroll = () => {
      setFlippedService(null);
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [flippedService]);

  const scrollToSection = useCallback((id: string) => {
    setIsMobileMenuOpen(false);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col justify-between selection:bg-[#f6aea9] selection:text-[#121212] font-sans antialiased">
      {/* 1. HEADER: Glassmorphism / Sticky Dark Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#121212]/85 border-b border-white/[0.08] transition-all">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group text-left focus:outline-none"
            aria-label="Madam Holdings Home"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl bg-[#d85d5d] flex items-center justify-center font-black text-white text-base sm:text-lg shadow-md shadow-[#d85d5d]/25 transition-transform group-hover:scale-105">
              M
            </div>
            <span className="font-extrabold tracking-wider text-sm sm:text-base md:text-lg uppercase text-white transition-colors">
              MADAM <span className="text-[#d85d5d]">HOLDINGS</span>
            </span>
          </button>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center gap-9 text-xs uppercase tracking-[0.16em] font-medium text-[#8E8E93]">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Light Coral Pill Button */}
          <div className="hidden sm:flex items-center">
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="px-6 py-2.5 rounded-full bg-[#f6aea9] hover:bg-[#f39b95] text-[#121212] transition-all text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-lg shadow-[#f6aea9]/10 flex items-center gap-2 group"
            >
              <span>Start a project</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="md:hidden w-10 h-10 rounded-full border border-white/[0.12] bg-[#181818] text-[#8E8E93] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4 text-white" />
            ) : (
              <Menu className="w-4 h-4 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden border-b border-white/[0.08] bg-[#121212]/95 backdrop-blur-2xl overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className="text-left text-sm uppercase tracking-[0.18em] font-medium text-[#8E8E93] hover:text-white py-2 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className="mt-2 w-full py-3.5 rounded-full bg-[#f6aea9] hover:bg-[#f39b95] text-[#121212] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#f6aea9]/10"
                >
                  <span>Start a project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* 2. HERO SECTION */}
        <section
          id="home"
          className="relative pt-20 md:pt-32 pb-24 md:pb-36 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#f6aea9]/[0.035] rounded-full blur-[150px] pointer-events-none" />

          <div className="relative z-10 max-w-5xl space-y-8">
            {/* Top Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-[#181818]/80 text-[#8E8E93] text-xs font-mono uppercase tracking-[0.2em]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#f6aea9] animate-pulse" />
              <span>WEB ENGINEERING FOR AMBITIOUS STARTUPS &amp; SMES</span>
            </motion.div>

            {/* Oversized, Minimalist Display Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal tracking-[-0.035em] leading-[1.08] text-white"
            >
              Full-service, high-performance web architecture for growing brands.
            </motion.h1>

            {/* Specs Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="pt-10 md:pt-14 border-t border-white/[0.08] flex flex-wrap items-center gap-y-3 gap-x-8 text-xs font-mono text-[#8E8E93]"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#f6aea9]" />
                <span>Madrid-Based Global Operations</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f6aea9]" />
                <span>Next.js &amp; Modern Cloud Infrastructure</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f6aea9]" />
                <span>Zero Proprietary Lock-In</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. STATEMENT SECTION */}
        <section className="border-y border-white/[0.08] bg-[#0f0f0f] py-24 md:py-32 px-6 lg:px-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-4xl space-y-6">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#f6aea9]">
                Agency Principle
              </span>
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-normal leading-[1.3] tracking-[-0.025em] text-white">
                “We believe modern Startups and SMEs deserve enterprise-grade web
                infrastructure; engineered to convert, built to scale, and delivered without
                technical friction.”
              </p>
            </div>
          </div>
        </section>

        {/* 4. SHOWCASE GRID */}
        <section
          id="showcase"
          className="scroll-mt-24 py-20 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto"
        >
          {/* 2 Large, Edge-to-Edge Image Placeholders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
            {/* Project 1: Ivoire Investment Group */}
            <motion.a
              href="https://ivoireafrica.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="group block space-y-5 cursor-pointer focus:outline-none"
            >
              {/* Black Background Logo Showcase */}
              <div className="relative w-full aspect-[16/10] rounded-2xl bg-[#0a0a0a] border border-white/[0.08] group-hover:border-[#f6aea9]/40 overflow-hidden transition-all duration-300 shadow-2xl flex items-center justify-center">
                {/* Top Right External Link Icon */}
                <div className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-[#141414]/90 border border-white/[0.1] group-hover:border-[#f6aea9] text-[#8E8E93] group-hover:text-[#f6aea9] flex items-center justify-center transition-all">
                  <ExternalLink className="w-4 h-4" />
                </div>

                {/* Prominent Logo */}
                <div className="relative w-full h-full p-6 sm:p-10">
                  <Image
                    src="/ivoire-logo.png"
                    alt="Ivoire Investment Group"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-contain p-4 sm:p-8 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Project Details Below Visual */}
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-normal text-white group-hover:text-[#f6aea9] transition-colors flex items-center gap-2">
                  <span>Ivoire Investment Group (ivoireafrica.com)</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#f6aea9]" />
                </h3>
              </div>
            </motion.a>

            {/* Project 2: Eshham Group */}
            <motion.a
              href="https://eshham.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="group block space-y-5 cursor-pointer focus:outline-none"
            >
              {/* White Background Logo Showcase */}
              <div className="relative w-full aspect-[16/10] rounded-2xl bg-[#ffffff] border border-white/[0.08] group-hover:border-[#f6aea9]/50 overflow-hidden transition-all duration-300 shadow-2xl flex items-center justify-center">
                {/* Top Right External Link Icon */}
                <div className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 border border-black/10 text-[#121212] flex items-center justify-center transition-all">
                  <ExternalLink className="w-4 h-4" />
                </div>

                {/* Prominent Logo */}
                <div className="relative w-full h-full p-6 sm:p-10">
                  <Image
                    src="/eshham-logo.png"
                    alt="Eshham Group"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-contain p-4 sm:p-8 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Project Details Below Visual */}
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-normal text-white group-hover:text-[#f6aea9] transition-colors flex items-center gap-2">
                  <span>Eshham Group (eshham.com)</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#f6aea9]" />
                </h3>
              </div>
            </motion.a>
          </div>
        </section>

        {/* 5. SERVICES LIST */}
        <section
          id="services"
          className="scroll-mt-24 py-24 md:py-36 px-6 lg:px-12 border-t border-white/[0.08] bg-[#0e0e0e]"
        >
          <div className="max-w-7xl mx-auto space-y-16">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#f6aea9]">
                  Capabilities
                </span>
                <h2 className="text-3xl md:text-5xl font-normal tracking-[-0.03em] text-white">
                  Core Deliverables
                </h2>
              </div>
              <p className="text-sm font-light text-[#8E8E93] max-w-md">
                End-to-end web engineering for startups and expanding SMEs. Five institutional pillars
                delivered with zero technical compromise.
              </p>
            </div>

            {/* Editorial Services List with Flip Interaction */}
            <div ref={servicesContainerRef} className="space-y-4">
              {SERVICES_DATA.map((service) => {
                const IconComponent = service.icon;
                const isFlipped = flippedService === service.number;

                return (
                  <div key={service.number} className="perspective-[1200px]">
                    <AnimatePresence mode="wait" initial={false}>
                      {!isFlipped ? (
                        <motion.button
                          key="unflipped"
                          type="button"
                          onClick={() => toggleService(service.number)}
                          initial={{ opacity: 0, rotateX: 60 }}
                          animate={{ opacity: 1, rotateX: 0 }}
                          exit={{ opacity: 0, rotateX: -60 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="w-full text-left py-6 sm:py-7 px-5 sm:px-8 rounded-2xl bg-[#141414] hover:bg-[#181818] border border-white/[0.08] hover:border-[#f6aea9]/40 transition-all flex items-center group cursor-pointer"
                        >
                          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
                            <span className="text-xs font-mono tracking-widest text-[#8E8E93] group-hover:text-[#f6aea9] transition-colors shrink-0">
                              ({service.number})
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-[#1c1c1c] border border-white/[0.08] text-[#f6aea9] flex items-center justify-center shrink-0">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-normal text-white group-hover:text-[#f6aea9] transition-colors truncate">
                              {service.title}
                            </h3>
                          </div>
                        </motion.button>
                      ) : (
                        <motion.div
                          key="flipped"
                          onClick={() => toggleService(service.number)}
                          initial={{ opacity: 0, rotateX: -60 }}
                          animate={{ opacity: 1, rotateX: 0 }}
                          exit={{ opacity: 0, rotateX: 60 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="w-full py-7 sm:py-9 px-6 sm:px-9 rounded-2xl bg-[#181818] hover:bg-[#1a1a1a] border border-[#f6aea9]/50 shadow-2xl shadow-[#f6aea9]/5 space-y-6 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center border-b border-white/[0.08] pb-5">
                            <div className="flex items-center gap-4 min-w-0">
                              <span className="text-xs font-mono tracking-widest text-[#f6aea9] shrink-0">
                                ({service.number})
                              </span>
                              <div className="w-10 h-10 rounded-xl bg-[#222222] border border-[#f6aea9]/30 text-[#f6aea9] flex items-center justify-center shrink-0">
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <h3 className="text-lg sm:text-xl font-normal text-white">
                                {service.title}
                              </h3>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                            <div className="lg:col-span-6 space-y-2">
                              <div className="text-[11px] font-mono uppercase tracking-wider text-[#f6aea9]">
                                Overview
                              </div>
                              <p className="text-sm font-light text-[#8E8E93] leading-relaxed">
                                {service.description}
                              </p>
                            </div>

                            <div className="lg:col-span-6 space-y-2">
                              <div className="text-[11px] font-mono uppercase tracking-wider text-[#f6aea9]">
                                Key Deliverables
                              </div>
                              <ul className="space-y-2.5">
                                {service.deliverables.map((item, idx) => (
                                  <li
                                    key={idx}
                                    className="flex items-start gap-2.5 text-xs text-[#8E8E93] leading-normal"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#f6aea9] shrink-0 mt-1.5" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. ABOUT / FOUNDER SECTION */}
        <section
          id="about"
          className="scroll-mt-24 py-24 md:py-36 px-6 lg:px-12 border-t border-white/[0.08] max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Founder Portrait Frame */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-[4/5] w-full rounded-2xl bg-[#141414] border border-white/[0.1] overflow-hidden shadow-2xl group">
                <Image
                  src="/metumu-portrait.jpg"
                  alt="Metumu Tjimune — Founder & Principal Web Engineer"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                {/* Subtle dark gradient overlay at bottom for high-end editorial finish */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Under-portrait Caption */}
              <div className="flex items-center justify-between text-xs font-mono text-[#8E8E93] px-1">
                <span className="text-white font-medium">Metumu Tjimune</span>
                <span className="text-[#f6aea9]">Madrid, Spain</span>
              </div>
            </div>

            {/* Right: Technical Engineering Authority & Bio */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#f6aea9]">
                  Leadership &amp; Technical Authority
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.03em] text-white">
                  Metumu Tjimune
                </h2>
                <div className="text-sm font-mono text-[#8E8E93]">
                  Founder &amp; Principal Web Engineer
                </div>
              </div>

              <div className="space-y-6 text-[#8E8E93] text-sm sm:text-base font-light leading-relaxed">
                <p>
                  Operating internationally from <strong className="text-white font-normal">Madrid, Spain</strong>,
                  Madam Holdings delivers full-lifecycle web architecture for ambitious founders, startups,
                  and growing enterprises across Europe and Africa.
                </p>
                <p>
                  Metumu combines sharp strategic foresight with rigorous digital engineering. She holds a{" "}
                  <strong className="text-white font-normal">Bachelor of Business Science in Marketing (Honours)</strong> from
                  the <strong className="text-white font-normal">University of Cape Town (UCT)</strong>, alongside formal{" "}
                  <strong className="text-white font-normal">Design Thinking</strong> credentials from the{" "}
                  <strong className="text-white font-normal">Hasso Plattner Institute</strong>.
                </p>
                <p>
                  Currently advancing her technical authority through a{" "}
                  <strong className="text-white font-normal">Master&apos;s degree in Digital Strategy, AI &amp; Innovation at IE University in Madrid</strong>,
                  she directs end-to-end web architecture alongside a dedicated engineering unit—ensuring every platform is
                  engineered with modularity, continuous uptime, and high-converting clarity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CTA & CONTACT SECTION */}
        <section
          id="contact"
          className="scroll-mt-24 py-28 md:py-40 px-6 lg:px-12 border-t border-white/[0.08] bg-[#0c0c0c] relative overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#f6aea9]/[0.04] rounded-full blur-[160px] pointer-events-none" />

          <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-[#181818] text-[#8E8E93] text-xs font-mono uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f6aea9]" />
              <span>Project Intake</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-[-0.03em] text-white max-w-3xl mx-auto leading-tight">
              Ready to engineer your brand’s next digital benchmark?
            </h2>

            <p className="text-sm sm:text-base font-light text-[#8E8E93] max-w-xl mx-auto leading-relaxed">
              Schedule a technical consultation to review your requirements, architecture needs, and delivery timeline.
            </p>

            {/* Prominent Interactive Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={CALENDAR_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#f6aea9] hover:bg-[#f39b95] text-[#121212] font-semibold text-xs uppercase tracking-wider transition-all shadow-xl shadow-[#f6aea9]/15 flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <Calendar className="w-4 h-4" />
                <span>Start a project →</span>
              </a>

              <a
                href="mailto:info@madamholdings.com"
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/[0.12] bg-[#181818] hover:border-white/[0.25] text-white font-medium text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#f6aea9]" />
                <span>info@madamholdings.com</span>
              </a>
            </div>

            <div className="pt-6 text-xs font-mono text-[#8E8E93]">
              Direct Calendar Scheduling &bull; Rapid Technical Scoping
            </div>
          </div>
        </section>
      </main>

      {/* 8. MINIMALIST FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#121212] py-12 px-6 lg:px-12 text-xs text-[#8E8E93]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Legal Entity */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 shrink-0 rounded-lg bg-[#d85d5d] flex items-center justify-center font-black text-white text-xs shadow-sm">
              M
            </div>
            <span className="font-semibold text-white tracking-wider uppercase">
              MADAM <span className="text-[#d85d5d]">HOLDINGS</span>
            </span>
            <span>&bull;</span>
            <span>&copy; {new Date().getFullYear()} Madam T Holdings PTY Ltd. Registered in Namibia.</span>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 font-medium">
            <button
              type="button"
              onClick={() => scrollToSection("home")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("services")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Services
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("showcase")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Showcase
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("about")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
            <Link
              href="/privacy"
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Back to top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/[0.08] hover:border-white/[0.2] hover:text-white transition-all cursor-pointer font-mono"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#f6aea9]" />
          </button>
        </div>
      </footer>
    </div>
  );
}
