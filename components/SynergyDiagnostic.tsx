"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  RotateCcw,
  Building2,
  Rocket,
  Database,
  Code,
  Target,
  Workflow,
  Calendar,
  Sparkles,
  ShieldCheck,
  Cpu,
} from "lucide-react";

export type OrganizationStage =
  | "Established Brand / Corporate"
  | "Early-Stage Startup";

export type OperationalChallenge =
  | "Manual Data Bottlenecks"
  | "Need Custom Web Platform"
  | "Marketing Strategy & Execution Rules"
  | "Complex Event/Project Logistics";

export interface DiagnosticRecommendation {
  stage: OrganizationStage;
  challenge: OperationalChallenge;
  recommendedScope: string;
  dedicatedTeam: string;
  velocity: string;
  impactFocus: string;
  executiveSummary: string;
  keyDeliverables: string[];
}

export interface SynergyDiagnosticProps {
  /**
   * Custom calendar booking URL for Madam T strategy call.
   * Defaults to 'https://cal.com/madam-t'
   */
  calendarUrl?: string;
  /**
   * Optional custom click handler for booking call.
   */
  onBookCall?: () => void;
  /**
   * Additional wrapper class names.
   */
  className?: string;
}

const STAGE_OPTIONS: {
  id: OrganizationStage;
  title: string;
  description: string;
  icon: typeof Building2;
}[] = [
  {
    id: "Established Brand / Corporate",
    title: "Established Brand / Corporate",
    description:
      "Operationalized enterprise entity focused on scaling efficiency, multi-market governance, and automated workflow infrastructure.",
    icon: Building2,
  },
  {
    id: "Early-Stage Startup",
    title: "Early-Stage Startup",
    description:
      "Agile venture seeking rapid market validation, investor-ready web architecture, and lean go-to-market execution rules.",
    icon: Rocket,
  },
];

const CHALLENGE_OPTIONS: {
  id: OperationalChallenge;
  title: string;
  description: string;
  icon: typeof Database;
}[] = [
  {
    id: "Manual Data Bottlenecks",
    title: "Manual Data Bottlenecks",
    description:
      "Heavy reliance on manual data entry, field capture friction, or disconnected spreadsheet record-keeping.",
    icon: Database,
  },
  {
    id: "Need Custom Web Platform",
    title: "Need Custom Web Platform",
    description:
      "Requires a modern, high-performance web app, institutional corporate hub, or client-facing digital portal.",
    icon: Code,
  },
  {
    id: "Marketing Strategy & Execution Rules",
    title: "Marketing Strategy & Execution Rules",
    description:
      "Fragmented brand positioning, lack of structured growth playbooks, or inconsistent marketing execution rules.",
    icon: Target,
  },
  {
    id: "Complex Event/Project Logistics",
    title: "Complex Event/Project Logistics",
    description:
      "Cross-border program delivery, multi-stakeholder township events, or high-stakes field operational coordination.",
    icon: Workflow,
  },
];

