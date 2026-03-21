import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/ui/navigation";
import { AIWrapper } from "@/components/ai-assistant/ai-wrapper";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Rakshit Sisodiya | Full Stack Developer & AI Engineer",
  description:
    "Full Stack Developer & AI Engineer building distributed systems, AI pipelines, and high-performance backends. Go, Python, TypeScript. LeetCode Top 6.5%, CodeChef 5★.",
  keywords: [
    "Rakshit Sisodiya", "Full Stack Developer", "AI Engineer", "Systems Architect",
    "NIT Hamirpur", "Go", "Python", "TypeScript", "Next.js", "Distributed Systems",
    "LangChain", "AWS", "Kubernetes", "DeepSpeed", "Open Source",
  ],
  authors: [{ name: "Rakshit Sisodiya" }],
  openGraph: {
    title: "Rakshit Sisodiya | Full Stack Developer & AI Engineer",
    description: "Building distributed systems, AI pipelines, and high-performance backends.",
    url: "https://rakshitsisodiya.xyz",
    siteName: "Rakshit Sisodiya",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@rakshit_sisodia",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <AIWrapper />
      </body>
    </html>
  );
}
