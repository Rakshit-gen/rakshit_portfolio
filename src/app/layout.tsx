import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/ui/navigation";
import { AIWrapper } from "@/components/ai-assistant/ai-wrapper";
import { PageTransition } from "@/components/ui/page-transition";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Rakshit Sisodiya | Backend Engineer",
    template: "%s | Rakshit Sisodiya",
  },
  description:
    "Backend Engineer building distributed systems, AI pipelines, and high-performance backends. Go, Python, TypeScript. LeetCode Top 6.5%, CodeChef 5★.",
  keywords: [
    "Rakshit Sisodiya", "Full Stack Developer", "AI Engineer", "Systems Architect",
    "NIT Hamirpur", "Go", "Python", "TypeScript", "Next.js", "Distributed Systems",
    "LangChain", "AWS", "Kubernetes", "DeepSpeed", "Open Source",
  ],
  authors: [{ name: "Rakshit Sisodiya" }],
  creator: "Rakshit Sisodiya",
  metadataBase: new URL("https://rakshitsisodiya.xyz"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Rakshit Sisodiya | Backend Engineer",
    description: "Building distributed systems, AI pipelines, and high-performance backends.",
    url: "https://rakshitsisodiya.xyz",
    siteName: "Rakshit Sisodiya",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rakshit Sisodiya — Backend Engineer",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@rakshit_sisodia",
    title: "Rakshit Sisodiya | Backend Engineer",
    description: "Building distributed systems, AI pipelines, and high-performance backends.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <Navigation />
        <main className="min-h-screen"><PageTransition>{children}</PageTransition></main>
        <AIWrapper />
      </body>
    </html>
  );
}