export function calculateRecommendation(
  stage: OrganizationStage,
  challenge: OperationalChallenge
): DiagnosticRecommendation {
  if (stage === "Established Brand / Corporate") {
    switch (challenge) {
      case "Manual Data Bottlenecks":
        return {
          stage,
          challenge,
          recommendedScope:
            "Google Workspace Apps Script Pipeline + Automated Gemini OCR Data Engine",
          dedicatedTeam:
            "Madam T (Lead Operations Architect) + Senior Automation & Data Unit",
          velocity: "2 – 3 Weeks Production Deployment",
          impactFocus:
            "65%+ reduction in manual entry overhead, automated field sheet OCR, zero-data-loss audit trails.",
          executiveSummary:
            "Enterprise operations require automated, zero-friction data pipelines that seamlessly bridge field entry with central Google Sheets infrastructure.",
          keyDeliverables: [
            "Custom Google Apps Script trigger engine",
            "Gemini API document OCR integration",
            "Real-time validation dashboard & audit logging",
          ],
        };
      case "Need Custom Web Platform":
        return {
          stage,
          challenge,
          recommendedScope:
            "Next.js Enterprise Portal & Dynamic Infrastructure Architecture",
          dedicatedTeam:
            "Madam T (Platform Director) + Full-Stack Web Engineering Unit",
          velocity: "4 – 6 Weeks Architecture & Rollout",
          impactFocus:
            "Institutional-grade dark-mode UX, multi-region CDN speed, SSR SEO compliance, high-trust corporate portal.",
          executiveSummary:
            "A corporate website must reflect strategic authority. We engineer high-speed Next.js platforms optimized for investor trust and partner conversions.",
          keyDeliverables: [
            "Server-Side Rendered (SSR) Next.js Architecture",
            "Custom Tailwind CSS brand design system",
            "Institutional security & SEO optimization",
          ],
        };
      case "Marketing Strategy & Execution Rules":
        return {
          stage,
          challenge,
          recommendedScope:
            "Strategic Brand Ecosystem Framework & Multi-Channel Execution Rules Engine",
          dedicatedTeam:
            "Madam T (Principal Brand Strategist) + Ecosystem Growth Unit",
          velocity: "3 – 4 Weeks Advisory & Playbook Rollout",
          impactFocus:
            "Cohesive multi-market brand governance, structured campaign execution guidelines, conversion rate optimization.",
          executiveSummary:
            "Corporate expansion demands strict brand governance protocols and predictable marketing execution rules across all market touchpoints.",
          keyDeliverables: [
            "Brand identity & messaging governance manual",
            "Multi-channel campaign execution rules",
            "Performance analytics & attribution matrix",
          ],
        };
      case "Complex Event/Project Logistics":
        return {
          stage,
          challenge,
          recommendedScope:
            "PM Oversight & Cross-Border Event Operations Protocol",
          dedicatedTeam:
            "Madam T (Executive PM) + Field Logistics & Operations Squad",
          velocity: "Full Campaign Lifecycle Management",
          impactFocus:
            "Multi-stakeholder coordination, zero-delay rotation tracking, institutional risk mitigation, cross-border execution.",
          executiveSummary:
            "High-stakes events demand military-grade project management. We implement structured rotation schedules and contingency protocols.",
          keyDeliverables: [
            "Master operational timeline & risk register",
            "Real-time volunteer & station rotation tracking",
            "Cross-border stakeholder management protocol",
          ],
        };
    }
  } else {
    // Early-Stage Startup
    switch (challenge) {
      case "Manual Data Bottlenecks":
        return {
          stage,
          challenge,
          recommendedScope:
            "Lightweight Cloud Scripting & Webhook Automation System",
          dedicatedTeam: "Madam T (Strategic Lead) + Operations Engineer",
          velocity: "1 – 2 Weeks Rapid Sprint",
          impactFocus:
            "Automated lead routing, digitized field intake, fast scaling without hiring excess operational staff.",
          executiveSummary:
            "Startups cannot waste founder hours on manual data sorting. We deploy lean scripts to automate intake and notification pipelines immediately.",
          keyDeliverables: [
            "Automated form-to-sheet data pipelines",
            "Instant webhook notification alerts",
            "Standardized CRM ingestion schema",
          ],
        };
      case "Need Custom Web Platform":
        return {
          stage,
          challenge,
          recommendedScope:
            "Next.js Launchpad & Investor-Ready Web Application",
          dedicatedTeam:
            "Madam T (Brand & Product Strategist) + Agile Web Engineer",
          velocity: "2 – 3 Weeks Rapid Launch",
          impactFocus:
            "High-impact dark-mode design, conversion-focused landing flow, pitch-deck integration, mobile optimization.",
          executiveSummary:
            "Early-stage startups need to instantly command credibility. We craft bespoke, high-velocity Next.js web applications built to convert users and investors.",
          keyDeliverables: [
            "Dark-mode first responsive web application",
            "Interactive feature & value showcase",
            "Lead capture & strategy inquiry funnels",
          ],
        };
      case "Marketing Strategy & Execution Rules":
        return {
          stage,
          challenge,
          recommendedScope:
            "Go-To-Market Brand Incubator & Agile Marketing Playbook",
          dedicatedTeam:
            "Madam T (Growth & Brand Architect) + Content Operations Specialist",
          velocity: "2 Weeks Strategy Sprint",
          impactFocus:
            "Sharpened value proposition, high-converting digital messaging, founder brand alignment, fast execution loops.",
          executiveSummary:
            "Startup marketing must be lean and hyper-targeted. We build execution rules that align founder vision directly with customer conversion metrics.",
          keyDeliverables: [
            "Core positioning & value proposition deck",
            "Agile 90-day GTM content & campaign playbook",
            "Conversion funnel optimization checklist",
          ],
        };
      case "Complex Event/Project Logistics":
        return {
          stage,
          challenge,
          recommendedScope:
            "Lean Event Operations Framework & Digital Tracking Workflows",
          dedicatedTeam: "Madam T (Ops Lead) + Project Coordinator",
          velocity: "Pre-Event Sprint to Execution",
          impactFocus:
            "Streamlined attendee management, operational checklists, cost-effective resource deployment, flawless attendee experience.",
          executiveSummary:
            "Executing startup events requires lean coordination tools and clear accountability structures to deliver world-class engagement.",
          keyDeliverables: [
            "Event logistics execution blueprint",
            "Attendee intake & check-in automation",
            "Day-of-event operational checklist & schedule",
          ],
        };
    }
  }
}

