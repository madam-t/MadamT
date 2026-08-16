import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

/** GA4 measurement ID for the madamholdings.com web stream. */
const GA_MEASUREMENT_ID = "G-8QSLDPVR70";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  // Exposed to CSS as --font-inter; globals.css composes it into --font-sans
  // along with the fallback stack. Naming it --font-sans here would make the
  // @theme declaration self-referential (and therefore invalid).
  variable: "--font-inter",
});

const siteUrl = "https://madamholdings.com";
const siteTitle =
  "Madam Holdings | Strategic Ventures & Portfolio Management";
const siteDescription =
  "Official digital portal for Madam Holdings (madamholdings.com). Spearheading high-growth investments, brand creation, and strategic enterprise management.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Madam Holdings",
    "madamholdings.com",
    "Venture Capital",
    "Strategic Holdings",
    "Portfolio Management",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Madam Holdings",
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

/*
 * Runs before first paint so a stored "dark" preference never flashes the
 * light palette first. The server renders without the class (light is the
 * default), and this only adds it when the visitor has explicitly chosen dark.
 *
 * Must stay in step with getServerSnapshot in components/ThemeToggle.tsx,
 * which reports the same default during hydration.
 */
const themeBootstrap = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t="light"}var r=document.documentElement;r.classList.toggle("dark",t==="dark");r.style.colorScheme=t}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className="bg-canvas text-ink font-sans antialiased selection:bg-brand selection:text-on-brand min-h-screen flex flex-col">
        {children}
      </body>
      <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
    </html>
  );
}
