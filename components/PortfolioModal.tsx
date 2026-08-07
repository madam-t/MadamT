"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ExternalLink, ShieldCheck, Tag, Building } from "lucide-react";
import { PortfolioItem } from "@/data/portfolioData";

interface PortfolioModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

/** Case studies that have a public site to link out to. */
const EXTERNAL_URLS: Record<string, string> = {
  "ivoire-africa": "https://ivoireafrica.com",
  "eshham-investment-group": "https://eshham.com",
};

export default function PortfolioModal({ item, onClose }: PortfolioModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // Compensate for the scrollbar we're about to remove so the page behind
    // the modal doesn't visibly shift.
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
    window.addEventListener("keydown", handleKeyDown);

    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  const externalUrl = item ? EXTERNAL_URLS[item.id] ?? null : null;

  return (
    /*
     * AnimatePresence must stay mounted across the open/close transition —
     * returning null above it (the previous behaviour) meant the exit
     * animation was never given a chance to play.
     */
    <AnimatePresence>
      {item && (
        <div
          key="portfolio-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="portfolio-modal-title"
        >
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-surface-deep border border-line shadow-2xl overflow-hidden text-ink z-10"
          >
            {/* Top Header Bar */}
            <div className="shrink-0 bg-surface px-6 py-4 border-b border-line flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full bg-brand shrink-0" />
                <span className="font-mono text-xs text-brand-ink font-bold uppercase tracking-wider truncate">
                  CASE STUDY DETAIL // {item.category}
                </span>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="w-8 h-8 shrink-0 rounded-lg bg-surface-2 border border-line hover:border-brand hover:text-brand-ink text-ink-subtle flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close case study"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
              {/* Title & Client Badge */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/30 text-brand-ink text-xs font-mono font-semibold">
                    <Building className="w-3.5 h-3.5" />
                    Client: {item.client}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-surface-2 border border-line text-ink-subtle text-xs font-mono">
                    {item.category}
                  </span>
                </div>

                <h2
                  id="portfolio-modal-title"
                  className="text-2xl md:text-3xl font-extrabold text-ink tracking-tight"
                >
                  {item.title}
                </h2>
              </div>

              {/* Problem & Solution Detailed Breakdown */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-surface border border-line space-y-2">
                  <div className="font-mono text-xs text-brand-ink font-bold uppercase tracking-wider">
                    The Operational Problem
                  </div>
                  <p className="text-xs md:text-sm text-ink-muted leading-relaxed">
                    {item.problem}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-surface border border-line space-y-2">
                  <div className="font-mono text-xs text-success font-bold uppercase tracking-wider">
                    The Implemented Solution
                  </div>
                  <p className="text-xs md:text-sm text-ink-muted leading-relaxed">
                    {item.solution}
                  </p>
                </div>
              </div>

              {/* Metrics Achieved */}
              <div className="space-y-3 p-5 rounded-xl bg-surface border border-line">
                <div className="font-mono text-xs text-ink-subtle font-bold uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-ink" />
                  Key Verified Metrics &amp; Proof Points
                </div>
                <div className="space-y-2">
                  {item.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs md:text-sm text-ink-muted"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-ink shrink-0 mt-0.5" />
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags & Tech Stack */}
              <div className="space-y-2">
                <div className="font-mono text-xs text-ink-subtle uppercase tracking-wider flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-brand-ink" />
                  Technologies &amp; Competencies:
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-surface-2 border border-line text-ink-muted text-xs font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* External URL action if available */}
              {externalUrl && (
                <div className="pt-4 border-t border-line flex justify-end">
                  <a
                    href={externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-on-brand font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-brand/20 inline-flex items-center gap-2"
                  >
                    Visit Live Web Platform
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
