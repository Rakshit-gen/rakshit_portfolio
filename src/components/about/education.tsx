"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const education = [
  {
    institution: "National Institute of Technology, Hamirpur",
    degree: "Bachelor of Technology",
    period: "2021 — 2025",
    highlights: ["GATE 2026 Qualified — Computer Science & IT"],
  },
];

export function Education() {
  return (
    <section className="mb-24">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
        <motion.div variants={fadeInUp} className="mb-10">
          <p className="text-xs font-mono text-[var(--color-accent)] mb-2">// education</p>
          <h2 className="text-3xl font-bold">Education</h2>
        </motion.div>

        <div className="space-y-4">
          {education.map((edu) => (
            <motion.div
              key={edu.institution}
              variants={fadeInUp}
              className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6 hover:border-[var(--color-border-hover)] transition-colors"
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-semibold text-white">{edu.institution}</h3>
                  <p className="text-sm text-[var(--color-accent)]">{edu.degree}</p>
                </div>
                <p className="text-xs font-mono text-[var(--color-text-dim)]">{edu.period}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {edu.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-xs font-mono px-3 py-1 rounded-full bg-[var(--color-bg-elevated)] text-[var(--color-text-dim)] border border-[var(--color-border)]"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
