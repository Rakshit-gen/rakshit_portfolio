"use client";

import { motion } from "framer-motion";
import { featuredProjects } from "@/data/projects";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function CaseStudies() {
  const withArchitecture = featuredProjects.filter((p) => p.architecture);

  return (
    <section className="mt-24">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
        <motion.div variants={fadeInUp} className="mb-12">
          <p className="text-xs font-mono text-[var(--color-accent)] mb-2">// deep dives</p>
          <h2 className="text-3xl font-bold">Architecture Breakdowns</h2>
          <p className="text-sm text-[var(--color-text-dim)] mt-2">
            How these systems work under the hood
          </p>
        </motion.div>

        <div className="space-y-6">
          {withArchitecture.map((project) => (
            <motion.div
              key={project.slug}
              variants={fadeInUp}
              className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl overflow-hidden"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-[var(--color-border)]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      <span className="text-xs font-mono text-[var(--color-accent)]">{project.tagline}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-dimmer)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-mono text-[var(--color-accent)] hover:underline"
                  >
                    Live &rarr;
                  </a>
                </div>
              </div>

              {/* Architecture sections */}
              <div className="grid md:grid-cols-2 gap-px bg-[var(--color-border)]">
                {project.architecture?.map((section) => (
                  <div key={section.title} className="bg-[var(--color-bg-card)] p-5">
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]" />
                      {section.title}
                    </h4>
                    <ul className="space-y-1.5">
                      {section.points.map((point) => (
                        <li key={point} className="text-xs text-[var(--color-text-dim)] flex items-start gap-2">
                          <span className="text-[var(--color-text-dimmer)] mt-0.5 shrink-0">›</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Challenges */}
              {project.challenges && (
                <div className="px-6 py-4 border-t border-[var(--color-border)] bg-[var(--color-bg)]/50">
                  <span className="text-[10px] font-mono text-[var(--color-text-dimmer)] uppercase tracking-wider">
                    Challenges solved:
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.challenges.map((c) => (
                      <span
                        key={c}
                        className="text-[10px] px-2 py-1 rounded bg-[var(--color-bg-elevated)] text-[var(--color-text-dim)] font-mono"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
