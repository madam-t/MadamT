"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Mail,
  MapPin,
  Calendar as CalendarIcon,
  ArrowUp,
  CheckCircle2,
  Sparkles,
  Layers,
  GraduationCap,
  Laptop,
  Users2,
  Globe,
  Tag,
  Clock,
} from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";
import PortfolioModal from "@/components/PortfolioModal";
import SynergyDiagnostic from "@/components/SynergyDiagnostic";
import { PORTFOLIO_DATA, PortfolioItem } from "@/data/portfolioData";

export default function Home() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<PortfolioItem | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const calendarBookingUrl =
    "https://calendar.google.com/calendar/u/0/appointments/schedules/c1507727-b673-455b";

  return (
    <div className="min-h-screen bg-[#000000] text-[#ffffff] flex flex-col justify-between selection:bg-[#d85d5d] selection:text-[#ffffff] font-sans">
      {/* 1. Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#000000]/85 border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={scrollToTop}
          >
            <div className="w-9 h-9 rounded-lg bg-[#d85d5d] flex items-center justify-center font-bold text-[#000000] text-xl shadow-lg shadow-[#d85d5d]/20">
              M
            </div>
            <span className="font-extrabold tracking-wider text-base md:text-lg uppercase">
              MADAM T <span className="text-[#d85d5d]">HOLDINGS</span>
            </span>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400"
          >
            <button
              type="button"
              onClick={() => scrollToSection("portfolio")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Portfolio
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("about")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About Madam T
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("diagnostic")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Diagnostic
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("booking")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Book a Call
            </button>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <button
              type="button"
              onClick={() => scrollToSection("booking")}
              className="px-5 py-2.5 rounded-full bg-[#d85d5d] hover:bg-[#c44e4e] text-white transition-all text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#d85d5d]/20 cursor-pointer flex items-center gap-2"
            >
              Let&apos;s Talk
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <section className="relative pt-16 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
          {/* Subtle Ambient Red Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#d85d5d]/10 rounded-full blur-[140px] pointer-events-none" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 space-y-10"
          >
            <div className="text-center max-w-4xl mx-auto space-y-6">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#262626] bg-[#111111]"
              >
                <span className="w-2 h-2 rounded-full bg-[#d85d5d] animate-pulse" />
                <span className="text-xs uppercase tracking-widest font-mono font-semibold text-neutral-300">
                  madamholdings.com &bull; PORTFOLIO-FIRST HUB
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]"
              >
                WELCOME TO <br />
                <span className="bg-gradient-to-r from-white via-neutral-200 to-[#d85d5d] bg-clip-text text-transparent">
                  MADAM T&apos;S PORTFOLIO
                </span>
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
              >
                <button
                  type="button"
                  onClick={() => scrollToSection("portfolio")}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#d85d5d] hover:bg-[#c44e4e] text-white font-bold text-sm tracking-wide transition-all shadow-xl shadow-[#d85d5d]/25 flex items-center justify-center gap-2 cursor-pointer group"
                >
                  Explore The Work &amp; Proof
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("about")}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl border border-[#262626] bg-[#111111] hover:border-neutral-500 text-white font-semibold text-sm transition-all cursor-pointer"
                >
                  Meet Madam T
                </button>
              </motion.div>
            </div>

            {/* Interactive Picture Slider / Carousel */}
            <motion.div variants={itemVariants} className="pt-4">
              <HeroCarousel />
            </motion.div>
          </motion.div>
        </section>

        {/* 3. Portfolio & Case Studies Section (Featured First) */}
        <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="mb-14 text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#262626] bg-[#111111] text-xs font-mono font-semibold text-[#d85d5d] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Featured Case Studies
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              The Work &amp; The Proof
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base">
              No fluffy sales talk—here is real work delivered for real organizations. Click any case study to explore the problem, the tech built, and exact metrics achieved.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO_DATA.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="p-6 md:p-8 rounded-2xl bg-[#111111] border border-[#262626] hover:border-[#d85d5d] transition-all flex flex-col justify-between group shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-[#18181b] border border-[#262626] text-xs font-mono text-[#d85d5d] font-semibold">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-500 truncate max-w-[150px]">
                      {item.client}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#d85d5d] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-neutral-300 text-xs md:text-sm leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>

                  {/* Highlights Pill */}
                  <div className="p-3 rounded-xl bg-[#0a0a0a] border border-[#262626] space-y-1">
                    <div className="text-[10px] font-mono text-[#d85d5d] uppercase font-bold">
                      Key Metric Highlight
                    </div>
                    <div className="text-xs font-semibold text-neutral-200 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#d85d5d] shrink-0" />
                      <span className="truncate">{item.metrics[0]}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-[#18181b] text-neutral-400 text-[11px] font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="px-2 py-0.5 rounded bg-[#18181b] text-neutral-500 text-[11px] font-mono">
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#262626]">
                  <button
                    type="button"
                    onClick={() => setSelectedCaseStudy(item)}
                    className="w-full py-3 rounded-xl bg-[#18181b] hover:bg-[#d85d5d] text-white hover:text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#262626] hover:border-[#d85d5d]"
                  >
                    Read Case Study
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. 'About Madam T' Bio Section */}
        <section id="about" className="py-20 px-6 max-w-7xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-b from-[#111111] to-[#0a0a0a] border border-[#262626] p-8 md:p-14 relative overflow-hidden shadow-2xl space-y-10">
            {/* Top Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#262626] pb-8">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#d85d5d]">
                  <GraduationCap className="w-4 h-4" /> Personal Cover Letter &amp; Bio
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                  A Little About Me &amp; How We Work
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-[#d85d5d]/10 border border-[#d85d5d]/30 text-[#d85d5d] text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#d85d5d] animate-ping" />
                  100% Remote Global Delivery
                </span>
              </div>
            </div>

            {/* Letter Body Content */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Personal Narrative Cover Letter */}
              <div className="lg:col-span-7 space-y-6 text-neutral-300 text-sm md:text-base leading-relaxed">
                <p className="font-medium text-white text-base md:text-lg">
                  Hello! I’m Madam T—an operations lead, brand strategist, and digital system builder based out of Windhoek, Namibia, working with clients globally.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#18181b] border border-[#262626] flex items-center justify-center text-[#d85d5d] shrink-0 mt-1">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Education &amp; Design Thinking</h4>
                      <p className="text-xs md:text-sm text-neutral-400 leading-relaxed mt-1">
                        I hold a <strong>Bachelor of Business Science in Marketing (Honours)</strong> from the <strong>University of Cape Town (UCT)</strong>, combined with formal <strong>Design Thinking</strong> training at the <strong>Hasso Plattner Institute</strong>. This foundation allows me to blend user-centered empathy with strict strategic execution.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#18181b] border border-[#262626] flex items-center justify-center text-[#d85d5d] shrink-0 mt-1">
                      <Laptop className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Remote &amp; Problem-Solving Approach</h4>
                      <p className="text-xs md:text-sm text-neutral-400 leading-relaxed mt-1">
                        I specialize in diagnosing practically any complex digital or operational problem from a distance—whether that means automating paper-heavy field logs into instant cloud databases or building high-converting web applications.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#18181b] border border-[#262626] flex items-center justify-center text-[#d85d5d] shrink-0 mt-1">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Current Work Model &amp; Advanced Studies</h4>
                      <p className="text-xs md:text-sm text-neutral-400 leading-relaxed mt-1">
                        My operations run <strong>100% remotely on a flexible contract basis</strong>. I balance client deliverables while completing an online <strong>Advanced Project Management course through UCT</strong> and pursuing my <strong>Master&apos;s degree in Digital Strategy, AI &amp; Innovation at IE University in Madrid, Spain</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#18181b] border border-[#262626] flex items-center justify-center text-[#d85d5d] shrink-0 mt-1">
                      <Users2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">The Engineering Unit</h4>
                      <p className="text-xs md:text-sm text-neutral-400 leading-relaxed mt-1">
                        While I lead strategy, client operations, and project delivery, I work alongside a dedicated team of <strong>2 skilled software engineers</strong> to code, deploy, and scale custom web platforms and complex software backends seamlessly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Bio Highlights Card */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-[#262626] space-y-5">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-[#262626] pb-3">
                    <Sparkles className="w-4 h-4 text-[#d85d5d]" /> Quick Bio Overview
                  </h3>

                  <div className="space-y-3 text-xs font-mono">
                    <div className="flex justify-between py-2 border-b border-[#262626]">
                      <span className="text-neutral-500">Degree</span>
                      <span className="text-white font-semibold text-right">B.B.Sc Marketing (Hons) • UCT</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#262626]">
                      <span className="text-neutral-500">Specialization</span>
                      <span className="text-white font-semibold text-right">Design Thinking • Hasso Plattner</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#262626]">
                      <span className="text-neutral-500">Master&apos;s Candidate</span>
                      <span className="text-[#d85d5d] font-semibold text-right">Digital Strategy &amp; AI • IE Madrid</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#262626]">
                      <span className="text-neutral-500">Team Structure</span>
                      <span className="text-white font-semibold text-right">Madam T + 2 Software Devs</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-neutral-500">Operating Base</span>
                      <span className="text-white font-semibold text-right">Windhoek, Namibia (Remote)</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => scrollToSection("booking")}
                      className="w-full py-3.5 rounded-xl bg-[#d85d5d] hover:bg-[#c44e4e] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#d85d5d]/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Book Free Consultation
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Interactive Section: The Synergy Diagnostic */}
        <section id="diagnostic" className="py-24 px-6 max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#262626] bg-[#111111] text-xs font-mono font-semibold text-[#d85d5d] uppercase tracking-wider">
              Interactive Business Diagnostic
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Operational Synergy Diagnostic
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-sm md:text-base">
              Curious if we’d make a great team? Run through this quick 3-step diagnostic widget to see how Madam T and our engineering unit can untangle your operations!
            </p>
          </div>

          <SynergyDiagnostic calendarUrl={calendarBookingUrl} />
        </section>

        {/* 6. Bookings & Contact Section */}
        <section id="booking" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-r from-[#18181b] via-[#111111] to-[#18181b] border border-[#d85d5d]/40 p-8 md:p-14 relative overflow-hidden shadow-2xl text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#d85d5d]">
                <CalendarIcon className="w-4 h-4" /> Free 60-Minute Consultation
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Ready to Take the Weight Off Your Shoulders?
              </h2>
              <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
                Let’s discuss your project goals and see how we can streamline your business. The initial 60-minute consultation is completely free.
              </p>

              {/* Direct Info Pills */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs font-mono text-neutral-300">
                <a
                  href="mailto:tjimunen@gmail.com"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0a0a0a] border border-[#262626] hover:border-[#d85d5d] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#d85d5d]" />
                  <span>tjimunen@gmail.com</span>
                </a>
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#0a0a0a] border border-[#262626]">
                  <MapPin className="w-4 h-4 text-[#d85d5d]" />
                  <span>Windhoek, Namibia</span>
                </div>
              </div>
            </div>

            {/* Calendar CTA Buttons */}
            <div className="flex-shrink-0 w-full md:w-auto space-y-3">
              <a
                href={calendarBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-[#d85d5d] hover:bg-[#c44e4e] text-white font-bold text-sm tracking-wide uppercase transition-all shadow-xl shadow-[#d85d5d]/25 flex items-center justify-center gap-3 cursor-pointer group"
              >
                <CalendarIcon className="w-5 h-5" />
                <span>Book Consultation with Madam T</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <div className="text-center font-mono text-[11px] text-neutral-500">
                Direct Google Calendar Booking &bull; 60 Mins Free
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 7. Footer */}
      <footer className="border-t border-[#262626] bg-[#000000] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-400">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-[#d85d5d] text-[#000000] font-bold flex items-center justify-center text-xs">
              M
            </div>
            <span className="font-semibold text-neutral-300">
              &copy; 2026 Madam T Holdings. Registered in Namibia.
            </span>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <button
              type="button"
              onClick={() => scrollToSection("portfolio")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Portfolio
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
              onClick={() => scrollToSection("diagnostic")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Diagnostic
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("booking")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Booking
            </button>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="px-4 py-2 rounded-xl bg-[#111111] border border-[#262626] hover:border-[#d85d5d] hover:text-[#d85d5d] text-neutral-300 font-mono text-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>

      {/* Modal for Case Study Deep Dives */}
      <PortfolioModal
        item={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
      />
    </div>
  );
}
