"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/experience";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function ExperienceTimeline() {
  return (
    <section className="mb-24">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
        <motion.div variants={fadeInUp} className="mb-10">
          <p className="text-xs font-mono text-[var(--color-accent)] mb-2">// experience</p>
          <h2 className="text-3xl font-bold">Where I&apos;ve Worked</h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-[var(--color-border)]" />

          <div className="space-y-8">
            {experiences.map((exp) => (
              <motion.div key={exp.company} variants={fadeInUp} className="relative pl-10">
                {/* Timeline dot */}
                <div className="absolute left-0 top-2">
                  <div className={`w-[23px] h-[23px] rounded-full border-2 flex items-center justify-center ${
                    exp.current
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10"
                      : "border-[var(--color-border)] bg-[var(--color-bg)]"
                  }`}>
                    {exp.current && (
                      <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
                    )}
                  </div>
                </div>

                <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5 hover:border-[var(--color-border-hover)] transition-colors">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-semibold text-white">{exp.company}</h3>
                      <p className="text-sm text-[var(--color-accent)]">{exp.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono text-[var(--color-text-dim)]">{exp.period}</p>
                      <p className="text-xs text-[var(--color-text-dimmer)]">{exp.location}</p>
                    </div>
                  </div>

                  <p className="text-sm text-[var(--color-text-dim)] leading-relaxed mb-3">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--color-bg-elevated)] text-[var(--color-text-dim)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
