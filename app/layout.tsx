import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
  "Madam T Holdings | Strategic Ventures & Portfolio Management";
const siteDescription =
  "Official digital portal for Madam T Holdings (madamholdings.com). Spearheading high-growth investments, brand creation, and strategic enterprise management.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "Madam T Holdings",
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
    siteName: "Madam T Holdings",
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
 * Runs before first paint so a stored "light" preference never flashes the
 * dark palette first. The server renders class="dark" (the brand default), and
 * this only strips it when the visitor has explicitly chosen light.
 */
const themeBootstrap = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t="dark"}var r=document.documentElement;r.classList.toggle("dark",t==="dark");r.style.colorScheme=t}catch(e){}})();`;

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
    </html>
  );
}
