"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  FileText,
  Mail,
  ArrowLeft,
  ArrowUp,
  CheckCircle2,
  Building2,
  Server,
  UserCheck,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function PrivacyPolicyPage() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col justify-between selection:bg-brand selection:text-on-brand font-sans">
      {/* 1. Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-canvas/85 border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 group cursor-pointer min-w-0"
          >
            <div className="w-9 h-9 shrink-0 rounded-lg bg-brand flex items-center justify-center font-bold text-canvas text-xl shadow-lg shadow-brand/20">
              M
            </div>
            <span className="font-extrabold tracking-wider text-sm sm:text-base md:text-lg uppercase truncate min-w-0">
              MADAM <span className="text-brand-ink">HOLDINGS</span>
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeToggle />
            <Link
              href="/"
              className="px-3.5 py-2 rounded-xl bg-surface border border-line hover:border-brand hover:text-brand-ink text-ink-muted font-mono text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 md:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Header Banner */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand-ink text-xs font-mono font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Legal & Data Governance</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-2xl">
              At Madam Holdings, protecting client confidentiality and personal information is integral to how we operate. This policy explains our data principles, safeguards, and strict internal handling procedures.
            </p>
            <div className="pt-2 text-xs font-mono text-ink-faint flex items-center gap-4 border-b border-line pb-6">
              <span>Effective Date: August 17, 2026</span>
              <span>&bull;</span>
              <span>Madam T Holdings PTY Ltd</span>
            </div>
          </motion.div>

          {/* Highlights Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="p-5 rounded-2xl bg-surface border border-line space-y-2">
              <div className="w-8 h-8 rounded-lg bg-brand/10 text-brand-ink flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-ink">Strict Internal Use</h3>
              <p className="text-xs text-ink-subtle leading-relaxed">
                All data shared with us is used exclusively internally to deliver tailored business services to your enterprise.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-line space-y-2">
              <div className="w-8 h-8 rounded-lg bg-brand/10 text-brand-ink flex items-center justify-center">
                <EyeOff className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-ink">Zero Data Monetization</h3>
              <p className="text-xs text-ink-subtle leading-relaxed">
                We never sell, rent, license, or share client information with external advertisers or data brokers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-line space-y-2">
              <div className="w-8 h-8 rounded-lg bg-brand/10 text-brand-ink flex items-center justify-center">
                <UserCheck className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-ink">Full Client Control</h3>
              <p className="text-xs text-ink-subtle leading-relaxed">
                You retain full ownership of your data and can request access, corrections, or erasure at any time.
              </p>
            </div>
          </motion.div>

          {/* Detailed Policy Text */}
          <motion.div variants={itemVariants} className="space-y-10 text-ink-muted text-sm sm:text-base leading-relaxed">
            {/* Section 1 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-brand-ink shrink-0" />
                <span>1. Overview & Core Commitment</span>
              </h2>
              <p>
                Madam T Holdings PTY Ltd (&quot;Madam Holdings&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is a strategic venture management and corporate advisory holding firm. We operate under strict principles of discretion and confidentiality.
              </p>
              <p>
                This Privacy Policy applies to all personal information, organizational records, business operational data, and communications received through our digital portal (<span className="font-mono text-xs bg-surface px-1.5 py-0.5 rounded border border-line text-ink">madamholdings.com</span>), booking calendars, diagnostics, or direct client engagements.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-brand-ink shrink-0" />
                <span>2. Information We Collect</span>
              </h2>
              <p>
                We only collect personal and business information that is voluntarily provided or strictly required to fulfill client services:
              </p>
              <ul className="space-y-2 pl-2">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-ink shrink-0 mt-1" />
                  <span><strong>Contact Information:</strong> Full name, professional email address, phone number, company name, and job title.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-ink shrink-0 mt-1" />
                  <span><strong>Engagement & Diagnostic Data:</strong> Details provided during strategic consultations, intake forms, diagnostic tools, and operational assessments.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-ink shrink-0 mt-1" />
                  <span><strong>Technical & Usage Data:</strong> Standard anonymous web metrics (IP address, browser type, device details) captured via analytics to optimize site performance and security.</span>
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink flex items-center gap-2.5">
                <Lock className="w-5 h-5 text-brand-ink shrink-0" />
                <span>3. Strict Internal Usage & Purpose Specification</span>
              </h2>
              <div className="p-4 rounded-xl bg-surface border border-line text-ink space-y-2">
                <div className="font-bold text-sm text-brand-ink uppercase tracking-wide font-mono">
                  Primary Guarantee
                </div>
                <p className="text-xs sm:text-sm text-ink-muted">
                  All personal and organizational data shared with Madam Holdings is strictly restricted to internal use and is processed solely for the purpose of executing advisory services, conducting consultations, and delivering agreed client objectives.
                </p>
              </div>
              <p className="pt-2">Specifically, internal data handling covers:</p>
              <ul className="space-y-2 pl-2">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-ink shrink-0 mt-1" />
                  <span>Evaluating business bottlenecks and formulating customized strategic solutions.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-ink shrink-0 mt-1" />
                  <span>Scheduling, managing, and conducting client advisory calls and consultations.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-ink shrink-0 mt-1" />
                  <span>Fulfilling contractual agreements, administrative billing, and project status updates.</span>
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink flex items-center gap-2.5">
                <EyeOff className="w-5 h-5 text-brand-ink shrink-0" />
                <span>4. Non-Disclosure & Third-Party Protections</span>
              </h2>
              <p>
                We enforce a comprehensive non-disclosure policy across all operational facets:
              </p>
              <ul className="space-y-2 pl-2">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-ink shrink-0 mt-1" />
                  <span><strong>No Data Sales:</strong> We do not sell, trade, license, or monetize your personal or commercial data under any circumstances.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-ink shrink-0 mt-1" />
                  <span><strong>No Marketing Distribution:</strong> Your details will never be provided to external marketing agencies or commercial partners without explicit consent.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-ink shrink-0 mt-1" />
                  <span><strong>Legal Mandates:</strong> Information will only be disclosed if mandatory under applicable law, regulation, or formal court order.</span>
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink flex items-center gap-2.5">
                <Server className="w-5 h-5 text-brand-ink shrink-0" />
                <span>5. Data Security & Storage Safeguards</span>
              </h2>
              <p>
                We maintain appropriate technical, organizational, and physical safeguards designed to protect personal information from loss, misuse, unauthorized access, disclosure, alteration, or destruction. Access to confidential client records is restricted exclusively to authorized internal personnel operating under non-disclosure obligations.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink flex items-center gap-2.5">
                <UserCheck className="w-5 h-5 text-brand-ink shrink-0" />
                <span>6. Your Rights & Data Choices</span>
              </h2>
              <p>
                As a client or site visitor, you hold full rights regarding your personal information:
              </p>
              <ul className="space-y-2 pl-2">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-ink shrink-0 mt-1" />
                  <span><strong>Access & Correction:</strong> Request a copy of the personal information we hold or update inaccurate records.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-ink shrink-0 mt-1" />
                  <span><strong>Erasure:</strong> Request the deletion of your personal records from our active internal management systems, subject to statutory record retention laws.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-ink shrink-0 mt-1" />
                  <span><strong>Opt-Out:</strong> Unsubscribe or opt out of any non-essential service communications at any time.</span>
                </li>
              </ul>
            </section>
          </motion.div>

          {/* Contact Box */}
          <motion.div
            variants={itemVariants}
            className="p-6 sm:p-8 rounded-3xl bg-surface border border-line flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-lg font-bold text-ink">Have Questions About Your Data?</h3>
              <p className="text-xs sm:text-sm text-ink-muted max-w-md">
                Our team is available to address any privacy inquiries or assist with data update requests.
              </p>
            </div>
            <a
              href="mailto:info@madamholdings.com"
              className="px-5 py-3 rounded-xl bg-brand hover:bg-brand-hover text-on-brand font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Contact info@madamholdings.com</span>
            </a>
          </motion.div>
        </motion.div>
      </main>

      {/* 3. Footer */}
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
            <Link href="/#portfolio" className="hover:text-ink transition-colors cursor-pointer">
              Portfolio
            </Link>
            <Link href="/#about" className="hover:text-ink transition-colors cursor-pointer">
              About
            </Link>
            <Link href="/#booking" className="hover:text-ink transition-colors cursor-pointer">
              Booking
            </Link>
            <Link href="/privacy" className="text-brand-ink font-semibold hover:text-brand transition-colors cursor-pointer">
              Privacy Policy
            </Link>
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
    </div>
  );
}
