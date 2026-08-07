"use client";

import React, { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

/*
 * The theme's source of truth is the `dark` class on <html>, written before
 * first paint by the bootstrap script in app/layout.tsx. That makes it an
 * external store rather than React state — subscribing to it keeps the two in
 * sync without a setState-in-effect cascade, and picks up changes made from
 * anywhere else on the page.
 */
const subscribe = (onStoreChange: () => void) => {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
};

const getSnapshot = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

// Matches the class the server renders, so hydration lines up.
const getServerSnapshot = (): Theme => "dark";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    root.style.colorScheme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode / storage disabled — the toggle still works for this visit.
    }
  };

  const label = `Switch to ${theme === "dark" ? "light" : "dark"} theme`;

  return (
    <button
      type="button"
      onClick={toggle}
      className={`w-10 h-10 shrink-0 rounded-xl border border-line bg-surface text-ink-subtle hover:border-brand hover:text-brand-ink flex items-center justify-center transition-all cursor-pointer ${className}`}
      aria-label={label}
      title={label}
    >
      {/*
        Which icon shows is decided by CSS, so the control still looks right
        during the pre-hydration window.
      */}
      <Sun className="w-[18px] h-[18px] hidden dark:block" />
      <Moon className="w-[18px] h-[18px] block dark:hidden" />
    </button>
  );
}
