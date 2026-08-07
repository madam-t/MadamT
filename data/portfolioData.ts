export type PortfolioCategory =
  | "Automation & Ops"
  | "Web Engineering"
  | "Project Management";

export interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: PortfolioCategory;
  summary: string;
  problem: string;
  solution: string;
  metrics: string[];
  tags: string[];
  imagePlaceholder: string;
}

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: "medic-rush-2026",
    title: "Data Collection & Automation Lead",
    client: "Round Table Hochland 154",
    category: "Automation & Ops",
    summary:
      "Automated off-grid medical patient record digitization using Google Apps Script and Gemini API OCR for field medical teams.",
    problem:
      "3+ volunteers spent days manually keying patient data off-grid, creating triage bottlenecks.",
    solution:
      "Built an offline tablet photo-capture workflow running Google Apps Script + Gemini API OCR to auto-extract demographic data into Google Sheets during hotspot syncs.",
    metrics: [
      "66%+ reduction in field labor (3 staff down to 1)",
      "750+ patient records digitized with zero loss",
      "Eliminated data entry backlogs",
    ],
    tags: [
      "Google Apps Script",
      "Gemini API OCR",
      "Automation",
      "Offline-First",
      "Google Sheets",
    ],
    imagePlaceholder: "medic-rush-automation",
  },
  {
    id: "allan-gray-orbis",
    title: "Cross-Border Program Delivery",
    client: "Allan Gray Orbis Foundation",
    category: "Project Management",
    summary:
      "Scaled the Allan Gray Entrepreneurship Challenge (AGEC) across Southern Africa through cross-border project management.",
    problem:
      "Complex multi-country coordination required to scale entrepreneurial challenges in southern Africa.",
    solution:
      "End-to-end management of the Allan Gray Entrepreneurship Challenge (AGEC) across Namibia, Eswatini, and Botswana with digital tracking workflows.",
    metrics: [
      "Scaled entrepreneurial education and digital integration across 3 nations over 2 years",
    ],
    tags: [
      "Project Management",
      "Cross-Border Operations",
      "Entrepreneurship",
      "Southern Africa",
    ],
    imagePlaceholder: "allan-gray-cross-border",
  },
  {
    id: "vumba-career-guidance",
    title: "Logistics & Event Operations",
    client: "Vumba Career Guidance Day",
    category: "Project Management",
    summary:
      "Optimized township event logistics and speaker rotation systems for high school career guidance operations.",
    problem:
      "Township high schoolers lacked localized career guidance amidst chaotic event dates and logistical risk.",
    solution:
      "Designed a classroom-station rotation system managing 14 Fellow speakers and streamlined logistics.",
    metrics: [
      "600+ students engaged seamlessly",
      "Zero rotation delays",
      "High student & partner satisfaction",
    ],
    tags: [
      "Event Operations",
      "Logistics",
      "Youth Empowerment",
      "Stakeholder Management",
    ],
    imagePlaceholder: "vumba-event-logistics",
  },
  {
    id: "ivoire-africa",
    title: "Ivoire Africa Corporate Platform (ivoireafrica.com)",
    client: "Ivoire Africa",
    category: "Web Engineering",
    summary:
      "Developed a modern full-stack corporate web presence for established business consulting and cash loan operations.",
    problem:
      "Established business consulting and cash loan firm needed modern web presence.",
    solution:
      "Full-stack responsive web development highlighting financial services and client trust.",
    metrics: [
      "Live web deployment at ivoireafrica.com",
      "Improved credibility for corporate lending",
    ],
    tags: [
      "Full-Stack Web Development",
      "Financial Services",
      "Corporate Web Platform",
      "Responsive Design",
    ],
    imagePlaceholder: "ivoire-africa-platform",
  },
  {
    id: "eshham-investment-group",
    title: "Eshham Investment Group (eshham.com)",
    client: "Eshham Investment Group",
    category: "Web Engineering",
    summary:
      "Engineered a high-performance investment group platform designed for strategic investor positioning.",
    problem: "Startup investment group required dynamic launch platform.",
    solution:
      "High-performance custom web platform designed for investor positioning.",
    metrics: [
      "Successful public digital launch at eshham.com",
      "Enhanced brand positioning",
    ],
    tags: [
      "Web Engineering",
      "Investment Platform",
      "Brand Positioning",
      "Next.js",
    ],
    imagePlaceholder: "eshham-investment-group",
  },
];
