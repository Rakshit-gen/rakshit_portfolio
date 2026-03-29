"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Open Source Community",
    role: "DeepSpeed Maintainers",
    company: "Microsoft Research",
    text: "Rakshit's PRs consistently addressed real production issues — deadlocks, NaN propagation, checkpoint crashes. Clean fixes with minimal surface area. The kind of contributor you want in your repo.",
  },
  {
    name: "Team Feedback",
    role: "Engineering Team",
    company: "HSV Digital",
    text: "Took ownership of the entire rubrics system from schema design to API rollout. The cold-start fix alone saved us from embarrassing demo failures. Doesn't just write code — actually thinks about what the system needs.",
  },
  {
    name: "Peer Review",
    role: "Engineering Team",
    company: "Quizizz",
    text: "Jumped into a Go codebase with millions of daily users and made meaningful performance improvements within weeks. The ElasticSearch optimization was something we'd been putting off for months.",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="mt-20">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
        <motion.div variants={fadeInUp} className="mb-10">
          <p className="text-xs font-mono text-[var(--color-accent)] mb-2">// what people say (when I&apos;m not around)</p>
          <h2 className="text-3xl font-bold">Kind Words</h2>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <div className="relative bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5 md:p-8">
            {/* Quote mark */}
            <div className="absolute top-4 right-6 text-6xl font-serif text-[var(--color-accent)]/10 select-none leading-none">
              &ldquo;
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-[var(--color-text-dim)] leading-relaxed text-base mb-6 max-w-2xl">
                  &ldquo;{testimonials[active].text}&rdquo;
                </p>
                <div>
                  <p className="text-white font-medium text-sm">{testimonials[active].name}</p>
                  <p className="text-xs font-mono text-[var(--color-text-dimmer)]">
                    {testimonials[active].role} · {testimonials[active].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation dots */}
            <div className="flex items-center gap-3 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-8 bg-[var(--color-accent)]"
                      : "w-1.5 bg-[var(--color-border)] hover:bg-[var(--color-text-dimmer)]"
                  }`}
                />
              ))}
              <div className="ml-auto flex gap-2">
                <button
                  onClick={() => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="w-8 h-8 rounded-lg border border-[var(--color-border)] text-[var(--color-text-dimmer)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] transition-colors flex items-center justify-center text-sm"
                >
                  ←
                </button>
                <button
                  onClick={() => setActive((prev) => (prev + 1) % testimonials.length)}
                  className="w-8 h-8 rounded-lg border border-[var(--color-border)] text-[var(--color-text-dimmer)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] transition-colors flex items-center justify-center text-sm"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
