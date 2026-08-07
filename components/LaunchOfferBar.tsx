"use client";

import React, { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { LAUNCH_OFFER } from "@/data/launchOffer";
import { splitDuration, useLaunchOfferMsLeft } from "./LaunchOffer";

interface LaunchOfferBarProps {
  /** Scrolls to the offer section. */
  onView: () => void;
}

/*
 * Sits above the sticky header and scrolls away with the page: a promo strip
 * that pinned itself to the viewport would eat vertical space on phones for
 * the whole visit.
 *
 * Dismissal is per-page-load rather than stored — the offer is short-lived, so
 * a returning visitor seeing it again is the point.
 */
export default function LaunchOfferBar({ onView }: LaunchOfferBarProps) {
  const [dismissed, setDismissed] = useState(false);
  const msLeftValue = useLaunchOfferMsLeft();

  if (dismissed || msLeftValue === 0) return null;

  // The strip stops at minutes — a ticking seconds counter in a fixed banner
  // is more distracting than urgent. The offer section carries the full clock.
  const t = msLeftValue === null ? null : splitDuration(msLeftValue);

  return (
    <div className="relative bg-brand text-on-brand">
      <div className="max-w-7xl mx-auto px-6 py-2.5 pr-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
        <span className="text-xs md:text-sm font-semibold">
          Launch offer — website, domain &amp; business email for{" "}
          {LAUNCH_OFFER.priceLocal} once-off.
        </span>
        <span className="text-[11px] md:text-xs font-mono opacity-90 tabular-nums">
          {t === null
            ? `Until ${LAUNCH_OFFER.endsOnLabel}`
            : `${t.days}d ${String(t.hours).padStart(2, "0")}h ${String(
                t.minutes
              ).padStart(2, "0")}m left`}
        </span>
        <button
          type="button"
          onClick={onView}
          className="inline-flex items-center gap-1 text-xs md:text-sm font-bold underline underline-offset-2 hover:opacity-80 transition-opacity cursor-pointer"
        >
          See the offer
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md flex items-center justify-center hover:bg-black/15 transition-colors cursor-pointer"
        aria-label="Dismiss launch offer banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