export default function SynergyDiagnostic({
  calendarUrl = "https://cal.com/madam-t",
  onBookCall,
  className = "",
}: SynergyDiagnosticProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedStage, setSelectedStage] = useState<OrganizationStage | null>(
    null
  );
  const [selectedChallenge, setSelectedChallenge] =
    useState<OperationalChallenge | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  // An event handler's return value is discarded by React, so the previous
  // `return () => clearTimeout(timer)` never ran. Track it on a ref instead.
  const calcTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (calcTimerRef.current) clearTimeout(calcTimerRef.current);
    };
  }, []);

  const handleStageSelect = (stage: OrganizationStage) => {
    setSelectedStage(stage);
    setStep(2);
  };

  const handleChallengeSelect = (challenge: OperationalChallenge) => {
    setSelectedChallenge(challenge);
    setIsCalculating(true);
    setStep(3);

    // Simulate calculation animation effect
    if (calcTimerRef.current) clearTimeout(calcTimerRef.current);
    calcTimerRef.current = setTimeout(() => {
      setIsCalculating(false);
      calcTimerRef.current = null;
    }, 900);
  };

  const handleReset = () => {
    if (calcTimerRef.current) {
      clearTimeout(calcTimerRef.current);
      calcTimerRef.current = null;
    }
    setStep(1);
    setSelectedStage(null);
    setSelectedChallenge(null);
    setIsCalculating(false);
  };

  const handleBooking = () => {
    if (onBookCall) {
      onBookCall();
    } else {
      window.open(calendarUrl, "_blank", "noopener,noreferrer");
    }
  };

  const currentRecommendation =
    selectedStage && selectedChallenge
      ? calculateRecommendation(selectedStage, selectedChallenge)
      : null;

  return (
    <div
      className={`w-full max-w-4xl mx-auto rounded-2xl bg-surface-deep border border-line shadow-2xl overflow-hidden font-sans text-ink selection:bg-brand selection:text-on-brand ${className}`}
    >
      {/* Dark Terminal Top Bar */}
      <div className="bg-surface px-4 py-3 border-b border-line flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-brand opacity-90 shadow-sm shadow-brand/50" />
          <div className="w-3 h-3 rounded-full bg-warn opacity-80" />
          <div className="w-3 h-3 rounded-full bg-success opacity-80" />
          <span className="ml-2 font-mono text-xs text-ink-subtle font-semibold tracking-wider flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-brand-ink" />
            MADAM_T // SYNERGY_DIAGNOSTIC_v1.0.4
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-widest text-brand-ink bg-brand/10 px-2 py-0.5 rounded border border-brand/20">
            Active Diagnostic Terminal
          </span>
          <div className="text-xs font-mono text-ink-faint">
            STEP {step}/3
          </div>
        </div>
      </div>

      {/* Progress Indicator Bar */}
      <div className="w-full bg-surface-2 h-1 relative overflow-hidden">
        <motion.div
          className="h-full bg-brand"
          initial={{ width: "33%" }}
          animate={{
            width: step === 1 ? "33%" : step === 2 ? "66%" : "100%",
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>

      {/* Main Terminal Screen Content */}
      <div className="p-6 md:p-10 relative bg-gradient-to-b from-surface-deep to-canvas">
        {/* Ambient Subtle Glow */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-brand/5 rounded-full blur-3xl pointer-events-none" />

        <AnimatePresence mode="wait">
          {/* STEP 1: Select Organization Stage */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <div className="font-mono text-xs text-brand-ink uppercase tracking-widest flex items-center gap-2">
                  <span>&gt; INITIATING_DIAGNOSTIC</span>
                  <span className="w-1.5 h-3 bg-brand animate-pulse inline-block" />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
                  Step 1: Select Organization Stage
                </h2>
                <p className="text-sm text-ink-subtle max-w-xl">
                  Choose the structural operating stage of your enterprise to
                  calibrate our diagnostic matrix.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 pt-2">
                {STAGE_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = selectedStage === opt.id;
                  return (
                    <motion.button
                      key={opt.id}
                      type="button"
                      whileHover={{ scale: 1.015, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleStageSelect(opt.id)}
                      className={`text-left p-6 rounded-xl border transition-all duration-200 group flex flex-col justify-between cursor-pointer relative overflow-hidden ${
                        isSelected
                          ? "bg-surface-2 border-brand shadow-lg shadow-brand/10"
                          : "bg-surface border-line hover:border-brand/60 hover:bg-surface-hover"
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-lg bg-surface-2 border border-line flex items-center justify-center text-brand-ink group-hover:border-brand/50 transition-colors">
                            <Icon className="w-5 h-5" />
                          </div>
                          <ChevronLeft className="w-5 h-5 text-ink-faint rotate-180 group-hover:text-brand-ink group-hover:translate-x-1 transition-all" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-ink group-hover:text-brand-ink transition-colors mb-2">
                            {opt.title}
                          </h3>
                          <p className="text-xs text-ink-subtle leading-relaxed">
                            {opt.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-line/80 flex items-center justify-between text-xs font-mono text-ink-faint">
                        <span>OPTION_0{STAGE_OPTIONS.indexOf(opt) + 1}</span>
                        <span className="text-brand-ink font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          SELECT &rarr;
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Select Operational Challenge */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-subtle hover:text-brand-ink transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> &lt; BACK TO STAGE
                </button>
                <span className="font-mono text-xs text-ink-faint">
                  STAGE:{" "}
                  <span className="text-brand-ink font-semibold">
                    {selectedStage}
                  </span>
                </span>
              </div>

              <div className="space-y-2">
                <div className="font-mono text-xs text-brand-ink uppercase tracking-widest flex items-center gap-2">
                  <span>&gt; IDENTIFY_BOTTLENECK</span>
                  <span className="w-1.5 h-3 bg-brand animate-pulse inline-block" />
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
                  Step 2: Select Core Operational Challenge
                </h2>
                <p className="text-sm text-ink-subtle max-w-xl">
                  Identify your primary bottleneck or growth priority to target
                  Madam T’s strategic response.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                {CHALLENGE_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = selectedChallenge === opt.id;
                  return (
                    <motion.button
                      key={opt.id}
                      type="button"
                      whileHover={{ scale: 1.015, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleChallengeSelect(opt.id)}
                      className={`text-left p-5 rounded-xl border transition-all duration-200 group flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? "bg-surface-2 border-brand shadow-lg shadow-brand/10"
                          : "bg-surface border-line hover:border-brand/60 hover:bg-surface-hover"
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="w-9 h-9 rounded-lg bg-surface-2 border border-line flex items-center justify-center text-brand-ink group-hover:border-brand/50 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-ink group-hover:text-brand-ink transition-colors mb-1.5">
                            {opt.title}
                          </h3>
                          <p className="text-xs text-ink-subtle leading-relaxed">
                            {opt.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-line/80 flex items-center justify-between text-[11px] font-mono text-ink-faint">
                        <span>TARGET_0{CHALLENGE_OPTIONS.indexOf(opt) + 1}</span>
                        <span className="text-brand-ink font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                          RUN MATRIX &rarr;
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 3: Result Engine */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {isCalculating ? (
                /* Calculating Terminal Animation State */
                <div className="py-16 text-center space-y-4">
                  <div className="inline-flex p-4 rounded-2xl bg-surface border border-line text-brand-ink animate-spin">
                    <Cpu className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <div className="font-mono text-sm text-brand-ink font-semibold animate-pulse">
                      [ COMPILING DIAGNOSTIC MATRIX ... ]
                    </div>
                    <p className="font-mono text-xs text-ink-faint">
                      Cross-referencing stage: &quot;{selectedStage}&quot; with operational target: &quot;{selectedChallenge}&quot;
                    </p>
                  </div>
                </div>
              ) : currentRecommendation ? (
                /* Output Diagnostic Recommendation */
                <div className="space-y-6">
                  {/* Result Header Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-line">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-brand animate-ping" />
                      <span className="font-mono text-xs font-bold text-brand-ink uppercase tracking-widest">
                        DIAGNOSTIC RECOMMENDATION &bull; MADAM T
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-subtle hover:text-brand-ink transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> RESET DIAGNOSTIC
                    </button>
                  </div>

                  {/* Executive Summary Card */}
                  <div className="p-6 rounded-xl bg-surface border border-line space-y-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-brand" />

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand/10 border border-brand/20 text-brand-ink text-[11px] font-mono font-semibold uppercase tracking-wider mb-2">
                          <Sparkles className="w-3 h-3" /> Customized Blueprint
                        </div>
                        <h3 className="text-xl md:text-2xl font-extrabold text-ink">
                          {currentRecommendation.recommendedScope}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm text-ink-muted leading-relaxed italic">
                      &ldquo;{currentRecommendation.executiveSummary}&rdquo;
                    </p>

                    {/* Matrix Metrics Details */}
                    <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-line">
                      <div className="p-3.5 rounded-lg bg-surface-2 border border-line space-y-1">
                        <div className="text-[11px] font-mono uppercase text-ink-subtle font-medium">
                          Recommended Scope
                        </div>
                        <div className="text-sm font-semibold text-ink">
                          {currentRecommendation.recommendedScope}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-lg bg-surface-2 border border-line space-y-1">
                        <div className="text-[11px] font-mono uppercase text-ink-subtle font-medium">
                          Dedicated Team Allocation
                        </div>
                        <div className="text-sm font-semibold text-brand-ink">
                          {currentRecommendation.dedicatedTeam}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-lg bg-surface-2 border border-line space-y-1">
                        <div className="text-[11px] font-mono uppercase text-ink-subtle font-medium">
                          Estimated Velocity
                        </div>
                        <div className="text-sm font-semibold text-ink">
                          {currentRecommendation.velocity}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-lg bg-surface-2 border border-line space-y-1">
                        <div className="text-[11px] font-mono uppercase text-ink-subtle font-medium">
                          Impact & Value Focus
                        </div>
                        <div className="text-xs text-ink-muted leading-normal">
                          {currentRecommendation.impactFocus}
                        </div>
                      </div>
                    </div>

                    {/* Key Deliverables Bullet Points */}
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-mono text-ink-subtle uppercase tracking-wider font-semibold">
                        Core System Deliverables:
                      </div>
                      <div className="grid sm:grid-cols-3 gap-2">
                        {currentRecommendation.keyDeliverables.map(
                          (item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-xs text-ink-muted bg-surface-deep px-3 py-2 rounded border border-line"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand-ink shrink-0" />
                              <span className="truncate">{item}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Prominent CTA Section */}
                  <div className="p-6 rounded-xl bg-gradient-to-r from-surface-2 via-surface to-surface-2 border border-brand/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-brand/5">
                    <div className="space-y-1 text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-mono font-bold text-brand-ink uppercase tracking-wider">
                        <ShieldCheck className="w-4 h-4" /> Next Step &bull; Executive Strategy
                      </div>
                      <h4 className="text-lg font-bold text-ink">
                        Ready to Execute This Architecture?
                      </h4>
                      <p className="text-xs text-ink-subtle max-w-md">
                        Review this diagnostic with Madam T to lock in your custom sprint timeline and dedicated team allocation.
                      </p>
                    </div>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleBooking}
                      className="w-full sm:w-auto px-6 py-4 rounded-xl bg-brand hover:bg-brand-hover text-on-brand font-bold text-sm tracking-wide transition-all shadow-lg shadow-brand/25 flex items-center justify-center gap-2.5 shrink-0 cursor-pointer group"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Strategy Call with Madam T</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </div>
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Terminal Footer Info */}
      <div className="px-6 py-3 bg-surface-deep border-t border-line flex items-center justify-between text-[11px] font-mono text-ink-faint">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand" />
          <span>STATUS: READY</span>
        </div>
        <div>MADAM T HOLDINGS &bull; ACCENT #d85d5d</div>
      </div>
    </div>
  );
}
