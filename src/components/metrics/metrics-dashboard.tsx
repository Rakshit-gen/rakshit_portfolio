"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { impactMetrics } from "@/data/achievements";
import { staggerContainer, fadeInUp } from "@/lib/animations";

function AnimatedValue({ value, inView }: { value: string; inView: boolean }) {
  const [display, setDisplay] = useState("0");
  const numericMatch = value.match(/^[<>]?(\d+\.?\d*)/);

  useEffect(() => {
    if (!inView || !numericMatch) {
      if (!numericMatch) setDisplay(value);
      return;
    }

    const target = parseFloat(numericMatch[1]);
    const prefix = value.startsWith("<") ? "<" : value.startsWith(">") ? ">" : "";
    const suffix = value.replace(/^[<>]?\d+\.?\d*/, "");
    const duration = 1200;
    const steps = 30;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      current = Math.min(current + increment, target);
      const displayNum = target >= 100 ? Math.round(current) : current.toFixed(1);
      setDisplay(`${prefix}${displayNum}${suffix}`);
      if (step >= steps) {
        setDisplay(value);
        clearInterval(interval);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [inView, value, numericMatch]);

  return <span>{display}</span>;
}

export function MetricsDashboard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6 border-t border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-12">
            <p className="text-xs font-mono text-[var(--color-accent)] mb-2">// real-world impact</p>
            <h2 className="text-3xl md:text-4xl font-bold">Performance Metrics</h2>
            <p className="text-[var(--color-text-dim)] mt-2 text-sm">Measured improvements from production systems</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {impactMetrics.map((metric) => (
              <motion.div
                key={metric.label}
                variants={fadeInUp}
                className="relative bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6 overflow-hidden group hover:border-[var(--color-accent)]/20 transition-colors"
              >
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  {/* Status dot */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
                    <span className="text-[10px] font-mono text-[var(--color-text-dimmer)] uppercase tracking-wider">
                      {metric.label}
                    </span>
                  </div>

                  {/* Value */}
                  <div className="text-3xl md:text-4xl font-bold text-white font-mono mb-2">
                    <AnimatedValue value={metric.value} inView={inView} />
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[var(--color-text-dimmer)]">{metric.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
