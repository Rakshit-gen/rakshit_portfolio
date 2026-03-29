"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const bootLines = [
  { prefix: "init", text: "loading rakshit.sys...", delay: 0 },
  { prefix: "edu", text: "NIT Hamirpur → survived 4 years", delay: 400 },
  { prefix: "work", text: "currently breaking things @ HSV Digital", delay: 800 },
  { prefix: "oss", text: "5 PRs merged @ Microsoft DeepSpeed (they let me in somehow)", delay: 1200 },
  { prefix: "gate", text: "GATE 2026 cleared — CS & IT", delay: 1600 },
  { prefix: "ready", text: "system online. probably.", delay: 2000 },
];

const roles = ["Backend Engineer", "Systems Architect", "Open Source Contributor"];

export function Hero() {
  const alreadyBooted = typeof window !== "undefined" && sessionStorage.getItem("booted") === "1";
  const [visibleLines, setVisibleLines] = useState(alreadyBooted ? bootLines.length : 0);
  const [bootDone, setBootDone] = useState(alreadyBooted);
  const [roleIndex, setRoleIndex] = useState(0);

  const advanceBoot = useCallback(() => {
    bootLines.forEach((_, i) => {
      setTimeout(() => {
        setVisibleLines(i + 1);
        if (i === bootLines.length - 1) {
          setTimeout(() => {
            setBootDone(true);
            sessionStorage.setItem("booted", "1");
          }, 600);
        }
      }, bootLines[i].delay);
    });
  }, []);

  useEffect(() => {
    if (alreadyBooted) return;
    const timer = setTimeout(advanceBoot, 300);
    return () => clearTimeout(timer);
  }, [advanceBoot, alreadyBooted]);

  useEffect(() => {
    if (!bootDone) return;
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [bootDone]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 md:pt-0 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(var(--color-accent) 1px, transparent 1px), linear-gradient(90deg, var(--color-accent) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent)] opacity-[0.04] rounded-full blur-[120px]" />

      <div className="relative max-w-3xl w-full">
        {/* Boot sequence */}
        <AnimatePresence mode="wait">
          {!bootDone ? (
            <motion.div
              key="boot"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="font-mono text-sm space-y-2"
            >
              {bootLines.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3"
                >
                  <span className={
                    line.prefix === "ready"
                      ? "text-[var(--color-success)]"
                      : "text-[var(--color-accent)]"
                  }>
                    [{line.prefix}]
                  </span>
                  <span className="text-[var(--color-text-dim)]">{line.text}</span>
                  {i === visibleLines - 1 && !bootDone && (
                    <span className="w-2 h-4 bg-[var(--color-accent)] animate-pulse" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Profile image with 3D orbit rings */}
              <div className="mb-8 relative w-fit hero-image-wrapper">
                {/* Orbital rings */}
                <div className="absolute inset-[-18px] rounded-full border border-[var(--color-accent)]/20 animate-orbit-1" />
                <div className="absolute inset-[-30px] rounded-full border border-[var(--color-accent-warm)]/15 animate-orbit-2" />
                <div className="absolute inset-[-42px] rounded-full border border-[var(--color-accent)]/10 animate-orbit-3" />

                {/* Orbiting dots */}
                <div className="absolute inset-[-18px] animate-orbit-1">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]" />
                </div>
                <div className="absolute inset-[-30px] animate-orbit-2">
                  <div className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-[var(--color-accent-warm)] shadow-[0_0_6px_var(--color-accent-warm)]" />
                </div>

                {/* Glow behind image */}
                <div className="absolute inset-[-4px] rounded-full bg-gradient-to-br from-[var(--color-accent)]/30 via-transparent to-[var(--color-accent-warm)]/30 blur-md" />

                {/* Image */}
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--color-bg)] hero-image-tilt">
                  <Image
                    src="/picofme.png"
                    alt="Rakshit Sisodiya"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Status dot */}
                <div className="absolute bottom-0 right-0 z-10 w-4 h-4 rounded-full bg-[var(--color-success)] border-2 border-[var(--color-bg)] animate-pulse" />
              </div>

              {/* Status badge */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
                <span className="text-xs font-mono text-[var(--color-text-dim)]">
                  Writing code that mostly works @ HSV Digital
                </span>
              </div>

              {/* Name */}
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
                Rakshit
                <span className="text-gradient"> Sisodiya</span>
              </h1>

              {/* Rotating role */}
              <div className="h-8 mb-6 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={roleIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-lg font-mono text-[var(--color-accent)]"
                  >
                    {roles[roleIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Description */}
              <p className="text-[var(--color-text-dim)] text-lg max-w-xl mb-10 leading-relaxed">
                I write Go and TypeScript until things stop crashing.
                Occasionally they even work in production.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/work"
                  className="px-6 py-3 bg-[var(--color-accent)] text-[var(--color-bg)] font-medium rounded-lg hover:opacity-90 transition-opacity text-sm"
                >
                  View my work
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 border border-[var(--color-border)] text-[var(--color-text)] rounded-lg hover:border-[var(--color-border-hover)] hover:bg-[var(--color-bg-card)] transition-all text-sm"
                >
                  Get in touch
                </Link>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-[var(--color-border)]">
                {[
                  { value: "3+", label: "Years building" },
                  { value: "15", label: "Projects shipped" },
                  { value: "25", label: "Open source PRs" },
                  { value: "GATE", label: "2026 Qualified" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-[var(--color-text-dimmer)] font-mono mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
