"use client";

import React, { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar as CalendarIcon,
  CheckCircle2,
  Search,
  Zap,
} from "lucide-react";
import { LAUNCH_OFFER } from "@/data/launchOffer";

const endsAt = new Date(LAUNCH_OFFER.endsAt).getTime();

const msLeft = () => Math.max(0, endsAt - Date.now());

/*
 * Cached outside the snapshot getter on purpose: getSnapshot must return the
 * same value every time React calls it within a render, and a bare Date.now()
 * would tick mid-render and trip React's "snapshot should be cached" loop
 * guard. The value only moves when the interval fires.
 */
let cachedMs = msLeft();

const subscribe = (onStoreChange: () => void) => {
  const id = window.setInterval(() => {
    cachedMs = msLeft();
    onStoreChange();
  }, 1000);
  return () => window.clearInterval(id);
};

const getSnapshot = () => cachedMs;

/*
 * null on the server. The page is statically prerendered, so a number baked in
 * at build time would be stale by the time anyone reads it — better to render
 * the fixed end date in the HTML and let the live clock appear on hydration.
 */
const getServerSnapshot = (): number | null => null;

/** Milliseconds left in the promotion; null until hydrated, 0 once it ended. */
export function useLaunchOfferMsLeft(): number | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function splitDuration(ms: number) {
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

interface LaunchOfferProps {
  /** Google Calendar appointment schedule, shared with the booking section. */
  calendarUrl: string;
}

export default function LaunchOffer({ calendarUrl }: LaunchOfferProps) {
  const msLeftValue = useLaunchOfferMsLeft();

  // Pull the whole block once the deadline passes, so a stale deploy never
  // keeps advertising an expired price.
  if (msLeftValue === 0) return null;

  const t = msLeftValue === null ? null : splitDuration(msLeftValue);

  return (
    <div className="relative rounded-3xl border border-brand/40 bg-gradient-to-br from-surface-2 via-surface to-surface-deep p-5 sm:p-7 md:p-12 overflow-hidden shadow-2xl">
      {/* Ambient brand glow */}
      <div className="absolute -top-24 -right-16 w-[380px] h-[380px] bg-brand/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative space-y-8">
        {/* Deadline strip */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand text-on-brand text-[11px] font-mono font-bold uppercase tracking-wider">
            Launch price — until {LAUNCH_OFFER.endsOnLabel}
          </span>
          {t && (
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand/30 bg-brand/10 text-brand-ink text-[11px] font-mono font-semibold uppercase tracking-wider"
              aria-label={`${t.days} days, ${t.hours} hours, ${t.minutes} minutes and ${t.seconds} seconds remaining`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              <span aria-hidden="true" className="tabular-nums">
                {t.days}d {String(t.hours).padStart(2, "0")}h{" "}
                {String(t.minutes).padStart(2, "0")}m{" "}
                {String(t.seconds).padStart(2, "0")}s left
              </span>
            </span>
          )}
        </div>

        {/* Hook */}
        <div className="space-y-4 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-[1.1]">
            If they can’t find you,{" "}
            <span className="text-brand-ink">they’ll find someone else.</span>
          </h2>
          <p className="text-ink-muted text-sm md:text-base leading-relaxed">
            Your customers are searching online right now. Let them find a real
            business.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Search-result mock. Fixed light colours on purpose — it stands in
              for a search engine's UI, not the site's own chrome. */}
          <div className="rounded-2xl bg-white border border-line p-3 sm:p-4 md:p-5 space-y-3 shadow-xl">
            <div className="flex items-center gap-2.5 rounded-full bg-zinc-100 px-4 py-2.5">
              <Search className="w-4 h-4 text-zinc-500 shrink-0" />
              <span className="text-sm text-zinc-700 truncate">
                plumbers near me
              </span>
            </div>

            {[
              { name: "Rapid Plumbing Co.", swatch: "bg-zinc-300" },
              { name: "Central Pipe & Drain", swatch: "bg-stone-300" },
            ].map((result) => (
              <div key={result.name} className="flex items-start gap-3 px-1">
                <div className={`w-8 h-8 rounded-lg shrink-0 ${result.swatch}`} />
                <div className="min-w-0 flex-1 space-y-1.5 pt-0.5">
                  <div className="text-sm font-bold text-zinc-900">
                    {result.name}
                  </div>
                  <div className="h-1.5 rounded bg-zinc-200 w-4/5" />
                  <div className="h-1.5 rounded bg-zinc-200 w-3/5" />
                </div>
              </div>
            ))}

            <div className="flex items-center gap-3 pt-1">
              <div className="flex-1 h-12 rounded-lg border-2 border-dashed border-brand/70" />
              <div className="font-mono text-[10px] leading-tight text-brand-ink font-bold uppercase shrink-0">
                Your business
                <br />
                {"// not found"}
              </div>
            </div>
          </div>

          {/* What's included + price */}
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {LAUNCH_OFFER.deliverables.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-brand-ink shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-muted">{item}</span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-brand/40 bg-surface-deep p-4 sm:p-5 md:p-6 space-y-4">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-ink tracking-tight">
                      {LAUNCH_OFFER.priceLocal}
                    </span>
                    <span className="text-lg md:text-xl font-bold text-ink-subtle">
                      / {LAUNCH_OFFER.priceUsd}
                    </span>
                  </div>
                  <div className="text-xs text-ink-subtle mt-1">
                    {LAUNCH_OFFER.priceNote}
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-brand/40 bg-brand/10 text-brand-ink text-[11px] font-mono font-bold uppercase tracking-wider shrink-0">
                  <Zap className="w-3.5 h-3.5" />
                  {LAUNCH_OFFER.turnaround}
                </span>
              </div>

              <div className="pt-1">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-5 py-4 rounded-xl bg-brand hover:bg-brand-hover text-on-brand font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-brand/25 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <CalendarIcon className="w-4 h-4" />
                  Book a Consultation
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>

              <p className="text-[11px] font-mono text-ink-faint text-center">
                Free mockup of your site — no cost, no commitment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
