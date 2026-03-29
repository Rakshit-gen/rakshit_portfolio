"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { featuredProjects } from "@/data/projects";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function FeaturedWork() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-between mb-12">
            <div>
              <p className="text-xs font-mono text-[var(--color-accent)] mb-2">// stuff I actually shipped</p>
              <h2 className="text-3xl md:text-4xl font-bold">Selected Work</h2>
            </div>
            <Link
              href="/work"
              className="text-sm text-[var(--color-text-dim)] hover:text-[var(--color-accent)] transition-colors font-mono"
            >
              View all &rarr;
            </Link>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.slice(0, 3).map((project, i) => (
              <motion.div key={project.slug} variants={fadeInUp}>
                <Link href={`/work#${project.slug}`}>
                  <div className="group relative bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6 h-full hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-bg-card-hover)] transition-all duration-300">
                    {/* Project number */}
                    <span className="absolute top-4 right-4 text-xs font-mono text-[var(--color-text-dimmer)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-dimmer)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Name & tagline */}
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-sm text-[var(--color-text-dim)] mb-4">{project.tagline}</p>

                    {/* Description */}
                    <p className="text-sm text-[var(--color-text-dimmer)] leading-relaxed mb-6 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Stack */}
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--color-bg-elevated)] text-[var(--color-text-dim)]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 4 && (
                        <span className="text-[10px] font-mono text-[var(--color-text-dimmer)]">
                          +{project.stack.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Metric if exists */}
                    {project.metrics && (
                      <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                        <span className="text-xs font-mono text-[var(--color-accent)]">{project.metrics}</span>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Bottom row - 2 cards */}
          <div className="grid gap-4 md:grid-cols-2 mt-4">
            {featuredProjects.slice(3, 5).map((project, i) => (
              <motion.div key={project.slug} variants={fadeInUp}>
                <Link href={`/work#${project.slug}`}>
                  <div className="group bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-6 hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-bg-card-hover)] transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-mono text-[var(--color-text-dimmer)]">
                            {String(i + 4).padStart(2, "0")}
                          </span>
                          <div className="flex gap-1.5">
                            {project.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-dimmer)]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-sm text-[var(--color-text-dim)]">{project.tagline}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 max-w-[200px] justify-end">
                        {project.stack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--color-bg-elevated)] text-[var(--color-text-dim)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
