import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Madam Holdings",
  description:
    "Learn how Madam Holdings protects your personal information. We guarantee strict internal data usage dedicated exclusively to delivering strategic advisory and business services.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Madam Holdings",
    description:
      "Learn how Madam Holdings protects your personal information. We guarantee strict internal data usage dedicated exclusively to delivering strategic advisory and business services.",
    url: "https://madamholdings.com/privacy",
    siteName: "Madam Holdings",
    type: "website",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
