import "./globals.css";
import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import { SmoothScrollProvider } from "@/app/components/ui/SmoothScrollProvider";
import { Nav } from "@/app/components/ui/Nav";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "whyshy 🎀",
  description:
    "whyshy is a creative marketing studio for brands who want strategy with soul. Social, content, influencer partnerships, and brand identity that doesn't feel corporate.",
  keywords: [
    "marketing agency",
    "social media strategy",
    "content creation",
    "influencer marketing",
    "brand identity",
    "creative studio",
  ],
  openGraph: {
    title: "whyshy 🎀 — marketing that feels like you",
    description:
      "Strategy with soul. We make brands impossible to ignore.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "whyshy 🎀 — marketing that feels like you",
    description: "Strategy with soul. We make brands impossible to ignore.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable} ${caveat.variable}`}>
      <body className="bg-cream text-magenta antialiased overflow-x-hidden">
        <SmoothScrollProvider>
          <Nav />
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
