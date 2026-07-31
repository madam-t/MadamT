"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ExternalLink, ShieldCheck, Tag, Building } from "lucide-react";
import { PortfolioItem } from "@/data/portfolioData";

interface PortfolioModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

export default function PortfolioModal({ item, onClose }: PortfolioModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  const isExternalLinkAvailable =
    item.id === "ivoire-africa" || item.id === "eshham-investment-group";
  const externalUrl =
    item.id === "ivoire-africa"
      ? "https://ivoireafrica.com"
      : item.id === "eshham-investment-group"
      ? "https://eshham.com"
      : null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl rounded-2xl bg-[#0a0a0a] border border-[#262626] shadow-2xl overflow-hidden text-neutral-100 z-10 my-auto"
        >
          {/* Top Header Bar */}
          <div className="bg-[#111111] px-6 py-4 border-b border-[#262626] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d85d5d]" />
              <span className="font-mono text-xs text-[#d85d5d] font-bold uppercase tracking-wider">
                CASE STUDY DETAIL // {item.category}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-[#18181b] border border-[#262626] hover:border-[#d85d5d] hover:text-[#d85d5d] text-neutral-400 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Content Body */}
          <div className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Title & Client Badge */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d85d5d]/10 border border-[#d85d5d]/30 text-[#d85d5d] text-xs font-mono font-semibold">
                  <Building className="w-3.5 h-3.5" />
                  Client: {item.client}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#18181b] border border-[#262626] text-neutral-400 text-xs font-mono">
                  {item.category}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {item.title}
              </h2>
            </div>

            {/* Problem & Solution Detailed Breakdown */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-[#111111] border border-[#262626] space-y-2">
                <div className="font-mono text-xs text-[#d85d5d] font-bold uppercase tracking-wider">
                  The Operational Problem
                </div>
                <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
                  {item.problem}
                </p>
              </div>

              <div className="p-5 rounded-xl bg-[#111111] border border-[#262626] space-y-2">
                <div className="font-mono text-xs text-[#22c55e] font-bold uppercase tracking-wider">
                  The Implemented Solution
                </div>
                <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
                  {item.solution}
                </p>
              </div>
            </div>

            {/* Metrics Achieved */}
            <div className="space-y-3 p-5 rounded-xl bg-[#111111] border border-[#262626]">
              <div className="font-mono text-xs text-neutral-400 font-bold uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#d85d5d]" />
                Key Verified Metrics & Proof Points
              </div>
              <div className="space-y-2">
                {item.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 text-xs md:text-sm text-neutral-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#d85d5d] shrink-0 mt-0.5" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags & Tech Stack */}
            <div className="space-y-2">
              <div className="font-mono text-xs text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#d85d5d]" />
                Technologies & Competencies:
              </div>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg bg-[#18181b] border border-[#262626] text-neutral-300 text-xs font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* External URL action if available */}
            {isExternalLinkAvailable && externalUrl && (
              <div className="pt-4 border-t border-[#262626] flex justify-end">
                <a
                  href={externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#d85d5d] hover:bg-[#c44e4e] text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-[#d85d5d]/20 inline-flex items-center gap-2"
                >
                  Visit Live Web Platform
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
