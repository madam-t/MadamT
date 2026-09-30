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
  "Madam Holdings | High-Performance Web Architecture for Growing Brands";
const siteDescription =
  "Web engineering for ambitious startups and SMEs. Enterprise-grade web infrastructure; engineered to convert, built to scale, and delivered without technical friction.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Madam Holdings",
    "madamholdings.com",
    "Web Engineering",
    "Web Architecture",
    "Digital Agency",
    "Next.js Development",
    "Startups",
    "SMEs",
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
 * Dark by default for the sleek high-end agency aesthetic.
 */
const themeBootstrap = `(function(){try{var r=document.documentElement;r.classList.add("dark");r.style.colorScheme="dark"}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} dark scroll-smooth`}
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
