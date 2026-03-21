"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)));

export function ProjectsGrid() {
  const [filter, setFilter] = useState<string | null>(null);
  const filtered = filter ? projects.filter((p) => p.tags.includes(filter)) : projects;

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setFilter(null)}
          className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-colors ${
            !filter
              ? "border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent)]/10"
              : "border-[var(--color-border)] text-[var(--color-text-dimmer)] hover:border-[var(--color-border-hover)]"
          }`}
        >
          All ({projects.length})
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setFilter(filter === tag ? null : tag)}
            className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-colors ${
              filter === tag
                ? "border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent)]/10"
                : "border-[var(--color-border)] text-[var(--color-text-dimmer)] hover:border-[var(--color-border-hover)]"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.slug}
              id={project.slug}
              layout
              variants={fadeInUp}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="group bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-xl p-5 h-full hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-bg-card-hover)] transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {project.featured && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                    )}
                    <h3 className="font-semibold group-hover:text-[var(--color-accent)] transition-colors">
                      {project.name}
                    </h3>
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-text-dimmer)] hover:text-[var(--color-accent)] transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </a>
                </div>

                <p className="text-sm text-[var(--color-text-dim)] mb-1">{project.tagline}</p>
                <p className="text-xs text-[var(--color-text-dimmer)] leading-relaxed mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--color-bg-elevated)] text-[var(--color-text-dim)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.metrics && (
                  <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
                    <span className="text-[10px] font-mono text-[var(--color-accent)]">{project.metrics}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
