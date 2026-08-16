"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Mail,
  Calendar as CalendarIcon,
  ArrowUp,
  CheckCircle2,
  GraduationCap,
  Laptop,
  Users2,
  Clock,
  Menu,
  X,
} from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";
import ThemeToggle from "@/components/ThemeToggle";
import LaunchOffer from "@/components/LaunchOffer";
import LaunchOfferBar from "@/components/LaunchOfferBar";
import PortfolioModal from "@/components/PortfolioModal";
import { PORTFOLIO_DATA, PortfolioItem } from "@/data/portfolioData";

const NAV_LINKS: { id: string; label: string }[] = [
  { id: "portfolio", label: "Portfolio" },
  { id: "offer", label: "Launch Offer" },
  { id: "about", label: "About Madam T" },
  { id: "booking", label: "Book a Call" },
];

export default function Home() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<PortfolioItem | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

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

  const scrollToSection = useCallback((id: string) => {
    setIsMobileNavOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    setIsMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Stable identity so PortfolioModal's scroll-lock effect doesn't re-run
  // on every render of this page.
  const closeCaseStudy = useCallback(() => setSelectedCaseStudy(null), []);

  // Google Calendar appointment schedule ("Consultation with Madam T").
  // Feeds both the booking section CTA and the diagnostic result CTA.
  const calendarBookingUrl =
    "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0X1Vr35p4DG5PCJ4tHB0-j_BGPzvVaoOzLSSumSqGRCe9w5tCrNirqT7jBbZh7C-7n48NknxOl";

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col justify-between selection:bg-brand selection:text-on-brand font-sans">
      {/* 0. Launch promotion strip — scrolls away above the sticky header */}
      <LaunchOfferBar onView={() => scrollToSection("offer")} />

      {/* 1. Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-canvas/85 border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 sm:gap-3 cursor-pointer min-w-0"
            onClick={scrollToTop}
          >
            <div className="w-9 h-9 shrink-0 rounded-lg bg-brand flex items-center justify-center font-bold text-canvas text-xl shadow-lg shadow-brand/20">
              M
            </div>
            <span className="font-extrabold tracking-wider text-sm sm:text-base md:text-lg uppercase truncate min-w-0">
              MADAM <span className="text-brand-ink">HOLDINGS</span>
            </span>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:flex items-center gap-8 text-sm font-medium text-ink-subtle"
          >
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className="hover:text-ink transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 shrink-0"
          >
            <ThemeToggle />

            {/*
              Hidden on phones: measured against Inter, the logo, toggle, this
              button and the menu trigger total 447px against ~312px of usable
              width at 360px. The drawer carries a full-width CTA instead.
            */}
            <button
              type="button"
              onClick={() => scrollToSection("booking")}
              className="hidden sm:flex px-4 sm:px-5 py-2.5 rounded-full bg-brand hover:bg-brand-hover text-on-brand transition-all text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand/20 cursor-pointer items-center gap-2"
            >
              Let&apos;s Talk
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu toggle — below lg the nav links have no other entry point */}
            <button
              type="button"
              onClick={() => setIsMobileNavOpen((open) => !open)}
              className="lg:hidden w-10 h-10 rounded-xl border border-line bg-surface text-ink-muted hover:border-brand hover:text-brand-ink flex items-center justify-center transition-all cursor-pointer"
              aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileNavOpen}
              aria-controls="mobile-nav"
            >
              {isMobileNavOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </motion.div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence initial={false}>
          {isMobileNavOpen && (
            <motion.nav
              id="mobile-nav"
              key="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden border-t border-line bg-canvas/95"
            >
              <div className="px-4 sm:px-6 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="text-left px-3 py-3 rounded-lg text-sm font-medium text-ink-muted hover:text-ink hover:bg-surface transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}

                {/* Replaces the header CTA that is hidden on phones */}
                <button
                  type="button"
                  onClick={() => scrollToSection("booking")}
                  className="sm:hidden mt-2 w-full px-5 py-3.5 rounded-xl bg-brand hover:bg-brand-hover text-on-brand text-xs font-bold uppercase tracking-wider shadow-lg shadow-brand/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  Let&apos;s Talk
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <section className="relative pt-10 pb-12 px-4 sm:px-6 max-w-7xl mx-auto overflow-hidden">
          {/* Subtle Ambient Red Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-brand/10 rounded-full blur-[140px] pointer-events-none" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 space-y-10"
          >
            <div className="text-center max-w-4xl mx-auto space-y-6">
              <motion.h1
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]"
              >
                WELCOME TO <br />
                <span className="bg-gradient-to-r from-ink via-ink-muted to-brand bg-clip-text text-transparent">
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
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand hover:bg-brand-hover text-on-brand font-bold text-sm tracking-wide transition-all shadow-xl shadow-brand/25 flex items-center justify-center gap-2 cursor-pointer group"
                >
                  Explore The Work &amp; Proof
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("about")}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl border border-line bg-surface hover:border-line-strong text-ink font-semibold text-sm transition-all cursor-pointer"
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
        <section id="portfolio" className="scroll-mt-24 py-14 md:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="mb-10 text-center space-y-3">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              The Work &amp; The Proof
            </h2>
            <p className="text-ink-subtle max-w-2xl mx-auto text-sm md:text-base">
              No fluffy sales talk—here is real work delivered for real organizations. Click any case study to explore the problem, the tech built, and exact metrics achieved.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO_DATA.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="min-w-0 p-5 sm:p-6 md:p-8 rounded-2xl bg-surface border border-line hover:border-brand transition-all flex flex-col justify-between group shadow-lg"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-surface-2 border border-line text-xs font-mono text-brand-ink font-semibold">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-mono text-ink-faint truncate max-w-[150px]">
                      {item.client}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-ink group-hover:text-brand-ink transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-ink-muted text-xs md:text-sm leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>

                  {/* Highlights Pill */}
                  <div className="p-3 rounded-xl bg-surface-deep border border-line space-y-1">
                    <div className="text-[10px] font-mono text-brand-ink uppercase font-bold">
                      Key Metric Highlight
                    </div>
                    {/*
                      This row used `truncate`, which sets white-space: nowrap.
                      A flex item defaults to min-width:auto, so the span could
                      not shrink below the full metric string and dragged the
                      whole card past the viewport — 612px against a 360px
                      phone for the longest one. line-clamp-2 lets the text
                      wrap (no nowrap, so no minimum), shows far more of the
                      metric than an ellipsis did, and still caps the height.
                    */}
                    <div className="text-xs font-semibold text-ink-muted flex items-start gap-1.5 min-w-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-ink shrink-0 mt-0.5" />
                      <span className="line-clamp-2 min-w-0">{item.metrics[0]}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-surface-2 text-ink-subtle text-[11px] font-mono"
                      >
                        #{tag}
                      </span>
                    ))}
                    {item.tags.length > 3 && (
                      <span className="px-2 py-0.5 rounded bg-surface-2 text-ink-faint text-[11px] font-mono">
                        +{item.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-line">
                  <button
                    type="button"
                    onClick={() => setSelectedCaseStudy(item)}
                    className="w-full py-3 rounded-xl bg-surface-2 hover:bg-brand text-ink hover:text-on-brand font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border border-line hover:border-brand"
                  >
                    Read Case Study
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. Launch Offer — placed straight after the proof, while the work
            is still fresh and before the longer bio and diagnostic. */}
        <section id="offer" className="scroll-mt-24 py-14 md:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
          <LaunchOffer calendarUrl={calendarBookingUrl} />
        </section>

        {/* 5. 'About Madam T' Bio Section */}
        <section id="about" className="scroll-mt-24 py-14 md:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-b from-surface to-surface-deep border border-line p-6 sm:p-8 md:p-14 relative overflow-hidden shadow-2xl space-y-10">
            {/* Top Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-line pb-8">
              <div className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-extrabold text-ink">
                  A Little About Me &amp; How We Work
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-full bg-brand/10 border border-brand/30 text-brand-ink text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand animate-ping" />
                  100% Remote Global Delivery
                </span>
              </div>
            </div>

            {/* Letter Body Content */}
            <div className="grid lg:grid-cols-12 gap-8 items-start lg:items-stretch">
              {/* Left Column: Personal Narrative Cover Letter */}
              <div className="lg:col-span-7 space-y-6 text-ink-muted text-sm md:text-base leading-relaxed">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-2 border border-line flex items-center justify-center text-brand-ink shrink-0 mt-1">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-ink text-base">Education &amp; Design Thinking</h4>
                      <p className="text-xs md:text-sm text-ink-subtle leading-relaxed mt-1">
                        I hold a <strong>Bachelor of Business Science in Marketing (Honours)</strong> from the <strong>University of Cape Town (UCT)</strong>, combined with formal <strong>Design Thinking</strong> training at the <strong>Hasso Plattner Institute</strong>. This foundation allows me to blend user-centered empathy with strict strategic execution.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-2 border border-line flex items-center justify-center text-brand-ink shrink-0 mt-1">
                      <Laptop className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-ink text-base">Remote &amp; Problem-Solving Approach</h4>
                      <p className="text-xs md:text-sm text-ink-subtle leading-relaxed mt-1">
                        I specialize in diagnosing practically any complex digital or operational problem from a distance—whether that means automating paper-heavy field logs into instant cloud databases or building high-converting web applications.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-2 border border-line flex items-center justify-center text-brand-ink shrink-0 mt-1">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-ink text-base">Current Work Model &amp; Advanced Studies</h4>
                      <p className="text-xs md:text-sm text-ink-subtle leading-relaxed mt-1">
                        My operations run <strong>100% remotely on a flexible contract basis</strong>. I balance client deliverables while completing an online <strong>Advanced Project Management course through UCT</strong> and pursuing my <strong>Master&apos;s degree in Digital Strategy, AI &amp; Innovation at IE University in Madrid, Spain</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-2 border border-line flex items-center justify-center text-brand-ink shrink-0 mt-1">
                      <Users2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-ink text-base">The Engineering Unit</h4>
                      <p className="text-xs md:text-sm text-ink-subtle leading-relaxed mt-1">
                        While I lead strategy, client operations, and project delivery, I work alongside a dedicated team of <strong>2 skilled software engineers</strong> to code, deploy, and scale custom web platforms and complex software backends seamlessly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Portrait & Consultation CTA */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                {/*
                  `flex-1 min-h-0` + a fill image lets the frame absorb whatever
                  height the prose column sets.
                */}
                <div className="relative flex-1 min-h-[300px] sm:min-h-[360px] lg:min-h-0 rounded-2xl bg-surface-deep border border-line overflow-hidden">
                  {/* Ambient brand glow behind the cut-out portrait */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-2/3 bg-brand/10 blur-[90px] rounded-full pointer-events-none" />

                  <Image
                    src="/Madam-T-phone.png"
                    alt="Portrait of Madam T"
                    fill
                    sizes="(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 90vw"
                    className="object-contain object-center p-3"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => scrollToSection("booking")}
                  className="shrink-0 w-full py-5 sm:py-6 rounded-2xl bg-brand hover:bg-brand-hover text-on-brand font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-xl shadow-brand/25 flex items-center justify-center gap-2.5 cursor-pointer group"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>


        {/* 6. Bookings & Contact Section */}
        <section id="booking" className="scroll-mt-24 py-14 md:py-16 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-r from-surface-2 via-surface to-surface-2 border border-brand/40 p-6 sm:p-8 md:p-14 relative overflow-hidden shadow-2xl text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-brand-ink">
                <CalendarIcon className="w-4 h-4" /> Free 60-Minute Consultation
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
                Ready to Take the Weight Off Your Shoulders?
              </h2>
              <p className="text-ink-muted text-sm md:text-base leading-relaxed">
                Let’s discuss your business. The initial 60-minute consultation is completely free.
              </p>

              {/* Direct Info Pills */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs font-mono text-ink-muted">
                <a
                  href="mailto:info@madamholdings.com"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-deep border border-line hover:border-brand transition-colors"
                >
                  <Mail className="w-4 h-4 text-brand-ink" />
                  <span>info@madamholdings.com</span>
                </a>
              </div>
            </div>

            {/* Calendar CTA Buttons */}
            <div className="flex-shrink-0 w-full md:w-auto space-y-3">
              <a
                href={calendarBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 sm:px-8 py-4 sm:py-5 rounded-2xl bg-brand hover:bg-brand-hover text-on-brand font-bold text-xs sm:text-sm tracking-wide uppercase transition-all shadow-xl shadow-brand/25 flex items-center justify-center gap-2.5 sm:gap-3 cursor-pointer group text-center"
              >
                <CalendarIcon className="w-5 h-5" />
                <span>Book Consultation with Madam T</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <div className="text-center font-mono text-[11px] text-ink-faint">
                Direct Google Calendar Booking &bull; 60 Mins Free
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 7. Footer */}
      <footer className="border-t border-line bg-canvas py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-ink-subtle">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-brand text-canvas font-bold flex items-center justify-center text-xs">
              M
            </div>
            <span className="font-semibold text-ink-muted">
              &copy; 2026 Madam T Holdings PTY Ltd. Registered in Namibia
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-medium">
            <button
              type="button"
              onClick={() => scrollToSection("portfolio")}
              className="hover:text-ink transition-colors cursor-pointer"
            >
              Portfolio
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("about")}
              className="hover:text-ink transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("booking")}
              className="hover:text-ink transition-colors cursor-pointer"
            >
              Booking
            </button>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="px-4 py-2 rounded-xl bg-surface border border-line hover:border-brand hover:text-brand-ink text-ink-muted font-mono text-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>

      {/* Modal for Case Study Deep Dives */}
      <PortfolioModal item={selectedCaseStudy} onClose={closeCaseStudy} />
    </div>
  );
}
