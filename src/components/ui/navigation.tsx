"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    setIsMac(navigator.platform?.toLowerCase().includes("mac") || navigator.userAgent?.toLowerCase().includes("mac"));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-[#0a0a0b]/80 backdrop-blur-xl border-b border-[#222]" : "bg-transparent"
        )}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-mono text-sm text-[var(--color-accent)] hover:opacity-80 transition-opacity">
            rakshit.sys
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm transition-colors rounded-lg",
                    active
                      ? "text-white bg-[var(--color-bg-card)] border border-[var(--color-border)]"
                      : "text-[var(--color-text-dim)] hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="ml-3 pl-3 border-l border-[var(--color-border)]">
              <kbd className="text-xs font-mono text-[var(--color-text-dimmer)] px-2 py-1 rounded border border-[var(--color-border)] bg-[var(--color-bg-card)]">
                {isMac ? "⌘" : "Ctrl+"}K
              </kbd>
              <span className="text-xs text-[var(--color-text-dimmer)] ml-2">Ask AI</span>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[var(--color-text-dim)]"
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileOpen ? (
                <path d="M4 4l12 12M16 4L4 16" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-x-0 top-16 z-40 bg-[#0a0a0b]/95 backdrop-blur-xl border-b border-[var(--color-border)] md:hidden">
          <div className="px-6 py-4 flex flex-col gap-2">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm transition-colors",
                    active
                      ? "bg-[var(--color-bg-card)] text-white border border-[var(--color-border)]"
                      : "text-[var(--color-text-dim)] hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
