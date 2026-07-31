import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Madam T Holdings | Strategic Ventures & Portfolio Management",
  description:
    "Official digital portal for Madam T Holdings (madamholdings.com). Spearheading high-growth investments, brand creation, and strategic enterprise management.",
  keywords: [
    "Madam T Holdings",
    "madamholdings.com",
    "Venture Capital",
    "Strategic Holdings",
    "Portfolio Management",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark scroll-smooth`}>
      <body className="bg-brand-black text-brand-white font-sans antialiased selection:bg-brand-red selection:text-brand-white min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
