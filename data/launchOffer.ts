/**
 * Time-limited launch promotion.
 *
 * To pull the offer down, delete <LaunchOffer /> and <LaunchOfferBar /> from
 * app/page.tsx along with the "offer" nav entry. Until then it hides itself
 * automatically once `endsAt` passes — see useLaunchOfferDaysLeft().
 */
export const LAUNCH_OFFER = {
  /** End of 31 August 2026, Namibian time (CAT, UTC+2). */
  endsAt: "2026-08-31T23:59:59+02:00",
  endsOnLabel: "31 August 2026",

  priceLocal: "N$3,500",
  priceUsd: "US$210",
  priceNote: "once-off — no monthly website fee",
  turnaround: "Live in 7 days",

  deliverables: [
    "Your own domain name",
    "A professional website",
    "Business email on your name",
    "Contact forms that reach you",
  ],

  contactEmail: "info@madamholdings.com",
  mockupSubject: "Free website mockup",
} as const;
