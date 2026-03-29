"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { impactMetrics } from "@/data/achievements";
import { staggerContainer, fadeInUp } from "@/lib/animations";

function AnimatedValue({ value, inView }: { value: string; inView: boolean }) {
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current || !inView) return;
    hasAnimated.current = true;

    const numericMatch = value.match(/^([<>]?)(\d+\.?\d*)(.*)/);
    if (!numericMatch) {
      setDisplay(value);
      return;
    }

    const prefix = numericMatch[1];
    const target = parseFloat(numericMatch[2]);
    const suffix = numericMatch[3];
    const isDecimal = numericMatch[2].includes(".");
    const totalSteps = 20;
    let step = 0;

    setDisplay(`${prefix}0${suffix}`);

    const interval = setInterval(() => {
      step++;
      const progress = step / totalSteps;
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      if (step >= totalSteps) {
        setDisplay(value);
        clearInterval(interval);
      } else {
        const displayNum = isDecimal ? current.toFixed(1) : Math.round(current).toString();
        setDisplay(`${prefix}${displayNum}${suffix}`);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [inView, value]);

  useEffect(() => {
    animate();
  }, [animate]);

  return <span>{display}</span>;
}

export function MetricsDashboard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 border-t border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-12">
            <p className="text-xs font-mono text-[var(--color-accent)] mb-2">// numbers that kept me employed</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Things I Actually Improved</h2>
            <p className="text-[var(--color-text-dim)] mt-2 text-sm">Real numbers from real servers that real people depend on</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {impactMetrics.map((metric) => (
              <motion.div
                key={metric.label}
                variants={fadeInUp}
                className="relative bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-4 sm:p-6 overflow-hidden group hover:border-[var(--color-accent)]/20 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
                    <span className="text-[10px] font-mono text-[var(--color-text-dimmer)] uppercase tracking-wider">
                      {metric.label}
                    </span>
                  </div>

                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-mono mb-2">
                    <AnimatedValue value={metric.value} inView={inView} />
                  </div>

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
